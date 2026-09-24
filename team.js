/*
 * صفحة فريق ADAM الذكي — لصاحب المنصة بس
 * ------------------------------------------------------------
 * الصفحة بتكلّم Apps Script بتوكن دخولك، وهو بيتأكد إنك إنت
 * ويرجّع التقارير والمسودات. حتى لو حد فتح الصفحة، من غير حسابك
 * مش هيشوف حاجة.
 *
 * الحاجة الوحيدة اللي الصفحة بتكتبها في الداتابيز: رسالة الشات
 * اللي إنت وافقت عليها بدوستك — بحسابك إنت، زي ما تكون كتبتها
 * من شاشة الشات بالظبط. الموظف نفسه عمره ما بيبعت حاجة.
 */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig, COACH_EMAIL } from './firebase-config.js';
import { SPORTS } from './sports.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const $ = id => document.getElementById(id);
let scriptUrl = '';
let state = null;
let shownId = '';
let busy = false;

const ICONS = {
  analyst: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>',
  success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9 11.5l2 2 4-4"/></svg>',
  advisor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  content: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>'
};

/* ---------- الشاشات ---------- */

function show(id) {
  ['loading-box', 'login-box', 'blocked-box', 'main'].forEach(x => $(x).classList.toggle('hidden', x !== id));
}

function blocked(title, text) {
  $('blocked-title').textContent = title;
  $('blocked-text').textContent = text;
  show('blocked-box');
}

/* ---------- الكلام مع Apps Script ---------- */

async function call(action, extra) {
  const user = auth.currentUser;
  if (!user) throw new Error('مش داخل');
  const idToken = await user.getIdToken();
  // text/plain عشان المتصفح مايعملش preflight — Apps Script مابيردّش على OPTIONS
  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(Object.assign({ action, idToken }, extra || {}))
  });
  const data = await res.json();
  // نسخة Apps Script قديمة (قبل ملف analyst) — بتفهم الطلب غلط
  if (!data.teamApi) throw new Error('ملف analyst مش متضاف');
  if (!data.ok) throw new Error(data.error || 'حصلت مشكلة');
  return data;
}

