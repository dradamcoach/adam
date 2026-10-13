/*
 * ADAM+ — الرحلات · الطلعات · سؤال اليوم · خطتي · أكلي · تأهيلي
 * ملف منفصل عن app.js (بيتحمّل عند أول فتح). كل الشاشات عربي/إنجليزي.
 * البيانات الشخصية بتتخزن على الجهاز، وبتتزامن مع مستند checkins/{email}
 * (حقل plus) لو الحساب مسموح له. الطلعات بتحتاج قواعد events في Firestore.
 */
import { JOURNEYS, GOVERNORATES, EVENT_TYPES, INJURY_AREAS, DIETS, GOALS, GOAL_KEYWORDS } from './adam-plus-data.js';
import { SPORTS, SPORT_GROUPS, SPORT_TEMPLATES } from './sports.js';
import { EXERCISE_LIBRARY } from './exercise-library.js';
import { FOOD_LIBRARY, FOOD_SERVINGS } from './food-library.js';
import { NUTRITION_PROGRAMS } from './nutrition-programs.js';

const FB_APP = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
const FB_FS = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const FB_AUTH = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

/* ---------------------------------------------------------------- أدوات */
const lang = () => (document.documentElement.lang === 'en' ? 'en' : 'ar');
const L = (ar, en) => (lang() === 'en' ? en : ar);
const pick = (o) => (o && (o[lang()] || o.ar || o.en)) || '';
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const stamp = (d) => { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const addDays = (s, n) => { const d = new Date(s + 'T12:00:00'); d.setDate(d.getDate() + n); return stamp(d); };
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);
const nameOf = (o) => (lang() === 'en' ? (o.en || o.ar) : (o.ar || o.en)) || '';
const SPORT_BY_ID = {}; SPORTS.forEach((s) => { SPORT_BY_ID[s.id] = s; });
const GOV_BY_ID = {}; GOVERNORATES.forEach((g) => { GOV_BY_ID[g[0]] = g; });
const FOOD_BY_ID = {}; let foodsAll = FOOD_LIBRARY.slice(); foodsAll.forEach((f) => { FOOD_BY_ID[f.id] = f; });
const EX_BY_ID = {}; let exAll = EXERCISE_LIBRARY.slice(); exAll.forEach((e) => { EX_BY_ID[e.id] = e; });
let programsAll = NUTRITION_PROGRAMS.slice();
const WEEKDAYS = [['السبت', 'Saturday'], ['الأحد', 'Sunday'], ['الاثنين', 'Monday'], ['الثلاثاء', 'Tuesday'], ['الأربعاء', 'Wednesday'], ['الخميس', 'Thursday'], ['الجمعة', 'Friday']];
const SHORT_AR = ['سبت', 'حد', 'اثنين', 'ثلاث', 'أربع', 'خميس', 'جمعة'];
const dayIdx = (d) => (d.getDay() + 1) % 7; /* السبت = 0 */

async function loadExtras() {
  try { const m = await import('./library/food-extra.js'); (m.FOOD_LIBRARY_EXTRA || []).forEach((f) => { if (!FOOD_BY_ID[f.id]) { FOOD_BY_ID[f.id] = f; foodsAll.push(f); } }); } catch (e) { /* عادي */ }
  try { const m = await import('./library/programs-extra.js'); (m.NUTRITION_PROGRAMS_EXTRA || []).forEach((p) => { if (!programsAll.some((x) => x.id === p.id)) programsAll.push(p); }); } catch (e) { /* عادي */ }
  try { const m = await import('./library/programs-sports.js'); (m.NUTRITION_PROGRAMS_SPORTS || []).forEach((p) => { if (!programsAll.some((x) => x.id === p.id)) programsAll.push(p); }); } catch (e) { /* عادي */ }
}

/* ---------------------------------------------------------------- فايربيس */
const real = {
  async db() {
    if (this._db) return this._db;
    const A = await import(FB_APP); const F = await import(FB_FS);
    this._F = F; this._db = F.getFirestore(A.getApp()); return this._db;
  },
  async email() {
    try { const A = await import(FB_APP); const U = await import(FB_AUTH); const u = U.getAuth(A.getApp()).currentUser; return u && u.email ? u.email.toLowerCase() : ''; } catch (e) { return ''; }
  },
  async loadPlus(email) { const db = await this.db(); const F = this._F; const s = await F.getDoc(F.doc(db, 'checkins', email)); return (s.exists() && s.data().plus) || null; },
  async savePlus(email, plus) { const db = await this.db(); const F = this._F; await F.setDoc(F.doc(db, 'checkins', email), { plus: plus }, { merge: true }); },
  async providers() { const db = await this.db(); const F = this._F; const s = await F.getDocs(F.collection(db, 'providerPublic')); return s.docs.map((d) => Object.assign({ email: d.id }, d.data())).filter((p) => p.name); },
  async listEvents() {
    const db = await this.db(); const F = this._F;
    const s = await F.getDocs(F.collection(db, 'events'));
    const list = s.docs.map((d) => Object.assign({ id: d.id }, d.data()));
    await Promise.all(list.slice(0, 60).map(async (ev) => { try { const c = await F.getCountFromServer(F.collection(db, 'events', ev.id, 'joins')); ev.joinCount = c.data().count; } catch (e) { ev.joinCount = 0; } }));
    return list;
  },
  async createEvent(ev) { const db = await this.db(); const F = this._F; const r = await F.addDoc(F.collection(db, 'events'), ev); return r.id; },
  async deleteEvent(id) { const db = await this.db(); const F = this._F; await F.deleteDoc(F.doc(db, 'events', id)); },
  async join(id, email, name) { const db = await this.db(); const F = this._F; await F.setDoc(F.doc(db, 'events', id, 'joins', email), { email: email, name: name || '', at: new Date().toISOString() }); },
  async leave(id, email) { const db = await this.db(); const F = this._F; await F.deleteDoc(F.doc(db, 'events', id, 'joins', email)); },
  async joins(id) { const db = await this.db(); const F = this._F; const s = await F.getDocs(F.collection(db, 'events', id, 'joins')); return s.docs.map((d) => d.id); }
};
const fb = () => window.__ADAM_FB_MOCK || real;

/* ---------------------------------------------------------------- حالة */
let EMAIL = '';
let plus = { v: 1, ts: 0, checkins: {}, journey: null, train: null, nutri: null, pain: [], foodq: {}, fast: null, ramadan: false, travel: false, goal: '' };
let saveTimer = null;
const lsKey = () => 'adamplus:' + (EMAIL || 'guest');

function persist() {
  plus.ts = Date.now();
  try { localStorage.setItem(lsKey(), JSON.stringify(plus)); } catch (e) { /* مفيش تخزين */ }
  if (!EMAIL) return;
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => { try { await fb().savePlus(EMAIL, plus); } catch (e) { /* محليًا بس */ } }, 1500);
}
async function loadState() {
  EMAIL = (await fb().email()) || '';
  try { const raw = localStorage.getItem(lsKey()); if (raw) plus = Object.assign(plus, JSON.parse(raw)); } catch (e) { /* تجاهل */ }
  if (EMAIL) { try { const r = await fb().loadPlus(EMAIL); if (r && (r.ts || 0) > (plus.ts || 0)) plus = Object.assign(plus, r); } catch (e) { /* تجاهل */ } }
  plus.checkins = plus.checkins || {}; plus.pain = plus.pain || []; plus.foodq = plus.foodq || {};
}

/* ---------------------------------------------------------------- الإطار */
const TABS = [
  ['journeys', 'الرحلات', 'Journeys'], ['events', 'الطلعات', 'Events'], ['today', 'سؤال اليوم', 'Daily check-in'],
  ['plan', 'خطتي', 'My plan'], ['lib', 'المكتبة', 'Library'], ['food', 'أكلي', 'My food'], ['rehab', 'تأهيلي', 'My rehab']
];
let curTab = 'journeys';
let sub = {};

function ensureOverlay() {
  let ov = document.getElementById('adam-plus');
  if (ov) return ov;
  ov = document.createElement('div'); ov.id = 'adam-plus'; ov.className = 'ap hidden';
  ov.innerHTML = '<div class="ap-head"><button type="button" class="ap-x" id="ap-close" aria-label="close"></button><b id="ap-title"></b><span class="ap-spacer"></span></div><div class="ap-tabs" id="ap-tabs"></div><div class="ap-body" id="ap-body"></div><div class="ap-toast" id="ap-toast"></div>';
  document.body.appendChild(ov);
  $('#ap-close', ov).addEventListener('click', close);
  return ov;
}
function toast(msg) { const t = $('#ap-toast'); if (!t) return; t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 2600); }

export async function open(tab) {
  const ov = ensureOverlay();
  ov.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
  ov.classList.remove('hidden');
  document.body.classList.add('ap-lock');
  $('#ap-body').innerHTML = '<div class="ap-load">' + esc(L('جاري التحميل...', 'Loading...')) + '</div>';
  await Promise.all([loadState(), loadExtras()]);
  const al = { tpl: ['lib', 'tpl'], libex: ['lib', 'ex'], progs: ['lib', 'prog'] }[tab];
  if (al) { go(al[0]); sub.lt = al[1]; draw(); } else go(tab || curTab);
}
export async function openOwn() {
  await open('plan');
  if (!plus.train) plus.train = { params: { goal: 'fitness', days: 0, equip: 'gym' }, days: [], seed: 0, created: stamp(), custom: true };
  sub.planTab = 'train'; sub.editTrain = false; sub.manual = { wd: dayIdx(new Date()) }; draw();
}
export function close() { const ov = document.getElementById('adam-plus'); if (ov) ov.classList.add('hidden'); document.body.classList.remove('ap-lock'); }

function go(tab) {
  curTab = tab; sub = {};
  const ov = ensureOverlay();
  ov.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
  $('#ap-title').textContent = 'ADAM+'; $('#ap-title').style.direction = 'ltr';
  $('#ap-tabs').innerHTML = TABS.map((t) => '<button type="button" data-tab="' + t[0] + '" class="' + (t[0] === tab ? 'on' : '') + '">' + esc(L(t[1], t[2])) + '</button>').join('');
  $$('#ap-tabs button').forEach((b) => b.addEventListener('click', () => go(b.dataset.tab)));
  try { const tb = $('#ap-tabs'), on = $('#ap-tabs button.on'); if (tb && on) { const r1 = tb.getBoundingClientRect(), r2 = on.getBoundingClientRect(); tb.scrollLeft += (r2.left + r2.width / 2) - (r1.left + r1.width / 2); } } catch (e) { /* تجاهل */ }
  draw();
}
function draw() {
  const body = $('#ap-body'); if (!body) return;
  const fn = { journeys: viewJourneys, events: viewEvents, today: viewToday, plan: viewPlan, lib: viewLib, food: viewFood, rehab: viewRehab }[curTab];
  try { fn(body); } catch (e) { body.innerHTML = '<div class="ap-empty">' + esc(L('حصلت مشكلة في عرض الشاشة', 'Something went wrong showing this screen')) + '</div>'; if (window.console) console.error(e); }
  body.scrollTop = 0;
}
function chips(items, cur, attr) {
  return '<div class="ap-chips">' + items.map((i) => '<button type="button" class="' + (String(i[0]) === String(cur) ? 'on' : '') + '" data-' + attr + '="' + esc(i[0]) + '">' + esc(i[1]) + '</button>').join('') + '</div>';
}
function consult(topic) {
  close();
  try { window.postMessage({ type: 'adam-open-consult', topic: topic || '' }, location.origin); } catch (e) { /* تجاهل */ }
}
function openExercise(id) { try { window.postMessage({ type: 'adam-open-ex', id: id }, location.origin); } catch (e) { /* تجاهل */ } }

