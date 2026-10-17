/*
 * ADAM Program Builder - SIMULATED SERVER (Phase 3 prototype)
 *
 * !!! THIS IS NOT A BACKEND. It runs in the browser, so anyone can bypass it. !!!
 * It exists to define, in one place and in testable code, the rules that the REAL backend
 * (Cloud Functions + Firestore security rules) must enforce. The screen never decides
 * anything itself: it asks this object, and shows the answer. Buttons that are disabled in
 * the UI are only a convenience; every action is re-checked here.
 *
 * Rules enforced here (the contract for the real backend, see docs/BUILDER-BACKEND-CONTRACT.md):
 *  1. The caller's role and "qualified" flag come from the server's own user table, never from the request.
 *  2. A rehab program cannot be submitted, approved or published except through the transitions below.
 *  3. Only a QUALIFIED specialist can approve a rehab program. Coaches, admins and unqualified specialists cannot.
 *  4. The approval is bound to the exact content (hash) AND to the people it was approved for. Any content change,
 *     or adding someone who was not covered, makes the approval stale: the program goes back to draft, is
 *     unpublished, and needs a new approval. Removing people never needs a new approval.
 *  5. status / approval / ownership are never taken from the client's data; save() ignores them.
 *  6. A client sees only published programs whose audience includes them.
 */
