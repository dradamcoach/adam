/* ADAM Brand — محرك البراند: المدرب (وبعدين الصالة/النادي/المتجر) يخصص اسم وصورة وتصميم،
   والعميل اللي عنده يشوف التطبيق بشكله. لا يلمس Firestore مباشرة: بيستخدم window.__adamFb
   اللي معرّفه app.js. كل النصوص بتتحط بـ textContent، واللون من قايمة ثيمات ثابتة بس. */

var THEMES = [
  { id: 'emerald', ar: 'زمردي', en: 'Emerald', brand: '#22c55e', dark: '#16a34a', bg: '#0b1220', surface: '#151f33', line: '#2a3b57' },
  { id: 'ocean',   ar: 'محيط',  en: 'Ocean',   brand: '#38bdf8', dark: '#0ea5e9', bg: '#08121f', surface: '#102238', line: '#25405f' },
  { id: 'violet',  ar: 'بنفسجي', en: 'Violet',  brand: '#a78bfa', dark: '#8b5cf6', bg: '#0f0b1f', surface: '#1b1533', line: '#3a2f5e' },
  { id: 'sunset',  ar: 'غروب',  en: 'Sunset',  brand: '#fb923c', dark: '#ea580c', bg: '#140d09', surface: '#24170f', line: '#4a3022' },
  { id: 'rose',    ar: 'وردي',  en: 'Rose',    brand: '#fb7185', dark: '#e11d48', bg: '#150a10', surface: '#25121b', line: '#4d2535' },
  { id: 'gold',    ar: 'ذهبي',  en: 'Gold',    brand: '#facc15', dark: '#ca8a04', bg: '#0e0d08', surface: '#1d1b0f', line: '#413c1c' }
];

var cache = {};
var current = null;
var overlay = null;

function isAr() { return (document.documentElement.lang || 'ar') === 'ar'; }
function L(ar, en) { return isAr() ? ar : en; }
function themeOf(id) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i]; return THEMES[0]; }
function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
function fb() { return window.__adamFb || null; }
function validLogo(s) { return typeof s === 'string' && s.indexOf('data:image/') === 0 && s.length < 200000; }
function clean(s, n) { return String(s == null ? '' : s).replace(/[<>]/g, '').trim().slice(0, n); }

function brandName(b) {
  var a = clean(b.name_ar, 40), e = clean(b.name_en, 40);
  return isAr() ? (a || e) : (e || a);
}
function brandWelcome(b) {
  var a = clean(b.welcome_ar, 160), e = clean(b.welcome_en, 160);
  return isAr() ? (a || e) : (e || a);
}

/* ---------- تطبيق البراند على الصفحة ---------- */
function setVars(th) {
  var s = document.documentElement.style;
  s.setProperty('--brand', th.brand); s.setProperty('--brand-dark', th.dark);
  s.setProperty('--bg', th.bg); s.setProperty('--surface', th.surface); s.setProperty('--line', th.line);
  var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', th.bg);
}
function clearVars() {
  var s = document.documentElement.style;
  ['--brand', '--brand-dark', '--bg', '--surface', '--line'].forEach(function (k) { s.removeProperty(k); });
  var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', '#060b17');
}
function paintBrand() {
  var h1 = document.querySelector('body > h1');
  var old = document.getElementById('brand-logo'); if (old) old.remove();
  var pw = document.getElementById('brand-powered'); if (pw) pw.remove();
  if (!current) {
    if (h1) h1.textContent = 'ADAM';
    document.title = 'ADAM';
    var at = document.querySelector('meta[name="apple-mobile-web-app-title"]'); if (at) at.setAttribute('content', 'ADAM');
    return;
  }
  var b = current.brand, adm = current.admin || {};
  var name = brandName(b) || 'ADAM';
  if (h1) h1.textContent = name;
  document.title = name;
  var at2 = document.querySelector('meta[name="apple-mobile-web-app-title"]'); if (at2) at2.setAttribute('content', name);
  if (h1 && validLogo(b.logo)) {
    var img = el('img', 'brand-logo'); img.id = 'brand-logo'; img.alt = name; img.src = b.logo;
    h1.parentNode.insertBefore(img, h1);
  }
  if (!adm.hidePowered) {
    var p = el('div', 'brand-powered', L('مدعوم بـ ADAM', 'Powered by ADAM')); p.id = 'brand-powered';
    document.body.appendChild(p);
  }
}
function welcomeOnce(key) {
  if (!current) return;
  var w = brandWelcome(current.brand); if (!w) return;
  try { if (sessionStorage.getItem('brandWelcome:' + key)) return; sessionStorage.setItem('brandWelcome:' + key, '1'); } catch (e) { /* تجاهل */ }
  var box = el('div', 'brand-welcome');
  box.appendChild(el('strong', '', brandName(current.brand)));
  box.appendChild(el('span', '', w));
  var x = el('button', 'brand-welcome-x', L('تمام', 'OK')); x.type = 'button';
  x.addEventListener('click', function () { box.remove(); });
  box.appendChild(x);
  document.body.appendChild(box);
  setTimeout(function () { if (box.parentNode) box.remove(); }, 9000);
}