/* ================================================================ الرحلات */
const jById = (id) => JOURNEYS.find((j) => j.id === id);
const goalLabel = (g) => { const x = GOALS.find((a) => a[0] === g); return x ? L(x[1], x[2]) : ''; };
function jMatches(j) {
  const f = sub.facet || 'all', v = sub.val || '';
  if (f === 'all' || !v) return true;
  if (f === 'goal') return j.goal === v;
  if (f === 'sport') return j.sport === v;
  if (f === 'injury') return j.injury === v;
  if (f === 'diet') return j.diet === v;
  return true;
}
function curWeek(jn) { return Math.max(1, Math.floor(daysBetween(jn.start, stamp()) / 7) + 1); }
function curStepIdx(j, w) { let k = 0; j.steps.forEach((s, i) => { if (s.w <= w) k = i; }); return k; }
function jProgress(jn) {
  const j = jById(jn.id); if (!j) return 0;
  const total = j.steps.reduce((n, s) => n + s.tasks.length, 0) || 1;
  return Math.min(100, Math.round(Object.keys(jn.done || {}).length / total * 100));
}
function jCard(j, tag) {
  return '<button type="button" class="ap-jc" data-j="' + j.id + '" style="background:linear-gradient(150deg,' + j.color + ',#0a1013 82%)"><span class="ap-big">' + esc(j.big) + '</span><b>' + esc(pick(j.title)) + '</b><small>' + esc(pick(j.sub)) + '</small><span class="ap-meta"><i>' + esc(j.weeks + ' ' + L('أسبوع', 'weeks')) + '</i><i>' + esc(goalLabel(j.goal)) + '</i>' + (tag ? '<i class="hot">' + esc(tag) + '</i>' : '') + '</span></button>';
}
function viewJourneys(body) {
  if (sub.openJ) return viewJourneyDetail(body, jById(sub.openJ));
  const active = plus.journey && jById(plus.journey.id);
  const facets = [['all', L('الكل', 'All')], ['goal', L('هدف', 'Goal')], ['sport', L('رياضة', 'Sport')], ['injury', L('إصابة', 'Injury')], ['diet', L('نظام أكل', 'Diet')]];
  let h = '';
  if (active) h += activeJourneyBlock(plus.journey, active);
  h += '<div class="ap-goalbox"><input id="ap-goal" type="text" maxlength="80" placeholder="' + esc(L('اكتب هدفك: اجري 10 كم، ابني عضل، ارجع بعد إصابة...', 'Type your goal: run 10K, build muscle, return after injury...')) + '" value="' + esc(plus.goal || '') + '"><button type="button" id="ap-goal-go">' + esc(L('اقترح', 'Suggest')) + '</button></div><div id="ap-goal-res"></div>';
  h += chips(facets, sub.facet || 'all', 'facet');
  const f = sub.facet || 'all';
  if (f === 'goal') h += chips(GOALS.map((g) => [g[0], L(g[1], g[2])]), sub.val, 'val');
  if (f === 'injury') h += chips(INJURY_AREAS.map((g) => [g[0], L(g[1], g[2])]), sub.val, 'val');
  if (f === 'diet') h += chips(DIETS.map((g) => [g[0], L(g[1], g[2])]), sub.val, 'val');
  if (f === 'sport') {
    h += '<select id="ap-sport" class="ap-select"><option value="">' + esc(L('كل الرياضات', 'All sports')) + '</option>' +
      Object.keys(SPORT_GROUPS).map((g) => '<optgroup label="' + esc(nameOf(SPORT_GROUPS[g])) + '">' + SPORTS.filter((s) => s.group === g).map((s) => '<option value="' + s.id + '"' + (sub.val === s.id ? ' selected' : '') + '>' + esc(nameOf(s)) + '</option>').join('') + '</optgroup>').join('') + '</select>';
  }
  const list = JOURNEYS.filter(jMatches);
  if (list.length) h += '<div class="ap-list">' + list.map((j) => jCard(j)).join('') + '</div>';
  else h += '<div class="ap-empty"><p>' + esc(L('مفيش رحلات جاهزة للاختيار ده لسه. هتتضاف مع متخصصين لكل رياضة.', 'No ready journeys for this choice yet. They will be added with a specialist for each sport.')) + '</p><button type="button" class="ap-btn" id="ap-to-plan">' + esc(L('اعمل خطتك بنفسك', 'Build your own plan')) + '</button> <button type="button" class="ap-btn ghost" id="ap-ask">' + esc(L('اطلب رحلة من متخصص', 'Ask a specialist')) + '</button></div>';
  body.innerHTML = h;
  $$('[data-facet]', body).forEach((b) => b.addEventListener('click', () => { sub.facet = b.dataset.facet; sub.val = ''; draw(); }));
  $$('[data-val]', body).forEach((b) => b.addEventListener('click', () => { sub.val = b.dataset.val; draw(); }));
  const sp = $('#ap-sport', body); if (sp) sp.addEventListener('change', () => { sub.val = sp.value; draw(); });
  $$('[data-j]', body).forEach((b) => b.addEventListener('click', () => { sub.openJ = b.dataset.j; draw(); }));
  const tp = $('#ap-to-plan', body); if (tp) tp.addEventListener('click', () => go('plan'));
  const ak = $('#ap-ask', body); if (ak) ak.addEventListener('click', () => consult(L('رحلة في رياضة', 'a journey for my sport')));
  $('#ap-goal-go', body).addEventListener('click', () => {
    const v = ($('#ap-goal', body).value || '').trim(); plus.goal = v; persist();
    const hit = GOAL_KEYWORDS.find((k) => k[0].test(v)); const j = hit && jById(hit[1]);
    $('#ap-goal-res', body).innerHTML = j ? '<div class="ap-sug">' + esc(L('الأنسب ليك:', 'Best match:')) + '</div>' + jCard(j, L('اقتراح', 'Suggested')) : (v ? '<div class="ap-empty small">' + esc(L('مالقيتش رحلة مطابقة، جرب كلمة تانية أو اختار من الفلاتر.', 'No matching journey. Try another word or use the filters.')) + '</div>' : '');
    $$('#ap-goal-res [data-j]', body).forEach((b) => b.addEventListener('click', () => { sub.openJ = b.dataset.j; draw(); }));
  });
  $$('[data-act="open-active"]', body).forEach((b) => b.addEventListener('click', () => { sub.openJ = plus.journey.id; draw(); }));
}
function activeJourneyBlock(jn, j) {
  const w = Math.min(curWeek(jn), j.weeks);
  return '<button type="button" class="ap-active" data-act="open-active"><span class="lbl">' + esc(L('رحلتك دلوقتي', 'Your journey now')) + '</span><b>' + esc(pick(j.title)) + '</b><small>' + esc(L('الأسبوع ', 'Week ') + w + L(' من ', ' of ') + j.weeks + (jn.coachName ? ' · ' + jn.coachName : '')) + '</small><span class="ap-bar"><i style="width:' + jProgress(jn) + '%"></i></span></button>';
}
function viewJourneyDetail(body, j) {
  if (!j) { sub.openJ = ''; return viewJourneys(body); }
  const mine = plus.journey && plus.journey.id === j.id ? plus.journey : null;
  const w = mine ? curWeek(mine) : 0;
  const cs = mine ? curStepIdx(j, Math.min(w, j.weeks)) : -1;
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button>';
  h += '<div class="ap-hero" style="background:linear-gradient(150deg,' + j.color + ',#0a1013 85%)"><span class="ap-big">' + esc(j.big) + '</span><h2>' + esc(pick(j.title)) + '</h2><p>' + esc(pick(j.sub)) + '</p><div class="ap-meta"><i>' + esc(j.weeks + ' ' + L('أسبوع', 'weeks')) + '</i><i>' + esc(goalLabel(j.goal)) + '</i></div></div>';
  if (j.note) h += '<div class="ap-warn">' + esc(pick(j.note)) + '</div>';
  if (mine) {
    h += '<div class="ap-card"><div class="ap-row"><b>' + esc(L('تقدمك', 'Your progress')) + '</b><span>' + jProgress(mine) + '%</span></div><div class="ap-bar"><i style="width:' + jProgress(mine) + '%"></i></div><small class="mu">' + esc(L('الأسبوع ', 'Week ') + Math.min(w, j.weeks) + L(' من ', ' of ') + j.weeks + (mine.coachName ? ' · ' + L('الكابتن ', 'Coach ') + mine.coachName : '')) + '</small></div>';
  }
  h += '<div class="ap-sec"><b>' + esc(L('الترتيب أسبوع بأسبوع', 'Week by week')) + '</b></div><div class="ap-card">';
  j.steps.forEach((s, i) => {
    const now = mine && i === cs;
    h += '<div class="ap-step' + (now ? ' now' : '') + '"><div class="ap-wk">' + s.w + '</div><div class="ap-st"><b>' + esc(pick(s.t)) + '</b>';
    s.tasks.forEach((tk, k) => {
      const key = s.w + '_' + k; const done = mine && mine.done && mine.done[key];
      h += mine ? '<label class="ap-task"><input type="checkbox" data-task="' + key + '"' + (done ? ' checked' : '') + '><span>' + esc(pick(tk)) + '</span></label>' : '<div class="ap-task plain"><span>' + esc(pick(tk)) + '</span></div>';
    });
    h += '</div></div>';
  });
  h += '</div>';
  h += '<div class="ap-actions">';
  if (!mine) h += '<button type="button" class="ap-btn" id="ap-start">' + esc(L('ابدأ الرحلة', 'Start journey')) + '</button>';
  if (j.plan) h += '<button type="button" class="ap-btn ghost" id="ap-jplan">' + esc(L('جدول تمرين للرحلة', 'Training schedule for it')) + '</button>';
  if (j.program) h += '<button type="button" class="ap-btn ghost" id="ap-jprog">' + esc(L('خطة الأكل', 'Meal plan')) + '</button>';
  h += '<button type="button" class="ap-btn ghost" id="ap-jask">' + esc(L('اسأل المتخصص', 'Ask the specialist')) + '</button>';
  if (mine) h += '<button type="button" class="ap-btn danger" id="ap-quit">' + esc(L('اترك الرحلة', 'Leave journey')) + '</button>';
  h += '</div>';
  body.innerHTML = h;
  $('#ap-back', body).addEventListener('click', () => { sub.openJ = ''; draw(); });
  $$('[data-task]', body).forEach((c) => c.addEventListener('change', () => { plus.journey.done = plus.journey.done || {}; if (c.checked) plus.journey.done[c.dataset.task] = 1; else delete plus.journey.done[c.dataset.task]; persist(); $$('.ap-bar i', body).forEach((x, n) => { if (n === 0) x.style.width = jProgress(plus.journey) + '%'; }); const sp = $('.ap-card .ap-row span', body); if (sp) sp.textContent = jProgress(plus.journey) + '%'; }));
  const st = $('#ap-start', body); if (st) st.addEventListener('click', () => startJourney(j));
  const qu = $('#ap-quit', body); if (qu) qu.addEventListener('click', () => { if (window.confirm(L('تسيب الرحلة دي؟', 'Leave this journey?'))) { plus.journey = null; persist(); sub.openJ = ''; draw(); } });
  const jp = $('#ap-jplan', body); if (jp) jp.addEventListener('click', () => { sub.planTab = 'train'; sub.trainPre = j.plan; goPlan(); });
  const jg = $('#ap-jprog', body); if (jg) jg.addEventListener('click', () => { goPlan('nutri', j.program); });
  $('#ap-jask', body).addEventListener('click', () => consult(pick(j.title)));
}
function goPlan(which, programId) { curTab = 'plan'; const keep = sub.trainPre; sub = { planTab: which || 'train', trainPre: keep, progPre: programId }; $$('#ap-tabs button').forEach((b) => b.classList.toggle('on', b.dataset.tab === 'plan')); draw(); }
async function startJourney(j) {
  let provs = [];
  try { provs = await fb().providers(); } catch (e) { provs = []; }
  const want = j.spec === 'rehab' ? ['rehab', 'physio', 'doctor'] : j.spec === 'nutritionist' ? ['nutritionist'] : ['coach'];
  let cands = provs.filter((p) => (p.specialties || [p.specialty]).some((s) => want.indexOf(s) !== -1));
  if (!cands.length) cands = provs.slice(0, 6);
  const body = $('#ap-body');
  let h = '<button type="button" class="ap-back" id="ap-back2">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(L('اختار كابتنك', 'Choose your coach')) + '</b><span>' + esc(L('تقدر تغيره في أي وقت', 'You can change it any time')) + '</span></div><div class="ap-coaches">';
  cands.slice(0, 8).forEach((p, i) => { h += '<button type="button" class="ap-coach" data-c="' + i + '">' + (p.photo ? '<img src="' + esc(p.photo) + '" alt="">' : '<i>' + esc(String(p.name).charAt(0)) + '</i>') + '<b>' + esc(p.name) + '</b></button>'; });
  h += '<button type="button" class="ap-coach" data-c="-1"><i>+</i><b>' + esc(L('بدون كابتن الآن', 'No coach for now')) + '</b></button></div>';
  body.innerHTML = h;
  $('#ap-back2', body).addEventListener('click', () => draw());
  $$('.ap-coach', body).forEach((b) => b.addEventListener('click', () => {
    const p = cands[Number(b.dataset.c)];
    plus.journey = { id: j.id, start: stamp(), coach: p ? p.email : '', coachName: p ? p.name : '', done: {} };
    persist(); toast(L('بدأت الرحلة. بالتوفيق!', 'Journey started. Good luck!')); sub.openJ = j.id; draw();
  }));
}

/* ================================================================ الطلعات */
let evCache = null;
const typeName = (id) => { const x = EVENT_TYPES.find((t) => t[0] === id); return x ? L(x[1], x[2]) : id; };
const govName = (id) => { const g = GOV_BY_ID[id]; return g ? L(g[1], g[2]) : ''; };
const sportOptions = (cur, withAll) => '<option value="">' + esc(withAll ? L('كل الرياضات', 'All sports') : L('اختار الرياضة', 'Choose sport')) + '</option>' + Object.keys(SPORT_GROUPS).map((g) => '<optgroup label="' + esc(nameOf(SPORT_GROUPS[g])) + '">' + SPORTS.filter((s) => s.group === g).map((s) => '<option value="' + s.id + '"' + (cur === s.id ? ' selected' : '') + '>' + esc(nameOf(s)) + '</option>').join('') + '</optgroup>').join('');
const govOptions = (cur, withAll) => '<option value="">' + esc(withAll ? L('كل المحافظات', 'All governorates') : L('اختار المحافظة', 'Choose governorate')) + '</option>' + GOVERNORATES.map((g) => '<option value="' + g[0] + '"' + (cur === g[0] ? ' selected' : '') + '>' + esc(L(g[1], g[2])) + '</option>').join('');
const EV_COL = { marathon: '#1d5a8a', group_run: '#17614a', workout: '#6b4527', class: '#553a76', match: '#7a3340', hike: '#2c5f5a', other: '#3b4a5c' };

