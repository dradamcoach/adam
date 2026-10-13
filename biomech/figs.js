/*
 * ADAM — رسومات البيوميكانيك (أصلية، بتترسم بالكود)
 * BIOFIG.draw(id, lang) => نص SVG. الألوان من كلاسات CSS (bf-*) عشان تشتغل
 * في الثيم الفاتح والغامق. الجسم بيتبني من زوايا المفاصل (pose).
 */
var BIOFIG = (function () {
  'use strict';
  var G = 188;
  var R = Math.PI / 180;
  function S(a) { return Math.sin(a * R); }
  function C(a) { return Math.cos(a * R); }
  function f(n) { return Math.round(n * 10) / 10; }
  function L2(lang, ar, en) { return lang === 'en' ? en : ar; }

  function line(a, b, cls) { return '<line class="' + cls + '" x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '"/>'; }
  function dot(p, r, cls) { return '<circle class="' + cls + '" cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="' + r + '"/>'; }
  function text(p, s, cls, anchor) { return '<text class="' + (cls || 'bf-t') + '" x="' + f(p[0]) + '" y="' + f(p[1]) + '" text-anchor="' + (anchor || 'middle') + '">' + s + '</text>'; }
  function arrow(a, b, cls) {
    var ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    var h = 6;
    var p1 = [b[0] - h * Math.cos(ang - 0.45), b[1] - h * Math.sin(ang - 0.45)];
    var p2 = [b[0] - h * Math.cos(ang + 0.45), b[1] - h * Math.sin(ang + 0.45)];
    return line(a, b, cls) + '<path class="' + cls + '-head" d="M' + f(b[0]) + ' ' + f(b[1]) + ' L' + f(p1[0]) + ' ' + f(p1[1]) + ' L' + f(p2[0]) + ' ' + f(p2[1]) + ' Z"/>';
  }
  function svg(w, h, inner, title) {
    return '<svg class="bf" direction="ltr" style="direction:ltr" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + (title || '') + '" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>';
  }
  function ground(x1, x2) { return line([x1, G], [x2, G], 'bf-ground'); }

  /* الجسم من زوايا المفاصل. الزوايا بالدرجات من الخط الرأسي، الموجب = لقدام (يمين) */
  function body(p) {
    var k = p.s || 1;
    var Ls = 46 * k, Lt = 48 * k, Ltr = 58 * k, Lua = 32 * k, Lfa = 30 * k, hr = 10 * k, Lf = 20 * k;
    var base = p.ground != null ? p.ground : G;
    var ankle = [p.ax, base - 6 * k];
    var knee = [ankle[0] + S(p.sh) * Ls, ankle[1] - C(p.sh) * Ls];
    var hip = [knee[0] + S(p.th) * Lt, knee[1] - C(p.th) * Lt];
    var sho = [hip[0] + S(p.tr) * Ltr, hip[1] - C(p.tr) * Ltr];
    var head = [sho[0] + S(p.tr + (p.hd || 0)) * (hr + 7 * k), sho[1] - C(p.tr + (p.hd || 0)) * (hr + 7 * k)];
    var J = { ankle: ankle, knee: knee, hip: hip, sho: sho, head: head };
    var out = '';
    /* الرجل التانية (لو موجودة) من الحوض لتحت — بتترسم الأول عشان تبقى ورا */
    if (p.leg2) {
      var k2 = [hip[0] + S(p.leg2[0]) * Lt, hip[1] + C(p.leg2[0]) * Lt];
      var a2 = [k2[0] + S(p.leg2[1]) * Ls, k2[1] + C(p.leg2[1]) * Ls];
      var t2 = p.leg2[2] == null ? 0 : p.leg2[2];
      var toe2 = [a2[0] + C(t2) * Lf * 0.9, a2[1] + S(t2) * Lf * 0.9];
      out += line(hip, k2, 'bf-limb2') + line(k2, a2, 'bf-limb2') + line(a2, toe2, 'bf-limb2');
      J.knee2 = k2; J.ankle2 = a2;
    }
    if (p.arm2) {
      var e2 = [sho[0] + S(p.arm2[0]) * Lua, sho[1] + C(p.arm2[0]) * Lua];
      var h2 = [e2[0] + S(p.arm2[1]) * Lfa, e2[1] + C(p.arm2[1]) * Lfa];
      out += line(sho, e2, 'bf-limb2') + line(e2, h2, 'bf-limb2');
    }
    var toe = [ankle[0] + Lf, base];
    var heel = [ankle[0] - 5 * k, base];
    out += line(heel, toe, 'bf-limb') + line(ankle, toe, 'bf-limb') + line(ankle, heel, 'bf-limb');
    out += line(ankle, knee, 'bf-limb') + line(knee, hip, 'bf-limb') + line(hip, sho, 'bf-trunk');
    out += '<circle class="bf-head" cx="' + f(head[0]) + '" cy="' + f(head[1]) + '" r="' + f(hr) + '"/>';
    if (p.ua != null) {
      var el = [sho[0] + S(p.ua) * Lua, sho[1] + C(p.ua) * Lua];
      var hand = [el[0] + S(p.fa) * Lfa, el[1] + C(p.fa) * Lfa];
      out += line(sho, el, 'bf-limb') + line(el, hand, 'bf-limb');
      J.elbow = el; J.hand = hand;
    }
    [knee, hip, sho].forEach(function (q) { out += dot(q, 3.2 * k, 'bf-joint'); });
    J.mid = [ankle[0] + 6 * k, base];
    return { svg: out, J: J };
  }
  function plate(p, r) { return dot(p, r || 9, 'bf-plate') + dot(p, 2.2, 'bf-plate-in'); }
  function barLine(x, y1, lang) {
    return line([x, y1], [x, G], 'bf-guide') + text([x, G + 14], L2(lang, 'خط البار فوق نص القدم', 'Bar line over mid-foot'), 'bf-t bf-small');
  }
  /* ذراع العزم: خط أفقي من المفصل لخط القوة. الكلام بيتكتب برّه الجسم (side: 'l' شمال الخط، 'r' يمينه، غير كده فوقه) */
  function momentArm(j, x, lab, dy, side) {
    var y = j[1] + (dy || 0);
    var lo = Math.min(j[0], x), hi = Math.max(j[0], x);
    var t = side === 'l' ? text([lo - 5, y + 4], lab, 'bf-t bf-arm-t', 'end')
      : side === 'r' ? text([hi + 5, y + 4], lab, 'bf-t bf-arm-t', 'start')
      : text([(lo + hi) / 2, y - 7], lab, 'bf-t bf-arm-t');
    return line([j[0], y], [x, y], 'bf-arm') + line([j[0], y - 4], [j[0], y + 4], 'bf-arm') + line([x, y - 4], [x, y + 4], 'bf-arm') + t;
  }
  function okMark(p) { return '<path class="bf-ok" d="M' + (p[0] - 7) + ' ' + p[1] + ' l5 5 l9 -11"/>'; }
  function noMark(p) { return '<path class="bf-no" d="M' + (p[0] - 6) + ' ' + (p[1] - 6) + ' l12 12 M' + (p[0] + 6) + ' ' + (p[1] - 6) + ' l-12 12"/>'; }

  var F = {};

  F.squat = function (lang) {
    var b = body({ ax: 128, sh: 35, th: -80, tr: 40, ua: -60, fa: 128, s: 1.15 });
    var bar = [b.J.sho[0] - 4, b.J.sho[1] + 2];
    var x = bar[0];
    return svg(260, 214,
      ground(30, 230) + barLine(x, bar[1], lang) + b.svg + plate(bar, 11) +
      momentArm(b.J.hip, x, L2(lang, 'ذراع الحوض', 'Hip arm'), 0, 'l') +
      momentArm(b.J.knee, x, L2(lang, 'ذراع الركبة', 'Knee arm'), 0, 'r') +
      text([194, 30], L2(lang, 'جذع مايل أكتر', 'More trunk lean'), 'bf-t bf-small') +
      text([194, 44], L2(lang, '= حمل أكتر على الحوض', '= more load on the hips'), 'bf-t bf-small'),
      L2(lang, 'السكوات وذراع العزم', 'Squat moment arms'));
  };

  F.hinge = function (lang) {
    var b = body({ ax: 118, sh: 8, th: -25, tr: 70, ua: -28, fa: -25, s: 1.1 });
    var bar = b.J.hand;
    return svg(260, 214,
      ground(30, 230) + barLine(bar[0], bar[1] - 16, lang) + b.svg + plate(bar, 12) +
      momentArm(b.J.hip, bar[0], L2(lang, 'ذراع الحوض', 'Hip arm'), 0, 'l') +
      text([206, 150], L2(lang, 'البار لازق', 'Bar close'), 'bf-t bf-small') + text([206, 164], L2(lang, 'في الرجل', 'to the legs'), 'bf-t bf-small') +
      arrow([184, 150], [bar[0] + 16, bar[1]], 'bf-call'),
      L2(lang, 'الثني من الحوض', 'Hip hinge'));
  };

  F.lunge = function (lang) {
    var b = body({ ax: 150, sh: 15, th: -85, tr: 4, ua: 4, fa: 0, leg2: [-22, -95, 180] });
    return svg(260, 214,
      ground(20, 230) + b.svg + plate(b.J.hand, 6) +
      line([b.J.hip[0], b.J.hip[1] - 70], [b.J.hip[0], G], 'bf-guide') +
      text([b.J.hip[0] - 4, 26], L2(lang, 'انزل لتحت مش لقدام', 'Drop down, not forward'), 'bf-t bf-small') +
      arrow([b.J.hip[0] + 30, 70], [b.J.hip[0] + 30, 104], 'bf-call'),
      L2(lang, 'اللانچ', 'Lunge'));
  };

  F.hpush = function (lang) {
    var ank = [40, 180], hip = [112, 168], sho = [182, 156], head = [200, 150];
    var el = [168, 172], hand = [184, 186];
    var side = line(ank, hip, 'bf-trunk') + line(hip, sho, 'bf-trunk') + '<circle class="bf-head" cx="' + head[0] + '" cy="' + head[1] + '" r="9"/>' +
      line(sho, el, 'bf-limb') + line(el, hand, 'bf-limb') + line([ank[0] - 4, 186], [ank[0] + 6, 186], 'bf-limb') +
      dot(hip, 3.2, 'bf-joint') + dot(sho, 3.2, 'bf-joint') + line([ank[0], ank[1] - 9], [sho[0] + 6, sho[1] - 13], 'bf-guide') +
      text([110, 140], L2(lang, 'خط واحد من الراس للكعب', 'One line, head to heels'), 'bf-t bf-small');
    /* منظر من فوق: زاوية الكوع */
    var cx = 130, cy = 62;
    var top = '<rect class="bf-torso" x="' + (cx - 16) + '" y="' + (cy - 10) + '" width="32" height="44" rx="8"/>' +
      '<circle class="bf-head" cx="' + cx + '" cy="' + (cy - 20) + '" r="9"/>' +
      line([cx - 16, cy - 4], [cx - 52, cy + 20], 'bf-limb') + line([cx + 16, cy - 4], [cx + 52, cy + 20], 'bf-limb') +
      line([cx - 16, cy - 4], [cx - 60, cy - 4], 'bf-limb-bad') + line([cx + 16, cy - 4], [cx + 60, cy - 4], 'bf-limb-bad') +
      okMark([cx - 66, cy + 34]) + text([cx - 66, cy + 50], '45–70°', 'bf-t bf-small') +
      noMark([cx + 70, cy - 4]) + text([cx + 70, cy + 18], '90°', 'bf-t bf-small') +
      text([cx, 14], L2(lang, 'من فوق: زاوية الكوع', 'From above: elbow angle'), 'bf-t bf-small');
    return svg(260, 214, ground(20, 230) + top + side, L2(lang, 'الدفع لقدام', 'Horizontal push'));
  };

  F.vpush = function (lang) {
    var b = body({ ax: 120, sh: 2, th: 0, tr: -3, ua: 182, fa: 180, s: 0.78 });
    var bar = [b.J.hand[0], b.J.hand[1] - 2];
    return svg(260, 214,
      ground(40, 220) + line([b.J.mid[0], 8], [b.J.mid[0], G], 'bf-guide') + b.svg + line([bar[0] - 34, bar[1]], [bar[0] + 34, bar[1]], 'bf-barbell') + plate([bar[0] + 34, bar[1]], 9) +
      text([b.J.mid[0], G + 14], L2(lang, 'البار فوق نص القدم', 'Bar over mid-foot'), 'bf-t bf-small') +
      text([205, 90], L2(lang, 'الودان جنب الدراع', 'Ears beside the arms'), 'bf-t bf-small'),
      L2(lang, 'الضغط فوق الراس', 'Overhead press'));
  };

  F.hpull = function (lang) {
    var b = body({ ax: 110, sh: 10, th: -20, tr: 62, ua: -70, fa: 0 });
    var w = b.J.hand;
    return svg(260, 214,
      ground(40, 220) + b.svg + plate(w, 8) +
      momentArm(b.J.hip, b.J.sho[0], L2(lang, 'حمل على الضهر', 'Load on the back'), -52, 'l') +
      text([200, 150], L2(lang, 'الكوع ناحية الجيب', 'Elbow to the pocket'), 'bf-t bf-small') +
      arrow([w[0] + 12, w[1] + 30], [w[0] + 12, w[1] + 4], 'bf-call'),
      L2(lang, 'السحب لجسمك', 'Row'));
  };

  F.vpull = function (lang) {
    var b = body({ ax: 126, sh: -30, th: 10, tr: -6, ua: 172, fa: 182, s: 0.78, ground: 204 });
    var bary = b.J.hand[1];
    return svg(260, 214,
      line([60, bary], [200, bary], 'bf-barbell') + b.svg +
      arrow([210, 70], [210, 120], 'bf-call') + text([210, 136], L2(lang, 'الكوع لتحت', 'Elbows down'), 'bf-t bf-small') +
      arrow([46, 100], [46, 60], 'bf-call') + text([46, 152], L2(lang, 'الصدر لفوق', 'Chest up'), 'bf-t bf-small'),
      L2(lang, 'العقلة', 'Pull-up'));
  };

  F.run = function (lang) {
    var b = body({ ax: 150, sh: -15, th: -30, tr: 8, ua: 40, fa: 120, leg2: [-25, -95, 200], arm2: [-40, 40] });
    var hx = b.J.hip[0];
    return svg(260, 214,
      ground(20, 240) + line([hx, b.J.hip[1]], [hx, G], 'bf-guide') + b.svg +
      arrow([hx, G - 8], [b.J.ankle[0] - 2, G - 8], 'bf-arm') +
      text([214, 140], L2(lang, 'رجل بعيد قدام', 'Foot far ahead'), 'bf-t bf-arm-t') + text([214, 154], L2(lang, '= فرملة', '= braking'), 'bf-t bf-arm-t') +
      text([hx, G + 14], L2(lang, 'الأفضل: رجلك تنزل قريب من هنا', 'Better: land close to here'), 'bf-t bf-small'),
      L2(lang, 'الجري', 'Running'));
  };

  F.jump = function (lang) {
    var b = body({ ax: 118, sh: 32, th: -55, tr: 38, ua: 55, fa: 70 });
    return svg(260, 214,
      ground(40, 220) + line([b.J.ankle[0] + 18, b.J.knee[1] - 10], [b.J.ankle[0] + 18, G], 'bf-guide') + b.svg +
      text([196, 108], L2(lang, 'الركبة فوق الصوابع', 'Knee over toes'), 'bf-t bf-small') +
      arrow([194, 116], [b.J.knee[0] + 6, b.J.knee[1]], 'bf-call') +
      text([56, 96], L2(lang, 'الحوض لورا', 'Hips back'), 'bf-t bf-small') +
      arrow([56, 104], [b.J.hip[0] - 6, b.J.hip[1]], 'bf-call') +
      text([130, 30], L2(lang, 'نزول هادي ومن غير صوت', 'Soft, quiet landing'), 'bf-t'),
      L2(lang, 'النزول', 'Landing'));
  };

  F.throw = function (lang) {
    /* التسلسل: ذروة سرعة كل جزء بعد اللي قبله */
    var x0 = 40, x1 = 232, y0 = 176;
    function bell(c, h, cls) {
      var d = '';
      for (var i = 0; i <= 40; i++) {
        var x = x0 + (x1 - x0) * i / 40;
        var y = y0 - h * Math.exp(-Math.pow((x - c) / 22, 2));
        d += (i ? ' L' : 'M') + f(x) + ' ' + f(y);
      }
      return '<path class="' + cls + '" d="' + d + '"/>';
    }
    return svg(260, 214,
      line([x0, y0], [x1, y0], 'bf-axis') + line([x0, y0], [x0, 28], 'bf-axis') +
      bell(92, 70, 'bf-s1') + bell(132, 100, 'bf-s2') + bell(176, 136, 'bf-s3') +
      text([92, 96], L2(lang, 'الحوض', 'Hips'), 'bf-t bf-small') + text([132, 66], L2(lang, 'الجذع', 'Trunk'), 'bf-t bf-small') + text([176, 32], L2(lang, 'الدراع', 'Arm'), 'bf-t bf-small') +
      text([(x0 + x1) / 2, y0 + 18], L2(lang, 'الوقت →  كل جزء بيوصل لأعلى سرعة بعد اللي قبله', 'Time → each segment peaks after the one before'), 'bf-t bf-small') +
      '<text class="bf-t bf-small" transform="translate(24 ' + ((y0 + 28) / 2) + ') rotate(-90)" text-anchor="middle">' + L2(lang, 'السرعة', 'Speed') + '</text>',
      L2(lang, 'تسلسل الرمي', 'Throwing sequence'));
  };

  F.core = function (lang) {
    function plank(y, sag) {
      var a = [40, y], h = [118, y - 8 + (sag ? 14 : 0)], s = [190, y - 16];
      var path = sag ? '<path class="bf-trunk" d="M' + a[0] + ' ' + a[1] + ' Q' + h[0] + ' ' + (h[1] + 8) + ' ' + s[0] + ' ' + s[1] + '"/>' : line(a, s, 'bf-trunk');
      return path + '<circle class="bf-head" cx="' + (s[0] + 15) + '" cy="' + (s[1] - 4) + '" r="8"/>' +
        line(s, [s[0] - 2, y + 4], 'bf-limb') + line([s[0] - 2, y + 4], [s[0] + 18, y + 4], 'bf-limb') + line([a[0] - 3, y + 4], [a[0] + 6, y + 4], 'bf-limb');
    }
    return svg(260, 214,
      line([20, 98], [240, 98], 'bf-ground') + line([20, 190], [240, 190], 'bf-ground') +
      plank(94, false) + okMark([228, 60]) + text([120, 38], L2(lang, 'ضلوع لتحت وحوض محايد', 'Ribs down, neutral pelvis'), 'bf-t bf-small') +
      plank(186, true) + noMark([228, 150]) + text([120, 126], L2(lang, 'الوسط وقع = ضغط على الضهر', 'Sagging = load on the back'), 'bf-t bf-small'),
      L2(lang, 'البلانك', 'Plank'));
  };

  /* ---------------- الأساسيات ---------------- */
  F.planes = function (lang) {
    function fig(cx, front) {
      var o = '<circle class="bf-head" cx="' + cx + '" cy="62" r="9"/>' + line([cx, 71], [cx, 118], 'bf-trunk');
      if (front) o += line([cx, 80], [cx - 18, 104], 'bf-limb') + line([cx, 80], [cx + 18, 104], 'bf-limb') + line([cx, 118], [cx - 10, 160], 'bf-limb') + line([cx, 118], [cx + 10, 160], 'bf-limb');
      else o += line([cx, 80], [cx + 4, 108], 'bf-limb') + line([cx, 118], [cx + 2, 160], 'bf-limb') + line([cx + 2, 160], [cx + 14, 160], 'bf-limb');
      return o;
    }
    var a = fig(44, false) + arrow([26, 136], [64, 136], 'bf-call') + arrow([64, 146], [26, 146], 'bf-call') + text([44, 186], L2(lang, 'لقدام ولورا', 'Forward/back'), 'bf-t bf-small');
    var b = fig(130, true) + arrow([112, 40], [84, 40], 'bf-call') + arrow([148, 40], [176, 40], 'bf-call') + text([130, 186], L2(lang, 'لجنب', 'Side to side'), 'bf-t bf-small');
    var c = fig(216, true) + '<ellipse class="bf-orbit" cx="216" cy="100" rx="30" ry="9"/>' + arrow([236, 106], [244, 98], 'bf-call') + text([216, 186], L2(lang, 'اللف', 'Rotation'), 'bf-t bf-small');
    return svg(260, 200, a + b + c, L2(lang, 'المستويات', 'Planes'));
  };

  F.levers = function (lang) {
    function row(y, fx, lx, ex, label, up) {
      return line([30, y], [230, y], 'bf-beam') +
        '<path class="bf-fulcrum" d="M' + fx + ' ' + (y + 2) + ' l-9 15 h18 Z"/>' +
        '<rect class="bf-load" x="' + (lx - 9) + '" y="' + (y - 18) + '" width="18" height="16" rx="3"/>' +
        (up ? arrow([ex, y + 26], [ex, y + 4], 'bf-arm') : arrow([ex, y - 34], [ex, y - 6], 'bf-arm')) +
        text([22, y + 4], label, 'bf-t bf-small', 'end') ;
    }
    return svg(260, 214,
      row(44, 130, 44, 216, '1', false) + row(106, 220, 130, 40, '2', true) + row(168, 36, 216, 112, '3', true) +
      text([130, 16], L2(lang, 'المثلث = الارتكاز · المربع = الوزن · السهم = العضلة', 'Triangle = pivot · box = load · arrow = muscle'), 'bf-t bf-small'),
      L2(lang, 'أنواع الروافع', 'Lever classes'));
  };

  F.moment = function (lang) {
    function panel(ox, len, lab, lab2) {
      var s = [ox, 70], hnd = [ox + len, 70];
      return dot(s, 6, 'bf-joint-big') + line(s, hnd, 'bf-limb') + plate([hnd[0], hnd[1] + 10], 8) +
        arrow([hnd[0], hnd[1] + 22], [hnd[0], hnd[1] + 56], 'bf-call') +
        line([s[0], 150], [hnd[0], 150], 'bf-arm') + line([s[0], 144], [s[0], 156], 'bf-arm') + line([hnd[0], 144], [hnd[0], 156], 'bf-arm') +
        line([s[0], 76], [s[0], 150], 'bf-guide') + line([hnd[0], 128], [hnd[0], 150], 'bf-guide') +
        text([(s[0] + hnd[0]) / 2, 170], lab, 'bf-t bf-arm-t') + text([(s[0] + hnd[0]) / 2, 184], lab2, 'bf-t bf-arm-t');
    }
    return svg(260, 200,
      panel(36, 54, L2(lang, 'مسافة قصيرة', 'Short distance'), L2(lang, 'عزم أقل', 'less torque')) + panel(140, 100, L2(lang, 'مسافة أطول', 'Longer distance'), L2(lang, 'عزم أكبر', 'more torque')) +
      text([130, 30], L2(lang, 'نفس الوزن · المفصل = النقطة', 'Same weight · the dot is the joint'), 'bf-t bf-small'),
      L2(lang, 'ذراع العزم', 'Moment arm'));
  };

  F.curve = function (lang) {
    var x0 = 40, x1 = 230, y0 = 168, top = 40;
    var d = '';
    for (var a = 0; a <= 150; a += 5) {
      var x = x0 + (x1 - x0) * a / 150;
      var y = y0 - (y0 - top) * Math.sin(a * R);
      d += (a ? ' L' : 'M') + f(x) + ' ' + f(y);
    }
    var px = x0 + (x1 - x0) * 90 / 150;
    var ticks = [0, 45, 90, 135].map(function (v) { var x = x0 + (x1 - x0) * v / 150; return line([x, y0], [x, y0 + 4], 'bf-axis') + text([x, y0 + 16], v + '°', 'bf-t bf-small'); }).join('');
    return svg(260, 214,
      line([x0, y0], [x1, y0], 'bf-axis') + line([x0, y0], [x0, 28], 'bf-axis') + ticks +
      '<path class="bf-curve" d="' + d + '"/>' + line([px, top], [px, y0], 'bf-guide') + dot([px, top], 4, 'bf-peak') +
      text([px, top - 8], L2(lang, 'أصعب نقطة (٩٠°)', 'Hardest point (90°)'), 'bf-t bf-small') +
      text([(x0 + x1) / 2, y0 + 34], L2(lang, 'زاوية الكوع في البايسبس بالدمبل', 'Elbow angle in a dumbbell curl'), 'bf-t bf-small') +
      '<text class="bf-t bf-small" transform="translate(24 ' + ((y0 + 28) / 2) + ') rotate(-90)" text-anchor="middle">' + L2(lang, 'الصعوبة', 'Difficulty') + '</text>',
      L2(lang, 'منحنى القوة', 'Strength curve'));
  };

  F.contraction = function (lang) {
    function arm(cx, ang, kind, lab) {
      var sh = [cx, 60], el = [cx, 116];
      var hn = [el[0] + S(ang) * 44, el[1] - C(ang) * 44];
      var o = line(sh, el, 'bf-limb') + line(el, hn, 'bf-limb') + dot(el, 3.5, 'bf-joint') + plate(hn, 7);
      if (kind === 'up') o += arrow([cx + 32, 126], [cx + 32, 92], 'bf-call');
      if (kind === 'down') o += arrow([cx + 32, 92], [cx + 32, 126], 'bf-call');
      if (kind === 'hold') o += '<rect class="bf-hold" x="' + (cx + 27) + '" y="98" width="4" height="20"/><rect class="bf-hold" x="' + (cx + 35) + '" y="98" width="4" height="20"/>';
      return o + text([cx + 8, 178], lab, 'bf-t bf-small');
    }
    return svg(260, 200,
      arm(30, 50, 'up', L2(lang, 'بالقِصَر', 'Concentric')) + arm(112, 80, 'down', L2(lang, 'بالإطالة', 'Eccentric')) + arm(194, 90, 'hold', L2(lang, 'ثابت', 'Isometric')),
      L2(lang, 'أنواع الانقباض', 'Muscle actions'));
  };

  F.chains = function (lang) {
    /* يمين: سكوات (سلسلة مقفولة) — شمال: جهاز الرجل (مفتوحة) */
    var seat = '<rect class="bf-torso" x="22" y="108" width="62" height="10" rx="3"/>' + line([30, 118], [30, G], 'bf-beam') + line([76, 118], [76, G], 'bf-beam');
    var hip = [44, 102], knee = [86, 104], ank = [120, 86];
    var open = seat + line(hip, [40, 52], 'bf-trunk') + '<circle class="bf-head" cx="40" cy="40" r="9"/>' + line(hip, knee, 'bf-limb') + line(knee, ank, 'bf-limb') +
      dot(knee, 3.2, 'bf-joint') + plate([ank[0] + 2, ank[1] + 8], 7) + arrow([126, 112], [132, 82], 'bf-call') + text([70, 206], L2(lang, 'مفتوحة: الرجل حرة', 'Open: foot free'), 'bf-t bf-small');
    var b = body({ ax: 186, sh: 30, th: -60, tr: 30, ua: 60, fa: 60, s: 0.8 });
    return svg(260, 214, ground(10, 250) + open + b.svg + text([196, 206], L2(lang, 'مقفولة: الرجل على الأرض', 'Closed: foot planted'), 'bf-t bf-small'), L2(lang, 'السلاسل', 'Chains'));
  };

  F.balance = function (lang) {
    var a = body({ ax: 54, sh: 0, th: 0, tr: 0, ua: 0, fa: 0, s: 0.72 });
    var com1 = [a.J.hip[0] + 2, a.J.hip[1] - 6];
    var b = body({ ax: 172, sh: 14, th: 14, tr: 18, ua: 30, fa: 20, s: 0.72 });
    var com2 = [b.J.hip[0] + 24, b.J.hip[1] - 6];
    return svg(260, 214,
      '<rect class="bf-base" x="' + (a.J.ankle[0] - 6) + '" y="' + (G - 3) + '" width="22" height="6" rx="3"/>' + a.svg + dot(com1, 5, 'bf-com') + line(com1, [com1[0], G], 'bf-guide') + okMark([com1[0] + 30, 70]) +
      '<rect class="bf-base" x="' + (b.J.ankle[0] - 6) + '" y="' + (G - 3) + '" width="22" height="6" rx="3"/>' + b.svg + dot(com2, 5, 'bf-com') + line(com2, [com2[0], G], 'bf-guide') + noMark([com2[0] + 26, 70]) +
      line([0, G], [260, G], 'bf-ground') +
      text([130, 206], L2(lang, 'النقطة = مركز الثقل · الشريط = قاعدة الارتكاز', 'Dot = centre of mass · bar = base of support'), 'bf-t bf-small'),
      L2(lang, 'الاتزان', 'Balance'));
  };

  F.fv = function (lang) {
    var x0 = 40, x1 = 230, y0 = 168, top = 32;
    var d = '', p = '';
    var best = { v: 0, x: 0, y: 0 };
    for (var i = 0; i <= 40; i++) {
      var v = i / 40;
      var force = (1 - v) / (1 + 3 * v);   /* هيل: شكل تقريبي للتوضيح */
      var pow = force * v;
      var x = x0 + (x1 - x0) * v;
      var y = y0 - (y0 - top) * force;
      var yp = y0 - (y0 - top) * pow / 0.25;
      d += (i ? ' L' : 'M') + f(x) + ' ' + f(y);
      p += (i ? ' L' : 'M') + f(x) + ' ' + f(yp);
      if (pow > best.v) best = { v: pow, x: x, y: yp };
    }
    return svg(260, 214,
      line([x0, y0], [x1, y0], 'bf-axis') + line([x0, y0], [x0, 24], 'bf-axis') +
      '<path class="bf-curve" d="' + d + '"/>' + '<path class="bf-curve2" d="' + p + '"/>' + dot([best.x, best.y], 4, 'bf-peak') +
      text([best.x + 4, best.y - 10], L2(lang, 'أعلى قدرة', 'Peak power'), 'bf-t bf-small') +
      text([x0 + 34, top + 4], L2(lang, 'القوة', 'Force'), 'bf-t bf-small') +
      text([(x0 + x1) / 2, y0 + 18], L2(lang, 'السرعة →', 'Velocity →'), 'bf-t bf-small') +
      text([(x0 + x1) / 2, y0 + 34], L2(lang, 'الخط المتقطع = القدرة', 'Dashed line = power'), 'bf-t bf-small'),
      L2(lang, 'القوة والسرعة', 'Force–velocity'));
  };

  return {
    draw: function (id, lang) { return F[id] ? F[id](lang || 'ar') : ''; },
    has: function (id) { return !!F[id]; }
  };
})();
if (typeof module !== 'undefined') module.exports = BIOFIG;
