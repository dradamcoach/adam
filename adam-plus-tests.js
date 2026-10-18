// ADAM+ — fitness tests engine: beep, Yo-Yo IR1/IR2, 30-15 IFT, timed rep tests, stopwatch runs/swims, manual values,
// calculators and military/police batteries (catalogue in adam-plus-tests2.js). Own timers, sounds and result history.
// Results are ESTIMATES from published formulas, not a medical assessment; no scoring tables (standards differ and change).
import { TEST_CATS, TESTS, BATTERIES, VO2_NORMS, VO2_LABELS, PUSH_NORMS, PUSH_LABELS } from './adam-plus-tests2.js';
export function createTests(c) {
  const L = c.L, esc = c.esc;
  const LEVELS = [7, 8, 8, 9, 9, 10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16];
  const spd = (lv) => 8.5 + 0.5 * (lv - 1);
  const YY = {
    yoyo1: { rest: 10, blocks: [[10, 1], [12, 1], [13, 2], [13.5, 3], [14, 4], [14.5, 8], [15, 8], [15.5, 8], [16, 8], [16.5, 8], [17, 8], [17.5, 8], [18, 8], [18.5, 8], [19, 8]] },
    yoyo2: { rest: 10, blocks: [[13, 1], [15, 1], [16, 2], [16.5, 3], [17, 4], [17.5, 8], [18, 8], [18.5, 8], [19, 8], [19.5, 8], [20, 8], [20.5, 8], [21, 8], [21.5, 8], [22, 8]] }
  };
  const UI = { cat: 'all' };
  /* user-defined tests (name + unit + higher/lower is better), kept in plus.ctests and synced like the rest of ADAM+ */
  const customs = () => { const p = c.plus(); p.ctests = Array.isArray(p.ctests) ? p.ctests : []; return p.ctests; };
  const allTests = () => TESTS.concat(customs().map((x) => ({ k: x.k, cat: 'custom', ar: x.name, en: x.name, type: 'val', hi: x.hi ? 1 : 0, u: 'x', unit: x.unit || '', ar2: L('اختبار مخصص من عندك.', 'Your own custom test.'), en2: 'Your own custom test.', custom: 1 })));
  const byK = (k) => allTests().find((x) => x.k === k);
  let S = { k: '', phase: 'menu' };
  let iv = null, bt = null, wl = null, ev = [], t0 = 0;

  const mmss = (sec) => { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); };
  const lvOf = (g) => { let acc = 0; for (let l = 1; l <= LEVELS.length; l++) { if (g <= acc + LEVELS[l - 1]) return { lv: l, sh: g - acc, of: LEVELS[l - 1] }; acc += LEVELS[l - 1]; } return { lv: LEVELS.length, sh: LEVELS[LEVELS.length - 1], of: LEVELS[LEVELS.length - 1] }; };
  function beepEvents() {
    const out = []; let t = 0; let g = 0;
    LEVELS.forEach((n, i) => { const d = 20 / (spd(i + 1) / 3.6); for (let s = 1; s <= n; s++) { g++; t += d; out.push({ at: t * 1000, g: g, last: s === n }); } });
    return out;
  }
  function vo2Beep(completed, age) {
    if (completed < 1) return 0;
    const lv = lvOf(completed).lv; const S_ = spd(lv); const A = Number(age) || 28;
    const v = A >= 18 ? 5.857 * S_ - 19.458 : 31.025 + 3.238 * S_ - 3.248 * A + 0.1536 * S_ * A;
    return Math.max(0, Math.round(v * 10) / 10);
  }
  const vo2Cooper = (d) => Math.max(0, Math.round(((Number(d) - 504.9) / 44.73) * 10) / 10);
  const vo2Run = (sec) => (sec > 0 ? Math.round((483 / (sec / 60) + 3.5) * 10) / 10 : 0);

  function lockOn() { try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then((w) => { wl = w; }).catch(() => {}); } catch (e) { /* ignore */ } }
  function lockOff() { try { if (wl) wl.release(); } catch (e) { /* ignore */ } wl = null; }
  function stopAll() { clearInterval(iv); iv = null; clearTimeout(bt); bt = null; lockOff(); try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
  function stop() { stopAll(); S = { k: '', phase: 'menu' }; }
  const hist = () => { const p = c.plus(); p.tests = Array.isArray(p.tests) ? p.tests : []; return p.tests; };
  function save(entry) { const h = hist(); h.unshift(Object.assign({ d: c.stamp() }, entry)); c.plus().tests = h.slice(0, 80); c.persist(); }

  /* ---------- live helpers ---------- */
  const el = (id) => document.getElementById(id);
  const setT = (id, txt) => { const e = el(id); if (e && e.textContent !== txt) e.textContent = txt; };
  function beginCountdownTo(startAt, onGo) {
    const tk = () => { const s = Math.ceil((startAt - Date.now()) / 1000); if (s > 0) { setT('tt-big', String(s)); if (S._last !== s) { S._last = s; c.tone(660, 90); } } else { clearInterval(iv); onGo(); } };
    clearInterval(iv); iv = setInterval(tk, 100); tk();
  }

  /* ---------- beep test ---------- */
  function startBeep() {
    ev = beepEvents(); lockOn();
    S.phase = 'run'; S.begin = Date.now() + 5000; t0 = S.begin; S.done = 0; c.draw();
    beginCountdownTo(t0, () => { c.tone(1000, 300); c.buzz(80); runBeep(0); iv = setInterval(tickBeep, 100); });
  }
  function runBeep(i) {
    if (i >= ev.length) { setTimeout(() => finishBeep(ev.length), 600); return; }
    const delay = Math.max(0, t0 + ev[i].at - Date.now());
    bt = setTimeout(() => {
      c.tone(ev[i].last ? 1100 : 900, ev[i].last ? 320 : 220); if (ev[i].last) c.tone(1100, 220, 0.34); c.buzz(60);
      if (ev[i].last && i + 1 < ev.length) { const nx = lvOf(ev[i].g + 1); c.speak(L('مستوى ', 'Level ') + nx.lv); }
      S.done = ev[i].g; runBeep(i + 1);
    }, delay);
  }
  function tickBeep() {
    const now = Date.now() - t0; let n = 0; while (n < ev.length && ev[n].at <= now) n++;
    const cur = Math.min(n + 1, ev.length); const inf = lvOf(cur);
    setT('tt-big', L('مستوى ', 'Level ') + inf.lv);
    setT('tt-sub', L('جولة ', 'Shuttle ') + inf.sh + ' / ' + inf.of + ' · ' + spd(inf.lv).toFixed(1) + ' km/h');
    const a = n > 0 ? ev[n - 1].at : 0; const b = ev[Math.min(n, ev.length - 1)].at; const f = Math.min(1, Math.max(0, (now - a) / Math.max(1, b - a)));
    const bar = el('tt-bar'); if (bar) bar.style.width = Math.round(f * 100) + '%';
    setT('tt-mini', L('وقت الاختبار ', 'Elapsed ') + mmss(now / 1000));
  }
  function finishBeep(forceAll) {
    const now = Date.now() - t0; let n = 0; while (n < ev.length && ev[n].at <= now) n++;
    const completed = forceAll ? ev.length : Math.max(0, n - 0);
    stopAll(); const inf = completed ? lvOf(completed) : { lv: 0, sh: 0 };
    const x = vo2Beep(completed, S.age);
    S.phase = 'result';
    S.res = { line: completed ? L('وصلت مستوى ', 'You reached level ') + inf.lv + L(' جولة ', ' shuttle ') + inf.sh + ' · ' + completed * 20 + L(' متر', ' m') : L('ما خلصتش جولة', 'No shuttle completed'), x: x, entry: completed ? { k: 'beep', v: completed, lv: inf.lv, sh: inf.sh, x: x } : null };
    c.draw();
  }

  /* ---------- Yo-Yo IR1/IR2 and 30-15 IFT (scheduled shuttles) ---------- */
  function buildSched(k) {
    const e = []; let sh = [];
    if (k === 'ift') {
      for (let s = 1; s <= 30; s++) {
        const ts = (s - 1) * 45000, v = 8 + 0.5 * (s - 1), dd = 40 / (v / 3.6) * 1000;
        if (s > 1) e.push({ at: ts, f: 900, d: 260, say: v.toFixed(1) + ' km/h' });
        for (let q = 1; q * dd < 29800; q++) e.push({ at: ts + q * dd, f: 800, d: 120 });
        e.push({ at: ts + 30000, f: 1100, d: 240, dbl: 1, say: L('امشي', 'Walk') });
        sh.push({ sp: v, ts: ts, te: ts + 30000 });
      }
      return { k: k, ev: e.sort((a, b) => a.at - b.at), sh: sh, cycle: 45000 };
    }
    const Y = YY[k]; let ts = 0, last = 0;
    Y.blocks.forEach((b) => { for (let q = 0; q < b[1]; q++) { const d = 40 / (b[0] / 3.6) * 1000; sh.push({ sp: b[0], ts: ts, te: ts + d }); ts += d + Y.rest * 1000; } });
    sh.forEach((s, j) => {
      if (j > 0) e.push({ at: s.ts, f: 900, d: 260, say: s.sp !== last ? s.sp + ' km/h' : '' });
      e.push({ at: s.ts + (s.te - s.ts) / 2, f: 800, d: 140 });
      e.push({ at: s.te, f: 1100, d: 240, dbl: 1 });
      last = s.sp;
    });
    return { k: k, ev: e, sh: sh, rest: Y.rest * 1000 };
  }
  let sched = null;
  function startShuttle(k) {
    sched = buildSched(k); ev = sched.ev; lockOn();
    S.phase = 'run'; S.begin = Date.now() + 5000; t0 = S.begin; c.draw();
    beginCountdownTo(t0, () => { c.tone(1000, 300); c.buzz(80); runEv(0); iv = setInterval(tickShuttle, 100); });
  }
  function runEv(i) {
    if (i >= ev.length) { setTimeout(finishShuttle, 800); return; }
    bt = setTimeout(() => { const e = ev[i]; c.tone(e.f, e.d); if (e.dbl) c.tone(e.f, 220, 0.34); c.buzz(60); if (e.say) c.speak(e.say); runEv(i + 1); }, Math.max(0, t0 + ev[i].at - Date.now()));
  }
  function tickShuttle() {
    if (!sched) return; const now = Date.now() - t0; const sh = sched.sh; let big = '', sub = '', f = 0;
    if (sched.k === 'ift') {
      const s = Math.min(sh.length, Math.floor(now / 45000) + 1), w = now - (s - 1) * 45000;
      if (w < 30000) { big = sh[s - 1].sp.toFixed(1) + ' km/h'; sub = L('مرحلة ', 'Stage ') + s + ' · ' + L('جري ', 'run ') + Math.ceil((30000 - w) / 1000) + ' s'; f = w / 30000; }
      else { big = L('امشي', 'Walk') + ' ' + Math.ceil((45000 - w) / 1000); sub = L('مرحلة ', 'Stage ') + s + L(' خلصت', ' done'); f = (w - 30000) / 15000; }
    } else {
      let j = 0; while (j < sh.length - 1 && sh[j].te <= now) j++;
      const s = sh[j];
      if (now >= s.ts) { big = s.sp + ' km/h'; sub = L('شوط ', 'Shuttle ') + (j + 1) + ' · ' + j * 40 + L(' م خلصت', ' m done'); f = (now - s.ts) / (s.te - s.ts); }
      else { big = L('راحة ', 'Rest ') + Math.ceil((s.ts - now) / 1000); sub = L('شوط ', 'Next shuttle ') + (j + 1) + ' · ' + j * 40 + L(' م خلصت', ' m done'); f = 1 - (s.ts - now) / sched.rest; }
    }
    setT('tt-big', big); setT('tt-sub', sub); const bar = el('tt-bar'); if (bar) bar.style.width = Math.round(Math.min(1, Math.max(0, f)) * 100) + '%';
    setT('tt-mini', L('وقت الاختبار ', 'Elapsed ') + mmss(now / 1000));
  }
  const vo2Yo = (k, dist) => (dist > 0 ? Math.round((k === 'yoyo2' ? dist * 0.0136 + 45.3 : dist * 0.0084 + 36.4) * 10) / 10 : 0);
  function vo2Ift(v, p) { if (!v || !p || !(p.a >= 8 && p.a <= 90 && p.w > 0)) return 0; return Math.round((28.3 - 2.15 * p.g - 0.741 * p.a - 0.0357 * p.w + 0.0586 * p.a * v + 1.03 * v) * 10) / 10; }
  function finishShuttle() {
    if (!sched) return; const now = Date.now() - t0; const k = sched.k; const n = sched.sh.filter((s) => s.te <= now).length; stopAll(); S.phase = 'result';
    if (k === 'ift') {
      const v = n ? sched.sh[n - 1].sp : 0, x = vo2Ift(v, S.prof);
      S.res = { line: v ? L('سرعتك النهائية VIFT ', 'Final speed VIFT ') + v + ' km/h (' + L('مرحلة ', 'stage ') + n + ')' : L('ما خلصتش مرحلة', 'No stage completed'), x: x, entry: v ? { k: k, v: v, x: x } : null };
    } else {
      const dist = n * 40, sp = n ? sched.sh[n - 1].sp : 0, x = vo2Yo(k, dist);
      S.res = { line: n ? L('خلصت ', 'Completed ') + n + L(' شوط · ', ' shuttles · ') + dist + L(' متر · آخر سرعة ', ' m · last speed ') + sp + ' km/h' : L('ما خلصتش شوط', 'No shuttle completed'), x: x, entry: n ? { k: k, v: dist, x: x, sp: sp } : null };
    }
    c.draw();
  }

  /* ---------- generic countdown / stopwatch ---------- */
  function startCountdown(secs, opt) {
    lockOn(); S.phase = 'run'; S.mode = 'down'; S.begin = Date.now() + 5000; c.draw();
    beginCountdownTo(S.begin, () => {
      c.tone(1000, 300); c.buzz(80); const end = Date.now() + secs * 1000; S.end = end; let lastMin = -1;
      iv = setInterval(() => {
        const left = Math.ceil((end - Date.now()) / 1000);
        setT('tt-big', mmss(left)); const bar = el('tt-bar'); if (bar) bar.style.width = Math.round(100 * (1 - Math.max(0, left) / secs)) + '%';
        if (opt && opt.minuteBeep && left > 0 && left % 60 === 0 && left !== lastMin) { lastMin = left; c.tone(700, 160); c.speak(L('باقي ', '') + (left / 60) + L(' دقيقة', ' min left')); }
        if (left <= 3 && left > 0 && S._l3 !== left) { S._l3 = left; c.tone(660, 90); }
        if (left <= 0) { stopAll(); c.tone(660, 140); c.tone(880, 140, 0.16); c.tone(1100, 380, 0.32); c.buzz([200, 100, 300]); S.phase = 'enter'; c.draw(); }
      }, 200);
    });
  }
  function startWatch(dec) {
    lockOn(); S.phase = 'run'; S.mode = 'up'; S.begin = Date.now() + 5000; c.draw();
    beginCountdownTo(S.begin, () => { c.tone(1000, 300); c.buzz(80); const st = Date.now(); S.st = st; iv = setInterval(() => { const sec = (Date.now() - st) / 1000; setT('tt-big', dec ? sec.toFixed(1) : mmss(sec)); }, dec ? 50 : 200); });
  }
  function stopWatch() {
    const t = byK(S.k) || {}; const ms = S.st ? Date.now() - S.st : 0; const dec = t.dec || 0; stopAll();
    const sec = dec ? Math.round(ms / (dec === 2 ? 10 : 100)) / (dec === 2 ? 100 : 10) : Math.round(ms / 1000);
    showTimed(t, sec);
  }
  function showTimed(t, sec) {
    S.phase = 'result'; const x = t.vo2 === 'run' ? vo2Run(sec) : 0;
    S.res = { line: L('زمنك ', 'Your time ') + fv(t, sec), x: x, entry: Object.assign({ k: t.k, v: sec }, x ? { x: x } : {}) };
    c.draw();
  }
  const parseTime = (str) => { str = String(str || '').trim().replace(',', '.'); if (!str) return NaN; if (str.indexOf(':') >= 0) { const p = str.split(':'); return Number(p[0]) * 60 + Number(p[1]); } return Number(str); };

  /* ---------- rating (indicative; needs sex + age in the profile) ---------- */
  function rate(e) {
    const pr = c.plus().profile || {}; const sx = pr.sex === 'f' ? 'f' : (pr.sex === 'm' ? 'm' : ''); const age = Number(pr.age);
    if (!sx || !(age > 0)) return '';
    const pick = (tbl, labels, val) => { let i = 0; tbl.forEach((b, j) => { if (val >= b) i = j + 1; }); return L(labels[i][0], labels[i][1]); };
    const vo2 = e.k === 'rock' ? e.v : e.x;
    if (vo2 > 0 && age >= 20 && age < 80) return L('تصنيف VO2max: ', 'VO2max rating: ') + pick(VO2_NORMS[sx][Math.min(5, Math.floor((age - 20) / 10))], VO2_LABELS, vo2);
    if (e.k === 'pushups' && age >= 17) { const band = age < 20 ? 0 : (age >= 60 ? 5 : Math.floor(age / 10) - 1); return L('تصنيف الضغط: ', 'Push-up rating: ') + pick(PUSH_NORMS[sx][band], PUSH_LABELS, e.v); }
    return '';
  }

  /* ---------- formatting & history ---------- */
  function fv(t, v) {
    const u = t.u;
    if (u === 's') return mmss(v);
    if (u === 'sec') return v + ' s';
    if (u === 'rep') return v + L(' عدّة', ' reps');
    if (u === 'm') return v + L(' م', ' m');
    if (u === 'kg') return v + ' kg';
    if (u === 'cm') return v + ' cm';
    if (u === 'kmh') return v + ' km/h';
    if (t.unit !== undefined) return v + (t.unit ? ' ' + t.unit : '');
    return String(v);
  }
  function fmt(e) {
    const t = byK(e.k) || { u: '' };
    if (e.k === 'beep') return L('مستوى ', 'Level ') + e.lv + '.' + e.sh + (e.x ? ' · VO2max ≈ ' + e.x : '');
    if (e.k === 'css') return mmss(e.v) + L(' / 100 م', ' /100 m');
    if (e.k === 'rock') return 'VO2max ≈ ' + e.v;
    return fv(t, e.v) + (e.x ? ' · VO2max ≈ ' + e.x : '');
  }
  function histHtml() {
    const h = hist(); if (!h.length) return '';
    let o = '<div class="ap-sec"><b>' + esc(L('نتايجي السابقة', 'My results')) + '</b></div>';
    allTests().forEach((t) => {
      const rows = h.filter((e) => e.k === t.k); if (!rows.length) return;
      o += '<div class="ap-card"><b>' + esc(L(t.ar, t.en)) + '</b>';
      rows.slice(0, 6).forEach((e, i) => {
        const prev = rows[i + 1]; let d = '';
        if (prev && typeof e.v === 'number' && typeof prev.v === 'number' && e.v !== prev.v) { const better = t.hi ? e.v > prev.v : e.v < prev.v; d = ' <span style="color:' + (better ? '#2ee07a' : '#f59e0b') + '">' + (better ? '▲' : '▼') + '</span>'; }
        o += '<div class="ap-row" style="margin-top:6px"><span class="mu">' + esc(e.d) + '</span><span>' + esc(fmt(e)) + d + (i === 0 && rate(e) ? '<br><small class="mu">' + esc(rate(e)) + '</small>' : '') + '</span><button type="button" class="ap-btn small ghost danger" data-tdel="' + esc(e.d + '|' + e.k + '|' + e.v) + '">×</button></div>';
      });
      o += '</div>';
    });
    return o;
  }

  /* ---------- views ---------- */
  function live(extra) {
    return '<div class="ap-card" style="text-align:center"><div id="tt-big" style="font-size:64px;font-weight:800;line-height:1.1;margin:6px 0">…</div><div id="tt-sub" class="mu" style="min-height:22px"></div>' +
      '<div style="height:10px;border-radius:6px;background:rgba(255,255,255,.1);margin:12px 0;overflow:hidden"><div id="tt-bar" style="height:100%;width:0;background:#2ee07a"></div></div><div id="tt-mini" class="mu"></div>' + (extra || '') + '</div>';
  }
  const p = (txt) => '<p class="ap-p">' + esc(txt) + '</p>';
  const inp = (id, label, val, w, step) => '<label class="ap-p" style="display:block;margin:6px 0">' + esc(label) + ' <input id="' + id + '" type="number" inputmode="decimal" step="' + (step || 'any') + '" value="' + esc(val === undefined ? '' : val) + '" style="width:' + (w || 100) + 'px"></label>';
  function menuHtml() {
    let h = '<div class="ap-sec"><b>' + esc(L('اختبارات اللياقة', 'Fitness tests')) + '</b><span>' + esc(L('اختار اختبار وسجّل نتيجتك وقارن بعدين', 'pick a test, log it, compare later')) + '</span></div>';
    h += '<div class="ap-chips">' + TEST_CATS.concat([['custom', 'اختباراتي', 'My tests']]).map((x) => '<button type="button" class="' + (x[0] === UI.cat ? 'on' : '') + '" data-tcat="' + x[0] + '">' + esc(L(x[1], x[2])) + '</button>').join('') + '</div>';
    if (UI.cat === 'mil' || UI.cat === 'all') {
      h += '<div class="ap-sec"><b>' + esc(L('بطاريات عسكرية وشرطية', 'Military & police batteries')) + '</b></div>';
      BATTERIES.forEach((b) => {
        h += '<div class="ap-card"><b>' + esc(L(b.ar, b.en)) + '</b>' + p(L(b.ar2, b.en2)) + '<div class="ap-chips">' + b.ev.map((k, i) => { const t = byK(k); return '<button type="button" data-tpick="' + k + '">' + (i + 1) + '. ' + esc(L(t.ar, t.en)) + '</button>'; }).join('') + '</div></div>';
      });
      h += '<div class="ap-note">' + esc(L('الأحداث هنا بتتسجل لكل اختبار لوحده. مفيش جداول درجات علشان المعايير بتختلف حسب الجهة والسن والنوع وبتتغير، راجع المعيار الرسمي الحالي للجهة بتاعتك.', 'Each event is logged on its own. There are no scoring tables on purpose: standards differ by institution, age and sex and change over time, so check your institution\'s current official standard.')) + '</div>';
    }
    if (UI.cat === 'custom') {
      h += '<div class="ap-card"><b>' + esc(L('اعمل اختبار بتاعك', 'Create your own test')) + '</b>' + p(L('اكتب اسم الاختبار والوحدة (مثلاً: ثانية، كجم، سم، عدّة) وحدد الأحسن الأكبر ولا الأصغر. بعدها تسجّل نتايجه وتقارنها.', 'Name your test, give a unit (e.g. s, kg, cm, reps) and say whether higher or lower is better. Then log and compare results.')) +
        '<input id="tt-cname" type="text" maxlength="40" placeholder="' + esc(L('اسم الاختبار', 'Test name')) + '" style="width:90%;margin:4px 0"><br><input id="tt-cunit" type="text" maxlength="12" placeholder="' + esc(L('الوحدة', 'Unit')) + '" style="width:110px"> ' +
        '<select id="tt-chi"><option value="1">' + esc(L('الأكبر أحسن', 'Higher is better')) + '</option><option value="0">' + esc(L('الأصغر أحسن (زمن)', 'Lower is better (time)')) + '</option></select>' +
        '<div class="ap-actions"><button type="button" class="ap-btn" id="tt-cadd">' + esc(L('أضف الاختبار', 'Add test')) + '</button></div></div>';
      if (!customs().length) h += '<div class="ap-note">' + esc(L('لسه معندكش اختبارات مخصصة.', 'No custom tests yet.')) + '</div>';
    }
    allTests().filter((x) => UI.cat === 'all' ? true : x.cat === UI.cat).forEach((x) => {
      h += '<div class="ap-card"><b>' + esc(L(x.ar, x.en)) + '</b>' + p(L(x.ar2, x.en2)) + '<div class="ap-actions"><button type="button" class="ap-btn small" data-tpick="' + x.k + '">' + esc(L('جهّز', 'Set up')) + '</button>' + (x.custom ? '<button type="button" class="ap-btn small ghost danger" data-cdel="' + esc(x.k) + '">' + esc(L('امسح', 'Delete')) + '</button>' : '') + '</div></div>';
    });
    h += '<div class="ap-note">' + esc(L('النتايج تقديرية بمعادلات منشورة، مش تقييم طبي. لو عندك مرض قلب أو ضغط أو إصابة، استشر دكتورك قبل أي اختبار مجهود أقصى.', 'Results are estimates from published formulas, not a medical assessment. If you have a heart, blood-pressure or injury issue, ask your doctor before a maximal-effort test.')) + '</div><div class="ap-note">' + esc(L('تصنيفات VO2max من جداول Cooper Institute (20-79 سنة)، وتصنيف الضغط من جدول منشور مبني على ACSM. بتتحسب من النوع والسن في ملفك الشخصي، وهي إرشادية فقط.', 'VO2max ratings use Cooper Institute norms (ages 20-79); push-up ratings use a published ACSM-based table. They use the sex and age in your profile and are indicative only.')) + '</div>';
    return h + histHtml();
  }
  function readyHtml(t) {
    const pr = c.plus().profile || {};
    let h = '<button type="button" class="ap-back" id="tt-back">' + esc(L('رجوع', 'Back')) + '</button><div class="ap-sec"><b>' + esc(L(t.ar, t.en)) + '</b></div><div class="ap-card">' + p(L(t.ar2, t.en2));
    let go = true;
    if (t.type === 'beep') h += p(L('علّم خطين على بعد 20 متر. أول ما تسمع الصافرة اجري للخط التاني، وكل صافرة بعدها وصّل الخط قبل الصافرة أو معاها. لو فاتك الخط مرتين ورا بعض وقّف واضغط "وقفت".', 'Mark two lines 20 m apart. On each beep be at the opposite line. When you miss it twice in a row, stop and tap "I stopped".')) + inp('tt-age', L('سنك', 'Your age'), pr.age || 28, 80, 1);
    else if (t.type === 'yoyo1' || t.type === 'yoyo2') h += p(L('علّم خطين على بعد 20 متر، وخط راحة على بعد 5 متر ورا خط البداية. اجري 20 م وارجع (40 م) مع الصافرات، وبعدها امشي أو هرول 10 ثواني في منطقة الراحة. لو فاتك الخط مرتين وقّف واضغط "وقفت" (الشوط اللي وقفت فيه مش بيتحسب).', 'Mark two lines 20 m apart plus a recovery line 5 m behind the start. Run 20 m and back (40 m) on the beeps, then walk/jog 10 s in the recovery zone. If you miss the line twice, stop and tap "I stopped" (the shuttle you stopped in does not count).'));
    else if (t.type === 'ift') h += p(L('علّم خطين على بعد 40 متر. اجري ذهاب وإياب مع الصافرات 30 ثانية (صافرة عند كل عبور) ثم امشي 15 ثانية، والسرعة بتزيد كل مرحلة. لما ما تقدرش تلحق وقّف واضغط "وقفت". النتيجة سرعة آخر مرحلة كملتها.', 'Mark two lines 40 m apart. Shuttle on the beeps for 30 s (a beep at each crossing), then walk 15 s; speed rises each stage. When you can\'t keep up, tap "I stopped". Result = speed of the last stage you completed.')) + inp('tt-age', L('سنك (لتقدير VO2max)', 'Age (for the VO2max estimate)'), pr.age || 28, 80, 1) + inp('tt-wt', L('وزنك كجم (اختياري)', 'Weight in kg (optional)'), '', 80) + '<label class="ap-p">' + esc(L('النوع', 'Sex')) + ' <select id="tt-sex"><option value="1">' + esc(L('رجل', 'Male')) + '</option><option value="2">' + esc(L('سيدة', 'Female')) + '</option></select></label>';
    else if (t.type === 'count') h += p(L('عدّ تنازلي 5 ثواني، وبعدها ' + mmss(t.secs) + ' وتنتهي بصافرة. بعدها سجّل العدد.', 'A 5-second countdown, then ' + mmss(t.secs) + ' ending with a beep. Then enter your count.'));
    else if (t.type === 'dist') h += p(L('محتاج مضمار أو مكان تقيس منه المسافة. التايمر بيصفّر كل دقيقة وعند النهاية.', 'You need a track or a way to measure distance. The timer announces each minute and the end.'));
    else if (t.type === 'watch') h += '<hr style="opacity:.2"><p class="ap-p mu">' + esc(L('أو لو اتوقّت بساعة تانية، اكتب الزمن (دقيقة:ثانية أو ثواني):', 'Or if you timed it elsewhere, enter the time (mm:ss or seconds):')) + '</p><input id="tt-man" type="text" inputmode="decimal" placeholder="' + (t.u === 's' ? '12:30' : '12.5') + '" style="width:110px"> <button type="button" class="ap-btn small ghost" id="tt-mansave">' + esc(L('احفظ الزمن', 'Save time')) + '</button>';
    else if (t.type === 'val') { go = false; h += inp('tt-valman', fvUnit(t), '', 120) + '<div class="ap-actions"><button type="button" class="ap-btn" id="tt-valsave">' + esc(L('احفظ', 'Save')) + '</button></div>'; }
    else if (t.type === 'calc') { go = false; h += t.inputs.map((q) => inp('tt-in-' + q[0], L(q[1], q[2]), (t.k === 'rock' && q[0] === 'a' && pr.age) ? pr.age : q[3], 100)).join('') + '<div class="ap-actions"><button type="button" class="ap-btn" id="tt-calc">' + esc(L('احسب', 'Calculate')) + '</button></div>'; }
    if (go) h += '<div class="ap-actions"><button type="button" class="ap-btn" id="tt-start">' + esc(L('ابدأ', 'Start')) + '</button></div>';
    return h + '</div>';
  }
  const fvUnit = (t) => ({ cm: L('الرقم بالسنتيمتر', 'Value in cm'), kg: L('الوزن بالكيلو', 'Weight in kg'), m: L('المسافة بالمتر', 'Distance in metres'), rep: L('العدد', 'Count') }[t.u] || L('النتيجة', 'Result'));
  function viewTests(body) {
    const t = byK(S.k);
    let h = '';
    if (!t || S.phase === 'menu') h = menuHtml();
    else if (S.phase === 'ready') h = readyHtml(t);
    else if (S.phase === 'run') {
      const stoppable = t.type === 'beep' || t.type === 'yoyo1' || t.type === 'yoyo2' || t.type === 'ift';
      h += '<div class="ap-sec"><b>' + esc(L(t.ar, t.en)) + '</b></div>' + live('<div class="ap-actions" style="justify-content:center">' + (stoppable ? '<button type="button" class="ap-btn" id="tt-stopbeep">' + esc(L('وقفت', 'I stopped')) + '</button>' : (S.mode === 'up' ? '<button type="button" class="ap-btn" id="tt-stopwatch">' + esc(L('وقّف', 'Stop')) + '</button>' : '')) + '<button type="button" class="ap-btn ghost danger" id="tt-cancel">' + esc(L('إلغاء', 'Cancel')) + '</button></div>');
    } else if (S.phase === 'enter') {
      h += '<div class="ap-sec"><b>' + esc(L(t.ar, t.en)) + '</b></div><div class="ap-card">' + p(L('الوقت خلص. سجّل نتيجتك:', 'Time is up. Enter your result:')) + inp('tt-val', fvUnit(t), '', 120, 1) + '<div class="ap-actions"><button type="button" class="ap-btn" id="tt-save">' + esc(L('احفظ', 'Save')) + '</button><button type="button" class="ap-btn ghost" id="tt-cancel">' + esc(L('إلغاء', 'Cancel')) + '</button></div></div>';
    } else if (S.phase === 'result') {
      const r = S.res || {}; if (r.entry && r.rating === undefined) r.rating = rate(r.entry);
      h += '<div class="ap-sec"><b>' + esc(L(t.ar, t.en)) + '</b></div><div class="ap-card"><p class="ap-p"><b>' + esc(r.line || '') + '</b></p>' + (r.x ? p(L('تقدير VO2max ≈ ', 'Estimated VO2max ≈ ') + r.x + ' ml/kg/min') : '') + (r.rating ? '<p class="ap-p"><b>' + esc(r.rating) + '</b></p>' : '') + (r.more ? p(r.more) : '') + '<div class="ap-actions">' + (r.entry ? '<button type="button" class="ap-btn" id="tt-save">' + esc(L('احفظ النتيجة', 'Save result')) + '</button>' : '') + '<button type="button" class="ap-btn ghost" id="tt-cancel">' + esc(r.entry ? L('متحفظش', 'Discard') : L('رجوع', 'Back')) + '</button></div></div>';
    }
    body.innerHTML = h;
    wire(body);
  }
  function doCalc(t, q) {
    const g = (id) => Number((q('#tt-in-' + id) || {}).value);
    if (t.k === 'rm1') {
      const w = g('w'), r = g('r'); if (!(w > 0) || !(r >= 1 && r <= 10)) { c.toast(L('الوزن والتكرارات (1-10)', 'Enter weight and reps (1-10)')); return; }
      const ep = Math.round(w * (1 + r / 30) * 10) / 10, br = Math.round(w * 36 / (37 - r) * 10) / 10;
      S.res = { line: '1RM ≈ ' + ep + ' kg (Epley)', more: 'Brzycki ≈ ' + br + ' kg. ' + L('تقدير فقط، ومتجربش أقصى وزن من غير مراقب.', 'An estimate only; don\'t test a true max without a spotter.'), entry: { k: t.k, v: ep } };
    } else if (t.k === 'css') {
      const a = g('a'), b = g('b'); if (!(a > 0 && b > 0 && a > b)) { c.toast(L('زمن الـ400 لازم يكون أكبر من الـ200', '400 m time must be longer than 200 m time')); return; }
      const sp = 200 / (a - b), pace = Math.round(100 / sp);
      S.res = { line: L('CSS ≈ ', 'CSS ≈ ') + sp.toFixed(2) + ' m/s · ' + mmss(pace) + L(' / 100 م', ' /100 m'), more: L('اسبح تمارين العتبة قريب من الإيقاع ده.', 'Swim threshold sets close to this pace.'), entry: { k: t.k, v: pace } };
    } else if (t.k === 'rock') {
      const T = g('t'), hr = g('h'), A = g('a'), W = g('w'), G = g('g') >= 1 ? 1 : 0;
      if (!(T > 0 && hr > 0 && A > 0 && W > 0)) { c.toast(L('اكتب كل الخانات', 'Fill in every field')); return; }
      const v = Math.round((132.853 - 0.0769 * W * 2.20462 - 0.3877 * A + 6.315 * G - 3.2649 * T - 0.1565 * hr) * 10) / 10;
      S.res = { line: 'VO2max ≈ ' + v + ' ml/kg/min', entry: { k: t.k, v: v } };
    }
    S.phase = 'result'; c.draw();
  }
  function wire(body) {
    const q = (s) => body.querySelector(s);
    body.querySelectorAll('[data-tcat]').forEach((b) => b.addEventListener('click', () => { UI.cat = b.dataset.tcat; c.draw(); }));
    body.querySelectorAll('[data-tpick]').forEach((b) => b.addEventListener('click', () => { stopAll(); S = { k: b.dataset.tpick, phase: 'ready' }; c.draw(); }));
    body.querySelectorAll('[data-tdel]').forEach((b) => b.addEventListener('click', () => { const [d, k, v] = b.dataset.tdel.split('|'); const h = hist(); const i = h.findIndex((e) => e.d === d && e.k === k && String(e.v) === v); if (i >= 0) { h.splice(i, 1); c.persist(); c.draw(); } }));
    const ca = q('#tt-cadd'); if (ca) ca.addEventListener('click', () => {
      const name = ((q('#tt-cname') || {}).value || '').trim(); if (!name) { c.toast(L('اكتب اسم الاختبار', 'Enter a test name')); return; }
      customs().push({ k: 'c_' + Date.now().toString(36), name: name.slice(0, 40), unit: ((q('#tt-cunit') || {}).value || '').trim().slice(0, 12), hi: (q('#tt-chi') || {}).value !== '0' });
      c.persist(); c.toast(L('اتضاف', 'Added')); c.draw();
    });
    body.querySelectorAll('[data-cdel]').forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.cdel; const l = customs(); const i = l.findIndex((x) => x.k === k);
      if (i >= 0) { l.splice(i, 1); const h = hist(); for (let j = h.length - 1; j >= 0; j--) if (h[j].k === k) h.splice(j, 1); c.persist(); c.draw(); }
    }));
    const back = q('#tt-back'); if (back) back.addEventListener('click', () => { stop(); c.draw(); });
    const cancel = q('#tt-cancel'); if (cancel) cancel.addEventListener('click', () => { stop(); c.draw(); });
    const t = byK(S.k);
    const st = q('#tt-start'); if (st && t) st.addEventListener('click', () => {
      try { c.tone(1, 1); } catch (e) { /* unlock audio on tap */ }
      if (t.type === 'beep') { S.age = Number((q('#tt-age') || {}).value) || 28; startBeep(); }
      else if (t.type === 'yoyo1' || t.type === 'yoyo2') startShuttle(t.type);
      else if (t.type === 'ift') { const wv = Number((q('#tt-wt') || {}).value); S.prof = { a: Number((q('#tt-age') || {}).value) || 0, w: wv > 0 ? wv : 0, g: Number((q('#tt-sex') || {}).value) === 2 ? 2 : 1 }; startShuttle('ift'); }
      else if (t.type === 'count' || t.type === 'dist') startCountdown(t.secs, { minuteBeep: t.secs >= 120 });
      else startWatch(t.dec || 0);
    });
    const sb = q('#tt-stopbeep'); if (sb && t) sb.addEventListener('click', () => { if (t.type === 'beep') finishBeep(0); else finishShuttle(); });
    const sw = q('#tt-stopwatch'); if (sw) sw.addEventListener('click', stopWatch);
    const ms = q('#tt-mansave'); if (ms && t) ms.addEventListener('click', () => { const v = parseTime((q('#tt-man') || {}).value); if (!(v > 0)) { c.toast(L('اكتب الزمن', 'Enter the time')); return; } showTimed(t, Math.round(v * 100) / 100); });
    const vs = q('#tt-valsave'); if (vs && t) vs.addEventListener('click', () => { const raw = (q('#tt-valman') || {}).value; const v = Number(raw); if (raw === '' || !isFinite(v)) { c.toast(L('اكتب رقم', 'Enter a number')); return; } save({ k: t.k, v: v }); c.toast(L('اتحفظت', 'Saved')); stop(); c.draw(); });
    const cc = q('#tt-calc'); if (cc && t) cc.addEventListener('click', () => doCalc(t, q));
    const sv = q('#tt-save'); if (sv && t) sv.addEventListener('click', () => {
      if (S.phase === 'enter') {
        const raw = (q('#tt-val') || {}).value; const v = Number(raw); if (raw === '' || !(v >= 0)) { c.toast(L('اكتب رقم', 'Enter a number')); return; }
        save(t.k === 'cooper' ? { k: t.k, v: v, x: vo2Cooper(v) } : { k: t.k, v: v });
      } else if (S.res && S.res.entry) save(S.res.entry);
      c.toast(L('اتحفظت', 'Saved')); stop(); c.draw();
    });
  }
  return { viewTests: viewTests, stopTests: stop };
}
