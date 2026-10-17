/*
 * ADAM Results & attendance reports (Phase 3B, beta only, standalone prototype page reports.html)
 *
 * For a coach: attendance, absence and performance per person, for selected members, a group or the whole team,
 * over a month / quarter / season / custom period, with ranking, rank percentage, group ranking, charts, and
 * premium print / Word / CSV exports.
 *
 * What is real and what is not:
 *  - The screen, the maths (attendance %, performance, composite score, ranks, percentages), the charts and the exports are real front-end code.
 *  - Data is SAMPLE data generated in the browser (adam-reports-data.js). Nothing is read from Firebase.
 *  - A real backend must return only the signed-in coach's own team. Exports contain personal data: that is a privacy decision, not a UI one.
 *
 * Definitions (also shown in the page):
 *  - Attendance % = attended / (planned - excused). Excused absences are not counted against the person.
 *  - Absence = planned - attended - excused (unexcused).
 *  - Performance = average of the weekly performance scores (0-100) in the period (weeks with at least one attended session).
 *  - Composite = 50% attendance + 50% performance. Ranking needs at least MIN_WEEKS weeks in the period.
 *  - Rank is competition ranking (ties share a rank), computed across the WHOLE team so that picking members does not change anyone's rank.
 *  - "Top X%" = ceil(rank / ranked people * 100).
 *
 * Icons: Tabler Icons 3.49.0 (outline), MIT, Copyright (c) 2020-2026 Pawel Kuna.
 */
