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
    ar: { plus: 'اكتشف', team: 'متخصصينك', all: 'تواصل', chat: 'تواصل', disc: 'اكتشف جسمك', sub: 'تشريح 3D', t: 'العضلات والعظام والأربطة', p: 'اضغط على أي عضلة تشوف أصلها ومدخلها وتمارينها.', open: 'افتح التشريح ←', 'coach': 'مدرب', 'other': 'متخصص' },
    en: { plus: 'Discover', team: 'Your specialists', all: 'Contact', chat: 'Contact', disc: 'Explore your body', sub: '3D anatomy', t: 'Muscles, bones and ligaments', p: 'Tap any muscle to see its origin, insertion and exercises.', open: 'Open anatomy →', 'coach': 'Coach', 'other': 'Specialist' }
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
  var state = { loaded: false, loading: false, timer: null, idx: 0, list: [], sum: { ready: null }, sumAt: 0 };


  var ICONS = {
    journeys: '<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4c0 3 1 4 4 5M16 6h4c0 3-1 4-4 5M12 14v4M8 20h8"/>',
    events: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
    today: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M8 3v4M16 3v4M9 15l2 2 4-4"/>',
    plan: '<path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12"/>',
    food: '<path d="M7 3v8a3 3 0 0 0 3 3v7M10 3v8M4 3v8a3 3 0 0 0 3 3M17 3c-2 2-3 5-3 8h3v10"/>',
    lib: '<path d="M4 5.5C4 4.7 4.7 4 5.5 4H11v16H5.5c-.8 0-1.5-.7-1.5-1.5z"/><path d="M20 5.5c0-.8-.7-1.5-1.5-1.5H13v16h5.5c.8 0 1.5-.7 1.5-1.5z"/>',
    tpl: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    mytrain: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9.5v5M20.5 9.5v5M6.5 12h11"/>',
    rehab: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/><path d="M9 12h2l1-2 1.5 4 1-2H17"/>'
  };
  var TILES = [
    ['journeys', 'الرحلات', 'Journeys'], ['events', 'الطلعات', 'Events'], ['today', 'سؤال اليوم', 'Daily check-in'],
    ['plan', 'خطتي', 'My plan'], ['lib', 'المكتبة', 'Library'], ['tpl', 'القوالب', 'Templates'],
    ['mytrain', 'برنامج التمرين', 'My program'], ['food', 'أكلي', 'My food'], ['rehab', 'تأهيلي', 'My rehab']
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
      setTimeout(function () { c.nameEl.textContent = String(c.list[nx].name || ''); c.nameEl.classList.remove('fade'); }, 260);
    });
  }
  function trainersBlock(r, l, tx) {
    if (!state.list.length) return;
    cols = [];
    var sec = el('div', 'av2-sec'); sec.appendChild(el('b', '', tx.team)); sec.appendChild(el('span', '', String(state.list.length))); r.appendChild(sec);
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
      col.appendChild(el('span', 'av2-ch', l === 'en' ? x.g[3] : x.g[2]));
      var win = el('span', 'av2-win'); win.style.setProperty('--d', gi % 2 ? '-1' : '1');
      var slides = x.list.map(function (p, i) { var sl = el('span', 'av2-sl' + (i === 0 ? ' on' : '')); sl.appendChild(slideAvatar(p, gi + i)); win.appendChild(sl); return sl; });
      col.appendChild(win);
      var nm = el('b', 'av2-cn', String(x.list[0].name || '')); col.appendChild(nm);
      col.appendChild(el('small', '', String(x.list.length)));
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

    r.appendChild(ringsCard());

    var secT = el('div', 'av2-sec'); secT.appendChild(el('b', '', tx.plus)); var pl = el('span', '', 'ADAM+'); pl.setAttribute('dir', 'ltr'); secT.appendChild(pl); r.appendChild(secT);
    var grid = el('div', 'av2-grid');
    TILES.forEach(function (t) {
      var b = el('button', 'av2-tile'); b.type = 'button';
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[t[0]] + '</svg><span>' + (l === 'en' ? t[2] : t[1]) + '</span>';
      b.addEventListener('click', function () { goTile(t[0]); });
      grid.appendChild(b);
    });
    r.appendChild(grid);

    var sec2 = el('div', 'av2-sec'); sec2.appendChild(el('b', '', tx.disc)); sec2.appendChild(el('span', '', tx.sub)); r.appendChild(sec2);
    var a = el('button', 'av2-anat'); a.type = 'button';
    a.innerHTML = anatSvg() + '<div><b>' + tx.t + '<span class="av2-chip">3D</span></b><p>' + tx.p + '</p><em>' + tx.open + '</em></div>';
    a.addEventListener('click', function () { var o = document.getElementById('lib-anatomy-btn'); if (o) o.click(); });
    r.appendChild(a);

    trainersBlock(r, l, tx);
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
  window.__adamHome = { render: render, setList: function (l) { state.list = l; state.loaded = true; render(); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
