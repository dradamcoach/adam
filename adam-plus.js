/*
 * ADAM+ — الرحلات · الطلعات · سؤال اليوم · خطتي · أكلي · تأهيلي
 * ملف منفصل عن app.js (بيتحمّل عند أول فتح). كل الشاشات عربي/إنجليزي.
 * البيانات الشخصية بتتخزن على الجهاز، وبتتزامن مع مستند checkins/{email}
 * (حقل plus) لو الحساب مسموح له. الطلعات بتحتاج قواعد events في Firestore.
 */
import { JOURNEYS, GOVERNORATES, EVENT_TYPES, INJURY_AREAS, DIETS, GOALS, GOAL_KEYWORDS } from './adam-plus-data.js';
import { SPORTS, SPORT_GROUPS, SPORT_TEMPLATES } from './sports.js';
import { EXERCISE_LIBRARY } from './exercise-library.js';
import { FOOD_LIBRARY, FOOD_SERVINGS, FOOD_CATEGORIES } from './food-library.js';
import { NUTRITION_PROGRAMS } from './nutrition-programs.js';
import { CHALLENGES, WEEKLY, TENMIN, STRETCH_MOVES, STRETCH_ROUTINES, RECIPES } from './adam-plus-data2.js';
import { TIMER_GUIDE } from './adam-plus-guide.js';
import { RECIPES_EXTRA } from './adam-plus-recipes2.js';
import { CIRC_EXTRA } from './adam-plus-circuits2.js';
import { STRETCH_MOVES_EXTRA, STRETCH_ROUTINES_EXTRA } from './adam-plus-stretch2.js';
const ALL_MOVES = Object.assign({}, STRETCH_MOVES, STRETCH_MOVES_EXTRA);
const ALL_ROUTINES = STRETCH_ROUTINES.concat(STRETCH_ROUTINES_EXTRA);
const ALL_RECIPES = RECIPES.concat(RECIPES_EXTRA);
import { foodArt } from './food-art.js';
import { MU, JOINTS, PATTERNS, GAIT, POSTURE, INJURIES, PRINCIPLES, PLANES, derive, bioIndex, norm, jointById, patternById } from './adam-biomech.js';

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
let plus = { v: 1, ts: 0, checkins: {}, journey: null, train: null, nutri: null, pain: [], foodq: {}, fast: null, ramadan: false, travel: false, goal: '', chals: {}, profile: null, set: null, sessions: [], skipProfile: false, weekly: null, weeksDone: 0, chalDone: 0, fav: {}, rswap: {}, cart: {}, stretch: { days: {} }, circ: { list: [] } };
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
  if (EMAIL) {
    try {
      const g = localStorage.getItem('adamplus:guest');
      if (g) { const gp = JSON.parse(g); if (!plus.ts || plus.ts < 1) plus = Object.assign(plus, gp); else if (!plus.profile && gp.profile) plus.profile = gp.profile; localStorage.removeItem('adamplus:guest'); plus.ts = Date.now(); }
    } catch (e) { /* تجاهل */ }
  }
  plus.sessions = plus.sessions || []; plus.checkins = plus.checkins || {}; plus.pain = plus.pain || []; plus.foodq = plus.foodq || {}; plus.chals = plus.chals || {}; plus.fav = plus.fav || {}; plus.rswap = plus.rswap || {}; plus.cart = plus.cart || {}; plus.stretch = plus.stretch || { days: {} }; plus.stretch.days = plus.stretch.days || {}; plus.circ = plus.circ || { list: [] }; plus.circ.list = plus.circ.list || [];
  /* حماية: لو خطة التمرين المحفوظة ناقصة أو قديمة، نصلحها بدل ما الشاشة تقع */
  try {
    const t = plus.train;
    if (t && typeof t === 'object') {
      if (!t.params || typeof t.params !== 'object') t.params = { goal: 'fitness', days: 0, equip: 'gym' };
      if (!Array.isArray(t.days)) t.days = [];
      t.days = t.days.filter((d) => d && typeof d === 'object' && isFinite(d.wd) && d.wd >= 0 && d.wd <= 6).map((d) => { if (!Array.isArray(d.items)) d.items = []; if (!SPLIT_NAME[d.kind]) d.kind = 'custom'; return d; });
    } else if (t) plus.train = null;
  } catch (e) { plus.train = null; }
}