/* ---------- العرض ---------- */

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleString('ar-EG', { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
}

/* 2026-09-17 ← "١٧ سبتمبر" — التاريخ بالأرقام بيتقلب في صفحة عربي */
function fmtDay(stamp) {
  if (!stamp) return '';
  const d = new Date(stamp + 'T12:00:00');
  return isNaN(d) ? stamp : d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' });
}

function renderStaff() {
  const a = state.analyst;
  const staff = [
    { key: 'analyst', name: 'محلّل الأعمال', job: 'كل سبت: أرقام الأسبوع قدّام اللي قبله، و٥ أسطر تعمل إيه.', chip: a.on ? ['on', 'شغّال'] : ['off', 'موقوف'] },
    { key: 'success', name: 'مساعد نجاح العملاء', job: 'كل يوم: رسالة لكل عميل ساكت — ماتتبعتش غير بموافقتك.', chip: !state.success ? ['soon', 'محتاج تحديث'] : (state.success.on ? ['on', 'شغّال'] : ['off', 'موقوف']) },
    { key: 'mail', name: 'ساعي البريد', job: 'إيميل واحد في اليوم للعميل اللي فاتته رسايل أو تحديثات أكتر من ساعتين.', chip: !state.mail ? ['soon', 'محتاج تحديث'] : (state.mail.on ? ['on', 'شغّال'] : ['off', 'موقوف']) },
    { key: 'advisor', name: 'مستشار البرامج', job: 'جوه صفحة العميل: بيقترح برنامج تمرين من المكتبة، وإنت أو المتخصص تراجعوا وتحفظوا.', chip: !state.advisor ? ['soon', 'محتاج تحديث'] : (state.advisor.on ? ['on', 'شغّال'] : ['off', 'موقوف']) },
    { key: 'content', name: 'صانع المحتوى', job: 'بوستات وسكريبتات ريلز من مكتبات التمارين والأكل والمكملات.', chip: !state.content ? ['soon', 'محتاج تحديث'] : (state.content.on ? ['on', 'شغّال'] : ['off', 'موقوف']) }
  ];
  $('staff').innerHTML = '';
  staff.forEach(s => {
    const box = document.createElement('div');
    box.className = 'agent' + (s.soon ? ' soon' : '');
    box.dataset.agent = s.key;
    box.innerHTML = '<div class="agent-top"><span class="agent-icon">' + ICONS[s.key] + '</span><div><div class="agent-name"></div><span class="chip ' + s.chip[0] + '"></span></div></div><div class="agent-job"></div>';
    box.querySelector('.agent-name').textContent = s.name;
    box.querySelector('.chip').textContent = s.chip[1];
    box.querySelector('.agent-job').textContent = s.job;
    $('staff').appendChild(box);
  });
}

function deltaCell(r) {
  const d = r.now - r.before;
  const td = document.createElement('td');
  td.className = 'n';
  td.dir = 'ltr';   /* عشان "+3" ماتتقلبش لـ "3+" */
  if (d === 0) { td.textContent = '='; td.classList.add('d-flat'); return td; }
  td.textContent = (d > 0 ? '▲ +' : '▼ ') + d;
  if (r.good === 'neutral') td.classList.add('d-flat');
  else td.classList.add(((r.good === 'up') === (d > 0)) ? 'd-good' : 'd-bad');
  return td;
}

function renderReport(report) {
  const empty = !report;
  $('report-empty').classList.toggle('hidden', !empty);
  $('report-body').classList.toggle('hidden', empty);
  $('report-period').textContent = empty ? '' :
    ('من ' + fmtDay(report.period.from) + ' لـ ' + fmtDay(report.period.to) + ' · اتعمل ' + fmtDate(report.at) + (report.by === 'schedule' ? ' (تلقائي)' : ' (يدوي)'));
  if (empty) return;
  shownId = report.id;

  const lines = $('report-lines');
  lines.innerHTML = '';
  (report.lines || []).forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    lines.appendChild(li);
  });
  const aiErr = $('report-ai-err');
  aiErr.classList.toggle('hidden', !!(report.lines && report.lines.length));
  aiErr.textContent = 'الذكاء الاصطناعي ما ردّش المرة دي (' + (report.aiError || 'مش معروف ليه') + ') — الأرقام تحت كاملة ومظبوطة.';

  const movers = $('report-movers');
  movers.innerHTML = '';
  (report.movers || []).slice(0, 4).forEach(m => {
    const chip = document.createElement('span');
    chip.className = 'mover' + (m.better === true ? ' good' : (m.better === false ? ' bad' : ''));
    // "كان ٠ وبقى ٣" بدل السهم — الأسهم والأرقام بتتقلب في الكلام العربي
    chip.textContent = m.label + ': كان ' + m.before + ' وبقى ' + m.now;
    movers.appendChild(chip);
  });

  const table = $('report-table');
  table.innerHTML = '';
  (report.rows || []).forEach(r => {
    const tr = document.createElement('tr');
    tr.dataset.key = r.key;
    const name = document.createElement('td');
    name.textContent = r.label;
    const now = document.createElement('td');
    now.className = 'n';
    now.innerHTML = '<b></b>';
    now.firstChild.textContent = r.now;
    const before = document.createElement('td');
    before.className = 'n';
    before.textContent = r.before;
    tr.append(name, now, before, deltaCell(r));
    table.appendChild(tr);
  });

  const t = report.totals || {};
  const todo = [
    [t.waitingInjuries, 'بلاغ إصابة مستني رد من أكتر من يومين'],
    [t.waitingConsults, 'طلب استشارة مستني رد من أكتر من يومين'],
    [t.leadsNotContacted, 'رسالة تواصل ماحدش كلّم صاحبها'],
    [t.trialsEnding, 'عميل تجربته المجانية بتخلص خلال أسبوع'],
    [t.newOrdersOpen, 'طلب متجر جديد']
  ].filter(x => x[0] > 0);
  $('todo-wrap').classList.toggle('hidden', !todo.length);
  $('report-todo').innerHTML = '';
  todo.forEach(x => {
    const li = document.createElement('li');
    li.innerHTML = '<b></b><span></span>';
    li.firstChild.textContent = x[0];
    li.lastChild.textContent = x[1];
    $('report-todo').appendChild(li);
  });

  const fb = report.feedback;
  $('fb-ask').classList.toggle('hidden', !!fb);
  $('fb-done').classList.toggle('hidden', !fb);
  if (fb) {
    $('fb-done').textContent = (fb.decision === 'yes' ? '✓ خدت قرار' : '✗ ماكانش مفيد') + (fb.note ? ' — ' + fb.note : '') + '  ';
    const undo = document.createElement('button');
    undo.type = 'button';
    undo.className = 'ghost';
    undo.id = 'fb-undo';
    undo.style.cssText = 'padding:4px 10px;font-size:12px';
    undo.textContent = 'غيّر';
    undo.addEventListener('click', () => sendFeedback(''));
    $('fb-done').appendChild(undo);
  } else {
    $('fb-note').value = '';
  }

  highlightHistory();
}

function renderScore() {
  const a = state.analyst;
  $('score').textContent = a.rated
    ? ('قرارات اتاخدت بسبب المحلّل: ' + a.decisions + ' من ' + a.rated + ' تقرير متقيّم. لو الرقم ده فضل صفر بعد شهر، أوقف الموظف — ده توفير مش فشل.')
    : 'قيّم كل تقرير بدوسة — بعد شهر هنعرف الموظف ده نافع ولا لأ.';
}

