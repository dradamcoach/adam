/*
 * ADAM Progress analytics - SAMPLE DATA (Phase 4, beta only).
 * Everything here is invented and generated on the fly (deterministic). Nothing is real, nothing is read from Firebase.
 * api.load(personId) returns a promise like a real backend call would. A real backend must scope data to the signed-in
 * user (or to a coach's own clients) with Firestore rules; the browser must never be the one that decides.
 */
(function (root) {
  'use strict';
  var PEOPLE = [
    { id: 'u-client-mona', name: { ar: 'منى — بيانات منتظمة', en: 'Mona — steady data' }, note: { ar: 'تتحسن بوضوح', en: 'clear improvement' } },
    { id: 'u-client-omar', name: { ar: 'عمر — بيانات متقطعة', en: 'Omar — patchy data' }, note: { ar: 'ثبات وتذبذب وفجوات', en: 'flat, irregular, with gaps' } },
    { id: 'u-client-layla', name: { ar: 'ليلى — عميلة جديدة', en: 'Layla — brand new' }, note: { ar: 'قراءتين بس', en: 'only two readings' } }
  ];
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(s, n) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s); return iso(new Date(+m[1], +m[2] - 1, +m[3] + n)); }
  function r1(x) { return Math.round(x * 10) / 10; }

  function gen(id, today) {
    var R = rng(id.length * 7919 + id.charCodeAt(id.length - 1) * 31), W = 52, out = { weight: [], fat: [], muscle: [], workouts: [], nutrition: [], squat: [], sleep: [], hr: [] };
    function lerp(a, b, t) { return a + (b - a) * t; }
    for (var k = W; k >= 0; k--) {
      var t = (W - k) / W, d = addDays(today, -7 * k), n = function (a) { return (R() - 0.5) * 2 * a; };
      if (id === 'u-client-mona') {
        out.weight.push({ d: d, v: r1(lerp(72, 66.9, t) + n(0.5)) });
        if (k % 2 === 0) { out.fat.push({ d: d, v: r1(lerp(29.5, 25.1, t) + n(0.35)) }); out.muscle.push({ d: d, v: r1(lerp(24.1, 24.9, t) + n(0.2)) }); }
        out.workouts.push({ d: d, planned: 4, done: Math.max(1, Math.min(4, Math.round(3.3 + n(1)))) });
        out.nutrition.push({ d: d, days: Math.max(3, Math.min(7, Math.round(5.6 + n(1.3)))) });
        if (k % 3 === 0) out.squat.push({ d: d, v: r1(lerp(60, 82, t) + n(1.5)) });
        out.sleep.push({ d: d, v: r1(lerp(6.8, 7.4, t) + n(0.3)) });
        out.hr.push({ d: d, v: Math.round(lerp(68, 62, t) + n(1.2)) });
      } else if (id === 'u-client-omar') {
        var gap = (k >= 20 && k <= 26);
        if (!gap && R() > 0.2) out.weight.push({ d: d, v: r1(84 + n(0.9) + (k < 12 ? 0.8 : 0)) });
        if (k % 4 === 0 && !gap) { out.fat.push({ d: d, v: r1(22 + n(0.6) + (1 - t) * -0.2) }); out.muscle.push({ d: d, v: r1(35.4 + n(0.4)) }); }
        if (!gap) out.workouts.push({ d: d, planned: 4, done: Math.max(0, Math.min(4, Math.round(lerp(3, 1.3, t) + n(1.1)))) });
        if (!gap && R() > 0.25) out.nutrition.push({ d: d, days: Math.max(1, Math.min(7, Math.round(3.4 + n(1.8)))) });
        if (k % 5 === 0 && !gap) out.squat.push({ d: d, v: r1(100 + n(3) + t * 1) });
        if (!gap && R() > 0.3) out.sleep.push({ d: d, v: r1(6.1 + n(0.7)) });
        if (!gap) out.hr.push({ d: d, v: Math.round(74 + n(2.5) + t) });
      } else if (k <= 1) {
        out.weight.push({ d: d, v: r1(63.4 - (1 - k) * 0.4) });
        if (k === 0) { out.workouts.push({ d: d, planned: 3, done: 2 }); }
      }
    }
    return out;
  }
  root.ADAM_ANALYTICS_DATA = {
    isSample: true, PEOPLE: PEOPLE,
    api: {
      load: function (personId, today) {
        return new Promise(function (res, rej) { setTimeout(function () {
          if (!PEOPLE.some(function (p) { return p.id === personId; })) return rej(new Error('unknown person'));
          res(gen(personId, today));
        }, 0); });
      }
    }
  };
})(window);
