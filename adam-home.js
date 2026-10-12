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
  var SPEC = {
    ar: { coach: 'مدرب', nutritionist: 'أخصائي تغذية', doctor: 'طبيب', rehab: 'تأهيل رياضي', physio: 'علاج طبيعي' },
    en: { coach: 'Coach', nutritionist: 'Nutritionist', doctor: 'Doctor', rehab: 'Sports rehab', physio: 'Physiotherapy' }
  };
  var GRAD = ['#17483d', '#274a73', '#6b4527', '#553a76', '#2c5f5a'];
  var state = { loaded: false, loading: false, timer: null, idx: 0, list: [] };


  var ICONS = {
    journeys: '<path d="M8 4h8v6a4 4 0 0 1-8 0zM8 6H4c0 3 1 4 4 5M16 6h4c0 3-1 4-4 5M12 14v4M8 20h8"/>',
    events: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
    today: '<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M8 3v4M16 3v4M9 15l2 2 4-4"/>',
    plan: '<path d="M6 8v8M3 10v4M18 8v8M21 10v4M6 12h12"/>',
    food: '<path d="M7 3v8a3 3 0 0 0 3 3v7M10 3v8M4 3v8a3 3 0 0 0 3 3M17 3c-2 2-3 5-3 8h3v10"/>',
    rehab: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/><path d="M9 12h2l1-2 1.5 4 1-2H17"/>'
  };
  var TILES = [
    ['journeys', 'الرحلات', 'Journeys'], ['events', 'الطلعات', 'Events'], ['today', 'سؤال اليوم', 'Daily check-in'],
    ['plan', 'خطتي', 'My plan'], ['food', 'أكلي', 'My food'], ['rehab', 'تأهيلي', 'My rehab']
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
    return '<svg viewBox="0 0 84 130" aria-hidden="true"><g fill="#1b2229" stroke="#2c3640"><circle cx="42" cy="12" r="9"/><rect x="26" y="25" width="32" height="42" rx="10"/><rect x="12" y="27" width="11" height="42" rx="5"/><rect x="61" y="27" width="11" height="42" rx="5"/><rect x="28" y="68" width="12" height="55" rx="6"/><rect x="44" y="68" width="12" height="55" rx="6"/></g><rect x="26" y="25" width="32" height="18" rx="8" fill="#3ef0b0" opacity=".8"/><rect x="12" y="27" width="11" height="22" rx="5" fill="#ffab5c" opacity=".75"/><rect x="61" y="27" width="11" height="22" rx="5" fill="#ffab5c" opacity=".75"/></svg>';
  }

  function render() {
    var r = ensureRoot();
    if (!r) return;
    var l = lang(), tx = T[l];
    r.setAttribute('dir', l === 'ar' ? 'rtl' : 'ltr');
    r.innerHTML = '';

    var secT = el('div', 'av2-sec'); secT.appendChild(el('b', '', tx.plus)); var pl = el('span', '', 'ADAM+'); pl.setAttribute('dir', 'ltr'); secT.appendChild(pl); r.appendChild(secT);
    var grid = el('div', 'av2-grid');
    TILES.forEach(function (t) {
      var b = el('button', 'av2-tile'); b.type = 'button';
      b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[t[0]] + '</svg><span>' + (l === 'en' ? t[2] : t[1]) + '</span>';
      b.addEventListener('click', function () { openPlus(t[0]); });
      grid.appendChild(b);
    });
    r.appendChild(grid);

    if (state.list.length) {
      var sec = el('div', 'av2-sec'); sec.appendChild(el('b', '', tx.team)); r.appendChild(sec);
      var car = el('div', 'av2-car'); car.id = 'av2-car';
      state.list.forEach(function (p, i) {
        var card = el('button', 'av2-tr'); card.type = 'button';
        card.style.background = 'linear-gradient(160deg,' + GRAD[i % GRAD.length] + ',#0a1215)';
        var name = String(p.name || '');
        if (p.photo) { var img = el('img'); img.alt = name; img.loading = 'lazy'; img.src = p.photo; card.appendChild(img); }
        else card.appendChild(el('div', 'av2-init', name.charAt(0)));
        card.appendChild(el('div', 'av2-go', tx.chat));
        var info = el('div', 'av2-info'); info.appendChild(el('b', '', name)); info.appendChild(el('small', '', specLabel(p, l)));
        card.appendChild(info);
        card.addEventListener('click', function () { var tile = document.querySelector('.home-tile.tile-consult'); if (tile) tile.click(); });
        car.appendChild(card);
      });
      r.appendChild(car);
      var dots = el('div', 'av2-dots'); dots.id = 'av2-dots';
      state.list.forEach(function (_, i) { dots.appendChild(el('i', i === 0 ? 'on' : '')); });
      r.appendChild(dots);
      car.addEventListener('scroll', function () {
        var kids = car.children, cr = car.getBoundingClientRect(), c = cr.left + cr.width / 2, best = 0, bd = 1e9;
        for (var i = 0; i < kids.length; i++) { var k = kids[i].getBoundingClientRect(); var m = Math.abs(k.left + k.width / 2 - c); if (m < bd) { bd = m; best = i; } }
        state.idx = best; var d = dots.children; for (var j = 0; j < d.length; j++) d[j].className = j === best ? 'on' : '';
      }, { passive: true });
      startAuto(car);
    }

    var sec2 = el('div', 'av2-sec'); var b = el('b', '', tx.disc); sec2.appendChild(b); sec2.appendChild(el('span', '', tx.sub)); r.appendChild(sec2);
    var a = el('button', 'av2-anat'); a.type = 'button';
    a.innerHTML = anatSvg() + '<div><b>' + tx.t + '<span class="av2-chip">3D</span></b><p>' + tx.p + '</p><em>' + tx.open + '</em></div>';
    a.addEventListener('click', function () { var o = document.getElementById('lib-anatomy-btn'); if (o) o.click(); });
    r.appendChild(a);
  }

  function startAuto(car) {
    if (state.timer) clearInterval(state.timer);
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (state.list.length < 2) return;
    var paused = false;
    ['touchstart', 'mousedown'].forEach(function (e) { car.addEventListener(e, function () { paused = true; setTimeout(function () { paused = false; }, 6000); }, { passive: true }); });
    state.timer = setInterval(function () {
      if (paused || !car.isConnected || car.offsetParent === null) return;
      var n = (state.idx + 1) % car.children.length, t = car.children[n];
      var cr = car.getBoundingClientRect(), tr = t.getBoundingClientRect();
      car.scrollBy({ left: (tr.left + tr.width / 2) - (cr.left + cr.width / 2), behavior: 'smooth' });
    }, 3500);
  }

  async function load() {
    if (state.loaded || state.loading) return;
    state.loading = true;
    try {
      var A = await import(FB_APP), F = await import(FB_FS);
      var db = F.getFirestore(A.getApp());
      var snap = await F.getDocs(F.collection(db, 'providerPublic'));
      state.list = snap.docs.map(function (d) { var x = d.data(); x.email = d.id; return x; })
        .filter(function (p) { return p.name; }).slice(0, 8);
      state.loaded = true;
    } catch (e) { /* مفيش متخصصين = القسم مايظهرش */ }
    state.loading = false;
    render();
  }

  function tick() {
    try {
      var r = ensureRoot();
      if (!r) return;
      if (!r.firstChild) render();
      if (r.offsetParent !== null && !state.loaded && !state.loading) load();
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