function highlightHistory() {
  document.querySelectorAll('#history li').forEach(li => li.classList.toggle('sel', li.dataset.id === shownId));
}

function renderHistory() {
  const list = state.analyst.history || [];
  $('history-card').classList.toggle('hidden', list.length < 2);
  $('history').innerHTML = '';
  list.forEach(h => {
    const li = document.createElement('li');
    li.dataset.id = h.id;
    li.innerHTML = '<span class="h-date"></span><span class="h-text"></span><span class="h-fb"></span>';
    li.children[0].textContent = h.period ? fmtDay(h.period.from) : fmtDate(h.at);
    li.children[1].textContent = h.headline || '—';
    li.children[2].textContent = h.feedback ? (h.feedback.decision === 'yes' ? '✓' : '✗') : '';
    li.addEventListener('click', () => openReport(h.id));
    $('history').appendChild(li);
  });
  highlightHistory();
}

function renderLog() {
  const log = state.log || [];
  $('log').innerHTML = '';
  if (!log.length) {
    $('log').innerHTML = '<li>لسه مفيش تشغيل.</li>';
    return;
  }
  log.forEach(e => {
    const li = document.createElement('li');
    if (!e.ok) li.className = 'bad';
    const who = e.by === 'schedule' ? 'تلقائي' : (e.by === 'client' ? 'العميل' : 'يدوي');
    const agent = { success: 'نجاح العملاء', content: 'صانع المحتوى', mail: 'ساعي البريد', advisor: 'مستشار البرامج' }[e.agent] || 'المحلّل';
    li.textContent = fmtDate(e.at) + ' · ' + agent + ' · ' + who + ' · ' + (e.ok ? 'تمام' : 'فشل') + (e.ms >= 1000 ? ' · ' + Math.round(e.ms / 1000) + ' ث' : '') + (e.note ? ' · ' + e.note : '');
    $('log').appendChild(li);
  });
}

function renderControls() {
  const a = state.analyst;
  $('toggle-btn').textContent = a.on ? 'أوقفه' : 'شغّله تاني';
  $('toggle-btn').className = a.on ? 'danger' : '';
  $('run-btn').disabled = busy || !a.on || a.runsLeft <= 0;
  $('run-btn').textContent = 'شغّله دلوقتي' + (a.on ? ' (' + a.runsLeft + ' فاضلين النهارده)' : '');
}

/* ---------- مساعد نجاح العملاء ---------- */

function sportLabel(key) {
  const hit = SPORTS.find(x => x.id === key);
  return hit ? hit.ar : '';
}

function reasonChip(d) {
  const since = d.days ? (' من ' + d.days + ' يوم') : '';
  if (d.kind === 'care') return ['danger', d.care === 'clearance' ? 'مستني إذن طبي' : 'بلاغ إصابة مفتوح'];
  if (d.kind === 'noplan') return ['danger', 'مالوش برنامج لسه'];
  if (d.kind === 'never') return ['warn', 'ما بدأش' + since];
  return ['warn', 'ساكت' + since];
}

function draftText(d) {
  return String(d.text || '').split('{name}').join(d.firstName || '');
}

