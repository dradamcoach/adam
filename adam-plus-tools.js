// ADAM+ — Tools tab: plate calculator, lift log with PR alerts / progression hints / weekly sets per muscle,
// GPS run tracker with splits + pace/race calculators, video analysis (slow motion, frame step, lines, angles, side by side)
// and a tactics board. Everything runs on the device; data lives in the ADAM+ state (plus.*) like the rest of ADAM+.
// Numbers are estimates from common formulas (Epley, Riegel) and general training guidance, not medical advice.
export function createTools(c) {
  const L = c.L, esc = c.esc;
  const P = () => c.plus();
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const S = { sec: 'menu', lift: { ex: '', mu: 'chest' }, vid: null, board: null };
  const num = (v) => { const n = Number(String(v == null ? '' : v).replace(',', '.')); return isFinite(n) ? n : NaN; };
  const r1 = (n) => Math.round(n * 10) / 10;
  const mmss = (sec) => { sec = Math.max(0, Math.round(sec)); const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(s).padStart(2, '0'); };

  function css() {
    if (document.getElementById('apt-css')) return;
    const st = document.createElement('style'); st.id = 'apt-css';
    st.textContent = '.apt-cv{width:100%;display:block;border-radius:12px;background:#0d1411;touch-action:none}.apt-vp{position:relative;margin:8px 0;border-radius:12px;overflow:hidden;background:#000}.apt-vp video{width:100%;height:auto;display:block}.apt-vp canvas{position:absolute;inset:0;width:100%;height:100%;touch-action:none}.apt-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:6px 0}.apt-row>*{flex:0 0 auto}.apt-bar{height:14px;border-radius:7px;background:rgba(255,255,255,.08);overflow:hidden}.apt-bar i{display:block;height:100%;border-radius:7px}.apt-mu{display:grid;grid-template-columns:90px 1fr 34px;gap:8px;align-items:center;margin:7px 0;font-size:13px}.apt-pl{display:inline-block;margin:0 2px;border-radius:4px;vertical-align:bottom;background:#3ef0b0;width:14px}.apt-kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:8px 0}.apt-kpi div{background:rgba(255,255,255,.05);border-radius:12px;padding:10px 6px;text-align:center}.apt-kpi b{display:block;font-size:20px;font-weight:600}.apt-kpi small{color:#7d8995;font-size:11px}';
    document.head.appendChild(st);
  }

  /* ---------------- shared bits ---------------- */
  const back = () => '<button type="button" class="ap-btn small ghost" id="apt-back">' + esc(L('رجوع للأدوات', 'Back to tools')) + '</button>';
  const wireBack = (body) => { const b = $('#apt-back', body); if (b) b.addEventListener('click', () => { S.sec = 'menu'; c.draw(); }); };
  const lock = { w: null, on() { try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then((w) => { lock.w = w; }).catch(() => {}); } catch (e) { /* ignore */ } }, off() { try { if (lock.w) lock.w.release(); } catch (e) { /* ignore */ } lock.w = null; } };

  /* ================================================================ menu */
  const TOOLS = [
    ['plate', L('حاسبة الأطباق', 'Plate calculator'), L('كام طبق على كل جنب من البار', 'which plates go on each side')],
    ['lift', L('سجل الأوزان والأرقام القياسية', 'Lift log and PRs'), L('رقم قياسي، اقتراح الوزن الجاي، مجموعات الأسبوع', 'PR alerts, next-weight hint, weekly sets')],
    ['run', L('تتبع الجري GPS', 'GPS run tracker'), L('مسافة، بيس، كل كيلو، وحاسبة سباق', 'distance, pace, splits, race predictor')],
    ['video', L('تحليل الفيديو', 'Video analysis'), L('بطيء، إطار بإطار، خطوط وزوايا، مقارنة', 'slow motion, frame step, lines, angles, compare')],
    ['board', L('لوحة التكتيك', 'Tactics board'), L('ملعب ولاعبين وأسهم، وتحفظ وتصدّر صورة', 'pitch, players, arrows; save and export')]
  ];
  function viewMenu(body) {
    let h = '<div class="ap-sec"><b>' + esc(L('أدوات المدرب واللاعب', 'Coach and athlete tools')) + '</b></div><div class="ap-grid2">';
    TOOLS.forEach((t) => { h += '<button type="button" class="ap-card" data-apt="' + t[0] + '" style="text-align:start;cursor:pointer"><b>' + esc(t[1]) + '</b><small class="mu" style="display:block;margin-top:4px">' + esc(t[2]) + '</small></button>'; });
    h += '</div><div class="ap-note">' + esc(L('كل الأدوات بتشتغل على جهازك. الفيديو مبيتبعتش لأي مكان.', 'All tools run on your device. Videos are never uploaded.')) + '</div>';
    body.innerHTML = h;
    $$('[data-apt]', body).forEach((b) => b.addEventListener('click', () => { S.sec = b.dataset.apt; c.draw(); }));
  }

  /* ================================================================ plate calculator */
  const PLATES = { kg: [25, 20, 15, 10, 5, 2.5, 1.25], lb: [45, 35, 25, 10, 5, 2.5] };
  const BARS = { kg: [20, 15, 10], lb: [45, 35] };
  const PCOL = { 25: '#e5484d', 20: '#3b82f6', 15: '#f5c542', 10: '#3ef0b0', 5: '#e8edf2', 2.5: '#9aa7b3', 1.25: '#6b7a88', 45: '#e5484d', 35: '#f5c542' };
  function plateCalc(target, bar, unit) {
    const side = (target - bar) / 2; if (!(side >= 0)) return null;
    let left = Math.round(side * 1000) / 1000; const out = [];
    PLATES[unit].forEach((p) => { let n = 0; while (left + 1e-9 >= p) { left = Math.round((left - p) * 1000) / 1000; n++; } if (n) out.push([p, n]); });
    return { side: side, plates: out, left: Math.round(left * 1000) / 1000 };
  }
  function viewPlate(body) {
    const st = S.plate = S.plate || { unit: 'kg', bar: 20, target: '' };
    let h = back() + '<div class="ap-sec"><b>' + esc(L('حاسبة الأطباق', 'Plate calculator')) + '</b></div><div class="ap-card">';
    h += '<div class="ap-chips">' + ['kg', 'lb'].map((u) => '<button type="button" class="' + (st.unit === u ? 'on' : '') + '" data-pu="' + u + '">' + u + '</button>').join('') + '</div>';
    h += '<div class="ap-chips">' + BARS[st.unit].map((b) => '<button type="button" class="' + (st.bar === b ? 'on' : '') + '" data-pb="' + b + '">' + esc(L('بار ', 'Bar ')) + b + '</button>').join('') + '</div>';
    h += '<label>' + esc(L('الوزن المطلوب بالكامل', 'Total target weight')) + ' (' + st.unit + ')<input id="apt-pt" type="number" inputmode="decimal" min="0" step="0.5" value="' + esc(st.target) + '"></label><div id="apt-pr"></div></div>';
    body.innerHTML = h; wireBack(body);
    $$('[data-pu]', body).forEach((b) => b.addEventListener('click', () => { st.unit = b.dataset.pu; st.bar = BARS[st.unit][0]; c.draw(); }));
    $$('[data-pb]', body).forEach((b) => b.addEventListener('click', () => { st.bar = Number(b.dataset.pb); c.draw(); }));
    const inp = $('#apt-pt', body);
    const paint = () => {
      st.target = inp.value; const t = num(inp.value); const o = $('#apt-pr', body);
      if (!(t > 0)) { o.innerHTML = ''; return; }
      if (t < st.bar) { o.innerHTML = '<div class="ap-note">' + esc(L('الوزن أقل من وزن البار.', 'Target is lighter than the bar.')) + '</div>'; return; }
      const r = plateCalc(t, st.bar, st.unit);
      let x = '<p class="ap-p"><b>' + esc(L('على كل جنب: ', 'Each side: ')) + '</b>' + r.side + ' ' + st.unit + '</p><div style="text-align:center;margin:8px 0;direction:ltr">';
      r.plates.forEach((pn) => { for (let i = 0; i < pn[1]; i++) x += '<span class="apt-pl" style="height:' + Math.round(24 + pn[0] * (st.unit === 'kg' ? 2.2 : 1)) + 'px;background:' + (PCOL[pn[0]] || '#3ef0b0') + '"></span>'; });
      x += '</div><p class="ap-p">' + r.plates.map((pn) => pn[1] + ' × ' + pn[0]).join(' + ') + '</p>';
      if (r.left > 0.001) x += '<div class="ap-note">' + esc(L('مش هيظبط بالأطباق دي بالظبط، ناقص ', 'Not exactly possible with these plates; short by ') + r1(r.left * 2) + ' ' + st.unit) + '</div>';
      o.innerHTML = x;
    };
    inp.addEventListener('input', paint); paint();
  }

  /* ================================================================ lift log */
  const MUSCLES = [['chest', 'صدر', 'Chest'], ['back', 'ضهر', 'Back'], ['shoulders', 'كتف', 'Shoulders'], ['biceps', 'باي', 'Biceps'], ['triceps', 'تراي', 'Triceps'], ['quads', 'أمامي فخذ', 'Quads'], ['hams', 'خلفي فخذ', 'Hamstrings'], ['glutes', 'أرداف', 'Glutes'], ['calves', 'سمانة', 'Calves'], ['core', 'بطن', 'Core']];
  const RANGES = [[6, 10], [8, 12], [12, 15]];
  const lifts = () => { const p = P(); p.lifts = Array.isArray(p.lifts) ? p.lifts : []; return p.lifts; };
  const e1rm = (w, r) => (r <= 1 ? w : w * (1 + Math.min(r, 12) / 30));
  function liftAdvice(ex, rng, inc) {
    const rows = lifts().filter((x) => x.ex === ex);
    if (!rows.length) return null;
    const a = rows[0], b = rows[1];
    if (a.r >= rng[1]) return { k: 'up', w: r1(a.w + inc), txt: L('طلّعت الحد الأعلى. جرّب ' + r1(a.w + inc) + ' كجم وابدأ من ' + rng[0] + ' تكرار.', 'You hit the top of the range. Try ' + r1(a.w + inc) + ' kg and start from ' + rng[0] + ' reps.') };
    if (a.r < rng[0]) {
      if (b && b.r < rng[0] && b.w >= a.w) { const w = r1(Math.round(a.w * 0.9 / 2.5) * 2.5); return { k: 'down', w: w, txt: L('تحت الحد الأدنى مرتين ورا بعض. خفّف لـ ' + w + ' كجم وارجع تبني.', 'Below range twice in a row. Drop to ' + w + ' kg and build back.') }; }
      return { k: 'same', w: a.w, txt: L('تحت الحد الأدنى. ثبّت ' + a.w + ' كجم واستهدف ' + rng[0] + ' تكرار.', 'Below the range. Hold ' + a.w + ' kg and aim for ' + rng[0] + ' reps.') };
    }
    return { k: 'same', w: a.w, txt: L('جوه النطاق. ثبّت ' + a.w + ' كجم وحاول تزوّد تكرار في كل مجموعة.', 'Inside the range. Hold ' + a.w + ' kg and add a rep per set.') };
  }
  function weeklySets() {
    const out = {}; MUSCLES.forEach((m) => { out[m[0]] = 0; });
    const lim = c.addDays(c.stamp(), -6);
    lifts().forEach((x) => { if (x.d >= lim && out[x.mu] != null) out[x.mu] += Number(x.s) || 0; });
    return out;
  }
  function viewLift(body) {
    const st = S.lift, p = P();
    p.lrange = p.lrange || {};
    const exs = Array.from(new Set(lifts().map((x) => x.ex)));
    const rng = (p.lrange[st.ex] && p.lrange[st.ex].r) || [8, 12], inc = (p.lrange[st.ex] && p.lrange[st.ex].inc) || 2.5;
    let h = back() + '<div class="ap-sec"><b>' + esc(L('سجل الأوزان', 'Lift log')) + '</b></div><div class="ap-card">';
    h += '<label>' + esc(L('التمرين', 'Exercise')) + '<input id="apt-lx" type="text" maxlength="40" list="apt-lxl" value="' + esc(st.ex) + '"></label><datalist id="apt-lxl">' + exs.map((x) => '<option value="' + esc(x) + '">').join('') + '</datalist>';
    h += '<div class="ap-chips">' + MUSCLES.map((m) => '<button type="button" class="' + (st.mu === m[0] ? 'on' : '') + '" data-lm="' + m[0] + '">' + esc(L(m[1], m[2])) + '</button>').join('') + '</div>';
    h += '<div class="ap-three"><label>' + esc(L('الوزن (كجم)', 'Weight (kg)')) + '<input id="apt-lw" type="number" inputmode="decimal" min="0" step="0.5"></label><label>' + esc(L('المجموعات', 'Sets')) + '<input id="apt-ls" type="number" inputmode="numeric" min="1" max="20" value="3"></label><label>' + esc(L('أقل تكرارات', 'Lowest reps')) + '<input id="apt-lr" type="number" inputmode="numeric" min="1" max="100"></label></div>';
    h += '<div class="ap-chips">' + RANGES.map((r) => '<button type="button" class="' + (r[0] === rng[0] ? 'on' : '') + '" data-lrg="' + r[0] + '">' + r[0] + '-' + r[1] + '</button>').join('') + '<span class="mu" style="align-self:center">' + esc(L('نطاق التكرارات', 'rep range')) + '</span></div>';
    h += '<div class="ap-chips">' + [1.25, 2.5, 5].map((v) => '<button type="button" class="' + (v === inc ? 'on' : '') + '" data-linc="' + v + '">+' + v + '</button>').join('') + '<span class="mu" style="align-self:center">' + esc(L('زيادة الوزن (كجم)', 'weight step (kg)')) + '</span></div>';
    h += '<div class="ap-actions"><button type="button" class="ap-btn" id="apt-ladd">' + esc(L('سجّل', 'Log')) + '</button></div><div id="apt-lmsg"></div></div>';
    if (st.ex) {
      const adv = liftAdvice(st.ex, rng, inc);
      if (adv) h += '<div class="ap-note"><b>' + esc(L('اقتراح الجلسة الجاية: ', 'Next session: ')) + '</b>' + esc(adv.txt) + '</div>';
      const best = lifts().filter((x) => x.ex === st.ex).reduce((m, x) => Math.max(m, e1rm(x.w, x.r)), 0);
      if (best) h += '<p class="ap-p mu">' + esc(L('أفضل 1RM تقديري: ', 'Best estimated 1RM: ') + r1(best) + ' kg') + '</p>';
    }
    const ws = weeklySets();
    h += '<div class="ap-sec"><b>' + esc(L('مجموعات آخر ٧ أيام لكل عضلة', 'Sets per muscle, last 7 days')) + '</b></div><div class="ap-card">';
    MUSCLES.forEach((m) => { const n = ws[m[0]]; const col = n === 0 ? 'rgba(255,255,255,.18)' : n < 10 ? '#f5c542' : n <= 20 ? '#3ef0b0' : '#e5484d'; h += '<div class="apt-mu"><span>' + esc(L(m[1], m[2])) + '</span><div class="apt-bar"><i style="width:' + Math.min(100, n / 20 * 100) + '%;background:' + col + '"></i></div><b>' + n + '</b></div>'; });
    h += '<div class="ap-note">' + esc(L('أخضر = ١٠ لـ ٢٠ مجموعة في الأسبوع، وده النطاق الشائع للتضخم. مش قاعدة ثابتة، المهم تتناسب مع مستواك وتعافيك.', 'Green = 10-20 sets a week, the common hypertrophy range. Not a fixed rule; match it to your level and recovery.')) + '</div></div>';
    const rec = lifts().slice(0, 6);
    if (rec.length) h += '<div class="ap-sec"><b>' + esc(L('آخر التسجيلات', 'Recent entries')) + '</b></div><div class="ap-card">' + rec.map((x, i) => '<div class="ap-food"><span>' + esc(x.ex) + ' <small class="mu">' + esc(x.d) + '</small></span><em>' + x.w + ' kg × ' + x.s + ' × ' + x.r + '</em><button type="button" class="ap-x" data-ldel="' + i + '" aria-label="' + esc(L('امسح', 'Delete')) + '"></button></div>').join('') + '</div>';
    body.innerHTML = h; wireBack(body);
    const inp = $('#apt-lx', body);
    inp.addEventListener('change', () => { st.ex = inp.value.trim().slice(0, 40); const last = lifts().find((x) => x.ex === st.ex); if (last) st.mu = last.mu; c.draw(); });
    $$('[data-lm]', body).forEach((b) => b.addEventListener('click', () => { st.ex = inp.value.trim().slice(0, 40); st.mu = b.dataset.lm; c.draw(); }));
    const setP = (k, v) => { const ex = inp.value.trim().slice(0, 40); if (!ex) { c.toast(L('اكتب اسم التمرين الأول', 'Enter the exercise first')); return; } st.ex = ex; p.lrange[ex] = Object.assign({ r: rng, inc: inc }, p.lrange[ex] || {}); p.lrange[ex][k] = v; c.persist(); c.draw(); };
    $$('[data-lrg]', body).forEach((b) => b.addEventListener('click', () => { const lo = Number(b.dataset.lrg); setP('r', RANGES.find((r) => r[0] === lo)); }));
    $$('[data-linc]', body).forEach((b) => b.addEventListener('click', () => setP('inc', Number(b.dataset.linc))));
    $$('[data-ldel]', body).forEach((b) => b.addEventListener('click', () => { lifts().splice(Number(b.dataset.ldel), 1); c.persist(); c.draw(); }));
    $('#apt-ladd', body).addEventListener('click', () => {
      const ex = inp.value.trim().slice(0, 40), w = num($('#apt-lw', body).value), s = Math.round(num($('#apt-ls', body).value)), r = Math.round(num($('#apt-lr', body).value));
      if (!ex || !(w >= 0) || !(s >= 1 && s <= 20) || !(r >= 1 && r <= 100)) { c.toast(L('كمّل التمرين والوزن والمجموعات والتكرارات', 'Fill exercise, weight, sets and reps')); return; }
      const prev = lifts().filter((x) => x.ex === ex);
      const bestE = prev.reduce((m, x) => Math.max(m, e1rm(x.w, x.r)), 0), bestW = prev.reduce((m, x) => Math.max(m, x.w), 0);
      const nowE = e1rm(w, r); const isPR = prev.length > 0 && (nowE > bestE + 0.01 || w > bestW);
      lifts().unshift({ d: c.stamp(), ex: ex, mu: st.mu, w: w, s: s, r: r });
      p.lifts = lifts().slice(0, 300);
      c.persist(); st.ex = ex; c.draw();
      if (isPR) { c.toast(L('رقم قياسي جديد! ', 'New personal record! ') + ex); try { c.buzz([60, 40, 60]); } catch (e) { /* ignore */ } }
      else c.toast(L('اتسجلت', 'Logged'));
    });
  }

  /* ================================================================ GPS run tracker */
  const R = { st: 'idle', t0: 0, acc: 0, pts: [], dist: 0, splits: [], lastSplitAt: 0, nextKm: 1, watch: null, tick: null, err: '', recent: [] };
  const hav = (a, b) => {
    const R0 = 6371000, rad = Math.PI / 180, dLa = (b.lat - a.lat) * rad, dLo = (b.lon - a.lon) * rad;
    const x = Math.sin(dLa / 2) * Math.sin(dLa / 2) + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 2 * R0 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  };
  const runSec = () => (R.acc + (R.st === 'run' ? Date.now() - R.t0 : 0)) / 1000;
  const paceOf = (sec, km) => (km > 0.01 ? sec / km : 0);
  const pstr = (p) => (p > 0 && p < 3600 ? mmss(p) : '--:--');
  function onPos(pos) {
    if (R.st !== 'run') return;
    const q = pos.coords; if (q.accuracy > 30) return;
    const pt = { lat: q.latitude, lon: q.longitude, t: pos.timestamp };
    const last = R.pts[R.pts.length - 1];
    if (last) {
      const d = hav(last, pt), dt = (pt.t - last.t) / 1000;
      if (d < 4) return;
      if (dt > 0 && d / dt > 12) return;
      R.dist += d;
    }
    R.pts.push(pt);
    while (R.dist / 1000 >= R.nextKm) {
      const now = runSec(); const sp = now - R.lastSplitAt; R.lastSplitAt = now;
      R.splits.push(sp);
      try { c.speak(L('كيلو ' + R.nextKm + '، بيس ' + mmss(sp), 'Kilometre ' + R.nextKm + ', pace ' + mmss(sp))); } catch (e) { /* ignore */ }
      R.nextKm++;
    }
  }
  function onErr(e) { R.err = e && e.code === 1 ? L('لازم تسمح بالموقع من إعدادات المتصفح.', 'Please allow location access in the browser settings.') : L('مش قادر أقرا الموقع. اطلع مكان مفتوح وجرب تاني.', 'Cannot read the location. Go outdoors and try again.'); R.st = 'idle'; stopWatch(); lock.off(); c.draw(); }
  function stopWatch() { if (R.watch != null && navigator.geolocation) { try { navigator.geolocation.clearWatch(R.watch); } catch (e) { /* ignore */ } } R.watch = null; clearInterval(R.tick); R.tick = null; }
  function runStart() {
    if (!navigator.geolocation) { R.err = L('المتصفح مش بيدعم تحديد الموقع.', 'This browser has no location support.'); c.draw(); return; }
    R.err = ''; R.st = 'run'; R.t0 = Date.now(); R.acc = 0; R.pts = []; R.dist = 0; R.splits = []; R.lastSplitAt = 0; R.nextKm = 1;
    R.watch = navigator.geolocation.watchPosition(onPos, onErr, { enableHighAccuracy: true, maximumAge: 1000, timeout: 20000 });
    lock.on(); R.tick = setInterval(runPaint, 1000); c.draw();
  }
  function runPause() { if (R.st === 'run') { R.acc += Date.now() - R.t0; R.st = 'pause'; } else if (R.st === 'pause') { R.t0 = Date.now(); R.st = 'run'; } c.draw(); }
  function runFinish() {
    const sec = runSec(), km = R.dist / 1000; const pts = R.pts;
    stopWatch(); lock.off(); R.st = 'idle';
    if (km >= 0.05) {
      const step = Math.max(1, Math.ceil(pts.length / 120)); const route = [];
      for (let i = 0; i < pts.length; i += step) route.push([Math.round(pts[i].lat * 1e5) / 1e5, Math.round(pts[i].lon * 1e5) / 1e5]);
      const p = P(); p.runs = Array.isArray(p.runs) ? p.runs : [];
      p.runs.unshift({ d: c.stamp(), km: Math.round(km * 100) / 100, sec: Math.round(sec), sp: R.splits.map((x) => Math.round(x)), rt: route });
      p.runs = p.runs.slice(0, 30); p.runs.forEach((x, i) => { if (i >= 10) delete x.rt; });
      c.persist(); c.toast(L('اتسجل الجري', 'Run saved'));
    } else c.toast(L('المسافة قصيرة قوي، متسجلتش', 'Too short, not saved'));
    c.draw();
  }
  function routeSvg(route, w, h) {
    if (!route || route.length < 2) return '';
    const la = route.map((x) => x[0]), lo = route.map((x) => x[1]);
    const mnA = Math.min.apply(null, la), mxA = Math.max.apply(null, la), mnO = Math.min.apply(null, lo), mxO = Math.max.apply(null, lo);
    const k = Math.cos(((mnA + mxA) / 2) * Math.PI / 180);
    const sx = (mxO - mnO) * k || 1e-6, sy = (mxA - mnA) || 1e-6, sc = Math.min((w - 20) / sx, (h - 20) / sy);
    const ox = (w - sx * sc) / 2, oy = (h - sy * sc) / 2;
    const pt = route.map((x) => (ox + (x[1] - mnO) * k * sc).toFixed(1) + ',' + (oy + (mxA - x[0]) * sc).toFixed(1));
    return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;height:auto;background:#0d1411;border-radius:12px;direction:ltr"><polyline points="' + pt.join(' ') + '" fill="none" stroke="#3ef0b0" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/><circle cx="' + pt[0].split(',')[0] + '" cy="' + pt[0].split(',')[1] + '" r="5" fill="#fff"/><circle cx="' + pt[pt.length - 1].split(',')[0] + '" cy="' + pt[pt.length - 1].split(',')[1] + '" r="5" fill="#e5484d"/></svg>';
  }
  function runPaint() {
    const o = $('#apt-live'); if (!o) return;
    const sec = runSec(), km = R.dist / 1000;
    let cur = 0; const n = R.pts.length;
    if (n > 3) { let j = n - 1; while (j > 0 && (R.pts[n - 1].t - R.pts[j].t) < 30000) j--; const dd = hav(R.pts[j], R.pts[n - 1]), tt = (R.pts[n - 1].t - R.pts[j].t) / 1000; if (dd > 10 && tt > 5) cur = tt / (dd / 1000); }
    o.innerHTML = '<div class="apt-kpi"><div><b>' + km.toFixed(2) + '</b><small>km</small></div><div><b>' + mmss(sec) + '</b><small>' + esc(L('الوقت', 'Time')) + '</small></div><div><b>' + pstr(paceOf(sec, km)) + '</b><small>' + esc(L('بيس متوسط /كم', 'Avg pace /km')) + '</small></div></div>' + (cur ? '<p class="ap-p mu" style="text-align:center">' + esc(L('البيس دلوقتي: ', 'Current pace: ') + pstr(cur) + ' /km') + '</p>' : '') + (R.splits.length ? '<div class="ap-card">' + R.splits.map((x, i) => '<div class="ap-food"><span>' + esc(L('كيلو ', 'Km ')) + (i + 1) + '</span><em>' + mmss(x) + '</em></div>').join('') + '</div>' : '') + (R.pts.length > 1 ? routeSvg(R.pts.map((q) => [q.lat, q.lon]), 320, 200) : '');
  }
  /* race predictor (Riegel: T2 = T1 x (D2/D1)^1.06) and pace table */
  const RACES = [[1, '1K'], [3, '3K'], [5, '5K'], [10, '10K'], [21.0975, 'Half'], [42.195, 'Marathon']];
  function viewRun(body) {
    const p = P(); p.runs = Array.isArray(p.runs) ? p.runs : [];
    let h = back() + '<div class="ap-sec"><b>' + esc(L('تتبع الجري GPS', 'GPS run tracker')) + '</b></div><div class="ap-card">';
    if (R.err) h += '<div class="ap-note" style="color:#e5484d">' + esc(R.err) + '</div>';
    if (R.st === 'idle') {
      h += '<p class="ap-p">' + esc(L('الـGPS بيشتغل والشاشة مفتوحة بس (قيد المتصفحات). سيب الصفحة مفتوحة وقت الجري، وطلّع الموبايل في الجيب من غير ما تقفل التطبيق. لو عايز تتبع بالخلفية استخدم ساعتك وارفع الملف من ملفي.', 'GPS works while the screen is on (a browser limit). Keep the page open while you run. For background tracking use your watch and import the file.')) + '</p>';
      h += '<div class="ap-actions"><button type="button" class="ap-btn" id="apt-rs">' + esc(L('ابدأ الجري', 'Start run')) + '</button></div>';
    } else {
      h += '<div id="apt-live"></div><div class="ap-actions"><button type="button" class="ap-btn ghost" id="apt-rp">' + esc(R.st === 'run' ? L('وقف مؤقت', 'Pause') : L('كمّل', 'Resume')) + '</button><button type="button" class="ap-btn" id="apt-rf">' + esc(L('إنهاء وحفظ', 'Finish and save')) + '</button></div>';
    }
    h += '</div>';
    h += '<div class="ap-sec"><b>' + esc(L('حاسبة البيس والسباق', 'Pace and race calculator')) + '</b></div><div class="ap-card"><div class="ap-three"><label>' + esc(L('المسافة (كم)', 'Distance (km)')) + '<input id="apt-pd" type="number" inputmode="decimal" step="0.01" min="0" value="5"></label><label>' + esc(L('دقايق', 'Minutes')) + '<input id="apt-pm" type="number" inputmode="numeric" min="0" value="25"></label><label>' + esc(L('ثواني', 'Seconds')) + '<input id="apt-ps" type="number" inputmode="numeric" min="0" max="59" value="0"></label></div><div id="apt-po"></div></div>';
    if (p.runs.length) {
      h += '<div class="ap-sec"><b>' + esc(L('جرياتي', 'My runs')) + '</b></div>';
      p.runs.slice(0, 8).forEach((x, i) => { h += '<div class="ap-card"><div class="ap-row"><b>' + esc(x.d) + '</b><span class="mu">' + x.km + ' km · ' + mmss(x.sec) + ' · ' + pstr(paceOf(x.sec, x.km)) + ' /km</span><button type="button" class="ap-x" data-rdel="' + i + '" aria-label="' + esc(L('امسح', 'Delete')) + '"></button></div>' + (x.rt ? routeSvg(x.rt, 320, 160) : '') + '</div>'; });
    }
    body.innerHTML = h; wireBack(body);
    const rs = $('#apt-rs', body); if (rs) rs.addEventListener('click', runStart);
    const rp = $('#apt-rp', body); if (rp) rp.addEventListener('click', runPause);
    const rf = $('#apt-rf', body); if (rf) rf.addEventListener('click', runFinish);
    $$('[data-rdel]', body).forEach((b) => b.addEventListener('click', () => { p.runs.splice(Number(b.dataset.rdel), 1); c.persist(); c.draw(); }));
    const pc = () => {
      const d = num($('#apt-pd', body).value), t = num($('#apt-pm', body).value) * 60 + (num($('#apt-ps', body).value) || 0), o = $('#apt-po', body);
      if (!(d > 0 && t > 0)) { o.innerHTML = ''; return; }
      let x = '<div class="apt-kpi"><div><b>' + pstr(t / d) + '</b><small>' + esc(L('بيس /كم', 'pace /km')) + '</small></div><div><b>' + r1(d / (t / 3600)) + '</b><small>km/h</small></div><div><b>' + pstr(t / d * 1.609344) + '</b><small>' + esc(L('بيس /ميل', 'pace /mile')) + '</small></div></div>';
      x += '<div class="ap-card" style="margin:0">' + RACES.map((rc) => { const tt = t * Math.pow(rc[0] / d, 1.06); return '<div class="ap-food"><span>' + rc[1] + '</span><em>' + mmss(tt) + '</em></div>'; }).join('') + '</div><div class="ap-note">' + esc(L('التوقعات تقدير بمعادلة Riegel وبتفترض تدريب كافي للمسافة. كل ما المسافة أطول عن اللي جريتها، الدقة بتقل.', 'Predictions use the Riegel formula and assume enough training for the distance. Accuracy drops the further the target distance is from your input.')) + '</div>';
      o.innerHTML = x;
    };
    ['#apt-pd', '#apt-pm', '#apt-ps'].forEach((s) => $(s, body).addEventListener('input', pc)); pc();
    if (R.st !== 'idle') runPaint();
  }

  /* ================================================================ video analysis */
  const V = { panes: [], fps: 30, pin: false, tool: 'none', listeners: [] };
  function vidClean() { V.panes.forEach((pn) => { try { if (pn.url) URL.revokeObjectURL(pn.url); } catch (e) { /* ignore */ } }); V.panes = []; }
  const ang = (a, b, c2) => {
    const v1 = [a[0] - b[0], a[1] - b[1]], v2 = [c2[0] - b[0], c2[1] - b[1]];
    const m = Math.hypot(v1[0], v1[1]) * Math.hypot(v2[0], v2[1]); if (!m) return 0;
    return Math.round(Math.acos(Math.max(-1, Math.min(1, (v1[0] * v2[0] + v1[1] * v2[1]) / m))) * 180 / Math.PI * 10) / 10;
  };
  function paneDraw(pn) {
    const cv = pn.cv, v = pn.v; if (!cv || !v) return;
    const w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
    const dpr = window.devicePixelRatio || 1;
    if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, w, h);
    const t = v.currentTime; const P2 = (q) => [q[0] * w, q[1] * h];
    const shown = pn.shapes.filter((s) => !s.pin || Math.abs(s.t - t) < 0.04);
    const cur = pn.draft ? shown.concat([pn.draft]) : shown;
    g.lineWidth = 2.5; g.font = '600 15px system-ui,Arial'; g.lineCap = 'round';
    cur.forEach((s) => {
      g.strokeStyle = '#3ef0b0'; g.fillStyle = '#3ef0b0';
      if (s.k === 'line' && s.p.length >= 2) { const a = P2(s.p[0]), b = P2(s.p[1]); g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); g.fillRect(a[0] - 3, a[1] - 3, 6, 6); g.fillRect(b[0] - 3, b[1] - 3, 6, 6); g.fillStyle = '#fff'; const dg = Math.abs(Math.round(Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI)); g.fillText((dg > 90 ? 180 - dg : dg) + '° ' + L('عن الأفقي', 'from horizontal'), (a[0] + b[0]) / 2 + 6, (a[1] + b[1]) / 2 - 6); }
      if (s.k === 'angle') {
        const pts = s.p.map(P2); g.beginPath(); pts.forEach((q, i) => { if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }); g.stroke();
        pts.forEach((q) => g.fillRect(q[0] - 3, q[1] - 3, 6, 6));
        if (pts.length === 3) { const a = ang(pts[0], pts[1], pts[2]); g.fillStyle = '#fff'; g.fillText(a + '°', pts[1][0] + 10, pts[1][1] - 10); }
      }
    });
  }
  function paneStep(pn, dir) { if (!pn.v || !pn.v.duration) return; pn.v.pause(); pn.v.currentTime = Math.max(0, Math.min(pn.v.duration, pn.v.currentTime + dir / V.fps)); }
  function viewVideo(body) {
    css();
    if (!V.panes.length) V.panes = [{ id: 0, shapes: [] }];
    let h = back() + '<div class="ap-sec"><b>' + esc(L('تحليل الفيديو', 'Video analysis')) + '</b></div><div class="ap-note">' + esc(L('اختار فيديو من جهازك. بيتفتح هنا بس ومبيترفعش.', 'Pick a video from your device. It opens here only and is never uploaded.')) + '</div>';
    h += '<div class="ap-chips">' + [['none', L('تشغيل', 'Play')], ['line', L('خط', 'Line')], ['angle', L('زاوية (٣ نقط)', 'Angle (3 points)')]].map((t) => '<button type="button" class="' + (V.tool === t[0] ? 'on' : '') + '" data-vt="' + t[0] + '">' + esc(t[1]) + '</button>').join('') + '</div>';
    h += '<div class="ap-chips">' + [24, 30, 60].map((f) => '<button type="button" class="' + (V.fps === f ? 'on' : '') + '" data-vf="' + f + '">' + f + ' fps</button>').join('') + '<button type="button" class="' + (V.pin ? 'on' : '') + '" id="apt-vpin">' + esc(L('الرسم على اللقطة دي بس', 'Draw on this frame only')) + '</button></div>';
    h += '<div id="apt-vpanes"></div>';
    h += '<div class="ap-card"><div class="apt-row"><button type="button" class="ap-btn small" id="apt-vplay">' + esc(L('شغّل/وقّف الكل', 'Play/pause all')) + '</button><button type="button" class="ap-btn small ghost" id="apt-vb">−' + esc(L(' إطار', ' frame')) + '</button><button type="button" class="ap-btn small ghost" id="apt-vf">+' + esc(L(' إطار', ' frame')) + '</button></div><div class="ap-chips">' + [0.1, 0.25, 0.5, 1].map((s) => '<button type="button" data-vs="' + s + '">' + s + '×</button>').join('') + '</div><input type="range" id="apt-vr" min="0" max="1000" value="0" aria-label="seek"></div>';
    h += '<div class="ap-actions"><button type="button" class="ap-btn ghost" id="apt-vadd">' + esc(V.panes.length < 2 ? L('+ فيديو تاني للمقارنة', '+ Add second video to compare') : L('شيل الفيديو التاني', 'Remove second video')) + '</button><button type="button" class="ap-btn ghost" id="apt-vclr">' + esc(L('امسح الرسم', 'Clear drawings')) + '</button><button type="button" class="ap-btn" id="apt-vsnap">' + esc(L('حفظ لقطة', 'Save snapshot')) + '</button></div>';
    body.innerHTML = h; wireBack(body);
    const box = $('#apt-vpanes', body);
    V.panes.forEach((pn, idx) => {
      const wrap = document.createElement('div');
      wrap.innerHTML = '<div class="ap-card" style="padding:8px"><div class="ap-row"><b>' + (V.panes.length > 1 ? (idx ? 'B' : 'A') : '') + '</b><label class="ap-btn small ghost" style="margin:0">' + esc(L('اختار فيديو', 'Choose video')) + '<input type="file" accept="video/*" hidden></label></div><div class="apt-vp"' + (pn.url ? '' : ' style="min-height:120px"') + '></div></div>';
      box.appendChild(wrap);
      const vp = $('.apt-vp', wrap), fi = $('input', wrap);
      if (pn.url) {
        const v = document.createElement('video'); v.src = pn.url; v.playsInline = true; v.muted = true; v.preload = 'auto'; v.setAttribute('playsinline', '');
        const cv = document.createElement('canvas'); vp.appendChild(v); vp.appendChild(cv); pn.v = v; pn.cv = cv;
        if (pn.time) v.addEventListener('loadedmetadata', () => { v.currentTime = pn.time; }, { once: true });
        ['timeupdate', 'seeked', 'loadedmetadata', 'play', 'pause'].forEach((ev) => v.addEventListener(ev, () => { pn.time = v.currentTime; paneDraw(pn); const r = $('#apt-vr'); if (r && idx === 0 && v.duration) r.value = Math.round(v.currentTime / v.duration * 1000); }));
        try { new ResizeObserver(() => paneDraw(pn)).observe(vp); } catch (e) { /* ignore */ }
        cv.style.pointerEvents = V.tool === 'none' ? 'none' : 'auto';
        const pos = (e) => { const r = cv.getBoundingClientRect(); return [Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (e.clientY - r.top) / r.height))]; };
        cv.addEventListener('pointerdown', (e) => {
          if (V.tool === 'none') return; e.preventDefault(); v.pause(); const q = pos(e);
          if (V.tool === 'line') { pn.draft = { k: 'line', p: [q, q], t: v.currentTime, pin: V.pin }; try { cv.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ } }
          else { if (!pn.draft || pn.draft.k !== 'angle') pn.draft = { k: 'angle', p: [], t: v.currentTime, pin: V.pin }; pn.draft.p.push(q); if (pn.draft.p.length === 3) { pn.shapes.push(pn.draft); pn.draft = null; } }
          paneDraw(pn);
        });
        cv.addEventListener('pointermove', (e) => { if (pn.draft && pn.draft.k === 'line' && e.buttons) { pn.draft.p[1] = pos(e); paneDraw(pn); } });
        cv.addEventListener('pointerup', () => { if (pn.draft && pn.draft.k === 'line') { const d = pn.draft.p; if (Math.hypot(d[1][0] - d[0][0], d[1][1] - d[0][1]) > 0.01) pn.shapes.push(pn.draft); pn.draft = null; paneDraw(pn); } });
      }
      fi.addEventListener('change', () => { const f = fi.files && fi.files[0]; if (!f) return; if (pn.url) { try { URL.revokeObjectURL(pn.url); } catch (e) { /* ignore */ } } pn.url = URL.createObjectURL(f); pn.shapes = []; pn.draft = null; pn.time = 0; c.draw(); });
    });
    const all = (fn) => V.panes.forEach((pn) => { if (pn.v) fn(pn); });
    $$('[data-vt]', body).forEach((b) => b.addEventListener('click', () => { V.tool = b.dataset.vt; V.panes.forEach((pn) => { pn.draft = null; }); c.draw(); }));
    $$('[data-vf]', body).forEach((b) => b.addEventListener('click', () => { V.fps = Number(b.dataset.vf); c.draw(); }));
    $('#apt-vpin', body).addEventListener('click', () => { V.pin = !V.pin; c.draw(); });
    $('#apt-vplay', body).addEventListener('click', () => { const anyPlaying = V.panes.some((pn) => pn.v && !pn.v.paused); all((pn) => { if (anyPlaying) pn.v.pause(); else pn.v.play().catch(() => {}); }); });
    $('#apt-vb', body).addEventListener('click', () => all((pn) => paneStep(pn, -1)));
    $('#apt-vf', body).addEventListener('click', () => all((pn) => paneStep(pn, 1)));
    $$('[data-vs]', body).forEach((b) => b.addEventListener('click', () => all((pn) => { pn.v.playbackRate = Number(b.dataset.vs); })));
    $('#apt-vr', body).addEventListener('input', (e) => all((pn) => { if (pn.v.duration) { pn.v.pause(); pn.v.currentTime = Number(e.target.value) / 1000 * pn.v.duration; } }));
    $('#apt-vadd', body).addEventListener('click', () => { if (V.panes.length < 2) V.panes.push({ id: 1, shapes: [] }); else { const x = V.panes.pop(); if (x.url) { try { URL.revokeObjectURL(x.url); } catch (e) { /* ignore */ } } } c.draw(); });
    $('#apt-vclr', body).addEventListener('click', () => { V.panes.forEach((pn) => { pn.shapes = []; pn.draft = null; paneDraw(pn); }); });
    $('#apt-vsnap', body).addEventListener('click', () => {
      const loaded = V.panes.filter((pn) => pn.v && pn.v.videoWidth); if (!loaded.length) { c.toast(L('افتح فيديو الأول', 'Open a video first')); return; }
      const W = loaded[0].v.videoWidth, H = loaded[0].v.videoHeight; const out = document.createElement('canvas'); out.width = W * loaded.length; out.height = H; const g = out.getContext('2d');
      loaded.forEach((pn, i) => {
        g.drawImage(pn.v, i * W, 0, W, H);
        const cv = pn.cv; if (cv && cv.width) g.drawImage(cv, 0, 0, cv.width, cv.height, i * W, 0, W, H);
      });
      out.toBlob((blob) => { if (!blob) return; const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'adam-frame.png'; document.body.appendChild(a); a.click(); a.remove(); }, 'image/png');
    });
  }

  /* ================================================================ tactics board */
  const B = { type: 'pitch', items: [], arrows: [], tool: 'move', drag: null, draft: null, hist: [], name: '', cv: null };
  const FORM = {
    '4-4-2': [[.5, .93, 'gk'], [.15, .78], [.38, .78], [.62, .78], [.85, .78], [.15, .58], [.38, .58], [.62, .58], [.85, .58], [.38, .38], [.62, .38]],
    '4-3-3': [[.5, .93, 'gk'], [.15, .78], [.38, .78], [.62, .78], [.85, .78], [.27, .58], [.5, .58], [.73, .58], [.2, .36], [.5, .34], [.8, .36]],
    '3-5-2': [[.5, .93, 'gk'], [.25, .78], [.5, .78], [.75, .78], [.1, .58], [.3, .58], [.5, .58], [.7, .58], [.9, .58], [.38, .38], [.62, .38]]
  };
  const TCOL = { a: '#3b82f6', b: '#e5484d', gk: '#f5c542', cone: '#ff8a3d', ball: '#ffffff' };
  const snap = () => { B.hist.push(JSON.stringify({ i: B.items, a: B.arrows })); if (B.hist.length > 30) B.hist.shift(); };
  function boardDraw() {
    const cv = B.cv; if (!cv) return; const w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
    const dpr = window.devicePixelRatio || 1; if (cv.width !== Math.round(w * dpr)) { cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); }
    const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#2e7d4f'; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 8; i++) { if (i % 2) { g.fillStyle = 'rgba(255,255,255,.04)'; g.fillRect(0, i * h / 8, w, h / 8); } }
    g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 2;
    if (B.type === 'pitch') {
      const m = w * 0.04, x0 = m, y0 = m, x1 = w - m, y1 = h - m, pw = x1 - x0, ph = y1 - y0;
      g.strokeRect(x0, y0, pw, ph); g.beginPath(); g.moveTo(x0, h / 2); g.lineTo(x1, h / 2); g.stroke();
      g.beginPath(); g.arc(w / 2, h / 2, pw * 0.14, 0, Math.PI * 2); g.stroke();
      const bw = pw * 0.6, bh = ph * 0.16, sw = pw * 0.27, sh = ph * 0.06;
      g.strokeRect(w / 2 - bw / 2, y0, bw, bh); g.strokeRect(w / 2 - bw / 2, y1 - bh, bw, bh);
      g.strokeRect(w / 2 - sw / 2, y0, sw, sh); g.strokeRect(w / 2 - sw / 2, y1 - sh, sw, sh);
    } else {
      g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 1;
      for (let i = 1; i < 10; i++) { g.beginPath(); g.moveTo(i * w / 10, 0); g.lineTo(i * w / 10, h); g.stroke(); g.beginPath(); g.moveTo(0, i * h / 14.5); g.lineTo(w, i * h / 14.5); g.stroke(); }
      g.strokeStyle = 'rgba(255,255,255,.85)'; g.lineWidth = 2; g.strokeRect(2, 2, w - 4, h - 4);
    }
    const arrows = B.draft && B.draft.k === 'arrow' ? B.arrows.concat([B.draft]) : B.arrows;
    arrows.forEach((a) => {
      const x1 = a.x1 * w, y1 = a.y1 * h, x2 = a.x2 * w, y2 = a.y2 * h; const dx = x2 - x1, dy = y2 - y1, L2 = Math.hypot(dx, dy); if (L2 < 3) return;
      g.strokeStyle = '#fff'; g.fillStyle = '#fff'; g.lineWidth = 3; g.setLineDash(a.dash ? [8, 6] : []);
      const ux = dx / L2, uy = dy / L2; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2 - ux * 8, y2 - uy * 8); g.stroke(); g.setLineDash([]);
      g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - ux * 14 - uy * 7, y2 - uy * 14 + ux * 7); g.lineTo(x2 - ux * 14 + uy * 7, y2 - uy * 14 - ux * 7); g.closePath(); g.fill();
    });
    const R0 = Math.max(11, w * 0.035);
    B.items.forEach((it) => {
      const x = it.x * w, y = it.y * h; g.fillStyle = TCOL[it.t] || '#fff'; g.strokeStyle = '#0b1210'; g.lineWidth = 2;
      if (it.t === 'cone') { g.beginPath(); g.moveTo(x, y - R0 * 0.8); g.lineTo(x + R0 * 0.8, y + R0 * 0.7); g.lineTo(x - R0 * 0.8, y + R0 * 0.7); g.closePath(); g.fill(); g.stroke(); }
      else if (it.t === 'ball') { g.beginPath(); g.arc(x, y, R0 * 0.55, 0, Math.PI * 2); g.fill(); g.stroke(); }
      else { g.beginPath(); g.arc(x, y, R0, 0, Math.PI * 2); g.fill(); g.stroke(); if (it.n != null) { g.fillStyle = it.t === 'gk' ? '#1a1a1a' : '#fff'; g.font = '700 ' + Math.round(R0 * 0.95) + 'px system-ui,Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(String(it.n), x, y + 1); } }
    });
  }
  const segDist = (px, py, a) => { const dx = a.x2 - a.x1, dy = a.y2 - a.y1, l2 = dx * dx + dy * dy || 1e-9; let t = ((px - a.x1) * dx + (py - a.y1) * dy) / l2; t = Math.max(0, Math.min(1, t)); return Math.hypot(px - (a.x1 + t * dx), py - (a.y1 + t * dy)); };
  function boardWire(cv) {
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)), Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)), r]; };
    const hit = (x, y, r) => { const rad = Math.max(14, r.width * 0.045); for (let i = B.items.length - 1; i >= 0; i--) { if (Math.hypot((B.items[i].x - x) * r.width, (B.items[i].y - y) * r.height) <= rad) return i; } return -1; };
    cv.addEventListener('pointerdown', (e) => {
      e.preventDefault(); const q = pos(e), r = q[2], x = q[0], y = q[1]; try { cv.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
      if (B.tool === 'move') { const i = hit(x, y, r); if (i >= 0) { snap(); B.drag = i; } }
      else if (B.tool === 'arrow' || B.tool === 'dash') B.draft = { k: 'arrow', x1: x, y1: y, x2: x, y2: y, dash: B.tool === 'dash' };
      else if (B.tool === 'erase') {
        const i = hit(x, y, r);
        if (i >= 0) { snap(); B.items.splice(i, 1); }
        else { const j = B.arrows.findIndex((a) => segDist(x * r.width, y * r.height, { x1: a.x1 * r.width, y1: a.y1 * r.height, x2: a.x2 * r.width, y2: a.y2 * r.height }) < 14); if (j >= 0) { snap(); B.arrows.splice(j, 1); } }
      } else {
        snap(); const t = B.tool; const it = { t: t, x: x, y: y };
        if (t === 'a' || t === 'b') it.n = B.items.filter((z) => z.t === t).length + 1;
        if (t === 'gk') it.n = 1;
        B.items.push(it);
      }
      boardDraw();
    });
    cv.addEventListener('pointermove', (e) => {
      const q = pos(e);
      if (B.drag != null && B.items[B.drag]) { B.items[B.drag].x = q[0]; B.items[B.drag].y = q[1]; boardDraw(); }
      else if (B.draft) { B.draft.x2 = q[0]; B.draft.y2 = q[1]; boardDraw(); }
    });
    const up = () => { if (B.draft) { if (Math.hypot(B.draft.x2 - B.draft.x1, B.draft.y2 - B.draft.y1) > 0.02) { snap(); B.arrows.push({ x1: B.draft.x1, y1: B.draft.y1, x2: B.draft.x2, y2: B.draft.y2, dash: B.draft.dash }); } B.draft = null; } B.drag = null; boardDraw(); };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  }
  function viewBoard(body) {
    css(); const p = P(); p.boards = Array.isArray(p.boards) ? p.boards : [];
    const tools = [['move', L('تحريك', 'Move')], ['a', L('لاعب أزرق', 'Blue player')], ['b', L('لاعب أحمر', 'Red player')], ['gk', L('حارس', 'GK')], ['cone', L('كونة', 'Cone')], ['ball', L('كورة', 'Ball')], ['arrow', L('سهم', 'Arrow')], ['dash', L('سهم متقطع', 'Dashed')], ['erase', L('مسح عنصر', 'Erase')]];
    let h = back() + '<div class="ap-sec"><b>' + esc(L('لوحة التكتيك', 'Tactics board')) + '</b></div>';
    h += '<div class="ap-chips">' + [['pitch', L('ملعب كورة', 'Football pitch')], ['plain', L('مساحة تدريب', 'Training area')]].map((t) => '<button type="button" class="' + (B.type === t[0] ? 'on' : '') + '" data-bt="' + t[0] + '">' + esc(t[1]) + '</button>').join('') + '</div>';
    h += '<div class="ap-chips">' + tools.map((t) => '<button type="button" class="' + (B.tool === t[0] ? 'on' : '') + '" data-bl="' + t[0] + '">' + esc(t[1]) + '</button>').join('') + '</div>';
    h += '<canvas class="apt-cv" id="apt-bcv" style="aspect-ratio:' + (B.type === 'pitch' ? '68 / 98' : '1 / 1.1') + '"></canvas>';
    h += '<div class="ap-chips">' + Object.keys(FORM).map((f) => '<button type="button" data-bf="' + f + '">' + f + '</button>').join('') + '<button type="button" id="apt-bundo">' + esc(L('تراجع', 'Undo')) + '</button><button type="button" id="apt-bclr">' + esc(L('امسح الكل', 'Clear all')) + '</button></div>';
    h += '<div class="ap-card"><label>' + esc(L('اسم التمرين / الخطة', 'Drill / play name')) + '<input id="apt-bn" type="text" maxlength="40" value="' + esc(B.name) + '"></label><div class="ap-actions"><button type="button" class="ap-btn" id="apt-bs">' + esc(L('احفظ', 'Save')) + '</button><button type="button" class="ap-btn ghost" id="apt-be">' + esc(L('صدّر صورة', 'Export image')) + '</button></div></div>';
    if (p.boards.length) h += '<div class="ap-sec"><b>' + esc(L('اللي حفظته', 'Saved boards')) + '</b></div><div class="ap-card">' + p.boards.map((b, i) => '<div class="ap-food"><span>' + esc(b.name) + ' <small class="mu">' + esc(b.d) + '</small></span><button type="button" class="ap-btn small ghost" data-bld="' + i + '">' + esc(L('افتح', 'Open')) + '</button><button type="button" class="ap-x" data-bdel="' + i + '" aria-label="' + esc(L('امسح', 'Delete')) + '"></button></div>').join('') + '</div>';
    body.innerHTML = h; wireBack(body);
    const cv = $('#apt-bcv', body); B.cv = cv; boardWire(cv);
    requestAnimationFrame(boardDraw); try { new ResizeObserver(boardDraw).observe(cv); } catch (e) { /* ignore */ }
    $$('[data-bt]', body).forEach((b) => b.addEventListener('click', () => { B.type = b.dataset.bt; c.draw(); }));
    $$('[data-bl]', body).forEach((b) => b.addEventListener('click', () => { B.tool = b.dataset.bl; c.draw(); }));
    $$('[data-bf]', body).forEach((b) => b.addEventListener('click', () => { snap(); B.type = 'pitch'; B.items = B.items.filter((z) => z.t !== 'a' && z.t !== 'gk'); FORM[b.dataset.bf].forEach((q, i) => B.items.push(q[2] === 'gk' ? { t: 'gk', x: q[0], y: q[1], n: 1 } : { t: 'a', x: q[0], y: q[1], n: i + 1 - 0 })); c.draw(); }));
    $('#apt-bundo', body).addEventListener('click', () => { const s = B.hist.pop(); if (s) { const o = JSON.parse(s); B.items = o.i; B.arrows = o.a; boardDraw(); } });
    $('#apt-bclr', body).addEventListener('click', () => { snap(); B.items = []; B.arrows = []; boardDraw(); });
    $('#apt-bn', body).addEventListener('input', (e) => { B.name = e.target.value; });
    $('#apt-bs', body).addEventListener('click', () => {
      const name = ($('#apt-bn', body).value || '').trim().slice(0, 40) || L('لوحة', 'Board');
      p.boards.unshift({ id: 'b' + Date.now(), name: name, d: c.stamp(), type: B.type, items: B.items, arrows: B.arrows }); p.boards = p.boards.slice(0, 20);
      if (JSON.stringify(p.boards).length > 150000) { p.boards.pop(); c.toast(L('المساحة كملت، امسح لوحات قديمة', 'Storage full, delete older boards')); return; }
      c.persist(); c.toast(L('اتحفظت', 'Saved')); c.draw();
    });
    $$('[data-bld]', body).forEach((b) => b.addEventListener('click', () => { const s = p.boards[Number(b.dataset.bld)]; if (!s) return; B.type = s.type; B.items = JSON.parse(JSON.stringify(s.items)); B.arrows = JSON.parse(JSON.stringify(s.arrows)); B.name = s.name; B.hist = []; c.draw(); }));
    $$('[data-bdel]', body).forEach((b) => b.addEventListener('click', () => { p.boards.splice(Number(b.dataset.bdel), 1); c.persist(); c.draw(); }));
    $('#apt-be', body).addEventListener('click', () => {
      boardDraw(); cv.toBlob(async (blob) => {
        if (!blob) return; const file = new File([blob], 'adam-board.png', { type: 'image/png' });
        try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'ADAM' }); return; } } catch (e) { return; }
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'adam-board.png'; document.body.appendChild(a); a.click(); a.remove();
      }, 'image/png');
    });
  }

  /* ================================================================ router */
  function viewTools(body) {
    css();
    if (S.sec === 'plate') return viewPlate(body);
    if (S.sec === 'lift') return viewLift(body);
    if (S.sec === 'run') return viewRun(body);
    if (S.sec === 'video') return viewVideo(body);
    if (S.sec === 'board') return viewBoard(body);
    return viewMenu(body);
  }
  /* leaving the tab: free video memory; a running GPS run keeps going (it is shown again when you come back) */
  function stopTools() { vidClean(); }
  function resetSection() { S.sec = 'menu'; }
  return { viewTools: viewTools, stopTools: stopTools, resetSection: resetSection };
}