function fmtDate(d) {
  if (!d) return '';
  const dt = new Date(d + 'T12:00:00');
  try { return dt.toLocaleDateString(lang() === 'en' ? 'en-GB' : 'ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }); } catch (e) { return d; }
}
function evCard(ev) {
  const col = EV_COL[ev.type] || EV_COL.other;
  return '<button type="button" class="ap-jc ev" data-ev="' + esc(ev.id) + '" style="background:linear-gradient(150deg,' + col + ',#0a1013 82%)"><span class="ap-big">' + esc(String((ev.date || '').slice(8, 10))) + '</span><em class="ap-tag">' + esc(typeName(ev.type)) + '</em><b>' + esc(ev.title) + '</b><small>' + esc(fmtDate(ev.date) + (ev.time ? ' · ' + ev.time : '') + (ev.place ? ' · ' + ev.place : '')) + '</small><span class="ap-meta"><i>' + esc(govName(ev.gov)) + '</i>' + (ev.sport && SPORT_BY_ID[ev.sport] ? '<i>' + esc(nameOf(SPORT_BY_ID[ev.sport])) + '</i>' : '') + '<i>' + esc((ev.joinCount || 0) + ' ' + L('مشترك', 'joined')) + '</i></span></button>';
}
async function viewEvents(body) {
  if (sub.evForm) return viewEventForm(body);
  if (sub.evOpen) return viewEventDetail(body);
  body.innerHTML = '<div class="ap-load">' + esc(L('جاري تحميل الطلعات...', 'Loading events...')) + '</div>';
  let err = false;
  if (!evCache) { try { evCache = await fb().listEvents(); } catch (e) { err = true; evCache = []; } }
  const today = stamp();
  const f = sub.evf || { type: '', gov: '', sport: '' };
  const list = evCache.filter((e) => e.date && e.date >= today && (!f.type || e.type === f.type) && (!f.gov || e.gov === f.gov) && (!f.sport || e.sport === f.sport)).sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
  let h = '<div class="ap-row"><b>' + esc(L('اطلع مع الناس', 'Go out with people')) + '</b><button type="button" class="ap-btn small" id="ap-newev">+ ' + esc(L('نظّم طلعة', 'Organise')) + '</button></div>';
  h += chips([['', L('الكل', 'All')]].concat(EVENT_TYPES.map((t) => [t[0], L(t[1], t[2])])), f.type, 'evtype');
  h += '<div class="ap-two"><select id="ap-evgov" class="ap-select">' + govOptions(f.gov, true) + '</select><select id="ap-evsport" class="ap-select">' + sportOptions(f.sport, true) + '</select></div>';
  if (err) h += '<div class="ap-warn">' + esc(L('الطلعات لسه مش مفعّلة على الحساب ده. هتشتغل أول ما ندير الصلاحيات.', 'Events are not enabled for this account yet. They will work once permissions are set up.')) + '</div>';
  h += list.length ? '<div class="ap-list">' + list.map(evCard).join('') + '</div>' : '<div class="ap-empty"><p>' + esc(L('مفيش طلعات جاية بالفلاتر دي. كن أول واحد ينظّم!', 'No upcoming events for these filters. Be the first to organise one!')) + '</p></div>';
  body.innerHTML = h;
  $('#ap-newev', body).addEventListener('click', () => { sub.evForm = true; draw(); });
  $$('[data-evtype]', body).forEach((b) => b.addEventListener('click', () => { sub.evf = Object.assign({}, f, { type: b.dataset.evtype }); draw(); }));
  $('#ap-evgov', body).addEventListener('change', (e) => { sub.evf = Object.assign({}, f, { gov: e.target.value }); draw(); });
  $('#ap-evsport', body).addEventListener('change', (e) => { sub.evf = Object.assign({}, f, { sport: e.target.value }); draw(); });
  $$('[data-ev]', body).forEach((b) => b.addEventListener('click', () => { sub.evOpen = b.dataset.ev; draw(); }));
}
function viewEventForm(body) {
  const d = sub.evDraft || {};
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(L('نظّم طلعة', 'Organise an event')) + '</b></div><div class="ap-card ap-form">';
  h += '<label>' + esc(L('العنوان', 'Title')) + '<input id="ef-title" maxlength="80" value="' + esc(d.title || '') + '"></label>';
  h += '<label>' + esc(L('النوع', 'Type')) + '<select id="ef-type">' + EVENT_TYPES.map((t) => '<option value="' + t[0] + '"' + (d.type === t[0] ? ' selected' : '') + '>' + esc(L(t[1], t[2])) + '</option>').join('') + '</select></label>';
  h += '<label>' + esc(L('الرياضة', 'Sport')) + '<select id="ef-sport">' + sportOptions(d.sport, false) + '</select></label>';
  h += '<label>' + esc(L('المحافظة', 'Governorate')) + '<select id="ef-gov">' + govOptions(d.gov, false) + '</select></label>';
  h += '<label>' + esc(L('المكان', 'Place')) + '<input id="ef-place" maxlength="100" value="' + esc(d.place || '') + '"></label>';
  h += '<div class="ap-two"><label>' + esc(L('التاريخ', 'Date')) + '<input id="ef-date" type="date" min="' + stamp() + '" value="' + esc(d.date || '') + '"></label><label>' + esc(L('الساعة', 'Time')) + '<input id="ef-time" type="time" value="' + esc(d.time || '') + '"></label></div>';
  h += '<label>' + esc(L('تفاصيل (اختياري)', 'Details (optional)')) + '<textarea id="ef-desc" rows="3" maxlength="400">' + esc(d.desc || '') + '</textarea></label>';
  h += '<button type="button" class="ap-btn" id="ef-save">' + esc(L('انشر الطلعة', 'Publish')) + '</button><p class="ap-note">' + esc(L('الطلعة بتظهر لكل مستخدمي ADAM. ماتكتبش بيانات شخصية حساسة.', 'The event is visible to all ADAM users. Do not post sensitive personal data.')) + '</p></div>';
  body.innerHTML = h;
  $('#ap-back', body).addEventListener('click', () => { sub.evForm = false; draw(); });
  $('#ef-save', body).addEventListener('click', async () => {
    const ev = { title: $('#ef-title', body).value.trim(), type: $('#ef-type', body).value, sport: $('#ef-sport', body).value, gov: $('#ef-gov', body).value, place: $('#ef-place', body).value.trim(), date: $('#ef-date', body).value, time: $('#ef-time', body).value, desc: $('#ef-desc', body).value.trim() };
    sub.evDraft = ev;
    if (!ev.title || !ev.date || !ev.gov) { toast(L('اكتب العنوان والتاريخ واختار المحافظة', 'Enter a title, date and governorate')); return; }
    if (!EMAIL) { toast(L('سجّل دخول الأول', 'Please sign in first')); return; }
    ev.organizerEmail = EMAIL; ev.organizerName = (plus.name || EMAIL.split('@')[0]); ev.createdAt = new Date().toISOString();
    try { ev.id = await fb().createEvent(ev); try { await fb().join(ev.id, EMAIL, ev.organizerName); ev.joinCount = 1; } catch (e) { ev.joinCount = 0; } evCache = (evCache || []).concat([ev]); sub.evDraft = null; sub.evForm = false; toast(L('اتنشرت الطلعة', 'Event published')); draw(); }
    catch (e) { toast(L('مقدرتش أنشر الطلعة. الصلاحيات لسه مش مفعّلة.', 'Could not publish. Permissions are not enabled yet.')); }
  });
}
async function viewEventDetail(body) {
  const ev = (evCache || []).find((e) => e.id === sub.evOpen);
  if (!ev) { sub.evOpen = ''; return draw(); }
  let joined = []; try { joined = await fb().joins(ev.id); } catch (e) { joined = []; }
  const me = joined.indexOf(EMAIL) !== -1;
  ev.joinCount = joined.length;
  const mine = ev.organizerEmail === EMAIL;
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button>';
  h += '<div class="ap-hero" style="background:linear-gradient(150deg,' + (EV_COL[ev.type] || EV_COL.other) + ',#0a1013 85%)"><span class="ap-big">' + esc(String((ev.date || '').slice(8, 10))) + '</span><em class="ap-tag">' + esc(typeName(ev.type)) + '</em><h2>' + esc(ev.title) + '</h2><p>' + esc(fmtDate(ev.date) + (ev.time ? ' · ' + ev.time : '')) + '</p><div class="ap-meta"><i>' + esc(govName(ev.gov)) + '</i>' + (ev.place ? '<i>' + esc(ev.place) + '</i>' : '') + (ev.sport && SPORT_BY_ID[ev.sport] ? '<i>' + esc(nameOf(SPORT_BY_ID[ev.sport])) + '</i>' : '') + '</div></div>';
  if (ev.desc) h += '<div class="ap-card"><p class="ap-p">' + esc(ev.desc) + '</p></div>';
  h += '<div class="ap-card"><div class="ap-row"><b>' + esc(L('المشتركين', 'Joined')) + '</b><span>' + joined.length + '</span></div><small class="mu">' + esc(L('المنظّم: ', 'Organiser: ') + (ev.organizerName || '')) + '</small></div>';
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-join">' + esc(me ? L('الغي الانضمام', 'Leave') : L('انضم', 'Join')) + '</button><button type="button" class="ap-btn ghost" id="ap-share">' + esc(L('شارك', 'Share')) + '</button>' + (mine ? '<button type="button" class="ap-btn danger" id="ap-del">' + esc(L('امسح الطلعة', 'Delete')) + '</button>' : '') + '</div>';
  body.innerHTML = h;
  $('#ap-back', body).addEventListener('click', () => { sub.evOpen = ''; draw(); });
  $('#ap-join', body).addEventListener('click', async () => {
    if (!EMAIL) { toast(L('سجّل دخول الأول', 'Please sign in first')); return; }
    try { if (me) await fb().leave(ev.id, EMAIL); else await fb().join(ev.id, EMAIL, plus.name || EMAIL.split('@')[0]); toast(me ? L('اتلغى الانضمام', 'Left the event') : L('تم الانضمام', 'You joined')); draw(); }
    catch (e) { toast(L('مقدرتش أنفذ. الصلاحيات لسه مش مفعّلة.', 'Could not complete. Permissions are not enabled yet.')); }
  });
  $('#ap-share', body).addEventListener('click', async () => {
    const text = ev.title + ' — ' + fmtDate(ev.date) + (ev.time ? ' ' + ev.time : '') + (ev.place ? ' — ' + ev.place : '') + ' (ADAM)';
    try { if (navigator.share) await navigator.share({ title: ev.title, text: text, url: location.origin }); else { await navigator.clipboard.writeText(text + ' ' + location.origin); toast(L('اتنسخ الرابط', 'Copied')); } } catch (e) { /* ألغى */ }
  });
  const del = $('#ap-del', body); if (del) del.addEventListener('click', async () => { if (!window.confirm(L('تمسح الطلعة؟', 'Delete this event?'))) return; try { await fb().deleteEvent(ev.id); evCache = evCache.filter((x) => x.id !== ev.id); sub.evOpen = ''; draw(); } catch (e) { toast(L('مقدرتش أمسح', 'Could not delete')); } });
}

/* ================================================================ سؤال اليوم */
const CHECK_Q = [
  { k: 'sleep', q: ['نمت كام ساعة؟', 'How many hours did you sleep?'], o: [['أقل من 5', 'Under 5', 25], ['5 إلى 6', '5 to 6', 55], ['7 إلى 8', '7 to 8', 100], ['أكتر من 8', 'Over 8', 90]], w: 0.16 },
  { k: 'sleepq', q: ['نومك كان عامل إزاي؟', 'How was your sleep quality?'], o: [['سيئ', 'Poor', 30], ['متقطّع', 'Broken', 55], ['كويس', 'Good', 85], ['عميق ومريح', 'Deep and restful', 100]], w: 0.1 },
  { k: 'sore', q: ['مستوى الوجع في عضلاتك؟', 'Muscle soreness?'], o: [['مفيش', 'None', 100], ['خفيف', 'Mild', 80], ['متوسط', 'Moderate', 55], ['شديد', 'Severe', 30]], w: 0.12 },
  { k: 'joint', q: ['في ألم في مفاصلك؟', 'Any joint pain?'], o: [['مفيش', 'None', 100], ['خفيف', 'Mild', 75], ['متوسط', 'Moderate', 45], ['شديد', 'Severe', 20]], w: 0.1 },
  { k: 'water', q: ['شربت مياه كفاية امبارح؟', 'Did you drink enough water yesterday?'], o: [['لأ', 'No', 40], ['شوية', 'A bit', 70], ['أه', 'Yes', 100]], w: 0.08 },
  { k: 'food', q: ['أكلك امبارح كان إزاي؟', 'How was your eating yesterday?'], o: [['مش منتظم', 'Irregular', 40], ['عادي', 'Okay', 70], ['كويس ومتوازن', 'Good and balanced', 100]], w: 0.08 },
  { k: 'energy', q: ['طاقتك النهاردة؟', 'Your energy today?'], o: [['ضعيفة', 'Low', 35], ['عادية', 'Normal', 70], ['عالية', 'High', 100]], w: 0.12 },
  { k: 'stress', q: ['مستوى التوتر؟', 'Stress level?'], o: [['عالي', 'High', 35], ['متوسط', 'Moderate', 65], ['هادي', 'Low', 100]], w: 0.07 },
  { k: 'mood', q: ['مزاجك النهاردة؟', 'Your mood today?'], o: [['وحش', 'Low', 35], ['عادي', 'Okay', 70], ['كويس', 'Good', 100]], w: 0.07 },
  { k: 'drive', q: ['نفسك تتمرن النهاردة؟', 'Do you feel like training today?'], o: [['لأ خالص', 'Not at all', 35], ['مش أوي', 'Not really', 60], ['أه', 'Yes', 85], ['جداً', 'Very much', 100]], w: 0.1 }
];
function readiness(c) {
  let s = 0, w = 0;
  CHECK_Q.forEach((q) => { if (c[q.k] != null && q.o[c[q.k]]) { s += q.o[c[q.k]][2] * q.w; w += q.w; } });
  return w ? Math.round(s / w) : null;
}
function advice(score, c) {
  const ram = plus.ramadan;
  let a;
  if (score >= 80) a = [L('جسمك جاهز. اتمرن عادي، وتقدر تزود الشدة شوية.', 'You are ready. Train as planned, and you can push a little harder.')];
  else if (score >= 60) a = [L('جاهزية كويسة. اتمرن عادي من غير زيادة في الحمل.', 'Good readiness. Train as planned without adding load.')];
  else if (score >= 40) a = [L('خفّف النهاردة: مشي أو تمرين خفيف ومرونة.', 'Go lighter today: a walk, light training and mobility.')];
  else a = [L('ارتاح النهاردة أو اعمل إطالات خفيفة، وركز على النوم والمياه.', 'Rest today or do gentle stretching, and focus on sleep and water.')];
  if (c && (c.sore === 3 || c.joint >= 2)) a.push(L('لو الوجع في مفصل أو بيزيد، كلّم متخصص قبل ما تتمرن.', 'If the pain is in a joint or getting worse, talk to a specialist before training.'));
  if (ram) a.push(L('في رمضان: تمرين خفيف قبل الفطار أو بعده بساعة، والمياه والسحور مهمين.', 'In Ramadan: train lightly before iftar or an hour after, and keep water and suhoor in check.'));
  if (plus.travel) a.push(L('وضع السفر: 20 دقيقة وزن جسم تكفي (سكوات، ضغط، بلانك)، واشرب مياه كتير وامشي قدر ما تقدر.', 'Travel mode: 20 minutes of bodyweight is enough (squats, push-ups, plank). Drink plenty of water and walk when you can.'));
  return a;
}
/* ---------------------------------------------------------------- عاداتي اليومية
   عادات صغيرة بيختارها العميل (لحد ٥) وبيعلّم عليها كل يوم. بتتحفظ في نفس
   حالة ADAM+ (على الجهاز + مستند checkins لو الحساب مسموح له). آخر ٦٠ يوم بس. */
const HABITS = [
  ['sleep7', 'نوم ٧ ساعات أو أكتر', 'Sleep 7+ hours'],
  ['steps', '٨٠٠٠ خطوة', '8,000 steps'],
  ['stretch', 'إطالة ١٠ دقايق', '10 minutes of stretching'],
  ['veg', 'خضار في وجبتين', 'Vegetables in two meals'],
  ['nosugar', 'من غير سكريات ولا مياه غازية', 'No sweets or soft drinks'],
  ['outside', 'مشي برّه ١٥ دقيقة', '15-minute walk outside'],
  ['screens', 'من غير موبايل قبل النوم بنص ساعة', 'No phone 30 minutes before bed'],
  ['protein', 'بروتين في كل وجبة', 'Protein at every meal']
];
const HABIT_MAX = 5;
const habitById = (id) => HABITS.find((x) => x[0] === id);
function habitState() {
  if (!plus.habits || typeof plus.habits !== 'object') plus.habits = { on: ['sleep7', 'steps', 'stretch'], log: {} };
  if (!Array.isArray(plus.habits.on)) plus.habits.on = [];
  if (!plus.habits.log || typeof plus.habits.log !== 'object') plus.habits.log = {};
  return plus.habits;
}
function habitStreak(id, today) {
  const st = habitState(); let n = 0; let d = today;
  if (!(st.log[d] || []).includes(id)) d = addDays(d, -1); /* النهارده لسه ممكن يتعلّم */
  while ((st.log[d] || []).includes(id)) { n++; d = addDays(d, -1); }
  return n;
}
function habitsBlock(today) {
  const st = habitState();
  const done = st.log[today] || [];
  const active = st.on.filter(habitById);
  let h = '<div class="ap-sec"><b>' + esc(L('عاداتي اليومية', 'My daily habits')) + '</b><span>' + esc(L(done.filter((x) => active.includes(x)).length + ' من ' + active.length + ' النهارده', done.filter((x) => active.includes(x)).length + ' of ' + active.length + ' today')) + '</span></div><div class="ap-card">';
  if (sub.hedit) {
    h += '<p class="ap-hint">' + esc(L('اختار لحد ' + HABIT_MAX + ' عادات صغيرة تلتزم بيها كل يوم.', 'Pick up to ' + HABIT_MAX + ' small habits to keep every day.')) + '</p><div class="ap-chips">';
    h += HABITS.map((x) => '<button type="button" data-hpick="' + x[0] + '" class="' + (st.on.includes(x[0]) ? 'on' : '') + '">' + esc(L(x[1], x[2])) + '</button>').join('');
    h += '</div><button type="button" class="ap-btn small" data-hedit="0">' + esc(L('تمام', 'Done')) + '</button>';
  } else if (!active.length) {
    h += '<div class="ap-empty small"><p>' + esc(L('مفيش عادات متختارة.', 'No habits picked yet.')) + '</p><button type="button" class="ap-btn small" data-hedit="1">' + esc(L('اختار عاداتك', 'Pick your habits')) + '</button></div>';
  } else {
    active.forEach((id) => {
      const x = habitById(id); const on = done.includes(id); const sk = habitStreak(id, today);
      h += '<label class="ap-task ap-habit"><input type="checkbox" data-habit="' + id + '"' + (on ? ' checked' : '') + '><span>' + esc(L(x[1], x[2])) + (sk > 1 ? ' <small class="ap-hstreak">' + esc(L(sk + ' يوم ورا بعض', sk + ' days in a row')) + '</small>' : '') + '</span></label>';
    });
    h += '<button type="button" class="ap-btn ghost small" data-hedit="1">' + esc(L('عدّل عاداتي', 'Edit my habits')) + '</button>';
  }
  return h + '</div>';
}
function bindHabits(body, today) {
  $$('[data-habit]', body).forEach((el) => el.addEventListener('change', () => {
    const st = habitState(); const list = (st.log[today] || []).filter((x) => x !== el.dataset.habit);
    if (el.checked) list.push(el.dataset.habit);
    st.log[today] = list;
    const keys = Object.keys(st.log).sort(); while (keys.length > 60) delete st.log[keys.shift()];
    persist(); draw();
  }));
  $$('[data-hedit]', body).forEach((el) => el.addEventListener('click', () => { sub.hedit = el.dataset.hedit === '1'; draw(); }));
  $$('[data-hpick]', body).forEach((el) => el.addEventListener('click', () => {
    const st = habitState(); const id = el.dataset.hpick;
    if (st.on.includes(id)) st.on = st.on.filter((x) => x !== id);
    else if (st.on.length < HABIT_MAX) st.on.push(id);
    persist(); draw();
  }));
}

function checkStreak() {
  let n = 0, d = stamp();
  if (!plus.checkins[d]) d = addDays(d, -1);
  while (plus.checkins[d]) { n++; d = addDays(d, -1); }
  return n;
}
function viewToday(body) {
  const today = stamp(); const c = plus.checkins[today] || {};
  const score = c.score != null ? c.score : null;
  let h = '<div class="ap-row"><b>' + esc(L('دقيقة وتعرف جاهزيتك', 'One minute to know your readiness')) + '</b><button type="button" class="ap-chip ' + (plus.ramadan ? 'on' : '') + '" id="ap-ram">' + esc(L('وضع رمضان', 'Ramadan mode')) + '</button><button type="button" class="ap-chip ' + (plus.travel ? 'on' : '') + '" id="ap-trv">' + esc(L('وضع السفر', 'Travel mode')) + '</button></div>';
  h += '<div class="ap-card" id="ap-q">';
  CHECK_Q.forEach((q) => {
    h += '<div class="ap-q"><b>' + esc(L(q.q[0], q.q[1])) + '</b><div class="ap-opts">' + q.o.map((o, i) => '<button type="button" data-q="' + q.k + '" data-i="' + i + '" class="' + (c[q.k] === i ? 'on' : '') + '">' + esc(L(o[0], o[1])) + '</button>').join('') + '</div></div>';
  });
  h += '</div>';
  if (score != null) {
    h += '<div class="ap-card ap-score"><span class="lbl">' + esc(L('جاهزيتك النهاردة', 'Your readiness today')) + '</span><div class="ap-big2" style="color:' + (score >= 70 ? '#3ef0b0' : score >= 45 ? '#ffab5c' : '#ff6b78') + '">' + score + '</div>' + advice(score, c).map((t) => '<p class="ap-p">' + esc(t) + '</p>').join('') + '</div>';
  }
  const days = []; for (let i = 6; i >= 0; i--) { const d = addDays(today, -i); days.push([d, plus.checkins[d] ? plus.checkins[d].score : null]); }
  h += '<div class="ap-sec"><b>' + esc(L('آخر 7 أيام', 'Last 7 days')) + '</b><span>' + esc(L('سلسلة ', 'Streak ') + checkStreak()) + '</span></div><div class="ap-card"><div class="ap-bars">' + days.map((x) => '<div class="ap-barcol"><i style="height:' + (x[1] == null ? 4 : Math.max(8, x[1])) + '%;opacity:' + (x[1] == null ? 0.25 : 1) + '"></i><small>' + esc(lang() === 'en' ? WEEKDAYS[dayIdx(new Date(x[0] + 'T12:00:00'))][1].slice(0, 3) : SHORT_AR[dayIdx(new Date(x[0] + 'T12:00:00'))]) + '</small></div>').join('') + '</div></div>';
  h += habitsBlock(today);
  h += '<div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-story">' + esc(L('اعمل قصة الأسبوع', 'Make my weekly story')) + '</button></div><canvas id="ap-canvas" width="1080" height="1350" class="hidden"></canvas>';
  body.innerHTML = h;
  $$('[data-q]', body).forEach((b) => b.addEventListener('click', () => {
    const cc = plus.checkins[today] || {}; cc[b.dataset.q] = Number(b.dataset.i);
    const sc = readiness(cc); if (sc != null) cc.score = sc; cc.d = today; plus.checkins[today] = cc;
    const keys = Object.keys(plus.checkins).sort(); while (keys.length > 120) delete plus.checkins[keys.shift()];
    persist(); draw();
  }));
  $('#ap-ram', body).addEventListener('click', () => { plus.ramadan = !plus.ramadan; persist(); draw(); });
  $('#ap-trv', body).addEventListener('click', () => { plus.travel = !plus.travel; persist(); draw(); });
  $('#ap-story', body).addEventListener('click', () => makeStory(body));
  bindHabits(body, today);
}
function makeStory(body) {
  const cv = $('#ap-canvas', body); const x = cv.getContext('2d'); const W = 1080, H = 1350;
  const g = x.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#0f3d33'); g.addColorStop(1, '#07090b'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  const rtl = lang() === 'ar'; x.direction = rtl ? 'rtl' : 'ltr'; x.textAlign = 'center';
  x.fillStyle = '#3ef0b0'; x.beginPath(); x.arc(W / 2, 170, 70, 0, Math.PI * 2); x.fill();
  x.fillStyle = '#032016'; x.font = '800 78px system-ui,Arial'; x.fillText('A', W / 2, 198);
  x.fillStyle = '#fff'; x.font = '700 64px system-ui,Arial'; x.fillText(L('أسبوعي مع ADAM', 'My week with ADAM'), W / 2, 330);
  const last = []; for (let i = 6; i >= 0; i--) { const c = plus.checkins[addDays(stamp(), -i)]; if (c && c.score != null) last.push(c.score); }
  const avg = last.length ? Math.round(last.reduce((a, b) => a + b, 0) / last.length) : 0;
  const act = plus.journey && jById(plus.journey.id);
  const rows = [[L('أيام المتابعة', 'Days tracked'), String(last.length) + '/7'], [L('متوسط الجاهزية', 'Avg readiness'), String(avg)], [L('السلسلة', 'Streak'), String(checkStreak())]];
  if (act) rows.push([L('الرحلة', 'Journey'), pick(act.title)]);
  rows.forEach((r, i) => { const y = 520 + i * 190; x.fillStyle = 'rgba(255,255,255,.07)'; x.fillRect(120, y - 80, W - 240, 150); x.fillStyle = '#9fb3c1'; x.font = '500 38px system-ui,Arial'; x.fillText(r[0], W / 2, y - 20); x.fillStyle = '#fff'; x.font = '700 58px system-ui,Arial'; x.fillText(r[1], W / 2, y + 40); });
  x.fillStyle = '#6b7a88'; x.font = '500 34px system-ui,Arial'; x.fillText('adamxfit.com', W / 2, H - 90);
  cv.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], 'adam-week.png', { type: 'image/png' });
    try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'ADAM' }); return; } } catch (e) { return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'adam-week.png'; document.body.appendChild(a); a.click(); a.remove();
  }, 'image/png');
}