function renderSuccess() {
  const cs = state.success;
  $('success-card').classList.toggle('hidden', !cs);
  if (!cs) return;
  $('cs-toggle-btn').textContent = cs.on ? 'أوقفه' : 'شغّله تاني';
  $('cs-toggle-btn').className = cs.on ? 'danger' : '';
  $('cs-scan-btn').disabled = csBusy || !cs.on || cs.scansLeft <= 0;
  $('cs-scan-btn').textContent = 'دوّر دلوقتي' + (cs.on ? ' (' + cs.scansLeft + ')' : '');
  $('cs-empty').classList.toggle('hidden', cs.pending.length > 0);

  const list = $('cs-list');
  list.innerHTML = '';
  cs.pending.forEach(d => {
    const box = document.createElement('div');
    box.className = 'draft';
    box.dataset.id = d.id;
    const top = document.createElement('div');
    top.className = 'draft-top';
    const name = document.createElement('span');
    name.className = 'draft-name';
    name.textContent = d.name || d.firstName;
    const chip = document.createElement('span');
    const rc = reasonChip(d);
    chip.className = 'chip ' + rc[0];
    chip.textContent = rc[1];
    top.append(name, chip);
    box.appendChild(top);

    const meta = [];
    if (sportLabel(d.sport)) meta.push(sportLabel(d.sport));
    if (d.coachEmail && d.coachEmail !== String(COACH_EMAIL).toLowerCase()) meta.push('مدربه: ' + d.coachEmail);
    if (d.kind !== 'care' && d.kind !== 'noplan' && !d.fromAi) meta.push('رسالة جاهزة — الذكاء الاصطناعي ما ردّش المرة دي');
    if (meta.length) {
      const m = document.createElement('div');
      m.className = 'draft-meta';
      m.textContent = meta.join(' · ');
      box.appendChild(m);
    }

    const row = document.createElement('div');
    row.className = 'row';
    if (d.kind === 'care' || d.kind === 'noplan') {
      const note = document.createElement('p');
      note.className = 'care-note';
      note.textContent = d.kind === 'noplan'
        ? 'مفيش رسالة عن قصد — العميل ده مالوش برنامج تمرين ولا تغذية ولا تأهيل لسه، فمش هنقوله "ابدأ". اكتبله برنامج الأول (أو قول لمدربه).'
        : 'مفيش رسالة جاهزة للعميل ده عن قصد — عنده حاجة صحية مفتوحة، فالأحسن تكلّمه إنت بنفسك من الشات.';
      box.appendChild(note);
      const okBtn = document.createElement('button');
      okBtn.type = 'button';
      okBtn.className = 'ghost cs-skip';
      okBtn.textContent = d.kind === 'noplan' ? 'تمام، هظبطله برنامج' : 'تمام، هكلّمه بنفسي';
      okBtn.addEventListener('click', () => markDraft(d, 'skipped', '', box));
      row.appendChild(okBtn);
    } else {
      const area = document.createElement('textarea');
      area.value = draftText(d);
      area.setAttribute('aria-label', 'نص الرسالة');
      box.appendChild(area);
      const send = document.createElement('button');
      send.type = 'button';
      send.className = 'cs-send';
      send.textContent = 'وافق وابعت';
      send.addEventListener('click', () => sendDraft(d, area.value.trim(), box));
      const skip = document.createElement('button');
      skip.type = 'button';
      skip.className = 'ghost cs-skip';
      skip.textContent = 'تخطّي';
      skip.addEventListener('click', () => markDraft(d, 'skipped', '', box));
      row.append(send, skip);
    }
    box.appendChild(row);
    list.appendChild(box);
  });

  $('cs-score').textContent = cs.sent
    ? ('اتبعت ' + cs.sent + ' رسالة · ' + cs.returned + ' منهم رجعوا يتمرنوا أو يسجّلوا · ' + cs.unedited + ' اتبعتت من غير تعديل')
    : 'أول ما تبعت رسايل، هنا هتعرف كام عميل رجع بسببها.';

  const done = cs.done || [];
  $('cs-done-box').classList.toggle('hidden', !done.length);
  $('cs-done').innerHTML = '';
  done.forEach(d => {
    const li = document.createElement('li');
    const what = d.status === 'sent' ? ('اتبعتت' + (d.returned ? ' · رجع ✓' : '')) : 'اتخطّت';
    li.textContent = (d.name || d.firstName) + ' · ' + what + ' · ' + fmtDate(d.doneAt);
    $('cs-done').appendChild(li);
  });
}

function csMsg(text, kind) {
  $('cs-msg').textContent = text || '';
  $('cs-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

let csBusy = false;

async function markDraft(d, status, finalText, box) {
  box.classList.add('sending');
  try {
    state = await call('team_cs_mark', { id: d.id, status, finalText });
    renderSuccess();
    renderLog();
    renderStaff();
    csMsg(status === 'sent' ? ('اتبعتت لـ ' + (d.firstName || d.name) + ' في الشات ✓') : 'اتشالت من القايمة', 'ok');
  } catch (err) {
    box.classList.remove('sending');
    csMsg(err.message, 'err');
  }
}

/*
 * الإرسال: نفس اللي بيحصل لما تكتب في شاشة الشات بالظبط —
 * رسالة باسم المدرب، وإشعار في جرس العميل وعلى موبايله
 */
async function sendDraft(d, text, box) {
  if (!text) { csMsg('الرسالة فاضية', 'err'); return; }
  box.classList.add('sending');
  const me = String(auth.currentUser.email || '').toLowerCase();
  const now = new Date().toISOString();
  try {
    await addDoc(collection(db, 'chats', d.email, 'messages'), { sender: 'coach', text, createdAt: now });
    await setDoc(doc(db, 'chats', d.email), { clientEmail: d.email, lastMessage: text, lastMessageAt: now, lastSender: 'coach' }, { merge: true });
  } catch (err) {
    box.classList.remove('sending');
    csMsg('الرسالة ما اتبعتتش: ' + err.message, 'err');
    return;
  }
  /* الإشعار إضافة — لو فشل، الرسالة وصلت الشات في كل الأحوال */
  try {
    const clip = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
    const ref = await addDoc(collection(db, 'notifications'), {
      to: d.email, from: me, type: 'chat_client',
      text: { ar: { t: 'رسالة جديدة من فريقك', b: clip(text, 160) }, en: { t: 'New message from your team', b: clip(text, 160) } },
      target: 'chat', about: '', aboutName: '', createdAt: now, read: false
    });
    const idToken = await auth.currentUser.getIdToken();
    fetch(scriptUrl, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'push', idToken, id: ref.id }) }).catch(() => {});
  } catch (err) { /* الجرس اختياري */ }
  await markDraft(d, 'sent', text, box);
}