/* ---------------------------------------------------------------- الإطار */
const TABS = [
  ['me', 'ملفي', 'My profile'], ['journeys', 'الرحلات', 'Journeys'], ['events', 'الطلعات', 'Events'], ['today', 'سؤال اليوم', 'Daily check-in'],
  ['chal', 'تحديات', 'Challenges'], ['plan', 'خطتي', 'My plan'], ['lib', 'المكتبة', 'Library'], ['food', 'أكلي', 'My food'],
  ['recipes', 'وصفات', 'Recipes'], ['stretch', 'إطالة', 'Stretch'], ['circ', 'محطات وجروب', 'Circuits and group'], ['music', 'أغاني', 'Music'], ['rehab', 'تأهيلي', 'My rehab'],
  ['biomech', 'ميكانيكا', 'Mechanics'], ['search', 'بحث', 'Search']
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

export async function open(tab, arg) {
  const ov = ensureOverlay();
  ov.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr');
  ov.classList.remove('hidden');
  document.body.classList.add('ap-lock');
  $('#ap-body').innerHTML = '<div class="ap-load">' + esc(L('جاري التحميل...', 'Loading...')) + '</div>';
  await Promise.all([loadState(), loadExtras()]);
  if (tab === 'watch') { go('me'); setTimeout(() => { const e = $('#ap-php'); if (e) e.scrollIntoView({ block: 'center' }); }, 120); return; }
  if (tab === 'guest') { go(plus.profile || plus.skipProfile ? 'journeys' : 'me'); if (curTab === 'me') { sub.first = true; draw(); } return; }
  if (tab === 'bio') tab = 'biomech';
  if (tab === 'biolib') { go('biomech'); openBioLib(); return; }
  if (tab === 'circ' || tab === 'circuit' || tab === 'group') { go('circ'); const g = takeGrp(); if (g) { sub.join = g; draw(); } return; }
  const al = { tpl: ['lib', 'lt', 'tpl'], libex: ['lib', 'lt', 'ex'], progs: ['lib', 'lt', 'prog'], fast: ['food', 'ftab', 'fast'], nutri: ['plan', 'planTab', 'nutri'], challenges: ['chal'], chal: ['chal'], weekly: ['chal'] }[tab];
  if (al) { go(al[0]); if (al[1]) { sub[al[1]] = al[2]; draw(); } } else go(tab || curTab);
}
export async function openOwn() {
  await open('plan');
  if (!plus.train) plus.train = { params: { goal: 'fitness', days: 0, equip: 'gym' }, days: [], seed: 0, created: stamp(), custom: true };
  sub.planTab = 'train'; sub.editTrain = false; sub.manual = { wd: dayIdx(new Date()) }; draw();
}
export function close() { if (PL && !PL.min) { if (PL.finished) { stopPlayer(); } else PL.min = true; } dockRender(); const ov = document.getElementById('adam-plus'); if (ov) ov.classList.add('hidden'); document.body.classList.remove('ap-lock'); }

function go(tab) {
  if (PL && !PL.min) { if (PL.finished) { stopPlayer(); } else { PL.min = true; dockRender(); } }
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
  const fn = { music: viewMusic, me: viewMe, journeys: viewJourneys, events: viewEvents, today: viewToday, chal: viewChal, plan: viewPlan, lib: viewLib, food: viewFood, recipes: viewRecipes, stretch: viewStretch, circ: viewCirc, rehab: viewRehab, biomech: viewBio, search: viewSearch }[curTab];
  try { if (PL && !PL.min) viewPlayer(body); else { fn(body); if (curTab !== 'me') { const gb = guestBanner(); if (gb && body.firstElementChild) { body.insertAdjacentHTML('afterbegin', gb); wireGuest(body); } } } } catch (e) { body.innerHTML = '<div class="ap-empty">' + esc(L('حصلت مشكلة في عرض الشاشة', 'Something went wrong showing this screen')) + '</div>'; if (window.console) console.error(e); }
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
      day.items.forEach((it) => { if (it.blk) { h += '<div class="ap-ex"><span>' + esc(it.blk === 'warm' ? L('إحماء', 'Warm-up') : L('إطالة ختام', 'Cool-down')) + '</span></div>'; return; } const ex = EX_BY_ID[it.id]; if (!ex) return; h += '<button type="button" class="ap-ex' + (it.ss ? ' ap-ssl' : '') + '" data-ex="' + esc(it.id) + '"><span>' + (it.ss ? '+ ' : '') + esc(nameOf(ex.name)) + '</span><em>' + (it.ss ? esc(it.reps) : it.sets + ' × ' + esc(it.reps)) + '</em></button>'; });
      h += '<div class="ap-actions"><button type="button" class="ap-btn small" data-run="' + day.wd + '">' + esc(L('ابدأ التمرين', 'Start workout')) + '</button><button type="button" class="ap-btn small ghost" data-edit="' + day.wd + '">' + esc(L('رتّب وعدّل', 'Edit and reorder')) + '</button></div></div>';
    });
    h += '<div class="ap-actions"><button type="button" class="ap-btn small ghost" id="ap-manual">' + esc(L('عدّل الجدول بنفسك', 'Edit schedule yourself')) + '</button></div>';
    if (plus.train.params.goal === 'fat') h += '<div class="ap-note">' + esc(L('أضف 15 إلى 20 دقيقة كارديو خفيف بعد كل تمرين.', 'Add 15 to 20 minutes of easy cardio after each session.')) + '</div>';
    h += '<div class="ap-note">' + esc(L('ابدأ بأوزان تقدر تتحكم فيها، وزود تدريجيًا. لو عندك إصابة أو حالة صحية، استشر متخصص قبل ما تبدأ.', 'Start with weights you can control and progress gradually. If you have an injury or health condition, consult a specialist before starting.')) + '</div>';
    el.innerHTML = h;
    $('#ap-retrain', el).addEventListener('click', () => { sub.editTrain = true; draw(); });
    $('#ap-manual', el).addEventListener('click', () => { sub.manual = { wd: plus.train.days.length ? plus.train.days[0].wd : 0 }; draw(); });
    $$('[data-ex]', el).forEach((b) => b.addEventListener('click', () => openExercise(b.dataset.ex)));
    $$('[data-run]', el).forEach((b) => b.addEventListener('click', async () => { const day = plus.train.days.find((x) => x.wd === Number(b.dataset.run)); if (!day) return; await loadLib(); startDay(day.items, L(WEEKDAYS[day.wd][0], WEEKDAYS[day.wd][1]) + ' · ' + L(SPLIT_NAME[day.kind][0], SPLIT_NAME[day.kind][1]), { warm: cfg().warm }); }));
    $$('[data-edit]', el).forEach((b) => b.addEventListener('click', () => { sub.manual = { wd: Number(b.dataset.edit) }; draw(); }));
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
  const gsz = items.map(() => 1); { let st = 0; items.forEach((it, i) => { if (i > 0 && it.ss && !it.blk && !items[i - 1].blk) { gsz[st]++; } else st = i; }); }
  let gstart = -1;
  items.forEach((it, i) => {
    const ex = it.blk ? null : EX_BY_ID[it.id]; if (!it.blk && !ex) return;
    const linked = !!(it.ss && i > 0 && !it.blk && !items[i - 1].blk);
    if (!linked) gstart = i;
    const nm = it.blk ? (it.blk === 'warm' ? L('إحماء 5 دقايق', 'Warm-up (5 min)') : L('إطالة ختام', 'Cool-down stretch')) : nameOf(ex.name);
    if (!linked && gsz[i] > 1) h += '<div class="ap-ssh">' + esc(gsz[i] === 2 ? L('سوبر سيت', 'Superset') : L('جاينت سيت', 'Giant set')) + ' · ' + esc(L('الجولات من أول تمرين', 'rounds follow the first exercise')) + '</div>';
    const inG = linked || gsz[i] > 1;
    h += '<div class="ap-exrow ap-mrow' + (inG ? ' ap-ssl' : '') + '"><span class="ap-mord"><button type="button" data-mup="' + i + '" aria-label="up"' + (i === 0 ? ' disabled' : '') + '>&#8593;</button><button type="button" data-mdn="' + i + '" aria-label="down"' + (i === items.length - 1 ? ' disabled' : '') + '>&#8595;</button></span>' +
      '<span class="ap-exn" style="flex:1;min-width:0">' + esc(nm) + (!it.blk && i > 0 && !items[i - 1].blk ? '<button type="button" class="ap-lnk' + (linked ? ' on' : '') + '" data-mss="' + i + '">' + esc(linked ? L('مربوط بالسابق · فكّ', 'Linked · unlink') : L('اربطه بالسابق (سوبر سيت)', 'Link to previous (superset)')) + '</button>' : '') + '</span>' +
      (it.blk ? '' : (linked ? '' : '<input type="number" min="1" max="10" value="' + it.sets + '" data-ms="' + i + '" style="width:54px;margin:0;padding:8px" aria-label="sets"><span class="mu">×</span>') + '<input type="text" value="' + esc(it.reps) + '" data-mr="' + i + '" style="width:70px;margin:0;padding:8px" aria-label="reps">') +
      '<button type="button" class="ap-btn small danger" data-mdel="' + i + '" aria-label="delete">×</button></div>';
  });
  h += '</div>';
  h += '<div class="ap-sec"><b>' + esc(L('ضيف تمرين', 'Add an exercise')) + '</b></div>';
  h += '<label class="ap-q"><b>' + esc(L('مكان الإضافة', 'Insert position')) + '</b><select id="ap-mpos" class="ap-select"><option value="end">' + esc(L('في آخر اليوم', 'At the end')) + '</option><option value="start"' + (sub.mpos === 'start' ? ' selected' : '') + '>' + esc(L('في أول اليوم', 'At the start')) + '</option>' + items.map((it, i) => { const nm = it.blk ? (it.blk === 'warm' ? L('الإحماء', 'the warm-up') : L('الإطالة', 'the cool-down')) : (EX_BY_ID[it.id] ? nameOf(EX_BY_ID[it.id].name) : ''); return nm ? '<option value="b' + i + '"' + (sub.mpos === 'b' + i ? ' selected' : '') + '>' + esc(L('قبل: ', 'Before: ') + nm) + '</option>' : ''; }).join('') + '</select></label>';
  h += '<div class="ap-chips"><button type="button" id="ap-mwarm">+ ' + esc(L('إحماء', 'Warm-up')) + '</button><button type="button" id="ap-mcool">+ ' + esc(L('إطالة ختام', 'Cool-down')) + '</button></div>';
  h += '<input type="text" id="ap-msearch" placeholder="' + esc(L('ابحث عن تمرين...', 'Search exercises...')) + '"><div id="ap-mres"></div>';
  h += '<div class="ap-actions" style="margin-top:12px"><button type="button" class="ap-btn" id="ap-mrun">' + esc(L('ابدأ التمرين', 'Start workout')) + '</button></div>';
  h += '<div class="ap-row" style="margin-top:12px"><button type="button" class="ap-btn small danger" id="ap-mclear">' + esc(L('امسح اليوم ده', 'Clear this day')) + '</button></div>';
  el.innerHTML = h;
  const save = () => { plus.train.days = plus.train.days.filter((x) => x.items.length); persist(); };
  $('#ap-mdone', el).addEventListener('click', () => { sub.manual = null; save(); draw(); });
  $$('[data-mwd]', el).forEach((b) => b.addEventListener('click', () => { sub.manual.wd = Number(b.dataset.mwd); planManual(el); }));
  $$('[data-ms]', el).forEach((i) => i.addEventListener('change', () => { cur.items[Number(i.dataset.ms)].sets = Math.max(1, Math.min(10, Number(i.value) || 3)); persist(); }));
  $$('[data-mr]', el).forEach((i) => i.addEventListener('change', () => { cur.items[Number(i.dataset.mr)].reps = i.value || '10'; persist(); }));
  $$('[data-mdel]', el).forEach((b) => b.addEventListener('click', () => { const di = Number(b.dataset.mdel); cur.items.splice(di, 1); if (cur.items[di]) cur.items[di].ss = false; if (cur.items[0]) cur.items[0].ss = false; save(); planManual(el); }));
  $$('[data-mss]', el).forEach((b) => b.addEventListener('click', () => { const i = Number(b.dataset.mss); const it = cur.items[i]; if (!it || it.blk || !cur.items[i - 1] || cur.items[i - 1].blk) return; it.ss = !it.ss; persist(); planManual(el); }));
  $('#ap-mclear', el).addEventListener('click', () => { if (cur) { cur.items = []; save(); } planManual(el); });
  const posSel = $('#ap-mpos', el); if (posSel) posSel.addEventListener('change', () => { sub.mpos = posSel.value; });
  const insertAt = (item) => {
    let dd = dayOf(wd); if (!dd) { dd = { kind: 'custom', wd: wd, items: [] }; plus.train.days.push(dd); plus.train.days.sort((a, b2) => a.wd - b2.wd); }
    const pv = (posSel && posSel.value) || 'end'; let at = dd.items.length;
    if (pv === 'start') at = 0; else if (pv.charAt(0) === 'b') at = Math.min(dd.items.length, Number(pv.slice(1)));
    dd.items.splice(at, 0, item); if (dd.items[at + 1]) dd.items[at + 1].ss = false; if (dd.items[0]) dd.items[0].ss = false; sub.mpos = 'end'; persist(); planManual(el);
  };
  $$('[data-mup]', el).forEach((b) => b.addEventListener('click', () => { const i = Number(b.dataset.mup); if (i > 0) { const t = cur.items[i]; cur.items[i] = cur.items[i - 1]; cur.items[i - 1] = t; [i - 1, i, i + 1].forEach((k) => { if (cur.items[k]) cur.items[k].ss = false; }); persist(); planManual(el); } }));
  $$('[data-mdn]', el).forEach((b) => b.addEventListener('click', () => { const i = Number(b.dataset.mdn); if (i < cur.items.length - 1) { const t = cur.items[i]; cur.items[i] = cur.items[i + 1]; cur.items[i + 1] = t; [i, i + 1, i + 2].forEach((k) => { if (cur.items[k]) cur.items[k].ss = false; }); persist(); planManual(el); } }));
  $('#ap-mwarm', el).addEventListener('click', () => insertAt({ blk: 'warm' }));
  $('#ap-mcool', el).addEventListener('click', () => insertAt({ blk: 'cool' }));
  $('#ap-mrun', el).addEventListener('click', async () => { if (!cur || !cur.items.length) { toast(L('اليوم ده فاضي', 'This day is empty')); return; } await loadLib(); startDay(cur.items, L(WEEKDAYS[wd][0], WEEKDAYS[wd][1]), { warm: cfg().warm }); });
  const res = $('#ap-mres', el), q = $('#ap-msearch', el);
  const paint = () => {
    const k = q.value.trim().toLowerCase();
    let list = exAll.filter((e) => e.category === 'strength' || !e.category);
    if (k) list = exAll.filter((e) => (String(e.name && e.name.ar || '') + ' ' + String(e.name && e.name.en || '')).toLowerCase().indexOf(k) !== -1);
    list = list.slice(0, 30);
    res.innerHTML = list.map((e) => '<button type="button" class="ap-ex" data-madd="' + esc(e.id) + '"><span>' + esc(nameOf(e.name)) + '</span><em>+ ' + esc(L('ضيف', 'Add')) + '</em></button>').join('') || '<div class="ap-note">' + esc(L('مفيش نتيجة', 'No results')) + '</div>';
    $$('[data-madd]', res).forEach((b) => b.addEventListener('click', () => {
      const dd = dayOf(wd);
      if (dd && dd.items.some((x) => x.id === b.dataset.madd)) { toast(L('التمرين ده موجود في اليوم', 'Already in this day')); return; }
      insertAt({ id: b.dataset.madd, sets: 3, reps: '10' });
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
  const pf = plus.profile; const d = sub.nd || (n && n.params) || (pf ? { sex: pf.sex, age: pf.age, weight: pf.weight, height: pf.height, act: pf.act, goal: pf.goal, pref: '' } : { sex: 'm', age: 28, weight: 80, height: 175, act: 1.375, goal: 'lose', pref: '' });
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
  const mc = n.meals || 0;
  h += '<div class="ap-q"><b>' + esc(L('عدد الوجبات في اليوم', 'Meals per day')) + '</b>' + chips([[0, L('زي الخطة', 'As planned')], [3, '3'], [2, '2'], [1, '1']], mc, 'nm') + (mc === 2 ? '<div class="ap-note">' + esc(L('وجبتين في اليوم مناسبين لنظام الصيام المتقطع (نافذة أكل حوالي 8 ساعات). السعرات بتفضل زي ما هي.', 'Two meals a day suit intermittent fasting (an eating window of about 8 hours). Total calories stay the same.')) + ' <button type="button" class="ap-btn small ghost" id="ap-tofast">' + esc(L('تايمر الصيام', 'Fasting timer')) + '</button></div>' : '') + (mc === 1 ? '<div class="ap-warn">' + esc(L('وجبة واحدة في اليوم صعبة على ناس كتير وممكن تقلل البروتين والطاقة. استشر أخصائي تغذية لو عندك حالة صحية أو بتتمرن بكثافة.', 'One meal a day is hard for many people and can lower protein and energy. Consult a dietitian if you have a health condition or train hard.')) + '</div>' : '') + '</div>';
  mealGroups(day, mc).forEach((g) => {
    const items = g.items || []; if (!items.length) return;
    const mt = dayTotals({ x: items }, f);
    h += '<div class="ap-card"><div class="ap-row"><b>' + esc(g.name) + '</b><span class="mu">' + Math.round(mt.kcal) + ' ' + esc(L('سعرة', 'kcal')) + '</span></div>' + items.map((it) => { const fd = FOOD_BY_ID[it.id]; return '<div class="ap-food"><span>' + esc(fd ? nameOf(fd) : it.id) + '</span><em>' + r5(it.g * f) + ' ' + esc(L('جم', 'g')) + '</em></div>'; }).join('') + '</div>';
  });
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-grocery">' + esc(L('قايمة المشتريات', 'Grocery list')) + '</button></div>';
  h += '<div class="ap-note">' + esc(L('خطة إرشادية للّياقة العامة. لو عندك حالة صحية أو حساسية، استشر أخصائي تغذية.', 'A guideline plan for general fitness. If you have a health condition or allergy, consult a dietitian.')) + '</div>';
  el.innerHTML = h;
  $('#ap-renutri', el).addEventListener('click', () => { sub.editNutri = true; draw(); });
  $$('[data-nd]', el).forEach((b) => b.addEventListener('click', () => { sub.nday = Number(b.dataset.nd); showNutri(el); }));
  $$('[data-nm]', el).forEach((b) => b.addEventListener('click', () => { plus.nutri.meals = Number(b.dataset.nm); persist(); showNutri(el); }));
  const tf = $('#ap-tofast', el); if (tf) tf.addEventListener('click', () => { go('food'); sub.ftab = 'fast'; draw(); });
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
/* مرادفات: اللي يكتب كلمة منهم يلاقي الباقي (دجاج = فراخ ...) */
const FOOD_SYN = [
  ['دجاج', 'فراخ', 'فرخه', 'chicken'], ['لحم', 'لحمه', 'بقري', 'كندوز', 'beef', 'meat'], ['ضاني', 'خروف', 'lamb'],
  ['رز', 'ارز', 'rice'], ['عيش', 'خبز', 'رغيف', 'bread'], ['بيض', 'بيضه', 'egg'], ['سمك', 'fish'], ['جمبري', 'جمبري', 'روبيان', 'shrimp'],
  ['لبن', 'حليب', 'milk'], ['زبادي', 'روب', 'yogurt'], ['جبنه', 'جبن', 'cheese'], ['بطاطس', 'بطاطا', 'potato'], ['مكرونه', 'باستا', 'معكرونه', 'pasta'],
  ['شوفان', 'oats'], ['فول', 'fava'], ['عدس', 'lentil'], ['تونه', 'tuna'], ['زيت', 'oil'], ['سمن', 'زبده', 'butter'], ['عسل', 'honey'], ['سكر', 'sugar'],
  ['موز', 'banana'], ['تفاح', 'apple'], ['برتقال', 'orange'], ['طماطم', 'قوطه', 'tomato'], ['خيار', 'cucumber'], ['كبده', 'liver'], ['فول سوداني', 'سوداني', 'peanut']
].map((g) => g.map(normAr));
function matchFoods(q, limit) {
  const nq = normAr(q); if (!nq) return [];
  const words = nq.split(' ').filter((w) => w.length >= 2 && !/^\d+$/.test(w));
  const extra = [];
  words.forEach((w) => FOOD_SYN.forEach((g) => { if (g.some((x) => x === w || (w.length >= 3 && x.indexOf(w) === 0))) g.forEach((x) => { if (x !== w && extra.indexOf(x) === -1) extra.push(x); }); }));
  const res = [];
  foodsAll.forEach((f) => {
    const names = [normAr(f.ar), normAr(f.en)];
    let sc = 0;
    names.forEach((nm) => {
      const parts = nm.split(' ');
      if (nm.indexOf(nq) !== -1) sc += 6;
      words.forEach((w) => { if (w.length >= 3 && parts.some((x) => x === w || (w.length >= 4 && x.indexOf(w) === 0))) sc += 2; });
      extra.forEach((w) => { if (w.length >= 3 && parts.some((x) => x === w || (w.length >= 4 && x.indexOf(w) === 0))) sc += 1; });
    });
    if (sc > 0) res.push([sc, f]);
  });
  res.sort((a, b) => b[0] - a[0]);
  return res.slice(0, limit || 30).map((x) => x[1]);
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
  h += '<div class="ap-goalbox"><input id="ap-fq" type="text" placeholder="' + esc(L('دوّر في القايمة (مثلاً: فراخ، رز، تفاح)', 'Search the list (e.g. chicken, rice, apple)')) + '" autocomplete="off">' + (SR_API ? '<button type="button" id="ap-mic" class="ap-mic" aria-label="mic"></button>' : '') + '</div>' + chips([['all', L('الكل', 'All')]].concat(Object.keys(FOOD_CATEGORIES).map((k) => [k, nameOf(FOOD_CATEGORIES[k])])), sub.fcat || 'all', 'fcat') + '<div id="ap-fres"></div>';
  h += '<div class="ap-sec"><b>' + esc(L('اللي أكلته النهاردة', 'Eaten today')) + '</b></div>';
  h += list.length ? '<div class="ap-card">' + list.map((x, i) => '<div class="ap-food"><span>' + esc(x.name) + ' · ' + x.g + esc(L(' جم', ' g')) + '</span><em>' + Math.round(x.kcal) + '</em><button type="button" class="ap-del" data-fd="' + i + '" aria-label="delete"></button></div>').join('') + '</div>' : '<div class="ap-empty small">' + esc(L('لسه ماسجلتش حاجة النهاردة.', 'Nothing logged today yet.')) + '</div>';
  h += '<div class="ap-note">' + esc(L('التسجيل هنا شخصي ومستقل عن سجل التغذية الأساسي.', 'This log is personal and separate from the main nutrition log.')) + '</div>';
  el.innerHTML = h;
  const run = () => {
    const q = $('#ap-fq', el).value; const cat = sub.fcat || 'all';
    let found = q.trim() ? matchFoods(q, 60) : foodsAll.slice();
    if (cat !== 'all') found = found.filter((f) => f.cat === cat);
    found = found.slice(0, 60);
    const out = $('#ap-fres', el);
    if (!found.length) { out.innerHTML = '<div class="ap-empty small">' + esc(L('مالقيتش. جرب اسم تاني أو اختار "الكل".', 'Not found. Try another name or pick "All".')) + '</div>'; return; }
    out.innerHTML = '<div class="ap-card" style="max-height:320px;overflow:auto">' + found.map((f, i) => '<div class="ap-food"><span>' + esc(nameOf(f)) + ' <small>' + Math.round(f.c) + esc(L(' سعرة/100جم', ' kcal/100g')) + '</small></span><input type="number" min="5" max="2000" value="' + guessGrams(q, f) + '" data-gi="' + i + '" class="ap-g"><button type="button" class="ap-btn small" data-add="' + i + '">+</button></div>').join('') + '</div>';
    $$('[data-add]', out).forEach((b) => b.addEventListener('click', () => {
      const f = found[Number(b.dataset.add)]; const g = Number($('[data-gi="' + b.dataset.add + '"]', out).value) || 100; const n = foodNutr(f.id, g);
      foodToday().push({ id: f.id, name: nameOf(f), g: g, kcal: n.kcal, p: n.p }); persist(); logView(el);
    }));
  };
  $$('[data-fcat]', el).forEach((b) => b.addEventListener('click', () => { sub.fcat = b.dataset.fcat; $$('[data-fcat]', el).forEach((x) => x.classList.toggle('on', x === b)); run(); }));
  $('#ap-fq', el).addEventListener('input', run);
  run();
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


/* ================================================================ تحديات الـ30 يوم */
const CH_BY_ID = {}; CHALLENGES.forEach((c) => { CH_BY_ID[c.id] = c; });
const UNIT_L = { sec: ['ثانية', 'sec'], reps: ['تكرار', 'reps'], jumps: ['نطة', 'jumps'], steps: ['خطوة', 'steps'] };
const noRestOf = (c) => !!(c.noRest || c.stretch);
const isRestDay = (c, d) => !noRestOf(c) && d % 7 === 0 && d < 30;
function chTarget(c, d) {
  if (c.routine || isRestDay(c, d)) return 0;
  const raw = c.from + (c.to - c.from) * (d - 1) / 29;
  return Math.min(c.to, Math.max(c.from, Math.round(raw / c.step) * c.step));
}
function chFmt(c, n) {
  if (c.unit === 'sec') return n >= 60 ? Math.floor(n / 60) + ':' + String(n % 60).padStart(2, '0') + ' ' + L('دقيقة', 'min') : n + ' ' + L('ثانية', 'sec');
  const u = UNIT_L[c.unit]; return Number(n).toLocaleString(lang() === 'en' ? 'en-US' : 'en-US') + ' ' + (u ? L(u[0], u[1]) : '');
}
function tenRoutine(c, d) {
  const idx = Math.max(0, d - 1 - Math.floor((d - 1) / 7));
  return TENMIN[idx % TENMIN.length];
}
function chDay(st) { return Math.max(1, daysBetween(st.start, stamp()) + 1); }
function chStats(c, st) {
  const day = chDay(st); const last = Math.min(30, day);
  let active = 0, done = 0, streak = 0, broke = false;
  for (let d = 1; d <= 30; d++) { if (isRestDay(c, d)) continue; active++; if (st.done && st.done[d]) done++; }
  for (let d = last; d >= 1; d--) {
    if (isRestDay(c, d)) continue;
    if (st.done && st.done[d]) { if (!broke) streak++; } else if (d === day) { /* النهاردة لسه */ } else broke = true;
  }
  return { day: day, active: active, done: done, pct: Math.round(done / active * 100), streak: streak, over: day > 30, complete: done >= active };
}
function weekStart() { const d = new Date(); return addDays(stamp(), -dayIdx(d)); }
function ensureWeek() {
  const key = weekStart();
  if (plus.weekly && plus.weekly.key === key) return plus.weekly;
  if (plus.weekly) { const pw = WEEKLY.find((w) => w.id === plus.weekly.id); if (pw && plus.weekly.val >= pw.goal) plus.weeksDone = (plus.weeksDone || 0) + 1; }
  const idx = Math.floor(daysBetween('2024-01-06', key) / 7);
  const w = WEEKLY[((idx % WEEKLY.length) + WEEKLY.length) % WEEKLY.length];
  plus.weekly = { key: key, id: w.id, val: 0, days: {}, log: [] };
  persist(); return plus.weekly;
}
function weeklyCard() {
  const wk = ensureWeek(); const w = WEEKLY.find((x) => x.id === wk.id);
  const val = w.kind === 'days' ? Object.keys(wk.days || {}).length : wk.val;
  const pct = Math.min(100, Math.round(val / w.goal * 100));
  const done = val >= w.goal;
  let h = '<div class="ap-card ap-week"><div class="ap-row"><b>' + esc(L('تحدي الأسبوع', 'This week\'s challenge')) + '</b>' + (done ? '<span class="ap-ok">' + esc(L('خلص', 'Done')) + '</span>' : '<span class="mu">' + esc(L('بيتجدد كل سبت', 'Renews every Saturday')) + '</span>') + '</div>';
  h += '<div class="ap-wtitle">' + esc(L(w.ar, w.en)) + '</div><div class="ap-bar"><i style="width:' + pct + '%"></i></div><small class="mu">' + Number(val).toLocaleString('en-US') + ' / ' + Number(w.goal).toLocaleString('en-US') + ' ' + esc(L(w.unit.ar, w.unit.en)) + '</small>';
  if (w.kind === 'sum') h += '<div class="ap-chips">' + w.quick.map((q) => '<button type="button" data-wadd="' + q + '">+' + q.toLocaleString('en-US') + '</button>').join('') + '<button type="button" data-wundo="1" class="ghost">' + esc(L('تراجع', 'Undo')) + '</button></div>';
  else h += '<div class="ap-chips"><button type="button" data-wday="1" class="' + (wk.days[stamp()] ? 'on' : '') + '">' + esc(wk.days[stamp()] ? L('النهاردة تمّ', 'Done today') : L('سجّل النهاردة', 'Log today')) + '</button></div>';
  if (plus.weeksDone) h += '<small class="mu">' + esc(L('أسابيع خلصتها: ', 'Weeks completed: ') + plus.weeksDone) + '</small>';
  return h + '</div>';
}
function chShare(c) {
  const text = L('تعالى نعمل ' + c.ar + ' 30 يوم سوا على تطبيق ADAM: adamxfit.com', 'Join me for the ' + c.en + ' (30 days) on ADAM: adamxfit.com');
  try { if (navigator.share) navigator.share({ title: 'ADAM', text: text }).catch(() => {}); else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast(L('اتنسخت الدعوة', 'Invite copied'))); } catch (e) { /* ألغى */ }
}
function chCard(c, st) {
  const s = st ? chStats(c, st) : null;
  return '<button type="button" class="ap-jc" data-c="' + c.id + '" style="background:linear-gradient(150deg,' + c.color + ',#0a1013 82%)"><span class="ap-big">' + esc(c.big) + '</span><b>' + esc(L(c.ar, c.en)) + '</b><small>' + esc(pick(c.sub)) + '</small><span class="ap-meta"><i>' + esc(L('30 يوم', '30 days')) + '</i>' + (s ? '<i class="hot">' + esc(s.complete ? L('اكتمل', 'Completed') : L('اليوم ', 'Day ') + Math.min(30, s.day)) + '</i>' : '') + '</span>' + (s ? '<span class="ap-bar" style="margin-top:10px"><i style="width:' + s.pct + '%"></i></span>' : '') + '</button>';
}
function viewChal(body) {
  if (sub.openC) return viewChalDetail(body, CH_BY_ID[sub.openC]);
  let h = weeklyCard();
  const mine = CHALLENGES.filter((c) => plus.chals[c.id]);
  if (mine.length) h += '<div class="ap-sec"><b>' + esc(L('تحدياتي', 'My challenges')) + '</b></div><div class="ap-list">' + mine.map((c) => chCard(c, plus.chals[c.id])).join('') + '</div>';
  h += '<div class="ap-sec"><b>' + esc(L('تحديات 30 يوم', '30-day challenges')) + '</b></div><div class="ap-list">' + CHALLENGES.filter((c) => !plus.chals[c.id]).map((c) => chCard(c, null)).join('') + '</div>';
  h += '<div class="ap-note">' + esc(L('الأرقام إرشادية للّياقة العامة. اسمع جسمك ولو حسيت بوجع وقف. تقدر تبعت دعوة لصحابك من جوه كل تحدي.', 'Targets are guidelines for general fitness. Listen to your body and stop if you feel pain. You can send an invite to friends from inside each challenge.')) + '</div>';
  body.innerHTML = h;
  $$('[data-c]', body).forEach((b) => b.addEventListener('click', () => { sub.openC = b.dataset.c; draw(); }));
  $$('[data-wadd]', body).forEach((b) => b.addEventListener('click', () => { const wk = ensureWeek(); const n = Number(b.dataset.wadd); wk.val += n; wk.log = wk.log || []; wk.log.push(n); persist(); draw(); }));
  $$('[data-wundo]', body).forEach((b) => b.addEventListener('click', () => { const wk = ensureWeek(); const n = (wk.log || []).pop(); if (n) { wk.val = Math.max(0, wk.val - n); persist(); draw(); } }));
  $$('[data-wday]', body).forEach((b) => b.addEventListener('click', () => { const wk = ensureWeek(); if (wk.days[stamp()]) delete wk.days[stamp()]; else wk.days[stamp()] = 1; persist(); draw(); }));
}
function markChalDay(id, d, on) {
  const st = plus.chals[id]; if (!st) return;
  st.done = st.done || {};
  if (on === false) delete st.done[d]; else st.done[d] = 1;
  const c = CH_BY_ID[id]; const s = chStats(c, st);
  if (s.complete && !st.completed) { st.completed = stamp(); plus.chalDone = (plus.chalDone || 0) + 1; toast(L('مبروك! خلصت التحدي كله.', 'Congratulations! You finished the whole challenge.')); }
  persist();
}
function viewChalDetail(body, c) {
  if (!c) { sub.openC = ''; return viewChal(body); }
  const st = plus.chals[c.id]; const nm = L(c.ar, c.en);
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button>';
  h += '<div class="ap-hero" style="background:linear-gradient(150deg,' + c.color + ',#0a1013 85%)"><span class="ap-big">' + esc(c.big) + '</span><h2>' + esc(nm) + '</h2><p>' + esc(pick(c.sub)) + '</p></div>';
  if (!st) {
    h += '<div class="ap-card"><p class="ap-p">' + esc(pick(c.tip)) + '</p></div>';
    if (!c.routine) {
      h += '<div class="ap-sec"><b>' + esc(L('الهدف اليومي', 'Daily target')) + '</b></div><div class="ap-card ap-trow">' + [1, 8, 15, 22, 30].map((d) => '<div><small>' + esc(L('يوم ', 'Day ') + d) + '</small><b>' + esc(chFmt(c, chTarget(c, d))) + '</b></div>').join('') + '</div>';
    } else h += '<div class="ap-card"><p class="ap-p">' + esc(c.stretch ? L('كل يوم روتين إطالة بتايمر بيرشدك حركة حركة.', 'Each day a guided stretching routine with a timer.') : L('كل يوم تمرين 10 دقايق مختلف (جسم كامل، بطن، رجلين، جزء علوي، كارديو، مرونة).', 'Each day a different 10-minute workout (full body, abs, legs, upper body, cardio, mobility).')) + '</p></div>';
    h += '<div class="ap-note">' + esc(L('فيه يوم راحة كل أسبوع. لو فاتك يوم تقدر تسجله بعدين.', 'There is a rest day every week. If you miss a day you can log it later.')) + '</div>';
    h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-cstart">' + esc(L('ابدأ التحدي', 'Start challenge')) + '</button><button type="button" class="ap-btn ghost" id="ap-cshare">' + esc(L('ابعت دعوة لصاحبك', 'Invite a friend')) + '</button></div>';
    body.innerHTML = h;
    $('#ap-back', body).addEventListener('click', () => { sub.openC = ''; draw(); });
    $('#ap-cstart', body).addEventListener('click', () => { plus.chals[c.id] = { start: stamp(), done: {} }; persist(); draw(); });
    $('#ap-cshare', body).addEventListener('click', () => chShare(c));
    return;
  }
  const s = chStats(c, st); const d = Math.min(30, s.day);
  const rest = isRestDay(c, d); const doneToday = !!(st.done && st.done[d]);
  if (s.over && !s.complete) h += '<div class="ap-warn">' + esc(L('الـ30 يوم خلصوا. سجّلت ' + s.done + ' من ' + s.active + ' يوم. تقدر تبدأ من جديد.', 'The 30 days are over. You logged ' + s.done + ' of ' + s.active + ' days. You can start again.')) + '</div>';
  if (s.complete) h += '<div class="ap-card ap-win"><b>' + esc(L('اكتمل التحدي', 'Challenge completed')) + '</b><small class="mu">' + esc(L('أحسنت. دي حاجة تستاهل تفتخر بيها.', 'Well done. That is something to be proud of.')) + '</small></div>';
  h += '<div class="ap-card ap-today"><div class="ap-row"><b>' + esc(L('اليوم ', 'Day ') + d + L(' من 30', ' of 30')) + '</b><span class="mu">' + esc(L('سلسلتك: ', 'Streak: ') + s.streak) + '</span></div>';
  if (rest) h += '<div class="ap-bigt">' + esc(L('يوم راحة', 'Rest day')) + '</div><small class="mu">' + esc(L('العضلات بتتبني وانت مرتاح. اتحرك خفيف لو حبيت.', 'Muscles grow while you rest. Light movement is fine.')) + '</small>';
  else if (c.routine) {
    const rt = c.stretch ? ALL_ROUTINES[0] : tenRoutine(c, d);
    h += '<div class="ap-bigt">' + esc(c.stretch ? L(rt.ar, rt.en) : nameOf(rt)) + '</div><small class="mu">' + esc(c.stretch ? pick(rt.sub) : L('10 دقايق · 5 حركات · جولتين', '10 minutes · 5 moves · 2 rounds')) + '</small>';
    if (!c.stretch) h += '<div class="ap-mv">' + rt.moves.map((m, i) => '<span>' + (i + 1) + '. ' + esc(nameOf(m)) + '</span>').join('') + '</div>';
    h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-cplay">' + esc(L('ابدأ بالتايمر', 'Start with timer')) + '</button></div>';
  } else h += '<div class="ap-bigt">' + esc(chFmt(c, chTarget(c, d))) + '</div><small class="mu">' + esc(pick(c.tip)) + '</small>';
  if (!rest) h += '<div class="ap-actions"><button type="button" class="ap-btn' + (doneToday ? ' ghost' : '') + '" id="ap-cdone">' + esc(doneToday ? L('تمّ النهاردة (إلغاء)', 'Done today (undo)') : L('خلّصت النهاردة', 'Mark today done')) + '</button></div>';
  h += '</div>';
  h += '<div class="ap-card"><div class="ap-row"><b>' + esc(L('تقدمك', 'Your progress')) + '</b><span>' + s.pct + '%</span></div><div class="ap-bar"><i style="width:' + s.pct + '%"></i></div><div class="ap-cgrid">';
  for (let k = 1; k <= 30; k++) {
    const r = isRestDay(c, k), dn = !!(st.done && st.done[k]); const cls = (dn ? 'dn ' : '') + (r ? 'rs ' : '') + (k === s.day ? 'td ' : '') + (k > s.day ? 'fu' : '');
    h += '<button type="button" class="' + cls + '" data-cd="' + k + '"' + (r || k > s.day ? ' disabled' : '') + '>' + k + '</button>';
  }
  h += '</div><small class="mu">' + esc(L('اضغط على أي يوم فات لتسجيله أو إلغائه.', 'Tap a past day to log or undo it.')) + '</small></div>';
  h += '<div class="ap-card"><p class="ap-p">' + esc(pick(c.tip)) + '</p></div>';
  h += '<div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-cshare">' + esc(L('ابعت دعوة لصاحبك', 'Invite a friend')) + '</button>' + (s.over ? '<button type="button" class="ap-btn" id="ap-crestart">' + esc(L('ابدأ من جديد', 'Start again')) + '</button>' : '') + '<button type="button" class="ap-btn danger" id="ap-cquit">' + esc(L('سيب التحدي', 'Leave challenge')) + '</button></div>';
  body.innerHTML = h;
  $('#ap-back', body).addEventListener('click', () => { sub.openC = ''; draw(); });
  const dn = $('#ap-cdone', body); if (dn) dn.addEventListener('click', () => { markChalDay(c.id, d, !doneToday); draw(); });
  $$('[data-cd]', body).forEach((b) => b.addEventListener('click', () => { const k = Number(b.dataset.cd); markChalDay(c.id, k, !(st.done && st.done[k])); draw(); }));
  const pl = $('#ap-cplay', body);
  if (pl) pl.addEventListener('click', async () => {
    await loadLib();
    if (c.stretch) startPlayer(stretchSteps(ALL_ROUTINES[0]), { title: L(ALL_ROUTINES[0].ar, ALL_ROUTINES[0].en), done: () => { markStretchDone(); } });
    else { const rt = tenRoutine(c, d); startPlayer(tenSteps(rt), { title: nameOf(rt), done: () => markChalDay(c.id, d, true) }); }
  });
  $('#ap-cshare', body).addEventListener('click', () => chShare(c));
  const rs = $('#ap-crestart', body); if (rs) rs.addEventListener('click', () => { plus.chals[c.id] = { start: stamp(), done: {} }; persist(); draw(); });
  $('#ap-cquit', body).addEventListener('click', () => { if (window.confirm(L('تسيب التحدي ده؟', 'Leave this challenge?'))) { delete plus.chals[c.id]; persist(); sub.openC = ''; draw(); } });
}

/* ================================================================ مشغّل التايمر (إطالة + 10 دقايق) */
let playT = null, wakeLock = null, actx = null;
function libThumb(id) { if (!id || !libEx) return ''; const e = libEx.find((x) => x.id === id); return e && e.m ? 'media/' + e.m + '.svg' : ''; }
function stretchSteps(rt) {
  const out = []; const hold = rt.hold || 40;
  rt.moves.forEach((k, i) => {
    const m = ALL_MOVES[k]; const nm = nameOf(m); const img = libThumb(m.lib);
    out.push({ kind: 'rest', dur: i === 0 ? 10 : 5, name: nm, label: L('استعد', 'Get ready'), cue: pick(m.cue), img: img });
    if (m.sides) {
      out.push({ kind: 'work', dur: Math.round(hold / 2), name: nm, label: L('الجنب اليمين', 'Right side'), cue: pick(m.cue), img: img });
      out.push({ kind: 'rest', dur: 3, name: nm, label: L('بدّل الجنب', 'Switch sides'), cue: '', img: img });
      out.push({ kind: 'work', dur: Math.round(hold / 2), name: nm, label: L('الجنب الشمال', 'Left side'), cue: pick(m.cue), img: img });
    } else out.push({ kind: 'work', dur: hold, name: nm, label: pick(m.area), cue: pick(m.cue), img: img });
  });
  return out;
}
function tenSteps(rt) {
  const out = [{ kind: 'rest', dur: 10, name: nameOf(rt.moves[0]), label: L('استعد', 'Get ready'), cue: pick(rt.moves[0].cue) }];
  for (let r = 0; r < 2; r++) rt.moves.forEach((m, i) => {
    out.push({ kind: 'work', dur: 40, name: nameOf(m), label: L('الجولة ', 'Round ') + (r + 1), cue: pick(m.cue) });
    const last = r === 1 && i === rt.moves.length - 1;
    if (!last) { const nx = rt.moves[(i + 1) % rt.moves.length]; out.push({ kind: 'rest', dur: 20, name: nameOf(nx), label: L('راحة، الجاي:', 'Rest, next:'), cue: '' }); }
  });
  return out;
}
function markStretchDone() {
  plus.stretch = plus.stretch || { days: {} }; plus.stretch.days[stamp()] = 1;
  const st = plus.chals['stretch30']; if (st) { const d = chDay(st); if (d <= 30) markChalDay('stretch30', d, true); }
  const wk = ensureWeek(); if (wk.id === 'w_stretch') wk.days[stamp()] = 1;
  persist();
}
/* ---------- صوت + اهتزاز + صوت التشجيع ---------- */
const SET_DEF = { snd: 'chime', vib: true, rest: 60, warm: false };
const cfg = () => Object.assign({}, SET_DEF, plus.set || {});
function tone(f, ms, when) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = actx.currentTime + (when || 0); const o = actx.createOscillator(), g = actx.createGain();
    o.frequency.value = f; g.gain.value = 0.08; o.connect(g); g.connect(actx.destination); o.start(t0); o.stop(t0 + ms / 1000);
  } catch (e) { /* مفيش صوت */ }
}
function speak(text) {
  try {
    if (!window.speechSynthesis || !text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.lang = lang() === 'en' ? 'en-US' : 'ar-EG'; u.rate = 1.05; window.speechSynthesis.speak(u);
  } catch (e) { /* تجاهل */ }
}
function buzz(p) { try { if (cfg().vib && navigator.vibrate) navigator.vibrate(p); } catch (e) { /* تجاهل */ } }
function cue(kind) {
  const s = cfg();
  if (s.snd !== 'off') {
    if (kind === 'tick') tone(660, 90);
    else if (kind === 'work') { tone(880, 160); if (s.snd === 'voice') speak(L('ابدأ', 'Go')); }
    else if (kind === 'rest') { tone(520, 160); if (s.snd === 'voice') speak(L('راحة', 'Rest')); }
    else if (kind === 'set') tone(740, 120);
    else if (kind === 'done') { tone(660, 140); tone(880, 140, 0.16); tone(1100, 260, 0.32); if (s.snd === 'voice') setTimeout(() => speak(L('أحسنت', 'Nice work')), 650); }
  }
  if (kind === 'done') buzz([200, 100, 200, 100, 300]); else if (kind !== 'tick') buzz(60);
}

/* ---------- ساعة / حزام نبض بالبلوتوث (Web Bluetooth) ---------- */
const hr = { on: false, name: '', bpm: 0, max: 0, sum: 0, n: 0, dev: null };
const hrOk = () => !!(navigator.bluetooth && navigator.bluetooth.requestDevice);
async function connectHR() {
  if (!hrOk()) { toast(L('المتصفح ده مش بيدعم البلوتوث. استخدم Chrome على أندرويد أو الكمبيوتر.', 'This browser does not support Bluetooth. Use Chrome on Android or desktop.')); return false; }
  try {
    const dev = await navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] });
    const srv = await dev.gatt.connect();
    const svc = await srv.getPrimaryService('heart_rate');
    const ch = await svc.getCharacteristic('heart_rate_measurement');
    await ch.startNotifications();
    ch.addEventListener('characteristicvaluechanged', (e) => {
      const v = e.target.value; const bpm = (v.getUint8(0) & 1) ? v.getUint16(1, true) : v.getUint8(1);
      if (!bpm) return;
      hr.bpm = bpm; hr.max = Math.max(hr.max, bpm); hr.sum += bpm; hr.n++;
      const el = document.getElementById('ap-php'); if (el) el.innerHTML = hrHtml();
      const el2 = document.getElementById('ap-hrnow'); if (el2) el2.textContent = bpm;
    });
    dev.addEventListener('gattserverdisconnected', () => { hr.on = false; hr.bpm = 0; const el = document.getElementById('ap-php'); if (el) el.innerHTML = hrHtml(); toast(L('الساعة اتفصلت', 'Watch disconnected')); });
    hr.dev = dev; hr.on = true; hr.name = dev.name || ''; hr.max = 0; hr.sum = 0; hr.n = 0;
    toast(L('اتوصّلت: ', 'Connected: ') + (dev.name || ''));
    return true;
  } catch (e) {
    if (!e || e.name !== 'NotFoundError') toast(L('معرفتش أوصّل. اتأكد إن الساعة بتبث النبض.', 'Could not connect. Make sure the watch is broadcasting heart rate.'));
    return false;
  }
}
function disconnectHR() { try { if (hr.dev && hr.dev.gatt.connected) hr.dev.gatt.disconnect(); } catch (e) { /* تجاهل */ } hr.on = false; hr.bpm = 0; }
function hrMaxEst() { const a = (plus.profile && Number(plus.profile.age)) || (plus.nutri && plus.nutri.params && Number(plus.nutri.params.age)) || 30; return 220 - a; }
function hrZone(b) { const p = b / hrMaxEst(); return p < 0.6 ? [L('خفيف', 'Light'), '#6ec1ff'] : p < 0.7 ? [L('حرق دهون', 'Fat burn'), '#3ef0b0'] : p < 0.8 ? [L('لياقة', 'Aerobic'), '#ffd166'] : p < 0.9 ? [L('شدة عالية', 'Hard'), '#ffab5c'] : [L('أقصى', 'Max'), '#ff6b78']; }
function hrHtml() {
  if (!hr.on) return '<button type="button" class="ap-chip" id="ap-phr">' + esc(L('وصّل الساعة', 'Connect watch')) + '</button>';
  const z = hrZone(hr.bpm || 0);
  return '<span class="ap-hrb"><i style="background:' + z[1] + '"></i><b>' + (hr.bpm || '--') + '</b><small>' + esc(L('نبضة/د', 'bpm')) + (hr.bpm ? ' · ' + esc(z[0]) : '') + '</small></span>';
}