(function (root) {
  'use strict';
  var DATA = root.ADAM_BUILDER_DATA;
  if (!DATA) return;

  function err(code, ar, en) { return { ok: false, code: code, msg: { ar: ar, en: en } }; }
  function ok(p, extra) { var r = { ok: true, program: p }; if (extra) for (var k in extra) r[k] = extra[k]; return r; }

  /* server-side user table: id -> role, qualified */
  var TABLE = {};
  DATA.USERS.forEach(function (u) { TABLE[u.id] = { id: u.id, role: u.role, qualified: u.qualified === true, name: u.name }; });
  function who(actorId) { return TABLE[actorId] || null; }

  /* canonical JSON + FNV-1a hash of the parts of a program that an approval covers */
  function canon(v) {
    if (v === null || typeof v !== 'object') return JSON.stringify(v);
    if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']';
    return '{' + Object.keys(v).sort().map(function (k) { return JSON.stringify(k) + ':' + canon(v[k]); }).join(',') + '}';
  }
  function hash(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(16).padStart(8, '0');
  }
  function contentOf(p) {
    return { title: p.title, goal: p.goal, type: p.type, weeks: p.weeks, startDate: p.startDate, phases: p.phases, days: p.days, audience: { kind: (p.audience || {}).kind, teamId: (p.audience || {}).teamId || null } };
  }
  function contentHash(p) { return hash(canon(contentOf(p))); }

  function countItems(p) {
    var n = 0;
    (p.days || []).forEach(function (d) { (d.blocks || []).forEach(function (b) { n += (b.items || []).length; }); });
    return n;
  }
  function audienceSize(p) {
    var a = p.audience || {};
    return (a.memberIds || []).length;
  }
  function isOwner(a, p) { return a && p.ownerId === a.id; }
  function canBuild(a) { return !!a && (a.role === 'coach' || a.role === 'specialist' || a.role === 'admin'); }

  /* ---------------------------------------------------------------- save */
  /* prev: the stored program (null when new). next: what the client sends. */
  function save(actorId, prev, next) {
    var a = who(actorId);
    if (!a) return err('NO_USER', 'مستخدم غير معروف.', 'Unknown user.');
    if (!canBuild(a)) return err('FORBIDDEN', 'الحساب ده مش بيبني برامج.', 'This account cannot build programs.');
    if (!next || typeof next !== 'object') return err('BAD_DATA', 'بيانات غير صالحة.', 'Invalid data.');
    if (!prev) {
      if (next.type === 'rehab' && a.role === 'admin') return err('FORBIDDEN', 'الإدارة ما تنشئش برامج تأهيل.', 'Admins do not create rehab programs.');
      var np = JSON.parse(JSON.stringify(next));
      np.ownerId = a.id; np.status = 'draft'; np.approval = null; np.rev = 1; np.type = np.type === 'rehab' ? 'rehab' : 'training';
      return ok(np);
    }
    if (!(isOwner(a, prev) || (a.role === 'admin' && prev.type !== 'rehab'))) return err('FORBIDDEN', 'مش برنامجك.', 'This is not your program.');
    var out = JSON.parse(JSON.stringify(next));
    /* client-supplied status, approval, owner and type changes are ignored */
    out.ownerId = prev.ownerId; out.type = prev.type; out.status = prev.status; out.approval = prev.approval ? JSON.parse(JSON.stringify(prev.approval)) : null;
    out.rev = (prev.rev || 1) + 1;
    var added = false;
    if (prev.approval && prev.approval.members) added = ((out.audience || {}).memberIds || []).some(function (id) { return prev.approval.members.indexOf(id) < 0; });
    var changed = contentHash(out) !== contentHash(prev) || added;
    var invalidated = false;
    if (changed && prev.type === 'rehab' && (prev.status === 'approved' || prev.status === 'published' || prev.status === 'pending_review')) {
      out.status = 'draft'; out.approval = null; invalidated = true;
    } else if (changed && prev.type !== 'rehab' && prev.status === 'published') {
      /* a published training program keeps its status; players see the update */
    }
    return ok(out, { invalidated: invalidated });
  }

  /* -------------------------------------------------------------- submit */
  function submit(actorId, p) {
    var a = who(actorId); if (!a) return err('NO_USER', 'مستخدم غير معروف.', 'Unknown user.');
    if (p.type !== 'rehab') return err('NOT_REHAB', 'الإرسال للمراجعة لبرامج التأهيل بس.', 'Only rehab programs go to specialist review.');
    if (!isOwner(a, p)) return err('FORBIDDEN', 'مش برنامجك.', 'This is not your program.');
    if (p.status !== 'draft') return err('BAD_STATE', 'البرنامج مش في حالة مسودة.', 'The program is not a draft.');
    if (countItems(p) < 1) return err('EMPTY', 'ضيف تمرين واحد على الأقل.', 'Add at least one exercise first.');
    var np = JSON.parse(JSON.stringify(p)); np.status = 'pending_review'; np.approval = null; np.submittedHash = contentHash(p); np.rev = (p.rev || 1) + 1;
    return ok(np);
  }

  /* ------------------------------------------------------------- approve */
  function approve(actorId, p, note) {
    var a = who(actorId); if (!a) return err('NO_USER', 'مستخدم غير معروف.', 'Unknown user.');
    if (p.type !== 'rehab') return err('NOT_REHAB', 'الاعتماد لبرامج التأهيل بس.', 'Only rehab programs need approval.');
    if (a.role !== 'specialist') return err('NOT_SPECIALIST', 'الاعتماد من متخصص بس.', 'Only a specialist can approve.');
    if (!a.qualified) return err('NOT_QUALIFIED', 'المتخصص ده لسه ماتفحصتش شهاداته، فمايقدرش يعتمد.', 'This specialist’s credentials have not been checked yet, so they cannot approve.');
    if (p.status !== 'pending_review') return err('BAD_STATE', 'البرنامج مش مرسل للمراجعة.', 'The program is not waiting for review.');
    note = String(note || '').trim();
    if (note.length < 10) return err('NOTE_REQUIRED', 'اكتب ملاحظة اعتماد (10 حروف على الأقل).', 'Write an approval note (at least 10 characters).');
    var np = JSON.parse(JSON.stringify(p));
    np.status = 'approved'; np.rev = (p.rev || 1) + 1;
    np.approval = { by: a.id, byName: a.name, at: new Date().toISOString(), note: note.slice(0, 400), hash: contentHash(p), members: ((p.audience || {}).memberIds || []).slice() };
    return ok(np);
  }
  function requestChanges(actorId, p, note) {
    var a = who(actorId); if (!a) return err('NO_USER', 'مستخدم غير معروف.', 'Unknown user.');
    if (a.role !== 'specialist' || !a.qualified) return err('NOT_QUALIFIED', 'الرد على المراجعة من متخصص معتمد بس.', 'Only a qualified specialist can respond to a review.');
    if (p.type !== 'rehab' || p.status !== 'pending_review') return err('BAD_STATE', 'البرنامج مش مرسل للمراجعة.', 'The program is not waiting for review.');
    note = String(note || '').trim();
    if (note.length < 10) return err('NOTE_REQUIRED', 'اكتب سبب طلب التعديل (10 حروف على الأقل).', 'Explain what must change (at least 10 characters).');
    var np = JSON.parse(JSON.stringify(p)); np.status = 'draft'; np.approval = null; np.reviewNote = { by: a.id, note: note.slice(0, 400) }; np.rev = (p.rev || 1) + 1;
    return ok(np);
  }

  /* ------------------------------------------------------------- publish */
  function publish(actorId, p) {
    var a = who(actorId); if (!a) return err('NO_USER', 'مستخدم غير معروف.', 'Unknown user.');
    if (!canBuild(a)) return err('FORBIDDEN', 'مش مسموح.', 'Not allowed.');
    if (!(isOwner(a, p) || (a.role === 'admin' && p.type !== 'rehab'))) return err('FORBIDDEN', 'مش برنامجك.', 'This is not your program.');
    if (countItems(p) < 1) return err('EMPTY', 'ضيف تمرين واحد على الأقل.', 'Add at least one exercise first.');
    if (audienceSize(p) < 1) return err('NO_AUDIENCE', 'اختار لاعب أو عميل واحد على الأقل.', 'Choose at least one player or client.');
    if (p.status === 'published') return err('BAD_STATE', 'البرنامج منشور بالفعل.', 'Already published.');
    if (p.type === 'rehab') {
      if (p.status !== 'approved' || !p.approval) return err('REHAB_NOT_APPROVED', 'برنامج التأهيل لازم يتعتمد من متخصص معتمد قبل النشر.', 'A rehab program must be approved by a qualified specialist before it can be published.');
      var ap = who(p.approval.by);
      if (!ap || ap.role !== 'specialist' || !ap.qualified) return err('NOT_QUALIFIED', 'الاعتماد المسجّل مش من متخصص معتمد.', 'The recorded approval is not from a qualified specialist.');
      var extra = ((p.audience || {}).memberIds || []).some(function (id) { return (p.approval.members || []).indexOf(id) < 0; });
      if (p.approval.hash !== contentHash(p) || extra) return err('APPROVAL_STALE', 'البرنامج اتعدّل بعد الاعتماد، محتاج اعتماد جديد.', 'The program changed after approval; it needs a new approval.');
    }
    var np = JSON.parse(JSON.stringify(p)); np.status = 'published'; np.publishedAt = new Date().toISOString(); np.rev = (p.rev || 1) + 1;
    return ok(np);
  }
  function unpublish(actorId, p) {
    var a = who(actorId); if (!a) return err('NO_USER', 'مستخدم غير معروف.', 'Unknown user.');
    if (!(isOwner(a, p) || a.role === 'admin')) return err('FORBIDDEN', 'مش مسموح.', 'Not allowed.');
    if (p.status !== 'published') return err('BAD_STATE', 'البرنامج مش منشور.', 'The program is not published.');
    var np = JSON.parse(JSON.stringify(p)); np.status = p.type === 'rehab' ? 'approved' : 'draft'; np.rev = (p.rev || 1) + 1;
    return ok(np);
  }

  /* --------------------------------------------------------------- reads */
  function canView(actorId, p) {
    var a = who(actorId); if (!a) return false;
    if (a.role === 'client') return p.status === 'published' && ((p.audience || {}).memberIds || []).indexOf(a.id) > -1;
    if (a.role === 'admin') return true;
    if (a.role === 'specialist') return isOwner(a, p) || p.status === 'pending_review' || p.status === 'approved' || p.status === 'published';
    return isOwner(a, p);
  }
  /* only a coach (or admin) manages team rosters; a client or specialist cannot */
  function canManageTeam(actorId) { var a = who(actorId); return !!a && (a.role === 'coach' || a.role === 'admin'); }
  function canDelete(actorId, p) {
    var a = who(actorId); return !!a && isOwner(a, p) && p.status !== 'published';
  }

  root.ADAM_BUILDER_SERVER = {
    SIMULATED: true, who: who, contentHash: contentHash, countItems: countItems,
    save: save, submit: submit, approve: approve, requestChanges: requestChanges, publish: publish, unpublish: unpublish,
    canView: canView, canDelete: canDelete, canManageTeam: canManageTeam, canBuild: function (id) { return canBuild(who(id)); }
  };
})(window);