$('cs-scan-btn').addEventListener('click', async () => {
  if (csBusy) return;
  csBusy = true;
  renderSuccess();
  $('cs-msg').innerHTML = '<span class="spin"></span> بيدوّر على العملاء الساكتين ويكتب الرسايل… ممكن ياخد دقيقة';
  try {
    const before = state.success.pending.length;
    state = await call('team_cs_scan');
    const added = state.success.pending.length - before;
    csMsg(added > 0 ? ('اتكتب ' + added + ' رسالة جديدة — راجعهم تحت') : 'مفيش حد ساكت جديد محتاج رسالة', 'ok');
  } catch (err) {
    csMsg(err.message, 'err');
  }
  csBusy = false;
  renderSuccess();
  renderLog();
});

$('cs-toggle-btn').addEventListener('click', async () => {
  const turnOn = !state.success.on;
  try {
    state = await call('team_cs_toggle', { on: turnOn });
    renderSuccess();
    renderStaff();
    renderLog();
    csMsg(turnOn ? 'المساعد رجع يشتغل' : 'المساعد اتوقف — مش هيكتب رسايل جديدة لحد ما تشغّله', turnOn ? 'ok' : '');
  } catch (err) {
    csMsg(err.message, 'err');
  }
});

/* ---------- صانع المحتوى ---------- */

let libs = null;
let ctBusy = false;

/* المكتبات بتتحمّل أول ما تدوس "اكتب" بس — تقيلة ومش لازمة غير هنا */
async function loadLibs() {
  if (libs) return libs;
  const [idx, det, food, foodX, sup, supX, cred] = await Promise.all([
    import('./library/exercises-index.js'), import('./library/exercises-details.js'),
    import('./food-library.js'), import('./library/food-extra.js'),
    import('./supplement-library.js'), import('./library/supplements-extra.js'),
    import('./library/credits.js')
  ]);
  libs = {
    exercises: idx.EXERCISE_INDEX, details: det.EXERCISE_DETAILS,
    foods: food.FOOD_LIBRARY.concat(foodX.FOOD_LIBRARY_EXTRA),
    supps: sup.SUPPLEMENT_LIBRARY.concat(supX.SUPPLEMENT_LIBRARY_EXTRA),
    grades: sup.EVIDENCE_GRADES, sources: cred.MEDIA_SOURCES
  };
  return libs;
}

const pickRandom = list => list[Math.floor(Math.random() * list.length)];
const tx = (obj, l) => (obj && typeof obj === 'object') ? (obj[l] || obj.ar || '') : (obj || '');

/* بنبني "معلومات" كل حاجة من المكتبة بس — مفيش أي بيانات عملاء */
function buildItem(kind, L, lang, used) {
  const en = lang === 'en';
  const skip = id => used.indexOf(id) !== -1;
  if (kind === 'exercise' || kind === 'mistake') {
    const pool = L.exercises.filter(x => {
      const d = L.details[x.id];
      return d && x.m && !skip(x.id + ':' + kind) && (kind !== 'mistake' || (Array.isArray(d[4]) && d[4].length));
    });
    if (!pool.length) return null;
    const x = pickRandom(pool);
    const d = L.details[x.id];
    const src = L.sources[x.src];
    return {
      id: x.id + ':' + kind, kind,
      title: (kind === 'mistake' ? 'غلطات: ' : 'تمرين: ') + x.n.ar,
      image: 'media/' + x.m + '.svg',
      credit: src ? (en ? 'Illustration & exercise notes: ' + src.name + ' — ' + src.license : 'الرسم وخطوات التمرين: ' + src.name + ' — ' + src.license) : '',
      facts: {
        name: en ? x.n.en : x.n.ar, muscles: x.pm, equipment: x.e, level: x.l,
        how: en ? d[1] : d[0], cues: en ? d[3] : d[2], mistakes: en ? d[5] : d[4]
      }
    };
  }
  if (kind === 'food') {
    const pool = L.foods.filter(f => f.c && !skip('food:' + f.id));
    if (!pool.length) return null;
    const f = pickRandom(pool);
    return {
      id: 'food:' + f.id, kind, title: 'أكل: ' + f.ar, image: '', credit: '',
      facts: { name: en ? f.en : f.ar, per100g: { kcal: f.c, protein_g: f.p, carbs_g: f.cb, fat_g: f.f } }
    };
  }
  if (kind === 'supplement') {
    const pool = L.supps.filter(x => !skip('sup:' + x.id));
    if (!pool.length) return null;
    const x = pickRandom(pool);
    return {
      id: 'sup:' + x.id, kind, title: 'مكمل: ' + x.ar, image: '', credit: '',
      facts: {
        name: en ? x.en : x.ar, evidence: tx(L.grades[x.grade], lang),
        use: tx(x.use, lang), dose: tx(x.dose, lang), when: tx(x.when, lang), caution: tx(x.care, lang)
      }
    };
  }
  return null;
}