/* ---------- تحضير جلسة تمرين من يوم في الجدول ---------- */
function warmSteps() {
  const rt = TENMIN.find((r) => r.id === 'flow') || TENMIN[0];
  const out = [{ kind: 'rest', dur: 5, name: nameOf(rt.moves[0]), label: L('إحماء', 'Warm-up'), cue: pick(rt.moves[0].cue) }];
  rt.moves.forEach((m, i) => out.push({ kind: 'work', dur: 35, name: nameOf(m), label: L('إحماء', 'Warm-up') + ' ' + (i + 1) + '/' + rt.moves.length, cue: pick(m.cue) }));
  return out;
}
function coolSteps() { const rt = Object.assign({}, ALL_ROUTINES[2] || ALL_ROUTINES[0], { hold: 30 }); rt.moves = rt.moves.slice(0, 5); return stretchSteps(rt); }
function daySteps(items, opt) {
  opt = opt || {}; const rest = cfg().rest || 60; const out = [];
  if (opt.warm) warmSteps().forEach((s) => out.push(s));
  const list = items.filter((it) => it.blk || EX_BY_ID[it.id]);
  const groups = [];
  list.forEach((it) => {
    if (it.blk) { groups.push({ blk: it.blk }); return; }
    const g = groups[groups.length - 1];
    if (it.ss && g && g.items) g.items.push(it); else groups.push({ items: [it] });
  });
  let lastG = -1; groups.forEach((g, gi) => { if (g.items) lastG = gi; });
  const nm = (it) => nameOf(EX_BY_ID[it.id].name);
  groups.forEach((g, gi) => {
    if (g.blk === 'warm') { warmSteps().forEach((s) => out.push(s)); return; }
    if (g.blk === 'cool') { coolSteps().forEach((s) => out.push(s)); return; }
    const its = g.items; const n = its.length; const rounds = Math.max(1, Number(its[0].sets) || 3);
    const gname = n === 2 ? L('سوبر سيت', 'Superset') : L('جاينت سيت', 'Giant set');
    const img0 = libThumb(its[0].id);
    const nextG = groups.slice(gi + 1).find((x) => x.items);
    for (let r = 1; r <= rounds; r++) {
      its.forEach((it, k) => {
        const reps = String(it.reps || '10');
        const label = n > 1 ? gname + ' · ' + L('جولة ', 'Round ') + r + '/' + rounds + ' · ' + (k + 1) + '/' + n : L('سيت ', 'Set ') + r + '/' + rounds;
        const cue = L('عدد التكرارات: ', 'Target reps: ') + reps + (k < n - 1 ? ' · ' + L('بعدها مباشرة: ', 'Then straight to: ') + nm(its[k + 1]) : '');
        out.push({ kind: 'work', manual: true, reps: reps, name: nm(it), label: label, cue: cue, img: libThumb(it.id) });
      });
      if (!(gi === lastG && r === rounds)) {
        const nxt = r < rounds ? its.map(nm).join(' + ') : (nextG ? nextG.items.map(nm).join(' + ') : '');
        out.push({ kind: 'rest', dur: rest, name: nxt || nm(its[0]), label: L('راحة، الجاي:', 'Rest, next:'), cue: '', img: img0 });
      }
    }
  });
  if (opt.cool) coolSteps().forEach((s) => out.push(s));
  return out;
}
function startDay(items, title, opt) {
  const steps = daySteps(items, opt);
  if (!steps.length) { toast(L('اليوم ده فاضي', 'This day is empty')); return; }
  startPlayer(steps, { title: title, done: () => { /* السجل بيتسجل تلقائي */ } });
}

/* ---------- المشغّل (بيفضل شغال لو صغّرته) ---------- */
let PL = null;
const sndLbl = () => ({ chime: L('نغمة', 'Chime'), voice: L('نغمة وصوت', 'Voice'), off: L('صامت', 'Muted') }[cfg().snd]);
function startPlayer(steps, opt) {
  PL = { steps: steps, i: 0, left: steps[0].dur || 0, paused: false, opt: opt || {}, finished: false, last: Date.now(), active: 0, min: false, sact: 0, cnt: 0, big: !!(opt && opt.big) };
  if (opt && opt.seek > 0) { let acc = 0; for (let k = 0; k < steps.length; k++) { const st = steps[k]; if (st.manual) { PL.i = k; PL.left = 0; break; } const d = st.dur || 0; if (acc + d > opt.seek) { PL.i = k; PL.left = d - (opt.seek - acc); break; } acc += d; } }
  hr.max = 0; hr.sum = 0; hr.n = 0;
  try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then((w) => { wakeLock = w; }).catch(() => {}); } catch (e) { /* تجاهل */ }
  cue(steps[PL.i].kind === 'work' ? 'work' : 'rest');
  clearInterval(playT); playT = setInterval(plTick, 200);
  dockRender(); draw();
}
function stopPlayer() {
  clearInterval(playT); playT = null; try { if (wakeLock) wakeLock.release(); } catch (e) { /* تجاهل */ } wakeLock = null;
  PL = null; dockRender();
}
function finishSession(P) {
  const avg = hr.n ? Math.round(hr.sum / hr.n) : 0;
  P.sum = { sec: Math.round(P.active), avg: avg, max: hr.max, cnt: P.cnt || 0 };
  plus.sessions = plus.sessions || [];
  plus.sessions.unshift({ d: stamp(), t: P.opt.title || '', s: P.sum.sec, avg: avg, max: hr.max, r: P.cnt || 0 });
  plus.sessions = plus.sessions.slice(0, 60);
  persist();
}
function plNext() {
  const P = PL; if (!P || P.finished) return;
  P.i++;
  if (P.i >= P.steps.length) {
    P.finished = true; clearInterval(playT); try { if (wakeLock) wakeLock.release(); } catch (e) { /* تجاهل */ } wakeLock = null;
    finishSession(P); try { if (P.opt.done) P.opt.done(); } catch (e) { /* تجاهل */ } cue('done');
    if (!P.min) draw(); dockRender(); return;
  }
  const s = P.steps[P.i]; P.left = s.dur || 0; P.sact = 0; cue(s.kind === 'work' ? 'work' : 'rest');
  paintPlayer(); updPlayer(); dockRender();
}
function plTick() {
  const P = PL; if (!P || P.finished) { clearInterval(playT); return; }
  const now = Date.now(); const dt = (now - P.last) / 1000; P.last = now;
  if (P.paused) return;
  P.active += dt; P.sact = (P.sact || 0) + dt;
  const s = P.steps[P.i]; if (s.manual) { if (s.up && s.cap && P.sact >= s.cap) { plNext(); return; } if (s.up) updPlayer(); dockUpdate(); return; }
  const before = Math.ceil(P.left);
  P.left -= dt;
  const after = Math.ceil(P.left);
  if (after !== before && after >= 1 && after <= 3) cue('tick');
  if (P.left <= 0) { P.left = 0; plNext(); } else { updPlayer(); dockUpdate(); }
}
function plPause() { if (!PL || PL.finished) return; PL.paused = !PL.paused; PL.last = Date.now(); paintPlayer(); dockRender(); }
function minimizePlayer() { if (!PL) return; PL.min = true; const ov = document.getElementById('adam-plus'); if (ov) ov.classList.add('hidden'); document.body.classList.remove('ap-lock'); dockRender(); }
function expandPlayer() {
  if (!PL) return; PL.min = false;
  const ov = ensureOverlay(); ov.setAttribute('dir', lang() === 'ar' ? 'rtl' : 'ltr'); ov.classList.remove('hidden'); document.body.classList.add('ap-lock');
  dockRender(); draw();
}
function paintPlayer() {
  const P = PL; if (!P || P.finished || !document.getElementById('ap-pname')) return;
  const s = P.steps[P.i]; const nx = P.steps.slice(P.i + 1).find((x) => x.kind === 'work');
  $('#ap-pcount').textContent = (P.i + 1) + ' / ' + P.steps.length;
  $('#ap-plabel').textContent = s.label || ''; $('#ap-plabel').className = 'ap-plabel ' + s.kind;
  $('#ap-pname').textContent = s.name;
  $('#ap-pcue').textContent = s.cue || '';
  $('#ap-pnext').textContent = nx && s.kind === 'work' ? L('بعد كده: ', 'Next: ') + nx.name : '';
  $('#ap-pimg').innerHTML = s.img ? '<img alt="" src="' + esc(s.img) + '" onerror="this.style.display=\'none\'">' : '';
  $('#ap-ppause').textContent = P.paused ? L('كمّل', 'Resume') : L('إيقاف مؤقت', 'Pause');
  $('#ap-ppause').style.display = s.manual ? 'none' : '';
  $('#ap-pdone').style.display = s.manual ? '' : 'none'; $('#ap-pdone').textContent = s.up ? L('خلّصت', 'Finished') : L('خلّصت السيت', 'Set done');
  const pc = $('#ap-pcnt'); if (pc) { pc.style.display = s.count ? '' : 'none'; pc.textContent = L('+1 جولة', '+1 round') + ' (' + (P.cnt || 0) + ')'; }
  const pg = $('#ap-pbig'); if (pg) { pg.textContent = L('شاشة كبيرة', 'Big screen'); pg.classList.toggle('on', !!P.big); }
  const pl = document.querySelector('.ap-player'); if (pl) pl.classList.toggle('ap-xl', !!P.big);
  $('#ap-psnd').textContent = sndLbl(); $('#ap-psnd').classList.toggle('on', cfg().snd !== 'off');
  $('#ap-pvib').textContent = L('اهتزاز', 'Vibrate'); $('#ap-pvib').classList.toggle('on', cfg().vib !== false);
  $('#ap-pmus').classList.toggle('on', musicState() !== 'none');
  const ph = $('#ap-php'); if (ph) { ph.innerHTML = hrHtml(); const b = $('#ap-phr', ph); if (b) b.addEventListener('click', async () => { await connectHR(); const el = $('#ap-php'); if (el) el.innerHTML = hrHtml(); }); }
}
function updPlayer() {
  const P = PL; if (!P || P.finished || !document.getElementById('ap-psec')) return;
  const s = P.steps[P.i]; const n = P.steps.length;
  if (s.up) { $('#ap-psec').textContent = fmtT(P.sact || 0); $('#ap-pv').setAttribute('stroke-dashoffset', s.cap ? String(276 * (1 - Math.min(1, (P.sact || 0) / s.cap))) : '0'); $('#ap-psec').className = ''; }
  else if (s.manual) { $('#ap-psec').textContent = s.reps; $('#ap-pv').setAttribute('stroke-dashoffset', '0'); $('#ap-psec').className = 'reps'; }
  else { $('#ap-psec').textContent = Math.max(0, Math.ceil(P.left)); $('#ap-psec').className = ''; $('#ap-pv').setAttribute('stroke-dashoffset', String(276 * (1 - Math.max(0, Math.min(1, P.left / (s.dur || 1)))))); }
  $('#ap-ptot').style.width = Math.min(100, ((P.i + (s.manual ? 0 : 1 - Math.max(0, P.left) / (s.dur || 1))) / n) * 100) + '%';
}
function viewPlayer(body) {
  const P = PL;
  if (P.finished) {
    const sm = P.sum || {}; const mins = Math.max(1, Math.round((sm.sec || 0) / 60));
    body.innerHTML = '<div class="ap-card ap-win" style="margin-top:40px"><b style="font-size:24px">' + esc(L('أحسنت! خلصت', 'Nice work! Finished')) + '</b><p class="ap-p">' + esc(P.opt.title || '') + ' · ' + mins + ' ' + esc(L('دقيقة', 'min')) + '</p>' + (sm.cnt ? '<p class="ap-p">' + esc(L('عدد الجولات ', 'Rounds completed ')) + sm.cnt + '</p>' : '') + (sm.avg ? '<p class="ap-p">' + esc(L('متوسط النبض ', 'Average heart rate ')) + sm.avg + ' · ' + esc(L('أعلى نبض ', 'Max ')) + sm.max + '</p>' : '') + '</div><div class="ap-actions"><button type="button" class="ap-btn" id="ap-pend">' + esc(L('رجوع', 'Back')) + '</button></div>';
    $('#ap-pend', body).addEventListener('click', () => { stopPlayer(); draw(); });
    return;
  }
  body.innerHTML = '<div class="ap-player"><div class="ap-ptop"><span class="ap-pbtns"><button type="button" class="ap-chip on" id="ap-pmin">' + esc(L('تصغير', 'Minimize')) + '</button><button type="button" class="ap-chip" id="ap-pclose">' + esc(L('إنهاء', 'End')) + '</button></span><span class="mu" id="ap-pcount"></span><span class="ap-pbtns"><button type="button" class="ap-chip" id="ap-pbig"></button><button type="button" class="ap-chip" id="ap-pmus">' + esc(L('أغاني', 'Music')) + '</button><button type="button" class="ap-chip" id="ap-psnd"></button><button type="button" class="ap-chip" id="ap-pvib"></button></span></div><div id="ap-php" class="ap-php"></div><div class="ap-pimg" id="ap-pimg"></div><div class="ap-plabel" id="ap-plabel"></div><div class="ap-pname" id="ap-pname"></div><div class="ap-pring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" class="t"/><circle cx="50" cy="50" r="44" class="v" id="ap-pv" stroke-dasharray="276" stroke-dashoffset="0"/></svg><b id="ap-psec">0</b></div><p class="ap-pcue" id="ap-pcue"></p><div class="ap-bar"><i id="ap-ptot" style="width:0%"></i></div><small class="mu" id="ap-pnext"></small><div class="ap-actions"><button type="button" class="ap-btn" id="ap-pcnt" style="display:none"></button><button type="button" class="ap-btn" id="ap-pdone" style="display:none">' + esc(L('خلّصت السيت', 'Set done')) + '</button><button type="button" class="ap-btn" id="ap-ppause"></button><button type="button" class="ap-btn ghost" id="ap-pskip">' + esc(L('تخطّي', 'Skip')) + '</button></div></div>';
  paintPlayer(); updPlayer();
  $('#ap-pmin', body).addEventListener('click', minimizePlayer);
  $('#ap-pclose', body).addEventListener('click', () => { if (window.confirm(L('تنهي التمرين؟', 'End the session?'))) { stopPlayer(); draw(); } });
  $('#ap-ppause', body).addEventListener('click', plPause);
  $('#ap-pmus', body).addEventListener('click', () => { musicToggle(); paintPlayer(); });
  $('#ap-psnd', body).addEventListener('click', () => { const o = ['chime', 'voice', 'off']; const c = cfg().snd; plus.set = Object.assign({}, plus.set || {}, { snd: o[(o.indexOf(c) + 1) % 3] }); persist(); if (plus.set.snd !== 'off') cue('set'); paintPlayer(); });
  $('#ap-pvib', body).addEventListener('click', () => { plus.set = Object.assign({}, plus.set || {}, { vib: cfg().vib === false }); persist(); buzz(80); paintPlayer(); });
  $('#ap-pskip', body).addEventListener('click', plNext);
  $('#ap-pcnt', body).addEventListener('click', () => { PL.cnt = (PL.cnt || 0) + 1; cue('set'); paintPlayer(); });
  $('#ap-pbig', body).addEventListener('click', () => { PL.big = !PL.big; try { const ov = document.getElementById('adam-plus'); if (PL.big) { if (ov && ov.requestFullscreen && !document.fullscreenElement) ov.requestFullscreen().catch(() => {}); } else if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen().catch(() => {}); } catch (e) { /* تجاهل */ } paintPlayer(); });
  $('#ap-pdone', body).addEventListener('click', () => { cue('set'); plNext(); });
}

