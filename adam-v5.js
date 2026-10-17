/*
 * ADAM V5 - home refresh + "new tools" hub (beta, flag-controlled by adam-features.js).
 *  1) Visitor screen: a "what you get" band under the hero with a prominent "try without an account" button
 *     (it simply clicks the existing #welcome-guest-btn - sign-up and login are untouched).
 *  2) Signed-in home: a hub of the new tools, per role (client / coach / specialist / admin).
 *     Explore and Tasks open in place (they are embedded); Progress, Programs and Reports open their prototype pages.
 * It reads nothing from Firebase and writes nothing. It only listens to the "adam:role" event the app already fires.
 * Icons: Tabler Icons 3.49.0 (outline), MIT, Copyright (c) 2020-2026 Pawel Kuna.
 */
(function () {
  'use strict';
  var F = window.ADAM_FEATURES || {};
  if (window.adamV5 || F.home === false) return;
  var IC = {"compass": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 16l2 -6l6 -2l-2 6l-6 2\" /> <path d=\"M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0\" /> <path d=\"M12 3l0 2\" /> <path d=\"M12 19l0 2\" /> <path d=\"M3 12l2 0\" /> <path d=\"M19 12l2 0\" />", "checklist": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8\" /> <path d=\"M14 19l2 2l4 -4\" /> <path d=\"M9 8h4\" /> <path d=\"M9 12h2\" />", "barbell": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M2 12h1\" /> <path d=\"M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2\" /> <path d=\"M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1\" /> <path d=\"M9 12h6\" /> <path d=\"M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1\" /> <path d=\"M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2\" /> <path d=\"M22 12h-1\" />", "chart-line": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 19l16 0\" /> <path d=\"M4 15l4 -6l4 2l4 -5l4 4\" />", "file-analytics": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /> <path d=\"M9 17l0 -5\" /> <path d=\"M12 17l0 -1\" /> <path d=\"M15 17l0 -3\" />", "search": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0\" /> <path d=\"M21 21l-6 -6\" />", "sparkles": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6\" />", "users": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2\" /> <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" /> <path d=\"M21 21v-2a4 4 0 0 0 -3 -3.85\" />", "rocket": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3\" /> <path d=\"M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3\" /> <path d=\"M14 9a1 1 0 1 0 2 0a1 1 0 1 0 -2 0\" />", "flask": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M9 3l6 0\" /> <path d=\"M10 9l4 0\" /> <path d=\"M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6\" />"};
  function icon(n) { return '<svg class="v5i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (IC[n] || '') + '</svg>'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  var TX = {
    ar: {
      new_: 'جديد', v_h: 'كل اللي محتاجه لجسمك في مكان واحد', v_p: 'ابحث، نفّذ مهامك، اتابع تقدّمك، وشوف برنامجك من متخصص حقيقي.',
      v1: 'اكتشف', v1p: 'بحث موحّد في التمارين والأخصائيين', v2: 'مهامك', v2p: 'تمرينك وأكلك ومتابعاتك مرتّبين', v3: 'برنامجك', v3p: 'من مدرب أو أخصائي بيراجعه', v4: 'تقدّمك', v4p: 'أسئلة بسيطة وإجاباتها بالأرقام',
      v_try: 'جرّب من غير حساب', v_note: 'من غير تسجيل — وتقدر تفتح حساب بعدين.',
      beta: 'تجريبي', hub_h: 'أدواتك الجديدة', hub_p: 'ميزات تجريبية — البيانات اللي فيها أمثلة مش بياناتك الحقيقية لحد ما تتوصّل بالسيرفر.',
      c_explore: 'اكتشف', c_explore_p: 'ابحث في كل حاجة', c_tasks: 'مهامي', c_tasks_p: 'اللي عليك النهاردة', c_progress: 'تقدّمي', c_progress_p: 'أرقامك وإجاباتها', c_builder: 'بناء البرامج', c_builder_p: 'تمرين وتأهيل بمراجعة', c_reports: 'تقارير النتائج', c_reports_p: 'حضور وغياب وترتيب', c_programs: 'برنامجي', c_programs_p: 'شوف برنامجك كلاعب',
      sample_c: 'بيانات تجريبية'
    },
    en: {
      new_: 'New', v_h: 'Everything for your body in one place', v_p: 'Search, do your tasks, follow your progress and see your plan from a real specialist.',
      v1: 'Explore', v1p: 'One search for exercises and specialists', v2: 'Your tasks', v2p: 'Training, food and follow-ups in order', v3: 'Your plan', v3p: 'From a coach or a specialist who reviews it', v4: 'Your progress', v4p: 'Simple questions, answered with numbers',
      v_try: 'Try without an account', v_note: 'No sign-up needed — open an account later if you like.',
      beta: 'Beta', hub_h: 'Your new tools', hub_p: 'Beta features — their data is sample data, not yours, until they are connected to the server.',
      c_explore: 'Explore', c_explore_p: 'Search everything', c_tasks: 'My tasks', c_tasks_p: 'What is due today', c_progress: 'My progress', c_progress_p: 'Your numbers, answered', c_builder: 'Program builder', c_builder_p: 'Training and rehab, reviewed', c_reports: 'Results reports', c_reports_p: 'Attendance, absence, rank', c_programs: 'My plan', c_programs_p: 'See your plan as a player',
      sample_c: 'Sample data'
    }
  };
  function tx(k) { var l = TX[lang()]; return l[k] != null ? l[k] : TX.ar[k]; }
  function tag() { return F.label === 'beta' || F.label == null ? '<span class="v5-tag">' + esc(tx('beta')) + '</span>' : ''; }
  function theme() { try { var t = localStorage.getItem('adam-theme'); return (t === 'light' || t === 'dark' || t === 'system') ? t : 'dark'; } catch (e) { return 'dark'; } }
  function pageUrl(p, role) {
    var as = { client: 'u-client-mona', coach: 'u-coach-hossam', specialist: 'u-spec-sara', admin: 'u-admin-ahmed' }[role] || 'u-client-mona';
    var q = 'lang=' + lang() + '&theme=' + theme() + '&from=app';
    if (p === 'builder.html') q += '&as=' + as;
    return p + '?' + q;
  }

  /* ---------------- visitor band ---------------- */
  function paintVisitor() {
    var w = document.getElementById('welcome-screen'), e = document.getElementById('adam-v5-visitor');
    if (!w) return;
    var html = '<div class="v5-vh"><span class="v5-new">' + esc(tx('new_')) + '</span><h2>' + esc(tx('v_h')) + '</h2><p>' + esc(tx('v_p')) + '</p></div><ul class="v5-vg">' +
      [['compass', 'v1'], ['checklist', 'v2'], ['barbell', 'v3'], ['chart-line', 'v4']].map(function (a) { return '<li><span class="v5-vi">' + icon(a[0]) + '</span><b>' + esc(tx(a[1])) + '</b><small>' + esc(tx(a[1] + 'p')) + '</small></li>'; }).join('') +
      '</ul><button type="button" class="v5-try" id="adam-v5-try">' + icon('rocket') + '<span>' + esc(tx('v_try')) + '</span></button><p class="v5-vn">' + esc(tx('v_note')) + '</p>';
    if (!e) {
      e = document.createElement('section'); e.id = 'adam-v5-visitor'; e.className = 'v5-visitor'; e.setAttribute('aria-labelledby', 'adam-v5-vh');
      var hero = w.querySelector('.hero2');
      if (hero && hero.parentNode === w) w.insertBefore(e, hero.nextSibling); else w.insertBefore(e, w.firstChild);
      e.addEventListener('click', function (ev) { if (ev.target.closest('#adam-v5-try')) { var g = document.getElementById('welcome-guest-btn'); if (g) g.click(); } });
    }
    e.innerHTML = html; var h = e.querySelector('h2'); if (h) h.id = 'adam-v5-vh';
  }

  /* ---------------- signed-in hub ---------------- */
  var role = null;
  function cardsFor(kind) {
    var c = [];
    function link(page, ic, t, p) { return { href: page, ic: ic, t: t, p: p }; }
    if (kind === 'client') {
      if (F.explore !== false && window.adamExplore) c.push({ act: 'explore', ic: 'search', t: 'c_explore', p: 'c_explore_p' });
      if (F.tasks !== false && window.adamTasks) c.push({ act: 'tasks', ic: 'checklist', t: 'c_tasks', p: 'c_tasks_p' });
      if (F.analytics !== false) c.push({ href: 'analytics.html', ic: 'chart-line', t: 'c_progress', p: 'c_progress_p', sample: 1 });
      if (F.builder !== false) c.push({ href: 'builder.html', ic: 'barbell', t: 'c_programs', p: 'c_programs_p', sample: 1 });
    } else if (kind === 'coach' || kind === 'specialist' || kind === 'admin') {
      if (F.builder !== false) c.push({ href: 'builder.html', ic: 'barbell', t: 'c_builder', p: 'c_builder_p', sample: 1 });
      if (F.reports !== false) c.push({ href: 'reports.html', ic: 'file-analytics', t: 'c_reports', p: 'c_reports_p', sample: 1 });
      if (F.tasks !== false && window.adamTasks) c.push({ act: 'tasks', ic: 'checklist', t: 'c_tasks', p: 'c_tasks_p' });
      if (F.explore !== false && window.adamExplore) c.push({ act: 'explore', ic: 'search', t: 'c_explore', p: 'c_explore_p' });
    }
    return c;
  }
  function hostFor(kind) {
    if (kind === 'client') return document.getElementById('client-home');
    return document.getElementById('provider-home-screen');
  }
  function paintHub() {
    var old = document.getElementById('adam-v5-hub');
    var kind = role && role.kind, host = kind && hostFor(kind), cards = kind ? cardsFor(kind) : [];
    if (!host || !cards.length) { if (old) old.remove(); return; }
    if (old && old.parentNode !== host) { old.remove(); old = null; }
    var h = old || document.createElement('section');
    h.id = 'adam-v5-hub'; h.className = 'v5-hub'; h.setAttribute('aria-labelledby', 'adam-v5-hh');
    h.innerHTML = '<div class="v5-hhd"><h2 id="adam-v5-hh">' + esc(tx('hub_h')) + '</h2>' + tag() + '</div><p class="v5-hp">' + esc(tx('hub_p')) + '</p><ul class="v5-hg">' + cards.map(function (c, i) {
      var inner = '<span class="v5-ci">' + icon(c.ic) + '</span><span class="v5-ct"><b>' + esc(tx(c.t)) + '</b><small>' + esc(tx(c.p)) + (c.sample ? ' · ' + esc(tx('sample_c')) : '') + '</small></span>';
      return '<li>' + (c.href ? '<a class="v5-card" href="' + esc(pageUrl(c.href, kind)) + '">' + inner + '</a>' : '<button type="button" class="v5-card" data-act="' + c.act + '">' + inner + '</button>') + '</li>';
    }).join('') + '</ul>';
    if (!old) {
      var anchor = host.querySelector('#adam-tasks-entry') || host.querySelector('#adam-explore-entry');
      if (kind === 'client') { if (anchor && anchor.parentNode === host) host.insertBefore(h, anchor.nextSibling); else host.insertBefore(h, host.firstChild); }
      else { var sp = host.querySelector('#provider-home-specialty'); if (sp && sp.parentNode === host) host.insertBefore(h, sp.nextSibling); else host.insertBefore(h, host.firstChild); }
      h.addEventListener('click', function (ev) {
        var b = ev.target.closest && ev.target.closest('[data-act]'); if (!b) return;
        var a = b.getAttribute('data-act'); try { if (a === 'explore') window.adamExplore.open(); if (a === 'tasks') window.adamTasks.open(); } catch (e) { }
      });
    }
  }

  function repaint() { paintVisitor(); paintHub(); }
  window.addEventListener('adam:role', function (e) { role = e && e.detail && e.detail.kind ? e.detail : null; paintHub(); });
  new MutationObserver(repaint).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  window.adamV5 = { repaint: repaint, _role: function () { return role; } };
  function boot() { if (window.adamRole && window.adamRole.kind) role = window.adamRole; repaint(); setTimeout(paintHub, 400); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
