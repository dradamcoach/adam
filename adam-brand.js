/* ADAM Brand — محرك البراند: المدرب (وبعدين الصالة/النادي/المتجر) يخصص اسم وصورة وتصميم،
   والعميل اللي عنده يشوف التطبيق بشكله. لا يلمس Firestore مباشرة: بيستخدم window.__adamFb
   اللي معرّفه app.js. كل النصوص بتتحط بـ textContent، واللون من قايمة ثيمات ثابتة بس. */

/* القيم المسموحة فقط (مفيش CSS حر) */
var RADII = ['sharp', 'soft', 'round'];
var CARDS = ['glass', 'solid', 'outline', 'flat'];
var BGS = ['plain', 'gradient', 'grid', 'waves', 'dots', 'stripes'];
var TONES = ['tint', 'neutral', 'black'];
var FONTS = ['cairo', 'tajawal', 'readex', 'changa'];
var FONT_CSS = { cairo: "'Cairo'", tajawal: "'Tajawal'", readex: "'Readex Pro'", changa: "'Changa'" };
var FONT_URL = { tajawal: 'Tajawal:wght@400;700', readex: 'Readex+Pro:wght@400;600', changa: 'Changa:wght@400;700' };
var SWATCHES = ['#22c55e', '#38bdf8', '#a78bfa', '#fb923c', '#fb7185', '#facc15', '#ef4444', '#2dd4bf'];
var LBL = {
  sharp: ['حادة', 'Sharp'], soft: ['ناعمة', 'Soft'], round: ['دائرية', 'Round'],
  glass: ['زجاج', 'Glass'], solid: ['مصمتة', 'Solid'], outline: ['بإطار', 'Outline'], flat: ['مسطحة', 'Flat'],
  plain: ['سادة', 'Plain'], gradient: ['تدرج', 'Glow'], grid: ['شبكة', 'Grid'], waves: ['موجات', 'Waves'], dots: ['نقط', 'Dots'], stripes: ['خطوط', 'Stripes'],
  tint: ['بلون البراند', 'Tinted'], neutral: ['رمادي', 'Neutral'], black: ['أسود', 'Black'],
  cairo: ['القاهرة', 'Cairo'], tajawal: ['تجوال', 'Tajawal'], readex: ['ريدكس', 'Readex'], changa: ['رياضي', 'Changa']
};
/* ثيمات جاهزة حسب الرياضة / التخصص */
var PRESETS = [
  { id: 'gym',        ar: 'جيم وحديد',    en: 'Gym',         c: '#ef4444', r: 'sharp', k: 'outline', g: 'grid',     t: 'black',   f: 'changa' },
  { id: 'football',   ar: 'كرة قدم',      en: 'Football',    c: '#22c55e', r: 'soft',  k: 'solid',   g: 'stripes',  t: 'tint',    f: 'cairo' },
  { id: 'running',    ar: 'جري',          en: 'Running',     c: '#fb923c', r: 'round', k: 'glass',   g: 'gradient', t: 'tint',    f: 'readex' },
  { id: 'swimming',   ar: 'سباحة',        en: 'Swimming',    c: '#22d3ee', r: 'round', k: 'glass',   g: 'waves',    t: 'tint',    f: 'cairo' },
  { id: 'combat',     ar: 'قتال',         en: 'Combat',      c: '#dc2626', r: 'sharp', k: 'solid',   g: 'grid',     t: 'black',   f: 'changa' },
  { id: 'crossfit',   ar: 'كروس فيت',     en: 'CrossFit',    c: '#facc15', r: 'sharp', k: 'outline', g: 'grid',     t: 'black',   f: 'changa' },
  { id: 'basketball', ar: 'سلة',          en: 'Basketball',  c: '#f97316', r: 'soft',  k: 'solid',   g: 'dots',     t: 'tint',    f: 'cairo' },
  { id: 'tennis',     ar: 'تنس',          en: 'Tennis',      c: '#a3e635', r: 'soft',  k: 'glass',   g: 'stripes',  t: 'tint',    f: 'readex' },
  { id: 'yoga',       ar: 'يوجا وتأهيل',  en: 'Yoga & rehab', c: '#a78bfa', r: 'round', k: 'glass',  g: 'gradient', t: 'tint',    f: 'tajawal' },
  { id: 'nutrition',  ar: 'تغذية',        en: 'Nutrition',   c: '#84cc16', r: 'round', k: 'solid',   g: 'dots',     t: 'tint',    f: 'tajawal' },
  { id: 'medical',    ar: 'طبي',          en: 'Medical',     c: '#38bdf8', r: 'soft',  k: 'solid',   g: 'plain',    t: 'neutral', f: 'readex' },
  { id: 'store',      ar: 'متجر',         en: 'Store',       c: '#f43f5e', r: 'soft',  k: 'flat',    g: 'plain',    t: 'neutral', f: 'cairo' },
  { id: 'luxury',     ar: 'فخم',          en: 'Luxury',      c: '#d4af37', r: 'soft',  k: 'outline', g: 'gradient', t: 'black',   f: 'tajawal' }
];
function presetOf(id) { for (var i = 0; i < PRESETS.length; i++) if (PRESETS[i].id === id) return PRESETS[i]; return null; }
var HEX = /^#[0-9a-fA-F]{6}$/;