/* ================================================================ الشريط العايم (تمرين مصغّر + أغاني) */
const PLAYLIST_HOSTS = /^(open\.spotify\.com|spotify\.link|(www\.|m\.|music\.)?youtube\.com|youtu\.be|(play\.)?anghami\.com|(on\.)?soundcloud\.com|music\.apple\.com)$/i;
function plClean(url) { try { const u = new URL(String(url || '').trim()); if (u.protocol !== 'https:' || !PLAYLIST_HOSTS.test(u.hostname)) return ''; return u.href; } catch (e) { return ''; } }
function plEmbed(url) {
  try {
    const u = new URL(url); const h = u.hostname.replace(/^www\./, '');
    if (h === 'open.spotify.com') { const m = u.pathname.match(/\/(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/); if (m) return { src: 'https://open.spotify.com/embed/' + m[1] + '/' + m[2], h: 152 }; }
    if (/(^|\.)youtube\.com$/.test(h) || h === 'youtu.be') {
      const list = u.searchParams.get('list');
      if (list) return { src: 'https://www.youtube.com/embed/videoseries?list=' + encodeURIComponent(list), h: 200 };
      const id = h === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v');
      if (id) return { src: 'https://www.youtube.com/embed/' + encodeURIComponent(id), h: 200 };
    }
    if (/soundcloud\.com$/.test(h)) return { src: 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(url), h: 166 };
  } catch (e) { /* تجاهل */ }
  return null;
}
function coachLink() { const a = document.getElementById('client-playlist'); return a && !a.classList.contains('hidden') ? (a.getAttribute('href') || '') : ''; }
const musicLinkNow = () => plClean((plus.music && plus.music.link) || '') || plClean(coachLink());
let musicOn = 'none'; /* none | open | min */
const musicState = () => musicOn;
function musicToggle() { musicOn = musicOn === 'open' ? 'min' : 'open'; if (musicOn === 'open' && !document.getElementById('apd-frame-wrap')) musicRebuild(); dockRender(); }

function dockEl() {
  let d = document.getElementById('ap-dock'); if (d) return d;
  d = document.createElement('div'); d.id = 'ap-dock'; d.className = 'ap-dock hidden';
  d.innerHTML = '<div class="apd-pill hidden" id="apd-pill"><div class="apd-grip" id="apd-grip"><b id="apd-name"></b><span id="apd-time"></span></div><div class="apd-btns"><button type="button" id="apd-pp"></button><button type="button" id="apd-done"></button><button type="button" id="apd-mus"></button><button type="button" id="apd-open"></button><button type="button" id="apd-x" aria-label="end">&times;</button></div></div><div class="apd-music hidden" id="apd-music"></div>';
  document.body.appendChild(d);
  try { const p = JSON.parse(localStorage.getItem('adamdock') || 'null'); if (p && isFinite(p.x) && isFinite(p.y)) { d.style.left = Math.max(0, Math.min(window.innerWidth - 120, p.x)) + 'px'; d.style.top = Math.max(0, Math.min(window.innerHeight - 60, p.y)) + 'px'; d.style.right = 'auto'; d.style.bottom = 'auto'; } } catch (e) { /* تجاهل */ }
  let drag = null;
  d.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, input, iframe, a')) return;
    const r = d.getBoundingClientRect(); drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, id: e.pointerId };
    try { d.setPointerCapture(e.pointerId); } catch (er) { /* تجاهل */ }
    d.classList.add('drag');
  });
  d.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const w = d.offsetWidth, h = d.offsetHeight;
    const x = Math.max(4, Math.min(window.innerWidth - w - 4, e.clientX - drag.dx)); const y = Math.max(4, Math.min(window.innerHeight - 56, e.clientY - drag.dy));
    d.style.left = x + 'px'; d.style.top = y + 'px'; d.style.right = 'auto'; d.style.bottom = 'auto';
  });
  const end = () => { if (!drag) return; drag = null; d.classList.remove('drag'); try { const r = d.getBoundingClientRect(); localStorage.setItem('adamdock', JSON.stringify({ x: r.left, y: r.top })); } catch (e) { /* تجاهل */ } };
  d.addEventListener('pointerup', end); d.addEventListener('pointercancel', end);
  $('#apd-pp', d).addEventListener('click', plPause);
  $('#apd-done', d).addEventListener('click', () => { cue('set'); plNext(); });
  $('#apd-mus', d).addEventListener('click', musicToggle);
  $('#apd-open', d).addEventListener('click', expandPlayer);
  $('#apd-x', d).addEventListener('click', () => { if (PL && PL.finished) { stopPlayer(); return; } if (window.confirm(L('تنهي التمرين؟', 'End the session?'))) stopPlayer(); });
  return d;
}
function musicRebuild() {
  const box = document.getElementById('apd-music'); if (!box) return;
  const link = musicLinkNow(); const emb = link ? plEmbed(link) : null;
  const wrap = document.getElementById('apd-frame-wrap');
  const prev = wrap ? wrap.getAttribute('data-src') || '' : '';
  if (box.firstChild && prev === ((emb && emb.src) || '') && document.getElementById('apd-link')) return;
  box.innerHTML = '<div class="apd-mh"><b>' + esc(L('أغاني التمرين', 'Workout music')) + '</b><span><button type="button" id="apd-mmin">' + esc(L('تصغير', 'Hide')) + '</button><button type="button" id="apd-mx" aria-label="close">&times;</button></span></div>' +
    '<div id="apd-frame-wrap" data-src="' + esc((emb && emb.src) || '') + '">' + (emb ? '<iframe class="apd-iframe" height="' + emb.h + '" src="' + esc(emb.src) + '" allow="autoplay; encrypted-media; clipboard-write; fullscreen" loading="lazy"></iframe>' : (link ? '<a class="ap-btn small" target="_blank" rel="noopener" href="' + esc(link) + '">' + esc(L('افتح القايمة', 'Open the playlist')) + '</a>' : '<div class="apd-empty">' + esc(L('الزق لينك قايمة من Spotify أو يوتيوب أو أنغامي أو SoundCloud.', 'Paste a playlist link from Spotify, YouTube, Anghami or SoundCloud.')) + '</div>')) + '</div>' +
    '<div class="apd-in"><input id="apd-link" type="url" inputmode="url" placeholder="https://" value="' + esc(link) + '"><button type="button" id="apd-save">' + esc(L('شغّل', 'Play')) + '</button></div>';
  $('#apd-mmin', box).addEventListener('click', () => { musicOn = 'min'; dockRender(); });
  $('#apd-mx', box).addEventListener('click', () => { musicOn = 'none'; box.innerHTML = ''; dockRender(); const tab = document.getElementById('ap-body'); if (tab && curTab === 'music') draw(); });
  $('#apd-save', box).addEventListener('click', () => {
    const v = ($('#apd-link', box).value || '').trim(); const c = plClean(v);
    if (!c) { toast(L('اللينك ده مش مدعوم. استخدم Spotify أو يوتيوب أو أنغامي أو SoundCloud.', 'Unsupported link. Use Spotify, YouTube, Anghami or SoundCloud.')); return; }
    plus.music = { link: c }; persist(); box.innerHTML = ''; musicRebuild(); dockRender();
  });
}
function dockRender() {
  const d = dockEl(); const pill = $('#apd-pill', d); const mus = $('#apd-music', d);
  const showPill = !!(PL && PL.min);
  pill.classList.toggle('hidden', !showPill);
  mus.classList.toggle('hidden', musicOn === 'none');
  mus.classList.toggle('collapsed', musicOn === 'min');
  const chip = musicOn === 'min' && !showPill;
  d.classList.toggle('hidden', !showPill && musicOn === 'none');
  d.classList.toggle('chip', chip);
  let ch = $('#apd-chip', d);
  if (chip) { if (!ch) { ch = document.createElement('button'); ch.type = 'button'; ch.id = 'apd-chip'; ch.className = 'apd-chip'; ch.addEventListener('click', () => { musicOn = 'open'; dockRender(); }); d.insertBefore(ch, d.firstChild); } ch.textContent = L('الأغاني شغّالة · افتح', 'Music is on · open'); }
  else if (ch) ch.remove();
  if (showPill) {
    $('#apd-pp', d).textContent = PL.paused ? L('كمّل', 'Resume') : L('إيقاف', 'Pause');
    $('#apd-mus', d).textContent = L('أغاني', 'Music'); $('#apd-mus', d).classList.toggle('on', musicOn !== 'none');
    $('#apd-open', d).textContent = L('فتح', 'Open');
    const fin = PL.finished; const man = !fin && PL.steps[PL.i].manual;
    $('#apd-pp', d).style.display = (fin || man) ? 'none' : ''; $('#apd-done', d).style.display = man ? '' : 'none'; $('#apd-done', d).textContent = PL.steps[PL.i] && PL.steps[PL.i].up ? L('خلّصت', 'Finished') : L('خلّصت السيت', 'Set done');
    dockUpdate();
  }
}
function dockUpdate() {
  const d = document.getElementById('ap-dock'); if (!d || !PL || !PL.min) return;
  const n = $('#apd-name', d), t = $('#apd-time', d); if (!n || !t) return;
  if (PL.finished) { n.textContent = L('أحسنت! خلصت التمرين', 'Nice work! Workout finished'); t.textContent = ''; return; }
  const s = PL.steps[PL.i];
  n.textContent = s.name + (s.label ? ' · ' + s.label : '');
  t.textContent = s.up ? fmtT(PL.sact || 0) : s.manual ? s.reps + ' ' + L('تكرار', 'reps') : String(Math.max(0, Math.ceil(PL.left))) + L(' ث', 's');
}

/* ================================================================ الأغاني */
function viewMusic(body) {
  const link = musicLinkNow(); const coach = plClean(coachLink());
  let h = guestBanner();
  h += '<div class="ap-sec"><b>' + esc(L('أغاني التمرين', 'Workout music')) + '</b></div><div class="ap-card"><p class="ap-p">' + esc(L('الزق لينك قايمة أغاني من Spotify أو يوتيوب أو أنغامي أو SoundCloud، وهتشتغل في مشغّل صغير تقدر تحركه في الشاشة وتسيبه شغال وانت بتتنقل أو بتتمرن.', 'Paste a playlist link from Spotify, YouTube, Anghami or SoundCloud. It plays in a small player you can drag around and leave running while you browse or train.')) + '</p>';
  h += '<div class="apd-in" style="margin:10px 0"><input id="mu-link" type="url" inputmode="url" placeholder="https://" value="' + esc((plus.music && plus.music.link) || '') + '"><button type="button" id="mu-save">' + esc(L('احفظ وشغّل', 'Save and play')) + '</button></div>';
  h += '<div class="ap-actions">' + (link ? '<button type="button" class="ap-btn" id="mu-play">' + esc(L('شغّل المشغّل', 'Open player')) + '</button>' : '') + (coach && coach !== link ? '<button type="button" class="ap-btn ghost" id="mu-coach">' + esc(L('استخدم قايمة مدربك', 'Use my coach playlist')) + '</button>' : '') + (plus.music && plus.music.link ? '<button type="button" class="ap-btn ghost danger" id="mu-clear">' + esc(L('امسح اللينك', 'Remove link')) + '</button>' : '') + '</div></div>';
  h += '<div class="ap-sec"><b>' + esc(L('هات لينك قايمة', 'Get a playlist link')) + '</b></div><div class="ap-card"><div class="ap-chips"><a class="ap-chip" target="_blank" rel="noopener" href="https://open.spotify.com/">Spotify</a><a class="ap-chip" target="_blank" rel="noopener" href="https://music.youtube.com/">YouTube Music</a><a class="ap-chip" target="_blank" rel="noopener" href="https://play.anghami.com/">Anghami</a><a class="ap-chip" target="_blank" rel="noopener" href="https://soundcloud.com/">SoundCloud</a></div>';
  h += '<div class="ap-step"><div class="ap-wk">1</div><div class="ap-st"><span class="ap-p">' + esc(L('افتح التطبيق واختار قايمة تمرين.', 'Open the app and pick a workout playlist.')) + '</span></div></div>';
  h += '<div class="ap-step"><div class="ap-wk">2</div><div class="ap-st"><span class="ap-p">' + esc(L('اضغط مشاركة ثم نسخ اللينك.', 'Tap Share, then Copy link.')) + '</span></div></div>';
  h += '<div class="ap-step"><div class="ap-wk">3</div><div class="ap-st"><span class="ap-p">' + esc(L('الزقه فوق واضغط "احفظ وشغّل".', 'Paste it above and tap "Save and play".')) + '</span></div></div>';
  h += '<div class="ap-note">' + esc(L('الأغاني بتتشغّل من خدمتها نفسها (لازم حسابك فيها). أحيانًا الموبايل بيوقفها لما الشاشة تقفل. ADAM مش بيخزّن أي أغاني.', 'Songs play from their own service (you need your account there). Phones sometimes pause them when the screen locks. ADAM does not store any songs.')) + '</div></div>';
  body.innerHTML = h;
  wireGuest(body);
  const save = (v) => { const c = plClean(v); if (!c) { toast(L('اللينك ده مش مدعوم. استخدم Spotify أو يوتيوب أو أنغامي أو SoundCloud.', 'Unsupported link. Use Spotify, YouTube, Anghami or SoundCloud.')); return; } plus.music = { link: c }; persist(); const box = document.getElementById('apd-music'); if (box) box.innerHTML = ''; musicOn = 'open'; musicRebuild(); dockRender(); draw(); };
  $('#mu-save', body).addEventListener('click', () => save($('#mu-link', body).value));
  const pl = $('#mu-play', body); if (pl) pl.addEventListener('click', () => { musicOn = 'open'; musicRebuild(); dockRender(); });
  const co = $('#mu-coach', body); if (co) co.addEventListener('click', () => save(coach));
  const cl = $('#mu-clear', body); if (cl) cl.addEventListener('click', () => { plus.music = null; persist(); const box = document.getElementById('apd-music'); if (box) box.innerHTML = ''; musicOn = 'none'; dockRender(); draw(); });
}

/* ================================================================ الإطالة */
function stretchStreak() {
  const days = (plus.stretch && plus.stretch.days) || {}; let n = 0, d = stamp();
  if (!days[d]) d = addDays(d, -1);
  while (days[d]) { n++; d = addDays(d, -1); }
  return n;
}
function viewStretch(body) {
  const days = (plus.stretch && plus.stretch.days) || {};
  const ws = weekStart();
  if (sub.openR) return viewStretchDetail(body, ALL_ROUTINES.find((r) => r.id === sub.openR));
  let h = '<div class="ap-card"><div class="ap-row"><b>' + esc(L('أسبوعك', 'Your week')) + '</b><span class="mu">' + esc(L('سلسلة: ', 'Streak: ') + stretchStreak()) + '</span></div><div class="ap-wdots">';
  for (let i = 0; i < 7; i++) { const dt = addDays(ws, i); h += '<div class="' + (days[dt] ? 'on' : '') + (dt === stamp() ? ' td' : '') + '"><i></i><small>' + esc(L(SHORT_AR[i], WEEKDAYS[i][1].slice(0, 3))) + '</small></div>'; }
  h += '</div></div>';
  h += '<div class="ap-sec"><b>' + esc(L('اختار روتين', 'Choose a routine')) + '</b></div>';
  ALL_ROUTINES.forEach((r) => {
    h += '<div class="ap-card"><div class="ap-row"><b>' + esc(L(r.ar, r.en)) + '</b><span class="mu">' + esc(r.min + ' ' + L('دقيقة', 'min')) + '</span></div><small class="mu">' + esc(pick(r.sub)) + '</small><div class="ap-actions"><button type="button" class="ap-btn" data-rplay="' + r.id + '">' + esc(L('ابدأ بالتايمر', 'Start with timer')) + '</button><button type="button" class="ap-btn ghost" data-ropen="' + r.id + '">' + esc(L('شوف الحركات', 'See the moves')) + '</button></div></div>';
  });
  h += '<div class="ap-note">' + esc(L('اتمدد لحد ما تحس بشد خفيف، مش وجع، وماتنطش في الحركة. لو عندك إصابة أو ألم مستمر، استشر أخصائي تأهيل الأول.', 'Stretch to a mild pull, never pain, and do not bounce. If you have an injury or ongoing pain, check with a rehab specialist first.')) + '</div><div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-sask">' + esc(L('اسأل أخصائي', 'Ask a specialist')) + '</button></div>';
  body.innerHTML = h;
  $$('[data-ropen]', body).forEach((b) => b.addEventListener('click', () => { sub.openR = b.dataset.ropen; draw(); }));
  $$('[data-rplay]', body).forEach((b) => b.addEventListener('click', async () => { const r = ALL_ROUTINES.find((x) => x.id === b.dataset.rplay); await loadLib(); startPlayer(stretchSteps(r), { title: L(r.ar, r.en), done: markStretchDone }); }));
  $('#ap-sask', body).addEventListener('click', () => consult(L('إطالة ومرونة', 'stretching and flexibility')));
  loadLib();
}
async function viewStretchDetail(body, r) {
  if (!r) { sub.openR = ''; return viewStretch(body); }
  await loadLib();
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(L(r.ar, r.en)) + '</b><span>' + esc(pick(r.sub)) + '</span></div><div class="ap-card">';
  r.moves.forEach((k, i) => { const m = ALL_MOVES[k]; const img = libThumb(m.lib); h += '<div class="ap-ex ap-exrow">' + (img ? '<img class="ap-th" alt="" loading="lazy" src="' + esc(img) + '">' : '<span class="ap-th ap-num">' + (i + 1) + '</span>') + '<span class="ap-exn"><b>' + esc(nameOf(m)) + (m.sides ? ' <small>(' + esc(L('الجنبين', 'both sides')) + ')</small>' : '') + '</b><small>' + esc(pick(m.cue)) + '</small></span></div>'; });
  h += '</div><div class="ap-actions"><button type="button" class="ap-btn" id="ap-rgo">' + esc(L('ابدأ بالتايمر', 'Start with timer')) + '</button></div>';
  body.innerHTML = h;
  $('#ap-back', body).addEventListener('click', () => { sub.openR = ''; draw(); });
  $('#ap-rgo', body).addEventListener('click', () => startPlayer(stretchSteps(r), { title: L(r.ar, r.en), done: markStretchDone }));
}

/* ================================================================ محطات + جروب + جلسة جماعية بلينك */
const CIRC_PRE = [
  { id: 'p_full', pre: true, name: { ar: 'محطات جسم كامل (وزن الجسم)', en: 'Full-body stations (bodyweight)' }, work: 40, rest: 20, rounds: 3, rrest: 60,
    st: [{ n: { ar: 'سكوات', en: 'Squats' } }, { n: { ar: 'ضغط', en: 'Push-ups' } }, { n: { ar: 'نطّ جاك', en: 'Jumping jacks' } }, { n: { ar: 'اندفاع بالتبادل', en: 'Alternating lunges' } }, { n: { ar: 'بلانك', en: 'Plank' } }, { n: { ar: 'تسلّق الجبل', en: 'Mountain climbers' } }, { n: { ar: 'جسر الأرداف', en: 'Glute bridge' } }, { n: { ar: 'بيربي', en: 'Burpees' } }] },
  { id: 'p_cardio', pre: true, name: { ar: 'كارديو جماعي', en: 'Group cardio' }, work: 45, rest: 15, rounds: 4, rrest: 60,
    st: [{ n: { ar: 'ركبة عالية', en: 'High knees' } }, { n: { ar: 'ركل الأرداف', en: 'Butt kicks' } }, { n: { ar: 'نطّ جانبي (سكيتر)', en: 'Skater jumps' } }, { n: { ar: 'ملاكمة في الهواء', en: 'Shadow boxing' } }, { n: { ar: 'نطّ الحبل', en: 'Jump rope' } }, { n: { ar: 'خطوات سريعة', en: 'Fast feet' } }] },
  { id: 'p_gym', pre: true, name: { ar: 'محطات جيم', en: 'Gym stations' }, work: 45, rest: 15, rounds: 3, rrest: 90,
    st: [{ n: { ar: 'ضغط دمبل', en: 'Dumbbell press' } }, { n: { ar: 'سحب كابل', en: 'Cable row' } }, { n: { ar: 'سكوات جوبلت', en: 'Goblet squat' } }, { n: { ar: 'رفرفة جانبي', en: 'Lateral raise' } }, { n: { ar: 'رومانيان ديدلفت', en: 'Romanian deadlift' } }, { n: { ar: 'تجديف ماكينة', en: 'Rowing machine' } }] }
];
CIRC_PRE.push(...CIRC_EXTRA);
const stName = (st) => (st && typeof st.n === 'object' ? nameOf(st.n) : (st && st.n) || '');
const fmtT = (sec) => { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); };
const totSec = (steps) => steps.reduce((a, x) => a + (x.dur || 0), 0);
function circSteps(c) {
  const out = []; const n = c.st.length; const work = Math.max(5, Number(c.work) || 40), rest = Math.max(0, Number(c.rest) || 0), rounds = Math.max(1, Number(c.rounds) || 1), rrest = Math.max(0, Number(c.rrest) || 0);
  for (let r = 1; r <= rounds; r++) {
    c.st.forEach((st, k) => {
      const nx = k < n - 1 ? stName(c.st[k + 1]) : (r < rounds ? stName(c.st[0]) : '');
      out.push({ kind: 'work', dur: work, name: stName(st), label: L('جولة ', 'Round ') + r + '/' + rounds + ' · ' + L('محطة ', 'Station ') + (k + 1) + '/' + n, cue: nx ? L('بعدها: ', 'Next: ') + nx : L('آخر محطة', 'Last station'), img: st.id ? libThumb(st.id) : '' });
      const lastSt = k === n - 1;
      if (!lastSt && rest > 0) out.push({ kind: 'rest', dur: rest, name: stName(c.st[k + 1]), label: L('راحة، المحطة الجاية:', 'Rest, next station:'), cue: '', img: '' });
      if (lastSt && r < rounds && rrest > 0) out.push({ kind: 'rest', dur: rrest, name: stName(c.st[0]), label: L('راحة بين الجولات، بعدها:', 'Round break, then:'), cue: '', img: '' });
    });
  }
  return out;
}
function tmSteps(t) {
  const out = []; const txt = String(t.text || '').trim();
  if (t.kind === 'tabata' || t.kind === 'intervals') {
    const rounds = Math.max(1, Number(t.rounds) || 8), work = Math.max(5, Number(t.work) || 20), rest = Math.max(0, Number(t.rest) || 10);
    for (let r = 1; r <= rounds; r++) {
      out.push({ kind: 'work', dur: work, name: txt || (t.kind === 'tabata' ? 'Tabata' : L('شغل', 'Work')), label: L('جولة ', 'Round ') + r + '/' + rounds, cue: '' });
      if (rest > 0 && r < rounds) out.push({ kind: 'rest', dur: rest, name: txt || (t.kind === 'tabata' ? 'Tabata' : L('شغل', 'Work')), label: L('راحة', 'Rest'), cue: '' });
    }
  } else if (t.kind === 'emom') {
    const mins = Math.max(1, Number(t.mins) || 10);
    for (let m = 1; m <= mins; m++) out.push({ kind: 'work', dur: 60, name: 'EMOM', label: L('الدقيقة ', 'Minute ') + m + '/' + mins, cue: txt });
  } else if (t.kind === 'amrap') {
    const mins = Math.max(1, Number(t.mins) || 12);
    out.push({ kind: 'work', dur: mins * 60, count: true, name: 'AMRAP', label: L('أكبر عدد جولات في ', 'As many rounds as possible in ') + mins + L(' دقيقة', ' min'), cue: txt });
  } else if (t.kind === 'fortime') {
    const cap = Math.max(0, Number(t.mins) || 0) * 60;
    out.push({ kind: 'work', manual: true, up: true, cap: cap, reps: '', name: 'For Time', label: cap ? L('الحد الأقصى ', 'Time cap ') + fmtT(cap) : L('أسرع وقت', 'Fastest time'), cue: txt });
  }
  return out;
}
function grpEncode(title, steps, t0) {
  const o = { v: 1, n: String(title || '').slice(0, 60), t: t0, s: steps.filter((x) => !x.manual).map((x) => [x.kind === 'work' ? 1 : 0, Math.round(x.dur || 1), String(x.name || '').slice(0, 50), String(x.label || '').slice(0, 70), String(x.cue || '').slice(0, 200), x.count ? 1 : 0]) };
  const bytes = new TextEncoder().encode(JSON.stringify(o)); let bin = ''; bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function grpDecode(q) {
  try {
    const b64 = String(q || '').replace(/-/g, '+').replace(/_/g, '/'); const bin = atob(b64);
    const o = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
    if (!o || o.v !== 1 || !Array.isArray(o.s) || !o.s.length || o.s.length > 300) return null;
    const steps = o.s.map((r) => ({ kind: r[0] ? 'work' : 'rest', dur: Math.max(1, Math.min(7200, Number(r[1]) || 1)), name: String(r[2] || '').slice(0, 50), label: String(r[3] || '').slice(0, 70), cue: String(r[4] || '').slice(0, 200), count: !!r[5] }));
    return { title: String(o.n || '').slice(0, 60), steps: steps, t0: Number(o.t) || 0 };
  } catch (e) { return null; }
}
function takeGrp() {
  let q = ''; try { q = window.__adamgrp || sessionStorage.getItem('adamgrp') || ''; sessionStorage.removeItem('adamgrp'); } catch (e) { q = window.__adamgrp || ''; }
  window.__adamgrp = '';
  return q ? grpDecode(q) : null;
}
function circMy() { plus.circ = plus.circ || { list: [] }; return plus.circ.list; }
function circInfo(c) { const st = circSteps(c); return c.st.length + L(' محطة · ', ' stations · ') + c.work + L('ث شغل / ', 's work / ') + c.rest + L('ث راحة · ', 's rest · ') + c.rounds + L(' جولات · حوالي ', ' rounds · about ') + Math.max(1, Math.round(totSec(st) / 60)) + L(' د', ' min'); }
async function startSteps(steps, title, opt) { await loadLib(); try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.resume) actx.resume(); } catch (e) { /* تجاهل */ } startPlayer(steps, Object.assign({ title: title }, opt || {})); }

