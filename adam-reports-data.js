/*
 * ADAM Results & attendance reports - SAMPLE DATA (Phase 3B, beta only).
 * Every name and number is invented and generated deterministically in the browser. Nothing is read from Firebase.
 * api.load() returns a promise like a real backend call. A real backend must return ONLY the signed-in coach's own team
 * (Firestore rules), never the whole database; the browser must not be the one that decides who may see whom.
 */
(function (root) {
  'use strict';
  var GROUPS = [
    { id: 'g-a', name: { ar: 'الناشئين', en: 'Juniors' } },
    { id: 'g-b', name: { ar: 'الرجال', en: 'Men' } },
    { id: 'g-c', name: { ar: 'السيدات', en: 'Women' } }
  ];
  var NAMES = [
    ['g-a', 'يوسف', 'Youssef', 0.55, 0.62], ['g-a', 'كريم', 'Karim', 0.8, 0.7], ['g-a', 'آدم', 'Adam', 0.65, 0.78], ['g-a', 'زياد', 'Ziad', 0.45, 0.55], ['g-a', 'مروان', 'Marwan', 0.9, 0.84],
    ['g-b', 'أحمد', 'Ahmed', 0.85, 0.8], ['g-b', 'محمود', 'Mahmoud', 0.7, 0.66], ['g-b', 'طارق', 'Tarek', 0.5, 0.7], ['g-b', 'حسام', 'Hossam', 0.95, 0.9], ['g-b', 'سامح', 'Sameh', 0.6, 0.5],
    ['g-c', 'منى', 'Mona', 0.92, 0.86], ['g-c', 'ليلى', 'Layla', 0.75, 0.74], ['g-c', 'سلمى', 'Salma', 0.58, 0.68], ['g-c', 'هبة', 'Heba', 0.68, 0.6]
  ];
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(s, n) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); return iso(new Date(+m[1], +m[2] - 1, +m[3] + n)); }
  function build(today) {
    var W = 26, members = NAMES.map(function (n, i) {
      var R = rng(4001 + i * 977), weeks = [], att = n[3], perf = n[4];
      for (var k = W - 1; k >= 0; k--) {
        var d = addDays(today, -7 * k), planned = 3, drift = (W - 1 - k) / W * (i % 3 === 0 ? 0.08 : i % 3 === 1 ? -0.05 : 0);
        var done = 0, exc = 0;
        for (var s = 0; s < planned; s++) { var r = R(); if (r < Math.min(0.98, Math.max(0.2, att + drift))) done++; else if (R() < 0.35) exc++; }
        var score = done === 0 ? null : Math.max(30, Math.min(99, Math.round(perf * 100 + (R() - 0.5) * 16 + drift * 60)));
        weeks.push({ d: d, planned: planned, attended: done, excused: exc, score: score });
      }
      return { id: 'm-' + (i + 1), group: n[0], name: { ar: n[1], en: n[2] }, weeks: weeks };
    });
    return { team: { id: 't-1', name: { ar: 'فريق أداء — موسم تجريبي', en: 'Performance team — sample season' } }, groups: GROUPS, members: members, seasonFrom: addDays(today, -7 * (W - 1)), seasonTo: today };
  }
  root.ADAM_REPORTS_DATA = {
    GROUPS: GROUPS,
    api: { load: function (today) { return new Promise(function (res, rej) { var delay = root.__adamReportsDelay || 0, f = root.__adamReportsFail; setTimeout(function () { if (f) { root.__adamReportsFail = f > 1 ? f - 1 : 0; rej(new Error('sample failure')); } else res(build(today)); }, delay); }); } }
  };
})(window);