/* بيرجّع مواصفات نضيفة من أي داتا (من Firestore أو من الموظف الذكي) */
function spec(b) {
  b = b || {};
  var p = presetOf(b.preset);
  function pick(v, list, d) { return list.indexOf(v) !== -1 ? v : d; }
  return {
    preset: p ? p.id : '',
    c: HEX.test(b.c || '') ? b.c.toLowerCase() : (b.theme ? legacyColor(b.theme) : (p ? p.c : '#22c55e')),
    r: pick(b.r, RADII, p ? p.r : 'soft'), k: pick(b.k, CARDS, p ? p.k : 'solid'),
    g: pick(b.g, BGS, p ? p.g : 'plain'), t: pick(b.t, TONES, p ? p.t : 'tint'), f: pick(b.f, FONTS, p ? p.f : 'cairo')
  };
}
function legacyColor(id) { return ({ emerald: '#22c55e', ocean: '#38bdf8', violet: '#a78bfa', sunset: '#fb923c', rose: '#fb7185', gold: '#facc15' })[id] || '#22c55e'; }

/* ألوان مشتقة من لون البراند */
function hsl(hex) {
  var r = parseInt(hex.substr(1, 2), 16) / 255, g = parseInt(hex.substr(3, 2), 16) / 255, b = parseInt(hex.substr(5, 2), 16) / 255;
  var mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, h = 0, s = 0;
  if (mx !== mn) { var d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}
function palette(sp) {
  var h = hsl(sp.c), dark = 'hsl(' + h[0] + ',' + h[1] + '%,' + Math.max(18, Math.round(h[2] * 0.72)) + '%)';
  var bg, surface, line;
  if (sp.t === 'black') { bg = '#060606'; surface = '#121212'; line = '#2a2a2a'; }
  else if (sp.t === 'neutral') { bg = '#0b1018'; surface = '#151b26'; line = '#283142'; }
  else { bg = 'hsl(' + h[0] + ',38%,6%)'; surface = 'hsl(' + h[0] + ',30%,11%)'; line = 'hsl(' + h[0] + ',24%,21%)'; }
  return { brand: sp.c, dark: dark, bg: bg, surface: surface, line: line };
}
function brandInk(hex) { var r = parseInt(hex.substr(1, 2), 16), g = parseInt(hex.substr(3, 2), 16), b = parseInt(hex.substr(5, 2), 16); return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#06101c' : '#ffffff'; }

var cache = {};
var current = null;
var overlay = null;
var loadedFonts = {};

function isAr() { return (document.documentElement.lang || 'ar') === 'ar'; }
function L(ar, en) { return isAr() ? ar : en; }
function lbl(k) { return isAr() ? LBL[k][0] : LBL[k][1]; }
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
function loadFont(f) {
  if (!FONT_URL[f] || loadedFonts[f]) return;
  loadedFonts[f] = 1;
  try { var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=' + FONT_URL[f] + '&display=swap'; document.head.appendChild(l); } catch (e) { /* تجاهل */ }
}

/* أي لون أخضر مكتوب مباشرة في ملفات الستايل (بدل المتغير) بنعمله نسخة بلون البراند */
var recolorCss = null;
function recolorText() {
  if (recolorCss !== null) return recolorCss;
  var out = [];
  /* أي درجة خضراء (بأي صيغة) بنحوّلها لدرجة مناظرة من لون البراند. واتساب الأخضر بنسيبه زي ما هو */
  function mapColor(r, g, b2, a) {
    if (r === 37 && g === 211 && b2 === 102) return null;
    var h = hsl('#' + [r, g, b2].map(function (n) { return ('0' + n.toString(16)).slice(-2); }).join(''));
    if (h[0] < 125 || h[0] > 165 || h[1] < 40) return null;
    var l = h[2] / 100, base;
    if (l < 0.2) base = 'var(--brand-ink)';
    else if (Math.abs(l - 0.45) < 0.04) base = 'var(--brand)';
    else if (l < 0.45) base = 'color-mix(in srgb, var(--brand) ' + Math.round(l / 0.45 * 100) + '%, #000)';
    else base = 'color-mix(in srgb, var(--brand) ' + Math.round((1 - l) / 0.55 * 100) + '%, #fff)';
    if (a != null && parseFloat(a) < 1) return 'color-mix(in srgb, ' + base + ' ' + Math.round(parseFloat(a) * 100) + '%, transparent)';
    return base;
  }
  function sub(t) {
    t = t.replace(/#([0-9a-f]{6})\b/gi, function (m, h) {
      var v = mapColor(parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16));
      return v || m;
    });
    t = t.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+)\s*)?\)/gi, function (m, r, g, b2, a) {
      return mapColor(+r, +g, +b2, a) || m;
    });
    return t;
  }
  function walk(rules, wrap) {
    for (var i = 0; i < rules.length; i++) {
      var r = rules[i], t = '';
      try { t = r.cssText; } catch (e) { continue; }
      if (r.cssRules && r.type === 4) { // @media
        var inner = []; walk(r.cssRules, inner);
        if (inner.length) wrap.push('@media ' + r.conditionText + '{' + inner.join('') + '}');
      } else if (r.type === 1) { var nt = sub(t); if (nt !== t) wrap.push(nt); }
    }
  }
  var sheets = document.styleSheets;
  for (var s = 0; s < sheets.length; s++) {
    var rules = null; try { rules = sheets[s].cssRules; } catch (e) { rules = null; }
    if (rules) walk(rules, out);
  }
  recolorCss = out.join('\n');
  return recolorCss;
}
function setRecolor(on) {
  var st = document.getElementById('brand-recolor');
  if (!on) { if (st) st.remove(); return; }
  if (!st) { st = document.createElement('style'); st.id = 'brand-recolor'; }
  var css = recolorText();
  if (st.textContent !== css) st.textContent = css;
  document.head.appendChild(st); // آخر الـhead عشان يكسب
}
function setVars(sp) {
  var p = palette(sp), root = document.documentElement, st = root.style;
  st.setProperty('--brand', p.brand); st.setProperty('--brand-dark', p.dark); st.setProperty('--brand-ink', brandInk(sp.c));
  st.setProperty('--bg', p.bg); st.setProperty('--surface', p.surface); st.setProperty('--line', p.line);
  st.setProperty('--brand-font', FONT_CSS[sp.f]);
  root.setAttribute('data-br-r', sp.r); root.setAttribute('data-br-k', sp.k); root.setAttribute('data-br-g', sp.g); root.setAttribute('data-br-f', sp.f);
  loadFont(sp.f);
  setRecolor(true);
  var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', p.bg);
}
function clearVars() {
  var root = document.documentElement, st = root.style;
  ['--brand', '--brand-dark', '--brand-ink', '--bg', '--surface', '--line', '--brand-font'].forEach(function (k) { st.removeProperty(k); });
  ['data-br-r', 'data-br-k', 'data-br-g', 'data-br-f'].forEach(function (a) { root.removeAttribute(a); });
  setRecolor(false);
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
  var b = r && r.brand;
  var usable = b && !(r.admin && r.admin.disabled) && (clean(b.name_ar, 40) || clean(b.name_en, 40) || validLogo(b.logo) || b.c || b.theme || b.preset);
  if (!usable) { reset(); return false; }
  current = r;
  setVars(spec(b));
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
  var base = r.brand || {};
  var S = spec(base);
  var kind = opts.kind || 'coach';
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
  sheet.appendChild(el('p', 'brand-note', L('اللي تختاره هنا هو اللي العملاء بتوعك هيشوفوه لما يدخلوا التطبيق.', 'This is exactly what your clients will see when they open the app.')));

  var msg = el('p', 'brand-msg');
  function field(label, input) { var w = el('label', 'brand-f'); w.appendChild(el('span', '', label)); w.appendChild(input); return w; }
  function txt(val, ph, max) { var i = el('input'); i.type = 'text'; i.value = val || ''; i.placeholder = ph; i.maxLength = max; return i; }
  function sec(title) { sheet.appendChild(el('div', 'brand-lbl', title)); }
  function chips(list, key, labelFn, extra) {
    var wrap = el('div', 'brand-opts');
    function paint() {
      wrap.innerHTML = '';
      list.forEach(function (v) {
        var b = el('button', 'brand-opt' + (S[key] === v ? ' on' : ''), labelFn(v)); b.type = 'button';
        b.addEventListener('click', function () { S[key] = v; paint(); paintPrev(); });
        wrap.appendChild(b);
      });
    }
    wrap._paint = paint; paint(); return wrap;
  }

  /* 1) ابدأ من رياضتك */
  sec(L('ابدأ من رياضتك أو تخصصك', 'Start from your sport or field'));
  var presetRow = el('div', 'brand-presets');
  var optWraps = [];
  function repaintAll() { optWraps.forEach(function (w) { w._paint(); }); paintPresets(); paintColor(); paintPrev(); }
  function paintPresets() {
    presetRow.innerHTML = '';
    PRESETS.forEach(function (p) {
      var b = el('button', 'brand-preset' + (S.preset === p.id ? ' on' : '')); b.type = 'button'; b.style.setProperty('--c', p.c);
      b.appendChild(el('i')); b.appendChild(el('span', '', isAr() ? p.ar : p.en));
      b.addEventListener('click', function () { S = spec({ preset: p.id, c: p.c, r: p.r, k: p.k, g: p.g, t: p.t, f: p.f }); repaintAll(); });
      presetRow.appendChild(b);
    });
  }
  sheet.appendChild(presetRow);

  /* 2) اللون */
  sec(L('اللون', 'Color'));
  var colorRow = el('div', 'brand-sw');
  var picker = el('input'); picker.type = 'color'; picker.className = 'brand-picker'; picker.setAttribute('aria-label', L('لون حر', 'Custom color'));
  picker.addEventListener('input', function () { S.c = picker.value.toLowerCase(); paintColor(); paintPrev(); });
  function paintColor() {
    colorRow.innerHTML = '';
    SWATCHES.forEach(function (c) {
      var d = el('button', 'brand-dot' + (S.c === c ? ' on' : '')); d.type = 'button'; d.style.background = c; d.setAttribute('aria-label', c);
      d.addEventListener('click', function () { S.c = c; paintColor(); paintPrev(); });
      colorRow.appendChild(d);
    });
    picker.value = S.c; colorRow.appendChild(picker);
  }
  sheet.appendChild(colorRow);

  /* 3) الشكل */
  sec(L('شكل الزوايا', 'Corners')); var w1 = chips(RADII, 'r', lbl); optWraps.push(w1); sheet.appendChild(w1);
  sec(L('شكل الكروت', 'Cards')); var w2 = chips(CARDS, 'k', lbl); optWraps.push(w2); sheet.appendChild(w2);
  sec(L('الخلفية', 'Background')); var w3 = chips(BGS, 'g', lbl); optWraps.push(w3); sheet.appendChild(w3);
  sec(L('درجة الغمقان', 'Tone')); var w4 = chips(TONES, 't', lbl); optWraps.push(w4); sheet.appendChild(w4);
  sec(L('الخط', 'Font')); var w5 = chips(FONTS, 'f', lbl); optWraps.push(w5); sheet.appendChild(w5);

  /* 4) الاسم والصورة والترحيب */
  var nAr = txt(base.name_ar, 'اسم البرنامج', 40), nEn = txt(base.name_en, 'App name', 40);
  var wAr = txt(base.welcome_ar, 'أهلاً بيك، جاهز نبدأ؟', 160), wEn = txt(base.welcome_en, 'Welcome, ready to start?', 160);
  nEn.dir = 'ltr'; wEn.dir = 'ltr';
  sec(L('الاسم والصورة', 'Name and logo'));
  sheet.appendChild(field(L('اسم البرنامج (عربي)', 'App name (Arabic)'), nAr));
  sheet.appendChild(field(L('اسم البرنامج (إنجليزي)', 'App name (English)'), nEn));
  var logoWrap = el('div', 'brand-logo-row');
  var prevImg = el('img', 'brand-logo-prev'); prevImg.alt = '';
  var logoVal = validLogo(base.logo) ? base.logo : '';
  function showLogo() { if (logoVal) { prevImg.src = logoVal; prevImg.style.display = ''; } else { prevImg.removeAttribute('src'); prevImg.style.display = 'none'; } paintPrev(); }
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
  sheet.appendChild(field(L('رسالة ترحيب (عربي)', 'Welcome message (Arabic)'), wAr));
  sheet.appendChild(field(L('رسالة ترحيب (إنجليزي)', 'Welcome message (English)'), wEn));

  /* 5) معاينة */
  sec(L('معاينة', 'Preview'));
  var prev = el('div', 'brand-prev'); sheet.appendChild(prev);
  function paintPrev() {
    var p = palette(S);
    prev.setAttribute('data-br-r', S.r); prev.setAttribute('data-br-k', S.k); prev.setAttribute('data-br-g', S.g);
    prev.style.setProperty('--c', p.brand); prev.style.setProperty('--b', p.bg); prev.style.setProperty('--s', p.surface); prev.style.setProperty('--l', p.line);
    prev.style.setProperty('--ink', brandInk(S.c)); prev.style.fontFamily = FONT_CSS[S.f] + ", 'Cairo', sans-serif"; loadFont(S.f);
    prev.innerHTML = '';
    if (logoVal) { var im = el('img', 'brand-prev-logo'); im.src = logoVal; im.alt = ''; prev.appendChild(im); }
    prev.appendChild(el('div', 'brand-prev-name', (isAr() ? (nAr.value || nEn.value) : (nEn.value || nAr.value)) || 'ADAM'));
    var w = isAr() ? (wAr.value || wEn.value) : (wEn.value || wAr.value);
    if (w) prev.appendChild(el('div', 'brand-prev-w', w));
    var card = el('div', 'brand-prev-card'); card.appendChild(el('b', '', L('تمرين اليوم', 'Today workout'))); card.appendChild(el('span', '', L('4 تمارين · 45 دقيقة', '4 exercises · 45 min'))); prev.appendChild(card);
    prev.appendChild(el('div', 'brand-prev-btn', L('ابدأ تمرينك', 'Start workout')));
    if (!(adm && adm.hidePowered)) prev.appendChild(el('div', 'brand-prev-pw', L('مدعوم بـ ADAM', 'Powered by ADAM')));
  }
  [nAr, nEn, wAr, wEn].forEach(function (i) { i.addEventListener('input', paintPrev); });

  /* 6) مساعدة */
  sec(L('محتاج مساعدة أو أفكار؟', 'Need help or ideas?'));
  var help = el('div', 'brand-help');
  var shuffle = el('button', 'brand-btn', L('اقترح لي تصميم', 'Suggest a design')); shuffle.type = 'button';
  shuffle.addEventListener('click', function () {
    var p = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    var cs = SWATCHES[Math.floor(Math.random() * SWATCHES.length)];
    S = spec({ preset: p.id, c: Math.random() < 0.5 ? p.c : cs, r: p.r, k: p.k, g: p.g, t: p.t, f: p.f }); repaintAll();
    msg.textContent = L('اقتراح من ثيم ', 'Idea from ') + (isAr() ? p.ar : p.en);
  });
  help.appendChild(shuffle);
  var aiBox = el('div', 'brand-ai');
  var aiLog = el('div', 'brand-ai-log');
  var aiIn = el('textarea'); aiIn.rows = 2; aiIn.placeholder = L('وصف مختصر: رياضتك، جمهورك، الإحساس اللي عاوزه...', 'Describe your sport, audience and the feel you want...');
  var aiGo = el('button', 'brand-btn primary', L('اسأل موظف التصميم الذكي', 'Ask the AI design assistant')); aiGo.type = 'button';
  var aiHist = [];
  function aiSay(who, text, sug) {
    var m = el('div', 'brand-ai-m ' + who); m.appendChild(el('span', '', text));
    if (sug) {
      var ap = el('button', 'brand-btn', L('طبّق الاقتراح', 'Apply suggestion')); ap.type = 'button';
      ap.addEventListener('click', function () { S = spec(Object.assign({}, S, sug, { preset: '' })); repaintAll(); });
      m.appendChild(ap);
    }
    aiLog.appendChild(m); aiLog.scrollTop = aiLog.scrollHeight;
  }
  aiGo.addEventListener('click', async function () {
    var q = clean(aiIn.value, 600); if (!q || !fb()) return;
    aiHist.push({ from: 'user', text: q }); aiSay('me', q); aiIn.value = ''; aiGo.disabled = true;
    try {
      if (!fb().aiBrand) throw new Error('off');
      var d = await fb().aiBrand({ kind: kind, messages: aiHist.slice(-8), current: { c: S.c, r: S.r, k: S.k, g: S.g, t: S.t, f: S.f, preset: S.preset, name: clean(nAr.value || nEn.value, 40) } });
      if (!d || !d.ok) throw new Error((d && d.error) || 'off');
      aiHist.push({ from: 'ai', text: d.reply || '' });
      aiSay('ai', d.reply || '', d.suggestion ? spec(d.suggestion) : null);
    } catch (e) {
      aiHist.pop(); aiSay('sys', L('موظف التصميم الذكي لسه مش متفعل. ابعت طلبك للإدارة تحت وهنساعدك.', 'The AI design assistant is not enabled yet. Send your request to the team below.'));
    }
    aiGo.disabled = false;
  });
  aiBox.appendChild(aiLog); aiBox.appendChild(aiIn); aiBox.appendChild(aiGo); help.appendChild(aiBox);

  var askIn = el('textarea'); askIn.rows = 2; askIn.placeholder = L('اكتب للإدارة: عاوز مساعدة في التصميم، فكرة، لوجو...', 'Write to the team: design help, an idea, a logo...');
  var askGo = el('button', 'brand-btn', L('ابعت للإدارة', 'Send to the team')); askGo.type = 'button';
  askGo.addEventListener('click', async function () {
    var q = clean(askIn.value, 400); if (!q || !fb() || !fb().askTeam) return;
    askGo.disabled = true;
    try { await fb().askTeam(q, clean(nAr.value || nEn.value, 40)); askIn.value = ''; msg.textContent = L('اتبعت. هيرد عليك حد من الفريق', 'Sent. Someone from the team will reply'); }
    catch (e) { msg.textContent = L('معرفناش نبعت، جرب تاني', 'Could not send, try again'); }
    askGo.disabled = false;
  });
  help.appendChild(askIn); help.appendChild(askGo);
  sheet.appendChild(help);

  var dis, hide;
  if (isAdmin) {
    var admBox = el('div', 'brand-adm');
    admBox.appendChild(el('div', 'brand-lbl', L('صلاحيات الإدارة', 'Platform controls')));
    var chk = function (label, val) { var w = el('label', 'brand-chk'); var c = el('input'); c.type = 'checkbox'; c.checked = !!val; w.appendChild(c); w.appendChild(el('span', '', label)); admBox.appendChild(w); return c; };
    dis = chk(L('أوقف البراند عن المدرب ده', 'Turn off branding for this account'), adm.disabled);
    hide = chk(L('شيل "مدعوم بـ ADAM"', 'Hide "Powered by ADAM"'), adm.hidePowered);
    sheet.appendChild(admBox);
  }

  sheet.appendChild(msg);
  var row = el('div', 'brand-actions');
  var save = el('button', 'brand-btn primary', L('حفظ', 'Save')); save.type = 'button';
  var reset0 = el('button', 'brand-btn ghost', L('رجّعني لـ ADAM', 'Reset to ADAM')); reset0.type = 'button';
  row.appendChild(save); row.appendChild(reset0); sheet.appendChild(row);

  save.addEventListener('click', async function () {
    save.disabled = true; msg.textContent = L('بحفظ...', 'Saving...');
    try {
      var data = { name_ar: clean(nAr.value, 40), name_en: clean(nEn.value, 40), logo: logoVal, preset: S.preset, c: S.c, r: S.r, k: S.k, g: S.g, t: S.t, f: S.f,
        welcome_ar: clean(wAr.value, 160), welcome_en: clean(wEn.value, 160), updatedAt: new Date().toISOString() };
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
  paintPresets(); paintColor(); showLogo();
  document.body.appendChild(overlay);
}

/* ---------- قايمة الحسابات (للإدارة) ---------- */
export async function openAdminList(selfEmail) {
  if (!fb()) return;
  var list = []; try { list = await fb().listCoaches(); } catch (e) { list = []; }
  if (overlay) overlay.remove();
  overlay = el('div', 'brand-ov'); var sheet = el('div', 'brand-sheet'); overlay.appendChild(sheet);
  var head = el('div', 'brand-head'); head.appendChild(el('h3', '', L('براند المتخصصين', 'Specialist brands')));
  var close = el('button', 'brand-x', '×'); close.type = 'button';
  close.addEventListener('click', function () { overlay.remove(); overlay = null; }); head.appendChild(close); sheet.appendChild(head);
  if (!list.length) sheet.appendChild(el('p', 'brand-note', L('مفيش متخصصين لسه', 'No specialists yet')));
  list.forEach(function (c) {
    var r = el('div', 'brand-li');
    var nm = el('div', 'brand-li-t'); nm.appendChild(el('strong', '', c.name || c.email)); nm.appendChild(el('span', '', (c.brandName ? c.brandName + ' · ' : '') + c.email));
    var bt = el('button', 'brand-btn', L('تعديل', 'Edit')); bt.type = 'button';
    bt.addEventListener('click', function () { openEditor(c.email, { admin: true, self: selfEmail }); });
    r.appendChild(nm); r.appendChild(bt); sheet.appendChild(r);
  });
  document.body.appendChild(overlay);
}