function viewCirc(body) {
  if (sub.join) return viewJoin(body);
  if (sub.share) return viewShare(body);
  if (sub.cedit) return viewCircEdit(body);
  if (sub.tm) return viewTimerCfg(body);
  const mine = circMy();
  const card = (c) => '<div class="ap-card"><div class="ap-row"><b>' + esc(typeof c.name === 'object' ? nameOf(c.name) : c.name) + '</b></div><small class="mu">' + esc(circInfo(c)) + '</small><div class="ap-actions"><button type="button" class="ap-btn small" data-crun="' + esc(c.id) + '">' + esc(L('ابدأ', 'Start')) + '</button><button type="button" class="ap-btn small ghost" data-cedit="' + esc(c.id) + '">' + esc(c.pre ? L('انسخ وعدّل', 'Copy and edit') : L('عدّل', 'Edit')) + '</button><button type="button" class="ap-btn small ghost" data-cshare="' + esc(c.id) + '">' + esc(L('ابعت للمجموعة', 'Send to group')) + '</button></div></div>';
  let h = '<div class="ap-sec"><b>' + esc(L('تمرين محطات', 'Station / circuit training')) + '</b><span>' + esc(L('كل محطة بوقت شغل وراحة', 'timed work and rest per station')) + '</span></div>';
  h += mine.map(card).join('') + CIRC_PRE.map(card).join('');
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-cnew">' + esc(L('+ اعمل محطات جديدة', '+ Build new stations')) + '</button></div>';
  h += '<div class="ap-sec"><b>' + esc(L('تايمرات الجروب والكروس فيت', 'Group and CrossFit timers')) + '</b><span>' + esc(L('شاشة كبيرة تتشاف من بعيد', 'big screen, readable from afar')) + '</span></div><div class="ap-grid2">';
  [['tabata', 'Tabata', L('20 شغل / 10 راحة × 8', '20 on / 10 off × 8')], ['emom', 'EMOM', L('كل دقيقة تمرين', 'every minute on the minute')], ['amrap', 'AMRAP', L('أكبر عدد جولات في وقت', 'max rounds in time')], ['fortime', 'For Time', L('أسرع وقت للتمرين', 'fastest time')], ['intervals', L('فترات مخصصة', 'Custom intervals'), L('شغل وراحة وجولات', 'work, rest, rounds')]].forEach((t) => { h += '<button type="button" class="ap-card ap-tmb" data-tm="' + t[0] + '"><b>' + esc(t[1]) + '</b><small class="mu">' + esc(t[2]) + '</small></button>'; });
  h += '</div>';
  h += '<div class="ap-sec"><b>' + esc(L('دليل المصطلحات للمبتدئين', 'Beginner glossary')) + '</b><span>' + esc(L('اضغط على أي مصطلح تفهمه', 'tap any term to read it')) + '</span></div>';
  ['circuit', 'tabata', 'emom', 'amrap', 'fortime', 'chipper', 'hyrox', 'intervals', 'group'].forEach((gk) => { h += guideHtml(gk, false); });
  h += '<div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-cjoin">' + esc(L('معايا لينك جلسة جماعية', 'I have a group session link')) + '</button></div>';
  h += '<div class="ap-note">' + esc(L('الجلسة الجماعية: المدرب يعمل لينك بوقت بداية، وكل واحد يفتحه على موبايله فيشتغل التايمر عند الكل في نفس اللحظة. مفيش حاجة بتتخزن على سيرفر.', 'Group session: the coach makes a link with a start time; everyone opens it and the timer runs in sync on every phone. Nothing is stored on a server.')) + '</div>';
  body.innerHTML = h;
  const find = (id) => circMy().find((x) => x.id === id) || CIRC_PRE.find((x) => x.id === id);
  $$('[data-crun]', body).forEach((b) => b.addEventListener('click', async () => { const c = find(b.dataset.crun); await loadLib(); startSteps(circSteps(c), typeof c.name === 'object' ? nameOf(c.name) : c.name, {}); }));
  $$('[data-cedit]', body).forEach((b) => b.addEventListener('click', () => { const c = find(b.dataset.cedit); sub.cedit = JSON.parse(JSON.stringify(c)); if (c.pre) { sub.cedit.id = 'c' + Date.now(); sub.cedit.pre = false; sub.cedit.name = nameOf(c.name); sub.cedit.isNew = true; } draw(); }));
  $$('[data-cshare]', body).forEach((b) => b.addEventListener('click', async () => { const c = find(b.dataset.cshare); await loadLib(); sub.share = { steps: circSteps(c), title: typeof c.name === 'object' ? nameOf(c.name) : c.name, mins: 2 }; draw(); }));
  $('#ap-cnew', body).addEventListener('click', () => { sub.cedit = { id: 'c' + Date.now(), name: '', work: 40, rest: 20, rounds: 3, rrest: 60, st: [], isNew: true }; draw(); });
  $$('[data-tm]', body).forEach((b) => b.addEventListener('click', () => { const k = b.dataset.tm; sub.tm = { kind: k, work: k === 'tabata' ? 20 : 40, rest: k === 'tabata' ? 10 : 20, rounds: k === 'tabata' ? 8 : 5, mins: k === 'emom' ? 10 : k === 'amrap' ? 12 : 0, text: '', big: true }; draw(); }));
  $('#ap-cjoin', body).addEventListener('click', () => { const v = window.prompt(L('الصق لينك الجلسة', 'Paste the session link'), ''); if (!v) return; let q = ''; try { q = new URL(v.trim()).searchParams.get('grp') || ''; } catch (e) { q = v.trim(); } const g = grpDecode(q); if (!g) { toast(L('اللينك مش صحيح', 'Invalid link')); return; } sub.join = g; draw(); });
  loadLib();
}
function viewCircEdit(body) {
  const c = sub.cedit; const n = c.st.length;
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-card ap-form">';
  h += '<label>' + esc(L('اسم التمرين', 'Workout name')) + '<input id="ce-name" type="text" maxlength="50" value="' + esc(c.name) + '"></label>';
  h += '<div class="ap-three"><label>' + esc(L('شغل (ث)', 'Work (s)')) + '<input id="ce-work" type="number" min="5" max="600" value="' + c.work + '"></label><label>' + esc(L('راحة (ث)', 'Rest (s)')) + '<input id="ce-rest" type="number" min="0" max="300" value="' + c.rest + '"></label><label>' + esc(L('جولات', 'Rounds')) + '<input id="ce-rounds" type="number" min="1" max="20" value="' + c.rounds + '"></label></div>';
  h += '<label>' + esc(L('راحة بين الجولات (ث)', 'Rest between rounds (s)')) + '<input id="ce-rrest" type="number" min="0" max="600" value="' + c.rrest + '"></label></div>';
  h += '<div class="ap-sec"><b>' + esc(L('المحطات', 'Stations')) + '</b><span>' + n + '</span></div><div class="ap-card">';
  if (!n) h += '<div class="ap-note" style="margin:0">' + esc(L('ضيف أول محطة من تحت.', 'Add your first station below.')) + '</div>';
  c.st.forEach((st, i) => { h += '<div class="ap-exrow ap-mrow"><span class="ap-mord"><button type="button" data-cup="' + i + '"' + (i === 0 ? ' disabled' : '') + '>&#8593;</button><button type="button" data-cdn="' + i + '"' + (i === n - 1 ? ' disabled' : '') + '>&#8595;</button></span><span class="ap-exn" style="flex:1;min-width:0">' + (i + 1) + '. ' + esc(stName(st)) + '</span><button type="button" class="ap-btn small danger" data-cdel="' + i + '">×</button></div>'; });
  h += '</div><div class="ap-sec"><b>' + esc(L('ضيف محطة', 'Add a station')) + '</b></div>';
  h += '<div class="ap-row" style="gap:8px"><input type="text" id="ce-free" maxlength="40" placeholder="' + esc(L('اكتب اسم المحطة (مثال: تجديف)', 'Type a station name (e.g. Rowing)')) + '" style="flex:1;margin:0"><button type="button" class="ap-btn small" id="ce-addfree">' + esc(L('ضيف', 'Add')) + '</button></div>';
  h += '<input type="text" id="ce-search" placeholder="' + esc(L('أو ابحث في مكتبة التمارين...', 'Or search the exercise library...')) + '"><div id="ce-res"></div>';
  h += '<div class="ap-actions" style="margin-top:12px"><button type="button" class="ap-btn" id="ce-save">' + esc(L('احفظ', 'Save')) + '</button><button type="button" class="ap-btn ghost" id="ce-run">' + esc(L('احفظ وابدأ', 'Save and start')) + '</button></div>';
  if (!c.isNew) h += '<div class="ap-row" style="margin-top:12px"><button type="button" class="ap-btn small danger" id="ce-del">' + esc(L('احذف المحطات دي', 'Delete these stations')) + '</button></div>';
  body.innerHTML = h;
  const rd = () => { c.name = ($('#ce-name', body).value || '').trim().slice(0, 50); c.work = Math.max(5, Math.min(600, Number($('#ce-work', body).value) || 40)); c.rest = Math.max(0, Math.min(300, Number($('#ce-rest', body).value) || 0)); c.rounds = Math.max(1, Math.min(20, Number($('#ce-rounds', body).value) || 1)); c.rrest = Math.max(0, Math.min(600, Number($('#ce-rrest', body).value) || 0)); };
  const rr = () => { rd(); draw(); };
  $('#ap-back', body).addEventListener('click', () => { sub.cedit = null; draw(); });
  $$('[data-cup]', body).forEach((b) => b.addEventListener('click', () => { rd(); const i = Number(b.dataset.cup); const t = c.st[i]; c.st[i] = c.st[i - 1]; c.st[i - 1] = t; draw(); }));
  $$('[data-cdn]', body).forEach((b) => b.addEventListener('click', () => { rd(); const i = Number(b.dataset.cdn); const t = c.st[i]; c.st[i] = c.st[i + 1]; c.st[i + 1] = t; draw(); }));
  $$('[data-cdel]', body).forEach((b) => b.addEventListener('click', () => { rd(); c.st.splice(Number(b.dataset.cdel), 1); draw(); }));
  const addSt = (st) => { if (c.st.length >= 30) { toast(L('أقصى عدد 30 محطة', 'Max 30 stations')); return; } rd(); c.st.push(st); draw(); };
  $('#ce-addfree', body).addEventListener('click', () => { const v = ($('#ce-free', body).value || '').trim().slice(0, 40); if (v) addSt({ n: v }); });
  const q = $('#ce-search', body), res = $('#ce-res', body);
  const paint = () => {
    const k = q.value.trim().toLowerCase(); const pool = libEx || exAll;
    let list = k ? pool.filter((e) => (String(e.name && e.name.ar || '') + ' ' + String(e.name && e.name.en || '')).toLowerCase().indexOf(k) !== -1) : [];
    list = list.slice(0, 20);
    res.innerHTML = list.map((e, i) => '<button type="button" class="ap-ex" data-cadd="' + i + '"><span>' + esc(nameOf(e.name)) + '</span><em>+ ' + esc(L('ضيف', 'Add')) + '</em></button>').join('');
    $$('[data-cadd]', res).forEach((b) => b.addEventListener('click', () => { const e = list[Number(b.dataset.cadd)]; addSt({ id: e.id, n: { ar: (e.name && e.name.ar) || '', en: (e.name && e.name.en) || '' } }); }));
  };
  q.addEventListener('input', paint); loadLib().then(paint);
  const save = () => { rd(); if (!c.name) c.name = L('محطاتي', 'My stations'); if (!c.st.length) { toast(L('ضيف محطة واحدة على الأقل', 'Add at least one station')); return false; } const l = circMy(); const i = l.findIndex((x) => x.id === c.id); const copy = JSON.parse(JSON.stringify(c)); delete copy.isNew; if (i >= 0) l[i] = copy; else l.unshift(copy); c.isNew = false; persist(); toast(L('اتحفظت', 'Saved')); return true; };
  $('#ce-save', body).addEventListener('click', () => { if (save()) { sub.cedit = null; draw(); } });
  $('#ce-run', body).addEventListener('click', async () => { if (save()) { const t = JSON.parse(JSON.stringify(c)); sub.cedit = null; await loadLib(); startSteps(circSteps(t), t.name, {}); } });
  const dl = $('#ce-del', body); if (dl) dl.addEventListener('click', () => { if (!window.confirm(L('تحذف؟', 'Delete?'))) return; plus.circ.list = circMy().filter((x) => x.id !== c.id); persist(); sub.cedit = null; draw(); });
}
/* شرح مبسّط لأي تايمر أو صيغة تمرين — للمبتدئين */
function guideHtml(key, open) {
  const g = TIMER_GUIDE[key]; if (!g) return '';
  const x = lang() === 'en' ? g.en : g.ar;
  return '<details class="ap-guide" style="background:rgba(127,127,127,.08);border:1px solid rgba(127,127,127,.2);border-radius:12px;padding:10px 12px;margin:8px 0"' + (open ? ' open' : '') + '><summary><b>' + esc(L('إيه ده؟ ', 'What is this? ') + x.name) + '</b></summary>'
    + '<p class="ap-p">' + esc(x.what) + '</p>'
    + '<p class="ap-p"><b>' + esc(L('إزاي بيشتغل: ', 'How it works: ')) + '</b>' + esc(x.how) + '</p>'
    + '<p class="ap-p"><b>' + esc(L('مثال: ', 'Example: ')) + '</b>' + esc(x.example) + '</p>'
    + '<p class="ap-note">' + esc(x.tip) + '</p></details>';
}
function viewTimerCfg(body) {
  const t = sub.tm; const k = t.kind;
  const nm = { tabata: 'Tabata', emom: 'EMOM', amrap: 'AMRAP', fortime: 'For Time', intervals: L('فترات مخصصة', 'Custom intervals') }[k];
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(nm) + '</b></div>' + guideHtml(k, !sub.tmSeen) + '<div class="ap-card ap-form">';
  sub.tmSeen = true;
  if (k === 'tabata' || k === 'intervals') h += '<div class="ap-three"><label>' + esc(L('شغل (ث)', 'Work (s)')) + '<input id="tm-work" type="number" min="5" max="600" value="' + t.work + '"></label><label>' + esc(L('راحة (ث)', 'Rest (s)')) + '<input id="tm-rest" type="number" min="0" max="300" value="' + t.rest + '"></label><label>' + esc(L('جولات', 'Rounds')) + '<input id="tm-rounds" type="number" min="1" max="60" value="' + t.rounds + '"></label></div>';
  if (k === 'emom' || k === 'amrap') h += '<label>' + esc(L('المدة (دقيقة)', 'Duration (min)')) + '<input id="tm-mins" type="number" min="1" max="90" value="' + t.mins + '"></label>';
  if (k === 'fortime') h += '<label>' + esc(L('الحد الأقصى بالدقايق (0 = بدون)', 'Time cap in minutes (0 = none)')) + '<input id="tm-mins" type="number" min="0" max="90" value="' + t.mins + '"></label>';
  h += '<label>' + esc(k === 'tabata' || k === 'intervals' ? L('اسم التمرين (اختياري)', 'Movement name (optional)') : L('التمرين / الـ WOD (اختياري)', 'Workout / WOD (optional)')) + '<textarea id="tm-text" rows="3" maxlength="200">' + esc(t.text) + '</textarea></label>';
  h += '<div class="ap-q"><b>' + esc(L('العرض', 'Display')) + '</b>' + chips([['1', L('شاشة كبيرة', 'Big screen')], ['0', L('عادي', 'Normal')]], t.big ? '1' : '0', 'tmb') + '</div></div>';
  const tot = totSec(tmSteps(t));
  h += '<div class="ap-note">' + esc(k === 'fortime' ? L('التايمر بيعد لفوق لحد ما تدوس "خلّصت".', 'The clock counts up until you tap "Finished".') : L('المدة الكلية حوالي ', 'Total about ') + fmtT(tot)) + '</div>';
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="tm-go">' + esc(L('ابدأ', 'Start')) + '</button>' + (k === 'fortime' ? '' : '<button type="button" class="ap-btn ghost" id="tm-share">' + esc(L('ابعت للمجموعة', 'Send to group')) + '</button>') + '</div>';
  if (k === 'fortime') h += '<div class="ap-note">' + esc(L('For Time مش بيتزامن بلينك لأن كل واحد بيخلّص في وقته.', 'For Time cannot be synced by link because everyone finishes at their own time.')) + '</div>';
  body.innerHTML = h;
  const rd = () => { const g = (id, d, lo, hi) => { const e = $('#' + id, body); return e ? Math.max(lo, Math.min(hi, Number(e.value) || d)) : d; }; t.work = g('tm-work', t.work, 5, 600); t.rest = g('tm-rest', t.rest, 0, 300); t.rounds = g('tm-rounds', t.rounds, 1, 60); if (k === 'fortime') { const e = $('#tm-mins', body); t.mins = e ? Math.max(0, Math.min(90, Number(e.value) || 0)) : 0; } else t.mins = g('tm-mins', t.mins, 1, 90); t.text = ($('#tm-text', body).value || '').trim().slice(0, 200); };
  $('#ap-back', body).addEventListener('click', () => { sub.tm = null; draw(); });
  $$('[data-tmb]', body).forEach((b) => b.addEventListener('click', () => { rd(); t.big = b.dataset.tmb === '1'; draw(); }));
  $('#tm-go', body).addEventListener('click', () => { rd(); startSteps(tmSteps(t), nm, { big: t.big }); });
  const sh = $('#tm-share', body); if (sh) sh.addEventListener('click', () => { rd(); sub.share = { steps: tmSteps(t), title: nm, mins: 2, big: t.big }; draw(); });
}
function viewShare(body) {
  const S = sub.share; const total = totSec(S.steps);
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(L('جلسة جماعية', 'Group session')) + '</b><span>' + esc(S.title) + '</span></div><div class="ap-card"><p class="ap-p">' + esc(L('المدة الكلية حوالي ', 'Total about ') + fmtT(total) + L(' دقيقة', ' min')) + '</p>';
  h += '<div class="ap-q"><b>' + esc(L('تبدأ بعد', 'Starts in')) + '</b>' + chips([1, 2, 5, 10, 15].map((n) => [n, n + L(' د', ' min')]), S.mins, 'shm') + '</div>';
  if (!S.link) h += '<div class="ap-actions"><button type="button" class="ap-btn" id="sh-make">' + esc(L('اعمل اللينك', 'Create the link')) + '</button></div>';
  else {
    h += '<label class="ap-q"><b>' + esc(L('اللينك (ابعته على واتساب)', 'Link (send it on WhatsApp)')) + '</b><input type="text" id="sh-link" readonly value="' + esc(S.link) + '"></label>';
    h += '<p class="ap-p">' + esc(L('بيبدأ الساعة ', 'Starts at ') + new Date(S.t0).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) + '</p>';
    h += '<div class="ap-actions"><button type="button" class="ap-btn" id="sh-share">' + esc(L('شارك', 'Share')) + '</button><button type="button" class="ap-btn ghost" id="sh-copy">' + esc(L('انسخ', 'Copy')) + '</button><button type="button" class="ap-btn ghost" id="sh-join">' + esc(L('ابدأ العد معاهم', 'Count down with them')) + '</button></div>';
  }
  h += '</div><div class="ap-note">' + esc(L('الكل لازم يفتح اللينك قبل وقت البداية، وساعة الموبايل مضبوطة تلقائي. اللي يفتحه متأخر بينضم من المكان اللي وصلوا له.', 'Everyone should open the link before the start time, with their phone clock set automatically. Late joiners jump in where the group is.')) + '</div>';
  body.innerHTML = h;
  $('#ap-back', body).addEventListener('click', () => { sub.share = null; draw(); });
  $$('[data-shm]', body).forEach((b) => b.addEventListener('click', () => { S.mins = Number(b.dataset.shm); S.link = ''; draw(); }));
  const mk = $('#sh-make', body);
  if (mk) mk.addEventListener('click', () => { S.t0 = Date.now() + S.mins * 60000; const base = location.origin + location.pathname; S.link = base + '?grp=' + grpEncode(S.title, S.steps, S.t0); if (S.link.length > 7000) toast(L('اللينك طويل شوية، قلّل الجولات لو واتساب قطعه', 'The link is long; reduce rounds if WhatsApp cuts it')); draw(); });
  const cp = $('#sh-copy', body); if (cp) cp.addEventListener('click', async () => { try { await navigator.clipboard.writeText(S.link); toast(L('اتنسخ', 'Copied')); } catch (e) { const i = $('#sh-link', body); if (i) { i.select(); toast(L('اضغط نسخ يدوي', 'Copy manually')); } } });
  const sr = $('#sh-share', body); if (sr) sr.addEventListener('click', async () => { try { if (navigator.share) await navigator.share({ title: 'ADAM', text: L('انضم لتمرين جماعي: ', 'Join the group workout: ') + S.title, url: S.link }); else { await navigator.clipboard.writeText(S.link); toast(L('اتنسخ', 'Copied')); } } catch (e) { /* ألغى */ } });
  const jn = $('#sh-join', body); if (jn) jn.addEventListener('click', () => { sub.join = { title: S.title, steps: S.steps, t0: S.t0, big: S.big }; sub.share = null; draw(); });
}
function viewJoin(body) {
  const J = sub.join; const total = totSec(J.steps);
  clearInterval(viewJoin._t);
  const stateOf = () => { const now = Date.now(); const el = (now - J.t0) / 1000; return el < 0 ? 'wait' : el < total ? 'run' : 'over'; };
  const paint = () => {
    const now = Date.now(); const el = (now - J.t0) / 1000; const st = stateOf();
    let m = '';
    if (st === 'wait') m = '<div class="ap-bigcd" id="ap-gcd">' + esc(fmtT(-el)) + '</div><p class="ap-p">' + esc(L('التايمر هيبدأ تلقائي عند الوقت ده', 'The timer starts automatically at that time')) + '</p>';
    else if (st === 'run') m = '<div class="ap-bigcd" id="ap-gcd">' + esc(fmtT(el)) + '</div><p class="ap-p">' + esc(L('الجلسة شغالة. انضم من المكان اللي وصلوا له.', 'The session is running. Join where the group is.')) + '</p>';
    else m = '<p class="ap-p" id="ap-gcd">' + esc(L('الجلسة دي خلصت.', 'This session has ended.')) + '</p>';
    const box = $('#ap-jbox', body); if (box) box.innerHTML = m;
    const b = $('#jn-go', body); if (b) { b.style.display = st === 'over' ? 'none' : ''; b.textContent = st === 'wait' ? L('جهّز نفسك وانتظر', 'Get ready and wait') : L('انضم دلوقتي', 'Join now'); }
    return st;
  };
  body.innerHTML = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-card ap-win" style="text-align:center"><b style="font-size:18px">' + esc(J.title || L('تمرين جماعي', 'Group workout')) + '</b><p class="ap-p">' + esc(L('المدة الكلية ', 'Total ') + fmtT(total) + ' · ' + L('يبدأ ', 'starts ') + new Date(J.t0).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })) + '</p><div id="ap-jbox"></div><div class="ap-actions"><button type="button" class="ap-btn" id="jn-go"></button><button type="button" class="ap-btn ghost" id="jn-solo">' + esc(L('ابدأ لوحدي من الأول', 'Start alone from the beginning')) + '</button></div></div>';
  let armed = false;
  const go2 = (seek) => { clearInterval(viewJoin._t); const steps = J.steps; sub.join = null; startSteps(steps, J.title, { big: true, seek: seek }); };
  paint();
  viewJoin._t = setInterval(() => {
    if (!document.getElementById('ap-jbox')) { clearInterval(viewJoin._t); return; }
    const st = paint();
    if (armed && st !== 'wait') go2(Math.max(0, (Date.now() - J.t0) / 1000));
  }, 500);
  $('#ap-back', body).addEventListener('click', () => { clearInterval(viewJoin._t); sub.join = null; draw(); });
  $('#jn-go', body).addEventListener('click', () => {
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.resume) actx.resume(); } catch (e) { /* تجاهل */ }
    const st = stateOf(); if (st === 'run') go2(Math.max(0, (Date.now() - J.t0) / 1000)); else { armed = true; toast(L('تمام، هيبدأ لوحده عند الميعاد. سيب الشاشة مفتوحة.', 'Ready. It will start by itself; keep the screen on.')); }
  });
  $('#jn-solo', body).addEventListener('click', () => { clearInterval(viewJoin._t); const steps = J.steps; sub.join = null; startSteps(steps, J.title, { big: true }); });
}