/* ================================================================ خطتي */
const EQUIP_SETS = {
  gym: null,
  home: ['body only', 'dumbbell', 'bands', 'kettlebells'],
  bodyweight: ['body only', 'bands']
};
const SLOTS = {
  push: ['chest', 'chest', 'shoulders', 'triceps'], pull: ['lats', 'middle back', 'biceps', 'lower back'],
  legs: ['quadriceps', 'hamstrings', 'glutes', 'calves', 'abdominals'],
  upper: ['chest', 'lats', 'shoulders', 'middle back', 'biceps', 'triceps'], lower: ['quadriceps', 'hamstrings', 'glutes', 'calves', 'abdominals'],
  full: ['chest', 'lats', 'quadriceps', 'hamstrings', 'shoulders', 'abdominals']
};
const SPLITS = { 2: ['full', 'full'], 3: ['full', 'full', 'full'], 4: ['upper', 'lower', 'upper', 'lower'], 5: ['push', 'pull', 'legs', 'upper', 'lower'], 6: ['push', 'pull', 'legs', 'push', 'pull', 'legs'] };
const SPLIT_NAME = { push: ['دفع', 'Push'], pull: ['سحب', 'Pull'], legs: ['رجلين', 'Legs'], upper: ['جزء علوي', 'Upper body'], lower: ['جزء سفلي', 'Lower body'], full: ['جسم كامل', 'Full body'], custom: ['تمريني أنا', 'My workout'] };
const WD_SETS = { 2: [0, 3], 3: [0, 2, 4], 4: [0, 1, 3, 4], 5: [0, 1, 3, 4, 5], 6: [0, 1, 2, 3, 4, 5] };
const SR = { muscle: [4, '8-12'], strength: [5, '4-6'], fat: [3, '12-15'], fitness: [3, '10-12'] };

function genTrain(p, seed) {
  const allowed = EQUIP_SETS[p.equip || 'gym'];
  const pool = exAll.filter((e) => (e.category === 'strength') && (!allowed || allowed.indexOf(e.equipment) !== -1));
  const used = {};
  const days = SPLITS[p.days || 3].map((kind, di) => {
    const items = [];
    SLOTS[kind].forEach((m, si) => {
      let c = pool.filter((e) => (e.primaryMuscles || []).indexOf(m) !== -1 && !used[e.id + '_' + di]);
      c.sort((a, b) => (b.secondaryMuscles || []).length - (a.secondaryMuscles || []).length || a.id.localeCompare(b.id));
      if (!c.length) return;
      const off = (di + si + (seed || 0)) % Math.min(c.length, 4);
      const ex = c[off];
      if (items.some((x) => x.id === ex.id)) return;
      items.push({ id: ex.id, sets: SR[p.goal || 'fitness'][0] - (m === 'abdominals' || m === 'calves' ? 1 : 0), reps: SR[p.goal || 'fitness'][1] });
    });
    return { kind: kind, wd: WD_SETS[p.days || 3][di], items: items };
  });
  return days;
}
function viewPlan(body) {
  const tab = sub.planTab || 'train';
  let h = chips([['train', L('تمرين', 'Training')], ['nutri', L('أكل', 'Nutrition')]], tab, 'ptab');
  body.innerHTML = h + '<div id="ap-plan-in"></div>';
  $$('[data-ptab]', body).forEach((b) => b.addEventListener('click', () => { sub.planTab = b.dataset.ptab; draw(); }));
  const inner = $('#ap-plan-in', body);
  if (tab === 'train') planTrain(inner); else planNutri(inner);
}
function planTrain(el) {
  const pre = sub.trainPre; if (pre) { plus.trainDraft = Object.assign({ goal: 'muscle', days: 3, equip: 'gym' }, pre); sub.trainPre = null; }
  if (sub.manual) { planManual(el); return; }
  const d = plus.trainDraft || (plus.train && plus.train.params) || { goal: 'muscle', days: 3, equip: 'gym' };
  let h = '';
  if (plus.train && plus.train.days.length && !sub.editTrain) {
    h += '<div class="ap-row"><b>' + esc(L('جدولك', 'Your schedule')) + '</b><button type="button" class="ap-btn small ghost" id="ap-retrain">' + esc(L('غيّر', 'Change')) + '</button></div>';
    plus.train.days.forEach((day) => {
      h += '<div class="ap-card"><div class="ap-row"><b>' + esc(L(WEEKDAYS[day.wd][0], WEEKDAYS[day.wd][1])) + '</b><span class="mu">' + esc(L(SPLIT_NAME[day.kind][0], SPLIT_NAME[day.kind][1])) + '</span></div>';
      day.items.forEach((it) => { const ex = EX_BY_ID[it.id]; if (!ex) return; h += '<button type="button" class="ap-ex" data-ex="' + esc(it.id) + '"><span>' + esc(nameOf(ex.name)) + '</span><em>' + it.sets + ' × ' + esc(it.reps) + '</em></button>'; });
      h += '</div>';
    });
    if (plus.train.params.goal === 'fat') h += '<div class="ap-note">' + esc(L('أضف 15 إلى 20 دقيقة كارديو خفيف بعد كل تمرين.', 'Add 15 to 20 minutes of easy cardio after each session.')) + '</div>';
    h += '<div class="ap-note">' + esc(L('ابدأ بأوزان تقدر تتحكم فيها، وزود تدريجيًا. لو عندك إصابة أو حالة صحية، استشر متخصص قبل ما تبدأ.', 'Start with weights you can control and progress gradually. If you have an injury or health condition, consult a specialist before starting.')) + '</div>';
    el.innerHTML = h;
    $('#ap-retrain', el).addEventListener('click', () => { sub.editTrain = true; draw(); });
    $('#ap-manual', el).addEventListener('click', () => { sub.manual = { wd: plus.train.days.length ? plus.train.days[0].wd : 0 }; draw(); });
    $$('[data-ex]', el).forEach((b) => b.addEventListener('click', () => openExercise(b.dataset.ex)));
    return;
  }
  h += '<div class="ap-sec"><b>' + esc(L('اعمل جدول تمرينك في 3 خطوات', 'Build your training in 3 steps')) + '</b></div><div class="ap-card ap-form">';
  h += '<div class="ap-q"><b>' + esc(L('1. هدفك', '1. Your goal')) + '</b>' + chips([['muscle', L('زيادة عضل', 'Build muscle')], ['fat', L('حرق دهون', 'Fat loss')], ['strength', L('قوة', 'Strength')], ['fitness', L('لياقة عامة', 'General fitness')]], d.goal, 'tg') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('2. عدد أيام التمرين', '2. Days per week')) + '</b>' + chips([2, 3, 4, 5, 6].map((n) => [n, String(n)]), d.days, 'td') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('3. المعدات', '3. Equipment')) + '</b>' + chips([['gym', L('جيم', 'Gym')], ['home', L('بيت (دمبل وشرايط)', 'Home (dumbbells, bands)')], ['bodyweight', L('وزن الجسم', 'Bodyweight')]], d.equip, 'te') + '</div>';
  h += '<button type="button" class="ap-btn" id="ap-gen">' + esc(L('جهّز لي الجدول', 'Create my schedule')) + '</button></div>';
  h += '<div class="ap-sec"><b>' + esc(L('أو اعمل تمرينك بنفسك', 'Or build your own workout')) + '</b></div><div class="ap-card"><div class="ap-note" style="margin:0 0 10px">' + esc(L('اختار الأيام وضيف التمارين اللي تحبها من المكتبة، وحدد العدّات والتكرارات.', 'Pick your days, add exercises from the library, and set sets and reps.')) + '</div><button type="button" class="ap-btn ghost" id="ap-own">' + esc(L('ابنِ جدولي بنفسي', 'Build my own schedule')) + '</button></div>';
  el.innerHTML = h;
  const set = (attr, key, num) => $$('[data-' + attr + ']', el).forEach((b) => b.addEventListener('click', () => { const dd = Object.assign({}, plus.trainDraft || d); dd[key] = num ? Number(b.dataset[attr]) : b.dataset[attr]; plus.trainDraft = dd; planTrain(el); }));
  set('tg', 'goal'); set('td', 'days', true); set('te', 'equip');
  $('#ap-own', el).addEventListener('click', () => { if (!plus.train) plus.train = { params: { goal: 'fitness', days: 0, equip: 'gym' }, days: [], seed: 0, created: stamp(), custom: true }; sub.editTrain = false; sub.manual = { wd: dayIdx(new Date()) }; draw(); });
  $('#ap-gen', el).addEventListener('click', () => {
    const p = Object.assign({ goal: 'muscle', days: 3, equip: 'gym' }, plus.trainDraft || d);
    const days = genTrain(p, (plus.train && plus.train.seed || 0) + 1);
    plus.train = { params: p, days: days, seed: (plus.train && plus.train.seed || 0) + 1, created: stamp() }; plus.trainDraft = null; sub.editTrain = false; persist(); toast(L('الجدول جاهز', 'Schedule ready')); draw();
  });
}

