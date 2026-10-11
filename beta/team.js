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
import { TEAM_EN } from './team-i18n.js';

/* ---------- اللغة: عربي أو إنجليزي ----------
   الصفحة بتتكتب عربي، و L() بتقلبها إنجليزي لو اخترت EN. تغيير اللغة
   بيعيد تحميل الصفحة عشان كل حاجة تتبني من الأول باللغة الجديدة */
function readTeamLang() {
  try {
    const v = localStorage.getItem('adam-team-lang') || localStorage.getItem('adam-lang');
    return v === 'en' ? 'en' : 'ar';
  } catch (e) { return 'ar'; }
}
const TEAM_LANG = readTeamLang();
const LOCALE = TEAM_LANG === 'en' ? 'en-GB' : 'ar-EG';
function L(ar) {
  if (TEAM_LANG !== 'en') return ar;
  const hit = TEAM_EN[ar];
  return hit === undefined ? ar : hit;
}

/* الكلام الثابت في team.html (نصوص وخانات) */
function translateStatic(root) {
  if (TEAM_LANG !== 'en') return;
  const norm = t => t.replace(/\s+/g, ' ').trim();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(n => {
    const raw = n.nodeValue;
    if (!/[\u0600-\u06FF]/.test(raw)) return;
    const hit = TEAM_EN[norm(raw)];
    if (hit !== undefined) n.nodeValue = raw.replace(norm(raw), hit);
  });
  root.querySelectorAll('[placeholder]').forEach(el => {
    const hit = TEAM_EN[norm(el.getAttribute('placeholder'))];
    if (hit !== undefined) el.setAttribute('placeholder', hit);
  });
}
document.documentElement.lang = TEAM_LANG;
document.documentElement.dir = TEAM_LANG === 'en' ? 'ltr' : 'rtl';
document.title = L('فريق ADAM الذكي');
translateStatic(document.body);
(function wireTeamLang() {
  const btn = document.getElementById('team-lang-btn');
  if (!btn) return;
  btn.textContent = TEAM_LANG === 'en' ? 'ع' : 'EN';
  btn.addEventListener('click', async () => {
    const next = TEAM_LANG === 'en' ? 'ar' : 'en';
    try { localStorage.setItem('adam-team-lang', next); } catch (e) { /* تجاهل */ }
    btn.disabled = true;
    /* التقارير اللي جاية كمان بتتكتب باللغة دي */
    try { if (auth.currentUser && scriptUrl) await call('team_lang', { lang: next }); } catch (e) { /* مش أساسي */ }
    location.reload();
  });
})();

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
  sup: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19.5a5.5 5.5 0 0 1 11 0"/><path d="M16 11.5l2 2 3.5-3.5"/></svg>',
  rd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>',
  advisor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  content: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1-4L16 5l3 3L8 19l-4 1z"/><path d="M14 7l3 3"/></svg>',
  socm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
  chal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7.6 4h8.8v4.6c0 2.6-2 4.6-4.4 4.6S7.6 11.2 7.6 8.6z"/><path d="M12 13.2V17"/><path d="M8.4 20h7.2"/></svg>',
  inbody: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/></svg>',
  rings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="12" cy="12" r="2"/></svg>'
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
  if (!user) throw new Error(L('مش داخل'));
  const idToken = await user.getIdToken();
  // text/plain عشان المتصفح مايعملش preflight — Apps Script مابيردّش على OPTIONS
  const res = await fetch(scriptUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(Object.assign({ action, idToken }, extra || {}))
  });
  const data = await res.json();
  // نسخة Apps Script قديمة (قبل ملف analyst) — بتفهم الطلب غلط
  if (!data.teamApi) throw new Error(L('ملف analyst مش متضاف'));
  if (!data.ok) throw new Error(data.error || L('حصلت مشكلة'));
  /* أي رد فيه القايمة بيحدّث «مستني منك» — بعد ما اللي نادى يحفظ الحالة */
  if (data.pending) setTimeout(renderInbox, 0);
  return data;
}

/* ---------- العرض ---------- */

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d) ? iso : d.toLocaleString(LOCALE, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
}

/* 2026-09-17 ← "١٧ سبتمبر" — التاريخ بالأرقام بيتقلب في صفحة عربي */
function fmtDay(stamp) {
  if (!stamp) return '';
  const d = new Date(stamp + 'T12:00:00');
  return isNaN(d) ? stamp : d.toLocaleDateString(LOCALE, { day: 'numeric', month: 'long' });
}