/* ================================================================ ميكانيكا الحركة */
const MU2LIB = { quads: 'quadriceps', vastus: 'quadriceps', rect_fem: 'quadriceps', hams: 'hamstrings', glute_max: 'glutes', glute_med: 'glutes', glute_min: 'glutes', gastroc: 'calves', soleus: 'calves', biceps_b: 'biceps', brachialis: 'biceps', brachiorad: 'forearms', triceps_b: 'triceps', pec_maj: 'chest', pec_clav: 'chest', pec_min: 'chest', lat: 'lats', teres_maj: 'lats', delt_a: 'shoulders', delt_l: 'shoulders', delt_p: 'shoulders', supra: 'shoulders', infra: 'shoulders', teres_min: 'shoulders', subscap: 'shoulders', trap_u: 'traps', trap_m: 'middle back', trap_l: 'middle back', rhomb: 'middle back', erector: 'lower back', multifidus: 'lower back', quad_lumb: 'lower back', rect_ab: 'abdominals', obliques: 'abdominals', tva: 'abdominals', adductors: 'adductors', wrist_flex: 'forearms', wrist_ext: 'forearms', neck_ext: 'neck', scm: 'neck' };
const muN = (k) => (MU[k] ? L(MU[k][0], MU[k][1]) : k);
const muChip = (k) => '<button type="button" class="ap-chip bio-mu" data-bmu="' + k + '">' + esc(muN(k)) + '</button>';
const planeL = (p) => (PLANES[p] ? L(PLANES[p][0], PLANES[p][1]) : '');
const romBar = (deg) => '<span class="bio-rom"><i style="width:' + Math.max(4, Math.min(100, deg / 180 * 100)) + '%"></i></span><b>0 – ' + deg + '°</b>';
const bio = () => { sub.bio = sub.bio || { tab: 'joints', h: [] }; return sub.bio; };
const bioL = (a) => esc(L(a[0], a[1]));
const bioUl = (arr) => '<ul class="bio-ul">' + arr.map((a) => '<li>' + bioL(a) + '</li>').join('') + '</ul>';
const bioSec = (ar, en) => '<div class="ap-sec"><b>' + esc(L(ar, en)) + '</b></div>';
function openAnat() { close(); try { if (window.__adamOpenAnatomy) window.__adamOpenAnatomy(); } catch (e) { /* تجاهل */ } }
function bioNav(d) { const b = bio(); if (b.d) b.h.push(b.d); b.d = d; b.q = ''; draw(); }
function bioBack() { const b = bio(); b.d = b.h.pop() || null; draw(); }
function bioGo(it) {
  const b = bio();
  if (it.t === 'joint') bioNav({ k: 'joint', id: it.id });
  else if (it.t === 'move') bioNav({ k: 'joint', id: it.id, mv: it.mv });
  else if (it.t === 'muscle') bioNav({ k: 'muscle', id: it.id });
  else if (it.t === 'pattern') bioNav({ k: 'pattern', id: it.id });
  else { b.tab = { gait: 'gait', posture: 'posture', injury: 'injury', principle: 'principles' }[it.t] || 'joints'; b.open = it.id; b.q = ''; draw(); }
}
function bioWire(body) {
  $$('[data-biolib]', body).forEach((x) => x.addEventListener('click', () => openBioLib(x.dataset.biolib === '1' ? '' : x.dataset.biolib)));
  $$('[data-bj]', body).forEach((x) => x.addEventListener('click', () => bioNav({ k: 'joint', id: x.dataset.bj })));
  $$('[data-bp]', body).forEach((x) => x.addEventListener('click', () => bioNav({ k: 'pattern', id: x.dataset.bp })));
  $$('[data-bmu]', body).forEach((x) => x.addEventListener('click', () => bioNav({ k: 'muscle', id: x.dataset.bmu })));
  $$('[data-bex]', body).forEach((x) => x.addEventListener('click', () => bioNav({ k: 'ex', id: x.dataset.bex })));
  $$('[data-bopenex]', body).forEach((x) => x.addEventListener('click', () => openExercise(x.dataset.bopenex)));
  $$('[data-banat]', body).forEach((x) => x.addEventListener('click', openAnat));
  $$('[data-binj]', body).forEach((x) => x.addEventListener('click', () => { const a = x.dataset.binj; go('rehab'); sub.rd = { area: a, level: 3, since: 'week', flags: {} }; draw(); }));
  $$('[data-bask]', body).forEach((x) => x.addEventListener('click', () => consult(x.dataset.bask)));
  const bk = $('#ap-back', body); if (bk) bk.addEventListener('click', bioBack);
}
const exRow = (e) => '<button type="button" class="ap-ex" data-bex="' + esc(e.id) + '"><span>' + esc(nameOf(e.name)) + '</span><em>' + esc(tl(CATL, e.category)) + '</em></button>';
function viewBio(body) {
  const b = bio();
  if (b.d) return bioDetail(body, b.d);
  const tabs = [['joints', L('المفاصل', 'Joints')], ['patterns', L('أنماط الحركة', 'Movement patterns')], ['ex', L('ميكانيكا تمرين', 'An exercise')], ['gait', L('جري ومشي وسبرنت', 'Run, walk, sprint')], ['posture', L('الوضعية', 'Posture')], ['injury', L('آليات الإصابة', 'Injury mechanisms')], ['principles', L('مبادئ', 'Principles')]];
  let h = '<button type="button" class="ap-card ap-tmb bio-libcard" data-biolib="1"><b>' + esc(L('مكتبة البيوميكانيك: رسومات ومنحنيات', 'Biomechanics library: drawings and curves')) + '</b><small class="mu">' + esc(L('رسومات أصلية للسكوات والديدلفت والروافع وذراع العزم ومنحنيات القوة والسرعة والاتزان والعضلات.', 'Original drawings: squat, hinge, levers, moment arms, force-velocity curves, balance and muscles.')) + '</small></button>';
  h += '<div class="ap-note" style="margin-top:0">' + esc(L('إزاي الجسم بيتحرك: المفاصل والعضلات وميكانيكا كل تمرين، ومربوطة بالمكتبة والتشريح والتأهيل.', 'How the body moves: joints, muscles and the mechanics of each exercise, linked to the library, anatomy and rehab.')) + '</div>';
  h += '<input type="text" id="bio-q" maxlength="60" placeholder="' + esc(L('ابحث: ركبة، سكوات، هامسترينج، سبرنت...', 'Search: knee, squat, hamstrings, sprint...')) + '" value="' + esc(b.q || '') + '">';
  const q = norm(b.q || '').trim();
  if (q.length >= 2) {
    const toks = q.split(/\s+/); const idx = bioIndex();
    const hits = idx.filter((it) => { const hay = norm(it.ar + ' ' + it.en + ' ' + it.kw); return toks.every((t) => hay.indexOf(t) !== -1); }).slice(0, 40);
    const TL = { joint: L('مفصل', 'Joint'), move: L('حركة', 'Movement'), muscle: L('عضلة', 'Muscle'), pattern: L('نمط', 'Pattern'), gait: L('جري ومشي', 'Gait'), posture: L('وضعية', 'Posture'), injury: L('إصابة', 'Injury'), principle: L('مبدأ', 'Principle') };
    h += hits.length ? '<div class="ap-card">' + hits.map((it, i) => '<button type="button" class="ap-ex" data-bres="' + i + '"><span>' + esc(L(it.ar, it.en)) + '</span><em>' + esc(TL[it.t]) + '</em></button>').join('') + '</div>' : '<div class="ap-note">' + esc(L('مفيش نتيجة', 'No results')) + '</div>';
    body.innerHTML = h;
    $$('[data-bres]', body).forEach((x) => x.addEventListener('click', () => bioGo(hits[Number(x.dataset.bres)])));
  } else {
    h += chips(tabs, b.tab, 'btab');
    if (b.tab === 'joints') h += JOINTS.map((j) => '<button type="button" class="ap-card ap-tmb" data-bj="' + j.id + '"><b>' + esc(L(j.ar, j.en)) + '</b><small class="mu">' + esc(j.mv.length + L(' حركات', ' movements') + ' · ' + j.mv.slice(0, 3).map((m) => L(m[1], m[2])).join('، ')) + '</small></button>').join('');
    else if (b.tab === 'patterns') h += PATTERNS.map((p) => '<button type="button" class="ap-card ap-tmb" data-bp="' + p.id + '"><b>' + esc(L(p.ar, p.en)) + '</b><small class="mu">' + esc(p.joints.map((j) => nameOf({ ar: jointById(j[0]) ? jointById(j[0]).ar : j[0], en: jointById(j[0]) ? jointById(j[0]).en : j[0] })).join(' · ')) + '</small></button>').join('');
    else if (b.tab === 'ex') h += '<input type="text" id="bio-exq" maxlength="60" placeholder="' + esc(L('اكتب اسم تمرين: سكوات، بنش، ديدلفت...', 'Type an exercise: squat, bench, deadlift...')) + '"><div id="bio-exres"></div>';
    else if (b.tab === 'gait') h += GAIT.map((g) => '<details class="ap-det"' + (b.open === g.id || (!b.open && g.hot) ? ' open' : '') + '><summary>' + esc(L(g.ar, g.en)) + (g.hot ? ' <em class="bio-hot">' + esc(L('للجري والـ400م', 'for running and 400 m')) + '</em>' : '') + '</summary>' + bioUl(g.body) + '</details>').join('');
    else if (b.tab === 'posture') h += POSTURE.map((p) => '<details class="ap-det"' + (b.open === p.id ? ' open' : '') + '><summary>' + esc(L(p.ar, p.en)) + '</summary><p class="ap-p">' + bioL(p.desc) + '</p>' + (p.tight.length ? '<small class="mu">' + esc(L('مشدودة غالبًا:', 'Often tight:')) + '</small><div class="ap-chips">' + p.tight.map(muChip).join('') + '</div>' : '') + (p.weak.length ? '<small class="mu">' + esc(L('ضعيفة غالبًا:', 'Often weak:')) + '</small><div class="ap-chips">' + p.weak.map(muChip).join('') + '</div>' : '') + bioUl(p.fix) + '<div class="ap-actions"><button type="button" class="ap-btn small ghost" data-bask="' + esc(L(p.ar, p.en)) + '">' + esc(L('اسأل أخصائي', 'Ask a specialist')) + '</button></div></details>').join('');
    else if (b.tab === 'injury') h += INJURIES.map((x) => '<details class="ap-det"' + (b.open === x.id ? ' open' : '') + '><summary>' + esc(L(x.ar, x.en)) + '</summary><small class="mu">' + esc(L('إزاي بتحصل', 'Mechanism')) + '</small><p class="ap-p">' + bioL(x.mech) + '</p><small class="mu">' + esc(L('عوامل الخطر', 'Risk factors')) + '</small><p class="ap-p">' + bioL(x.risk) + '</p><small class="mu">' + esc(L('الوقاية', 'Prevention')) + '</small><p class="ap-p">' + bioL(x.prevent) + '</p><div class="ap-actions"><button type="button" class="ap-btn small" data-binj="' + x.area + '">' + esc(L('افتح التأهيل', 'Open rehab')) + '</button></div></details>').join('');
    else if (b.tab === 'principles') h += PRINCIPLES.map((x) => '<details class="ap-det"' + (b.open === x.id ? ' open' : '') + '><summary>' + esc(L(x.ar, x.en)) + '</summary>' + bioUl(x.body) + '</details>').join('');
    h += '<div class="ap-actions"><button type="button" class="ap-btn ghost" data-banat="1">' + esc(L('شوف في التشريح 3D', 'See it in 3D anatomy')) + '</button></div>';
    h += '<div class="ap-note">' + esc(L('محتوى تعليمي عام ومحتاج مراجعة متخصص قبل الاعتماد النهائي. القيم المرجعية لشخص سليم والأفراد بيختلفوا. لو عندك وجع أو إصابة اسأل أخصائي.', 'General educational content, pending specialist review. Reference values are for a healthy person and vary between individuals. If you have pain or an injury, ask a specialist.')) + '</div>';
    body.innerHTML = h;
    $$('[data-btab]', body).forEach((x) => x.addEventListener('click', () => { b.tab = x.dataset.btab; b.open = ''; draw(); }));
    if (b.tab === 'ex') bioExSearch(body);
  }
  const qi = $('#bio-q', body);
  if (qi) qi.addEventListener('input', (e) => { b.q = e.target.value; const pos = e.target.selectionStart; draw(); const n = $('#bio-q'); if (n) { n.focus(); try { n.setSelectionRange(pos, pos); } catch (x) { /* تجاهل */ } } });
  bioWire(body);
}
function bioExSearch(body) {
  const q = $('#bio-exq', body), res = $('#bio-exres', body);
  const paint = () => {
    const k = norm(q.value).trim(); const pool = libEx || exAll;
    const list = k ? pool.filter((e) => norm((e.name && e.name.ar || '') + ' ' + (e.name && e.name.en || '')).indexOf(k) !== -1).slice(0, 30) : pool.filter((e) => e.category === 'strength').slice(0, 14);
    res.innerHTML = '<div class="ap-card">' + (list.map(exRow).join('') || '<div class="ap-note">' + esc(L('مفيش نتيجة', 'No results')) + '</div>') + '</div>';
    $$('[data-bex]', res).forEach((x) => x.addEventListener('click', () => bioNav({ k: 'ex', id: x.dataset.bex })));
  };
  q.addEventListener('input', paint); paint(); loadLib().then(paint);
}
function bioExList(fn, title) {
  return '<div class="ap-sec"><b>' + esc(title) + '</b></div><div class="ap-card" id="bio-exl"><div class="ap-load">' + esc(L('جاري التحميل...', 'Loading...')) + '</div></div>';
}
function bioExFill(body, fn) {
  loadLib().then(() => {
    const el = $('#bio-exl', body); if (!el) return;
    const list = (libEx || []).filter(fn).slice(0, 40);
    el.innerHTML = list.map(exRow).join('') || '<div class="ap-note">' + esc(L('مفيش تمارين مرتبطة', 'No linked exercises')) + '</div>';
    $$('[data-bex]', el).forEach((x) => x.addEventListener('click', () => bioNav({ k: 'ex', id: x.dataset.bex })));
  });
}
function bioDetail(body, d) {
  const back = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button>';
  const anat = '<div class="ap-actions"><button type="button" class="ap-btn ghost" data-banat="1">' + esc(L('شوف في التشريح 3D', 'See it in 3D anatomy')) + '</button></div>';
  if (d.k === 'joint') {
    const j = jointById(d.id); if (!j) { bio().d = null; return viewBio(body); }
    let h = back + '<div class="ap-sec"><b>' + esc(L(j.ar, j.en)) + '</b></div>' + bioFigBox(JOINT2LIB[j.id], JOINT2LIB[j.id]) + '<div class="ap-card"><p class="ap-p">' + bioL(j.type) + '</p></div>';
    h += bioSec('الحركات والمدى والعضلات', 'Movements, range and muscles');
    j.mv.forEach((m) => { h += '<div class="ap-card' + (d.mv === m[0] ? ' ap-win' : '') + '"><div class="ap-row"><b>' + esc(L(m[1], m[2])) + '</b><span class="mu">' + esc(planeL(m[4])) + '</span></div><div class="bio-romrow">' + romBar(m[3]) + '</div><div class="ap-chips">' + m[5].map(muChip).join('') + '</div></div>'; });
    h += bioSec('نقاط مهمة', 'Key points') + '<div class="ap-card">' + bioUl(j.key) + '</div>';
    h += bioSec('أخطاء شائعة في التمرين', 'Common training errors') + '<div class="ap-card">' + bioUl(j.err) + '</div>';
    h += bioSec('إصابات شائعة', 'Common injuries') + j.inj.map((i) => '<div class="ap-card"><b>' + esc(L(i[0], i[1])) + '</b><p class="ap-p">' + esc(L(i[2], i[3])) + '</p></div>').join('');
    h += '<div class="ap-actions"><button type="button" class="ap-btn" data-binj="' + j.area + '">' + esc(L('افتح التأهيل', 'Open rehab')) + '</button><button type="button" class="ap-btn ghost" data-bask="' + esc(L(j.ar, j.en)) + '">' + esc(L('اسأل أخصائي', 'Ask a specialist')) + '</button></div>' + anat;
    h += bioExList(null, L('تمارين بتشغّل المفصل ده', 'Exercises that load this joint'));
    body.innerHTML = h; bioWire(body); bioFigSlot(body, JOINT2LIB[j.id]);
    bioExFill(body, (e) => derive(e).joints.some((x) => x[0] === j.id));
    return;
  }
  if (d.k === 'muscle') {
    const m = MU[d.id]; if (!m) { bio().d = null; return viewBio(body); }
    let h = back + '<div class="ap-sec"><b>' + esc(L(m[0], m[1])) + '</b></div>';
    const moves = []; JOINTS.forEach((j) => j.mv.forEach((mv) => { if (mv[5].indexOf(d.id) !== -1) moves.push([j, mv]); }));
    h += bioSec('بتحرّك إيه', 'What it moves') + '<div class="ap-card">' + (moves.map((x) => '<button type="button" class="ap-ex" data-bj="' + x[0].id + '"><span>' + esc(L(x[1][1], x[1][2])) + '</span><em>' + esc(L(x[0].ar, x[0].en)) + '</em></button>').join('') || '<div class="ap-note">' + esc(L('عضلة ثبات', 'Stabiliser')) + '</div>') + '</div>';
    h += anat;
    if (MU2LIB[d.id]) { h += bioExList(null, L('تمارين لها', 'Exercises for it')); }
    body.innerHTML = h; bioWire(body);
    if (MU2LIB[d.id]) bioExFill(body, (e) => (e.primaryMuscles || []).indexOf(MU2LIB[d.id]) !== -1);
    return;
  }
  if (d.k === 'pattern') {
    const p = patternById(d.id); if (!p) { bio().d = null; return viewBio(body); }
    let h = back + '<div class="ap-sec"><b>' + esc(L(p.ar, p.en)) + '</b></div>' + bioFigBox(PAT2LIB[p.id], PAT2LIB[p.id]);
    h += bioSec('المفاصل المشاركة', 'Joints involved') + '<div class="ap-card">' + p.joints.map((x) => { const j = jointById(x[0]); return '<button type="button" class="ap-ex" data-bj="' + x[0] + '"><span>' + esc(j ? L(j.ar, j.en) : x[0]) + '</span><em>' + esc(L(x[1], x[2])) + '</em></button>'; }).join('') + '</div>';
    h += bioSec('العضلات الأساسية', 'Prime movers') + '<div class="ap-chips">' + p.mus.map(muChip).join('') + '</div>';
    h += bioSec('فين الحمل أكبر؟', 'Where is the load highest?') + '<div class="ap-card"><p class="ap-p">' + bioL(p.load) + '</p></div>';
    h += bioSec('نقاط تكنيك', 'Technique cues') + '<div class="ap-card">' + bioUl(p.cues) + '</div>';
    h += bioSec('أخطاء شائعة', 'Common errors') + '<div class="ap-card">' + bioUl(p.err) + '</div>' + anat;
    h += bioExList(null, L('تمارين من النمط ده', 'Exercises in this pattern'));
    body.innerHTML = h; bioWire(body); bioFigSlot(body, PAT2LIB[p.id]);
    bioExFill(body, (e) => { const v = derive(e); return v.pat && v.pat.id === p.id; });
    return;
  }
  if (d.k === 'ex') {
    loadingBox(body);
    loadLib().then(() => {
      if (!(bio().d && bio().d.k === 'ex' && bio().d.id === d.id)) return;
      const e = (libEx || []).find((x) => x.id === d.id) || EX_BY_ID[d.id];
      if (!e) { body.innerHTML = back + '<div class="ap-empty">' + esc(L('التمرين مش موجود', 'Exercise not found')) + '</div>'; bioWire(body); return; }
      const v = derive(e); const p = v.pat;
      let h = back + '<div class="ap-sec"><b>' + esc(nameOf(e.name)) + '</b><span>' + esc(tl(CATL, e.category) + (e.equipment ? ' · ' + tl(EQL, e.equipment) : '')) + '</span></div>';
      if (p) h += '<div class="ap-card"><div class="ap-row"><b>' + esc(L('النمط: ', 'Pattern: ') + L(p.ar, p.en)) + '</b><button type="button" class="ap-btn small ghost" data-bp="' + p.id + '">' + esc(L('التفاصيل', 'Details')) + '</button></div></div>';
      h += bioSec('المفاصل المشاركة', 'Joints involved');
      h += v.joints.length ? '<div class="ap-card">' + v.joints.map((x) => { const j = jointById(x[0]); return '<button type="button" class="ap-ex" data-bj="' + x[0] + '"><span>' + esc(j ? L(j.ar, j.en) : x[0]) + '</span><em>' + esc(L(x[1], x[2])) + '</em></button>'; }).join('') + '</div>' : '<div class="ap-note">' + esc(L('مفيش تحليل تلقائي للتمرين ده.', 'No automatic analysis for this exercise.')) + '</div>';
      const mk = []; (e.primaryMuscles || []).forEach((m) => { const ar = MUS[m]; if (ar) mk.push('<span class="ap-chip bio-mu">' + esc(L(ar[0], ar[1])) + '</span>'); });
      if (p) p.mus.forEach((k) => { mk.push(muChip(k)); });
      if (mk.length) h += bioSec('العضلات', 'Muscles') + '<div class="ap-chips">' + mk.join('') + '</div>';
      if (p) {
        h += bioSec('فين الحمل أكبر؟', 'Where is the load highest?') + '<div class="ap-card"><p class="ap-p">' + bioL(p.load) + '</p></div>';
        h += bioSec('نقاط تكنيك', 'Technique cues') + '<div class="ap-card">' + bioUl(p.cues) + '</div>';
        h += bioSec('أخطاء شائعة', 'Common errors') + '<div class="ap-card">' + bioUl(p.err) + '</div>';
      }
      if (v.equip) h += '<div class="ap-card"><b>' + esc(L('عن الأداة', 'About the equipment')) + '</b><p class="ap-p">' + bioL(v.equip) + '</p></div>';
      h += '<div class="ap-actions"><button type="button" class="ap-btn" data-bopenex="' + esc(e.id) + '">' + esc(L('افتح التمرين', 'Open the exercise')) + '</button><button type="button" class="ap-btn ghost" data-banat="1">' + esc(L('التشريح 3D', '3D anatomy')) + '</button></div>';
      h += '<div class="ap-note">' + esc(L('التحليل بيتولّد تلقائي من اسم التمرين وعضلاته، وممكن يختلف في بعض الأداءات.', 'This analysis is generated automatically from the exercise name and muscles and may differ for some variations.')) + '</div>';
      body.innerHTML = h; bioWire(body);
    });
    return;
  }
  bio().d = null; viewBio(body);
}