/* ---------- بناء التمرين بنفسك ---------- */
function planManual(el) {
  if (!plus.train) plus.train = { params: { goal: 'fitness', days: 0, equip: 'gym' }, days: [], seed: 0, created: stamp(), custom: true };
  const wd = sub.manual.wd;
  const dayOf = (w) => plus.train.days.find((x) => x.wd === w);
  const cur = dayOf(wd);
  let h = '<div class="ap-row"><b>' + esc(L('تمريني', 'My workout')) + '</b><button type="button" class="ap-btn small" id="ap-mdone">' + esc(L('تم', 'Done')) + '</button></div>';
  h += '<div class="ap-note" style="margin-top:0">' + esc(L('اختار اليوم وضيف التمارين. بيتحفظ تلقائي.', 'Choose a day and add exercises. It saves automatically.')) + '</div>';
  h += chips(WEEKDAYS.map((w, i) => [i, (dayOf(i) && dayOf(i).items.length ? '• ' : '') + L(w[0], w[1])]), wd, 'mwd');
  h += '<div class="ap-card" id="ap-mday">';
  const items = cur ? cur.items : [];
  if (!items.length) h += '<div class="ap-note" style="margin:0">' + esc(L('اليوم ده لسه فاضي. ضيف أول تمرين من تحت.', 'This day is empty. Add your first exercise below.')) + '</div>';
  items.forEach((it, i) => {
    const ex = EX_BY_ID[it.id]; if (!ex) return;
    h += '<div class="ap-exrow" style="display:flex;align-items:center;gap:8px;padding:10px 0;border-top:1px solid rgba(255,255,255,.06)">' +
      '<span class="ap-exn" style="flex:1;min-width:0">' + esc(nameOf(ex.name)) + '</span>' +
      '<input type="number" min="1" max="10" value="' + it.sets + '" data-ms="' + i + '" style="width:54px;margin:0;padding:8px" aria-label="sets">' +
      '<span class="mu">×</span>' +
      '<input type="text" value="' + esc(it.reps) + '" data-mr="' + i + '" style="width:70px;margin:0;padding:8px" aria-label="reps">' +
      '<button type="button" class="ap-btn small danger" data-mdel="' + i + '" aria-label="delete">×</button></div>';
  });
  h += '</div>';
  h += '<div class="ap-sec"><b>' + esc(L('ضيف تمرين', 'Add an exercise')) + '</b></div>';
  h += '<input type="text" id="ap-msearch" placeholder="' + esc(L('ابحث عن تمرين...', 'Search exercises...')) + '"><div id="ap-mres"></div>';
  h += '<div class="ap-row" style="margin-top:12px"><button type="button" class="ap-btn small danger" id="ap-mclear">' + esc(L('امسح اليوم ده', 'Clear this day')) + '</button></div>';
  el.innerHTML = h;
  const save = () => { plus.train.days = plus.train.days.filter((x) => x.items.length); persist(); };
  $('#ap-mdone', el).addEventListener('click', () => { sub.manual = null; save(); draw(); });
  $$('[data-mwd]', el).forEach((b) => b.addEventListener('click', () => { sub.manual.wd = Number(b.dataset.mwd); planManual(el); }));
  $$('[data-ms]', el).forEach((i) => i.addEventListener('change', () => { cur.items[Number(i.dataset.ms)].sets = Math.max(1, Math.min(10, Number(i.value) || 3)); persist(); }));
  $$('[data-mr]', el).forEach((i) => i.addEventListener('change', () => { cur.items[Number(i.dataset.mr)].reps = i.value || '10'; persist(); }));
  $$('[data-mdel]', el).forEach((b) => b.addEventListener('click', () => { cur.items.splice(Number(b.dataset.mdel), 1); save(); planManual(el); }));
  $('#ap-mclear', el).addEventListener('click', () => { if (cur) { cur.items = []; save(); } planManual(el); });
  const res = $('#ap-mres', el), q = $('#ap-msearch', el);
  const paint = () => {
    const k = q.value.trim().toLowerCase();
    let list = exAll.filter((e) => e.category === 'strength' || !e.category);
    if (k) list = exAll.filter((e) => (String(e.name && e.name.ar || '') + ' ' + String(e.name && e.name.en || '')).toLowerCase().indexOf(k) !== -1);
    list = list.slice(0, 30);
    res.innerHTML = list.map((e) => '<button type="button" class="ap-ex" data-madd="' + esc(e.id) + '"><span>' + esc(nameOf(e.name)) + '</span><em>+ ' + esc(L('ضيف', 'Add')) + '</em></button>').join('') || '<div class="ap-note">' + esc(L('مفيش نتيجة', 'No results')) + '</div>';
    $$('[data-madd]', res).forEach((b) => b.addEventListener('click', () => {
      let dd = dayOf(wd); if (!dd) { dd = { kind: 'custom', wd: wd, items: [] }; plus.train.days.push(dd); plus.train.days.sort((a, b2) => a.wd - b2.wd); }
      if (dd.items.some((x) => x.id === b.dataset.madd)) { toast(L('التمرين ده موجود في اليوم', 'Already in this day')); return; }
      dd.items.push({ id: b.dataset.madd, sets: 3, reps: '10' }); persist(); planManual(el);
    }));
  };
  q.addEventListener('input', paint); paint();
}

/* ---------- تغذية ---------- */
const ACT = [[1.2, 'قليل الحركة', 'Sedentary'], [1.375, 'نشاط خفيف', 'Light'], [1.55, 'نشاط متوسط', 'Moderate'], [1.725, 'نشاط عالي', 'High']];
const NGOAL = { lose: 'lose_weight', maintain: 'fitness', gain: 'muscle_gain' };
function foodNutr(id, g) { const f = FOOD_BY_ID[id]; if (!f) return { kcal: 0, p: 0, c: 0, f: 0 }; const k = g / 100; return { kcal: f.c * k, p: f.p * k, c: f.cb * k, f: f.f * k }; }
function dayTotals(day, factor) {
  const t = { kcal: 0, p: 0, c: 0, f: 0 };
  Object.keys(day).forEach((m) => (day[m] || []).forEach((it) => { const n = foodNutr(it.id, it.g * factor); t.kcal += n.kcal; t.p += n.p; t.c += n.c; t.f += n.f; }));
  return t;
}
function progKcal(p) { return p.targets && p.targets.kcal ? p.targets.kcal : Math.round(p.days.reduce((a, d) => a + dayTotals(d, 1).kcal, 0) / p.days.length); }
function calcTarget(n) {
  const bmr = 10 * n.weight + 6.25 * n.height - 5 * n.age + (n.sex === 'f' ? -161 : 5);
  const tdee = bmr * (n.act || 1.375);
  return Math.round(tdee * (n.goal === 'lose' ? 0.82 : n.goal === 'gain' ? 1.12 : 1) / 10) * 10;
}
function choose(n) {
  const goal = NGOAL[n.goal || 'maintain'];
  let c = programsAll.filter((p) => p.goal === goal);
  if (n.pref) { const pf = programsAll.filter((p) => String(p.id).indexOf(n.pref) !== -1); if (pf.length) c = pf; }
  if (!c.length) c = programsAll;
  const tk = n.target;
  c.sort((a, b) => Math.abs(progKcal(a) - tk) - Math.abs(progKcal(b) - tk));
  return c[0];
}
function planNutri(el) {
  const n = plus.nutri;
  const preId = sub.progPre; if (preId && programsAll.some((p) => p.id === preId)) { const pr = programsAll.find((p) => p.id === preId); plus.nutri = Object.assign({}, n || {}, { prog: pr.id, factor: 1, target: progKcal(pr), params: (n && n.params) || null }); sub.progPre = null; persist(); return planNutri(el); }
  if (n && n.prog && !sub.editNutri) return showNutri(el);
  const d = sub.nd || (n && n.params) || { sex: 'm', age: 28, weight: 80, height: 175, act: 1.375, goal: 'lose', pref: '' };
  let h = '<div class="ap-sec"><b>' + esc(L('خطة أكل على قدك', 'A meal plan for you')) + '</b></div><div class="ap-card ap-form">';
  h += '<div class="ap-q"><b>' + esc(L('الجنس', 'Sex')) + '</b>' + chips([['m', L('ذكر', 'Male')], ['f', L('أنثى', 'Female')]], d.sex, 'ns') + '</div>';
  h += '<div class="ap-three"><label>' + esc(L('السن', 'Age')) + '<input id="n-age" type="number" min="14" max="80" value="' + d.age + '"></label><label>' + esc(L('الوزن (كجم)', 'Weight (kg)')) + '<input id="n-w" type="number" min="35" max="250" value="' + d.weight + '"></label><label>' + esc(L('الطول (سم)', 'Height (cm)')) + '<input id="n-h" type="number" min="120" max="230" value="' + d.height + '"></label></div>';
  h += '<div class="ap-q"><b>' + esc(L('مستوى النشاط', 'Activity level')) + '</b>' + chips(ACT.map((a) => [a[0], L(a[1], a[2])]), d.act, 'na') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('هدفك', 'Goal')) + '</b>' + chips([['lose', L('تنزيل وزن', 'Lose weight')], ['maintain', L('تثبيت', 'Maintain')], ['gain', L('زيادة عضل', 'Gain muscle')]], d.goal, 'ng') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('تفضيل (اختياري)', 'Preference (optional)')) + '</b>' + chips([['', L('بدون', 'None')], ['vegetarian', L('نباتي', 'Vegetarian')], ['fasting', L('صيام متقطع', 'Fasting')], ['ramadan', L('رمضان', 'Ramadan')], ['budget', L('اقتصادي', 'Budget')]], d.pref || '', 'np') + '</div>';
  h += '<button type="button" class="ap-btn" id="ap-ngen">' + esc(L('جهّز خطتي', 'Create my plan')) + '</button><p class="ap-note">' + esc(L('الأرقام تقديرية للّياقة العامة، ومش بديل عن أخصائي تغذية، خصوصًا لو عندك حالة صحية.', 'Numbers are estimates for general fitness and not a substitute for a dietitian, especially with a health condition.')) + '</p></div>';
  el.innerHTML = h;
  const re = () => planNutri(el);
  const set = (attr, key, num) => $$('[data-' + attr + ']', el).forEach((b) => b.addEventListener('click', () => { sub.nd = Object.assign({}, d, readNums(el, d)); sub.nd[key] = num ? Number(b.dataset[attr]) : b.dataset[attr]; re(); }));
  set('ns', 'sex'); set('na', 'act', true); set('ng', 'goal'); set('np', 'pref');
  $('#ap-ngen', el).addEventListener('click', () => {
    const p = Object.assign({}, d, readNums(el, d));
    if (!(p.age >= 14 && p.weight >= 35 && p.height >= 120)) { toast(L('راجع السن والوزن والطول', 'Check age, weight and height')); return; }
    p.target = calcTarget(p);
    const pr = choose(p);
    plus.nutri = { params: p, prog: pr.id, factor: Math.min(1.4, Math.max(0.7, p.target / progKcal(pr))), target: p.target };
    sub.nd = null; sub.editNutri = false; persist(); draw();
  });
}
function readNums(el, d) { const g = (id, k) => { const e = $(id, el); return e ? Number(e.value) || d[k] : d[k]; }; return { age: g('#n-age', 'age'), weight: g('#n-w', 'weight'), height: g('#n-h', 'height') }; }
const MEAL_NAME = { breakfast: ['فطار', 'Breakfast'], lunch: ['غدا', 'Lunch'], dinner: ['عشا', 'Dinner'], snack: ['سناك', 'Snack'] };
const r5 = (g) => Math.max(5, Math.round(g / 5) * 5);
function showNutri(el) {
  const n = plus.nutri; const pr = programsAll.find((p) => p.id === n.prog);
  if (!pr) { plus.nutri = null; return planNutri(el); }
  const di = Math.min(sub.nday || 0, pr.days.length - 1); const day = pr.days[di]; const f = n.factor || 1;
  const t = dayTotals(day, f);
  let h = '<div class="ap-row"><b>' + esc(nameOf(pr)) + '</b><button type="button" class="ap-btn small ghost" id="ap-renutri">' + esc(L('غيّر', 'Change')) + '</button></div>';
  if (pr.desc) h += '<p class="ap-p mu">' + esc(pick(pr.desc)) + '</p>';
  h += '<div class="ap-card"><div class="ap-macros"><div><b>' + Math.round(t.kcal) + '</b><small>' + esc(L('سعرة', 'kcal')) + '</small></div><div><b>' + Math.round(t.p) + '</b><small>' + esc(L('بروتين', 'Protein')) + '</small></div><div><b>' + Math.round(t.c) + '</b><small>' + esc(L('كارب', 'Carbs')) + '</small></div><div><b>' + Math.round(t.f) + '</b><small>' + esc(L('دهون', 'Fat')) + '</small></div></div>' + (n.target ? '<small class="mu">' + esc(L('هدفك التقريبي: ', 'Your estimated target: ') + n.target + L(' سعرة', ' kcal')) + '</small>' : '') + '</div>';
  h += chips(pr.days.map((_, i) => [i, L('يوم ', 'Day ') + (i + 1)]), di, 'nd');
  Object.keys(day).forEach((m) => {
    const items = day[m] || []; if (!items.length) return;
    const mt = dayTotals({ x: items }, f);
    h += '<div class="ap-card"><div class="ap-row"><b>' + esc(MEAL_NAME[m] ? L(MEAL_NAME[m][0], MEAL_NAME[m][1]) : m) + '</b><span class="mu">' + Math.round(mt.kcal) + ' ' + esc(L('سعرة', 'kcal')) + '</span></div>' + items.map((it) => { const fd = FOOD_BY_ID[it.id]; return '<div class="ap-food"><span>' + esc(fd ? nameOf(fd) : it.id) + '</span><em>' + r5(it.g * f) + ' ' + esc(L('جم', 'g')) + '</em></div>'; }).join('') + '</div>';
  });
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-grocery">' + esc(L('قايمة المشتريات', 'Grocery list')) + '</button></div>';
  h += '<div class="ap-note">' + esc(L('خطة إرشادية للّياقة العامة. لو عندك حالة صحية أو حساسية، استشر أخصائي تغذية.', 'A guideline plan for general fitness. If you have a health condition or allergy, consult a dietitian.')) + '</div>';
  el.innerHTML = h;
  $('#ap-renutri', el).addEventListener('click', () => { sub.editNutri = true; draw(); });
  $$('[data-nd]', el).forEach((b) => b.addEventListener('click', () => { sub.nday = Number(b.dataset.nd); showNutri(el); }));
  $('#ap-grocery', el).addEventListener('click', () => showGrocery(el, pr, f));
}
function groceryList(pr, f) {
  const sum = {};
  for (let i = 0; i < 7; i++) { const day = pr.days[i % pr.days.length]; Object.keys(day).forEach((m) => (day[m] || []).forEach((it) => { sum[it.id] = (sum[it.id] || 0) + it.g * f; })); }
  const CATS = ['protein', 'dairy', 'carb', 'veg', 'fruit', 'fat', 'dish', 'drink', 'supplement'];
  const rows = Object.keys(sum).map((id) => ({ id: id, g: sum[id], cat: (FOOD_BY_ID[id] && FOOD_BY_ID[id].cat) || 'dish' }));
  rows.sort((a, b) => CATS.indexOf(a.cat) - CATS.indexOf(b.cat) || b.g - a.g);
  return rows;
}
function showGrocery(el, pr, f) {
  const rows = groceryList(pr, f); plus.grocery = plus.grocery || {};
  const fmt = (g) => (g >= 1000 ? (Math.round(g / 100) / 10) + ' ' + L('كجم', 'kg') : r5(g) + ' ' + L('جم', 'g'));
  let h = '<button type="button" class="ap-back" id="ap-gback">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(L('مشتريات الأسبوع', 'This week\'s groceries')) + '</b></div><div class="ap-card">';
  rows.forEach((r) => { const fd = FOOD_BY_ID[r.id]; h += '<label class="ap-task"><input type="checkbox" data-g="' + esc(r.id) + '"' + (plus.grocery[r.id] ? ' checked' : '') + '><span>' + esc(fd ? nameOf(fd) : r.id) + ' — ' + esc(fmt(r.g)) + '</span></label>'; });
  h += '</div><div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-gshare">' + esc(L('شارك القايمة', 'Share list')) + '</button></div>';
  el.innerHTML = h;
  $('#ap-gback', el).addEventListener('click', () => showNutri(el));
  $$('[data-g]', el).forEach((c) => c.addEventListener('change', () => { if (c.checked) plus.grocery[c.dataset.g] = 1; else delete plus.grocery[c.dataset.g]; persist(); }));
  $('#ap-gshare', el).addEventListener('click', async () => {
    const text = rows.map((r) => '- ' + (FOOD_BY_ID[r.id] ? nameOf(FOOD_BY_ID[r.id]) : r.id) + ': ' + fmt(r.g)).join('\n');
    try { if (navigator.share) await navigator.share({ title: L('مشتريات الأسبوع', 'Weekly groceries'), text: text }); else { await navigator.clipboard.writeText(text); toast(L('اتنسخت القايمة', 'Copied')); } } catch (e) { /* ألغى */ }
  });
}