(function () {
  'use strict';
  var D = window.ADAM_REPORTS_DATA;
  if (!D || window.adamReports) return;
  var MIN_WEEKS = 4, LS_LANG = 'adam-lang', LS_THEME = 'adam-theme', MIRROR_TIME_IN_RTL = true;
  var IC = {"printer": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2\" /> <path d=\"M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4\" /> <path d=\"M7 15a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2l0 -4\" />", "file-spreadsheet": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /> <path d=\"M8 11h8v7h-8l0 -7\" /> <path d=\"M8 15h8\" /> <path d=\"M11 11v7\" />", "file-word": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M14 3v4a1 1 0 0 0 1 1h4\" /> <path d=\"M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2\" /> <path d=\"M9 12l1.333 5l1.667 -4l1.667 4l1.333 -5\" />", "trophy": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 21l8 0\" /> <path d=\"M12 17l0 4\" /> <path d=\"M7 4l10 0\" /> <path d=\"M17 4v8a5 5 0 0 1 -10 0v-8\" /> <path d=\"M3 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" /> <path d=\"M17 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0\" />", "users": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2\" /> <path d=\"M16 3.13a4 4 0 0 1 0 7.75\" /> <path d=\"M21 21v-2a4 4 0 0 0 -3 -3.85\" />", "x": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M18 6l-12 12\" /> <path d=\"M6 6l12 12\" />", "chart-bar": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6\" /> <path d=\"M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10\" /> <path d=\"M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14\" /> <path d=\"M4 20h14\" />", "medal": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 4v3m-4 -3v6m8 -6v6\" /> <path d=\"M12 18.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5l-3 -1.5\" />", "user-check": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0\" /> <path d=\"M6 21v-2a4 4 0 0 1 4 -4h4\" /> <path d=\"M15 19l2 2l4 -4\" />", "users-group": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1\" /> <path d=\"M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M17 10h2a2 2 0 0 1 2 2v1\" /> <path d=\"M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0\" /> <path d=\"M3 13v-1a2 2 0 0 1 2 -2h2\" />", "chart-line": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M4 19l16 0\" /> <path d=\"M4 15l4 -6l4 2l4 -5l4 4\" />", "moon": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008\" />", "sun": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0\" /> <path d=\"M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7\" />", "device-desktop": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10\" /> <path d=\"M7 20h10\" /> <path d=\"M9 16v4\" /> <path d=\"M15 16v4\" />", "flask": "<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /> <path d=\"M9 3l6 0\" /> <path d=\"M10 9l4 0\" /> <path d=\"M10 3v6l-4 11a.7 .7 0 0 0 .5 1h11a.7 .7 0 0 0 .5 -1l-4 -11v-6\" />"};
  function icon(name, cls) {
    return '<svg class="axi ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (IC[name] || '') + '</svg>';
  }
  var TX = {
    ar: {
      title: 'تقارير النتائج', h1: 'تقارير النتائج والحضور', lead: 'حضور وغياب وأداء كل لاعب أو عميل، والترتيب داخل الفريق والمجموعات — وتقدر تطبع أو تنزّل التقرير.',
      sample: 'بيانات تجريبية — الأسماء والأرقام مخترعة ومتولّدة في المتصفح. مفيش اتصال بأي سيرفر. في التطبيق الحقيقي المدرب بيشوف فريقه هو بس.',
      scope_h: 'مين؟', s_team: 'الفريق كله', s_group: 'مجموعة', s_sel: 'أفراد مختارين', pick_group: 'اختار المجموعة', pick_members: 'اختار الأفراد', all_n: 'اختار الكل', none_n: 'امسح الاختيار',
      per_h: 'الفترة', p_month: 'آخر 4 أسابيع', p_quarter: 'آخر 13 أسبوع', p_season: 'الموسم كله', p_custom: 'مخصّصة', r_from: 'من', r_to: 'إلى', r_apply: 'طبّق',
      e_bad: 'اكتب تاريخ صالح في الخانتين.', e_order: 'تاريخ البداية لازم يكون قبل النهاية.', e_future: 'النهاية مينفعش تكون في المستقبل.',
      sum_scope: 'النطاق', sum_period: 'الفترة', weeks_n: '%n أسبوع',
      t_rank: 'الترتيب', t_att: 'الحضور والغياب', t_trend: 'الأداء', t_groups: 'المجموعات', t_person: 'بطاقة فرد',
      k_people: 'عدد الأفراد', k_att: 'متوسط الحضور', k_perf: 'متوسط الأداء', k_abs: 'غياب بدون عذر', k_top: 'الأعلى ترتيبًا',
      c_rank: 'الترتيب', c_name: 'الاسم', c_group: 'المجموعة', c_att: 'الحضور', c_abs: 'الغياب', c_exc: 'بعذر', c_perf: 'الأداء', c_score: 'الدرجة', c_pct: 'النسبة المئوية', c_delta: 'عن الفترة السابقة', c_planned: 'المخطط', c_done: 'حضر',
      top_of: 'أعلى %p%', unranked: 'غير مصنّف', unranked_why: 'محتاج %m أسابيع على الأقل في الفترة عشان يتصنّف.',
      pts: 'نقطة', same: 'ثابت', na: '—',
      rank_note: 'الدرجة = 50% حضور + 50% أداء. الحضور = الحصص اللي حضرها ÷ (المخططة − اللي بعذر). الترتيب محسوب على الفريق كله حتى لو اخترت أفراد بس، والتعادل بياخد نفس الترتيب.',
      att_h: 'الحضور والغياب لكل فرد', att_legend: 'حضر', abs_legend: 'غياب بدون عذر', exc_legend: 'غياب بعذر',
      tr_h: 'تطور الأداء الأسبوعي', tr_who: 'بنعرض أعلى %n في النطاق — اختار أفراد من «أفراد مختارين» لتحديد غيرهم.', tr_axis: 'درجة الأداء (0 إلى 100)', tr_none: 'مفيش درجات أداء كفاية في الفترة.',
      chart_sum: 'رسم بياني للأداء الأسبوعي من %a إلى %b لـ %n أفراد.', show_table: 'اعرض جدول البيانات', hide_table: 'اخفي جدول البيانات', c_week: 'الأسبوع المنتهي في',
      g_h: 'ترتيب المجموعات', g_avg: 'متوسط الدرجة', g_members: 'الأفراد', g_share: 'نسبة من أعلى مجموعة', g_note: 'المجموعة بتتصنّف بمتوسط درجات أفرادها المصنّفين. المجموعة لازم فيها فردين مصنّفين على الأقل.', g_unranked: 'غير كافية',
      p_pick: 'اختار الفرد', p_card: 'بطاقة %n', p_rankline: 'المركز %r من %t', p_vs: 'مقارنة بمتوسط الفريق', p_team: 'متوسط الفريق', p_him: 'الفرد', p_weekly: 'الحضور الأسبوعي', p_none: 'مفيش أفراد في النطاق.',
      exp_h: 'تصدير', exp_print: 'طباعة / PDF', exp_word: 'ملف Word', exp_csv: 'ملف CSV (يفتح في Excel)', exp_cards: 'بطاقة لكل فرد في الطباعة والـWord', exp_note: 'التقرير فيه بيانات أشخاص — شاركه بس مع اللي له صلاحية.',
      exp_empty: 'مفيش بيانات تتصدّر في النطاق والفترة دول.', toast_csv: 'اتنزّل ملف CSV', toast_word: 'اتنزّل ملف Word', toast_print: 'بنجهّز الطباعة…',
      word_note: 'ملف Word بيعرض الرسوم كأعمدة جدول (مش صور).',
      loading: 'بنحمّل التقرير…', err_h: 'مقدرناش نحمّل التقرير', err_p: 'جرّب تاني. بياناتك محفوظة.', retry: 'حاول تاني', empty_h: 'مفيش بيانات في النطاق دا', empty_p: 'غيّر الفترة أو اختار أفراد تانيين.',
      pr_report: 'تقرير نتائج وحضور', pr_generated: 'اتعمل في', pr_card: 'بطاقة الفرد', pr_footer: 'ADAM — تقرير تجريبي (بيانات مخترعة)', pr_page: 'صفحة',
      lang_btn: 'تبديل اللغة', lang_to: 'English', theme_group: 'المظهر', th_dark: 'داكن', th_light: 'فاتح', th_system: 'حسب الجهاز',
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
    },
    en: {
      title: 'Results reports', h1: 'Results & attendance reports', lead: 'Attendance, absence and performance for each athlete or client, with ranking inside the team and groups — print it or download it.',
      sample: 'Sample data — names and numbers are invented and generated in the browser. No server is contacted. In the real app a coach only sees their own team.',
      scope_h: 'Who?', s_team: 'Whole team', s_group: 'A group', s_sel: 'Selected members', pick_group: 'Choose the group', pick_members: 'Choose members', all_n: 'Select all', none_n: 'Clear selection',
      per_h: 'Period', p_month: 'Last 4 weeks', p_quarter: 'Last 13 weeks', p_season: 'Whole season', p_custom: 'Custom', r_from: 'From', r_to: 'To', r_apply: 'Apply',
      e_bad: 'Enter a valid date in both fields.', e_order: 'The start date must be before the end date.', e_future: 'The end date cannot be in the future.',
      sum_scope: 'Scope', sum_period: 'Period', weeks_n: '%n weeks',
      t_rank: 'Ranking', t_att: 'Attendance & absence', t_trend: 'Performance', t_groups: 'Groups', t_person: 'Person card',
      k_people: 'People', k_att: 'Average attendance', k_perf: 'Average performance', k_abs: 'Unexcused absences', k_top: 'Top ranked',
      c_rank: 'Rank', c_name: 'Name', c_group: 'Group', c_att: 'Attendance', c_abs: 'Absent', c_exc: 'Excused', c_perf: 'Performance', c_score: 'Score', c_pct: 'Percentile', c_delta: 'vs previous period', c_planned: 'Planned', c_done: 'Attended',
      top_of: 'Top %p%', unranked: 'Not ranked', unranked_why: 'Needs at least %m weeks in the period to be ranked.',
      pts: 'pts', same: 'same', na: '—',
      rank_note: 'Score = 50% attendance + 50% performance. Attendance = sessions attended ÷ (planned − excused). Rank is computed across the whole team even if you pick only some members; ties share a rank.',
      att_h: 'Attendance and absence per person', att_legend: 'Attended', abs_legend: 'Unexcused absence', exc_legend: 'Excused absence',
      tr_h: 'Weekly performance trend', tr_who: 'Showing the top %n in scope — use “Selected members” to choose others.', tr_axis: 'Performance score (0 to 100)', tr_none: 'Not enough performance scores in this period.',
      chart_sum: 'Line chart of weekly performance from %a to %b for %n people.', show_table: 'Show data table', hide_table: 'Hide data table', c_week: 'Week ending',
      g_h: 'Group ranking', g_avg: 'Average score', g_members: 'People', g_share: 'Share of top group', g_note: 'A group is ranked by the average score of its ranked members. A group needs at least two ranked members.', g_unranked: 'Not enough',
      p_pick: 'Choose the person', p_card: 'Card: %n', p_rankline: 'Rank %r of %t', p_vs: 'Compared with the team average', p_team: 'Team average', p_him: 'Person', p_weekly: 'Weekly attendance', p_none: 'No people in this scope.',
      exp_h: 'Export', exp_print: 'Print / PDF', exp_word: 'Word file', exp_csv: 'CSV file (opens in Excel)', exp_cards: 'One card per person in print and Word', exp_note: 'The report contains personal data — share it only with people who are allowed to see it.',
      exp_empty: 'There is nothing to export for this scope and period.', toast_csv: 'CSV downloaded', toast_word: 'Word file downloaded', toast_print: 'Preparing to print…',
      word_note: 'The Word file shows charts as table bars (not images).',
      loading: 'Loading the report…', err_h: 'We could not load the report', err_p: 'Try again. Your data is safe.', retry: 'Try again', empty_h: 'No data in this scope', empty_p: 'Change the period or pick other members.',
      pr_report: 'Results & attendance report', pr_generated: 'Generated on', pr_card: 'Person card', pr_footer: 'ADAM — sample report (invented data)', pr_page: 'Page',
      lang_btn: 'Switch language', lang_to: 'العربية', theme_group: 'Appearance', th_dark: 'Dark', th_light: 'Light', th_system: 'Follow device',
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  };

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function lang() { return document.documentElement.lang === 'en' ? 'en' : 'ar'; }
  function rtl() { return lang() === 'ar'; }
  function tx(k) { var l = TX[lang()]; return l[k] != null ? l[k] : (TX.ar[k] != null ? TX.ar[k] : k); }
  function fill(s, o) { return String(s).replace(/%([a-z])/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function nm(o) { return o[lang()] || o.ar; }
  function num(n) { return '<bdi class="axn">' + esc(n) + '</bdi>'; }
  var memStore = {}, storageOk = true;
  function store(op, key, val) {
    try { return op === 'get' ? localStorage.getItem(key) : localStorage.setItem(key, val); }
    catch (e) { if (op === 'set') { storageOk = false; memStore[key] = val; } else if (key in memStore) return memStore[key]; return null; }
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); return new Date(+m[1], +m[2] - 1, +m[3]); }
  function today() { var f = window.__adamReportsToday; return /^\d{4}-\d{2}-\d{2}$/.test(f || '') ? f : iso(new Date()); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function validIso(s) { return /^\d{4}-\d{2}-\d{2}$/.test(s || '') && iso(parse(s)) === s; }
  function fmtDate(s) { var d = parse(s); return d.getDate() + ' ' + tx('months')[d.getMonth()] + ' ' + d.getFullYear(); }
  function dH(s) { return '<bdi class="axn">' + esc(fmtDate(s)) + '</bdi>'; }
  function round(x) { return Math.round(x); }

  /* ------------------------------------------------------------ state */
  var data = null, status = 'idle', tab = 'rank', scope = { kind: 'team', group: null, sel: [] }, period = { kind: 'season', from: null, to: null }, perErr = '';
  var personId = null, withCards = true, theme = 'dark', built = false, els = {}, toastTimer = null, tableOpen = false;
  var mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  /* ------------------------------------------------------------ maths */
  function computePeriod() {
    var t = data ? data.seasonTo : today();
    if (period.kind === 'month') { period.from = addDays(t, -7 * 4 + 1); period.to = t; }
    else if (period.kind === 'quarter') { period.from = addDays(t, -7 * 13 + 1); period.to = t; }
    else if (period.kind === 'season') { period.from = data ? data.seasonFrom : addDays(t, -7 * 25); period.to = t; }
  }
  function stats(m, from, to) {
    var ws = m.weeks.filter(function (w) { return w.d >= from && w.d <= to; }), pl = 0, at = 0, ex = 0, sc = [];
    ws.forEach(function (w) { pl += w.planned; at += w.attended; ex += w.excused; if (w.score != null) sc.push(w.score); });
    var counted = pl - ex, att = counted > 0 ? at / counted * 100 : null, perf = sc.length ? sc.reduce(function (a, b) { return a + b; }, 0) / sc.length : null;
    var comp = (att != null && perf != null && ws.length >= MIN_WEEKS) ? round(att * 0.5 + perf * 0.5) : null;
    return { weeks: ws, weeksN: ws.length, planned: pl, attended: at, excused: ex, absent: Math.max(0, pl - at - ex), att: att == null ? null : round(att), perf: perf == null ? null : round(perf), comp: comp };
  }
  function rankAll(from, to) {
    var rows = data.members.map(function (m) { return { m: m, s: stats(m, from, to) }; });
    var ranked = rows.filter(function (r) { return r.s.comp != null; }).sort(function (a, b) { return b.s.comp - a.s.comp || nm(a.m.name).localeCompare(nm(b.m.name)); });
    var n = ranked.length, prev = null, rk = 0;
    ranked.forEach(function (r, i) { if (prev === null || r.s.comp !== prev) { rk = i + 1; prev = r.s.comp; } r.rank = rk; r.top = Math.ceil(rk / n * 100); r.pctl = n > 1 ? round((n - rk) / (n - 1) * 100) : 100; });
    var map = {}; rows.forEach(function (r) { map[r.m.id] = r; });
    return { rows: rows, ranked: ranked, n: n, map: map };
  }
  function prevCompMap() {
    var span = Math.round((parse(period.to) - parse(period.from)) / 86400000) + 1, pf = addDays(period.from, -span), pt = addDays(period.from, -1);
    if (pf < data.seasonFrom) return null;
    return rankAll(pf, pt).map;
  }
  function inScope() {
    if (!data) return [];
    if (scope.kind === 'group') return data.members.filter(function (m) { return m.group === scope.group; });
    if (scope.kind === 'sel') return data.members.filter(function (m) { return scope.sel.indexOf(m.id) > -1; });
    return data.members.slice();
  }
  function model() {
    var R = rankAll(period.from, period.to), prev = prevCompMap(), list = inScope().map(function (m) { return R.map[m.id]; }).filter(function (r) { return r.s.weeksN > 0; });
    list.sort(function (a, b) { var ra = a.rank || 999, rb = b.rank || 999; return ra - rb || nm(a.m.name).localeCompare(nm(b.m.name)); });
    list.forEach(function (r) { var p = prev && prev[r.m.id]; r.delta = (p && p.s.comp != null && r.s.comp != null) ? r.s.comp - p.s.comp : null; });
    var groups = data.groups.map(function (g) {
      var mem = R.ranked.filter(function (r) { return r.m.group === g.id; }), all = data.members.filter(function (m) { return m.group === g.id; });
      var avg = mem.length >= 2 ? round(mem.reduce(function (a, r) { return a + r.s.comp; }, 0) / mem.length) : null;
      var att = mem.length ? round(mem.reduce(function (a, r) { return a + r.s.att; }, 0) / mem.length) : null;
      return { g: g, size: all.length, ranked: mem.length, avg: avg, att: att };
    });
    var gr = groups.filter(function (g) { return g.avg != null; }).sort(function (a, b) { return b.avg - a.avg; }), prevv = null, rk = 0;
    gr.forEach(function (g, i) { if (prevv === null || g.avg !== prevv) { rk = i + 1; prevv = g.avg; } g.rank = rk; g.share = gr[0].avg ? round(g.avg / gr[0].avg * 100) : 0; });
    groups.sort(function (a, b) { return (a.rank || 99) - (b.rank || 99); });
    var attA = list.filter(function (r) { return r.s.att != null; }), perA = list.filter(function (r) { return r.s.perf != null; });
    var avg = function (arr, f) { return arr.length ? round(arr.reduce(function (a, r) { return a + f(r); }, 0) / arr.length) : null; };
    var teamAtt = avg(R.rows.filter(function (r) { return r.s.att != null; }), function (r) { return r.s.att; }), teamPerf = avg(R.rows.filter(function (r) { return r.s.perf != null; }), function (r) { return r.s.perf; });
    return { R: R, list: list, groups: groups, kp: { people: list.length, att: avg(attA, function (r) { return r.s.att; }), perf: avg(perA, function (r) { return r.s.perf; }), abs: list.reduce(function (a, r) { return a + r.s.absent; }, 0), top: list.filter(function (r) { return r.rank; })[0] || null }, teamAtt: teamAtt, teamPerf: teamPerf };
  }
  function grpName(id) { for (var i = 0; i < data.groups.length; i++) if (data.groups[i].id === id) return nm(data.groups[i].name); return ''; }
  function scopeLabel() {
    if (scope.kind === 'group') return tx('s_group') + ': ' + grpName(scope.group);
    if (scope.kind === 'sel') return tx('s_sel') + ' (' + scope.sel.length + ')';
    return tx('s_team');
  }
  function periodLabel() { return fmtDate(period.from) + ' → ' + fmtDate(period.to); }
  function pctText(r) { return r.rank ? fill(tx('top_of'), { p: r.top }) : tx('unranked'); }

  /* ------------------------------------------------------------ pieces (shared by screen, print and Word-ish) */
  function barRow(r, maxLabel) {
    var s = r.s, tot = s.planned || 1, a = s.attended / tot * 100, e = s.excused / tot * 100, b = s.absent / tot * 100;
    return '<li class="axr-brow"><span class="axr-bn">' + esc(nm(r.m.name)) + '</span><span class="axr-btrack" role="img" aria-label="' + esc(nm(r.m.name) + ': ' + tx('c_done') + ' ' + s.attended + ', ' + tx('c_exc') + ' ' + s.excused + ', ' + tx('c_abs') + ' ' + s.absent + ' / ' + s.planned) + '"><i class="axr-ba" style="inline-size:' + a.toFixed(1) + '%"></i><i class="axr-be" style="inline-size:' + e.toFixed(1) + '%"></i><i class="axr-bb" style="inline-size:' + b.toFixed(1) + '%"></i></span><span class="axr-bv">' + num(s.att == null ? tx('na') : s.att + '%') + '</span></li>';
  }
  function attChart(list) {
    var rows = list.slice().sort(function (a, b) { return (b.s.att == null ? -1 : b.s.att) - (a.s.att == null ? -1 : a.s.att); });
    return '<ul class="axr-bars">' + rows.map(barRow).join('') + '</ul><p class="axr-legend"><span><i class="axr-ba"></i>' + esc(tx('att_legend')) + '</span><span><i class="axr-be"></i>' + esc(tx('exc_legend')) + '</span><span><i class="axr-bb"></i>' + esc(tx('abs_legend')) + '</span></p>';
  }
  var DASH = ['', '6 4', '2 3', '10 3 2 3'], MARK = ['c', 's', 't', 'd'];
  function mark(k, x, y, col) { /* col = series index; colour comes from CSS so each theme gets its own contrast-safe palette */
    if (k === 'c') return '<circle cx="' + x + '" cy="' + y + '" r="3.6" class="axr-f' + col + '"/>';
    if (k === 's') return '<rect x="' + (x - 3.4) + '" y="' + (y - 3.4) + '" width="6.8" height="6.8" class="axr-f' + col + '"/>';
    if (k === 't') return '<path d="M' + x + ' ' + (y - 4.4) + 'L' + (x + 4.2) + ' ' + (y + 3.4) + 'L' + (x - 4.2) + ' ' + (y + 3.4) + 'Z" class="axr-f' + col + '"/>';
    return '<path d="M' + x + ' ' + (y - 4.6) + 'L' + (x + 4.4) + ' ' + y + 'L' + x + ' ' + (y + 4.6) + 'L' + (x - 4.4) + ' ' + y + 'Z" class="axr-f' + col + '"/>';
  }
  function trendPeople(M) { return M.list.filter(function (r) { return r.s.perf != null; }).slice(0, 4); }
  function trendChart(M, uid) {
    var ppl = trendPeople(M);
    if (!ppl.length) return '<p class="axr-muted">' + esc(tx('tr_none')) + '</p>';
    var weeks = ppl[0].s.weeks.map(function (w) { return w.d; }), W = 640, H = 250, PL = 40, PR = 14, PT = 14, PB = 30, n = weeks.length, flip = rtl() && MIRROR_TIME_IN_RTL;
    function X(i) { var t = n > 1 ? i / (n - 1) : 0.5; if (flip) t = 1 - t; return PL + t * (W - PL - PR); }
    function Y(v) { return PT + (1 - v / 100) * (H - PT - PB); }
    var g = '';
    [0, 25, 50, 75, 100].forEach(function (v) { g += '<line x1="' + PL + '" x2="' + (W - PR) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" class="axr-grid"/><text x="' + (PL - 6) + '" y="' + (Y(v) + 4) + '" text-anchor="end" class="axr-tick">' + v + '</text>'; });
    g += '<text x="' + X(0) + '" y="' + (H - 8) + '" text-anchor="' + (flip ? 'end' : 'start') + '" class="axr-tick">' + esc(fmtDate(weeks[0])) + '</text><text x="' + X(n - 1) + '" y="' + (H - 8) + '" text-anchor="' + (flip ? 'start' : 'end') + '" class="axr-tick">' + esc(fmtDate(weeks[n - 1])) + '</text>';
    ppl.forEach(function (r, k) {
      var pts = [], mk = '';
      r.s.weeks.forEach(function (w, i) { if (w.score != null) { var x = X(i).toFixed(1), y = Y(w.score).toFixed(1); pts.push(x + ',' + y); if (n <= 14 || i === n - 1) mk += mark(MARK[k], +x, +y, k); } });
      g += '<polyline points="' + pts.join(' ') + '" fill="none" class="axr-s' + k + '" stroke-width="2.4"' + (DASH[k] ? ' stroke-dasharray="' + DASH[k] + '"' : '') + ' stroke-linejoin="round" stroke-linecap="round"/>' + mk;
    });
    var sum = fill(tx('chart_sum'), { a: fmtDate(weeks[0]), b: fmtDate(weeks[n - 1]), n: ppl.length });
    var legend = '<ul class="axr-lg">' + ppl.map(function (r, k) { return '<li><svg viewBox="0 0 30 12" width="30" height="12" aria-hidden="true"><line x1="0" x2="30" y1="6" y2="6" class="axr-s' + k + '" stroke-width="2.4"' + (DASH[k] ? ' stroke-dasharray="' + DASH[k] + '"' : '') + '/>' + mark(MARK[k], 15, 6, k) + '</svg> ' + esc(nm(r.m.name)) + '</li>'; }).join('') + '</ul>';
    var tbl = '<div class="axr-tw"' + (uid ? '' : ' hidden') + '><table class="axr-t"><caption>' + esc(tx('tr_h')) + '</caption><thead><tr><th scope="col">' + esc(tx('c_week')) + '</th>' + ppl.map(function (r) { return '<th scope="col">' + esc(nm(r.m.name)) + '</th>'; }).join('') + '</tr></thead><tbody>' + weeks.map(function (d, i) { return '<tr><th scope="row">' + dH(d) + '</th>' + ppl.map(function (r) { var w = r.s.weeks[i]; return '<td>' + num(w && w.score != null ? w.score : tx('na')) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
    return '<figure class="axr-fig"><figcaption class="axr-fc">' + esc(tx('tr_axis')) + '</figcaption><div class="axr-ch"><svg class="axr-svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(sum) + '">' + g + '</svg></div>' + legend + '</figure>';
  }
  function trendTable(M) { /* only on screen: toggled data table */
    var ppl = trendPeople(M); if (!ppl.length) return '';
    var weeks = ppl[0].s.weeks.map(function (w) { return w.d; });
    return '<button type="button" class="ax-btn" id="axr-tbl-btn" aria-expanded="' + tableOpen + '" aria-controls="axr-tbl">' + esc(tableOpen ? tx('hide_table') : tx('show_table')) + '</button><div id="axr-tbl" class="axr-tw"' + (tableOpen ? '' : ' hidden') + '><table class="axr-t"><caption class="axr-sr">' + esc(tx('tr_h')) + '</caption><thead><tr><th scope="col">' + esc(tx('c_week')) + '</th>' + ppl.map(function (r) { return '<th scope="col">' + esc(nm(r.m.name)) + '</th>'; }).join('') + '</tr></thead><tbody>' + weeks.map(function (d, i) { return '<tr><th scope="row">' + dH(d) + '</th>' + ppl.map(function (r) { var w = r.s.weeks[i]; return '<td>' + num(w && w.score != null ? w.score : tx('na')) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  function deltaHtml(r) {
    if (r.delta == null) return '<span class="axr-muted">' + esc(tx('na')) + '</span>';
    if (r.delta === 0) return '<span class="axr-flat">' + esc(tx('same')) + '</span>';
    return '<span class="' + (r.delta > 0 ? 'axr-up' : 'axr-dn') + '">' + (r.delta > 0 ? '▲ ' : '▼ ') + num(Math.abs(r.delta)) + ' ' + esc(tx('pts')) + '</span>';
  }
  function rankTable(M) {
    var rows = M.list.map(function (r) {
      var s = r.s;
      return '<tr><td class="axr-rk">' + (r.rank ? num(r.rank) : '<span class="axr-muted" title="' + esc(fill(tx('unranked_why'), { m: MIN_WEEKS })) + '">' + esc(tx('na')) + '</span>') + '</td><th scope="row">' + esc(nm(r.m.name)) + '</th><td>' + esc(grpName(r.m.group)) + '</td><td>' + num(s.att == null ? tx('na') : s.att + '%') + '</td><td>' + num(s.absent) + '</td><td>' + num(s.excused) + '</td><td>' + num(s.perf == null ? tx('na') : s.perf) + '</td><td><b>' + num(s.comp == null ? tx('na') : s.comp) + '</b></td><td>' + (r.rank ? '<span class="axr-pill">' + esc(pctText(r)) + '</span><span class="axr-pbar" aria-hidden="true"><i style="inline-size:' + r.pctl + '%"></i></span>' : '<span class="axr-muted">' + esc(tx('unranked')) + '</span>') + '</td><td>' + deltaHtml(r) + '</td></tr>';
    }).join('');
    return '<div class="axr-tw"><table class="axr-t axr-rank"><caption class="axr-sr">' + esc(tx('t_rank')) + '</caption><thead><tr><th scope="col">' + esc(tx('c_rank')) + '</th><th scope="col">' + esc(tx('c_name')) + '</th><th scope="col">' + esc(tx('c_group')) + '</th><th scope="col">' + esc(tx('c_att')) + '</th><th scope="col">' + esc(tx('c_abs')) + '</th><th scope="col">' + esc(tx('c_exc')) + '</th><th scope="col">' + esc(tx('c_perf')) + '</th><th scope="col">' + esc(tx('c_score')) + '</th><th scope="col">' + esc(tx('c_pct')) + '</th><th scope="col">' + esc(tx('c_delta')) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div><p class="axr-muted axr-note">' + esc(tx('rank_note')) + '</p>';
  }
  function groupsTable(M) {
    var rows = M.groups.map(function (g) {
      return '<tr><td class="axr-rk">' + (g.rank ? num(g.rank) : '<span class="axr-muted">' + esc(tx('na')) + '</span>') + '</td><th scope="row">' + esc(nm(g.g.name)) + '</th><td>' + num(g.ranked + '/' + g.size) + '</td><td>' + num(g.att == null ? tx('na') : g.att + '%') + '</td><td><b>' + num(g.avg == null ? tx('g_unranked') : g.avg) + '</b></td><td>' + (g.rank ? '<span class="axr-pbar axr-pbar-w"><i style="inline-size:' + g.share + '%"></i></span> ' + num(g.share + '%') : '<span class="axr-muted">' + esc(tx('g_unranked')) + '</span>') + '</td></tr>';
    }).join('');
    return '<div class="axr-tw"><table class="axr-t"><caption class="axr-sr">' + esc(tx('g_h')) + '</caption><thead><tr><th scope="col">' + esc(tx('c_rank')) + '</th><th scope="col">' + esc(tx('c_group')) + '</th><th scope="col">' + esc(tx('g_members')) + '</th><th scope="col">' + esc(tx('c_att')) + '</th><th scope="col">' + esc(tx('g_avg')) + '</th><th scope="col">' + esc(tx('g_share')) + '</th></tr></thead><tbody>' + rows + '</tbody></table></div><p class="axr-muted axr-note">' + esc(tx('g_note')) + '</p>';
  }
  function kpiHtml(M) {
    var k = M.kp, top = k.top;
    function cell(ic, label, val, unit) { return '<li class="axa-kpi axr-kpi"><div class="axa-kl">' + icon(ic) + '<span>' + esc(label) + '</span></div><div class="axa-kv">' + num(val == null ? tx('na') : val) + (unit && val != null ? '<span class="axa-ku">' + esc(unit) + '</span>' : '') + '</div></li>'; }
    return '<ul class="axa-kpis axr-kpis">' + cell('users', tx('k_people'), k.people) + cell('user-check', tx('k_att'), k.att, '%') + cell('chart-bar', tx('k_perf'), k.perf, '') + cell('x', tx('k_abs'), k.abs, '') + '<li class="axa-kpi axr-kpi"><div class="axa-kl">' + icon('trophy') + '<span>' + esc(tx('k_top')) + '</span></div><div class="axa-kv axr-kname">' + (top ? esc(nm(top.m.name)) : num(tx('na'))) + '</div></li></ul>';
  }
  function cardHtml(r, M, pr) {
    var s = r.s, n = M.R.n, vs = function (label, a, b, suf) { return '<div class="axr-vs"><span class="axr-vl">' + esc(label) + '</span><span class="axr-vt" role="img" aria-label="' + esc(tx('p_him') + ' ' + (a == null ? '' : a) + ', ' + tx('p_team') + ' ' + (b == null ? '' : b)) + '"><i class="axr-vh" style="inline-size:' + (a || 0) + '%"></i><i class="axr-vm" style="inset-inline-start:' + (b || 0) + '%"></i></span><span class="axr-vv">' + num(a == null ? tx('na') : a + suf) + ' <small>/ ' + num(b == null ? tx('na') : b + suf) + '</small></span></div>'; };
    var wk = s.weeks, mx = 3, sparks = '<ul class="axr-spark" aria-label="' + esc(tx('p_weekly')) + '">' + wk.map(function (w) { var h = w.planned ? Math.round(w.attended / mx * 100) : 0; return '<li title="' + esc(fmtDate(w.d) + ': ' + w.attended + '/' + w.planned) + '"><i style="block-size:' + Math.max(4, h) + '%"></i></li>'; }).join('') + '</ul>';
    return '<article class="axr-card' + (pr ? ' axr-pcard' : '') + '"><header class="axr-ch1"><div><h3>' + esc(fill(tx('p_card'), { n: nm(r.m.name) })) + '</h3><p class="axr-muted">' + esc(grpName(r.m.group)) + ' · ' + esc(periodLabel()) + '</p></div><div class="axr-big" aria-label="' + esc(r.rank ? fill(tx('p_rankline'), { r: r.rank, t: n }) : tx('unranked')) + '">' + (r.rank ? '<b>' + num(r.rank) + '</b><small>' + esc(fill(tx('p_rankline'), { r: '', t: n }).replace(/\s+/g, ' ').trim()) + '</small><span class="axr-pill">' + esc(pctText(r)) + '</span>' : '<span class="axr-pill">' + esc(tx('unranked')) + '</span>') + '</div></header>' +
      '<ul class="axr-mini"><li><span>' + esc(tx('c_planned')) + '</span><b>' + num(s.planned) + '</b></li><li><span>' + esc(tx('c_done')) + '</span><b>' + num(s.attended) + '</b></li><li><span>' + esc(tx('c_exc')) + '</span><b>' + num(s.excused) + '</b></li><li><span>' + esc(tx('c_abs')) + '</span><b>' + num(s.absent) + '</b></li><li><span>' + esc(tx('c_score')) + '</span><b>' + num(s.comp == null ? tx('na') : s.comp) + '</b></li></ul>' +
      '<h4>' + esc(tx('p_vs')) + '</h4>' + vs(tx('c_att'), s.att, M.teamAtt, '%') + vs(tx('c_perf'), s.perf, M.teamPerf, '') + '<h4>' + esc(tx('p_weekly')) + '</h4>' + sparks + (r.delta != null ? '<p class="axr-muted">' + esc(tx('c_delta')) + ': ' + deltaHtml(r) + '</p>' : '') + '</article>';
  }

  /* ------------------------------------------------------------ screen */
  function scopeHtml() {
    var h = '<section class="axa-range" aria-labelledby="axr-sh"><h2 id="axr-sh" class="axr-h2">' + esc(tx('scope_h')) + '</h2><div class="axa-chips" role="group" aria-label="' + esc(tx('scope_h')) + '">';
    [['team', 's_team'], ['group', 's_group'], ['sel', 's_sel']].forEach(function (a) { h += '<button type="button" class="ax-chip" data-scope="' + a[0] + '" aria-pressed="' + (scope.kind === a[0]) + '">' + esc(tx(a[1])) + '</button>'; });
    h += '</div>';
    if (scope.kind === 'group') h += '<label class="axt-lab" for="axr-grp">' + esc(tx('pick_group')) + '</label><select id="axr-grp" class="axt-in">' + data.groups.map(function (g) { return '<option value="' + g.id + '"' + (g.id === scope.group ? ' selected' : '') + '>' + esc(nm(g.name)) + '</option>'; }).join('') + '</select>';
    if (scope.kind === 'sel') h += '<fieldset class="axr-pick"><legend>' + esc(tx('pick_members')) + '</legend><div class="axr-picks">' + data.members.map(function (m) { return '<label class="axr-chk"><input type="checkbox" data-mem="' + m.id + '"' + (scope.sel.indexOf(m.id) > -1 ? ' checked' : '') + '> <span>' + esc(nm(m.name)) + '</span></label>'; }).join('') + '</div><div class="axa-chips"><button type="button" class="ax-btn" id="axr-all">' + esc(tx('all_n')) + '</button><button type="button" class="ax-btn" id="axr-none">' + esc(tx('none_n')) + '</button></div></fieldset>';
    h += '<h2 class="axr-h2">' + esc(tx('per_h')) + '</h2><div class="axa-chips" role="group" aria-label="' + esc(tx('per_h')) + '">';
    [['month', 'p_month'], ['quarter', 'p_quarter'], ['season', 'p_season'], ['custom', 'p_custom']].forEach(function (a) { h += '<button type="button" class="ax-chip" data-per="' + a[0] + '" aria-pressed="' + (period.kind === a[0]) + '">' + esc(tx(a[1])) + '</button>'; });
    h += '</div>';
    if (period.kind === 'custom') h += '<div class="axa-cust"><label class="axt-lab" for="axr-from">' + esc(tx('r_from')) + '</label><input id="axr-from" class="axt-in" type="date" value="' + esc(period.from || '') + '" min="' + esc(data.seasonFrom) + '" max="' + esc(data.seasonTo) + '"><label class="axt-lab" for="axr-to">' + esc(tx('r_to')) + '</label><input id="axr-to" class="axt-in" type="date" value="' + esc(period.to || '') + '" min="' + esc(data.seasonFrom) + '" max="' + esc(data.seasonTo) + '"><button type="button" class="ax-btn ax-primary" id="axr-apply">' + esc(tx('r_apply')) + '</button>' + (perErr ? '<p class="axt-err" role="alert" id="axr-perr">' + esc(perErr) + '</p>' : '') + '</div>';
    h += '<p class="axa-sum" id="axr-sum">' + esc(tx('sum_scope')) + ': ' + esc(scopeLabel()) + ' · ' + esc(tx('sum_period')) + ': <bdi class="axn">' + esc(periodLabel()) + '</bdi> <span class="axa-days">(' + esc(fill(tx('weeks_n'), { n: Math.max(1, Math.round((parse(period.to) - parse(period.from)) / 604800000)) })) + ')</span></p></section>';
    return h;
  }
  function exportHtml() {
    return '<section class="axa-range" aria-labelledby="axr-eh"><h2 id="axr-eh" class="axr-h2">' + esc(tx('exp_h')) + '</h2><div class="axa-chips"><button type="button" class="ax-btn ax-primary" id="axr-print">' + icon('printer') + ' ' + esc(tx('exp_print')) + '</button><button type="button" class="ax-btn" id="axr-word">' + icon('file-word') + ' ' + esc(tx('exp_word')) + '</button><button type="button" class="ax-btn" id="axr-csv">' + icon('file-spreadsheet') + ' ' + esc(tx('exp_csv')) + '</button></div><label class="axr-chk"><input type="checkbox" id="axr-cards"' + (withCards ? ' checked' : '') + '> <span>' + esc(tx('exp_cards')) + '</span></label><p class="axr-muted axr-note">' + esc(tx('exp_note')) + ' ' + esc(tx('word_note')) + '</p></section>';
  }
  function tabsHtml() {
    var T = [['rank', 't_rank', 'trophy'], ['att', 't_att', 'user-check'], ['trend', 't_trend', 'chart-line'], ['groups', 't_groups', 'users-group'], ['person', 't_person', 'medal']];
    return '<div class="ax-tabs axr-tabs" role="tablist" aria-label="' + esc(tx('h1')) + '">' + T.map(function (t) { return '<button type="button" role="tab" id="axr-tab-' + t[0] + '" data-tab="' + t[0] + '" aria-selected="' + (tab === t[0]) + '" tabindex="' + (tab === t[0] ? 0 : -1) + '" aria-controls="axr-panel">' + icon(t[2]) + '<span>' + esc(tx(t[1])) + '</span></button>'; }).join('') + '</div>';
  }
  function panelHtml(M) {
    var h;
    if (tab === 'rank') h = rankTable(M);
    else if (tab === 'att') h = '<h2 class="axr-h2">' + esc(tx('att_h')) + '</h2>' + attChart(M.list);
    else if (tab === 'trend') h = '<h2 class="axr-h2">' + esc(tx('tr_h')) + '</h2><p class="axr-muted">' + esc(fill(tx('tr_who'), { n: Math.min(4, trendPeople(M).length) })) + '</p>' + trendChart(M, false) + trendTable(M);
    else if (tab === 'groups') h = '<h2 class="axr-h2">' + esc(tx('g_h')) + '</h2>' + groupsTable(M);
    else {
      if (!personId || !M.list.some(function (r) { return r.m.id === personId; })) personId = M.list[0] && M.list[0].m.id;
      h = '<label class="axt-lab" for="axr-who">' + esc(tx('p_pick')) + '</label><select id="axr-who" class="axt-in">' + M.list.map(function (r) { return '<option value="' + r.m.id + '"' + (r.m.id === personId ? ' selected' : '') + '>' + esc(nm(r.m.name)) + '</option>'; }).join('') + '</select>';
      var cur = M.list.filter(function (r) { return r.m.id === personId; })[0];
      h += cur ? cardHtml(cur, M, false) : '<p class="axr-muted">' + esc(tx('p_none')) + '</p>';
    }
    return '<div id="axr-panel" role="tabpanel" aria-labelledby="axr-tab-' + tab + '" tabindex="0" class="axr-panel">' + h + '</div>';
  }
  var M0 = null;
  function renderAll() {
    var b = els.body, h = '<p class="ax-sample" role="note">' + icon('flask') + '<span>' + esc(tx('sample')) + '</span></p><section class="ax-hero"><h1 id="axr-h1" tabindex="-1">' + esc(tx('h1')) + '</h1><p class="ax-lead">' + esc(tx('lead')) + '</p></section>';
    if (status === 'loading' || status === 'idle') { b.innerHTML = h + '<p class="axr-muted" role="status">' + esc(tx('loading')) + '</p>'; return; }
    if (status === 'error') { b.innerHTML = h + '<div class="ax-state" role="alert"><h2>' + esc(tx('err_h')) + '</h2><p>' + esc(tx('err_p')) + '</p><button type="button" class="ax-btn ax-primary" id="axr-retry">' + esc(tx('retry')) + '</button></div>'; return; }
    var focusId = document.activeElement && els.root.contains(document.activeElement) ? document.activeElement.id : '';
    M0 = model();
    h += scopeHtml();
    if (!M0.list.length) h += '<div class="ax-state"><h2>' + esc(tx('empty_h')) + '</h2><p>' + esc(tx('empty_p')) + '</p></div>';
    else h += kpiHtml(M0) + exportHtml() + tabsHtml() + panelHtml(M0);
    b.innerHTML = h;
    if (focusId) { var f = document.getElementById(focusId); if (f && f.focus) f.focus({ preventScroll: true }); }
  }

  /* ------------------------------------------------------------ exports */
  var PAL = { ink: '#12202F', mut: '#5A6B7C', line: '#D5DDE6', brand: '#0E8F6B', soft: '#E7F6F1', warn: '#B7791F', bg: '#FFFFFF' };
  function csvCell(v) { var s = String(v == null ? '' : v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
  function csv() {
    var M = model(), rows = [['rank', 'name', 'group', 'weeks', 'planned', 'attended', 'excused', 'absent_unexcused', 'attendance_pct', 'performance', 'score', 'top_pct', 'delta_vs_previous']];
    M.list.forEach(function (r) { var s = r.s; rows.push([r.rank || '', nm(r.m.name), grpName(r.m.group), s.weeksN, s.planned, s.attended, s.excused, s.absent, s.att == null ? '' : s.att, s.perf == null ? '' : s.perf, s.comp == null ? '' : s.comp, r.rank ? r.top : '', r.delta == null ? '' : r.delta]); });
    return { name: 'adam-results-' + period.from + '_' + period.to + '.csv', content: rows.map(function (r) { return r.map(csvCell).join(','); }).join('\n') + '\n', rows: M.list.length };
  }
  function download(name, mime, content) {
    var blob = new Blob([content], { type: mime }), url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  function printHtml(M, withC) {
    var now = fmtDate(today()), cards = withC ? M.list.map(function (r) { return '<section class="axr-page">' + cardHtml(r, M, true) + '</section>'; }).join('') : '';
    return '<section class="axr-page axr-cover"><div class="axr-logo">ADAM</div><h1>' + esc(tx('pr_report')) + '</h1><p class="axr-sub">' + esc(nm(data.team.name)) + '</p><dl class="axr-meta"><dt>' + esc(tx('sum_scope')) + '</dt><dd>' + esc(scopeLabel()) + '</dd><dt>' + esc(tx('sum_period')) + '</dt><dd><bdi>' + esc(periodLabel()) + '</bdi></dd><dt>' + esc(tx('pr_generated')) + '</dt><dd><bdi>' + esc(now) + '</bdi></dd></dl>' + kpiHtml(M) + '<p class="axr-muted axr-note">' + esc(tx('rank_note')) + '</p></section>' +
      '<section class="axr-page"><h2>' + esc(tx('t_rank')) + '</h2>' + rankTable(M) + '</section>' +
      '<section class="axr-page"><h2>' + esc(tx('att_h')) + '</h2>' + attChart(M.list) + '</section>' +
      '<section class="axr-page"><h2>' + esc(tx('tr_h')) + '</h2>' + trendChart(M, true) + '<h2>' + esc(tx('g_h')) + '</h2>' + groupsTable(M) + '</section>' + cards;
  }
  function doPrint() {
    var M = model(); if (!M.list.length) { toast(tx('exp_empty')); return; }
    var old = $('#axr-print'); if (old) old.remove();
    var p = document.createElement('div'); p.id = 'axr-print'; p.className = 'ax axa axr axr-printroot'; p.setAttribute('data-theme', 'light'); p.setAttribute('lang', lang()); p.setAttribute('dir', rtl() ? 'rtl' : 'ltr');
    p.innerHTML = printHtml(M, withCards) + '<footer class="axr-pfoot">' + esc(tx('pr_footer')) + '</footer>';
    document.body.appendChild(p); toast(tx('toast_print'));
    var cleanup = function () { var x = $('#axr-print'); if (x) x.remove(); window.removeEventListener('afterprint', cleanup); };
    window.addEventListener('afterprint', cleanup);
    setTimeout(function () { try { window.print(); } catch (e) { cleanup(); } }, 60);
  }
  function wordHtml(M, withC) {
    function T(h) { return h; }
    function bar(r) { var s = r.s, tot = s.planned || 1; function w(n) { return Math.max(0, Math.round(n / tot * 100)); } return '<table style="width:100%;border-collapse:collapse"><tr>' + (s.attended ? '<td width="' + w(s.attended) + '%" bgcolor="' + PAL.brand + '">&nbsp;</td>' : '') + (s.excused ? '<td width="' + w(s.excused) + '%" bgcolor="#9AA7B4">&nbsp;</td>' : '') + (s.absent ? '<td width="' + w(s.absent) + '%" bgcolor="' + PAL.warn + '">&nbsp;</td>' : '') + '</tr></table>'; }
    var th = 'style="border:1px solid ' + PAL.line + ';padding:5px;background:' + PAL.soft + ';text-align:' + (rtl() ? 'right' : 'left') + '"', td = 'style="border:1px solid ' + PAL.line + ';padding:5px"';
    var head = ['c_rank', 'c_name', 'c_group', 'c_att', 'c_abs', 'c_exc', 'c_perf', 'c_score', 'c_pct'].map(function (k) { return '<th ' + th + '>' + esc(tx(k)) + '</th>'; }).join('');
    var body = M.list.map(function (r) { var s = r.s; return '<tr><td ' + td + '>' + (r.rank || esc(tx('na'))) + '</td><td ' + td + '>' + esc(nm(r.m.name)) + '</td><td ' + td + '>' + esc(grpName(r.m.group)) + '</td><td ' + td + '>' + (s.att == null ? esc(tx('na')) : s.att + '%') + '</td><td ' + td + '>' + s.absent + '</td><td ' + td + '>' + s.excused + '</td><td ' + td + '>' + (s.perf == null ? esc(tx('na')) : s.perf) + '</td><td ' + td + '><b>' + (s.comp == null ? esc(tx('na')) : s.comp) + '</b></td><td ' + td + '>' + esc(pctText(r)) + '</td></tr>'; }).join('');
    var bars = M.list.map(function (r) { return '<tr><td ' + td + ' width="22%">' + esc(nm(r.m.name)) + '</td><td ' + td + '>' + bar(r) + '</td><td ' + td + ' width="12%">' + (r.s.att == null ? esc(tx('na')) : r.s.att + '%') + '</td></tr>'; }).join('');
    var grp = M.groups.map(function (g) { return '<tr><td ' + td + '>' + (g.rank || esc(tx('na'))) + '</td><td ' + td + '>' + esc(nm(g.g.name)) + '</td><td ' + td + '>' + g.ranked + '/' + g.size + '</td><td ' + td + '>' + (g.att == null ? esc(tx('na')) : g.att + '%') + '</td><td ' + td + '>' + (g.avg == null ? esc(tx('g_unranked')) : g.avg) + '</td></tr>'; }).join('');
    var cards = withC ? M.list.map(function (r) { var s = r.s; return '<h3 style="page-break-before:always;color:' + PAL.ink + '">' + esc(fill(tx('p_card'), { n: nm(r.m.name) })) + '</h3><p>' + esc(grpName(r.m.group)) + ' — ' + esc(periodLabel()) + '</p><p><b>' + esc(r.rank ? fill(tx('p_rankline'), { r: r.rank, t: M.R.n }) + ' — ' + pctText(r) : tx('unranked')) + '</b></p><table style="border-collapse:collapse"><tr><td ' + td + '>' + esc(tx('c_planned')) + ': ' + s.planned + '</td><td ' + td + '>' + esc(tx('c_done')) + ': ' + s.attended + '</td><td ' + td + '>' + esc(tx('c_exc')) + ': ' + s.excused + '</td><td ' + td + '>' + esc(tx('c_abs')) + ': ' + s.absent + '</td><td ' + td + '>' + esc(tx('c_score')) + ': ' + (s.comp == null ? esc(tx('na')) : s.comp) + '</td></tr></table>'; }).join('') : '';
    return '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>' + esc(tx('pr_report')) + '</title><style>body{font-family:Cairo,Arial,sans-serif;color:' + PAL.ink + '}h1{color:' + PAL.brand + '}</style></head><body dir="' + (rtl() ? 'rtl' : 'ltr') + '" lang="' + lang() + '"><h1>ADAM — ' + esc(tx('pr_report')) + '</h1><p><b>' + esc(nm(data.team.name)) + '</b><br>' + esc(tx('sum_scope')) + ': ' + esc(scopeLabel()) + '<br>' + esc(tx('sum_period')) + ': ' + esc(periodLabel()) + '<br>' + esc(tx('pr_generated')) + ': ' + esc(fmtDate(today())) + '</p><h2>' + esc(tx('t_rank')) + '</h2><table style="width:100%;border-collapse:collapse"><tr>' + head + '</tr>' + body + '</table><p>' + esc(tx('rank_note')) + '</p><h2>' + esc(tx('att_h')) + '</h2><table style="width:100%;border-collapse:collapse">' + bars + '</table><p>' + esc(tx('att_legend')) + ' (' + PAL.brand + ') · ' + esc(tx('exc_legend')) + ' (gray) · ' + esc(tx('abs_legend')) + ' (' + PAL.warn + ')</p><h2>' + esc(tx('g_h')) + '</h2><table style="width:100%;border-collapse:collapse"><tr>' + ['c_rank', 'c_group', 'g_members', 'c_att', 'g_avg'].map(function (k) { return '<th ' + th + '>' + esc(tx(k)) + '</th>'; }).join('') + '</tr>' + grp + '</table>' + cards + '<p style="color:' + PAL.mut + '">' + esc(tx('pr_footer')) + '</p></body></html>';
  }
  function doWord() { var M = model(); if (!M.list.length) { toast(tx('exp_empty')); return; } download('adam-results-' + period.from + '_' + period.to + '.doc', 'application/msword;charset=utf-8', '﻿' + wordHtml(M, withCards)); toast(tx('toast_word')); }
  function doCsv() { var f = csv(); if (!f.rows) { toast(tx('exp_empty')); return; } download(f.name, 'text/csv;charset=utf-8', '﻿' + f.content); toast(tx('toast_csv')); }

  /* ------------------------------------------------------------ chrome */
  function toast(msg) { els.toast.textContent = msg; els.toast.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { els.toast.classList.remove('on'); }, 2600); }
  function build() {
    if (built) return; built = true;
    var root = document.createElement('div'); root.className = 'ax axa axr'; root.id = 'adam-reports';
    root.innerHTML = '<div class="ax-main" id="axr-main"><header class="ax-top"><div class="ax-brand" data-i="title"></div><div class="ax-ctrl"><div class="ax-seg" role="group" data-ia="theme_group">' +
      '<button type="button" data-th="dark" data-ia="th_dark">' + icon('moon') + '</button><button type="button" data-th="light" data-ia="th_light">' + icon('sun') + '</button><button type="button" data-th="system" data-ia="th_system">' + icon('device-desktop') + '</button></div>' +
      '<button type="button" class="ax-lang" id="axr-lang" data-ia="lang_btn"></button></div></header><div class="ax-scroll" id="axr-scroll"><div class="ax-wrap" id="axr-body"></div></div></div><div class="ax-toast" id="axr-toast" role="status" aria-live="polite"></div>';
    document.body.appendChild(root);
    els.root = root; els.body = $('#axr-body', root); els.toast = $('#axr-toast', root); els.lang = $('#axr-lang', root);
    bind();
  }
  function applyStatic() {
    var r = els.root;
    $$('[data-i]', r).forEach(function (n) { n.textContent = tx(n.getAttribute('data-i')); });
    $$('[data-ia]', r).forEach(function (n) { n.setAttribute('aria-label', tx(n.getAttribute('data-ia'))); });
    els.lang.textContent = tx('lang_to');
    $$('[data-th]', r).forEach(function (b) { b.setAttribute('title', tx('th_' + b.getAttribute('data-th'))); });
    r.setAttribute('lang', lang()); r.setAttribute('dir', rtl() ? 'rtl' : 'ltr'); document.title = tx('title') + ' — ADAM';
  }
  function getThemePref() { var t = store('get', LS_THEME); return (t === 'light' || t === 'dark' || t === 'system') ? t : 'dark'; }
  function applyTheme() {
    var r = theme === 'system' ? ((mqDark && !mqDark.matches) ? 'light' : 'dark') : theme;
    els.root.setAttribute('data-theme', r); els.root.style.colorScheme = r;
    $$('[data-th]', els.root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-th') === theme)); });
  }
  function setPeriod(kind, from, to) {
    perErr = '';
    if (kind === 'custom') {
      if (from != null) {
        if (!validIso(from) || !validIso(to)) perErr = tx('e_bad');
        else if (from > to) perErr = tx('e_order');
        else if (to > data.seasonTo) perErr = tx('e_future');
        if (perErr) { period.kind = 'custom'; renderAll(); var e = $('#axr-perr'); if (e) e.focus && 0; return false; }
        period = { kind: 'custom', from: from < data.seasonFrom ? data.seasonFrom : from, to: to };
      } else { var keep = { from: period.from, to: period.to }; period = { kind: 'custom', from: keep.from, to: keep.to }; }
    } else { period = { kind: kind, from: null, to: null }; computePeriod(); }
    renderAll(); return true;
  }
  function setScope(kind, extra) {
    scope.kind = kind;
    if (kind === 'group') scope.group = (extra && extra.group) || scope.group || data.groups[0].id;
    if (kind === 'sel' && extra && extra.sel) scope.sel = extra.sel;
    renderAll();
  }
  function bind() {
    var r = els.root;
    r.addEventListener('click', function (e) {
      var t = e.target; if (!t.closest) return;
      var b;
      if ((b = t.closest('[data-th]'))) { theme = b.getAttribute('data-th'); store('set', LS_THEME, theme); applyTheme(); return; }
      if (t.closest('#axr-lang')) { var nx = lang() === 'ar' ? 'en' : 'ar'; store('set', LS_LANG, nx); document.documentElement.lang = nx; document.documentElement.dir = nx === 'ar' ? 'rtl' : 'ltr'; applyStatic(); renderAll(); return; }
      if ((b = t.closest('[data-scope]'))) { setScope(b.getAttribute('data-scope')); var nb = $('[data-scope="' + b.getAttribute('data-scope') + '"]', r); if (nb) nb.focus(); return; }
      if ((b = t.closest('[data-per]'))) { var k = b.getAttribute('data-per'); setPeriod(k); var nb2 = $('[data-per="' + k + '"]', r); if (nb2) nb2.focus(); return; }
      if ((b = t.closest('[data-tab]'))) { tab = b.getAttribute('data-tab'); renderAll(); var tb = $('#axr-tab-' + tab, r); if (tb) tb.focus(); return; }
      if (t.closest('#axr-apply')) { setPeriod('custom', $('#axr-from').value, $('#axr-to').value); return; }
      if (t.closest('#axr-all')) { scope.sel = data.members.map(function (m) { return m.id; }); renderAll(); return; }
      if (t.closest('#axr-none')) { scope.sel = []; renderAll(); return; }
      if (t.closest('#axr-print')) { doPrint(); return; }
      if (t.closest('#axr-word')) { doWord(); return; }
      if (t.closest('#axr-csv')) { doCsv(); return; }
      if (t.closest('#axr-retry')) { load(); return; }
      if (t.closest('#axr-tbl-btn')) { tableOpen = !tableOpen; renderAll(); var tbn = $('#axr-tbl-btn', r); if (tbn) tbn.focus(); return; }
    });
    r.addEventListener('change', function (e) {
      var t = e.target;
      if (t.id === 'axr-grp') { scope.group = t.value; renderAll(); return; }
      if (t.id === 'axr-who') { personId = t.value; renderAll(); return; }
      if (t.id === 'axr-cards') { withCards = t.checked; return; }
      if (t.hasAttribute && t.hasAttribute('data-mem')) { var id = t.getAttribute('data-mem'), i = scope.sel.indexOf(id); if (t.checked && i < 0) scope.sel.push(id); if (!t.checked && i > -1) scope.sel.splice(i, 1); renderAll(); }
    });
    r.addEventListener('keydown', function (e) {
      var tb = e.target.closest && e.target.closest('#axr-main [role=tab]');
      if (tb && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'Home' || e.key === 'End')) {
        var tabs = $$('[role=tab]', r), i = tabs.indexOf(tb), step = e.key === 'ArrowRight' ? (rtl() ? -1 : 1) : e.key === 'ArrowLeft' ? (rtl() ? 1 : -1) : 0;
        var n = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + step + tabs.length) % tabs.length;
        e.preventDefault(); tab = tabs[n].getAttribute('data-tab'); renderAll(); var nt = $('#axr-tab-' + tab, r); if (nt) nt.focus();
      }
    });
    if (mqDark) { var h = function () { if (theme === 'system') applyTheme(); }; if (mqDark.addEventListener) mqDark.addEventListener('change', h); else if (mqDark.addListener) mqDark.addListener(h); }
  }
  function load() {
    status = 'loading'; renderAll();
    D.api.load(data ? data.seasonTo : today()).then(function (d) {
      data = d; if (!scope.group) scope.group = d.groups[0].id; if (period.kind !== 'custom') computePeriod(); else if (!period.from) { period.kind = 'season'; computePeriod(); }
      status = 'ready'; renderAll();
    }).catch(function () { status = 'error'; renderAll(); });
  }
  function qp() { try { return new URLSearchParams(location.search); } catch (e) { return null; } }
  function boot() {
    var q = qp(), fl = q && q.get('lang'), l = (fl === 'ar' || fl === 'en') ? fl : (store('get', LS_LANG) === 'en' ? 'en' : 'ar');
    document.documentElement.lang = l; document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    if (q && /^\d{4}-\d{2}-\d{2}$/.test(q.get('today') || '')) window.__adamReportsToday = q.get('today');
    if (q && q.get('xerr')) window.__adamReportsFail = parseInt(q.get('xerr'), 10) || 1;
    if (q && q.get('slow')) window.__adamReportsDelay = parseInt(q.get('slow'), 10) || 1500;
    var th = q && q.get('theme'); if (th === 'dark' || th === 'light' || th === 'system') store('set', LS_THEME, th);
    var pk = q && q.get('period'); if (pk === 'month' || pk === 'quarter' || pk === 'season') period.kind = pk;
    var tb = q && q.get('tab'); if (tb && /^(rank|att|trend|groups|person)$/.test(tb)) tab = tb;
    build(); theme = getThemePref(); applyTheme(); applyStatic(); load();
  }
  window.adamReports = {
    _state: function () { return { status: status, tab: tab, scope: JSON.parse(JSON.stringify(scope)), period: JSON.parse(JSON.stringify(period)), storageOk: storageOk }; },
    _model: function () { var M = model(); return { list: M.list.map(function (r) { return { id: r.m.id, rank: r.rank || null, top: r.top || null, pctl: r.pctl == null ? null : r.pctl, delta: r.delta, s: { planned: r.s.planned, attended: r.s.attended, excused: r.s.excused, absent: r.s.absent, att: r.s.att, perf: r.s.perf, comp: r.s.comp, weeksN: r.s.weeksN } }; }), groups: M.groups.map(function (g) { return { id: g.g.id, rank: g.rank || null, avg: g.avg, att: g.att, share: g.share || null, ranked: g.ranked, size: g.size }; }), n: M.R.n, kp: { people: M.kp.people, att: M.kp.att, perf: M.kp.perf, abs: M.kp.abs } }; },
    _csv: csv, _word: function () { return wordHtml(model(), withCards); }, _printHtml: function () { return printHtml(model(), withCards); }, _setPeriod: setPeriod, _setScope: setScope, _data: function () { return data; }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