function renderStaff() {
  const a = state.analyst;
  const staff = [
    { key: 'analyst', name: L('محلّل الأعمال'), job: L('كل سبت: أرقام الأسبوع قدّام اللي قبله، و٥ أسطر تعمل إيه.'), chip: a.on ? ['on', L('شغّال')] : ['off', L('موقوف')] },
    { key: 'success', name: L('مساعد نجاح العملاء'), job: L('كل يوم: رسالة لكل عميل ساكت — ماتتبعتش غير بموافقتك.'), chip: !state.success ? ['soon', L('محتاج تحديث')] : (state.success.on ? ['on', L('شغّال')] : ['off', L('موقوف')]) },
    { key: 'mail', name: L('ساعي البريد'), job: L('إيميل واحد في اليوم للعميل اللي فاتته رسايل أو تحديثات أكتر من ساعتين.'), chip: !state.mail ? ['soon', L('محتاج تحديث')] : (state.mail.on ? ['on', L('شغّال')] : ['off', L('موقوف')]) },
    { key: 'advisor', name: L('مستشار البرامج'), job: L('جوه صفحة العميل: بيقترح برنامج تمرين من المكتبة، وإنت أو المتخصص تراجعوا وتحفظوا.'), chip: !state.advisor ? ['soon', L('محتاج تحديث')] : (state.advisor.on ? ['on', L('شغّال')] : ['off', L('موقوف')]) },
    { key: 'sup', name: L('مدير المتابعة'), job: L('كل يوم: بريف لكل مدرب وأخصائي بحالاته ومستواه، وكل سبت ترتيبه وسط زمايله — وليك البونص.'), chip: !state.sup ? ['soon', L('محتاج تحديث')] : (state.sup.on ? ['on', L('شغّال')] : ['off', L('موقوف')]) },
    { key: 'rd', name: L('موظف التطوير'), job: L('كل أحد: أفكار جديدة بمصادرها — منافسين وأبحاث وأدوات وتسويق. إنت اللي بتختار.'), chip: !state.rd ? ['soon', L('محتاج تحديث')] : (state.rd.on ? ['on', L('شغّال')] : ['off', L('موقوف')]) },
    { key: 'content', name: L('صانع المحتوى'), job: L('بوستات وسكريبتات ريلز من مكتبات التمارين والأكل والمكملات.'), chip: !state.content ? ['soon', L('محتاج تحديث')] : (state.content.on ? ['on', L('شغّال')] : ['off', L('موقوف')]) },
    { key: 'socm', name: L('مدير السوشيال ميديا'), job: L('كل سبت: التريند في مصر + جدول ٧ بوستات بميعادها وكلامها وصورتها — والصور بلوجو ADAM.'), chip: !state.socm ? ['soon', L('محتاج تحديث')] : (state.socm.on ? ['on', L('شغّال')] : ['off', L('موقوف')]) },
    { key: 'chal', name: L('موظف المسابقات'), job: L('كل جمعة: ٣ أفكار مسابقات للأسبوع الجاي — بتنشرها من لوحة التحكم ← المسابقات.'), chip: state.socm ? ['on', L('شغّال')] : ['soon', L('محتاج تحديث')] },
    { key: 'inbody', name: L('فريق الإنبودي'), job: L('العميل أو الأخصائي يصوّر ورقة الإنبودي: الأرقام بتتقري لوحدها، وبعد الحفظ تحليل بيوصل للعميل ولأخصائي التغذية والمدرب.'), chip: state.socm ? ['on', L('شغّال')] : ['soon', L('محتاج تحديث')] },
    { key: 'rings', name: L('تذكير الحلقات'), job: L('كل يوم ٨ بالليل: إشعار للعميل اللي سلسلته في خطر — مرة واحدة بالكتير.'), chip: state.socm ? ['on', L('شغّال')] : ['soon', L('محتاج تحديث')] }
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
    (L('من ') + fmtDay(report.period.from) + L(' لـ ') + fmtDay(report.period.to) + L(' · اتعمل ') + fmtDate(report.at) + (report.by === 'schedule' ? L(' (تلقائي)') : L(' (يدوي)')));
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
  aiErr.textContent = L('الذكاء الاصطناعي ما ردّش المرة دي (') + (report.aiError || L('مش معروف ليه')) + L(') — الأرقام تحت كاملة ومظبوطة.');

  const movers = $('report-movers');
  movers.innerHTML = '';
  (report.movers || []).slice(0, 4).forEach(m => {
    const chip = document.createElement('span');
    chip.className = 'mover' + (m.better === true ? ' good' : (m.better === false ? ' bad' : ''));
    // "كان ٠ وبقى ٣" بدل السهم — الأسهم والأرقام بتتقلب في الكلام العربي
    chip.textContent = m.label + L(': كان ') + m.before + L(' وبقى ') + m.now;
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
    [t.waitingInjuries, L('بلاغ إصابة مستني رد من أكتر من يومين')],
    [t.waitingConsults, L('طلب استشارة مستني رد من أكتر من يومين')],
    [t.leadsNotContacted, L('رسالة تواصل ماحدش كلّم صاحبها')],
    [t.trialsEnding, L('عميل تجربته المجانية بتخلص خلال أسبوع')],
    [t.newOrdersOpen, L('طلب متجر جديد')]
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
    $('fb-done').textContent = (fb.decision === 'yes' ? L('خدت قرار') : L('ماكانش مفيد')) + (fb.note ? ' — ' + fb.note : '') + '  ';
    const undo = document.createElement('button');
    undo.type = 'button';
    undo.className = 'ghost';
    undo.id = 'fb-undo';
    undo.style.cssText = 'padding:4px 10px;font-size:12px';
    undo.textContent = L('غيّر');
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
    ? (L('قرارات اتاخدت بسبب المحلّل: ') + a.decisions + L(' من ') + a.rated + L(' تقرير متقيّم. لو الرقم ده فضل صفر بعد شهر، أوقف الموظف — ده توفير مش فشل.'))
    : L('قيّم كل تقرير بدوسة — بعد شهر هنعرف الموظف ده نافع ولا لأ.');
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
    li.children[2].textContent = h.feedback ? (h.feedback.decision === 'yes' ? L('تم') : L('رفض')) : '';
    li.addEventListener('click', () => openReport(h.id));
    $('history').appendChild(li);
  });
  highlightHistory();
}

function renderLog() {
  const log = state.log || [];
  $('log').innerHTML = '';
  if (!log.length) {
    $('log').innerHTML = L('<li>لسه مفيش تشغيل.</li>');
    return;
  }
  log.forEach(e => {
    const li = document.createElement('li');
    if (!e.ok) li.className = 'bad';
    const who = e.by === 'schedule' ? L('تلقائي') : (e.by === 'client' ? L('العميل') : L('يدوي'));
    const agent = { success: L('نجاح العملاء'), content: L('صانع المحتوى'), mail: L('ساعي البريد'), advisor: L('مستشار البرامج'), rd: L('موظف التطوير'), sup: L('مدير المتابعة'), rings: L('تذكير الحلقات'), chal: L('موظف المسابقات'), socm: L('مدير السوشيال'), inbody: L('فريق الإنبودي') }[e.agent] || L('المحلّل');
    li.textContent = fmtDate(e.at) + ' · ' + agent + ' · ' + who + ' · ' + (e.ok ? L('تمام') : L('فشل')) + (e.ms >= 1000 ? ' · ' + Math.round(e.ms / 1000) + L(' ث') : '') + (e.note ? ' · ' + e.note : '');
    $('log').appendChild(li);
  });
}

function renderControls() {
  const a = state.analyst;
  $('toggle-btn').textContent = a.on ? L('أوقفه') : L('شغّله تاني');
  $('toggle-btn').className = a.on ? 'danger' : '';
  $('run-btn').disabled = busy || !a.on || a.runsLeft <= 0;
  $('run-btn').textContent = L('شغّله دلوقتي') + (a.on ? ' (' + a.runsLeft + L(' فاضلين النهارده)') : '');
}

/* ---------- مساعد نجاح العملاء ---------- */

function sportLabel(key) {
  const hit = SPORTS.find(x => x.id === key);
  return hit ? hit.ar : '';
}

function reasonChip(d) {
  const since = d.days ? (TEAM_LANG === 'en' ? ' for ' + d.days + ' days' : ' من ' + d.days + ' يوم') : '';
  if (d.kind === 'care') return ['danger', d.care === 'clearance' ? L('مستني إذن طبي') : L('بلاغ إصابة مفتوح')];
  if (d.kind === 'noplan') return ['danger', L('مالوش برنامج لسه')];
  if (d.kind === 'never') return ['warn', L('ما بدأش') + since];
  return ['warn', L('ساكت') + since];
}

function draftText(d) {
  return String(d.text || '').split('{name}').join(d.firstName || '');
}

function renderSuccess() {
  const cs = state.success;
  $('success-card').classList.toggle('hidden', !cs);
  if (!cs) return;
  $('cs-toggle-btn').textContent = cs.on ? L('أوقفه') : L('شغّله تاني');
  $('cs-toggle-btn').className = cs.on ? 'danger' : '';
  $('cs-scan-btn').disabled = csBusy || !cs.on || cs.scansLeft <= 0;
  $('cs-scan-btn').textContent = L('دوّر دلوقتي') + (cs.on ? ' (' + cs.scansLeft + ')' : '');
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
    if (d.coachEmail && d.coachEmail !== String(COACH_EMAIL).toLowerCase()) meta.push(L('مدربه: ') + d.coachEmail);
    if (d.kind !== 'care' && d.kind !== 'noplan' && !d.fromAi) meta.push(L('رسالة جاهزة — الذكاء الاصطناعي ما ردّش المرة دي'));
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
        ? L('مفيش رسالة عن قصد — العميل ده مالوش برنامج تمرين ولا تغذية ولا تأهيل لسه، فمش هنقوله "ابدأ". اكتبله برنامج الأول (أو قول لمدربه).')
        : L('مفيش رسالة جاهزة للعميل ده عن قصد — عنده حاجة صحية مفتوحة، فالأحسن تكلّمه إنت بنفسك من الشات.');
      box.appendChild(note);
      const okBtn = document.createElement('button');
      okBtn.type = 'button';
      okBtn.className = 'ghost cs-skip';
      okBtn.textContent = d.kind === 'noplan' ? L('تمام، هظبطله برنامج') : L('تمام، هكلّمه بنفسي');
      okBtn.addEventListener('click', () => markDraft(d, 'skipped', '', box));
      row.appendChild(okBtn);
    } else {
      const area = document.createElement('textarea');
      area.value = draftText(d);
      area.dir = d.lang === 'en' ? 'ltr' : 'rtl';
      area.setAttribute('aria-label', L('نص الرسالة') + (d.lang === 'en' ? ' · English' : ''));
      box.appendChild(area);
      const send = document.createElement('button');
      send.type = 'button';
      send.className = 'cs-send';
      send.textContent = L('وافق وابعت');
      send.addEventListener('click', () => sendDraft(d, area.value.trim(), box));
      const skip = document.createElement('button');
      skip.type = 'button';
      skip.className = 'ghost cs-skip';
      skip.textContent = L('تخطّي');
      skip.addEventListener('click', () => markDraft(d, 'skipped', '', box));
      row.append(send, skip);
    }
    box.appendChild(row);
    list.appendChild(box);
  });

  $('cs-score').textContent = cs.sent
    ? (L('اتبعت ') + cs.sent + L(' رسالة · ') + cs.returned + L(' منهم رجعوا يتمرنوا أو يسجّلوا · ') + cs.unedited + L(' اتبعتت من غير تعديل'))
    : L('أول ما تبعت رسايل، هنا هتعرف كام عميل رجع بسببها.');

  const done = cs.done || [];
  $('cs-done-box').classList.toggle('hidden', !done.length);
  $('cs-done').innerHTML = '';
  done.forEach(d => {
    const li = document.createElement('li');
    const what = d.status === 'sent' ? (L('اتبعتت') + (d.returned ? L(' · رجع') : '')) : L('اتخطّت');
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
    csMsg(status === 'sent' ? (L('اتبعتت لـ ') + (d.firstName || d.name) + L(' في الشات')) : L('اتشالت من القايمة'), 'ok');
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
  if (!text) { csMsg(L('الرسالة فاضية'), 'err'); return; }
  box.classList.add('sending');
  const me = String(auth.currentUser.email || '').toLowerCase();
  const now = new Date().toISOString();
  try {
    await addDoc(collection(db, 'chats', d.email, 'messages'), { sender: 'coach', text, createdAt: now, senderEmail: me, senderSpec: 'coach' });
    await setDoc(doc(db, 'chats', d.email), { clientEmail: d.email, lastMessage: text, lastMessageAt: now, lastSender: 'coach' }, { merge: true });
  } catch (err) {
    box.classList.remove('sending');
    csMsg(L('الرسالة ما اتبعتتش: ') + err.message, 'err');
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
  $('cs-msg').innerHTML = L('<span class="spin"></span> بيدوّر على العملاء الساكتين ويكتب الرسايل… ممكن ياخد دقيقة');
  try {
    const before = state.success.pending.length;
    state = await call('team_cs_scan');
    const added = state.success.pending.length - before;
    csMsg(added > 0 ? (L('اتكتب ') + added + L(' رسالة جديدة — راجعهم تحت')) : L('مفيش حد ساكت جديد محتاج رسالة'), 'ok');
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
    csMsg(turnOn ? L('المساعد رجع يشتغل') : L('المساعد اتوقف — مش هيكتب رسايل جديدة لحد ما تشغّله'), turnOn ? 'ok' : '');
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
function buildItem(kind, LIB, lang, used) {
  const en = lang === 'en';
  const skip = id => used.indexOf(id) !== -1;
  if (kind === 'exercise' || kind === 'mistake') {
    const pool = LIB.exercises.filter(x => {
      const d = LIB.details[x.id];
      return d && x.m && !skip(x.id + ':' + kind) && (kind !== 'mistake' || (Array.isArray(d[4]) && d[4].length));
    });
    if (!pool.length) return null;
    const x = pickRandom(pool);
    const d = LIB.details[x.id];
    const src = LIB.sources[x.src];
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
    const pool = LIB.foods.filter(f => f.c && !skip('food:' + f.id));
    if (!pool.length) return null;
    const f = pickRandom(pool);
    return {
      id: 'food:' + f.id, kind, title: 'أكل: ' + f.ar, image: '', credit: '',
      facts: { name: en ? f.en : f.ar, per100g: { kcal: f.c, protein_g: f.p, carbs_g: f.cb, fat_g: f.f } }
    };
  }
  if (kind === 'supplement') {
    const pool = LIB.supps.filter(x => !skip('sup:' + x.id));
    if (!pool.length) return null;
    const x = pickRandom(pool);
    return {
      id: 'sup:' + x.id, kind, title: 'مكمل: ' + x.ar, image: '', credit: '',
      facts: {
        name: en ? x.en : x.ar, evidence: tx(LIB.grades[x.grade], lang),
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
  $('ct-toggle-btn').textContent = ct.on ? L('أوقفه') : L('شغّله تاني');
  $('ct-toggle-btn').className = ct.on ? 'danger' : '';
  $('ct-write-btn').disabled = ctBusy || !ct.on || ct.writesLeft <= 0;
  $('ct-write-btn').textContent = L('اكتب مسودات') + (ct.on ? ' (' + ct.writesLeft + L(' فاضلين النهارده)') : '');

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
    chip.textContent = (d.format === 'reel' ? L('ريلز') : L('بوست')) + (d.lang === 'en' ? ' · EN' : '');
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
      cr.textContent = d.credit + L(' — السطر ده بيتنسخ مع البوست ولازم يفضل (شرط رخصة الرسم)');
      box.appendChild(cr);
    }
    const row = document.createElement('div');
    row.className = 'row';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'ghost ct-copy';
    copy.textContent = L('انسخ');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(fullPost(d, area.value));
        ctMsg(L('اتنسخ — الصقه في البوست'), 'ok');
      } catch (e) {
        area.select();
        ctMsg(L('علّم على النص وانسخه بإيدك (Cmd+C)'), '');
      }
    });
    const done = document.createElement('button');
    done.type = 'button';
    done.className = 'ct-posted';
    done.textContent = L('نشرته');
    done.addEventListener('click', () => markPost(d, 'posted', area.value, box));
    const skip = document.createElement('button');
    skip.type = 'button';
    skip.className = 'ghost ct-skip';
    skip.textContent = L('تخطّي');
    skip.addEventListener('click', () => markPost(d, 'skipped', '', box));
    row.append(copy, done, skip);
    box.appendChild(row);
    list.appendChild(box);
  });

  $('ct-score').textContent = ct.posted
    ? (L('اتنشر ') + ct.posted + L(' بوست · ') + ct.unedited + L(' منهم من غير تعديل'))
    : L('بعد ما تنشر، دوس «نشرته» — كده نعرف كام بوست بيطلع صالح من أول مرة.');
  const doneList = ct.done || [];
  $('ct-done-box').classList.toggle('hidden', !doneList.length);
  $('ct-done').innerHTML = '';
  doneList.forEach(d => {
    const li = document.createElement('li');
    li.textContent = d.title + ' · ' + (d.status === 'posted' ? (L('اتنشر') + (d.edited ? L(' بعد تعديل') : '')) : L('اتخطّى')) + ' · ' + fmtDate(d.doneAt);
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
    ctMsg(status === 'posted' ? L('اتسجّل إنه اتنشر') : L('اتشال من القايمة'), 'ok');
  } catch (err) {
    box.classList.remove('sending');
    ctMsg(err.message, 'err');
  }
}

$('ct-write-btn').addEventListener('click', async () => {
  if (ctBusy) return;
  ctBusy = true;
  renderContent();
  $('ct-msg').innerHTML = L('<span class="spin"></span> بيختار من المكتبة ويكتب… ممكن ياخد دقيقة');
  try {
    const LIB = await loadLibs();
    const kindSel = $('ct-kind').value;
    const lang = $('ct-lang').value;
    const count = Number($('ct-count').value) || 3;
    const kinds = kindSel === 'mix' ? ['exercise', 'food', 'mistake', 'supplement', 'exercise'] : [kindSel];
    const used = (state.content.used || []).slice();
    const items = [];
    for (let i = 0; i < count; i++) {
      const it = buildItem(kinds[i % kinds.length], LIB, lang, used);
      if (it) { items.push(it); used.push(it.id); }
    }
    if (!items.length) throw new Error(L('خلصت الحاجات الجديدة في النوع ده — جرّب نوع تاني'));
    state = await call('team_ct_write', { items, format: $('ct-format').value, lang });
    ctMsg(state.written ? (L('اتكتب ') + state.written + L(' مسودة') + (state.writeNote ? ' · ' + state.writeNote : '')) : (state.writeNote || L('ما اتكتبش حاجة')), state.written ? 'ok' : 'err');
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
  $('ml-toggle-btn').textContent = ml.on ? L('أوقفه') : L('شغّله تاني');
  $('ml-toggle-btn').className = ml.on ? 'danger' : '';
  $('ml-stats').innerHTML = '';
  [[L('النهارده'), ml.today], [L('آخر ٧ أيام'), ml.week], [L('وقّفوا الإيميلات'), ml.unsubscribed]].forEach(([label, n]) => {
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
    ul.innerHTML = L('<li>مفيش حد محتاج إيميل دلوقتي — كل العملاء شافوا رسايلهم أو لسه ماعدّاش ساعتين.</li>');
    return;
  }
  list.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = '<strong></strong> <span class="muted"></span><div class="ml-titles"></div>';
    li.querySelector('strong').textContent = p.name;
    li.querySelector('.muted').textContent = '· ' + p.count + (p.count === 1 ? L(' حاجة') : L(' حاجات')) + (p.lang === 'en' ? ' · English' : '');
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
  mailMsg(L('بيبص على الإشعارات…'));
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
  $('av-toggle-btn').textContent = av.on ? L('أوقفه') : L('شغّله تاني');
  $('av-toggle-btn').className = av.on ? 'danger' : '';
  $('av-stats').innerHTML = '';
  [[L('أسئلة'), av.week.asked], [L('اقترح برنامج'), av.week.drafts], [L('اتحط في المحرر'), av.week.applied]].forEach(([label, n]) => {
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

/* ---------- موظف التطوير ---------- */

const RD_AREA = { competitors: L('المنافسين'), research: L('أبحاث'), tech: L('أدوات وتقنية'), growth: L('تسويق ونمو') };
const RD_EFFORT = { small: ['on', L('سهلة — ساعات')], medium: ['warn', L('متوسطة — أيام')], large: ['danger', L('كبيرة — أسابيع')] };
let rdBusy = false;

function rdMsg(text, kind) {
  $('rd-msg').textContent = text || '';
  $('rd-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

async function rdMark(id, status, note) {
  try {
    state = await call('team_rd_mark', { id, status, note: note || '' });
    renderRd();
  } catch (err) {
    rdMsg(err.message, 'err');
  }
}

function rdIdeaCard(idea, mode) {
  const box = document.createElement('div');
  box.className = 'draft rd-idea';
  box.dataset.id = idea.id;
  const top = document.createElement('div');
  top.className = 'draft-top';
  const title = document.createElement('span');
  title.className = 'draft-name';
  title.textContent = idea.title;
  const area = document.createElement('span');
  area.className = 'chip soon';
  area.textContent = RD_AREA[idea.area] || idea.area;
  const eff = RD_EFFORT[idea.effort] || RD_EFFORT.medium;
  const effort = document.createElement('span');
  effort.className = 'chip ' + eff[0];
  effort.textContent = eff[1];
  top.append(title, area, effort);
  if (idea.status === 'later') {
    const later = document.createElement('span');
    later.className = 'chip soon';
    later.textContent = L('بعدين');
    top.appendChild(later);
  }
  box.appendChild(top);
  const what = document.createElement('p');
  what.className = 'rd-what';
  what.textContent = idea.what;
  const why = document.createElement('p');
  why.className = 'draft-meta';
  why.textContent = L('ليه: ') + idea.why;
  box.append(what, why);
  if (idea.sources && idea.sources.length) {
    const src = document.createElement('div');
    src.className = 'rd-sources';
    src.appendChild(document.createTextNode(L('المصادر: ')));
    idea.sources.forEach((s, i) => {
      const a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = s.title || (L('مصدر ') + (i + 1));
      src.appendChild(a);
    });
    box.appendChild(src);
  } else {
    const none = document.createElement('p');
    none.className = 'draft-meta';
    none.textContent = L('مفيش مصدر — دي فكرة من عنده، اتأكد منها.');
    box.appendChild(none);
  }
  if (idea.note) {
    const note = document.createElement('p');
    note.className = 'draft-meta';
    note.textContent = L('ملاحظتك: ') + idea.note;
    box.appendChild(note);
  }
  const row = document.createElement('div');
  row.className = 'row';
  const btn = (label, cls, fn) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    if (cls) b.className = cls;
    b.addEventListener('click', fn);
    row.appendChild(b);
    return b;
  };
  if (mode === 'new') {
    const note = document.createElement('input');
    note.className = 'rd-note';
    note.placeholder = L('ملاحظة ليك أو لـ Claude (اختياري)');
    box.appendChild(note);
    btn(L('عاوزها'), 'rd-want', () => rdMark(idea.id, 'want', note.value.trim()));
    if (idea.status !== 'later') btn(L('بعدين'), 'ghost rd-later', () => rdMark(idea.id, 'later', note.value.trim()));
    btn(L('لأ'), 'ghost rd-no', () => rdMark(idea.id, 'no', note.value.trim()));
  } else if (mode === 'want') {
    btn(L('اتنفّذت'), 'rd-done', () => rdMark(idea.id, 'done', idea.note));
    btn(L('رجّعها للأفكار'), 'ghost rd-back', () => rdMark(idea.id, 'new', idea.note));
  }
  if (row.children.length) box.appendChild(row);
  return box;
}

function rdCopyText() {
  const list = (state.rd && state.rd.wanted) || [];
  return L('أفكار وافقت عليها من موظف التطوير — نفّذها واحدة واحدة:\n\n') + list.map((i, n) =>
    (n + 1) + '. ' + i.title + '\n' + i.what + (i.note ? L('\nملاحظتي: ') + i.note : '')
    + (i.sources && i.sources.length ? L('\nمصادر: ') + i.sources.map(s => s.url).join(' ') : '')
  ).join('\n\n');
}

function renderRd() {
  const rd = state.rd;
  $('rd-card').classList.toggle('hidden', !rd);
  if (!rd) return;
  $('rd-toggle-btn').textContent = rd.on ? L('أوقفه') : L('شغّله تاني');
  $('rd-toggle-btn').className = rd.on ? 'danger' : '';
  $('rd-run-btn').disabled = rdBusy || !rd.on || rd.runsLeft <= 0;
  $('rd-run-btn').textContent = L('دوّر دلوقتي') + (rd.on ? ' (' + rd.runsLeft + L(' فاضلين النهارده)') : '');
  $('rd-list').innerHTML = '';
  rd.ideas.forEach(i => $('rd-list').appendChild(rdIdeaCard(i, 'new')));
  $('rd-empty').classList.toggle('hidden', rd.ideas.length > 0);
  $('rd-wanted-box').classList.toggle('hidden', !rd.wanted.length);
  $('rd-wanted').innerHTML = '';
  rd.wanted.forEach(i => $('rd-wanted').appendChild(rdIdeaCard(i, 'want')));
  $('rd-done-box').classList.toggle('hidden', !rd.done.length);
  $('rd-done').innerHTML = '';
  rd.done.forEach(i => {
    const li = document.createElement('li');
    li.textContent = (i.status === 'done' ? L('اتنفّذت · ') : L('لأ · ')) + i.title;
    $('rd-done').appendChild(li);
  });
  renderStaff();
}

$('rd-run-btn').addEventListener('click', async () => {
  rdBusy = true;
  renderRd();
  rdMsg(L('بيلم الجديد ويرتّب الأفكار… ممكن ياخد دقيقة'));
  try {
    state = await call('team_rd_run');
    rdMsg(state.rdFound ? (L('لقى ') + state.rdFound + L(' أفكار جديدة')) : (state.rdNote || L('مالقاش حاجة جديدة')), state.rdFound ? 'ok' : 'err');
    renderLog();
  } catch (err) {
    rdMsg(err.message, 'err');
  }
  rdBusy = false;
  renderRd();
});

$('rd-toggle-btn').addEventListener('click', async () => {
  try {
    state = await call('team_rd_toggle', { on: !state.rd.on });
    renderRd();
    renderLog();
  } catch (err) {
    rdMsg(err.message, 'err');
  }
});

$('rd-copy-btn').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(rdCopyText());
    $('rd-copy-btn').textContent = L('اتنسخت — ابعتها لـ Claude');
  } catch (err) {
    rdMsg(L('النسخ مااشتغلش — علّم على الأفكار وانسخها بإيدك'), 'err');
  }
});

/* ---------- مستني منك ---------- */

function renderInbox() {
  const list = state.pending || [];
  $('inbox').innerHTML = '';
  if (!list.length) {
    $('inbox').innerHTML = L('<li class="clear">مفيش حاجة مستنياك دلوقتي.</li>');
  }
  list.forEach(item => {
    const li = document.createElement('li');
    if (item.key === 'failed') li.className = 'bad';
    li.dataset.key = item.key;
    const n = document.createElement('b');
    n.textContent = item.n;
    const label = document.createElement('span');
    label.textContent = L(item.label);
    const go = document.createElement('button');
    go.type = 'button';
    go.className = 'ghost';
    go.textContent = L('افتح');
    go.addEventListener('click', () => {
      const card = $(item.card);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.append(n, label, go);
    $('inbox').appendChild(li);
  });
  const o = state.outputs;
  $('outputs').textContent = o ? (L('آخر ٧ أيام: ') + o.silentClientsMessaged + L(' رسالة لعملاء ساكتين (رجع ') + o.silentClientsReturned + ') · '
    + o.postsPublished + L(' بوست · ') + o.programDraftsUsed + L(' مسودة برنامج · ') + o.reminderEmailsSent + L(' إيميل تذكير')) : '';
  $('inbox-card').classList.toggle('hidden', !state.pending);
}

/* ---------- صندوق «لكلود» ----------
   البرنامج مايقدرش يكلّم Claude مباشرة: الطلبات بتتجمّع هنا (منك ومن
   موظف التطوير)، كل طلب بيوصلك إيميل [ADAM → Claude] بتقراه مهمة
   Claude المجدولة، و«انسخ لكلود» بتعمل رسالة واحدة تلزقها في الشات */

const CLAUDE_FROM = { me: 'إنت', rd: 'موظف التطوير', analyst: 'محلّل الأعمال', success: 'مساعد نجاح العملاء', socm: 'مدير السوشيال ميديا', sup: 'مدير المتابعة', content: 'صانع المحتوى', chal: 'موظف المسابقات' };
const CLAUDE_KIND = { feature: 'ميزة جديدة', bug: 'حاجة بايظة', question: 'سؤال', content: 'محتوى' };

function clMsg(text, kind) {
  $('cl-msg').textContent = text || '';
  $('cl-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

function renderClaude() {
  const box = $('cl-list');
  if (!box) return;
  const cl = state.claude || { open: [], done: [] };
  box.innerHTML = '';
  $('cl-empty').classList.toggle('hidden', cl.open.length > 0);
  $('cl-copy-btn').disabled = !cl.open.length;
  cl.open.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cl-item' + (item.status === 'sent' ? ' sent' : '');
    const head = document.createElement('div');
    head.className = 'cl-head';
    const kind = document.createElement('span');
    kind.className = 'chip ' + (item.kind === 'bug' ? 'warn' : 'soon');
    kind.textContent = L(CLAUDE_KIND[item.kind] || CLAUDE_KIND.feature);
    const title = document.createElement('strong');
    title.textContent = item.title;
    head.append(kind, title);
    if (item.status === 'sent') {
      const sent = document.createElement('span');
      sent.className = 'chip on';
      sent.textContent = L('اتبعت لكلود');
      head.appendChild(sent);
    }
    const meta = document.createElement('div');
    meta.className = 'muted';
    meta.textContent = L('من: ') + L(CLAUDE_FROM[item.from] || item.from) + ' · ' + fmtDate(item.at);
    const text = document.createElement('p');
    text.className = 'cl-text';
    text.textContent = item.text || '';
    const actions = document.createElement('div');
    actions.className = 'row';
    const done = document.createElement('button');
    done.type = 'button';
    done.textContent = L('اتنفّذت');
    done.addEventListener('click', () => claudeMark([item.id], 'done'));
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'ghost';
    del.textContent = L('امسح');
    del.addEventListener('click', async () => {
      try { state = await call('team_claude_delete', { id: item.id }); renderAll(true); } catch (err) { clMsg(err.message, 'err'); }
    });
    /* نفس الطلب كـ Issue على GitHub — Claude بيقرا الـ Issues المفتوحة كمان */
    const gh = document.createElement('button');
    gh.type = 'button';
    gh.className = 'ghost';
    gh.textContent = L('افتحه Issue على GitHub');
    gh.addEventListener('click', () => window.open(claudeIssueUrl(item), '_blank', 'noopener'));
    actions.append(done, gh, del);
    row.append(head, meta);
    if (item.text) row.appendChild(text);
    row.appendChild(actions);
    box.appendChild(row);
  });
  const doneList = $('cl-done');
  doneList.innerHTML = '';
  (cl.done || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.title + ' · ' + fmtDate(item.markedAt || item.at) + ' ';
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'ghost';
    back.textContent = L('رجّعه مفتوح');
    back.addEventListener('click', () => claudeMark([item.id], 'new'));
    li.appendChild(back);
    doneList.appendChild(li);
  });
  $('cl-done-box').classList.toggle('hidden', !(cl.done || []).length);
}

async function claudeMark(ids, status) {
  try {
    state = await call('team_claude_mark', { ids, status });
    renderAll(true);
  } catch (err) { clMsg(err.message, 'err'); }
}

const GITHUB_REPO = 'dradamcoach/adam';

/* رابط Issue جاهز: العنوان والتفاصيل مكتوبين، والإنت بتدوس «Submit» بس */
function claudeIssueUrl(item) {
  const body = [
    '**' + L(CLAUDE_KIND[item.kind] || CLAUDE_KIND.feature) + '** — ' + L('من: ') + L(CLAUDE_FROM[item.from] || item.from),
    '',
    String(item.text || '').slice(0, 3000),
    '',
    '---',
    'ADAM-REQ: ' + (item.id || '') + ' · ' + L('لـ Claude — اتبعت من صفحة فريق ADAM')
  ].join('\n');
  return 'https://github.com/' + GITHUB_REPO + '/issues/new'
    + '?title=' + encodeURIComponent('[Claude] ' + (item.title || L('طلب'))) 
    + '&labels=claude'
    + '&body=' + encodeURIComponent(body);
}

/* رسالة واحدة جاهزة للشات مع Claude */
function claudeBrief(list) {
  const head = [
    L('أهلًا Claude — دي طلبات من صفحة فريق ADAM. نفس المشروع اللي شغالين عليه (vanilla JS + Firebase + Apps Script): app.js / index.html / glass.css / team.js / analyst.gs.'),
    L('نفّذها واحدة واحدة، وابعتلي الملفات اللي اتغيرت بس في zip، وقولّي الخطوات بالمصري.'),
    ''
  ];
  const body = list.map((item, i) => [
    (i + 1) + ') [' + L(CLAUDE_KIND[item.kind] || CLAUDE_KIND.feature) + '] ' + item.title + ' — ' + L('من: ') + L(CLAUDE_FROM[item.from] || item.from),
    item.text || ''
  ].filter(Boolean).join('\n'));
  return head.join('\n') + body.join('\n\n');
}

$('cl-add-btn').addEventListener('click', async () => {
  const title = $('cl-title').value.trim();
  const text = $('cl-text').value.trim();
  if (!title && !text) { clMsg(L('اكتب الطلب الأول'), 'err'); return; }
  $('cl-add-btn').disabled = true;
  try {
    state = await call('team_claude_add', { kind: $('cl-kind').value, title, text });
    $('cl-title').value = '';
    $('cl-text').value = '';
    renderAll(true);
    clMsg(L('الطلب اتضاف — ووصلك إيميل بيه'), 'ok');
  } catch (err) {
    clMsg(err.message, 'err');
  } finally {
    $('cl-add-btn').disabled = false;
  }
});

$('cl-copy-btn').addEventListener('click', async () => {
  const open = ((state && state.claude && state.claude.open) || []);
  if (!open.length) { clMsg(L('مفيش طلبات مفتوحة تتنسخ'), 'err'); return; }
  try {
    await navigator.clipboard.writeText(claudeBrief(open));
    clMsg(L('اتنسخت — افتح شات Claude والزقها'), 'ok');
    const fresh = open.filter(x => x.status === 'new').map(x => x.id);
    if (fresh.length) claudeMark(fresh, 'sent');
  } catch (err) {
    clMsg(L('النسخ مااشتغلش — علّم على الأفكار وانسخها بإيدك'), 'err');
  }
});

/* ---------- مدير المتابعة ---------- */

const SUP_LEVEL = { top: ['on', L('متميز')], ok: ['soon', L('كويس')], low: ['warn', L('محتاج يتحسن')], idle: ['danger', L('غير نشط')], none: ['soon', L('مالوش عملاء')] };

function supMsg(text, kind) {
  $('sup-msg').textContent = text || '';
  $('sup-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

function renderSup() {
  const sp = state.sup;
  $('sup-card').classList.toggle('hidden', !sp);
  if (!sp) return;
  $('sup-toggle-btn').textContent = sp.on ? L('أوقفه') : L('شغّله تاني');
  $('sup-toggle-btn').className = sp.on ? 'danger' : '';
  const body = $('sup-table');
  body.innerHTML = '';
  const list = (sp.last && sp.last.providers) || [];
  $('sup-empty').classList.toggle('hidden', list.length > 0);
  $('sup-when').textContent = sp.last ? (L('آخر حساب: ') + fmtDate(sp.last.at)) : '';
  const pick = $('sup-preview-pick');
  const keep = pick.value;
  pick.innerHTML = '';
  list.forEach(p => {
    const tr = document.createElement('tr');
    const lv = SUP_LEVEL[p.level] || SUP_LEVEL.none;
    const cells = [p.name, p.specialty, p.clients + ' (' + p.active + ')', p.clients ? p.score : '—', '', p.rank ? p.rank + '/' + p.groupSize : '—',
      p.lastSeenDays === null ? L('ماخلش') : (p.lastSeenDays === 0 ? L('النهارده') : (TEAM_LANG === 'en' ? p.lastSeenDays + ' days ago' : 'من ' + p.lastSeenDays + ' يوم'))];
    cells.forEach((c, i) => {
      const td = document.createElement('td');
      if (i === 4) {
        const chip = document.createElement('span');
        chip.className = 'chip ' + lv[0];
        chip.textContent = lv[1];
        td.appendChild(chip);
      } else td.textContent = c;
      if (i === 2 || i === 3 || i === 5) td.className = 'n';
      tr.appendChild(td);
    });
    if (p.counts && (p.counts.silent || p.counts.overdue || p.counts.noPlan)) {
      tr.title = [p.counts.silent ? p.counts.silent + L(' عميل ساكت') : '', p.counts.overdue ? p.counts.overdue + L(' استشارة متأخرة') : '', p.counts.noPlan ? p.counts.noPlan + L(' من غير برنامج') : ''].filter(Boolean).join(' · ');
    }
    body.appendChild(tr);
    if (!p.isOwner && p.clients) {
      const o = document.createElement('option');
      o.value = p.email;
      o.textContent = p.name;
      pick.appendChild(o);
    }
  });
  if (keep) pick.value = keep;
  $('sup-preview-row').classList.toggle('hidden', !pick.options.length);

  const b = sp.bonus || { rows: [] };
  $('sup-month').textContent = b.month || '';
  if (document.activeElement !== $('sup-amount')) $('sup-amount').value = b.amount || '';
  const rows = $('sup-bonus-rows');
  rows.innerHTML = '';
  b.rows.forEach(r => {
    const tr = document.createElement('tr');
    [r.name, r.points, b.amount ? r.share + L(' جنيه') : '—'].forEach((c, i) => {
      const td = document.createElement('td');
      td.textContent = c;
      if (i) td.className = 'n';
      tr.appendChild(td);
    });
    rows.appendChild(tr);
  });
  $('sup-bonus-empty').classList.toggle('hidden', b.rows.length > 0);
  $('sup-approve-btn').disabled = !b.amount || !b.rows.length;
  $('sup-approved').textContent = b.approved ? (L('اعتمدت توزيع الشهر ده (') + b.approved.amount + L(' جنيه) — ') + fmtDate(b.approved.at)) : '';
}

$('sup-run-btn').addEventListener('click', async () => {
  $('sup-run-btn').disabled = true;
  supMsg(L('بيحسب…'));
  try { state = await call('team_sup_run'); renderSup(); renderLog(); supMsg(L('اتحسب — مفيش إيميلات اتبعتت'), 'ok'); } catch (err) { supMsg(err.message, 'err'); }
  $('sup-run-btn').disabled = false;
});
$('sup-preview-btn').addEventListener('click', async () => {
  supMsg(L('بيبعت نسخة ليك…'));
  try { state = await call('team_sup_preview', { provider: $('sup-preview-pick').value }); renderSup(); supMsg(state.supNote || L('اتبعتت'), 'ok'); } catch (err) { supMsg(err.message, 'err'); }
});
$('sup-amount-btn').addEventListener('click', async () => {
  try { state = await call('team_sup_bonus', { month: state.sup.bonus.month, amount: Number($('sup-amount').value) || 0 }); renderSup(); supMsg(L('اتحفظ مبلغ البونص'), 'ok'); } catch (err) { supMsg(err.message, 'err'); }
});
$('sup-approve-btn').addEventListener('click', async () => {
  try { state = await call('team_sup_approve'); renderSup(); renderLog(); supMsg(L('اتعتمد — الدفع عليك إنت'), 'ok'); } catch (err) { supMsg(err.message, 'err'); }
});
$('sup-toggle-btn').addEventListener('click', async () => {
  try { state = await call('team_sup_toggle', { on: !state.sup.on }); renderSup(); renderStaff(); renderLog(); } catch (err) { supMsg(err.message, 'err'); }
});

function renderAll(keepShown) {
  renderInbox();
  renderClaude();
  renderSup();
  renderStaff();
  renderRd();
  renderSocm();
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

let langSynced = false;
async function refresh() {
  state = await call('team_state');
  renderAll(false);
  /* تقارير الموظفين بتمشي مع لغة الصفحة */
  if (!langSynced && state.lang && state.lang !== TEAM_LANG) {
    langSynced = true;
    call('team_lang', { lang: TEAM_LANG }).catch(() => {});
  }
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
  $('run-msg').innerHTML = L('<span class="spin"></span> بيقرا الأرقام ويكتب التقرير… ممكن ياخد دقيقة');
  try {
    state = await call('team_run');
    shownId = '';
    renderAll(false);
    setMsg(L('اتعمل تقرير جديد'), 'ok');
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
    setMsg(turnOn ? L('المحلّل رجع يشتغل') : L('المحلّل اتوقف — مش هيشتغل السبت الجاي لحد ما تشغّله'), turnOn ? 'ok' : '');
  } catch (err) {
    setMsg(err.message, 'err');
  }
});

$('login-btn').addEventListener('click', async () => {
  $('login-msg').textContent = '';
  try {
    await signInWithEmailAndPassword(auth, $('login-email').value.trim(), $('login-pass').value);
  } catch (err) {
    $('login-msg').textContent = L('الإيميل أو الباسورد مش مظبوطين');
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
    blocked(L('رابط Apps Script مش متحط'), L('افتح لوحة التحكم ← رسالة الترحيب، واتأكد إن الرابط موجود ومحفوظ.'));
    return;
  }

  try {
    await refresh();
    show('main');
  } catch (err) {
    if (/مش مسموح/.test(err.message)) blocked(L('الصفحة دي مش ليك'), L('فريق الذكاء الاصطناعي لصاحب المنصة بس.'));
    else if (/مش متضاف|طلب مش معروف/.test(err.message)) blocked(L('ملف analyst لسه مش في Apps Script'), L('ضيف ملف analyst.gs في مشروع Apps Script واعمل Deploy بـ New version.'));
    else blocked(L('حصلت مشكلة'), err.message);
  }
});

/* ---------- مدير السوشيال ميديا + استوديو الصور ---------- */

const SOCM_DAYS = [L('السبت'), L('الحد'), L('الاتنين'), L('التلات'), L('الأربع'), L('الخميس'), L('الجمعة')];
const SOCM_PLATFORM = { instagram: L('إنستجرام'), tiktok: L('تيك توك'), facebook: L('فيسبوك') };
const SOCM_FORMAT = { reel: L('ريل'), post: L('بوست'), carousel: L('كاروسيل'), story: L('ستوري') };
const SOCM_VISUAL = {
  photo_you: L('صورة ليك أو لعميل (بموافقته) — وحط عليها اللوجو من الاستوديو'),
  video_you: L('فيديو تصوّره بموبايلك'),
  template_tip: L('قالب نصيحة جاهز — دوس «اعمل الصورة»'),
  template_quote: L('قالب جملة جاهز — دوس «اعمل الصورة»'),
  template_stat: L('قالب رقم من ADAM — دوس «اعمل الصورة»'),
  template_champion: L('قالب بطل الأسبوع — دوس «اعمل الصورة»'),
  ai_image: L('صورة من Gemini: انسخ الوصف، افتح Gemini واطلب الصورة، وبعدين ارفعها في الاستوديو عشان اللوجو')
};
let socmBusy = false;

function socmMsg(text, kind) {
  $('socm-msg').textContent = text || '';
  $('socm-msg').className = 'msg' + (kind ? ' ' + kind : '');
}

function socmCopy(text, okText) {
  try { navigator.clipboard.writeText(text); socmMsg(okText || L('اتنسخ'), 'ok'); } catch (err) { socmMsg(L('مقدرتش أنسخ — علّم الكلام وانسخه بإيدك'), 'err'); }
}

function socmPostCard(p, todayIdx) {
  const box = document.createElement('div');
  box.className = 'socm-post' + (p.status === 'posted' ? ' posted' : '') + (p.status === 'skip' ? ' skip' : '') + (p.day === todayIdx && p.status === 'new' ? ' today' : '');
  const top = document.createElement('div');
  top.className = 'draft-top';
  const when = document.createElement('span');
  when.className = 'chip ' + (p.day === todayIdx ? 'warn' : 'soon');
  when.textContent = SOCM_DAYS[p.day] + ' ' + p.time + (p.day === todayIdx ? L(' · النهارده') : '');
  const where = document.createElement('span');
  where.className = 'chip on';
  where.textContent = (SOCM_PLATFORM[p.platform] || p.platform) + ' · ' + (SOCM_FORMAT[p.format] || p.format);
  top.append(when, where);
  if (p.trend) {
    const tr = document.createElement('span');
    tr.className = 'chip danger';
    tr.textContent = p.trend;
    top.appendChild(tr);
  }
  if (p.status === 'posted') top.appendChild(Object.assign(document.createElement('span'), { className: 'chip on', textContent: L('اتنشر') }));
  const hook = document.createElement('div');
  hook.className = 'socm-hook';
  hook.textContent = p.hookAr;
  const cap = document.createElement('p');
  cap.className = 'socm-cap';
  cap.textContent = p.captionAr;
  const tags = document.createElement('div');
  tags.className = 'socm-tags';
  tags.textContent = (p.hashtags || []).join(' ');
  const vis = document.createElement('div');
  vis.className = 'socm-visual';
  vis.textContent = SOCM_VISUAL[p.visual] || '';
  if (p.visual === 'ai_image' && p.imagePrompt) {
    const pr = document.createElement('p');
    pr.className = 'socm-prompt';
    pr.textContent = p.imagePrompt;
    vis.appendChild(pr);
  }
  if ((p.visual === 'video_you' || p.format === 'reel') && (p.shots || []).length) {
    const ol = document.createElement('ol');
    p.shots.forEach(sh => { const li = document.createElement('li'); li.textContent = sh; ol.appendChild(li); });
    vis.appendChild(ol);
  }
  const why = document.createElement('p');
  why.className = 'socm-why';
  why.textContent = p.why || '';
  const actions = document.createElement('div');
  actions.className = 'socm-actions';
  const copyText = document.createElement('button');
  copyText.type = 'button';
  copyText.textContent = L('انسخ الكلام');
  copyText.addEventListener('click', () => socmCopy(p.hookAr + '\n' + p.captionAr + '\n\n' + (p.hashtags || []).join(' '), L('الكلام اتنسخ — الصقه في البوست')));
  actions.appendChild(copyText);
  if (p.visual === 'ai_image' && p.imagePrompt) {
    const cp = document.createElement('button');
    cp.type = 'button';
    cp.className = 'ghost';
    cp.textContent = L('انسخ وصف الصورة');
    cp.addEventListener('click', () => socmCopy(p.imagePrompt, L('الوصف اتنسخ — الصقه في Gemini')));
    actions.appendChild(cp);
  }
  if (/^template_/.test(p.visual) || p.visual === 'ai_image' || p.visual === 'photo_you') {
    const mk = document.createElement('button');
    mk.type = 'button';
    mk.className = 'ghost';
    mk.textContent = p.visual.indexOf('template_') === 0 ? L('اعمل الصورة') : L('حط اللوجو على صورتك');
    mk.addEventListener('click', () => studioFrom(p));
    actions.appendChild(mk);
  }
  const done = document.createElement('button');
  done.type = 'button';
  done.className = p.status === 'posted' ? 'ghost' : '';
  done.textContent = p.status === 'posted' ? L('رجّعها') : L('نشرته');
  done.addEventListener('click', () => socmMark(p.i, p.status === 'posted' ? 'new' : 'posted'));
  const skip = document.createElement('button');
  skip.type = 'button';
  skip.className = 'ghost';
  skip.textContent = p.status === 'skip' ? L('رجّعها') : L('اتخطّاها');
  skip.addEventListener('click', () => socmMark(p.i, p.status === 'skip' ? 'new' : 'skip'));
  actions.append(done, skip);
  box.append(top, hook, cap, tags, vis, why, actions);
  return box;
}

async function socmMark(i, status) {
  try { state = await call('team_socm_mark', { i, status }); renderSocm(); } catch (err) { socmMsg(err.message, 'err'); }
}

function renderSocm() {
  const sm = state.socm;
  $('socm-card').classList.toggle('hidden', !sm);
  if (!sm) return;
  $('socm-toggle-btn').textContent = sm.on ? L('أوقفه') : L('شغّله تاني');
  $('socm-toggle-btn').className = sm.on ? 'danger' : '';
  $('socm-run-btn').disabled = socmBusy || sm.runsLeft <= 0;
  $('socm-run-btn').textContent = socmBusy ? L('بيشتغل… (دقيقة)') : L('اعمل جدول دلوقتي (') + sm.runsLeft + L(' فاضلين النهارده)');
  if (document.activeElement !== $('socm-times')) $('socm-times').value = sm.times || '';
  $('socm-trends').innerHTML = '';
  if (!(sm.trends || []).length) $('socm-trends').appendChild(Object.assign(document.createElement('span'), { className: 'muted', textContent: L('لسه مفيش — بيتجاب مع الجدول') }));
  (sm.trends || []).forEach(t => {
    const a = document.createElement(t.url ? 'a' : 'span');
    a.className = 'socm-trend';
    if (t.url) { a.href = t.url; a.target = '_blank'; a.rel = 'noopener'; }
    a.textContent = t.title + ' ';
    if (t.traffic) a.appendChild(Object.assign(document.createElement('small'), { textContent: t.traffic }));
    $('socm-trends').appendChild(a);
  });
  const todayIdx = (new Date().getDay() + 1) % 7;
  $('socm-list').innerHTML = '';
  (sm.posts || []).forEach(p => $('socm-list').appendChild(socmPostCard(p, todayIdx)));
  $('socm-empty').classList.toggle('hidden', (sm.posts || []).length > 0);
  if (sm.error && !(sm.posts || []).length) socmMsg(sm.error, 'err');
}

$('socm-run-btn').addEventListener('click', async () => {
  socmBusy = true; renderSocm(); socmMsg(L('بيشوف التريند ويكتب الجدول…'));
  try {
    state = await call('team_socm_run');
    socmMsg(state.socmNote ? L('مقدرش يعمل جدول: ') + state.socmNote : L('الجدول جاهز'), state.socmNote ? 'err' : 'ok');
  } catch (err) { socmMsg(err.message, 'err'); }
  socmBusy = false; renderSocm(); renderLog(); renderInbox();
});
$('socm-toggle-btn').addEventListener('click', async () => {
  try { state = await call('team_socm_toggle', { on: !state.socm.on }); renderSocm(); renderStaff(); renderLog(); } catch (err) { socmMsg(err.message, 'err'); }
});
$('socm-times-btn').addEventListener('click', async () => {
  try { state = await call('team_socm_times', { times: $('socm-times').value }); renderSocm(); socmMsg(L('المواعيد اتحفظت — الجدول الجاي هيمشي عليها'), 'ok'); } catch (err) { socmMsg(err.message, 'err'); }
});

/* الاستوديو: كل الرسم على الموبايل/الكمبيوتر نفسه — مفيش رفع لأي حتة */
const STUDIO_SIZES = { post: [1080, 1350], story: [1080, 1920], square: [1080, 1080] };
let studioPhoto = null;
let studioLogo = null;

function studioLoadLogo() {
  return new Promise(resolve => {
    if (studioLogo) { resolve(studioLogo); return; }
    const img = new Image();
    img.onload = () => { studioLogo = img; resolve(img); };
    img.onerror = () => resolve(null);
    img.src = 'icon-512.png';
  });
}

function studioWrap(ctx, text, x, y, maxW, lh, maxLines) {
  const words = String(text || '').split(/\s+/);
  let line = '', row = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line ? line + ' ' + words[i] : words[i];
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line, x, y + row * lh);
      line = words[i]; row++;
      if (maxLines && row >= maxLines) return row;
    } else line = test;
  }
  if (line) { ctx.fillText(line, x, y + row * lh); row++; }
  return row;
}

async function studioDraw() {
  const c = $('st-canvas');
  const kind = $('st-kind').value;
  const size = STUDIO_SIZES[$('st-size').value] || STUDIO_SIZES.post;
  c.width = size[0]; c.height = size[1];
  const W = c.width, H = c.height;
  const ctx = c.getContext('2d');
  try { await document.fonts.load('700 80px Cairo'); await document.fonts.load('400 40px Cairo'); } catch (err) { /* خط احتياطي */ }
  const logo = await studioLoadLogo();
  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  const title = $('st-title').value.trim();
  const body = $('st-body').value.trim();

  if (kind === 'photo' && studioPhoto) {
    const r = Math.max(W / studioPhoto.width, H / studioPhoto.height);
    const w = studioPhoto.width * r, h = studioPhoto.height * r;
    ctx.drawImage(studioPhoto, (W - w) / 2, (H - h) / 2, w, h);
    if (title || body) {
      const g = ctx.createLinearGradient(0, H * 0.6, 0, H);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.78)');
      ctx.fillStyle = g; ctx.fillRect(0, H * 0.55, W, H * 0.45);
      ctx.fillStyle = '#fff'; ctx.font = '700 70px Cairo, sans-serif';
      const rows = title ? studioWrap(ctx, title, W / 2, H - 250, W - 140, 84, 2) : 0;
      ctx.font = '400 42px Cairo, sans-serif'; ctx.fillStyle = '#e2e8f0';
      if (body) studioWrap(ctx, body, W / 2, H - 250 + rows * 84 + 10, W - 140, 56, 2);
    }
    if (logo) {
      ctx.save();
      ctx.globalAlpha = 0.95;
      ctx.drawImage(logo, W - 190, 40, 150, 150);
      ctx.restore();
    }
    return;
  }

  /* القوالب */
  const bg = ctx.createLinearGradient(0, 0, W, H);
  const pal = { tip: ['#0b1220', '#0f2a24'], quote: ['#1a1033', '#0b1220'], stat: ['#0b1220', '#102a43'], champion: ['#2a1d05', '#0b1220'], photo: ['#0b1220', '#0f2a24'] }[kind];
  bg.addColorStop(0, pal[0]); bg.addColorStop(1, pal[1]);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.2, H * 0.2, 0, W * 0.2, H * 0.2, W * 0.7);
  glow.addColorStop(0, kind === 'champion' ? 'rgba(250,204,21,.18)' : 'rgba(34,197,94,.16)'); glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
  if (logo) ctx.drawImage(logo, W / 2 - 80, 70, 160, 160);
  ctx.fillStyle = '#eef3f9'; ctx.font = '700 44px Cairo, sans-serif';
  ctx.fillText('ADAM', W / 2, 290);
  const mid = H / 2;
  const badge = { tip: 'نصيحة', quote: 'اقتباس', stat: 'مجتمع ADAM', champion: 'بطل الأسبوع', photo: '' }[kind];
  ctx.font = '700 46px Cairo, sans-serif'; ctx.fillStyle = kind === 'champion' ? '#facc15' : '#22c55e';
  if (badge) ctx.fillText(badge, W / 2, mid - 190);
  if (kind === 'stat' || kind === 'champion') {
    ctx.fillStyle = '#ffffff'; ctx.font = '700 150px Cairo, sans-serif';
    studioWrap(ctx, title || '—', W / 2, mid, W - 120, 160, 2);
    ctx.fillStyle = '#9fb3c8'; ctx.font = '400 50px Cairo, sans-serif';
    studioWrap(ctx, body, W / 2, mid + 170, W - 160, 66, 4);
  } else {
    ctx.fillStyle = '#ffffff'; ctx.font = (kind === 'quote' ? '700 78px' : '700 72px') + ' Cairo, sans-serif';
    const rows = studioWrap(ctx, kind === 'quote' ? '«' + (title || '') + '»' : title, W / 2, mid - 60, W - 140, 96, 4);
    ctx.fillStyle = '#cbd5e1'; ctx.font = '400 46px Cairo, sans-serif';
    studioWrap(ctx, body, W / 2, mid - 40 + rows * 96 + 30, W - 160, 64, 6);
  }
  /* الفوتر */
  ctx.fillStyle = '#22c55e';
  const fy = H - 170;
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(W / 2 - 330, fy, 660, 100, 50); else ctx.rect(W / 2 - 330, fy, 660, 100);
  ctx.fill();
  ctx.fillStyle = '#06210f'; ctx.font = '700 40px Cairo, sans-serif';
  ctx.fillText('ابدأ مع ADAM — اللينك في البايو', W / 2, fy + 64);
}

function studioSync() {
  const kind = $('st-kind').value;
  $('st-file-wrap').classList.toggle('hidden', kind !== 'photo');
  $('st-champ-note').classList.toggle('hidden', kind !== 'champion');
  $('st-title').placeholder = kind === 'stat' ? L('الرقم (مثلًا: 120 نجمة)') : kind === 'champion' ? L('الاسم (بموافقته)') : L('العنوان');
  studioDraw();
}

function studioFrom(p) {
  const map = { template_tip: 'tip', template_quote: 'quote', template_stat: 'stat', template_champion: 'champion' };
  $('st-kind').value = map[p.visual] || 'photo';
  $('st-size').value = p.format === 'reel' || p.format === 'story' ? 'story' : 'post';
  $('st-title').value = p.templateTitle || (map[p.visual] ? p.hookAr : '');
  $('st-body').value = p.templateBody || '';
  studioSync();
  $('studio-head').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

['st-kind', 'st-size'].forEach(id => $(id).addEventListener('change', studioSync));
['st-title', 'st-body'].forEach(id => $(id).addEventListener('input', () => studioDraw()));
$('st-file').addEventListener('change', () => {
  const f = $('st-file').files && $('st-file').files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => { const img = new Image(); img.onload = () => { studioPhoto = img; studioDraw(); }; img.src = reader.result; };
  reader.readAsDataURL(f);
});
$('st-download').addEventListener('click', async () => {
  await studioDraw();
  $('st-canvas').toBlob(blob => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'adam-' + $('st-kind').value + '-' + Date.now() + '.png';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }, 'image/png');
});
$('st-gemini').addEventListener('click', () => window.open('https://gemini.google.com/app', '_blank', 'noopener'));
studioSync();