/* ================================================================ أكلي */
const normAr = (s) => String(s || '').toLowerCase().replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[^ء-يa-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
function matchFoods(q) {
  const nq = normAr(q); if (!nq) return [];
  const words = nq.split(' ').filter((w) => w.length >= 2 && !/^\d+$/.test(w));
  const res = [];
  foodsAll.forEach((f) => {
    const names = [normAr(f.ar), normAr(f.en)];
    let sc = 0;
    names.forEach((nm) => { if (nm.indexOf(nq) !== -1) sc += 6; words.forEach((w) => { if (w.length >= 3 && nm.split(' ').some((x) => x === w || (x.length >= 4 && x.indexOf(w) === 0))) sc += 2; }); });
    if (sc > 0) res.push([sc, f]);
  });
  res.sort((a, b) => b[0] - a[0]);
  return res.slice(0, 6).map((x) => x[1]);
}
function guessGrams(q, f) {
  const sv = FOOD_SERVINGS[f.id] || [];
  const m = String(q).match(/(\d+(?:\.\d+)?)\s*(جرام|جم|غرام|g|gram|grams)/i); if (m) return Math.round(Number(m[1]));
  const n = (String(q).match(/(\d+)/) || [])[1];
  if (n && sv.length && /(حبه|حبة|حبات|قطعه|قطعة|piece|pieces)/i.test(q)) { const p = sv.find((s) => s[0] === 'piece') || sv[0]; return Math.round(p[1] * Number(n)); }
  if (n && sv.length && /(كوب|كوباي|cup)/i.test(q)) { const p = sv.find((s) => s[0] === 'cup') || sv[0]; return Math.round(p[1] * Number(n)); }
  return sv.length ? sv[0][1] : 100;
}
const foodToday = () => (plus.foodq[stamp()] = plus.foodq[stamp()] || []);
function viewFood(body) {
  const tab = sub.ftab || 'log';
  body.innerHTML = chips([['log', L('سجل أكلي', 'Food log')], ['fast', L('الصيام', 'Fasting')]], tab, 'ftab') + '<div id="ap-food-in"></div>';
  $$('[data-ftab]', body).forEach((b) => b.addEventListener('click', () => { sub.ftab = b.dataset.ftab; draw(); }));
  const el = $('#ap-food-in', body);
  if (tab === 'fast') fastView(el); else logView(el);
}
function logView(el) {
  const list = foodToday();
  const tot = list.reduce((a, x) => { a.kcal += x.kcal; a.p += x.p; return a; }, { kcal: 0, p: 0 });
  const target = plus.nutri && plus.nutri.target;
  const SR_API = window.SpeechRecognition || window.webkitSpeechRecognition;
  let h = '<div class="ap-card"><div class="ap-macros"><div><b>' + Math.round(tot.kcal) + '</b><small>' + esc(L('سعرة اليوم', 'kcal today')) + '</small></div><div><b>' + Math.round(tot.p) + '</b><small>' + esc(L('بروتين', 'Protein')) + '</small></div>' + (target ? '<div><b>' + Math.max(0, target - Math.round(tot.kcal)) + '</b><small>' + esc(L('باقي', 'Left')) + '</small></div>' : '') + '</div></div>';
  h += '<div class="ap-goalbox"><input id="ap-fq" type="text" placeholder="' + esc(L('اكتب أو قول: فراخ مشوية 200 جرام', 'Type or say: grilled chicken 200 g')) + '">' + (SR_API ? '<button type="button" id="ap-mic" class="ap-mic" aria-label="mic"></button>' : '') + '<button type="button" id="ap-fgo">' + esc(L('دوّر', 'Find')) + '</button></div><div id="ap-fres"></div>';
  h += '<div class="ap-sec"><b>' + esc(L('اللي أكلته النهاردة', 'Eaten today')) + '</b></div>';
  h += list.length ? '<div class="ap-card">' + list.map((x, i) => '<div class="ap-food"><span>' + esc(x.name) + ' · ' + x.g + esc(L(' جم', ' g')) + '</span><em>' + Math.round(x.kcal) + '</em><button type="button" class="ap-del" data-fd="' + i + '" aria-label="delete"></button></div>').join('') + '</div>' : '<div class="ap-empty small">' + esc(L('لسه ماسجلتش حاجة النهاردة.', 'Nothing logged today yet.')) + '</div>';
  h += '<div class="ap-note">' + esc(L('التسجيل هنا شخصي ومستقل عن سجل التغذية الأساسي.', 'This log is personal and separate from the main nutrition log.')) + '</div>';
  el.innerHTML = h;
  const run = () => {
    const q = $('#ap-fq', el).value; const found = matchFoods(q);
    const out = $('#ap-fres', el);
    if (!found.length) { out.innerHTML = '<div class="ap-empty small">' + esc(L('مالقيتش. جرب اسم تاني.', 'Not found. Try another name.')) + '</div>'; return; }
    out.innerHTML = '<div class="ap-card">' + found.map((f, i) => '<div class="ap-food"><span>' + esc(nameOf(f)) + '</span><input type="number" min="5" max="2000" value="' + guessGrams(q, f) + '" data-gi="' + i + '" class="ap-g"><button type="button" class="ap-btn small" data-add="' + i + '">+</button></div>').join('') + '</div>';
    $$('[data-add]', out).forEach((b) => b.addEventListener('click', () => {
      const f = found[Number(b.dataset.add)]; const g = Number($('[data-gi="' + b.dataset.add + '"]', out).value) || 100; const n = foodNutr(f.id, g);
      foodToday().push({ id: f.id, name: nameOf(f), g: g, kcal: n.kcal, p: n.p }); persist(); logView(el);
    }));
  };
  $('#ap-fgo', el).addEventListener('click', run);
  $('#ap-fq', el).addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });
  $$('[data-fd]', el).forEach((b) => b.addEventListener('click', () => { foodToday().splice(Number(b.dataset.fd), 1); persist(); logView(el); }));
  const mic = $('#ap-mic', el);
  if (mic) mic.addEventListener('click', () => {
    try { const r = new SR_API(); r.lang = lang() === 'en' ? 'en-US' : 'ar-EG'; r.interimResults = false; mic.classList.add('on'); r.onresult = (ev) => { $('#ap-fq', el).value = ev.results[0][0].transcript; run(); }; r.onend = () => mic.classList.remove('on'); r.onerror = () => { mic.classList.remove('on'); toast(L('مقدرتش أسمع. جرب تاني.', 'Could not hear you. Try again.')); }; r.start(); }
    catch (e) { toast(L('الميكروفون مش متاح', 'Microphone not available')); }
  });
}
const FAST = [['12:12', 12], ['14:10', 14], ['16:8', 16], ['18:6', 18], ['20:4', 20]];
let fastTimer = null;
function fastView(el) {
  clearInterval(fastTimer);
  const fs = plus.fast;
  let h = '';
  if (plus.ramadan) h += '<div class="ap-warn">' + esc(L('وضع رمضان شغال: الصيام من الفجر للمغرب، والفطار أول وجبة. التوقيت المتقطع هنا للأيام العادية.', 'Ramadan mode is on: fasting runs from dawn to sunset. The timer here is for regular days.')) + '</div>';
  if (fs && fs.start) {
    h += '<div class="ap-card ap-fastring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" class="t"/><circle cx="50" cy="50" r="44" class="v" id="ap-fv" stroke-dasharray="276" stroke-dashoffset="276"/></svg><div class="ap-fc"><b id="ap-fe">0:00</b><small>' + esc(L('من ', 'of ') + fs.hours + L(' ساعة صيام', ' h fast')) + '</small></div></div><p class="ap-p" id="ap-fmsg"></p><div class="ap-actions"><button type="button" class="ap-btn" id="ap-fend">' + esc(L('افطر الآن', 'Break fast')) + '</button></div>';
  } else {
    h += '<div class="ap-sec"><b>' + esc(L('اختار نظام الصيام', 'Choose a fasting plan')) + '</b></div><div class="ap-card ap-form">' + chips(FAST.map((f) => [f[0], f[0]]), sub.fp || '16:8', 'fp') + '<button type="button" class="ap-btn" id="ap-fstart">' + esc(L('ابدأ الصيام الآن', 'Start fasting now')) + '</button><p class="ap-note">' + esc(L('الصيام المتقطع مش مناسب للكل (حمل، سكر، أدوية، تاريخ اضطرابات أكل). استشر متخصص لو عندك أي حالة.', 'Intermittent fasting is not for everyone (pregnancy, diabetes, medication, eating-disorder history). Consult a specialist if you have any condition.')) + '</p></div>';
  }
  h += '<div class="ap-card"><div class="ap-row"><b>' + esc(L('صيامات خلصتها', 'Fasts completed')) + '</b><span>' + (plus.fastDone || 0) + '</span></div></div>';
  el.innerHTML = h;
  $$('[data-fp]', el).forEach((b) => b.addEventListener('click', () => { sub.fp = b.dataset.fp; fastView(el); }));
  const st = $('#ap-fstart', el); if (st) st.addEventListener('click', () => { const f = FAST.find((x) => x[0] === (sub.fp || '16:8')); plus.fast = { proto: f[0], hours: f[1], start: Date.now() }; persist(); fastView(el); });
  const en = $('#ap-fend', el); if (en) en.addEventListener('click', () => { const done = (Date.now() - plus.fast.start) / 3600000 >= plus.fast.hours; if (done) plus.fastDone = (plus.fastDone || 0) + 1; plus.fast = null; persist(); toast(done ? L('أحسنت! خلصت الصيام.', 'Well done! Fast completed.') : L('اتقفل الصيام.', 'Fast ended.')); fastView(el); });
  if (fs && fs.start) {
    const tick = () => {
      const e = $('#ap-fe', el); if (!e || !e.isConnected) { clearInterval(fastTimer); return; }
      const hrs = (Date.now() - fs.start) / 3600000; const hh = Math.floor(hrs), mm = Math.floor((hrs - hh) * 60);
      e.textContent = hh + ':' + String(mm).padStart(2, '0');
      $('#ap-fv', el).setAttribute('stroke-dashoffset', String(276 - 276 * Math.min(1, hrs / fs.hours)));
      $('#ap-fmsg', el).textContent = hrs >= fs.hours ? L('وصلت لهدفك. تقدر تفطر.', 'You reached your goal. You can break your fast.') : L('باقي ', 'Remaining ') + (Math.ceil((fs.hours - hrs) * 10) / 10) + L(' ساعة. اشرب مياه.', ' h. Drink water.');
    };
    tick(); fastTimer = setInterval(tick, 30000);
  }
}