async function load(email) {
  email = String(email || '').toLowerCase();
  if (!email || !fb()) return null;
  if (cache[email] !== undefined) return cache[email];
  var r = null;
  try { r = await fb().getBrand(email); } catch (e) { r = null; }
  cache[email] = r;
  return r;
}

export async function apply(email, opts) {
  var r = await load(email);
  var usable = r && r.brand && !(r.admin && r.admin.disabled) && (clean(r.brand.name_ar, 40) || clean(r.brand.name_en, 40) || validLogo(r.brand.logo) || r.brand.theme);
  if (!usable) { reset(); return false; }
  current = r;
  setVars(themeOf(r.brand.theme));
  paintBrand();
  if (!opts || opts.welcome !== false) welcomeOnce(email);
  return true;
}
export function reset() { current = null; clearVars(); paintBrand(); }
export function forget(email) { delete cache[String(email || '').toLowerCase()]; }

try {
  new MutationObserver(function () { if (current) paintBrand(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
} catch (e) { /* تجاهل */ }

/* ---------- تصغير الصورة قبل الحفظ ---------- */
function shrink(file) {
  return new Promise(function (res, rej) {
    var fr = new FileReader();
    fr.onerror = function () { rej(new Error('read')); };
    fr.onload = function () {
      var im = new Image();
      im.onerror = function () { rej(new Error('img')); };
      im.onload = function () {
        var S = 256, c = document.createElement('canvas'); c.width = S; c.height = S;
        var x = c.getContext('2d'), k = Math.max(S / im.width, S / im.height);
        var w = im.width * k, h = im.height * k;
        x.fillStyle = '#0b1220'; x.fillRect(0, 0, S, S);
        x.drawImage(im, (S - w) / 2, (S - h) / 2, w, h);
        res(c.toDataURL('image/jpeg', 0.82));
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

/* ---------- شاشة "براندي" ---------- */
export async function openEditor(email, opts) {
  opts = opts || {};
  email = String(email || '').toLowerCase();
  if (!email || !fb()) return;
  forget(email);
  var r = (await load(email)) || {};
  var adm = r.admin || {};
  var b = Object.assign({ name_ar: '', name_en: '', logo: '', theme: 'emerald', welcome_ar: '', welcome_en: '' }, r.brand || {});
  var isAdmin = !!opts.admin;
  if (overlay) overlay.remove();
  overlay = el('div', 'brand-ov');
  var sheet = el('div', 'brand-sheet'); overlay.appendChild(sheet);

  var head = el('div', 'brand-head');
  head.appendChild(el('h3', '', isAdmin ? L('براند: ', 'Brand: ') + email : L('براندي', 'My brand')));
  var close = el('button', 'brand-x', '×'); close.type = 'button'; close.setAttribute('aria-label', L('إغلاق', 'Close'));
  close.addEventListener('click', function () { overlay.remove(); overlay = null; });
  head.appendChild(close); sheet.appendChild(head);

  if (adm.disabled && !isAdmin) {
    sheet.appendChild(el('p', 'brand-note', L('ميزة البراند متوقفة على حسابك من إدارة المنصة.', 'Branding is turned off for your account by the platform.')));
    document.body.appendChild(overlay); return;
  }
  sheet.appendChild(el('p', 'brand-note', L('اللي تكتبه هنا هو اللي العملاء بتوعك هيشوفوه لما يدخلوا التطبيق.', 'This is exactly what your clients will see when they open the app.')));

  function field(label, input) { var w = el('label', 'brand-f'); w.appendChild(el('span', '', label)); w.appendChild(input); return w; }
  function txt(val, ph, max) { var i = el('input'); i.type = 'text'; i.value = val || ''; i.placeholder = ph; i.maxLength = max; return i; }
  var nAr = txt(b.name_ar, 'اسم البرنامج', 40), nEn = txt(b.name_en, 'App name', 40);
  var wAr = txt(b.welcome_ar, 'أهلاً بيك، جاهز نبدأ؟', 160), wEn = txt(b.welcome_en, 'Welcome, ready to start?', 160);
  nEn.dir = 'ltr'; wEn.dir = 'ltr';
  sheet.appendChild(field(L('اسم البرنامج (عربي)', 'App name (Arabic)'), nAr));
  sheet.appendChild(field(L('اسم البرنامج (إنجليزي)', 'App name (English)'), nEn));

  var logoWrap = el('div', 'brand-logo-row');
  var prevImg = el('img', 'brand-logo-prev'); prevImg.alt = '';
  var logoVal = validLogo(b.logo) ? b.logo : '';
  function showLogo() { if (logoVal) { prevImg.src = logoVal; prevImg.style.display = ''; } else { prevImg.removeAttribute('src'); prevImg.style.display = 'none'; } }
  showLogo();
  var pick = el('button', 'brand-btn', L('اختار صورة / لوجو', 'Choose photo / logo')); pick.type = 'button';
  var file = el('input'); file.type = 'file'; file.accept = 'image/*'; file.style.display = 'none';
  pick.addEventListener('click', function () { file.click(); });
  file.addEventListener('change', async function () {
    if (!file.files || !file.files[0]) return;
    try { logoVal = await shrink(file.files[0]); showLogo(); } catch (e) { msg.textContent = L('الصورة مش مقروءة، جرب غيرها', 'Could not read that image'); }
  });
  var rm = el('button', 'brand-btn ghost', L('شيل الصورة', 'Remove')); rm.type = 'button';
  rm.addEventListener('click', function () { logoVal = ''; showLogo(); });
  logoWrap.appendChild(prevImg); logoWrap.appendChild(pick); logoWrap.appendChild(rm); logoWrap.appendChild(file);
  sheet.appendChild(logoWrap);

  sheet.appendChild(el('div', 'brand-lbl', L('التصميم', 'Design')));
  var sw = el('div', 'brand-sw'), themeVal = b.theme || 'emerald';
  function paintSw() {
    sw.innerHTML = '';
    THEMES.forEach(function (th) {
      var d = el('button', 'brand-chip' + (th.id === themeVal ? ' on' : ''));
      d.type = 'button'; d.style.setProperty('--c', th.brand); d.style.setProperty('--b', th.surface);
      d.appendChild(el('i')); d.appendChild(el('span', '', isAr() ? th.ar : th.en));
      d.addEventListener('click', function () { themeVal = th.id; paintSw(); paintPrev(); });
      sw.appendChild(d);
    });
  }
  sheet.appendChild(sw);

  sheet.appendChild(field(L('رسالة ترحيب (عربي)', 'Welcome message (Arabic)'), wAr));
  sheet.appendChild(field(L('رسالة ترحيب (إنجليزي)', 'Welcome message (English)'), wEn));

  var prev = el('div', 'brand-prev'); sheet.appendChild(el('div', 'brand-lbl', L('معاينة', 'Preview'))); sheet.appendChild(prev);
  function paintPrev() {
    var th = themeOf(themeVal);
    prev.style.setProperty('--c', th.brand); prev.style.setProperty('--b', th.bg); prev.style.setProperty('--s', th.surface);
    prev.innerHTML = '';
    if (logoVal) { var im = el('img', 'brand-prev-logo'); im.src = logoVal; im.alt = ''; prev.appendChild(im); }
    prev.appendChild(el('div', 'brand-prev-name', (isAr() ? (nAr.value || nEn.value) : (nEn.value || nAr.value)) || 'ADAM'));
    var w = isAr() ? (wAr.value || wEn.value) : (wEn.value || wAr.value);
    if (w) prev.appendChild(el('div', 'brand-prev-w', w));
    var bt = el('div', 'brand-prev-btn', L('ابدأ تمرينك', 'Start workout')); prev.appendChild(bt);
    if (!(adm && adm.hidePowered)) prev.appendChild(el('div', 'brand-prev-pw', L('مدعوم بـ ADAM', 'Powered by ADAM')));
  }
  [nAr, nEn, wAr, wEn].forEach(function (i) { i.addEventListener('input', paintPrev); });
  paintSw(); paintPrev();
  prevImg.addEventListener('load', paintPrev);

  var admBox = null, dis, hide;
  if (isAdmin) {
    admBox = el('div', 'brand-adm');
    admBox.appendChild(el('div', 'brand-lbl', L('صلاحيات الإدارة', 'Platform controls')));
    function chk(label, val) { var w = el('label', 'brand-chk'); var c = el('input'); c.type = 'checkbox'; c.checked = !!val; w.appendChild(c); w.appendChild(el('span', '', label)); admBox.appendChild(w); return c; }
    dis = chk(L('أوقف البراند عن المدرب ده', 'Turn off branding for this coach'), adm.disabled);
    hide = chk(L('شيل "مدعوم بـ ADAM"', 'Hide "Powered by ADAM"'), adm.hidePowered);
    sheet.appendChild(admBox);
  }

  var msg = el('p', 'brand-msg'); sheet.appendChild(msg);
  var row = el('div', 'brand-actions');
  var save = el('button', 'brand-btn primary', L('حفظ', 'Save')); save.type = 'button';
  var reset0 = el('button', 'brand-btn ghost', L('رجّعني لـ ADAM', 'Reset to ADAM')); reset0.type = 'button';
  row.appendChild(save); row.appendChild(reset0); sheet.appendChild(row);

  save.addEventListener('click', async function () {
    save.disabled = true; msg.textContent = L('بحفظ...', 'Saving...');
    try {
      var data = { name_ar: clean(nAr.value, 40), name_en: clean(nEn.value, 40), logo: logoVal, theme: themeVal, welcome_ar: clean(wAr.value, 160), welcome_en: clean(wEn.value, 160), updatedAt: new Date().toISOString() };
      var admin = isAdmin ? { disabled: !!dis.checked, hidePowered: !!hide.checked } : null;
      await fb().setBrand(email, data, admin);
      forget(email);
      msg.textContent = L('تم الحفظ', 'Saved');
      if (!isAdmin || email === String(opts.self || '').toLowerCase()) await apply(email, { welcome: false });
    } catch (e) { msg.textContent = L('معرفناش نحفظ، جرب تاني', 'Could not save, try again'); }
    save.disabled = false;
  });
  reset0.addEventListener('click', async function () {
    reset0.disabled = true;
    try { await fb().setBrand(email, null, null); forget(email); if (!isAdmin) reset(); msg.textContent = L('اترجع لـ ADAM', 'Reset to ADAM'); } catch (e) { msg.textContent = L('معرفناش نرجّع', 'Could not reset'); }
    reset0.disabled = false;
  });
  document.body.appendChild(overlay);
}

/* ---------- قايمة المدربين (للإدارة) ---------- */
export async function openAdminList(selfEmail) {
  if (!fb()) return;
  var list = []; try { list = await fb().listCoaches(); } catch (e) { list = []; }
  if (overlay) overlay.remove();
  overlay = el('div', 'brand-ov'); var sheet = el('div', 'brand-sheet'); overlay.appendChild(sheet);
  var head = el('div', 'brand-head'); head.appendChild(el('h3', '', L('براند المدربين', 'Coach brands')));
  var close = el('button', 'brand-x', '×'); close.type = 'button';
  close.addEventListener('click', function () { overlay.remove(); overlay = null; }); head.appendChild(close); sheet.appendChild(head);
  if (!list.length) sheet.appendChild(el('p', 'brand-note', L('مفيش مدربين لسه', 'No coaches yet')));
  list.forEach(function (c) {
    var r = el('div', 'brand-li');
    var nm = el('div', 'brand-li-t'); nm.appendChild(el('strong', '', c.name || c.email)); nm.appendChild(el('span', '', (c.brandName ? c.brandName + ' · ' : '') + c.email));
    var bt = el('button', 'brand-btn', L('تعديل', 'Edit')); bt.type = 'button';
    bt.addEventListener('click', function () { openEditor(c.email, { admin: true, self: selfEmail }); });
    r.appendChild(nm); r.appendChild(bt); sheet.appendChild(r);
  });
  document.body.appendChild(overlay);
}
