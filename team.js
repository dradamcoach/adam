/*
 * صفحة فريق ADAM الذكي — لصاحب المنصة بس
 * ------------------------------------------------------------
 * الصفحة دي مابتقراش أي بيانات عملاء خالص. كل اللي بتعمله إنها
 * بتكلّم Apps Script بتوكن دخولك، وهو بيتأكد إنك إنت، ويرجّع
 * التقارير. حتى لو حد فتح الصفحة، من غير حسابك مش هيشوف حاجة.
 */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

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
    { key: 'success', name: 'مساعد نجاح العملاء', job: 'يكتب رسالة للعميل الساكت — ماتتبعتش غير بموافقتك.', chip: ['soon', 'الجاي'], soon: true },
    { key: 'content', name: 'صانع المحتوى', job: 'بوستات من مكتبات التمارين والأكل والتأهيل.', chip: ['soon', 'بعدين'], soon: true }
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
    const who = e.by === 'schedule' ? 'تلقائي' : 'يدوي';
    li.textContent = fmtDate(e.at) + ' · ' + who + ' · ' + (e.ok ? 'تمام' : 'فشل') + (e.ms ? ' · ' + Math.round(e.ms / 1000) + ' ث' : '') + (e.note ? ' · ' + e.note : '');
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

function renderAll(keepShown) {
  renderStaff();
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