/* ================================================================ تأهيلي */
const REHAB_FLAGS = [
  ['night', 'وجع بيصحيني بالليل أو بيزيد وأنا مرتاح', 'Pain that wakes me at night or worsens at rest'],
  ['numb', 'تنميل أو حرقان أو ضعف في الذراع أو الرجل', 'Numbness, tingling or weakness in an arm or leg'],
  ['giveway', 'المفصل بيخونّي أو مقفول ومش بيتحرك', 'The joint gives way or is locked'],
  ['swell', 'تورم واضح أو تشوه أو سخونة', 'Obvious swelling, deformity or heat'],
  ['unwell', 'سخونية أو تعب عام معاه الوجع', 'Fever or feeling generally unwell with the pain'],
  ['trauma', 'الوجع بدأ بعد حادثة أو وقعة قوية', 'Pain started after a significant fall or accident']
];
function viewRehab(body) {
  const d = sub.rd || { area: '', level: 3, since: 'week', flags: {} };
  let h = '<div class="ap-sec"><b>' + esc(L('تقييم سريع للوجع', 'Quick pain check')) + '</b></div><div class="ap-card ap-form">';
  h += '<div class="ap-q"><b>' + esc(L('فين الوجع؟', 'Where does it hurt?')) + '</b>' + chips(INJURY_AREAS.map((a) => [a[0], L(a[1], a[2])]), d.area, 'ra') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('شدة الوجع الآن (0 إلى 10): ', 'Pain level now (0 to 10): ')) + '<span id="ap-pv">' + d.level + '</span></b><input type="range" id="ap-pl" min="0" max="10" value="' + d.level + '"></div>';
  h += '<div class="ap-q"><b>' + esc(L('بدأ من إمتى؟', 'Since when?')) + '</b>' + chips([['days', L('أيام', 'Days')], ['week', L('أسابيع', 'Weeks')], ['month', L('شهور', 'Months')]], d.since, 'rs') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('حاجة من دول بتحصل؟', 'Any of these?')) + '</b>' + REHAB_FLAGS.map((f) => '<label class="ap-task"><input type="checkbox" data-flag="' + f[0] + '"' + (d.flags[f[0]] ? ' checked' : '') + '><span>' + esc(L(f[1], f[2])) + '</span></label>').join('') + '</div>';
  h += '<button type="button" class="ap-btn" id="ap-rsave">' + esc(L('سجّل وشوف التوصية', 'Save and see advice')) + '</button></div>';
  if (sub.rres) h += sub.rres;
  const hist = (plus.pain || []).slice(-8);
  if (hist.length) h += '<div class="ap-sec"><b>' + esc(L('سجل الوجع', 'Pain history')) + '</b></div><div class="ap-card">' + hist.slice().reverse().map((x) => { const a = INJURY_AREAS.find((i) => i[0] === x.area); return '<div class="ap-food"><span>' + esc(x.d + ' · ' + (a ? L(a[1], a[2]) : '')) + '</span><em>' + x.level + '/10</em></div>'; }).join('') + '</div>';
  h += '<div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-rconsult">' + esc(L('كلّم متخصص التأهيل (مجانًا)', 'Talk to a rehab specialist (free)')) + '</button></div><div class="ap-note">' + esc(pick(JOURNEYS.find((j) => j.id === 'rehab_knee').note)) + '</div>';
  body.innerHTML = h;
  const re = () => viewRehab(body);
  $$('[data-ra]', body).forEach((b) => b.addEventListener('click', () => { sub.rd = Object.assign({}, d, gather(body, d), { area: b.dataset.ra }); sub.rres = ''; re(); }));
  $$('[data-rs]', body).forEach((b) => b.addEventListener('click', () => { sub.rd = Object.assign({}, d, gather(body, d), { since: b.dataset.rs }); sub.rres = ''; re(); }));
  $('#ap-pl', body).addEventListener('input', (e) => { $('#ap-pv', body).textContent = e.target.value; });
  $('#ap-rconsult', body).addEventListener('click', () => consult(L('وجع في ', 'pain in ') + ((INJURY_AREAS.find((a) => a[0] === d.area) || [0, '', ''])[lang() === 'en' ? 2 : 1] || '')));
  $('#ap-rsave', body).addEventListener('click', () => {
    const cur = Object.assign({}, d, gather(body, d));
    if (!cur.area) { toast(L('اختار مكان الوجع', 'Choose the pain location')); return; }
    plus.pain = (plus.pain || []).concat([{ d: stamp(), area: cur.area, level: cur.level, since: cur.since, flags: Object.keys(cur.flags).filter((k) => cur.flags[k]) }]).slice(-60); persist();
    const flagged = Object.keys(cur.flags).some((k) => cur.flags[k]) || cur.level >= 8;
    const j = JOURNEYS.find((x) => x.injury === cur.area);
    let r = '<div class="ap-card ' + (flagged ? 'ap-alert' : '') + '"><b>' + esc(flagged ? L('الأفضل تكشف عند طبيب أو متخصص في أقرب وقت', 'It is best to see a doctor or specialist soon') : L('التوصية', 'Advice')) + '</b><p class="ap-p">' + esc(flagged ? L('العلامات اللي اخترتها محتاجة تقييم شخصي قبل أي تمرين. ماتكملش تمارين مجهدة لحد ما تتأكد.', 'The signs you selected need an in-person assessment before any exercise. Avoid strenuous exercise until checked.') : L('حرّك المنطقة بخفة بدون وجع، وتجنب الحركات اللي بتزوده، وراقب الوجع كل كام يوم. لو زاد أو ما اتحسنش في أسبوعين، كلّم متخصص.', 'Move the area gently without pain, avoid what aggravates it and track it every few days. If it worsens or does not improve in two weeks, talk to a specialist.')) + '</p>' + (!flagged && j ? '<button type="button" class="ap-btn small" data-rj="' + j.id + '">' + esc(L('شوف رحلة: ', 'See journey: ') + pick(j.title)) + '</button> ' : '') + '<button type="button" class="ap-btn small ghost" data-rc="1">' + esc(L('كلّم متخصص', 'Talk to a specialist')) + '</button></div>';
    sub.rres = r; sub.rd = Object.assign({}, cur); re();
    $$('[data-rj]', body).forEach((b) => b.addEventListener('click', () => { curTab = 'journeys'; sub = { openJ: b.dataset.rj }; $$('#ap-tabs button').forEach((x) => x.classList.toggle('on', x.dataset.tab === 'journeys')); draw(); }));
    $$('[data-rc]', body).forEach((b) => b.addEventListener('click', () => consult(L('وجع في ', 'pain in ') + ((INJURY_AREAS.find((a) => a[0] === cur.area) || [0, '', ''])[lang() === 'en' ? 2 : 1] || ''))));
  });
}
function gather(body, d) { const fl = {}; $$('[data-flag]', body).forEach((c) => { fl[c.dataset.flag] = c.checked; }); const l = $('#ap-pl', body); return { level: l ? Number(l.value) : d.level, flags: fl }; }