/* النص اللي بيتنسخ: البوست + الهاشتاجات + سطر الحقوق (لازم يفضل) */
function fullPost(d, text) {
  return [text.trim(), (d.hashtags || []).join(' '), d.credit].filter(Boolean).join('\n\n');
}

function renderContent() {
  const ct = state.content;
  $('content-card').classList.toggle('hidden', !ct);
  if (!ct) return;
  $('ct-toggle-btn').textContent = ct.on ? 'أوقفه' : 'شغّله تاني';
  $('ct-toggle-btn').className = ct.on ? 'danger' : '';
  $('ct-write-btn').disabled = ctBusy || !ct.on || ct.writesLeft <= 0;
  $('ct-write-btn').textContent = 'اكتب مسودات' + (ct.on ? ' (' + ct.writesLeft + ' فاضلين النهارده)' : '');

  const list = $('ct-list');
  list.innerHTML = '';
  ct.pending.forEach(d => {
    const box = document.createElement('div');
    box.className = 'draft';
    box.dataset.id = d.id;
    const top = document.createElement('div');
    top.className = 'draft-top';
    const name = document.createElement('span');
    name.className = 'draft-name';
    name.textContent = d.title;
    const chip = document.createElement('span');
    chip.className = 'chip on';
    chip.textContent = (d.format === 'reel' ? 'ريلز' : 'بوست') + (d.lang === 'en' ? ' · EN' : '');
    top.append(name, chip);
    box.appendChild(top);
    if (d.image) {
      const img = document.createElement('img');
      img.className = 'post-img';
      img.src = d.image;
      img.alt = '';
      box.appendChild(img);
    }
    const area = document.createElement('textarea');
    area.value = d.text;
    area.dir = d.lang === 'en' ? 'ltr' : 'rtl';
    area.style.minHeight = '150px';
    box.appendChild(area);
    if (d.hashtags && d.hashtags.length) {
      const tags = document.createElement('p');
      tags.className = 'post-tags';
      tags.dir = d.lang === 'en' ? 'ltr' : 'rtl';
      /* كل هاشتاج معزول لوحده — من غير كده العلامة # بتتقلب في العربي */
      d.hashtags.forEach(h => {
        const one = document.createElement('bdi');
        one.dir = 'auto';
        one.textContent = h;
        tags.append(one, ' ');
      });
      box.appendChild(tags);
    }
    if (d.credit) {
      const cr = document.createElement('p');
      cr.className = 'post-credit';
      cr.textContent = d.credit + ' — السطر ده بيتنسخ مع البوست ولازم يفضل (شرط رخصة الرسم)';
      box.appendChild(cr);
    }
    const row = document.createElement('div');
    row.className = 'row';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'ghost ct-copy';
    copy.textContent = 'انسخ';
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(fullPost(d, area.value));
        ctMsg('اتنسخ — الصقه في البوست', 'ok');
      } catch (e) {
        area.select();
        ctMsg('علّم على النص وانسخه بإيدك (Cmd+C)', '');
      }
    });
    const done = document.createElement('button');
    done.type = 'button';
    done.className = 'ct-posted';
    done.textContent = 'نشرته ✓';
    done.addEventListener('click', () => markPost(d, 'posted', area.value, box));
    const skip = document.createElement('button');
    skip.type = 'button';
    skip.className = 'ghost ct-skip';
    skip.textContent = 'تخطّي';
    skip.addEventListener('click', () => markPost(d, 'skipped', '', box));
    row.append(copy, done, skip);
    box.appendChild(row);
    list.appendChild(box);
  });

  $('ct-score').textContent = ct.posted
    ? ('اتنشر ' + ct.posted + ' بوست · ' + ct.unedited + ' منهم من غير تعديل')
    : 'بعد ما تنشر، دوس «نشرته» — كده نعرف كام بوست بيطلع صالح من أول مرة.';
  const doneList = ct.done || [];
  $('ct-done-box').classList.toggle('hidden', !doneList.length);
  $('ct-done').innerHTML = '';
  doneList.forEach(d => {
    const li = document.createElement('li');
    li.textContent = d.title + ' · ' + (d.status === 'posted' ? ('اتنشر' + (d.edited ? ' بعد تعديل' : '')) : 'اتخطّى') + ' · ' + fmtDate(d.doneAt);
    $('ct-done').appendChild(li);
  });
}