const JOINT2LIB = { knee: 'j_knee', hip: 'j_hip', lumbar: 'j_back', thoracic: 'j_back', cervical: 'j_back', shoulder: 'j_shoulder', scapula: 'rhythm', ankle: 'j_ankle', foot: 'j_ankle', elbow: 'j_elbow', forearm: 'j_elbow', wrist: 'j_elbow' };
const PAT2LIB = { squat: 'squat', lunge: 'lunge', hinge: 'hinge', hpush: 'hpush', vpush: 'vpush', hpull: 'hpull', vpull: 'vpull', run: 'run', plyo: 'jump', coreAnti: 'core', coreFlex: 'core', rotation: 'throw', curl: 'curve', triext: 'curve', sraise: 'resist', legiso: 'chains' };
let figsP = null;
function loadFigs() {
  if (window.BIOFIG) return Promise.resolve(window.BIOFIG);
  if (!figsP) figsP = new Promise((res) => { const s = document.createElement('script'); s.src = 'biomech/figs.js'; s.onload = () => res(window.BIOFIG || null); s.onerror = () => { figsP = null; res(null); }; document.head.appendChild(s); });
  return figsP;
}
function bioFigSlot(body, id) {
  if (!id) return;
  loadFigs().then((F) => { const el = $('#bio-fig', body); if (el && F && F.has(id)) el.innerHTML = F.draw(id, lang()); });
}
function bioFigBox(id, libId) {
  return '<div class="bio-fig-wrap"><div class="bio-fig" id="bio-fig"></div>' + (libId ? '<button type="button" class="ap-btn ghost" data-biolib="' + libId + '">' + esc(L('اشرح بالرسم والمنحنيات', 'Explain with drawings and curves')) + '</button>' : '') + '</div>';
}
/* مكتبة البيوميكانيك (رسومات ومنحنيات): بتتفتح في نافذة المكتبة بتاعة app.js */
export function openBioLib(topic) {
  const t = String(topic || '').replace(/[^a-z0-9_-]/gi, '').slice(0, 40);
  try { window.postMessage({ type: 'adam-open-biomech', target: t }, location.origin); } catch (e) { /* تجاهل */ }
}
export async function openBioTarget(kind, id) {
  await open('biomech');
  bioNav({ k: kind === 'joint' ? 'joint' : 'pattern', id: String(id) });
}
export async function openBio(exId) {
  await open('biomech');
  if (exId) { const b = bio(); b.h = []; b.d = { k: 'ex', id: exId }; draw(); }
}

/* ================================================================ بحث شامل */
const GS_SEC = [
  ['journeys', 'الرحلات', 'Journeys', 'رحلة هدف خطة journey plan'], ['events', 'الطلعات', 'Events', 'طلعة فعالية ماراثون سباق event race'], ['today', 'سؤال اليوم', 'Daily check-in', 'جاهزية نوم checkin readiness'],
  ['chal', 'التحديات', 'Challenges', 'تحدي 30 يوم challenge'], ['plan', 'خطتي (تمرين وتغذية)', 'My plan', 'جدول تمرين برنامج plan workout'], ['lib', 'المكتبة (تمارين وقوالب وأكل)', 'Library', 'تمارين مكتبة قوالب library exercises templates'],
  ['food', 'أكلي', 'My food', 'اكل سعرات تسجيل food calories log'], ['recipes', 'الوصفات', 'Recipes', 'وصفات اكل صحي recipe'], ['stretch', 'الإطالة', 'Stretch', 'اطاله مرونه stretching flexibility'],
  ['circ', 'محطات وجروب', 'Circuits and group', 'محطات كروس فيت تاباتا tabata emom amrap circuit group class'], ['music', 'الأغاني', 'Music', 'موسيقى اغاني music playlist spotify'],
  ['rehab', 'تأهيلي', 'My rehab', 'تاهيل الم وجع اصابه rehab pain injury'], ['biomech', 'ميكانيكا الحركة', 'Movement mechanics', 'بيوميكانيكس بيوميكانيك biomechanics مفاصل حركة'], ['me', 'ملفي وبياناتي', 'My profile', 'بيانات وزن طول ساعه بلوتوث صوت profile watch bluetooth'],
  ['anat', 'التشريح ثلاثي الأبعاد', '3D anatomy', 'عضلات عظام اربطه تشريح anatomy muscles bones'], ['medlib', 'المكتبة الطبية', 'Medical library', 'مقالات طبيه صحه medical articles'],
  ['fast', 'الصيام المتقطع', 'Fasting', 'صيام fasting intermittent'], ['nutri', 'برامج التغذية', 'Nutrition programs', 'تغذيه دايت nutrition diet'], ['tpl', 'قوالب التمرين', 'Workout templates', 'قوالب تمرين templates'],
  ['daysum', 'الملخص اليومي', 'Daily summary', 'ملخص يومي summary'], ['consult', 'استشارة متخصص', 'Ask a specialist', 'دكتور مدرب استشاره متخصص consult doctor coach']
];
let gsMed = null;
function gsSection(k) {
  if (k === 'anat') { openAnat(); return; }
  if (k === 'medlib') { close(); try { if (window.__adamMed) window.__adamMed.open(''); } catch (e) { /* تجاهل */ } return; }
  if (k === 'consult') { consult(''); return; }
  if (k === 'daysum') { close(); try { if (window.adamDaySummary) window.adamDaySummary(); } catch (e) { /* تجاهل */ } return; }
  if (['fast', 'nutri', 'tpl'].indexOf(k) !== -1) { open(k); return; }
  go(k);
}
function gsBuild() {
  const g = [];
  const add = (grp, ar, en, kw, act, subt) => g.push({ g: grp, ar: ar, en: en, kw: kw || '', act: act, sub: subt || '' });
  GS_SEC.forEach((s) => add('sec', s[1], s[2], s[3], () => gsSection(s[0])));
  add('bio', 'مكتبة البيوميكانيك رسومات ومنحنيات', 'Biomechanics library drawings and curves', 'بيوميكانيكس منحنى قوة سرعة روافع ذراع العزم اتزان رسم biomechanics curve lever moment arm force velocity', () => { go('biomech'); openBioLib(); });
  bioIndex().forEach((it) => add('bio', it.ar, it.en, it.kw, () => { go('biomech'); bioGo(it); }));
  JOURNEYS.forEach((j) => add('jou', pick(j.title), L(j.title.ar, j.title.en), pick(j.sub) + ' ' + j.title.ar + ' ' + j.title.en, () => { go('journeys'); sub.openJ = j.id; draw(); }, pick(j.sub)));
  CHALLENGES.forEach((c) => add('cha', c.ar, c.en, pick(c.sub), () => { go('chal'); sub.openC = c.id; draw(); }, pick(c.sub)));
  ALL_RECIPES.forEach((r) => add('rec', nameOf(r), nameOf(r), '', () => { go('recipes'); sub.openRc = r.id; sub.srv = 0; draw(); }));
  ALL_ROUTINES.forEach((r) => add('str', r.ar, r.en, pick(r.sub), () => { go('stretch'); sub.openR = r.id; draw(); }, pick(r.sub)));
  SPORTS.forEach((s) => add('spo', nameOf(s), nameOf(s), (s.ar || '') + ' ' + (s.en || ''), () => { go('journeys'); sub.facet = 'sport'; sub.val = s.id; draw(); }));
  INJURY_AREAS.forEach((a) => add('inj', 'تأهيل ' + a[1], 'Rehab: ' + a[2], a[1] + ' ' + a[2] + ' وجع الم pain', () => { go('rehab'); sub.rd = { area: a[0], level: 3, since: 'week', flags: {} }; draw(); }));
  foodsAll.forEach((f) => add('foo', nameOf(f), nameOf(f), (f.ar || '') + ' ' + (f.en || ''), () => { go('lib'); sub.lt = 'food'; sub.q = nameOf(f); draw(); }, f.c + L(' سعر · بروتين ', ' kcal · protein ') + f.p));
  return g;
}
const GS_NAMES = { sec: ['أقسام التطبيق', 'App sections'], ex: ['تمارين', 'Exercises'], bio: ['ميكانيكا الحركة', 'Movement mechanics'], foo: ['أكل', 'Foods'], rec: ['وصفات', 'Recipes'], jou: ['رحلات', 'Journeys'], cha: ['تحديات', 'Challenges'], str: ['إطالة', 'Stretching'], spo: ['رياضات', 'Sports'], inj: ['تأهيل وإصابات', 'Rehab and injuries'], med: ['المكتبة الطبية', 'Medical library'] };
const GS_ORDER = ['sec', 'ex', 'bio', 'foo', 'rec', 'jou', 'cha', 'str', 'spo', 'inj', 'med'];
let gsIdx = null;
function viewSearch(body) {
  if (!gsIdx) gsIdx = gsBuild();
  const st = sub.gs = sub.gs || { q: '', all: {} };
  body.innerHTML = '<input type="text" id="gs-q" maxlength="60" autocomplete="off" placeholder="' + esc(L('ابحث في كل ADAM: تمرين، أكلة، مفصل، رحلة...', 'Search all of ADAM: exercise, food, joint, journey...')) + '" value="' + esc(st.q) + '"><div id="gs-res"></div>';
  const inp = $('#gs-q', body), res = $('#gs-res', body);
  let exList = [];
  const paint = () => {
    const q = norm(st.q).trim();
    if (q.length < 2) { res.innerHTML = '<div class="ap-note">' + esc(L('اكتب حرفين على الأقل. هتلاقي التمارين والأكل والوصفات والرحلات والتحديات والمفاصل والإصابات والمقالات الطبية وأقسام التطبيق.', 'Type at least two letters. You will find exercises, foods, recipes, journeys, challenges, joints, injuries, medical articles and app sections.')) + '</div>'; return; }
    const toks = q.split(/\s+/);
    const match = (hay) => { const h = norm(hay); return toks.every((t) => h.indexOf(t) !== -1) ? h.indexOf(toks[0]) : -1; };
    const groups = {};
    gsIdx.forEach((it) => { const s = match(it.ar + ' ' + it.en + ' ' + it.kw); if (s >= 0) (groups[it.g] = groups[it.g] || []).push({ s: s, it: it }); });
    const exs = (libEx || []).map((e) => { const s = match((e.name && e.name.ar || '') + ' ' + (e.name && e.name.en || '') + ' ' + (e.primaryMuscles || []).map((m) => tl(MUS, m)).join(' ') + ' ' + (e.equipment ? tl(EQL, e.equipment) : '')); return s >= 0 ? { s: s, it: { g: 'ex', ar: nameOf(e.name), en: nameOf(e.name), sub: tl(CATL, e.category), act: () => openExercise(e.id), id: e.id } } : null; }).filter(Boolean);
    if (exs.length) groups.ex = exs;
    (gsMed || []).forEach((a) => { const s = match(a.title + ' ' + (a.cat || '') + ' ' + (a.body || '').slice(0, 400)); if (s >= 0) (groups.med = groups.med || []).push({ s: s, it: { g: 'med', ar: a.title, en: a.title, sub: a.cat || '', act: () => { close(); try { window.__adamMed.open(a.id); } catch (e) { /* تجاهل */ } } } }); });
    let h = '', n = 0; exList = [];
    GS_ORDER.forEach((k) => {
      const arr = groups[k]; if (!arr || !arr.length) return;
      arr.sort((a, b) => a.s - b.s);
      const lim = st.all[k] ? 60 : 5; const shown = arr.slice(0, lim);
      h += '<div class="ap-sec"><b>' + esc(L(GS_NAMES[k][0], GS_NAMES[k][1])) + '</b><span>' + arr.length + '</span></div><div class="ap-card">';
      shown.forEach((x) => { exList.push(x.it); h += '<button type="button" class="ap-ex" data-gs="' + (exList.length - 1) + '"><span>' + esc(L(x.it.ar, x.it.en)) + (x.it.sub ? '<small class="mu">' + esc(x.it.sub) + '</small>' : '') + '</span><em>›</em></button>'; n++; });
      if (arr.length > lim) h += '<button type="button" class="ap-btn small ghost" data-gsall="' + k + '">' + esc(L('عرض الكل (' + arr.length + ')', 'Show all (' + arr.length + ')')) + '</button>';
      h += '</div>';
    });
    res.innerHTML = n ? h : '<div class="ap-note">' + esc(L('مفيش نتيجة. جرّب كلمة تانية.', 'No results. Try another word.')) + '</div>';
    $$('[data-gs]', res).forEach((x) => x.addEventListener('click', () => exList[Number(x.dataset.gs)].act()));
    $$('[data-gsall]', res).forEach((x) => x.addEventListener('click', () => { st.all[x.dataset.gsall] = true; paint(); }));
  };
  inp.addEventListener('input', () => { st.q = inp.value; st.all = {}; paint(); });
  paint();
  loadLib().then(() => { if ($('#gs-q')) paint(); });
  if (gsMed === null) { gsMed = []; try { if (window.__adamMed) window.__adamMed.items().then((l) => { gsMed = l || []; if ($('#gs-q')) paint(); }).catch(() => {}); } catch (e) { /* تجاهل */ } }
  setTimeout(() => { try { inp.focus(); } catch (e) { /* تجاهل */ } }, 80);
}

/* ================================================================ الوصفات */
const R_BY_ID = {}; ALL_RECIPES.forEach((r) => { R_BY_ID[r.id] = r; });
const R_MEALS = [['all', 'الكل', 'All'], ['breakfast', 'فطار', 'Breakfast'], ['lunch', 'غدا', 'Lunch'], ['dinner', 'عشا', 'Dinner'], ['snack', 'سناك', 'Snack'], ['drink', 'مشروبات', 'Drinks'], ['fav', 'المفضلة', 'Favorites'], ['cart', 'المشتريات', 'Shopping']];
const R_TAGS = [['protein', 'بروتين عالي', 'High protein'], ['lowcarb', 'قليل كارب', 'Low carb'], ['veg', 'نباتي', 'Vegetarian'], ['budget', 'اقتصادي', 'Budget'], ['quick', 'سريع', 'Quick'], ['airfry', 'إيرفراير', 'Air fryer'], ['detox', 'ديتوكس', 'Detox']];
const rIng = (r) => { const sw = (plus.rswap && plus.rswap[r.id]) || {}; return r.ing.map((it, i) => (sw[i] ? { id: sw[i].id, g: sw[i].g, swapped: true } : { id: it[0], g: it[1] })); };
function rTotals(r) {
  const t = { kcal: 0, p: 0, c: 0, f: 0, g: 0 };
  rIng(r).forEach((it) => { const n = foodNutr(it.id, it.g); t.kcal += n.kcal; t.p += n.p; t.c += n.c; t.f += n.f; t.g += it.g; });
  const s = r.serv || 1; return { kcal: t.kcal / s, p: t.p / s, c: t.c / s, f: t.f / s, g: t.g / s };
}
function rArt(r) { try { const f = FOOD_BY_ID[r.ing[0][0]]; return f ? foodArt(f) : ''; } catch (e) { return ''; } }
function viewRecipes(body) {
  if (sub.openRc) return viewRecipeDetail(body, R_BY_ID[sub.openRc]);
  const meal = sub.rmeal || 'all';
  if (meal === 'cart') return viewCart(body);
  const tag = sub.rtag || ''; const q = normAr(sub.rq || '');
  let list = ALL_RECIPES.filter((r) => (meal === 'all' || (meal === 'fav' ? plus.fav[r.id] : r.meal === meal)) && (!tag || r.tags.indexOf(tag) !== -1));
  if (q) list = list.filter((r) => (normAr(r.ar) + ' ' + normAr(r.en) + ' ' + r.ing.map((i) => (FOOD_BY_ID[i[0]] ? normAr(FOOD_BY_ID[i[0]].ar) + ' ' + normAr(FOOD_BY_ID[i[0]].en) : '')).join(' ')).indexOf(q) !== -1);
  let h = '<div class="ap-goalbox"><input id="ap-rq" type="text" maxlength="60" placeholder="' + esc(L('دوّر: فراخ، عدس، شوفان...', 'Search: chicken, lentils, oats...')) + '" value="' + esc(sub.rq || '') + '"></div>';
  h += chips(R_MEALS.map((m) => [m[0], L(m[1], m[2]) + (m[0] === 'cart' ? ' (' + Object.keys(plus.cart || {}).length + ')' : '')]), meal, 'rm');
  h += chips([['', L('كل الأنواع', 'All types')]].concat(R_TAGS.map((t) => [t[0], L(t[1], t[2])])), tag, 'rt');
  h += '<div class="ap-note">' + list.length + esc(L(' وصفة', ' recipes')) + '</div>';
  if (meal === 'drink' || tag === 'detox') h += '<div class="ap-note">' + esc(L('مشروبات الديتوكس هي مية منكّهة وعصاير طبيعية بتساعدك تشرب سوايل أكتر. مفيش مشروب بيطرد السموم من الجسم، ده شغل الكبد والكلى. ولو عندك سكر أو ضغط أو حمل أو أمراض كلى استشر طبيب قبل أي نظام غذائي.', 'Detox drinks are flavored water and natural juices that help you drink more fluids. No drink flushes toxins; that is the job of your liver and kidneys. If you have diabetes, high blood pressure, pregnancy or kidney disease, ask your doctor before changing your diet.')) + '</div>';
  if (tag === 'airfry') h += '<div class="ap-note">' + esc(L('أزمنة وحرارة الإيرفراير تقريبية وبتختلف من جهاز للتاني. اتأكد إن الفراخ واللحمة استوت من جوه.', 'Air fryer times and temperatures are approximate and vary by model. Make sure chicken and meat are cooked through.')) + '</div>';
  h += list.length ? '<div class="ap-card">' + list.map((r) => { const t = rTotals(r); return '<button type="button" class="ap-ex ap-exrow" data-rc="' + r.id + '"><span class="ap-th ap-fart">' + rArt(r) + '</span><span class="ap-exn"><b>' + esc(nameOf(r)) + '</b><small>' + Math.round(t.kcal) + ' ' + esc(L('سعرة', 'kcal')) + ' · ' + Math.round(t.p) + esc(L(' جم بروتين', ' g protein')) + ' · ' + r.min + esc(L(' د', ' min')) + '</small></span>' + (plus.fav[r.id] ? '<em class="ap-fav on"></em>' : '<em>›</em>') + '</button>'; }).join('') + '</div>' : '<div class="ap-empty small">' + esc(meal === 'fav' ? L('لسه مفيش وصفات في المفضلة.', 'No favorites yet.') : L('مفيش وصفة مطابقة.', 'No matching recipes.')) + '</div>';
  h += '<div class="ap-note">' + esc(L('الأرقام الغذائية محسوبة من مكتبة ADAM وتقديرية. لو عندك حساسية أو حالة صحية استشر أخصائي تغذية.', 'Nutrition numbers are calculated from the ADAM food library and are estimates. If you have an allergy or health condition, consult a dietitian.')) + '</div>';
  body.innerHTML = h;
  const qi = $('#ap-rq', body); if (qi) qi.addEventListener('change', () => { sub.rq = qi.value; draw(); });
  $$('[data-rm]', body).forEach((b) => b.addEventListener('click', () => { sub.rmeal = b.dataset.rm; draw(); }));
  $$('[data-rt]', body).forEach((b) => b.addEventListener('click', () => { sub.rtag = b.dataset.rt; draw(); }));
  $$('[data-rc]', body).forEach((b) => b.addEventListener('click', () => { sub.openRc = b.dataset.rc; sub.srv = 0; draw(); }));
}
function swapOptions(r, i) {
  const it = rIng(r)[i]; const f = FOOD_BY_ID[it.id]; if (!f) return [];
  const byProt = f.cat === 'protein' && f.p > 5; const key = byProt ? 'p' : 'c';
  const base = f[key] || 0; if (!base) return [];
  return foodsAll.filter((x) => x.cat === f.cat && x.id !== f.id && x[key] > 0 && x.cat !== 'dish').map((x) => {
    const g = Math.min(it.g * 2.5, Math.max(it.g * 0.4, it.g * base / x[key]));
    return { id: x.id, g: Math.max(5, Math.round(g / 5) * 5), d: Math.abs(x[key] - base) / base };
  }).sort((a, b) => a.d - b.d).slice(0, 8);
}
function viewRecipeDetail(body, r) {
  if (!r) { sub.openRc = ''; return viewRecipes(body); }
  const sel = sub.srv || r.serv; const k = sel / r.serv; const t = rTotals(r);
  let h = '<button type="button" class="ap-back" id="ap-back">' + esc(L('رجوع', 'Back')) + '</button>';
  h += '<div class="ap-hero ap-rhero"><span class="ap-fart big">' + rArt(r) + '</span><h2>' + esc(nameOf(r)) + '</h2><div class="ap-meta"><i>' + esc(tl({ breakfast: ['فطار', 'Breakfast'], lunch: ['غدا', 'Lunch'], dinner: ['عشا', 'Dinner'], snack: ['سناك', 'Snack'], drink: ['مشروبات', 'Drinks'] }, r.meal)) + '</i><i>' + r.min + esc(L(' دقيقة', ' min')) + '</i>' + r.tags.map((g) => '<i>' + esc((R_TAGS.find((x) => x[0] === g) || ['', g, g])[L(1, 2) === 1 ? 1 : 2]) + '</i>').join('') + '</div></div>';
  h += '<div class="ap-card"><div class="ap-macros"><div><b>' + Math.round(t.kcal) + '</b><small>' + esc(L('سعرة', 'kcal')) + '</small></div><div><b>' + Math.round(t.p) + '</b><small>' + esc(L('بروتين', 'Protein')) + '</small></div><div><b>' + Math.round(t.c) + '</b><small>' + esc(L('كارب', 'Carbs')) + '</small></div><div><b>' + Math.round(t.f) + '</b><small>' + esc(L('دهون', 'Fat')) + '</small></div></div><small class="mu">' + esc(L('للحصة الواحدة', 'Per serving')) + '</small></div>';
  h += '<div class="ap-row"><b>' + esc(L('عدد الحصص', 'Servings')) + '</b><span class="ap-step2"><button type="button" id="ap-sminus" aria-label="-">-</button><b>' + sel + '</b><button type="button" id="ap-splus" aria-label="+">+</button></span></div>';
  h += '<div class="ap-sec"><b>' + esc(L('المكونات', 'Ingredients')) + '</b></div><div class="ap-card">';
  rIng(r).forEach((it, i) => { const f = FOOD_BY_ID[it.id]; h += '<div class="ap-food"><span>' + esc(f ? nameOf(f) : it.id) + (it.swapped ? ' <small class="mu">(' + esc(L('بديل', 'swap')) + ')</small>' : '') + '</span><em>' + r5(it.g * k) + ' ' + esc(L('جم', 'g')) + '</em><button type="button" class="ap-btn small ghost" data-sw="' + i + '">' + esc(L('بدّل', 'Swap')) + '</button></div>'; });
  const xs = (r.x && r.x[lang()]) || []; if (xs.length) h += '<div class="ap-food"><span class="mu">' + esc(xs.join('، ').replace(/، /g, lang() === 'en' ? ', ' : '، ')) + '</span></div>';
  h += '</div><div id="ap-swbox"></div>';
  h += '<div class="ap-sec"><b>' + esc(L('الطريقة', 'Method')) + '</b></div><div class="ap-card">' + r.st[lang()].map((s, i) => '<div class="ap-step"><div class="ap-wk">' + (i + 1) + '</div><div class="ap-st"><span class="ap-p">' + esc(s) + '</span></div></div>').join('') + '</div>';
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="ap-rlog">' + esc(L('سجّلها في أكلي', 'Log in my food')) + '</button><button type="button" class="ap-btn ghost" id="ap-rcart">' + esc(L('ضيفها للمشتريات', 'Add to shopping list')) + '</button><button type="button" class="ap-btn ghost" id="ap-rfav">' + esc(plus.fav[r.id] ? L('شيلها من المفضلة', 'Remove favorite') : L('ضيفها للمفضلة', 'Add to favorites')) + '</button><button type="button" class="ap-btn ghost" id="ap-rshare">' + esc(L('شارك', 'Share')) + '</button></div>';
  body.innerHTML = h;
  $('#ap-back', body).addEventListener('click', () => { sub.openRc = ''; draw(); });
  $('#ap-sminus', body).addEventListener('click', () => { sub.srv = Math.max(1, sel - 1); draw(); });
  $('#ap-splus', body).addEventListener('click', () => { sub.srv = Math.min(8, sel + 1); draw(); });
  $$('[data-sw]', body).forEach((b) => b.addEventListener('click', () => {
    const i = Number(b.dataset.sw); const opts = swapOptions(r, i); const box = $('#ap-swbox', body);
    box.innerHTML = opts.length ? '<div class="ap-card"><div class="ap-row"><b>' + esc(L('بدّل بـ', 'Swap with')) + '</b><button type="button" class="ap-btn small ghost" id="ap-swx">' + esc(L('إلغاء', 'Cancel')) + '</button></div>' + opts.map((o, n) => { const f = FOOD_BY_ID[o.id]; return '<button type="button" class="ap-ex" data-so="' + n + '"><span class="ap-exn"><b>' + esc(nameOf(f)) + '</b></span><em>' + r5(o.g * k) + ' ' + esc(L('جم', 'g')) + '</em></button>'; }).join('') + '<div class="ap-note">' + esc(L('الكمية متظبطة تقريبًا على نفس القيمة الغذائية.', 'The amount is adjusted to roughly match the nutrition.')) + '</div></div>' : '<div class="ap-empty small">' + esc(L('مفيش بدائل مناسبة للمكون ده.', 'No suitable swaps for this ingredient.')) + '</div>';
    try { box.scrollIntoView({ block: 'nearest' }); } catch (e) { /* تجاهل */ }
    const x = $('#ap-swx', box); if (x) x.addEventListener('click', () => { box.innerHTML = ''; });
    $$('[data-so]', box).forEach((s) => s.addEventListener('click', () => { const o = opts[Number(s.dataset.so)]; plus.rswap = plus.rswap || {}; plus.rswap[r.id] = plus.rswap[r.id] || {}; plus.rswap[r.id][i] = { id: o.id, g: o.g }; persist(); draw(); }));
  }));
  $('#ap-rlog', body).addEventListener('click', () => { foodToday().push({ id: 'recipe:' + r.id, name: nameOf(r), g: Math.round(t.g), kcal: t.kcal, p: t.p }); persist(); toast(L('اتسجلت في أكلي', 'Logged in My food')); });
  $('#ap-rcart', body).addEventListener('click', () => { plus.cart = plus.cart || {}; rIng(r).forEach((it) => { const c = plus.cart[it.id] || { g: 0, done: 0 }; c.g += it.g * k; c.done = 0; plus.cart[it.id] = c; }); persist(); toast(L('اتضافت للمشتريات', 'Added to the shopping list')); });
  $('#ap-rfav', body).addEventListener('click', () => { if (plus.fav[r.id]) delete plus.fav[r.id]; else plus.fav[r.id] = 1; persist(); draw(); });
  $('#ap-rshare', body).addEventListener('click', async () => {
    const text = nameOf(r) + '\n' + rIng(r).map((it) => '- ' + (FOOD_BY_ID[it.id] ? nameOf(FOOD_BY_ID[it.id]) : it.id) + ': ' + r5(it.g * k) + L(' جم', ' g')).join('\n') + '\n\n' + r.st[lang()].map((s, i) => (i + 1) + '. ' + s).join('\n') + '\n\nADAM - adamxfit.com';
    try { if (navigator.share) await navigator.share({ title: nameOf(r), text: text }); else if (navigator.clipboard) { await navigator.clipboard.writeText(text); toast(L('اتنسخت الوصفة', 'Recipe copied')); } } catch (e) { /* ألغى */ }
  });
}
function viewCart(body) {
  plus.cart = plus.cart || {};
  const ids = Object.keys(plus.cart);
  const fmt = (g) => (g >= 1000 ? (Math.round(g / 100) / 10) + ' ' + L('كجم', 'kg') : r5(g) + ' ' + L('جم', 'g'));
  let h = chips(R_MEALS.map((m) => [m[0], L(m[1], m[2])]), 'cart', 'rm');
  h += '<div class="ap-sec"><b>' + esc(L('قايمة مشترياتي', 'My shopping list')) + '</b></div>';
  if (!ids.length) h += '<div class="ap-empty small">' + esc(L('القايمة فاضية. افتح أي وصفة واضغط "ضيفها للمشتريات".', 'The list is empty. Open a recipe and tap "Add to shopping list".')) + '</div>';
  else {
    const CATS = ['protein', 'dairy', 'carb', 'veg', 'fruit', 'fat', 'dish', 'drink', 'supplement'];
    ids.sort((a, b) => CATS.indexOf((FOOD_BY_ID[a] || {}).cat) - CATS.indexOf((FOOD_BY_ID[b] || {}).cat));
    h += '<div class="ap-card">' + ids.map((id) => '<label class="ap-task"><input type="checkbox" data-cg="' + esc(id) + '"' + (plus.cart[id].done ? ' checked' : '') + '><span>' + esc(FOOD_BY_ID[id] ? nameOf(FOOD_BY_ID[id]) : id) + ' — ' + esc(fmt(plus.cart[id].g)) + '</span></label>').join('') + '</div><div class="ap-actions"><button type="button" class="ap-btn ghost" id="ap-cshare2">' + esc(L('شارك القايمة', 'Share list')) + '</button><button type="button" class="ap-btn ghost" id="ap-cclean">' + esc(L('شيل اللي اشتريته', 'Remove bought items')) + '</button><button type="button" class="ap-btn danger" id="ap-cclear">' + esc(L('امسح الكل', 'Clear all')) + '</button></div>';
  }
  body.innerHTML = h;
  $$('[data-rm]', body).forEach((b) => b.addEventListener('click', () => { sub.rmeal = b.dataset.rm; draw(); }));
  $$('[data-cg]', body).forEach((c) => c.addEventListener('change', () => { plus.cart[c.dataset.cg].done = c.checked ? 1 : 0; persist(); }));
  const sh = $('#ap-cshare2', body); if (sh) sh.addEventListener('click', async () => { const text = ids.map((id) => '- ' + (FOOD_BY_ID[id] ? nameOf(FOOD_BY_ID[id]) : id) + ': ' + fmt(plus.cart[id].g)).join('\n'); try { if (navigator.share) await navigator.share({ title: L('قايمة المشتريات', 'Shopping list'), text: text }); else if (navigator.clipboard) { await navigator.clipboard.writeText(text); toast(L('اتنسخت القايمة', 'Copied')); } } catch (e) { /* ألغى */ } });
  const cl = $('#ap-cclean', body); if (cl) cl.addEventListener('click', () => { ids.forEach((id) => { if (plus.cart[id].done) delete plus.cart[id]; }); persist(); draw(); });
  const ca = $('#ap-cclear', body); if (ca) ca.addEventListener('click', () => { if (window.confirm(L('تمسح القايمة كلها؟', 'Clear the whole list?'))) { plus.cart = {}; persist(); draw(); } });
}