/* ================================================================ المكتبة */
const MUS = { chest: ['صدر', 'Chest'], shoulders: ['كتف', 'Shoulders'], biceps: ['باي', 'Biceps'], triceps: ['ترايسبس', 'Triceps'], forearms: ['ساعد', 'Forearms'], abdominals: ['بطن', 'Abs'], quadriceps: ['فخذ أمامي', 'Quads'], hamstrings: ['فخذ خلفي', 'Hamstrings'], glutes: ['مؤخرة', 'Glutes'], calves: ['سمانة', 'Calves'], lats: ['ضهر عريض', 'Lats'], 'middle back': ['منتصف الضهر', 'Mid back'], 'lower back': ['أسفل الضهر', 'Lower back'], traps: ['تراباس', 'Traps'], neck: ['رقبة', 'Neck'], adductors: ['باطن الفخذ', 'Adductors'], abductors: ['خارج الفخذ', 'Abductors'] };
const CATL = { strength: ['قوة', 'Strength'], core: ['بطن وكور', 'Core'], warmup: ['إحماء', 'Warm-up'], mobility: ['مرونة', 'Mobility'], rehab: ['تأهيل', 'Rehab'], athletic: ['أداء رياضي', 'Athletic'], functional: ['وظيفي', 'Functional'], stretching: ['إطالة', 'Stretching'], cardio: ['كارديو', 'Cardio'], plyometrics: ['بلايومترك', 'Plyometrics'], conditioning: ['تكييف', 'Conditioning'], testing: ['اختبارات', 'Testing'], tactical: ['تكتيك', 'Tactical'], speed: ['سرعة', 'Speed'] };
const EQL = { 'body only': ['وزن الجسم', 'Bodyweight'], dumbbell: ['دمبل', 'Dumbbell'], barbell: ['بار', 'Barbell'], cable: ['كابل', 'Cable'], machine: ['جهاز', 'Machine'], bands: ['استك', 'Bands'], kettlebells: ['كيتل بيل', 'Kettlebell'], 'smith machine': ['سميث', 'Smith machine'], bench: ['بنش', 'Bench'], 'pullup bar': ['عقلة', 'Pull-up bar'], 'exercise ball': ['كورة', 'Exercise ball'], 'medicine ball': ['ميديسن بول', 'Medicine ball'], 'mini band': ['ميني باند', 'Mini band'], 'foam roll': ['فوم رولر', 'Foam roller'], other: ['أخرى', 'Other'] };
const FCAT = { protein: ['بروتين', 'Protein'], dairy: ['ألبان', 'Dairy'], carb: ['نشويات', 'Carbs'], veg: ['خضار', 'Vegetables'], fruit: ['فاكهة', 'Fruit'], fat: ['دهون', 'Fats'], dish: ['أطباق', 'Dishes'], drink: ['مشروبات', 'Drinks'], supplement: ['مكملات', 'Supplements'] };
const PGOAL = { lose_weight: ['تخسيس', 'Fat loss'], maintain: ['تثبيت', 'Maintain'], gain_muscle: ['زيادة عضل', 'Muscle gain'], gain: ['زيادة وزن', 'Weight gain'] };
const SECL = { warmup: ['إحماء', 'Warm-up'], main: ['الأساسي', 'Main'], cardio: ['كارديو', 'Cardio'], mobility: ['مرونة', 'Mobility'], flexibility: ['إطالة', 'Stretching'] };
const PHASEL = { off: ['خارج الموسم', 'Off-season'], pre: ['قبل الموسم', 'Pre-season'], in: ['أثناء الموسم', 'In-season'] };
const tl = (m, k) => (m[k] ? L(m[k][0], m[k][1]) : k);
let libEx = null, libMedia = {}, libPromise = null, tplAll = SPORT_TEMPLATES.slice(), tplPromise = null, libByEn = null;
function loadLib() {
  if (libEx) return Promise.resolve();
  if (libPromise) return libPromise;
  libPromise = import('./library/exercises-index.js').then((m) => {
    libMedia = m.LOCAL_MEDIA || {};
    const seen = {}, out = [];
    (m.EXERCISE_INDEX || []).forEach((r) => { seen[r.id] = 1; out.push({ id: r.id, name: r.n, category: r.c, primaryMuscles: r.pm || [], equipment: r.e, m: r.m || (libMedia[r.id] ? libMedia[r.id][0] : '') }); });
    EXERCISE_LIBRARY.forEach((e) => { if (!seen[e.id]) out.push({ id: e.id, name: e.name, category: e.category, primaryMuscles: e.primaryMuscles || [], equipment: e.equipment, m: libMedia[e.id] ? libMedia[e.id][0] : '' }); });
    libEx = out;
  }).catch(() => {
    libEx = EXERCISE_LIBRARY.map((e) => ({ id: e.id, name: e.name, category: e.category, primaryMuscles: e.primaryMuscles || [], equipment: e.equipment, m: '' }));
  });
  return libPromise;
}
function loadTpl() {
  if (tplPromise) return tplPromise;
  tplPromise = Promise.all(['templates-extra', 'templates-sports-a', 'templates-sports-b'].map((n) => import('./library/' + n + '.js').catch(() => ({})))).then((mods) => {
    mods.forEach((m) => { Object.keys(m).forEach((k) => { if (Array.isArray(m[k])) m[k].forEach((t) => { if (t && t.id && !tplAll.some((x) => x.id === t.id)) tplAll.push(t); }); }); });
  });
  return tplPromise;
}
function exByEn(en) {
  if (!libEx) return null;
  if (!libByEn) { libByEn = {}; libEx.forEach((e) => { const k = String((e.name && e.name.en) || '').toLowerCase(); if (k && !libByEn[k]) libByEn[k] = e; }); }
  return libByEn[String(en || '').toLowerCase()] || null;
}
function viewLib(body) {
  const lt = sub.lt || 'ex';
  body.innerHTML = chips([['ex', L('التمارين', 'Exercises')], ['tpl', L('قوالب التمرين', 'Workout templates')], ['food', L('الأكل', 'Foods')], ['prog', L('برامج الأكل', 'Meal programs')]], lt, 'lt') + '<div id="ap-lib-in"></div>';
  $$('[data-lt]', body).forEach((b) => b.addEventListener('click', () => { sub.lt = b.dataset.lt; sub.openT = null; sub.openP = null; sub.n = 30; draw(); }));
  const el = $('#ap-lib-in', body);
  if (lt === 'ex') libExView(el); else if (lt === 'tpl') libTplView(el); else if (lt === 'food') libFoodView(el); else libProgView(el);
}
function loadingBox(el) { el.innerHTML = '<div class="ap-load">' + esc(L('جاري التحميل...', 'Loading...')) + '</div>'; }
function moreBtn(total, shown) {
  return total > shown ? '<div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-more">' + esc(L('المزيد (' + (total - shown) + ')', 'More (' + (total - shown) + ')')) + '</button></div>' : '';
}
async function libExView(el) {
  loadingBox(el); await loadLib();
  const cats = Array.from(new Set(libEx.map((e) => e.category))).filter(Boolean);
  const muscles = Object.keys(MUS), eqs = Array.from(new Set(libEx.map((e) => e.equipment))).filter(Boolean);
  let h = '<div class="ap-goalbox"><input id="ap-lq" type="text" maxlength="60" placeholder="' + esc(L('دوّر على تمرين: سكوات، صدر، دمبل...', 'Search an exercise: squat, chest, dumbbell...')) + '" value="' + esc(sub.q || '') + '"></div>';
  h += chips([['', L('كل الأنواع', 'All types')]].concat(cats.map((c) => [c, tl(CATL, c)])), sub.cat || '', 'lcat');
  h += '<div class="ap-two"><select id="ap-lmus" class="ap-select"><option value="">' + esc(L('كل العضلات', 'All muscles')) + '</option>' + muscles.map((m) => '<option value="' + esc(m) + '"' + (sub.mus === m ? ' selected' : '') + '>' + esc(tl(MUS, m)) + '</option>').join('') + '</select><select id="ap-leq" class="ap-select"><option value="">' + esc(L('كل المعدات', 'All equipment')) + '</option>' + eqs.map((m) => '<option value="' + esc(m) + '"' + (sub.eqp === m ? ' selected' : '') + '>' + esc(tl(EQL, m)) + '</option>').join('') + '</select></div>';
  h += '<div class="ap-note" id="ap-lcount"></div><div class="ap-card" id="ap-llist"></div><div id="ap-lmore"></div>';
  el.innerHTML = h;
  $$('[data-lcat]', el).forEach((b) => b.addEventListener('click', () => { sub.cat = b.dataset.lcat; sub.n = 30; libExView(el); }));
  $('#ap-lmus', el).addEventListener('change', (e) => { sub.mus = e.target.value; sub.n = 30; paintEx(el); });
  $('#ap-leq', el).addEventListener('change', (e) => { sub.eqp = e.target.value; sub.n = 30; paintEx(el); });
  $('#ap-lq', el).addEventListener('input', (e) => { sub.q = e.target.value; sub.n = 30; paintEx(el); });
  paintEx(el);
}
function paintEx(el) {
  const q = (sub.q || '').trim().toLowerCase();
  const list = libEx.filter((e) => {
    if (sub.cat && e.category !== sub.cat) return false;
    if (sub.mus && (e.primaryMuscles || []).indexOf(sub.mus) === -1) return false;
    if (sub.eqp && e.equipment !== sub.eqp) return false;
    if (q) { const nm = ((e.name && e.name.ar) || '') + ' ' + ((e.name && e.name.en) || '') + ' ' + (e.primaryMuscles || []).map((m) => tl(MUS, m)).join(' ') + ' ' + (e.primaryMuscles || []).join(' '); if (nm.toLowerCase().indexOf(q) === -1) return false; }
    return true;
  });
  const n = sub.n || 30;
  $('#ap-lcount', el).textContent = list.length + L(' تمرين', ' exercises');
  $('#ap-llist', el).innerHTML = list.length ? list.slice(0, n).map((e) => '<button type="button" class="ap-ex ap-exrow" data-ex="' + esc(e.id) + '">' + (e.m ? '<img class="ap-th" loading="lazy" alt="" src="media/' + esc(e.m) + '.svg">' : '<span class="ap-th"></span>') + '<span class="ap-exn"><b>' + esc(nameOf(e.name || {})) + '</b><small>' + esc((e.primaryMuscles || []).slice(0, 2).map((m) => tl(MUS, m)).join(' · ') + (e.equipment ? ' · ' + tl(EQL, e.equipment) : '')) + '</small></span><em>›</em></button>').join('') : '<div class="ap-empty small">' + esc(L('مفيش تمرين مطابق.', 'No matching exercise.')) + '</div>';
  $('#ap-lmore', el).innerHTML = moreBtn(list.length, Math.min(n, list.length));
  $$('[data-ex]', el).forEach((b) => b.addEventListener('click', () => openExercise(b.dataset.ex)));
  const mb = $('#ap-more', el); if (mb) mb.addEventListener('click', () => { sub.n = n + 30; paintEx(el); });
}
async function libTplView(el) {
  loadingBox(el); await Promise.all([loadLib(), loadTpl()]);
  if (sub.openT) return tplDetail(el, tplAll.find((t) => t.id === sub.openT));
  const groups = Array.from(new Set(tplAll.map((t) => t.group))).filter(Boolean);
  let h = '<div class="ap-goalbox"><input id="ap-lq" type="text" maxlength="60" placeholder="' + esc(L('دوّر: مبتدئ، كرة قدم، ظهر...', 'Search: beginner, football, back...')) + '" value="' + esc(sub.q || '') + '"></div>';
  h += chips([['', L('الكل', 'All')]].concat(groups.map((g) => [g, SPORT_GROUPS[g] ? nameOf(SPORT_GROUPS[g]) : g])), sub.grp || '', 'lgrp');
  h += '<div class="ap-note" id="ap-lcount"></div><div class="ap-card" id="ap-llist"></div><div id="ap-lmore"></div>';
  el.innerHTML = h;
  $$('[data-lgrp]', el).forEach((b) => b.addEventListener('click', () => { sub.grp = b.dataset.lgrp; sub.n = 30; libTplView(el); }));
  $('#ap-lq', el).addEventListener('input', (e) => { sub.q = e.target.value; sub.n = 30; paintTpl(el); });
  paintTpl(el);
}
function paintTpl(el) {
  const q = (sub.q || '').trim().toLowerCase();
  const list = tplAll.filter((t) => (!sub.grp || t.group === sub.grp) && (!q || (String(t.ar || '') + ' ' + String(t.en || '')).toLowerCase().indexOf(q) !== -1));
  const n = sub.n || 30;
  $('#ap-lcount', el).textContent = list.length + L(' قالب', ' templates');
  $('#ap-llist', el).innerHTML = list.length ? list.slice(0, n).map((t) => '<button type="button" class="ap-ex" data-tp="' + esc(t.id) + '"><span class="ap-exn"><b>' + esc(nameOf(t)) + '</b><small>' + esc((SPORT_GROUPS[t.group] ? nameOf(SPORT_GROUPS[t.group]) : '') + (t.phase && PHASEL[t.phase] ? ' · ' + tl(PHASEL, t.phase) : '')) + '</small></span><em>›</em></button>').join('') : '<div class="ap-empty small">' + esc(L('مفيش قالب مطابق.', 'No matching template.')) + '</div>';
  $('#ap-lmore', el).innerHTML = moreBtn(list.length, Math.min(n, list.length));
  $$('[data-tp]', el).forEach((b) => b.addEventListener('click', () => { sub.openT = b.dataset.tp; libTplView(el); }));
  const mb = $('#ap-more', el); if (mb) mb.addEventListener('click', () => { sub.n = n + 30; paintTpl(el); });
}
function tplDetail(el, t) {
  if (!t) { sub.openT = null; return libTplView(el); }
  let h = '<button type="button" class="ap-back" id="ap-tback">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(nameOf(t)) + '</b></div>';
  if (t.note) h += '<p class="ap-p mu">' + esc(pick(t.note)) + '</p>';
  const keys = Object.keys(SECL).filter((k) => t.sections && t.sections[k] && t.sections[k].length).concat(Object.keys(t.sections || {}).filter((k) => !SECL[k] && t.sections[k] && t.sections[k].length));
  keys.forEach((k) => {
    h += '<div class="ap-card"><div class="ap-row"><b>' + esc(tl(SECL, k)) + '</b></div>';
    t.sections[k].forEach((it) => {
      const ex = (it.libId && libEx.find((e) => e.id === it.libId)) || exByEn(it.en);
      const nm = ex ? nameOf(ex.name || {}) : (it.en || '');
      const meta = (it.sets ? it.sets + ' × ' : '') + (it.reps || '') + (it.rest ? ' · ' + it.rest : '');
      h += ex ? '<button type="button" class="ap-ex" data-ex="' + esc(ex.id) + '"><span class="ap-exn"><b>' + esc(nm) + '</b></span><em>' + esc(meta) + '</em></button>' : '<div class="ap-food"><span>' + esc(nm) + '</span><em>' + esc(meta) + '</em></div>';
    });
    h += '</div>';
  });
  h += '<div class="ap-note">' + esc(L('قالب إرشادي جاهز. عدّل الأوزان والتكرارات حسب مستواك، ولو عندك إصابة اسأل متخصص قبل ما تبدأ.', 'A ready guideline template. Adjust loads and reps to your level, and ask a specialist first if you have an injury.')) + '</div><div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-task">' + esc(L('اسأل متخصص', 'Ask a specialist')) + '</button></div>';
  el.innerHTML = h;
  $('#ap-tback', el).addEventListener('click', () => { sub.openT = null; libTplView(el); });
  $$('[data-ex]', el).forEach((b) => b.addEventListener('click', () => openExercise(b.dataset.ex)));
  $('#ap-task', el).addEventListener('click', () => consult(nameOf(t)));
}
function libFoodView(el) {
  const cats = Array.from(new Set(foodsAll.map((f) => f.cat))).filter(Boolean);
  let h = '<div class="ap-goalbox"><input id="ap-lq" type="text" maxlength="60" placeholder="' + esc(L('دوّر على أكلة: فراخ، رز، فول...', 'Search a food: chicken, rice, beans...')) + '" value="' + esc(sub.q || '') + '"></div>';
  h += chips([['', L('الكل', 'All')]].concat(cats.map((c) => [c, tl(FCAT, c)])), sub.fcat || '', 'lfc');
  h += '<div class="ap-note" id="ap-lcount"></div><div class="ap-card" id="ap-llist"></div><div id="ap-lmore"></div><div class="ap-note">' + esc(L('القيم لكل 100 جرام تقريبًا.', 'Values are approximate per 100 g.')) + '</div>';
  el.innerHTML = h;
  $$('[data-lfc]', el).forEach((b) => b.addEventListener('click', () => { sub.fcat = b.dataset.lfc; sub.n = 40; libFoodView(el); }));
  $('#ap-lq', el).addEventListener('input', (e) => { sub.q = e.target.value; sub.n = 40; paintFood(el); });
  paintFood(el);
}
function paintFood(el) {
  const q = (sub.q || '').trim().toLowerCase();
  const list = foodsAll.filter((f) => (!sub.fcat || f.cat === sub.fcat) && (!q || (String(f.ar || '') + ' ' + String(f.en || '')).toLowerCase().indexOf(q) !== -1));
  const n = sub.n || 40;
  $('#ap-lcount', el).textContent = list.length + L(' صنف', ' foods');
  $('#ap-llist', el).innerHTML = list.length ? list.slice(0, n).map((f) => '<div class="ap-food"><span class="ap-exn"><b>' + esc(nameOf(f)) + '</b><small>' + esc(L('بروتين ', 'P ') + f.p + L(' · كارب ', ' · C ') + f.cb + L(' · دهون ', ' · F ') + f.f) + '</small></span><em>' + f.c + ' ' + esc(L('سعرة', 'kcal')) + '</em></div>').join('') : '<div class="ap-empty small">' + esc(L('مفيش صنف مطابق.', 'No matching food.')) + '</div>';
  $('#ap-lmore', el).innerHTML = moreBtn(list.length, Math.min(n, list.length));
  const mb = $('#ap-more', el); if (mb) mb.addEventListener('click', () => { sub.n = n + 40; paintFood(el); });
}
function libProgView(el) {
  if (sub.openP) return progDetail(el, programsAll.find((p) => p.id === sub.openP));
  const goals = Array.from(new Set(programsAll.map((p) => p.goal))).filter(Boolean);
  let h = chips([['', L('الكل', 'All')]].concat(goals.map((g) => [g, tl(PGOAL, g)])), sub.pg || '', 'lpg');
  const list = programsAll.filter((p) => !sub.pg || p.goal === sub.pg);
  h += '<div class="ap-note">' + list.length + esc(L(' برنامج', ' programs')) + '</div><div class="ap-card">' + list.map((p) => '<button type="button" class="ap-ex" data-pp="' + esc(p.id) + '"><span class="ap-exn"><b>' + esc(nameOf(p)) + '</b><small>' + esc(tl(PGOAL, p.goal) + ' · ' + progKcal(p) + L(' سعرة', ' kcal')) + '</small></span><em>›</em></button>').join('') + '</div>';
  el.innerHTML = h;
  $$('[data-lpg]', el).forEach((b) => b.addEventListener('click', () => { sub.pg = b.dataset.lpg; libProgView(el); }));
  $$('[data-pp]', el).forEach((b) => b.addEventListener('click', () => { sub.openP = b.dataset.pp; sub.nday = 0; libProgView(el); }));
}
function progDetail(el, pr) {
  if (!pr) { sub.openP = null; return libProgView(el); }
  const di = Math.min(sub.nday || 0, pr.days.length - 1), day = pr.days[di], t = dayTotals(day, 1);
  let h = '<button type="button" class="ap-back" id="ap-pback">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(nameOf(pr)) + '</b></div>';
  if (pr.desc) h += '<p class="ap-p mu">' + esc(pick(pr.desc)) + '</p>';
  h += '<div class="ap-card"><div class="ap-macros"><div><b>' + Math.round(t.kcal) + '</b><small>' + esc(L('سعرة', 'kcal')) + '</small></div><div><b>' + Math.round(t.p) + '</b><small>' + esc(L('بروتين', 'Protein')) + '</small></div><div><b>' + Math.round(t.c) + '</b><small>' + esc(L('كارب', 'Carbs')) + '</small></div><div><b>' + Math.round(t.f) + '</b><small>' + esc(L('دهون', 'Fat')) + '</small></div></div></div>';
  h += chips(pr.days.map((_, i) => [i, L('يوم ', 'Day ') + (i + 1)]), di, 'pd');
  Object.keys(day).forEach((m) => {
    const items = day[m] || []; if (!items.length) return;
    h += '<div class="ap-card"><div class="ap-row"><b>' + esc(MEAL_NAME[m] ? L(MEAL_NAME[m][0], MEAL_NAME[m][1]) : m) + '</b></div>' + items.map((it) => { const fd = FOOD_BY_ID[it.id]; return '<div class="ap-food"><span>' + esc(fd ? nameOf(fd) : it.id) + '</span><em>' + r5(it.g) + ' ' + esc(L('جم', 'g')) + '</em></div>'; }).join('') + '</div>';
  });
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-padopt">' + esc(L('اعتمده كخطة أكلي', 'Use as my nutrition plan')) + '</button></div><div class="ap-note">' + esc(L('خطة إرشادية للّياقة العامة. لو عندك حالة صحية أو حساسية، استشر أخصائي تغذية.', 'A guideline plan for general fitness. If you have a health condition or allergy, consult a dietitian.')) + '</div>';
  el.innerHTML = h;
  $('#ap-pback', el).addEventListener('click', () => { sub.openP = null; libProgView(el); });
  $$('[data-pd]', el).forEach((b) => b.addEventListener('click', () => { sub.nday = Number(b.dataset.pd); progDetail(el, pr); }));
  $('#ap-padopt', el).addEventListener('click', () => {
    plus.nutri = Object.assign({}, plus.nutri || {}, { prog: pr.id, factor: 1, target: progKcal(pr), params: (plus.nutri && plus.nutri.params) || null }); persist();
    go('plan'); sub.planTab = 'nutri'; draw(); toast(L('اتحفظ في خطتي', 'Saved to My plan'));
  });
}

/* ================================================================ سؤال اليوم (نافذة أول الدخول) */
export async function quickCheck() {
  if (document.getElementById('ap-qc')) return;
  try { if (sessionStorage.getItem('adam-qc-dismissed') === stamp()) return; } catch (e) { /* تجاهل */ }
  await loadState();
  if (!EMAIL) return;
  const today = stamp(); const c0 = plus.checkins[today];
  if (c0 && c0.score != null) return;
  const m = document.createElement('div'); m.id = 'ap-qc'; m.className = 'ap-qc'; m.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
  document.body.appendChild(m);
  const dismiss = () => { try { sessionStorage.setItem('adam-qc-dismissed', today); } catch (e) { /* تجاهل */ } m.remove(); };
  const draw2 = () => {
    const c = plus.checkins[today] || {}; const done = CHECK_Q.every((q) => c[q.k] != null);
    let h = '<div class="ap-qc-box"><button type="button" class="ap-x" id="ap-qc-x" aria-label="close"></button><b class="ap-qc-t">' + esc(L('سؤال اليوم', 'Daily check-in')) + '</b><p class="ap-qc-s">' + esc(L('دقيقة وتعرف جاهزيتك النهاردة', 'One minute to know your readiness today')) + '</p>';
    if (!done) {
      CHECK_Q.forEach((q) => { h += '<div class="ap-q"><b>' + esc(L(q.q[0], q.q[1])) + '</b><div class="ap-opts">' + q.o.map((o, i) => '<button type="button" data-q="' + q.k + '" data-i="' + i + '" class="' + (c[q.k] === i ? 'on' : '') + '">' + esc(L(o[0], o[1])) + '</button>').join('') + '</div></div>'; });
    } else {
      const sc = c.score;
      h += '<div class="ap-score"><div class="ap-big2" style="color:' + (sc >= 70 ? '#3ef0b0' : sc >= 45 ? '#ffab5c' : '#ff6b78') + '">' + sc + '</div>' + advice(sc, c).map((t) => '<p class="ap-p">' + esc(t) + '</p>').join('') + '</div><div class="ap-actions"><button type="button" class="ap-btn" id="ap-qc-more">' + esc(L('التفاصيل', 'Details')) + '</button><button type="button" class="ap-btn ghost" id="ap-qc-ok">' + esc(L('تمام', 'Done')) + '</button></div>';
    }
    m.innerHTML = h + '</div>';
    $('#ap-qc-x', m).addEventListener('click', dismiss);
    $$('[data-q]', m).forEach((b) => b.addEventListener('click', () => {
      const cc = plus.checkins[today] || {}; cc[b.dataset.q] = Number(b.dataset.i);
      const sc = readiness(cc); if (sc != null) cc.score = sc; cc.d = today; plus.checkins[today] = cc;
      const keys = Object.keys(plus.checkins).sort(); while (keys.length > 120) delete plus.checkins[keys.shift()];
      persist(); draw2();
    }));
    const ok = $('#ap-qc-ok', m); if (ok) ok.addEventListener('click', () => m.remove());
    const more = $('#ap-qc-more', m); if (more) more.addEventListener('click', () => { m.remove(); open('today'); });
  };
  draw2();
}

export async function summary() {
  await loadState();
  const td = stamp(); let ready = null;
  for (let i = 0; i < 2 && ready == null; i++) { const c = plus.checkins[addDays(td, -i)]; if (c && c.score != null) ready = c.score; }
  const todayDone = !!(plus.checkins[td] && plus.checkins[td].score != null);
  const foods = (plus.foodq && plus.foodq[td]) || [];
  return { ready: ready, todayDone: todayDone, foodCount: foods.length };
}
export async function todayOwn() {
  await Promise.all([loadState(), loadExtras()]);
  const wd = dayIdx(new Date());
  const day = plus.train && plus.train.days.find((x) => x.wd === wd);
  if (!day) return { has: !!(plus.train && plus.train.days.length), items: [] };
  return { has: true, kind: day.kind, items: day.items.map((it) => { const ex = EX_BY_ID[it.id]; return ex ? { id: it.id, name: nameOf(ex.name), sets: it.sets, reps: it.reps } : null; }).filter(Boolean) };
}
window.ADAM_PLUS = { todayOwn: todayOwn, openOwn: openOwn, open: open, close: close, quickCheck: quickCheck, summary: summary };