function ctMsg(text, kind) {
  $('ct-msg').textContent = text || '';
  $('ct-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

async function markPost(d, status, finalText, box) {
  box.classList.add('sending');
  try {
    state = await call('team_ct_mark', { id: d.id, status, finalText });
    renderContent();
    ctMsg(status === 'posted' ? 'اتسجّل إنه اتنشر ✓' : 'اتشال من القايمة', 'ok');
  } catch (err) {
    box.classList.remove('sending');
    ctMsg(err.message, 'err');
  }
}

$('ct-write-btn').addEventListener('click', async () => {
  if (ctBusy) return;
  ctBusy = true;
  renderContent();
  $('ct-msg').innerHTML = '<span class="spin"></span> بيختار من المكتبة ويكتب… ممكن ياخد دقيقة';
  try {
    const L = await loadLibs();
    const kindSel = $('ct-kind').value;
    const lang = $('ct-lang').value;
    const count = Number($('ct-count').value) || 3;
    const kinds = kindSel === 'mix' ? ['exercise', 'food', 'mistake', 'supplement', 'exercise'] : [kindSel];
    const used = (state.content.used || []).slice();
    const items = [];
    for (let i = 0; i < count; i++) {
      const it = buildItem(kinds[i % kinds.length], L, lang, used);
      if (it) { items.push(it); used.push(it.id); }
    }
    if (!items.length) throw new Error('خلصت الحاجات الجديدة في النوع ده — جرّب نوع تاني');
    state = await call('team_ct_write', { items, format: $('ct-format').value, lang });
    ctMsg(state.written ? ('اتكتب ' + state.written + ' مسودة' + (state.writeNote ? ' · ' + state.writeNote : '')) : (state.writeNote || 'ما اتكتبش حاجة'), state.written ? 'ok' : 'err');
  } catch (err) {
    ctMsg(err.message, 'err');
  }
  ctBusy = false;
  renderContent();
  renderLog();
});

$('ct-toggle-btn').addEventListener('click', async () => {
  const turnOn = !state.content.on;
  try {
    state = await call('team_ct_toggle', { on: turnOn });
    renderContent();
    renderStaff();
    renderLog();
  } catch (err) {
    ctMsg(err.message, 'err');
  }
});

/* ---------- ساعي البريد ---------- */

function mailMsg(text, kind) {
  $('ml-msg').textContent = text || '';
  $('ml-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

function renderMail() {
  const ml = state.mail;
  $('mail-card').classList.toggle('hidden', !ml);
  if (!ml) return;
  $('ml-toggle-btn').textContent = ml.on ? 'أوقفه' : 'شغّله تاني';
  $('ml-toggle-btn').className = ml.on ? 'danger' : '';
  $('ml-stats').innerHTML = '';
  [['النهارده', ml.today], ['آخر ٧ أيام', ml.week], ['وقّفوا الإيميلات', ml.unsubscribed]].forEach(([label, n]) => {
    const box = document.createElement('div');
    box.className = 'ml-stat';
    box.innerHTML = '<b></b><span></span>';
    box.querySelector('b').textContent = n;
    box.querySelector('span').textContent = label;
    $('ml-stats').appendChild(box);
  });
}

function renderMailPreview(list) {
  const ul = $('ml-preview');
  ul.innerHTML = '';
  ul.classList.remove('hidden');
  if (!list.length) {
    ul.innerHTML = '<li>مفيش حد محتاج إيميل دلوقتي — كل العملاء شافوا رسايلهم أو لسه ماعدّاش ساعتين.</li>';
    return;
  }
  list.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = '<strong></strong> <span class="muted"></span><div class="ml-titles"></div>';
    li.querySelector('strong').textContent = p.name;
    li.querySelector('.muted').textContent = '· ' + p.count + (p.count === 1 ? ' حاجة' : ' حاجات') + (p.lang === 'en' ? ' · English' : '');
    li.querySelector('.ml-titles').textContent = p.titles.join(' · ');
    ul.appendChild(li);
  });
}

$('ml-toggle-btn').addEventListener('click', async () => {
  const turnOn = !state.mail.on;
  try {
    state = await call('team_mail_toggle', { on: turnOn });
    renderMail();
    renderStaff();
    renderLog();
  } catch (err) {
    mailMsg(err.message, 'err');
  }
});

$('ml-preview-btn').addEventListener('click', async () => {
  $('ml-preview-btn').disabled = true;
  mailMsg('بيبص على الإشعارات…');
  try {
    const data = await call('team_mail_preview');
    state = data;
    renderMail();
    renderMailPreview(data.preview || []);
    mailMsg('');
  } catch (err) {
    mailMsg(err.message, 'err');
  }
  $('ml-preview-btn').disabled = false;
});

/* ---------- مستشار البرامج ---------- */

function renderAdvisor() {
  const av = state.advisor;
  $('advisor-card').classList.toggle('hidden', !av);
  if (!av) return;
  $('av-toggle-btn').textContent = av.on ? 'أوقفه' : 'شغّله تاني';
  $('av-toggle-btn').className = av.on ? 'danger' : '';
  $('av-stats').innerHTML = '';
  [['أسئلة', av.week.asked], ['اقترح برنامج', av.week.drafts], ['اتحط في المحرر', av.week.applied]].forEach(([label, n]) => {
    const box = document.createElement('div');
    box.className = 'ml-stat';
    box.innerHTML = '<b></b><span></span>';
    box.querySelector('b').textContent = n;
    box.querySelector('span').textContent = label;
    $('av-stats').appendChild(box);
  });
}

$('av-toggle-btn').addEventListener('click', async () => {
  const turnOn = !state.advisor.on;
  try {
    state = await call('team_adv_toggle', { on: turnOn });
    renderAdvisor();
    renderStaff();
    renderLog();
  } catch (err) {
    $('av-msg').textContent = err.message;
    $('av-msg').className = 'msg err';
  }
});

function renderAll(keepShown) {
  renderStaff();
  renderAdvisor();
  renderMail();
  renderSuccess();
  renderContent();
  renderControls();
  renderScore();
  renderHistory();
  renderLog();
  if (!keepShown || !shownId) renderReport(state.analyst.latest);
}

/* ---------- الأفعال ---------- */

function setMsg(text, kind) {
  $('run-msg').textContent = text || '';
  $('run-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

async function refresh() {
  state = await call('team_state');
  renderAll(false);
}

async function openReport(id) {
  if (id === shownId) return;
  try {
    const data = await call('team_report', { id });
    renderReport(data.report);
  } catch (err) {
    setMsg(err.message, 'err');
  }
}

async function sendFeedback(decision) {
  const id = shownId;
  try {
    state = await call('team_feedback', { id, decision, note: $('fb-note').value.trim() });
    renderScore();
    renderHistory();
    const data = await call('team_report', { id });
    renderReport(data.report);
  } catch (err) {
    setMsg(err.message, 'err');
  }
}

$('fb-yes').addEventListener('click', () => sendFeedback('yes'));
$('fb-no').addEventListener('click', () => sendFeedback('no'));

$('run-btn').addEventListener('click', async () => {
  if (busy) return;
  busy = true;
  renderControls();
  setMsg('');
  $('run-msg').innerHTML = '<span class="spin"></span> بيقرا الأرقام ويكتب التقرير… ممكن ياخد دقيقة';
  try {
    state = await call('team_run');
    shownId = '';
    renderAll(false);
    setMsg('اتعمل تقرير جديد ✓', 'ok');
  } catch (err) {
    setMsg(err.message, 'err');
  }
  busy = false;
  if (state) renderControls();
});

$('toggle-btn').addEventListener('click', async () => {
  const turnOn = !state.analyst.on;
  try {
    state = await call('team_toggle', { on: turnOn });
    renderAll(true);
    setMsg(turnOn ? 'المحلّل رجع يشتغل' : 'المحلّل اتوقف — مش هيشتغل السبت الجاي لحد ما تشغّله', turnOn ? 'ok' : '');
  } catch (err) {
    setMsg(err.message, 'err');
  }
});

$('login-btn').addEventListener('click', async () => {
  $('login-msg').textContent = '';
  try {
    await signInWithEmailAndPassword(auth, $('login-email').value.trim(), $('login-pass').value);
  } catch (err) {
    $('login-msg').textContent = 'الإيميل أو الباسورد مش مظبوطين';
  }
});

/* ---------- البداية ---------- */

onAuthStateChanged(auth, async user => {
  if (!user) { $('who').textContent = ''; show('login-box'); return; }
  $('who').textContent = user.email;
  show('loading-box');

  /*
   * مش بنقفل الصفحة هنا على إيميلك بس: لو ضفت حد في TEAM_ADMINS جوه
   * Apps Script، السيرفر هو اللي بيقرر — وده القرار الوحيد اللي يفرق
   */

  try {
    const snap = await getDoc(doc(db, 'settings', 'public'));
    scriptUrl = (snap.exists() && snap.data().url) || '';
  } catch (err) {
    scriptUrl = '';
  }
  if (!scriptUrl) {
    blocked('رابط Apps Script مش متحط', 'افتح لوحة التحكم ← رسالة الترحيب، واتأكد إن الرابط موجود ومحفوظ.');
    return;
  }

  try {
    await refresh();
    show('main');
  } catch (err) {
    if (/مش مسموح/.test(err.message)) blocked('الصفحة دي مش ليك', 'فريق الذكاء الاصطناعي لصاحب المنصة بس.');
    else if (/مش متضاف|طلب مش معروف/.test(err.message)) blocked('ملف analyst لسه مش في Apps Script', 'ضيف ملف analyst.gs في مشروع Apps Script واعمل Deploy بـ New version.');
    else blocked('حصلت مشكلة', err.message);
  }
});