/* ================================================================ عدد الوجبات */
function mealGroups(day, n) {
  const keys = Object.keys(day).filter((k) => (day[k] || []).length);
  const mk = (list) => { const m = {}; list.forEach((it) => { m[it.id] = (m[it.id] || 0) + it.g; }); return Object.keys(m).map((id) => ({ id: id, g: m[id] })); };
  const nm = (k) => (MEAL_NAME[k] ? L(MEAL_NAME[k][0], MEAL_NAME[k][1]) : k);
  if (!n || n >= keys.length) return keys.map((k) => ({ name: nm(k), items: day[k] }));
  const kc = keys.map((k) => dayTotals({ x: day[k] }, 1).kcal);
  let best = null;
  const cuts = [];
  const rec = (start, left) => {
    if (left === 0) { const b = [0].concat(cuts, [keys.length]); let mx = 0; for (let i = 0; i < b.length - 1; i++) { const s = kc.slice(b[i], b[i + 1]).reduce((a, x) => a + x, 0); if (s > mx) mx = s; } if (!best || mx < best.mx) best = { mx: mx, b: b.slice() }; return; }
    for (let i = start; i <= keys.length - left; i++) { cuts.push(i); rec(i + 1, left - 1); cuts.pop(); }
  };
  rec(1, n - 1);
  const names = n === 3 ? [nm('breakfast'), nm('lunch'), nm('dinner')] : n === 2 ? [L('الوجبة الأولى', 'First meal'), L('الوجبة التانية', 'Second meal')] : [L('وجبة واحدة', 'One meal')];
  const out = [];
  for (let i = 0; i < best.b.length - 1; i++) { const items = []; keys.slice(best.b[i], best.b[i + 1]).forEach((k) => items.push.apply(items, day[k])); out.push({ name: names[i], items: mk(items) }); }
  return out;
}

/* ================================================================ ملفي (بيانات + صوت + ساعة) */
function guestBanner() {
  if (EMAIL || sub.noGuestBar) return '';
  return '<div class="ap-guest"><span>' + esc(L('إنت داخل كزائر: بياناتك محفوظة على جهازك بس.', 'You are a guest: your data is saved on this device only.')) + '</span><button type="button" class="ap-btn small" id="ap-gsign">' + esc(L('سجّل عشان تتحفظ', 'Sign up to keep it')) + '</button></div>';
}
function wireGuest(body) {
  const b = $('#ap-gsign', body); if (!b) return;
  b.addEventListener('click', () => { close(); const s = document.getElementById('welcome-start-btn'); if (s) s.click(); });
}
function viewMe(body) {
  const pr = plus.profile || {}; const d = Object.assign({ name: '', sex: 'm', age: 28, weight: 80, height: 175, act: 1.375, goal: 'maintain' }, pr, sub.me || {});
  const c = cfg();
  let h = guestBanner();
  if (sub.first && !plus.profile) h += '<div class="ap-card ap-win"><b>' + esc(L('أهلاً بيك في ADAM', 'Welcome to ADAM')) + '</b><small class="mu">' + esc(L('عرّفنا بنفسك عشان نظبط لك الأرقام، أو اتخطّى وجرّب الأول.', 'Tell us about you to tune the numbers, or skip and look around first.')) + '</small></div>';
  h += '<div class="ap-sec"><b>' + esc(L('بياناتك', 'About you')) + '</b></div><div class="ap-card ap-form">';
  h += '<div class="ap-q" style="display:flex;align-items:center;gap:12px"><div style="width:72px;height:72px;border-radius:50%;overflow:hidden;background:rgba(127,127,127,.2);display:flex;align-items:center;justify-content:center;font-size:30px;flex:none">' + (d.photo ? '<img src="' + esc(d.photo) + '" alt="" style="width:100%;height:100%;object-fit:cover">' : '👤') + '</div><div><button type="button" class="ap-btn ghost small" id="me-photo-b">' + esc(d.photo ? L('غيّر الصورة', 'Change photo') : L('أضف صورة', 'Add photo')) + '</button>' + (d.photo ? ' <button type="button" class="ap-btn ghost small" id="me-photo-x">' + esc(L('امسح', 'Remove')) + '</button>' : '') + '<input id="me-photo" type="file" accept="image/*" hidden></div></div>';
  h += '<label>' + esc(L('الاسم', 'Name')) + '<input id="me-name" type="text" maxlength="40" value="' + esc(d.name) + '"></label>';
  h += '<label>' + esc(L('رقم التليفون (اختياري)', 'Phone number (optional)')) + '<input id="me-phone" type="tel" inputmode="tel" dir="ltr" maxlength="20" placeholder="01xxxxxxxxx" value="' + esc(d.phone || '') + '"></label><small class="mu">' + esc(L('الصورة والرقم محفوظين لحسابك بس ومش بيظهروا لحد تاني.', 'Photo and number are kept on your account only and are not shown to anyone else.')) + '</small>';
  h += '<div class="ap-q"><b>' + esc(L('الجنس', 'Sex')) + '</b>' + chips([['m', L('ذكر', 'Male')], ['f', L('أنثى', 'Female')]], d.sex, 'mes') + '</div>';
  h += '<div class="ap-three"><label>' + esc(L('السن', 'Age')) + '<input id="me-age" type="number" min="10" max="90" value="' + d.age + '"></label><label>' + esc(L('الوزن (كجم)', 'Weight (kg)')) + '<input id="me-w" type="number" min="30" max="250" value="' + d.weight + '"></label><label>' + esc(L('الطول (سم)', 'Height (cm)')) + '<input id="me-h" type="number" min="100" max="230" value="' + d.height + '"></label></div>';
  h += '<div class="ap-q"><b>' + esc(L('مستوى النشاط', 'Activity level')) + '</b>' + chips(ACT.map((a) => [a[0], L(a[1], a[2])]), d.act, 'mea') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('هدفك', 'Goal')) + '</b>' + chips([['lose', L('تنزيل وزن', 'Lose weight')], ['maintain', L('تثبيت', 'Maintain')], ['gain', L('زيادة عضل', 'Gain muscle')]], d.goal, 'meg') + '</div>';
  h += '<div class="ap-actions"><button type="button" class="ap-btn" id="me-save">' + esc(L('احفظ', 'Save')) + '</button>' + (sub.first && !plus.profile ? '<button type="button" class="ap-btn ghost" id="me-skip">' + esc(L('اتخطّى', 'Skip')) + '</button>' : '') + '</div>';
  if (plus.profile) {
    const bmi = d.weight / Math.pow(d.height / 100, 2);
    h += '<div class="ap-macros"><div><b>' + bmi.toFixed(1) + '</b><small>BMI</small></div><div><b>' + calcTarget(Object.assign({}, d, { weight: Number(d.weight), height: Number(d.height), age: Number(d.age) })) + '</b><small>' + esc(L('سعرة مقترحة', 'kcal target')) + '</small></div><div><b>' + (220 - Number(d.age)) + '</b><small>' + esc(L('أقصى نبض تقديري', 'est. max HR')) + '</small></div></div><small class="mu">' + esc(L('أرقام تقديرية للياقة العامة.', 'Estimates for general fitness.')) + '</small>';
  }
  h += '</div>';
  h += '<div class="ap-sec"><b>' + esc(L('الصوت والاهتزاز', 'Sound and vibration')) + '</b></div><div class="ap-card">';
  h += '<div class="ap-q"><b>' + esc(L('أثناء التمرين', 'During workouts')) + '</b>' + chips([['chime', L('نغمة', 'Chime')], ['voice', L('نغمة وصوت (أحسنت)', 'Chime and voice (Nice work)')], ['off', L('صامت', 'Muted')]], c.snd, 'mesn') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('الاهتزاز', 'Vibration')) + '</b>' + chips([['1', L('شغّال', 'On')], ['0', L('مقفول', 'Off')]], c.vib === false ? '0' : '1', 'mevb') + '<small class="mu">' + esc(L('الاهتزاز بيشتغل على أندرويد. آيفون بيمنعه المتصفح.', 'Vibration works on Android. iPhone browsers block it.')) + '</small></div>';
  h += '<div class="ap-q"><b>' + esc(L('راحة بين السيتات', 'Rest between sets')) + '</b>' + chips([30, 45, 60, 90, 120].map((n) => [n, n + L(' ث', 's')]), c.rest, 'mers') + '</div>';
  h += '<div class="ap-q"><b>' + esc(L('إحماء قبل كل تمرين', 'Warm-up before every workout')) + '</b>' + chips([['1', L('أيوه', 'Yes')], ['0', L('لأ', 'No')]], c.warm ? '1' : '0', 'mewm') + '</div>';
  h += '<div class="ap-actions"><button type="button" class="ap-btn ghost" id="me-test">' + esc(L('جرّب الصوت', 'Test sound')) + '</button></div></div>';
  h += '<div class="ap-sec"><b>' + esc(L('ربط الساعة بالبلوتوث', 'Connect a watch via Bluetooth')) + '</b></div><div class="ap-card"><div id="ap-php" class="ap-php">' + hrHtml() + '</div>';
  h += '<p class="ap-p">' + esc(L('هنقرا نبضك لايف أثناء التمرين ونعرض منطقة المجهود ومتوسط النبض بعد الجلسة.', 'We read your heart rate live during workouts and show the effort zone and the session average.')) + '</p>';
  h += '<div class="ap-step"><div class="ap-wk">1</div><div class="ap-st"><span class="ap-p">' + esc(L('على الساعة فعّل "بث النبض" (Garmin: Broadcast Heart Rate، Amazfit/Zepp: مشاركة النبض، Huawei: مشاركة بيانات النبض، Polar/Wahoo وأحزمة الصدر شغالة مباشرة).', 'On the watch enable heart-rate broadcast (Garmin: Broadcast Heart Rate, Amazfit/Zepp and Huawei: share heart rate; Polar/Wahoo chest straps work directly).')) + '</span></div></div>';
  h += '<div class="ap-step"><div class="ap-wk">2</div><div class="ap-st"><span class="ap-p">' + esc(L('افتح ADAM على Chrome في أندرويد أو الكمبيوتر، وابدأ أي تمرين واضغط "وصّل الساعة" واختار ساعتك.', 'Open ADAM in Chrome on Android or desktop, start a workout, tap "Connect watch" and pick your watch.')) + '</span></div></div>';
  h += '<div class="ap-step"><div class="ap-wk">3</div><div class="ap-st"><span class="ap-p">' + esc(L('آيفون وSafari مش بيدعموا بلوتوث الويب. ساعة Apple مش بتبث النبض بنفسها وتحتاج تطبيق بث تاني.', 'iPhone and Safari do not support Web Bluetooth. Apple Watch does not broadcast heart rate by itself and needs a separate broadcasting app.')) + '</span></div></div>';
  h += '<div class="ap-note">' + esc(hrOk() ? L('المتصفح ده بيدعم البلوتوث.', 'This browser supports Bluetooth.') : L('المتصفح ده مش بيدعم البلوتوث.', 'This browser does not support Bluetooth.')) + '</div></div>';
  const ss = plus.sessions || [];
  if (ss.length) h += '<div class="ap-sec"><b>' + esc(L('آخر جلساتي', 'My recent sessions')) + '</b></div><div class="ap-card">' + ss.slice(0, 8).map((x) => '<div class="ap-food"><span>' + esc(x.t || L('تمرين', 'Workout')) + ' <small class="mu">' + esc(x.d) + '</small></span><em>' + Math.max(1, Math.round(x.s / 60)) + esc(L(' د', ' min')) + (x.avg ? ' · ' + x.avg + ' bpm' : '') + '</em></div>').join('') + '</div>';
  body.innerHTML = h;
  wireGuest(body);
  const re = () => viewMe(body);
  const rd = () => ({ name: ($('#me-name', body) || {}).value || '', phone: (($('#me-phone', body) || {}).value || '').replace(/[^0-9+ ]/g, '').trim(), age: Number(($('#me-age', body) || {}).value) || d.age, weight: Number(($('#me-w', body) || {}).value) || d.weight, height: Number(($('#me-h', body) || {}).value) || d.height });
  const set = (attr, key, num) => $$('[data-' + attr + ']', body).forEach((b) => b.addEventListener('click', () => { sub.me = Object.assign({}, d, rd()); sub.me[key] = num ? Number(b.dataset[attr]) : b.dataset[attr]; re(); }));
  set('mes', 'sex'); set('mea', 'act', true); set('meg', 'goal');
  const upd = (o) => { plus.set = Object.assign({}, plus.set || {}, o); persist(); re(); };
  $$('[data-mesn]', body).forEach((b) => b.addEventListener('click', () => { upd({ snd: b.dataset.mesn }); cue('set'); }));
  $$('[data-mevb]', body).forEach((b) => b.addEventListener('click', () => { upd({ vib: b.dataset.mevb === '1' }); buzz(120); }));
  $$('[data-mers]', body).forEach((b) => b.addEventListener('click', () => upd({ rest: Number(b.dataset.mers) })));
  $$('[data-mewm]', body).forEach((b) => b.addEventListener('click', () => upd({ warm: b.dataset.mewm === '1' })));
  $('#me-test', body).addEventListener('click', () => { cue('done'); });
  const pb = $('#me-photo-b', body), pf2 = $('#me-photo', body), px = $('#me-photo-x', body);
  if (pb) pb.addEventListener('click', () => pf2.click());
  if (px) px.addEventListener('click', () => { sub.me = Object.assign({}, d, rd(), { photo: '' }); re(); });
  if (pf2) pf2.addEventListener('change', () => {
    const file = pf2.files && pf2.files[0]; if (!file) return;
    const img = new Image(); const url = URL.createObjectURL(file);
    img.onload = () => {
      try {
        const S = 240, k = Math.min(img.width, img.height), cv = document.createElement('canvas'); cv.width = cv.height = S;
        cv.getContext('2d').drawImage(img, (img.width - k) / 2, (img.height - k) / 2, k, k, 0, 0, S, S);
        sub.me = Object.assign({}, d, rd(), { photo: cv.toDataURL('image/jpeg', 0.78) }); URL.revokeObjectURL(url); re();
      } catch (e) { toast(L('الصورة مش متاحة', 'Could not use this photo')); }
    };
    img.onerror = () => toast(L('الصورة مش متاحة', 'Could not use this photo'));
    img.src = url;
  });
  $('#me-save', body).addEventListener('click', () => {
    const v = Object.assign({}, d, rd());
    if (!(v.age >= 10 && v.weight >= 30 && v.height >= 100)) { toast(L('راجع السن والوزن والطول', 'Check age, weight and height')); return; }
    plus.profile = { name: v.name.trim().slice(0, 40), sex: v.sex, age: v.age, weight: v.weight, height: v.height, act: v.act, goal: v.goal, phone: v.phone || '', photo: v.photo || '' };
    sub.me = null; sub.first = false; persist(); toast(L('اتحفظت بياناتك', 'Saved')); re();
  });
  const sk = $('#me-skip', body); if (sk) sk.addEventListener('click', () => { plus.skipProfile = true; persist(); go('journeys'); });
  const phr = $('#ap-phr', body); if (phr) phr.addEventListener('click', async () => { await connectHR(); const el = $('#ap-php', body); if (el) el.innerHTML = hrHtml(); const dc = document.getElementById('ap-hrdc'); });
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
