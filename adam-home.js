/*
 * ADAM — الرئيسية الجديدة (مرحلة 1)
 * ملف منفصل عن app.js: بيضيف قسمين فوق رئيسية العميل:
 *   1) متخصصينك — صور بتتقلب لوحدها، والدوسة بتفتح الاستشارة
 *   2) اكتشف جسمك — كارت بيفتح التشريح ثلاثي الأبعاد
 * أي خطأ هنا بيتبلع ومابيأثرش على باقي التطبيق.
 */
(function () {
  'use strict';
  var FB_APP = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
  var FB_FS = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
  var T = {
    ar: { plus: 'اكتشف', team: 'متخصصينك', all: 'تواصل', chat: 'تواصل', disc: 'اكتشف جسمك', sub: 'تشريح 3D', bt: 'إزاي جسمك بيتحرك', bp: 'البيوميكانيك ببساطة: ليه التمرين بيصعب، والتكنيك الصح، والأخطاء اللي بتوجع.', bo: 'افتح المكتبة ←', t: 'العضلات والعظام والأربطة', p: 'اضغط على أي عضلة تشوف أصلها ومدخلها وتمارينها.', open: 'افتح التشريح ←', 'coach': 'مدرب', 'other': 'متخصص', fb: 'ابعتلنا ملاحظاتك' },
    en: { plus: 'Discover', team: 'Your specialists', all: 'Contact', chat: 'Contact', disc: 'Explore your body', sub: '3D anatomy', bt: 'How your body moves', bp: 'Biomechanics made simple: why exercises get hard, good technique, and the mistakes that hurt.', bo: 'Open the library →', t: 'Muscles, bones and ligaments', p: 'Tap any muscle to see its origin, insertion and exercises.', open: 'Open anatomy →', 'coach': 'Coach', 'other': 'Specialist', fb: 'Send us feedback' }
  };
  var RL = {
    ar: { ready: 'الجاهزية', nutri: 'التغذية', effort: 'المجهود' },
    en: { ready: 'Readiness', nutri: 'Nutrition', effort: 'Effort' }
  };
  var GROUPS = [
    ['coach', ['coach'], 'المدربون', 'Coaches'],
    ['nutritionist', ['nutritionist'], 'أخصائيو التغذية', 'Nutritionists'],
    ['doctor', ['doctor', 'ortho', 'radiology', 'sports_medicine'], 'الأطباء', 'Doctors'],
    ['physio', ['physio', 'massage'], 'العلاج الطبيعي', 'Physiotherapy'],
    ['rehab', ['rehab'], 'التأهيل', 'Rehabilitation'],
    ['psychologist', ['psychologist'], 'الدعم النفسي', 'Psychologists']
  ];
  var SPEC = {
    ar: { coach: 'مدرب', nutritionist: 'أخصائي تغذية', doctor: 'طبيب', rehab: 'تأهيل رياضي', physio: 'علاج طبيعي', ortho: 'طبيب عظام', radiology: 'طبيب أشعة', sports_medicine: 'طب رياضي', pharmacist: 'صيدلي', massage: 'مساج رياضي', psychologist: 'أخصائي نفسي رياضي' },
    en: { coach: 'Coach', nutritionist: 'Nutritionist', doctor: 'Doctor', rehab: 'Sports rehab', physio: 'Physiotherapy', ortho: 'Orthopaedic doctor', radiology: 'Radiologist', sports_medicine: 'Sports medicine', pharmacist: 'Pharmacist', massage: 'Sports massage', psychologist: 'Sports psychologist' }
  };
  var GRAD = ['#17483d', '#274a73', '#6b4527', '#553a76', '#2c5f5a'];
  var state = { moreOpen: false, loaded: false, loading: false, timer: null, idx: 0, list: [], sum: { ready: null }, sumAt: 0 };


  var ICONS = {
    daysum: '<path d="M4 4v16h16"/><path d="M8 15l3-4 3 2 5-6" style="stroke:var(--ic-accent,#2ee07a)"/>',
    journeys: '<path d="M12 21s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z"/><path d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" style="stroke:var(--ic-accent,#2ee07a)"/>',
    events: '<path d="M6 21V4"/><path d="M6 5h11l-2.5 4 2.5 4H6" style="stroke:var(--ic-accent,#2ee07a)"/>',
    today: '<path d="M5 6h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM8 4v3M16 4v3M4 10h16"/><path d="M9 15l2 2 4-4" style="stroke:var(--ic-accent,#2ee07a)"/>',
    plan: '<path d="M7 4h10a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM9.5 2.8h5v3h-5z"/><path d="M9 11h6M9 15h4" style="stroke:var(--ic-accent,#2ee07a)"/>',
    food: '<path d="M12 8c-2.5-1.5-6-.5-6 4 0 4 2.5 8 4.5 8 .8 0 1-.4 1.5-.4s.7.4 1.5.4c2 0 4.5-4 4.5-8 0-4.5-3.5-5.5-6-4z"/><path d="M12 8c0-2 1-3.5 3-4" style="stroke:var(--ic-accent,#2ee07a)"/>',
    lib: '<path d="M5 4h4v16H5zM10 4h4v16h-4z"/><path d="M15.5 6.5l3.6-1 3.4 13.5-3.6 1z" style="stroke:var(--ic-accent,#2ee07a)"/>',
    tpl: '<path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M4 9.5h16M9.5 9.5V20" style="stroke:var(--ic-accent,#2ee07a)"/>',
    mytrain: '<path d="M3 10.5v3M5.5 8v8M18.5 8v8M21 10.5v3"/><path d="M8.5 6v12M15.5 6v12M8.5 12h7" style="stroke:var(--ic-accent,#2ee07a)"/>',
    music: '<path d="M9 18V6l10-2v12"/><path d="M6.5 20.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM16.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" style="stroke:var(--ic-accent,#2ee07a)"/>',
    me: '<path d="M12 11.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" style="stroke:var(--ic-accent,#2ee07a)"/>',
    watch: '<path d="M8 6.5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zM9 5.5l.8-2.5h4.4l.8 2.5M9 18.5l.8 2.5h4.4l.8-2.5"/><path d="M9.5 12h1.5l1-2 1.5 4 1-2h.5" style="stroke:var(--ic-accent,#2ee07a)"/>',
    chal: '<path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 2 1 2 0-3 1-5 2-8z"/><path d="M12 20a2.5 2.5 0 0 1-2.5-2.5c0-1.5 1.5-2.5 2.5-4 1 1.5 2.5 2.5 2.5 4A2.5 2.5 0 0 1 12 20z" style="stroke:var(--ic-accent,#2ee07a)"/>',
    recipes: '<path d="M4 12h16v1a8 8 0 0 1-16 0z"/><path d="M8.5 8.5c0-1.5 1-1.5 1-3.5M12.5 8.5c0-1.5 1-1.5 1-3.5M16 8.5c0-1.5 1-1.5 1-3.5" style="stroke:var(--ic-accent,#2ee07a)"/>',
    stretch: '<path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 7v7M12 14l-4 7M12 14l4 7"/><path d="M5 9l7 1.5L19 9" style="stroke:var(--ic-accent,#2ee07a)"/>',
    circ: '<path d="M17 4l3 3-3 3M20 7H9a4 4 0 0 0-4 4M7 20l-3-3 3-3M4 17h11a4 4 0 0 0 4-4"/><path d="M12 12h.01" style="stroke:var(--ic-accent,#2ee07a)"/>',
    biomech: '<path d="M7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M8.4 7.6l2.2 3.8M13.4 14.6l2.2 3.8" style="stroke:var(--ic-accent,#2ee07a)"/>',
    search: '<path d="M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/><path d="M16 16l4.5 4.5" style="stroke:var(--ic-accent,#2ee07a)"/>',
    fast: '<path d="M20 14.5A8 8 0 1 1 9.5 4 6.5 6.5 0 0 0 20 14.5z"/><path d="M17 3v3M15.5 4.5h3" style="stroke:var(--ic-accent,#2ee07a)"/>',
    nutri: '<path d="M12 8c-2.5-1.5-6-.5-6 4 0 4 2.5 8 4.5 8 .8 0 1-.4 1.5-.4s.7.4 1.5.4c2 0 4.5-4 4.5-8 0-4.5-3.5-5.5-6-4z"/><path d="M12 8c0-2 1-3.5 3-4" style="stroke:var(--ic-accent,#2ee07a)"/>',
    rehab: '<path d="M4.5 14.5 14.5 4.5a3.5 3.5 0 0 1 5 5l-10 10a3.5 3.5 0 0 1-5-5z"/><path d="M9.2 9.2l5.6 5.6M11 13h.01M13 11h.01" style="stroke:var(--ic-accent,#2ee07a)"/>'
  };
  var TILES = [
    ['journeys', 'الرحلات', 'Journeys'], ['events', 'الطلعات', 'Events'], ['today', 'سؤال اليوم', 'Daily check-in'],
    ['plan', 'خطتي', 'My plan'], ['lib', 'المكتبة', 'Library'], ['tpl', 'القوالب', 'Templates'],
    ['mytrain', 'برنامج التمرين', 'My program'], ['food', 'أكلي', 'My food'], ['rehab', 'تأهيلي', 'My rehab'], ['chal', 'تحديات', 'Challenges'], ['recipes', 'وصفات', 'Recipes'], ['stretch', 'إطالة', 'Stretch'], ['circ', 'محطات وجروب', 'Circuits and group'], ['biomech', 'ميكانيكا الحركة', 'Movement mechanics'], ['fast', 'صيام', 'Fasting'], ['nutri', 'برامج تغذية', 'Nutrition'], ['music', 'أغاني', 'Music'], ['me', 'ملفي', 'My profile'], ['watch', 'الساعة', 'Watch'], ['daysum', 'ملخص يومي', 'Daily summary']
  ];
  function openPlus(tab) {
    import('./adam-plus.js').then(function (m) { m.open(tab); }).catch(function (e) { if (window.console) console.error(e); });
  }

  function lang() { return (document.documentElement.lang === 'en') ? 'en' : 'ar'; }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function root() { return document.getElementById('adam-v2'); }

  function ensureRoot() {
    var home = document.getElementById('client-home');
    if (!home) return null;
    var r = root();
    if (!r) { r = el('section'); r.id = 'adam-v2'; home.insertBefore(r, home.firstChild); }
    return r;
  }

  function specLabel(p, l) {
    var k = p.specialty || (p.specialties && p.specialties[0]) || '';
    return (SPEC[l] && SPEC[l][k]) || (k ? k : T[l].other);
  }

  function anatSvg() {
    var half = '<path d="M29 33C23 34 20 40 19 50C18 58 18 64 19 70L26 70C27 62 28 50 31 38Z"/><path d="M19 71C17 82 15 92 14 101L21 102C23 92 25 82 26 71Z"/><path d="M37 107C34 121 34 135 36 147L47 147C48 135 49 121 49 107Z"/><path d="M36 149C34 161 35 173 37 185L45 185C47 173 48 161 47 149Z"/>';
    var mus = '<path d="M32 35C38 33 46 35 49 39L49 51C42 54 34 51 32 45Z" fill="#3ef0b0" opacity=".85"/><ellipse cx="27" cy="37" rx="5" ry="6" fill="#ffab5c" opacity=".85"/><path d="M20 44C19 52 19 58 20 64L25 64C26 57 27 50 28 43Z" fill="#3ef0b0" opacity=".6"/><rect x="40" y="56" width="9" height="7" rx="2.5" fill="#3ef0b0" opacity=".5"/><rect x="40" y="65" width="9" height="7" rx="2.5" fill="#3ef0b0" opacity=".4"/><rect x="40" y="74" width="9" height="7" rx="2.5" fill="#3ef0b0" opacity=".3"/><path d="M38 112C36 123 36 133 38 142L46 142C47 133 47.5 123 47 112Z" fill="#3ef0b0" opacity=".8"/><path d="M38 152C37 161 37.500 170 39 178L44 178C45 170 45.500 161 45 152Z" fill="#ffab5c" opacity=".8"/>';
    return '<svg viewBox="0 0 100 190" aria-hidden="true"><defs><linearGradient id="av2-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d3843"/><stop offset="1" stop-color="#151c23"/></linearGradient></defs>'
      + '<g fill="url(#av2-bg)" stroke="#3a4753" stroke-width=".8"><ellipse cx="50" cy="13" rx="8.5" ry="10.5"/><path d="M45 22h10v8H45z"/>'
      + '<path d="M30 31C36 28 44 29 50 30C56 29 64 28 70 31C73 40 72 52 69 64C67 72 66 80 64 88L36 88C34 80 33 72 31 64C28 52 27 40 30 31Z"/>'
      + '<path d="M36 88L64 88C66 96 65 102 62 106L38 106C35 102 34 96 36 88Z"/>'
      + '<g id="av2-h">' + half + '</g><use href="#av2-h" transform="translate(100 0) scale(-1 1)"/></g>'
      + '<g id="av2-m">' + mus + '</g><use href="#av2-m" transform="translate(100 0) scale(-1 1)"/></svg>';
  }

  function ringsCard() {
    var l = lang(), rl = RL[l], eng = null;
    try { eng = window.__adamEng && window.__adamEng(); } catch (e) { eng = null; }
    var ready = state.sum.ready;
    var food = eng ? Math.round(eng.food * 100) : Math.min(100, Math.round(((state.sum.foodCount || 0) / 4) * 100));
    var eff = eng ? Math.round(eng.train * 100) : 0;
    var items = [
      ['ready', ready == null ? 0 : ready, ready == null ? '--' : String(ready), '#27e3a1', 'today'],
      ['nutri', food, food + '%', '#4aa8ff', 'food'],
      ['effort', eff, eff + '%', '#ff9f43', 'mytrain']
    ];
    var c = el('div', 'av2-rings');
    items.forEach(function (it) {
      var b = el('button', 'av2-rg'); b.type = 'button';
      var off = Math.round(264 * (1 - Math.max(0, Math.min(100, it[1])) / 100));
      b.innerHTML = '<div class="av2-rgw"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="t" cx="50" cy="50" r="42"/><circle class="v" cx="50" cy="50" r="42" stroke="' + it[3] + '" stroke-dasharray="264" stroke-dashoffset="' + off + '"/></svg><div class="n">' + it[2] + '</div></div><div class="l">' + rl[it[0]] + '</div>';
      b.addEventListener('click', function () { goTile(it[4]); });
      c.appendChild(b);
    });
    return c;
  }
  function goTile(k) {
    if (k === 'daysum') { if (window.adamDaySummary) window.adamDaySummary(); return; }
    if (k === 'mytrain') { var tb = document.getElementById('ctab-training'); if (tb) { tb.click(); window.scrollTo(0, 0); return; } openPlus('plan'); return; }
    openPlus(k);
  }

  function specKeys(p) {
    var a = (p.specialties && p.specialties.length) ? p.specialties : [p.specialty || ''];
    return a;
  }
  function trainerRow(p, i, l, tx) {
    var card = el('button', 'av2-row'); card.type = 'button';
    var name = String(p.name || '');
    var av = el('span', 'av2-av'); av.style.background = 'linear-gradient(160deg,' + GRAD[i % GRAD.length] + ',#0a1215)';
    if (p.photo) { var img = el('img'); img.alt = name; img.loading = 'lazy'; img.src = p.photo; av.appendChild(img); } else av.textContent = name.charAt(0);
    card.appendChild(av);
    var info = el('span', 'av2-ri'); info.appendChild(el('b', '', name)); info.appendChild(el('small', '', specLabel(p, l))); card.appendChild(info);
    card.appendChild(el('span', 'av2-cta', tx.chat));
    card.addEventListener('click', function () { var tile = document.querySelector('.home-tile.tile-consult'); if (tile) tile.click(); });
    return card;
  }
  /* التخصصات جنب بعض، وتحت كل تخصص دايرة بصورة المتخصص بتتقلّب (طالع/نازل) */
  var cols = [], colTimer = 0, colTick = 0;
  function slideAvatar(p, gi) {
    var name = String(p.name || '');
    var av = el('span', 'av2-bav'); av.style.background = 'linear-gradient(160deg,' + GRAD[gi % GRAD.length] + ',#0a1215)';
    if (p.photo) { var img = el('img'); img.alt = name; img.loading = 'lazy'; img.src = p.photo; av.appendChild(img); } else av.textContent = name.charAt(0);
    return av;
  }
  var GICON = {
    coach: '<path d="M6 9v6M18 9v6M3 11v2M21 11v2M6 12h12"/>',
    nutritionist: '<path d="M12 7c-3-2-7 0-7 5 0 4 3 8 5 8 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 5-4 5-8 0-5-4-7-7-5zM12 7c0-2 1-3 3-4"/>',
    doctor: '<path d="M12 5v14M5 12h14"/>',
    physio: '<circle cx="12" cy="5" r="2"/><path d="M12 8v6M8 11l4 1 4-1M9 21l3-7 3 7"/>',
    rehab: '<path d="M4 20c4-1 6-4 8-8s4-7 8-8M4 20l4-4M9 14l-3-1M14 9l-1-3"/>',
    psychologist: '<path d="M12 4a6 6 0 0 0-4 10.5V18h8v-3.5A6 6 0 0 0 12 4zM10 21h4M12 8v4"/>',
    other: '<circle cx="12" cy="12" r="7"/><path d="M12 9v3l2 2"/>'
  };
  function gIcon(k) {
    var s = el('span', 'av2-gi');
    s.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (GICON[k] || GICON.other) + '</svg>';
    return s;
  }
  function firstName(p) {
    var n = String(p.name || '').replace(/^(د\.?|دكتور|دكتورة|كابتن|كوتش|Dr\.?|Coach)\s+/i, '').trim();
    return n.split(/\s+/)[0] || String(p.name || '');
  }
  function colLoop() {
    var root = document.getElementById('adam-v2');
    if (!root) { clearInterval(colTimer); colTimer = 0; return; }
    if (!root.offsetParent || document.hidden) return;
    colTick++;
    cols.forEach(function (c, ci) {
      if (c.list.length < 2 || (colTick + ci) % 3 !== 0) return;
      var cur = c.slides[c.i], nx = (c.i + 1) % c.list.length, next = c.slides[nx];
      next.style.transition = 'none'; next.className = 'av2-sl'; void next.offsetWidth; next.style.transition = '';
      next.className = 'av2-sl on'; cur.className = 'av2-sl off';
      c.i = nx;
      c.nameEl.classList.add('fade');
      setTimeout(function () { c.nameEl.textContent = firstName(c.list[nx]); c.nameEl.classList.remove('fade'); }, 260);
    });
  }
  function trainersBlock(r, l, tx) {
    if (!state.list.length) return;
    cols = [];
    var sec = el('div', 'av2-sec av2-sec-team'); sec.appendChild(el('b', '', tx.team)); sec.appendChild(el('span', '', String(state.list.length))); r.appendChild(sec);
    var used = {};
    var groups = GROUPS.map(function (g) {
      var list = state.list.filter(function (p) { return specKeys(p).some(function (k) { return g[1].indexOf(k) !== -1; }); });
      list.forEach(function (p) { used[p.email] = 1; });
      return { g: g, list: list };
    });
    var rest = state.list.filter(function (p) { return !used[p.email]; });
    if (rest.length) groups.push({ g: ['other', [], 'متخصصون آخرون', 'Other specialists'], list: rest });
    var strip = el('div', 'av2-cols');
    groups.forEach(function (x, gi) {
      if (!x.list.length) return;
      var col = el('button', 'av2-col'); col.type = 'button';
      col.setAttribute('aria-label', l === 'en' ? x.g[3] : x.g[2]); col.title = l === 'en' ? x.g[3] : x.g[2];
      var win = el('span', 'av2-win'); win.style.setProperty('--d', gi % 2 ? '-1' : '1');
      var slides = x.list.map(function (p, i) { var sl = el('span', 'av2-sl' + (i === 0 ? ' on' : '')); sl.appendChild(slideAvatar(p, gi + i)); win.appendChild(sl); return sl; });
      var wrap = el('span', 'av2-wrap'); wrap.appendChild(win); wrap.appendChild(gIcon(x.g[0])); col.appendChild(wrap);
      var nm = el('b', 'av2-cn', firstName(x.list[0])); col.appendChild(nm);
      col.addEventListener('click', function () { var tile = document.querySelector('.home-tile.tile-consult'); if (tile) tile.click(); });
      cols.push({ list: x.list, slides: slides, i: 0, nameEl: nm });
      strip.appendChild(col);
    });
    r.appendChild(strip);
    if (!colTimer) colTimer = setInterval(colLoop, 1000);
  }

  function render() {
    var r = ensureRoot();
    if (!r) return;
    var l = lang(), tx = T[l];
    r.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    r.innerHTML = '';

    var sp = el('button', 'av2-search'); sp.type = 'button'; sp.setAttribute('data-adam-open', 'search');
    sp.setAttribute('aria-label', l === 'en' ? 'Search' : 'بحث');
    sp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">' + ICONS.search + '</svg><span>' + (l === 'en' ? 'Search exercises, food, joints, articles...' : 'ابحث في كل حاجة: تمرين، أكلة، مفصل، مقال...') + '</span>';
    r.appendChild(sp);
    r.appendChild(ringsCard());

    var secT = el('div', 'av2-sec av2-sec-tools'); secT.appendChild(el('b', '', tx.plus)); var pl = el('span', '', 'ADAM+'); pl.setAttribute('dir', 'ltr'); secT.appendChild(pl); r.appendChild(secT);
    var DUP = ['mytrain', 'food', 'rehab']; /* عندها أيقونات في الشريط السفلي */
    var PRIMARY = ['today', 'plan', 'lib', 'journeys', 'events', 'chal'];
    var byKey = {}; TILES.forEach(function (t) { byKey[t[0]] = t; });
    var first = PRIMARY.map(function (k) { return byKey[k]; }).filter(Boolean);
    var rest = TILES.filter(function (t) { return PRIMARY.indexOf(t[0]) === -1 && DUP.indexOf(t[0]) === -1; });
    function mkTile(t) {
      var b = el('button', 'av2-tile'); b.type = 'button';
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[t[0]] + '</svg><span>' + (l === 'en' ? t[2] : t[1]) + '</span>';
      b.addEventListener('click', function () { goTile(t[0]); });
      return b;
    }
    var grid = el('div', 'av2-grid');
    first.forEach(function (t) { grid.appendChild(mkTile(t)); });
    r.appendChild(grid);
    /* باقي الأدوات + كروت الاستكشاف: مطويّة تحت زرار واحد */
    var moreBtn = el('button', 'av2-more-btn'); moreBtn.type = 'button';
    var moreBox = el('div', 'av2-more');
    var moreGrid = el('div', 'av2-grid'); rest.forEach(function (t) { moreGrid.appendChild(mkTile(t)); });
    moreBox.appendChild(moreGrid);
    function paintMore() {
      moreBox.classList.toggle('open', state.moreOpen);
      moreBtn.setAttribute('aria-expanded', state.moreOpen ? 'true' : 'false');
      moreBtn.innerHTML = '<span>' + (state.moreOpen ? (l === 'en' ? 'Show less' : 'اقفل') : (l === 'en' ? 'All tools (' + rest.length + ')' : 'كل الأدوات (' + rest.length + ')')) + '</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
    }
    moreBtn.addEventListener('click', function () { state.moreOpen = !state.moreOpen; paintMore(); });
    paintMore();
    r.appendChild(moreBtn);
    r.appendChild(moreBox);
    var realR = r; r = moreBox;

    var sec2 = el('div', 'av2-sec'); sec2.appendChild(el('b', '', tx.disc)); sec2.appendChild(el('span', '', tx.sub)); r.appendChild(sec2);
    var a = el('button', 'av2-anat'); a.type = 'button';
    a.innerHTML = anatSvg() + '<div><b>' + tx.t + '<span class="av2-chip">3D</span></b><p>' + tx.p + '</p><em>' + tx.open + '</em></div>';
    a.addEventListener('click', function () { var o = document.getElementById('lib-anatomy-btn'); if (o) o.click(); });
    r.appendChild(a);
    var bk = el('button', 'av2-anat av2-bio'); bk.type = 'button';
    bk.innerHTML = bioSvg() + '<div><b>' + tx.bt + '</b><p>' + tx.bp + '</p><em>' + tx.bo + '</em></div>';
    bk.addEventListener('click', function () { var o = document.getElementById('lib-biomech-btn'); if (o) o.click(); });
    r.appendChild(bk);
    var bm = el('button', 'av2-anat av2-mech'); bm.type = 'button'; bm.setAttribute('data-adam-open', 'biomech');
    bm.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="46" height="46">' + ICONS.biomech + '</svg><div><b>' + (l === 'en' ? 'Movement mechanics' : 'ميكانيكا الحركة') + '</b><p>' + (l === 'en' ? 'Joints, muscles and the mechanics of every exercise, running and injuries.' : 'المفاصل والعضلات وميكانيكا كل تمرين والجري والإصابات.') + '</p><em>' + (l === 'en' ? 'Open mechanics →' : 'افتح الميكانيكا ←') + '</em></div>';
    r.appendChild(bm);
    r = realR;


    trainersBlock(r, l, tx);

    var fb = el('a', 'av2-fb', tx.fb); fb.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd3stkXiUZxdfU2vY5c3N9uGk5nHiArkjec5mNKBgAu4oYL7w/viewform'; fb.target = '_blank'; fb.rel = 'noopener';
    r.appendChild(fb);
  }

  /* أيقونة كارت البيوميكانيك: شخص في وضع سكوات مع خط البار */
  function bioSvg() {
    return '<svg viewBox="0 0 70 90" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="44" cy="18" r="7" fill="currentColor" stroke="none"/><path d="M40 27 L24 48 L44 58 L34 80 L48 80"/><path d="M38 31 L52 40"/>' +
      '<path d="M34 8 V84" stroke="#3ef0b0" stroke-width="2" stroke-dasharray="3 4"/><circle cx="34" cy="29" r="6" stroke="#3ef0b0" stroke-width="3"/></svg>';
  }

  function refreshSum() {
    var now = Date.now();
    if (now - state.sumAt < 30000) return;
    state.sumAt = now;
    import('./adam-plus.js').then(function (m) { return m.summary ? m.summary() : null; }).then(function (sm) {
      if (!sm) return;
      var changed = sm.ready !== state.sum.ready || sm.foodCount !== state.sum.foodCount;
      state.sum = sm; if (changed) render();
    }).catch(function () {});
  }

  async function load() {
    if (state.loaded || state.loading) return;
    state.loading = true;
    try {
      var A = await import(FB_APP), F = await import(FB_FS);
      var db = F.getFirestore(A.getApp());
      var snap = await F.getDocs(F.collection(db, 'providerPublic'));
      state.list = snap.docs.map(function (d) { var x = d.data(); x.email = d.id; return x; })
        .filter(function (p) { return p.name; }).slice(0, 60);
      state.loaded = true;
    } catch (e) { /* مفيش متخصصين = القسم مايظهرش */ }
    state.loading = false;
    render();
  }

  var qcDone = false;
  function maybeQuick() {
    if (qcDone) return;
    var home = document.getElementById('client-home');
    if (!home || home.offsetParent === null) return;
    var anat = document.getElementById('anat-overlay');
    if (anat && anat.offsetParent !== null) return;
    qcDone = true;
    setTimeout(function () {
      try {
        var h2 = document.getElementById('client-home');
        if (!h2 || h2.offsetParent === null) { qcDone = false; return; }
        import('./adam-plus.js').then(function (m) { if (m.quickCheck) m.quickCheck(); }).catch(function () {});
      } catch (e) { /* تجاهل */ }
    }, 2500);
  }
  function tick() {
    try {
      maybeQuick();
      var r = ensureRoot();
      if (!r) return;
      if (!r.firstChild) render();
      if (r.offsetParent !== null && !state.loaded && !state.loading) load();
      if (r.offsetParent !== null) {
        refreshSum();
        var e = window.__adamEng && window.__adamEng(); var sig = e ? [e.train, e.food].join('/') : '';
        if (sig !== state.sig) { state.sig = sig; render(); }
      }
    } catch (e) { /* تجاهل */ }
  }

  function boot() {
    setInterval(tick, 1500);
    new MutationObserver(function () { try { if (root() && root().firstChild) render(); } catch (e) {} })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    tick();
  }
  /* لينك جلسة جماعية: ?grp=... */
  try {
    var gq = new URLSearchParams(location.search).get('grp');
    if (gq) {
      window.__adamgrp = gq; try { sessionStorage.setItem('adamgrp', gq); } catch (e) { /* تجاهل */ }
      try { history.replaceState(null, '', location.pathname + location.hash); } catch (e) { /* تجاهل */ }
      setTimeout(function () { openPlus('circ'); }, 1800);
    }
  } catch (e) { /* تجاهل */ }
    window.addEventListener('message', function (e) {
    if (e.origin !== location.origin || !e.data || e.data.type !== 'adam-open-bio') return;
    var c = document.getElementById('bio-close'); if (c) c.click();
    import('./adam-plus.js').then(function (m) { return m.openBioTarget(e.data.kind, e.data.id); }).catch(function () {});
  });
document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-adam-open]') : null;
    if (!t) return;
    e.preventDefault();
    openPlus(t.getAttribute('data-adam-open'));
  });
  window.adamBio = function (id) { import('./adam-plus.js').then(function (m) { m.openBio(id); }).catch(function (e) { if (window.console) console.error(e); }); };
  window.__adamHome = { render: render, setList: function (l) { state.list = l; state.loaded = true; render(); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
