/* ADAM art: ten line figures for empty and locked screens.
 * Engine: hairline kernel, MIT License, Copyright (c) 2026 Lucas Marques (see HAIRLINE-LICENSE.txt).
 * Figures: drawn for ADAM on that engine. Loaded on demand, only when a screen that uses one appears. */
/* hairline kernel sha256:346b48bdef2cdfafd5343eba01494255cf75f9c078e6fcd1aafc62bab62980a1 */
/*
 * HL: everything a figure may call. Read this index; the code under it is the
 * package's src/core, unchanged, and a figure should not need to read it.
 *
 * Every figure is drawn in a 400 × 320 viewBox. World space is x/y on the
 * ground and z up. Plates are filled with the ground colour and painted back
 * to front, so a nearer one covers a farther one: append in that order. At
 * the default camera, Cam(45, 0.5, S), +x runs down to the right and +y down
 * to the left, so the corner with the largest x and y is nearest the viewer:
 * append by ascending x + y, from the far corner (smallest x and y) to it.
 *
 * Camera
 *   Cam(azDeg, k, S)                       a camera: azimuth in degrees, k = sin(elevation) (0.5 is the 2:1 view), S = scale
 *   fit(C, points, cx, cy)                 centres the box of [x, y, z] points on (cx, cy); call it once, before proj
 *                                          it only centres, it never scales: choose S by trying values, with the most extreme pose in points.
 *                                          The six figures use S 1.42 to 2.12; the boxes they fit come out 230 to 310 wide and 180 to 245 tall
 *   proj(C)                                returns P(x, y, z), which gives [sx, sy]
 *   unproj(C, sx, sy, z)                   the world [x, y] under a screen point, on the plane at height z
 *   facing(C)                              returns front(sample): whether a ring sample faces the camera
 * Rounded solids
 *   rrect(u0, v0, u1, v1, r, n)            a rounded rectangle, as a ring of samples {u, v, nu, nv}
 *   circ(R, n)                             a circle, as a ring
 *   rings(x0, y0, x1, y1, r, b)            [ring, inner]: a rounded footprint and its crease ring, inset by b
 *                                          r, the corner radius, is cut to half the shorter side. b, the crease's inset in world units
 *                                          (0.6 to 2.2 in the figures), must stay under half the shorter side or the crease turns inside out
 *   prism(P, front, ring, inner, z0, z1)   {sil, crease}: a solid standing from z0 to z1, as two path strings
 *   ringAt(P, ring, z)                     the ring's points, projected at height z
 *   run(ring, keep)                        the one cyclic run of samples that pass keep
 *   hull(points)                           the convex hull of screen points
 *   extremes(P, ring)                      [left, right, nearest] samples: where dashed drops fall from
 *   fillet(points, radii, n)               rounds every vertex of a closed polygon; returns the new points
 *                                          radii is an array, one radius per vertex, each cut to half its shorter edge; a single number gives NaN.
 *                                          n is the steps round each corner, default 4: each vertex becomes n + 1 points
 *   ghost(P, front, ring, z0, depth)       a reflection's path {d, y0, y1}; reflect() draws it for you
 * Paths and numbers
 *   poly(points)                           a closed path string
 *   open(points)                           an open polyline string
 *   seg(a, b)                              one segment between two screen points [sx, sy], as its own subpath; project world points with P first
 *   clamp(v, a, b)
 *   lerp(a, b, t)
 *   rad(deg)
 *   r2(n)                                  two decimals
 * The continuous clock: one spring per moving number
 *   spring(x, opts)                        at rest on x; write .t to retarget; opts {k, c, m, eps}, default k 100, c 18, m 1
 *   stepS(sp, dt)                          advances by dt seconds; returns whether it is still moving
 * The discrete clock: a 700ms tween on (.32, .72, 0, 1)
 *   tween(v, dur)                          at rest on v; dur defaults to 700 (ms)
 *   tset(tw, to, now, delay)               retargets from where it is, after delay ms: the stagger
 *                                          the same target again does nothing, so calling it on every pointer move is safe
 *   tval(tw, now)                          its value at now
 *   tdone(tw, now)                         whether it has landed
 *   bezier(x1, y1, x2, y2)                 a CSS cubic-bezier, as a function of progress
 *   EASE_LIFT                              the lift curve itself
 *   reducedMotion()                        true when the reader asked for less motion; springs and tweens already land at once
 *   setReducedMotion(on)                   the loop's business, not a figure's
 * Drawing
 *   mk(tag, attrs, parent)                 one svg element: the only way a figure makes a node
 *   solid(parent)                          {g, sil, cr}: a group holding a silhouette path and a crease path
 *   put(solid, paths)                      writes prism()'s {sil, crease} into solid()'s {sil, cr}: sil into sil, crease into cr
 *   flatDot(parent, C, r, cls)             a dot lying on the ground plane; cls is "dot", "dot m" or "dot off"
 *   place(el, point)                       moves a dot or a circle to [sx, sy]
 *   reflect(svg, parent, P, front, ring, z0, depth)   a fading mirror under a solid
 *   fade(svg, y0, y1, a0)                  a vertical fade, as a mask; returns the value for a mask attribute
 * Life
 *   register(stage, tick)                  joins the one frame loop; tick(dt in seconds, now in ms) returns true to ask for another frame; gives {wake, unregister}
 *   pointer(stage, handlers)               {move(point), down(point), leave()}, points in viewBox units; returns its disposer
 *   disposer()                             {add, on, dispose}: collects tear-down, so destroy is bag.dispose
 * The bench's business, not a figure's
 *   css(lightDark)
 *   inject(root)
 *   tour(stage, stops, onStop)             an unseen pointer that walks the stops, [x, y] in viewBox units or null to leave, and gives way to a real one; onStop(i) on each arrival; returns {stop}
 *   LAP                                    the default stops: a diamond around the centre, then a leave
 *
 * Classes, on path, polygon, ellipse and line. They are the whole palette; a
 * figure sets no colour, width or fill of its own.
 *     (none)   filled with the ground colour, medium stroke
 *     sil      the silhouette's stroke        hi    the bright stroke: the only highlight
 *     lo       the dim stroke                 nf    no fill        fo   fill only, no stroke
 *     dash     a dashed guide
 *     dot      a bright dot                   dot m   a medium dot     dot off   a dim dot
 */
var HL = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/hairline/src/core/kernel.ts
  var kernel_exports = {};
  __export(kernel_exports, {
    Cam: () => Cam,
    EASE_LIFT: () => EASE_LIFT,
    LAP: () => LAP,
    bezier: () => bezier,
    circ: () => circ,
    clamp: () => clamp,
    css: () => css,
    disposer: () => disposer,
    extremes: () => extremes,
    facing: () => facing,
    fade: () => fade,
    fillet: () => fillet,
    fit: () => fit,
    flatDot: () => flatDot,
    ghost: () => ghost,
    hull: () => hull,
    inject: () => inject,
    lerp: () => lerp,
    mk: () => mk,
    open: () => open,
    place: () => place,
    pointer: () => pointer,
    poly: () => poly,
    prism: () => prism,
    proj: () => proj,
    put: () => put,
    r2: () => r2,
    rad: () => rad,
    reducedMotion: () => reducedMotion,
    reflect: () => reflect,
    register: () => register,
    ringAt: () => ringAt,
    rings: () => rings,
    rrect: () => rrect,
    run: () => run,
    seg: () => seg,
    setReducedMotion: () => setReducedMotion,
    solid: () => solid,
    spring: () => spring,
    stepS: () => stepS,
    tdone: () => tdone,
    tour: () => tour,
    tset: () => tset,
    tval: () => tval,
    tween: () => tween,
    unproj: () => unproj
  });

  // packages/hairline/src/core/iso.ts
  var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  var lerp = (a, b, t) => a + (b - a) * t;
  var rad = (d) => d * Math.PI / 180;
  var r2 = (n) => Math.round(n * 100) / 100;
  var poly = (pts) => "M" + pts.map((p) => r2(p[0]) + " " + r2(p[1])).join("L") + "Z";
  var seg = (a, b) => `M${r2(a[0])} ${r2(a[1])}L${r2(b[0])} ${r2(b[1])}`;
  var open = (pts) => pts.length < 2 ? "" : "M" + pts.map((p) => r2(p[0]) + " " + r2(p[1])).join("L");
  var Cam = (azDeg, k, S) => ({ az: rad(azDeg), k, S, ox: 0, oy: 0 });
  function proj(C) {
    const c = Math.cos(C.az), s = Math.sin(C.az), zf = Math.sqrt(1 - C.k * C.k);
    return (x, y, z) => {
      const X = x * c - y * s, Y = x * s + y * c;
      return [C.ox + C.S * X, C.oy + C.S * (Y * C.k - z * zf)];
    };
  }
  function unproj(C, sx, sy, z) {
    const c = Math.cos(C.az), s = Math.sin(C.az), zf = Math.sqrt(1 - C.k * C.k);
    const X = (sx - C.ox) / C.S, Y = ((sy - C.oy) / C.S + z * zf) / C.k;
    return [X * c + Y * s, -X * s + Y * c];
  }
  function fit(C, pts, cx, cy) {
    C.ox = 0;
    C.oy = 0;
    const P = proj(C);
    let a = 1e9, b = -1e9, c = 1e9, d = -1e9;
    for (const p of pts) {
      const q = P(p[0], p[1], p[2]);
      a = Math.min(a, q[0]);
      b = Math.max(b, q[0]);
      c = Math.min(c, q[1]);
      d = Math.max(d, q[1]);
    }
    C.ox = cx - (a + b) / 2;
    C.oy = cy - (c + d) / 2;
  }
  function rrect(u0, v0, u1, v1, r, n = 4) {
    r = Math.max(0, Math.min(r, (u1 - u0) / 2, (v1 - v0) / 2));
    const out = [];
    for (const [cu, cv, a0] of [[u1 - r, v1 - r, 0], [u0 + r, v1 - r, 90], [u0 + r, v0 + r, 180], [u1 - r, v0 + r, 270]])
      for (let k = 0; k <= n; k++) {
        const a = rad(a0 + 90 * k / n), ca = Math.cos(a), sa = Math.sin(a);
        out.push({ u: cu + r * ca, v: cv + r * sa, nu: ca, nv: sa });
      }
    return out;
  }
  function circ(R, n = 96) {
    const out = [];
    for (let k = 0; k < n; k++) {
      const a = k / n * Math.PI * 2, ca = Math.cos(a), sa = Math.sin(a);
      out.push({ u: R * ca, v: R * sa, nu: ca, nv: sa });
    }
    return out;
  }
  function hull(input) {
    const pts = input.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const x = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const p of pts) {
      while (lo.length > 1 && x(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop();
      lo.push(p);
    }
    for (let i = pts.length - 1; i >= 0; i--) {
      const p = pts[i];
      while (up.length > 1 && x(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop();
      up.push(p);
    }
    lo.pop();
    up.pop();
    return lo.concat(up);
  }
  var ringAt = (P, ring, z) => ring.map((q) => P(q.u, q.v, z));
  var facing = (C) => {
    const s = Math.sin(C.az), c = Math.cos(C.az);
    return (q) => q.nu * s + q.nv * c >= -1e-6;
  };
  function run(ring, keep) {
    const n = ring.length;
    let s = -1;
    for (let i = 0; i < n; i++) if (keep(ring[i]) && !keep(ring[(i + n - 1) % n])) {
      s = i;
      break;
    }
    if (s < 0) return keep(ring[0]) ? ring.slice() : [];
    const out = [];
    for (let k = 0; k < n && keep(ring[(s + k) % n]); k++) out.push(ring[(s + k) % n]);
    return out;
  }
  function prism(P, front, ring, inner, z0, z1) {
    return {
      sil: poly(hull(ringAt(P, ring, z1).concat(ringAt(P, ring, z0)))),
      crease: inner ? open(ringAt(P, run(inner, front), z1)) : ""
    };
  }
  var rings = (x0, y0, x1, y1, r, b) => [
    rrect(x0, y0, x1, y1, r),
    rrect(x0 + b, y0 + b, x1 - b, y1 - b, Math.max(0.3, r - b))
  ];
  function extremes(P, ring) {
    const pr = ring.map((q) => P(q.u, q.v, 0));
    let a = 0, b = 0, c = 0;
    pr.forEach((p, k) => {
      if (p[0] < pr[a][0]) a = k;
      if (p[0] > pr[b][0]) b = k;
      if (p[1] > pr[c][1]) c = k;
    });
    return [ring[a], ring[b], ring[c]];
  }
  function fillet(pts, rs, n = 4) {
    const m = pts.length, out = [];
    for (let i = 0; i < m; i++) {
      const a = pts[(i + m - 1) % m], p = pts[i], b = pts[(i + 1) % m];
      const la = Math.hypot(a[0] - p[0], a[1] - p[1]), lb = Math.hypot(b[0] - p[0], b[1] - p[1]);
      const t = Math.min(rs[i], la / 2, lb / 2);
      const p1 = [p[0] + (a[0] - p[0]) / la * t, p[1] + (a[1] - p[1]) / la * t];
      const p2 = [p[0] + (b[0] - p[0]) / lb * t, p[1] + (b[1] - p[1]) / lb * t];
      for (let k = 0; k <= n; k++) {
        const s = k / n, w = 1 - s;
        out.push([w * w * p1[0] + 2 * w * s * p[0] + s * s * p2[0], w * w * p1[1] + 2 * w * s * p[1] + s * s * p2[1]]);
      }
    }
    return out;
  }
  function ghost(P, front, ring, z0, depth) {
    const f = run(ring, front), lowP = ringAt(P, f, z0 - depth);
    return {
      d: open(lowP) + [f[0], f[f.length - 1]].map((q) => seg(P(q.u, q.v, z0), P(q.u, q.v, z0 - depth))).join(""),
      y0: Math.min(...ringAt(P, f, z0).map((p) => p[1])),
      y1: Math.max(...lowP.map((p) => p[1])) + 2
    };
  }

  // packages/hairline/src/core/motion.ts
  var reduced = false;
  var setReducedMotion = (on) => {
    reduced = on;
  };
  var reducedMotion = () => reduced;
  function spring(x, o = {}) {
    return { x, v: 0, t: x, k: o.k ?? 100, c: o.c ?? 18, m: o.m ?? 1, eps: o.eps ?? 0.01 };
  }
  function stepS(sp, dt) {
    if (reduced) {
      sp.x = sp.t;
      sp.v = 0;
      return false;
    }
    const n = Math.max(1, Math.ceil(dt * 240)), h = dt / n;
    for (let i = 0; i < n; i++) {
      const a = (-sp.k * (sp.x - sp.t) - sp.c * sp.v) / sp.m;
      sp.v += a * h;
      sp.x += sp.v * h;
    }
    if (Math.abs(sp.x - sp.t) < sp.eps && Math.abs(sp.v) < sp.eps * 10) {
      sp.x = sp.t;
      sp.v = 0;
      return false;
    }
    return true;
  }
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const X = (u) => ((ax * u + bx) * u + cx) * u;
    const Y = (u) => ((ay * u + by) * u + cy) * u;
    const dX = (u) => (3 * ax * u + 2 * bx) * u + cx;
    return (t) => {
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      let u = t;
      for (let i = 0; i < 8; i++) {
        const e = X(u) - t;
        if (Math.abs(e) < 1e-5) break;
        const d = dX(u);
        if (Math.abs(d) < 1e-6) break;
        u -= e / d;
      }
      if (!(u >= 0 && u <= 1) || Math.abs(X(u) - t) > 1e-4) {
        let lo = 0, hi = 1;
        u = t;
        for (let i = 0; i < 24; i++) {
          if (X(u) < t) lo = u;
          else hi = u;
          u = (lo + hi) / 2;
        }
      }
      return Y(u);
    };
  }
  var EASE_LIFT = bezier(0.32, 0.72, 0, 1);
  var tween = (v, dur = 700) => ({ from: v, to: v, t0: -1e9, dur });
  var tval = (tw, now) => {
    const p = clamp((now - tw.t0) / tw.dur, 0, 1);
    return tw.from + (tw.to - tw.from) * (reduced ? 1 : EASE_LIFT(p));
  };
  var tset = (tw, to, now, delay) => {
    if (tw.to === to) return;
    tw.from = tval(tw, now);
    tw.to = to;
    tw.t0 = now + delay;
  };
  var tdone = (tw, now) => reduced || now >= tw.t0 + tw.dur;

  // packages/hairline/src/core/stage.ts
  var NS = "http://www.w3.org/2000/svg";
  function mk(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    if (parent) parent.appendChild(e);
    return e;
  }
  function solid(parent) {
    const g = mk("g", {}, parent);
    return { g, sil: mk("path", { class: "sil" }, g), cr: mk("path", { class: "nf lo" }, g) };
  }
  var put = (el, s) => {
    el.sil.setAttribute("d", s.sil);
    el.cr.setAttribute("d", s.crease);
  };
  var flatDot = (parent, C, r, cls) => mk("ellipse", { rx: r2(r * C.S), ry: r2(r * C.S * C.k), class: cls }, parent);
  var place = (el, q) => {
    el.setAttribute("cx", String(r2(q[0])));
    el.setAttribute("cy", String(r2(q[1])));
  };
  var fid = 0;
  function fade(svg, y0, y1, a0 = 0.7) {
    const id = "hl-fd" + ++fid, defs = mk("defs", {}, svg);
    const lg = mk("linearGradient", { id: id + "g", gradientUnits: "userSpaceOnUse", x1: 0, y1: r2(y0), x2: 0, y2: r2(y1) }, defs);
    mk("stop", { offset: 0, "stop-color": "#fff", "stop-opacity": a0 }, lg);
    mk("stop", { offset: 1, "stop-color": "#fff", "stop-opacity": 0 }, lg);
    const m = mk("mask", { id, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: 400, height: 320 }, defs);
    mk("rect", { x: 0, y: 0, width: 400, height: 320, fill: `url(#${id}g)` }, m);
    return `url(#${id})`;
  }
  function reflect(svg, parent, P, front, ring, z0, depth) {
    const r = ghost(P, front, ring, z0, depth);
    const gh = mk("g", { class: "ghost", mask: fade(svg, r.y0, r.y1) }, parent);
    mk("path", { d: r.d }, gh);
  }
  var boards = [];
  var byStage = /* @__PURE__ */ new Map();
  var raf = 0;
  var last = 0;
  var io = null;
  var rm = null;
  function frame() {
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1e3));
    last = now;
    let any = false;
    for (const b of boards.slice()) if (b.vis && b.awake) {
      try {
        b.awake = !!b.tick(dt, now);
      } catch (err) {
        b.awake = false;
        setTimeout(() => {
          throw err;
        });
      }
      any = any || b.awake;
    }
    raf = any ? requestAnimationFrame(frame) : 0;
  }
  function wake(b) {
    b.awake = true;
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  var onMotion = () => {
    setReducedMotion(!!rm?.matches);
    boards.forEach(wake);
  };
  function start() {
    if (io) return;
    io = new IntersectionObserver((es) => {
      for (const e of es) {
        const set = byStage.get(e.target);
        if (!set) continue;
        for (const b of set) {
          b.vis = e.isIntersecting;
          if (b.vis) wake(b);
        }
      }
    }, { rootMargin: "80px" });
    rm = matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(rm.matches);
    rm.addEventListener("change", onMotion);
  }
  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    io?.disconnect();
    io = null;
    rm?.removeEventListener("change", onMotion);
    rm = null;
  }
  function register(stage, tick) {
    start();
    const b = { stage, tick, vis: false, awake: true };
    boards.push(b);
    const peers = byStage.get(stage);
    if (peers) {
      for (const p of peers) b.vis = p.vis;
      peers.add(b);
      if (b.vis) wake(b);
    } else {
      byStage.set(stage, /* @__PURE__ */ new Set([b]));
      io.observe(stage);
    }
    tick(0, performance.now());
    let gone = false;
    return {
      wake: () => {
        if (!gone) wake(b);
      },
      unregister: () => {
        if (gone) return;
        gone = true;
        boards = boards.filter((x) => x !== b);
        const set = byStage.get(stage);
        if (set) {
          set.delete(b);
          if (!set.size) {
            byStage.delete(stage);
            io?.unobserve(stage);
          }
        }
        if (!boards.length) stop();
      }
    };
  }
  var handlers = /* @__PURE__ */ new WeakMap();
  var touring = /* @__PURE__ */ new WeakMap();
  function pointer(stage, on) {
    handlers.set(stage, on);
    let tm = 0;
    const pt = (e) => {
      const r = stage.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width * 400, (e.clientY - r.top) / r.height * 320];
    };
    const move = (e) => {
      clearTimeout(tm);
      touring.get(stage)?.hold();
      on.move(pt(e), e);
    };
    const down = (e) => {
      clearTimeout(tm);
      touring.get(stage)?.hold();
      if (e.pointerType !== "mouse") stage.releasePointerCapture?.(e.pointerId);
      if (on.down) on.down(pt(e), e);
      else on.move(pt(e), e);
    };
    const leave = (e) => {
      clearTimeout(tm);
      tm = window.setTimeout(() => {
        on.leave(e);
        touring.get(stage)?.release();
      }, e.pointerType === "mouse" ? 0 : 1400);
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerdown", down);
    stage.addEventListener("pointerleave", leave);
    return () => {
      clearTimeout(tm);
      if (handlers.get(stage) === on) handlers.delete(stage);
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerdown", down);
      stage.removeEventListener("pointerleave", leave);
    };
  }
  var LAP = [[128, 150], [200, 118], [272, 150], [200, 206], null];
  var TRAVEL = 900;
  var DWELL = 1200;
  var REST = 1800;
  var RESUME = 1200;
  var STAGGER = 450;
  var GHOST = { pointerType: "ghost" };
  var started = 0;
  function entry([x, y]) {
    const dx = x - 200, dy = y - 160;
    if (!dx && !dy) return [200, 320];
    const k = Math.min(dx ? (dx > 0 ? 200 : -200) / dx : Infinity, dy ? (dy > 0 ? 160 : -160) / dy : Infinity);
    return [200 + dx * k, 160 + dy * k];
  }
  function tour(stage, stops, onStop) {
    let i = 0;
    let wait = RESUME + STAGGER * (started++ % 4);
    let t = -1;
    let at = null;
    let origin = [200, 320];
    let hand = false, keys = stage.contains(stage.ownerDocument.activeElement);
    let gone = false;
    const leave = () => {
      at = null;
      t = -1;
      handlers.get(stage)?.leave(GHOST);
    };
    const tick = (dt) => {
      if (hand || keys || !stops.length) return false;
      if (reducedMotion()) {
        if (at) leave();
        return false;
      }
      if (wait > 0) {
        wait -= dt * 1e3;
        return true;
      }
      const stop2 = stops[i];
      if (stop2 === null) {
        if (at) leave();
        onStop?.(i);
        i = (i + 1) % stops.length;
        wait = REST;
        return true;
      }
      const h = handlers.get(stage);
      if (!h) return true;
      if (t < 0) {
        origin = at ?? entry(stop2);
        t = 0;
      }
      t = Math.min(TRAVEL, t + dt * 1e3);
      const k = EASE_LIFT(t / TRAVEL);
      at = [origin[0] + (stop2[0] - origin[0]) * k, origin[1] + (stop2[1] - origin[1]) * k];
      h.move(at, GHOST);
      if (t < TRAVEL) return true;
      onStop?.(i);
      i = (i + 1) % stops.length;
      t = -1;
      wait = DWELL;
      return true;
    };
    const take = () => {
      at = null;
      t = -1;
    };
    const give = () => {
      if (hand || keys) return;
      i = 0;
      t = -1;
      wait = RESUME;
      board.wake();
    };
    const me = {
      hold: () => {
        hand = true;
        take();
      },
      release: () => {
        if (!hand) return;
        hand = false;
        give();
      }
    };
    const focusIn = () => {
      keys = true;
      take();
    };
    const focusOut = (e) => {
      if (keys && !stage.contains(e.relatedTarget)) {
        keys = false;
        give();
      }
    };
    stage.addEventListener("focusin", focusIn);
    stage.addEventListener("focusout", focusOut);
    touring.set(stage, me);
    const board = register(stage, tick);
    return {
      stop: () => {
        if (gone) return;
        gone = true;
        board.unregister();
        stage.removeEventListener("focusin", focusIn);
        stage.removeEventListener("focusout", focusOut);
        if (touring.get(stage) === me) touring.delete(stage);
        if (at) leave();
      }
    };
  }
  function disposer() {
    let fns = [];
    return {
      add: (fn) => {
        fns.push(fn);
      },
      on: (target, type, fn, opts) => {
        const h = fn;
        target.addEventListener(type, h, opts);
        fns.push(() => target.removeEventListener(type, h, opts));
      },
      dispose: () => {
        const run2 = fns;
        fns = [];
        for (let i = run2.length - 1; i >= 0; i--) run2[i]();
      }
    };
  }

  // packages/hairline/src/core/styles.ts
  var LIGHT = { plate: "#ffffff", hi: "#232327", edge: "#a4a4ac", mid: "#c3c3c9", lo: "#e0e0e4" };
  var DARK = { plate: "#08090a", hi: "#d0d6e0", edge: "#5b5d64", mid: "#3e3e44", lo: "#29292d" };
  var KEYS = ["plate", "hi", "edge", "mid", "lo"];
  var vars = (p) => KEYS.map((k) => `--hl-${k}:var(--hairline-${k},${p[k]});`).join("");
  var EASE = "cubic-bezier(0.5,0,0.1,1)";
  var SVG = ":where([data-hairline]>svg)";
  function css(lightDark) {
    const both = Object.fromEntries(KEYS.map((k) => [k, `light-dark(${LIGHT[k]},${DARK[k]})`]));
    return [
      // the box, and the palette: light unless something below says otherwise
      `:where([data-hairline]){display:block;position:relative;aspect-ratio:5/4;touch-action:pan-y;user-select:none;-webkit-user-select:none;--hl-sw:var(--hairline-stroke,0.9);${vars(LIGHT)}}`,
      // the page's color-scheme
      lightDark ? `:where([data-hairline]){${vars(both)}}` : "",
      // an ancestor that says dark
      `:where(.dark,[data-theme="dark"]) :where([data-hairline]){${vars(DARK)}}`,
      // the figure's own theme option
      `:where([data-hairline][data-hairline-theme="light"]){${vars(LIGHT)}}`,
      `:where([data-hairline][data-hairline-theme="dark"]){${vars(DARK)}}`,
      `:where([data-hairline]:focus-visible){outline:1.5px solid var(--hl-hi);outline-offset:2px}`,
      `${SVG}{position:absolute;inset:0;width:100%;height:100%;display:block}`,
      // Riffle's live region: read, not seen
      `:where([data-hairline]>[data-hairline-live]){position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap}`,
      // the drawing: plates are filled with the plate colour and painted back to front
      `${SVG} :where(path,polygon,ellipse,line){fill:var(--hl-plate);stroke:var(--hl-mid);stroke-width:var(--hl-sw);vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round;transition:stroke 260ms ${EASE}}`,
      `${SVG} :where(.nf){fill:none}`,
      `${SVG} :where(.fo){stroke:none}`,
      `${SVG} :where(.sil){stroke:var(--hl-edge)}`,
      `${SVG} :where(.hi){stroke:var(--hl-hi)}`,
      `${SVG} :where(.lo){stroke:var(--hl-lo)}`,
      `${SVG} :where(.dash){stroke-dasharray:1 3}`,
      `${SVG} :where(.dot){stroke:none;fill:var(--hl-hi);transition:fill 260ms ${EASE}}`,
      `${SVG} :where(.dot.m){fill:var(--hl-edge)}`,
      `${SVG} :where(.dot.off){fill:var(--hl-lo)}`,
      `${SVG} :where(.ghost path){fill:none;stroke:var(--hl-mid)}`
    ].join("");
  }
  var done = /* @__PURE__ */ new WeakSet();
  function inject(root) {
    if (done.has(root)) return;
    done.add(root);
    const doc = root.nodeType === 9 ? root : root.ownerDocument;
    const win = doc.defaultView;
    const text = css(!!win?.CSS?.supports?.("color", "light-dark(#000,#fff)"));
    if (win && "adoptedStyleSheets" in root) {
      try {
        const sheet = new win.CSSStyleSheet();
        sheet.replaceSync(text);
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
        return;
      } catch {
      }
    }
    const style = doc.createElement("style");
    style.setAttribute("data-hairline-style", "");
    style.textContent = text;
    (root.nodeType === 9 ? doc.head ?? doc.documentElement : root).appendChild(style);
  }
  return __toCommonJS(kernel_exports);
})();
/* /hairline kernel */

const SPECS = {};
(function () { const hairline = function (s) { SPECS.barbell = s; };
/**
 * Barbell: a bar on a platform, loaded unevenly (one plate on the left,
 * four on the right). The plate under the pointer lifts and glows; the ones on
 * either side slide away from it, staggered outwards, opening gaps on the bar.
 * The read-out is the plate's weight.
 *
 * The pattern: discrete items along a line. Tweens, a stagger by distance, and
 * a hit test on the bar's own height plane, in rest positions only.
 */
const {
  Cam, clamp, fit, hull, poly, proj, rings, prism, solid, put, tdone, tset, tval, tween,
  disposer, mk, pointer, register,
} = HL;

const HC = 22, GAP = 1.6, INNER = 40, BAR_R = 1.7, END = 92, SPREAD = 8, LIFT = 6;
const LEFT = [{ R: 22, t: 5, kg: 20 }];
const RIGHT = [{ R: 22, t: 5, kg: 20 }, { R: 19, t: 4.4, kg: 15 }, { R: 15, t: 3.8, kg: 10 }, { R: 11, t: 3.2, kg: 5 }];

/** All plates left to right, each with its resting x (its near-face edge, the thick side's end). */
function layout() {
  const out = [];
  let x = -INNER;
  for (const p of LEFT) { out.push({ ...p, x: x - p.t }); x -= p.t + GAP; }
  out.reverse();
  x = INNER;
  for (const p of RIGHT) { out.push({ ...p, x }); x += p.t + GAP; }
  return out;
}

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}

/** n points on a circle in the y-z plane at world x. */
function disc(P, x, r, n = 30) {
  const pts = [];
  for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2; pts.push(P(x, r * Math.cos(a), HC + r * Math.sin(a))); }
  return pts;
}
function circ3(P, x, r, z, n = 30) {
  const pts = [];
  for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2; pts.push(P(x, r * Math.cos(a), z + r * Math.sin(a))); }
  return pts;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let step = value;
  const plates = layout(), N = plates.length;

  const C = Cam(45, 0.5, 2.0);
  fit(C, [[-100, -28, -3], [100, 28, 0], [100, -28, 0], [-100, 28, 0], [-INNER, 0, HC * 2 + LIFT], [INNER + 20, 0, HC * 2 + LIFT]], 200, 170);
  const P = proj(C);

  const g = mk("g", {}, svg);
  // the platform, a low rounded slab that never moves
  const [ring, inner] = rings(-100, -28, 100, 28, 7, 1.6);
  put(solid(g), prism(P, () => true, ring, inner, -3, 0));
  adamMark(P, g, -8, 17, 16);

  const segs = [], els = [];
  for (let i = 0; i <= N; i++) {
    segs.push(mk("path", { class: "sil" }, g));
    if (i < N) {
      const grp = mk("g", {}, g);
      els.push({
        sil: mk("path", { class: "sil" }, grp),
        rim: mk("path", { class: "nf lo" }, grp),
        hub: mk("path", { class: "nf lo" }, grp),
        a: tween(0), z: tween(0), last: "",
      });
    }
  }
  const barL = mk("path", { class: "nf hi" }, g);

  function draw(now) {
    const xs = plates.map((p, i) => {
      const x0 = p.x + tval(els[i].a, now);
      return [x0, x0 + p.t];
    });
    const rod = (x0, x1) => poly(hull([...circ3(P, x0, BAR_R, HC, 12), ...circ3(P, x1, BAR_R, HC, 12)]));
    for (let i = 0; i <= N; i++) {
      const a = i === 0 ? -END : xs[i - 1][1], b = i === N ? END : xs[i][0];
      segs[i].setAttribute("d", b > a ? rod(a, b) : "");
    }
    barL.setAttribute("d", "");
    plates.forEach((p, i) => {
      const e = els[i], [x0, x1] = xs[i], dz = tval(e.z, now);
      const lift = (R) => R * 0 + dz;
      const key = x0.toFixed(2) + dz.toFixed(2);
      if (key === e.last) return;
      e.last = key;
      const rr = (x, r) => circ3(P, x, r, HC + lift(r), 30);
      e.sil.setAttribute("d", poly(hull([...rr(x0, p.R), ...rr(x1, p.R)])));
      e.rim.setAttribute("d", poly(rr(x1, p.R - 1.7)));
      e.hub.setAttribute("d", poly(rr(x1, 3.2)));
    });
  }

  let act = -1;
  const B = register(stage, (_dt, now) => {
    draw(now);
    return els.some((e) => !tdone(e.a, now) || !tdone(e.z, now));
  });
  bag.add(B.unregister);

  /** The plate under the pointer, by the bar's own height plane, tested against resting positions only. */
  function hit(pt) {
    const [x, y] = HL.unproj(C, pt[0], pt[1], HC);
    if (Math.abs(y) > 26 || x < plates[0].x - 3 || x > plates[N - 1].x + plates[N - 1].t + 3) return -1;
    let best = -1, bd = 1e9;
    plates.forEach((p, i) => { const d = Math.abs(x - (p.x + p.t / 2)); if (d < bd) { bd = d; best = i; } });
    return best;
  }

  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    els.forEach((e, i) => {
      const delay = Math.abs(i - from) * step;
      const off = a < 0 ? 0 : i === a ? 0 : i < a ? -SPREAD : SPREAD;
      tset(e.a, off, now, delay);
      tset(e.z, a === i ? LIFT : 0, now, delay);
      e.sil.classList.toggle("hi", i === a);
    });
    segs[1].classList.toggle("hi", a < 0);
    read.textContent = a < 0 ? "rest" : plates[a].kg + " kg";
    B.wake();
  }
  segs[1].classList.add("hi");
  draw(performance.now());

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { step = v; }, destroy: bag.dispose };
}

hairline({
  name: "barbell",
  means: "A loaded barbell: the plate under the pointer lifts, and the plates beside it slide away along the bar.",
  rules: [1, 2, 8, 10],
  range: [0, 40, 90],
  tour: [[150, 190], [200, 175], [260, 160], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.kettlebell = s; };
/**
 * Kettlebell: a cast-iron kettlebell on a low platform. The pointer's x
 * position rocks it about its base on a spring; the read-out is the angle.
 * The pattern: one continuous input on the spring clock, hit test on rest.
 */
const {
  Cam, clamp, fit, hull, open, poly, proj, rings, prism, solid, put, spring, stepS,
  disposer, mk, pointer, register, unproj, rad, r2,
} = HL;

const R = 24, HC = 19, RB = 14.7, REST = 9, BX = -6, BY = -6;

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}


/** The handle as a closed band in the body's own (u, w) plane: an arch with two legs. */
function handleBand() {
  const arch = (cz, r, n) => Array.from({ length: n + 1 }, (_, k) => [r * Math.cos(Math.PI - (k / n) * Math.PI), cz + r * Math.sin(Math.PI - (k / n) * Math.PI)]);
  return [[-21, 34], ...arch(62, 21, 16), [21, 34], [12.5, 34], ...arch(60, 12.5, 12).reverse(), [-12.5, 34]];
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let maxA = value, over = false;

  const C = Cam(45, 0.5, 2.2);
  const ext = [];
  for (const th of [-36, 36]) for (const [u, w] of [[-21, 83], [21, 83], [-R, HC], [R, HC]]) ext.push([BX + u * Math.cos(rad(th)) + w * Math.sin(rad(th)), BY, w * Math.cos(rad(th)) - u * Math.sin(rad(th)) + RB * 0.6]);
  fit(C, [[-52, -42, -3], [52, 42, 0], [52, -42, 0], [-52, 42, 0], ...ext], 200, 166);
  const P = proj(C);

  const g = mk("g", {}, svg);
  const [ring, inner] = rings(-52, -42, 52, 42, 9, 1.6);
  put(solid(g), prism(P, () => true, ring, inner, -3, 0));
  adamMark(P, g, 20, 22, 15);

  const back = mk("path", { class: "lo" }, g), handle = mk("path", { class: "sil" }, g);
  const body = mk("path", { class: "sil" }, g);
  const equator = mk("path", { class: "nf lo" }, g), baseArc = mk("path", { class: "nf lo" }, g);
  const band = handleBand();

  const sp = spring(REST, { eps: 0.02 });
  let drawn = NaN;
  function draw() {
    const th = sp.x;
    if (th === drawn) return;
    drawn = th;
    const c = Math.cos(rad(th)), s = Math.sin(rad(th)), lift = RB * Math.sin(Math.abs(rad(th)));
    const W = (u, v, w) => P(BX + u * c + w * s, BY + v, w * c - u * s + lift);
    const pts = [];
    for (let a = 0; a <= 140; a += 10) for (let f = 0; f < 360; f += 15) {
      const q = rad(a), h = rad(f);
      pts.push(W(R * Math.sin(q) * Math.cos(h), R * Math.sin(q) * Math.sin(h), HC + R * Math.cos(q)));
    }
    for (let f = 0; f < 360; f += 15) pts.push(W(RB * Math.cos(rad(f)), RB * Math.sin(rad(f)), 0));
    body.setAttribute("d", poly(hull(pts)));
    const arc = (rr, w) => open(Array.from({ length: 19 }, (_, k) => { const h = rad(-45 + k * 10); return W(rr * Math.cos(h), rr * Math.sin(h), w); }));
    equator.setAttribute("d", arc(R, HC));
    baseArc.setAttribute("d", arc(RB, 0));
    handle.setAttribute("d", poly(band.map(([u, w]) => W(u, 0, w))));
    back.setAttribute("d", poly(band.map(([u, w]) => W(u, 7, w))));
  }

  const B = register(stage, (dt) => { const m = stepS(sp, dt); draw(); return m; });
  bag.add(B.unregister);

  /** Static test against the rest pose: the platform's footprint, or the column the kettlebell stands in. */
  function hit(p) {
    const [x, y] = unproj(C, p[0], p[1], 0), [a, b] = unproj(C, p[0], p[1], 38);
    return (Math.abs(x) < 52 && Math.abs(y) < 42) || (Math.hypot(a - BX, b - BY) < 30);
  }
  function aim(p) {
    sp.t = clamp((p[0] - 200) / 90, -1, 1) * maxA;
    read.textContent = Math.round(sp.t) + "°";
  }
  function setOver(on) {
    over = on;
    handle.classList.toggle("hi", !on);
    body.classList.toggle("hi", on);
    if (!on) { sp.t = REST; read.textContent = "rest"; }
    B.wake();
  }
  handle.classList.add("hi");
  draw();

  bag.add(pointer(stage, {
    move: (p) => { if (!hit(p)) { if (over) setOver(false); return; } if (!over) setOver(true); aim(p); B.wake(); },
    leave: () => setOver(false),
  }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { maxA = v; if (over) { sp.t = clamp(sp.t, -v, v); B.wake(); } }, destroy: bag.dispose };
}

hairline({
  name: "kettlebell",
  means: "A kettlebell on its base: the pointer's x rocks it on a spring, and the read-out is its tilt in degrees.",
  rules: [1, 3, 5, 8],
  range: [14, 24, 36],
  tour: [[130, 170], [270, 170], [200, 150], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.scale = s; };
/**
 * Scale: a flat body-composition scale with a raised dial housing at the back.
 * The pointer's x sweeps the needle across a dot-tick arc on a spring; the
 * read-out is a weight. The pattern: one continuous input, hit on rest only.
 */
const {
  Cam, clamp, facing, fit, lerp, open, poly, proj, rad, rings, prism, solid, put, spring, stepS,
  disposer, mk, place, pointer, register, unproj,
} = HL;

const ZC = 25, RD = 15, NT = 13, A0 = 215, SW = 250, YD = -14, REST = 0.42, SLAB = [-38, -14, 38, 30];

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}


function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let top = value, over = false;

  const C = Cam(45, 0.5, 2.6);
  fit(C, [[-50, -36, -3], [50, 58, 0], [50, -36, 0], [-50, 58, 0], [0, -30, 46]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [ring, inner] = rings(-50, -36, 50, 58, 9, 1.6);
  put(solid(g), prism(P, () => true, ring, inner, -3, 0));
  adamMark(P, g, 2, 46, 14);

  // dial housing at the back, then the slab in front of it
  const [hr, hi] = rings(-34, -30, 34, YD, 5, 1.4);
  put(solid(g), prism(P, front, hr, hi, 0, 46));
  const [sr, si] = rings(SLAB[0], SLAB[1], SLAB[2], SLAB[3], 7, 1.4);
  put(solid(g), prism(P, front, sr, si, 0, 6));
  for (const sx of [-1, 1]) {
    const [pr] = rings(sx < 0 ? -31 : 7, 2, sx < 0 ? -7 : 31, 25, 5, 1);
    mk("path", { d: poly(pr.map((q) => P(q.u, q.v, 6))), class: "nf lo" }, g);
  }

  // dial: bezel, dot ticks and needle all lie in the housing's front wall (y = YD)
  const D = (a, r, y = YD) => P(r * Math.cos(rad(a)), y, ZC + r * Math.sin(rad(a)));
  const bezel = mk("path", { d: poly(Array.from({ length: 40 }, (_, k) => D(k * 9, RD + 3))), class: "nf hi" }, g);
  mk("path", { d: poly(Array.from({ length: 40 }, (_, k) => D(k * 9, RD + 1))), class: "nf lo" }, g);
  const ticks = Array.from({ length: NT }, (_, i) => {
    const el = mk("circle", { r: i % 4 === 0 ? 1.3 : 0.9, class: i % 4 === 0 ? "dot m" : "dot off" }, g);
    place(el, D(A0 - (i / (NT - 1)) * SW, RD - 1.5));
    return el;
  });
  const needle = mk("path", { class: "nf sil" }, g), hub = mk("circle", { r: 1.6, class: "dot m" }, g);
  place(hub, D(0, 0));

  const sp = spring(REST, { eps: 0.0005 });
  let drawn = NaN, lit = -1;
  function draw() {
    const f = sp.x;
    if (f === drawn) return;
    drawn = f;
    const a = A0 - f * SW, tail = D(a + 180, 2.5), tip = D(a, RD - 3);
    needle.setAttribute("d", poly([tail, D(a + 90, 0.9), tip, D(a - 90, 0.9)]));
    const k = Math.round(clamp(f, 0, 1) * (NT - 1));
    if (k !== lit && over) { if (lit >= 0) ticks[lit].setAttribute("class", lit % 4 === 0 ? "dot m" : "dot off"); ticks[k].setAttribute("class", "dot"); lit = k; }
  }

  const B = register(stage, (dt) => { const m = stepS(sp, dt); draw(); return m; });
  bag.add(B.unregister);

  const hit = (p) => { const [x, y] = unproj(C, p[0], p[1], 0), [a, b] = unproj(C, p[0], p[1], 20); return (Math.abs(x) < 50 && y > -36 && y < 58) || (Math.abs(a) < 36 && b > -32 && b < -10); };
  function setOver(on) {
    over = on;
    bezel.classList.toggle("hi", !on);
    needle.classList.toggle("hi", on);
    if (!on) { sp.t = REST; read.textContent = "rest"; if (lit >= 0) ticks[lit].setAttribute("class", lit % 4 === 0 ? "dot m" : "dot off"); lit = -1; }
    B.wake();
  }
  function aim(p) {
    sp.t = clamp((p[0] - 110) / 180, 0, 1);
    read.textContent = Math.round(sp.t * top) + " kg";
  }
  draw();
  bag.add(pointer(stage, {
    move: (p) => { if (!hit(p)) { if (over) setOver(false); return; } if (!over) setOver(true); aim(p); B.wake(); },
    leave: () => setOver(false),
  }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { top = v; if (over) read.textContent = Math.round(sp.t * top) + " kg"; }, destroy: bag.dispose };
}

hairline({
  name: "scale",
  means: "A body-composition scale: the pointer's x sweeps the dial needle on a spring, and the read-out is the weight.",
  rules: [1, 3, 5, 8],
  range: [100, 150, 200],
  tour: [[130, 180], [200, 160], [280, 180], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.stopwatch = s; };
/**
 * Stopwatch: a round stopwatch standing on a plinth, crown up. The hand
 * sweeps toward the pointer's angle around the face on a spring and the tick
 * under it lights; the read-out is seconds. One continuous input, hit on rest.
 */
const {
  Cam, clamp, facing, fit, open, poly, proj, rad, rings, prism, solid, put, spring, stepS,
  disposer, mk, place, pointer, register,
} = HL;

const R = 32, T = 12, CX = -6, CY = -6, ZC = 40, REST = 84, NT = 60, S2 = Math.SQRT1_2;

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}


function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lap = value, over = false;

  const C = Cam(45, 0.5, 2.5);
  const P = proj(C), front = facing(C);
  /** A point on the face: angle a clockwise from 12 o'clock, radius r, depth d along the face normal. */
  const F = (a, r, d) => P(CX + (r * Math.sin(rad(a)) + d) * S2, CY + (d - r * Math.sin(rad(a))) * S2, ZC + r * Math.cos(rad(a)));
  const ring = (r, d, n = 48) => Array.from({ length: n }, (_, k) => F((k / n) * 360, r, d));
  fit(C, [[-40, -34, -3], [40, 34, 0], [40, -34, 0], [-40, 34, 0], [CX, CY, ZC + R + 16], [CX - 24, CY + 24, ZC], [CX + 24, CY - 24, ZC]], 200, 166);

  const g = mk("g", {}, svg);
  const [pr, pi] = rings(-40, -34, 40, 34, 8, 1.6);
  put(solid(g), prism(P, () => true, pr, pi, -3, 0));
  adamMark(P, g, 22, 22, 13);
  const [br, bi] = rings(CX - 10, CY - 10, CX + 10, CY + 10, 4, 1);
  put(solid(g), prism(P, front, br, bi, 0, ZC - R + 3));
  // crown: a stem and a cap on top of the case
  const [sr, si] = rings(CX - 3.5, CY - 3.5, CX + 3.5, CY + 3.5, 2.5, 0.8);
  put(solid(g), prism(P, front, sr, si, ZC + R - 3, ZC + R + 10));
  const [cr, ci] = rings(CX - 6.5, CY - 6.5, CX + 6.5, CY + 6.5, 3.5, 1);
  const cap = solid(g);
  put(cap, prism(P, front, cr, ci, ZC + R + 10, ZC + R + 16));
  const body = mk("path", { d: poly(HL.hull([...ring(R, T / 2), ...ring(R, -T / 2)])), class: "sil" }, g);
  mk("path", { d: poly(ring(R - 3.5, T / 2 + 0.2)), class: "nf lo" }, g);

  const base = (i) => (i % 5 === 0 ? "dot m" : "dot off");
  const ticks = Array.from({ length: NT }, (_, i) => {
    const el = mk("circle", { r: i % 5 === 0 ? 1.4 : 0.9, class: base(i) }, g);
    place(el, F(i * 6, R - 8, T / 2 + 0.2));
    return el;
  });
  const hand = mk("path", { class: "nf sil" }, g), hub = mk("circle", { r: 1.8, class: "dot m" }, g);
  place(hub, F(0, 0, T / 2 + 0.4));

  const sp = spring(REST, { eps: 0.05 });
  let drawn = NaN, lit = -1;
  function draw() {
    const a = sp.x, k = ((Math.round(a / 6) % NT) + NT) % NT;
    if (a !== drawn) {
      drawn = a;
      hand.setAttribute("d", poly([F(a + 180, 6, T / 2 + 0.4), F(a + 90, 1.2, T / 2 + 0.4), F(a, R - 6, T / 2 + 0.4), F(a - 90, 1.2, T / 2 + 0.4)]));
    }
    if (k !== lit) { if (lit >= 0) ticks[lit].setAttribute("class", base(lit)); lit = k; }
    ticks[lit].setAttribute("class", over ? "dot" : "dot m");
  }

  const B = register(stage, (dt) => { const m = stepS(sp, dt); draw(); return m; });
  bag.add(B.unregister);

  // the face as it rests: its centre and how many viewBox units one world unit spans along its axes
  const c0 = F(0, 0, 0), ux = F(90, 1, 0), uz = F(0, 1, 0);
  const sx = Math.hypot(ux[0] - c0[0], ux[1] - c0[1]), sz = Math.hypot(uz[0] - c0[0], uz[1] - c0[1]);
  const face = (p) => [(p[0] - c0[0]) / sx, -(p[1] - c0[1]) / sz];
  const hit = (p) => { const [u, v] = face(p); return Math.hypot(u, v) < R + 6; };
  function setOver(on) {
    over = on;
    cap.sil.classList.toggle("hi", !on);
    hand.classList.toggle("hi", on);
    if (!on) { sp.t = REST; read.textContent = "rest"; }
    draw();
    B.wake();
  }
  function aim(p) {
    const [u, v] = face(p);
    let a = (Math.atan2(u, v) * 180) / Math.PI;
    a += Math.round((sp.x - a) / 360) * 360;
    sp.t = a;
    read.textContent = Math.round((((a % 360) + 360) % 360) / 360 * lap) % lap + " s";
  }
  cap.sil.classList.add("hi");
  draw();
  bag.add(pointer(stage, {
    move: (p) => { if (!hit(p)) { if (over) setOver(false); return; } if (!over) setOver(true); aim(p); B.wake(); },
    leave: () => setOver(false),
  }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { lap = v; }, destroy: bag.dispose };
}

hairline({
  name: "stopwatch",
  means: "A stopwatch: the hand sweeps to the pointer's angle on a spring, lighting the tick under it; the read-out is seconds.",
  rules: [1, 3, 5, 8],
  range: [30, 60, 120],
  tour: [[200, 120], [250, 165], [160, 180], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.shoe = s; };
/**
 * Shoe: a running shoe on a platform, pivoting about its toe tip. The pointer's
 * place along the shoe sets how far the heel lifts, on a spring: toward the
 * heel it settles, toward the toe it flexes up. The read-out is the angle.
 *
 * The pattern: one continuous input. A spring on the angle, the hit test on
 * the resting footprint (never the lifted shoe), a bright side stripe at rest
 * that gives way to the sole when the pointer takes over.
 */
const { Cam, clamp, fit, open, poly, proj, rad, rings, prism, solid, put, mk, fillet, spring, stepS, disposer, pointer, register, unproj } = HL;

const XT = 48, REST = 5, MIN = 3, N = 20;
let MAX = 26;
// side tables along the shoe (x): half-width of the sole, top of the upper, top of the midsole
const WT = [[-48, 5.5], [-44, 9.5], [-30, 9.2], [-12, 8], [6, 10], [22, 11.5], [38, 10], [47, 4.5]];
const HT = [[-46, 24], [-42, 29], [-34, 28], [-24, 24], [-14, 23], [-6, 27], [4, 25], [14, 21.5], [24, 17], [34, 13.5], [44, 10.5]];
const MS = [[-48, 11], [-20, 9], [10, 6], [48, 4.8]];
const tab = (T, x) => { for (let i = 1; i < T.length; i++) if (x <= T[i][0] || i == T.length - 1) { const [a, b] = [T[i - 1], T[i]]; return lerp(a[1], b[1], clamp((x - a[0]) / (b[0] - a[0]), 0, 1)); } };
const lerp = (a, b, t) => a + (b - a) * t;
const spr = (x) => 3.2 * clamp((x - 26) / 22, 0, 1) ** 2;           // toe spring
const sp2 = (v, e) => Math.sign(v) * Math.abs(v) ** (2 / e);        // superellipse power

/** Smooth outline of a cloud of screen points: the top and bottom envelope in bins of screen x. */
function outline(pts, n) {
  const all = pts.slice();
  pts.forEach((p, i) => { for (const q of [pts[Math.floor(i / n) * n + ((i % n) + 1) % n], pts[i + n]]) if (q) for (let t = 1; t < 16; t++) all.push([lerp(p[0], q[0], t / 16), lerp(p[1], q[1], t / 16)]); });
  pts = all;
  const bins = new Map();
  for (const [x, y] of pts) { const k = Math.round(x / 2.2), b = bins.get(k); if (!b) bins.set(k, [x, y, y]); else { b[1] = Math.min(b[1], y); b[2] = Math.max(b[2], y); } }
  const ks = [...bins.keys()].sort((a, b) => a - b), sm = (a) => { for (let r = 0; r < 3; r++) a = a.map((p, i) => (i && i < a.length - 1 ? [p[0], (a[i - 1][1] + 2 * p[1] + a[i + 1][1]) / 4] : p)); return a; };
  return sm(ks.map((k) => [k * 2.2, bins.get(k)[1]])).concat(sm(ks.map((k) => [k * 2.2, bins.get(k)[2]])).reverse());
}
/** A plan outline of the shoe, inset by d, as filleted [x, y] points. */
function plan(d) {
  const R = WT.map(([x, w]) => [x, w - d]), L = R.map(([x, w]) => [x, -w]).reverse(), pts = R.concat(L);
  return fillet(pts, pts.map((_, i) => (i == 0 || i == R.length - 1 || i == R.length || i == pts.length - 1 ? 6 : 4)), 4).map((p) => (Array.isArray(p) ? p : [p.x ?? p[0], p.y ?? p[1]]));
}

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  MAX = value;

  const C = Cam(45, 0.5, 2.7);
  const hl = rad(32);
  fit(C, [[-56, -26, -3], [56, 26, 0], [56, -26, 0], [-56, 26, 0], [XT - 96 * Math.cos(hl), 0, 96 * Math.sin(hl) + 12], [-46, 0, 36]], 200, 168);
  const P = proj(C);

  const g = mk("g", {}, svg);
  const [ring, inner] = rings(-56, -26, 56, 26, 8, 1.6);
  put(solid(g), prism(P, () => true, ring, inner, -3, 0));
  adamMark(P, g, 6, 19, 8);

  // geometry in the shoe's own frame, built once
  const out = plan(0), mid = plan(0.9);
  const ST = Array.from({ length: 29 }, (_, i) => -45 + i * 3.25);
  const end = (x) => Math.sqrt(clamp((47 - Math.abs(x)) / 7, 0.06, 1));
  const sec = (x) => { const e = end(x), zb = tab(MS, x), zt = tab(HT, x); return { w: (tab(WT, x) - 1.5) * e, zb, zt: zb + (zt - zb) * e }; };
  const rp = (x, t) => { const s = sec(x), zc = (s.zb + s.zt) / 2, h = (s.zt - s.zb) / 2; return [x, s.w * sp2(Math.cos(t), 2.4), zc + h * sp2(Math.sin(t), 2.4)]; };
  const side = (x, f) => { const s = sec(x); return [x, s.w * (1 - Math.abs(2 * f - 1) ** 2.4) ** (1 / 2.4), s.zb + f * (s.zt - s.zb)]; };
  const top = (x, y) => [x, y, sec(x).zt];
  const upper = ST.flatMap((x) => Array.from({ length: N }, (_, i) => rp(x, (i / N) * 2 * Math.PI)));
  const hole = (r, dz) => Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * 2 * Math.PI; return [-21 + 11.5 * r * Math.cos(a), 6.3 * r * Math.sin(a), tab(HT, -21) + dz]; });
  const stripe = [[22, .16], [12, .2], [2, .3], [-8, .46], [-18, .66], [-27, .84], [-33, .93]].map(([x, f]) => side(x, f));
  const counter = [[-30, .93], [-35, .6], [-38, .3], [-37, .05]].map(([x, f]) => side(x, f));
  const tongue = [top(-10, -4), top(-10, 4), [-14, 3, tab(HT, -10) + 5.5], [-14, -3, tab(HT, -10) + 5.5], top(-5, -4), top(-5, 4)];
  const laces = [-1, 6, 13, 20].map((x) => Array.from({ length: 7 }, (_, k) => rp(x, Math.PI / 2 - 0.95 + k * 0.3167)));
  const tab2 = [[-40, -2.2, 27], [-40, 2.2, 27], [-45, 1.8, 31.5], [-45, -1.8, 31.5]];
  const ridge = Array.from({ length: 14 }, (_, k) => top(-3 + k * 3.4, 0));

  const el = (cls) => mk("path", { class: cls }, g);
  const sole = solid(g), msole = solid(g), upr = solid(g);
  const hb = el(""), holeO = el("sil"), holeI = el("lo"), tg = el(""), rdg = el("nf lo"), cn = el("nf lo"), str = el("nf sil hi");
  const lc = laces.map(() => el("nf sil"));

  const sp = spring(rad(REST), { eps: 0.0005 });
  let last = -1;
  function draw() {
    if (sp.x === last) return;
    last = sp.x;
    const c = Math.cos(sp.x), s = Math.sin(sp.x);
    const W = (x, y, z) => { z += spr(x); return P(XT + (x - XT) * c + z * s, y, -(x - XT) * s + z * c); };
    const A = (pts, z) => pts.map(([x, y]) => W(x, y, z));
    const f3 = (pts) => pts.map((q) => W(q[0], q[1], q[2]));
    sole.sil.setAttribute("d", poly(outline(A(out, 0).concat(A(out, 2.4)), out.length)));
    sole.cr.setAttribute("d", open(A(out, 2.4)));
    msole.sil.setAttribute("d", poly(outline(A(mid, 2.4).concat(mid.map(([x, y]) => W(x, y, tab(MS, x)))), mid.length)));
    msole.cr.setAttribute("d", open(mid.map(([x, y]) => W(x, y, tab(MS, x)))));
    upr.sil.setAttribute("d", poly(outline(f3(upper), N)));
    upr.cr.setAttribute("d", "");
    hb.setAttribute("d", poly(HL.hull(f3(tab2))));
    holeO.setAttribute("d", poly(f3(hole(1, 0.4))));
    holeI.setAttribute("d", poly(f3(hole(0.72, -1.8))));
    tg.setAttribute("d", poly(HL.hull(f3(tongue))));
    rdg.setAttribute("d", open(f3(ridge)));
    cn.setAttribute("d", open(f3(counter)));
    str.setAttribute("d", open(f3(stripe)));
    laces.forEach((l, i) => lc[i].setAttribute("d", open(f3(l))));
  }

  const B = register(stage, (dt) => { const m = stepS(sp, dt); draw(); return m; });
  bag.add(B.unregister);

  /** The resting footprint holds the pointer; x along the shoe sets the target angle. */
  function aim(pt) {
    const [x, y] = unproj(C, pt[0], pt[1], 8);
    if (Math.abs(y) > 16 || x < -52 || x > 52) return null;
    return clamp((x + 48) / 96, 0, 1);
  }

  let on = false;
  function setT(t) {
    const a = t !== null;
    sp.t = rad(a ? MIN + (MAX - MIN) * t : REST);
    read.textContent = a ? Math.round(sp.t * 180 / Math.PI) + "°" : "rest";
    if (a !== on) { on = a; str.classList.toggle("hi", !a); msole.sil.classList.toggle("hi", a); }
    B.wake();
  }
  draw();

  bag.add(pointer(stage, { move: (p) => setT(aim(p)), leave: () => setT(null) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { MAX = v; }, destroy: bag.dispose };
}

hairline({
  name: "shoe",
  means: "A running shoe pivoting about its toe: the pointer's place along it sets how far the heel lifts.",
  rules: [1, 3, 8, 10],
  range: [18, 26, 32],
  tour: [[146, 184], [200, 208], [262, 240], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.pulse = s; };
/**
 * Pulse: a heartbeat monitor. A slab carries a raised ECG ridge with one tall
 * beat. The pointer's place along the slab raises the ridge there into a
 * bigger beat, and the cells beside it follow outwards in turn. The read-out
 * is the rate, which changes with where you are.
 *
 * The pattern: discrete cells along a line. Tweens, a stagger by distance, and
 * a hit test on the slab's own top plane, so a rising ridge cannot flip it.
 */
const {
  Cam, clamp, fit, proj, rings, prism, solid, put, mk, tween, tset, tval, tdone,
  disposer, pointer, register, poly, open,
} = HL;

const X0 = -50, X1 = 50, SLAB = 5, N = 13, CELL = (X1 - X0) / (N - 1), BEAT = 15, RT = 1.6, REST_CELL = 6;
// the ECG at rest: [x, height above the slab], one tall beat at the centre
const ECG = [[-50, 4], [-40, 4], [-34, 9], [-28, 4], [-14, 4], [-10, 1], [-5, 6], [0, 34], [5, 0.5], [9, 5], [13, 4], [20, 4], [26, 11], [33, 4], [50, 3]];

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}

/** The resting ridge height at x, by linear interpolation of ECG. */
function base(x) {
  for (let i = 1; i < ECG.length; i++) if (x <= ECG[i][0]) { const [a, b] = [ECG[i - 1], ECG[i]]; return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0] || 1); }
  return ECG[ECG.length - 1][1];
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let step = value;

  const C = Cam(45, 0.5, 2.6);
  fit(C, [[-60, -28, -3], [60, 28, 0], [60, -28, 0], [-60, 28, 0], [0, 0, SLAB + 70], [-20, 0, SLAB + 70]], 200, 168);
  const P = proj(C);

  const g = mk("g", {}, svg);
  const [ring, inner] = rings(-60, -28, 60, 28, 7, 1.6);
  put(solid(g), prism(P, () => true, ring, inner, -3, 0));
  adamMark(P, g, 32, 21.5, 7);
  const [sr, si] = rings(-54, -15, 54, 15, 5, 1.4);
  put(solid(g), prism(P, () => true, sr, si, 0, SLAB));

  const ribbon = mk("path", { class: "sil" }, g), face = mk("path", { class: "sil" }, g);
  const bright = mk("path", { class: "nf hi" }, g);
  const cells = Array.from({ length: N }, () => tween(0));
  const xs = [];
  for (let x = X0; x <= X1 + 0.01; x += 2.5) xs.push(x);
  // the lift at x: the cells' tweens, interpolated between their centres
  const lift = (x, now) => {
    const f = clamp((x - X0) / CELL, 0, N - 1), i = Math.min(N - 2, Math.floor(f)), t = f - i;
    return tval(cells[i], now) * (1 - t) + tval(cells[i + 1], now) * t;
  };
  let last = "", act = -1;
  function draw(now) {
    const h = xs.map((x) => SLAB + base(x) * (1 + 0.8 * lift(x, now) / BEAT) + 0.5 * lift(x, now));
    const key = h.map((v) => v.toFixed(1)).join() + act;
    if (key === last) return;
    last = key;
    const top = (y) => xs.map((x, i) => P(x, y, h[i]));
    const f = top(RT), b = top(-RT);
    const foot = [P(X1, RT, SLAB), P(X0, RT, SLAB)];
    // the open ends: the -x end is visible edge-on, so it is closed with a thin cap on the ribbon
    ribbon.setAttribute("d", poly([...b, ...f.slice().reverse()]));
    face.setAttribute("d", poly([...f, ...foot]));
    const c = act < 0 ? REST_CELL : act, lo = X0 + (c - 1.5) * CELL, hi = X0 + (c + 1.5) * CELL;
    bright.setAttribute("d", open(f.filter((_, i) => xs[i] >= lo && xs[i] <= hi)));
  }

  const B = register(stage, (_dt, now) => { draw(now); return cells.some((c) => !tdone(c, now)); });
  bag.add(B.unregister);

  /** The cell under the pointer, by the slab's own top plane. */
  function hit(pt) {
    const [x, y] = HL.unproj(C, pt[0], pt[1], SLAB);
    if (Math.abs(y) > 20 || x < X0 - 5 || x > X1 + 5) return -1;
    return clamp(Math.round((x - X0) / CELL), 0, N - 1);
  }

  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    cells.forEach((c, i) => {
      const d = Math.abs(i - from), fall = Math.max(Math.exp(-(d * d) / 5), 0.05);
      tset(c, a < 0 ? 0 : clamp(BEAT * fall, 0, BEAT), now, d * step);
    });
    read.textContent = a < 0 ? "rest" : 54 + a * 6 + " bpm";
    B.wake();
  }
  draw(performance.now());

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { step = v; }, destroy: bag.dispose };
}

hairline({
  name: "pulse",
  means: "A heartbeat monitor: the pointer raises the ECG ridge into a bigger beat, and the rate follows where you are.",
  rules: [1, 2, 8, 10],
  range: [0, 40, 90],
  tour: [[145, 177], [200, 208], [255, 236], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.plate = s; };
/**
 * Plate: a round meal plate split into three low blocks, protein, carbs and
 * vegetables, with different footprints. The block under the pointer rises
 * and glows; the other two settle. The read-out is its letter.
 *
 * The pattern: discrete items. Tweens, a stagger by distance, and a hit test
 * on each block's own rest footprint, so a rising block cannot flip the choice.
 */
const {
  Cam, fit, proj, rrect, prism, facing, solid, put, mk, tween, tset, tval, tdone,
  disposer, pointer, register, poly, open, ringAt, hull, fillet, unproj, rad, seg,
} = HL;

const PC = [-6, -6], PR = 40, RW = 3.6, TOP = 4, WR = 31, LIFT = 9, REST_LIFT = 2.5;
// sectors in degrees round the plate centre (+x is 0, +y is 90): vegetables half, protein and carbs a quarter each
const SEC = [{ k: "V", a0: 135, a1: 315, h: 4 }, { k: "P", a0: 315, a1: 405, h: 5 }, { k: "C", a0: 45, a1: 135, h: 5 }];
/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let step = value;

  const C = Cam(45, 0.5, 2.55);
  fit(C, [[-50, -44, -3], [50, 44, 0], [50, -44, 0], [-50, 44, 0], [PC[0], PC[1] - PR, TOP + 5 + LIFT], [PC[0], PC[1] + PR, TOP]], 200, 168);
  const P = proj(C), front = facing(C);
  const [px, py] = PC;

  const g = mk("g", {}, svg);
  const [ring, inner] = [rrect(-50, -44, 50, 44, 7, 6), rrect(-48.4, -42.4, 48.4, 42.4, 5.4, 6)];
  put(solid(g), prism(P, () => true, ring, inner, -3, 0));
  adamMark(P, g, 36, 31, 11);

  // the plate: a round dish with a raised rim and a shallow well
  const disc = rrect(px - PR, py - PR, px + PR, py + PR, PR, 12);
  const rim = rrect(px - PR + 3.6, py - PR + 3.6, px + PR - 3.6, py + PR - 3.6, PR - 3.6, 12);
  put(solid(g), prism(P, front, disc, rim, 0, TOP));
  const well = rrect(px - 34, py - 34, px + 34, py + 34, 34, 12);
  mk("path", { d: poly(ringAt(P, well, TOP)), class: "nf lo" }, g);
  // dividing lines on the well floor, one at each sector edge
  const dir = (a, r, z) => P(px + r * Math.cos(rad(a)), py + r * Math.sin(rad(a)), z);
  mk("path", { d: SEC.map((s) => seg(dir(s.a0, 1, TOP), dir(s.a0, 33, TOP))).join(""), class: "nf lo" }, g);

  const wedges = SEC.map((s, i) => {
    const mid = rad((s.a0 + s.a1) / 2), gap = 2.2;
    const cx = px + gap * Math.cos(mid) * 1.0, cy = py + gap * Math.sin(mid) * 1.0;
    const pts = [[cx, cy]], n = Math.round((s.a1 - s.a0) / 6);
    for (let k = 0; k <= n; k++) { const a = rad(s.a0 + 1.5 + (s.a1 - s.a0 - 3) * k / n); pts.push([px + WR * Math.cos(a) + gap * Math.cos(mid) * 0.4, py + WR * Math.sin(a) + gap * Math.sin(mid) * 0.4]); }
    const radii = pts.map((_, k) => (k === 0 ? 3 : k === 1 || k === pts.length - 1 ? 3.5 : 0.01));
    const poly2 = fillet(pts, radii, 4);
    const mx = poly2.reduce((t, p) => t + p[0], 0) / poly2.length, my = poly2.reduce((t, p) => t + p[1], 0) / poly2.length;
    const shrink = poly2.map(([x, y]) => [mx + (x - mx) * 0.86, my + (y - my) * 0.86]);
    return { ...s, poly2, shrink, s: solid(g), z: tween(i === 0 ? REST_LIFT : 0), last: "" };
  });

  function draw(now) {
    wedges.forEach((w) => {
      const z = tval(w.z, now), key = z.toFixed(2);
      if (key === w.last) return;
      w.last = key;
      const z1 = TOP + w.h + z;
      const base = w.poly2.map(([x, y]) => P(x, y, TOP)), top = w.poly2.map(([x, y]) => P(x, y, z1));
      put(w.s, { sil: poly(hull(base.concat(top))), crease: open(w.shrink.map(([x, y]) => P(x, y, z1)).concat([P(w.shrink[0][0], w.shrink[0][1], z1)])) });
    });
  }

  /** The sector holding the pointer by angle round the plate centre, tested on the rest plane. */
  function hit(pt) {
    const [x, y] = unproj(C, pt[0], pt[1], TOP + 4);
    const dx = x - px, dy = y - py;
    if (Math.hypot(dx, dy) > PR + 2) return -1;
    const a = ((Math.atan2(dy, dx) * 180 / Math.PI) % 360 + 360) % 360;
    return SEC.findIndex((s) => { const t = a < s.a0 ? a + 360 : a; return t >= s.a0 && t < s.a1; });
  }

  let act = -1;
  const B = register(stage, (_dt, now) => { draw(now); return wedges.some((w) => !tdone(w.z, now)); });
  bag.add(B.unregister);

  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act < 0 ? 0 : act;
    act = a;
    wedges.forEach((w, i) => {
      const to = a < 0 ? (i === 0 ? REST_LIFT : 0) : i === a ? LIFT : 0;
      tset(w.z, to, now, Math.abs(i - from) * step);
      w.s.sil.classList.toggle("hi", a < 0 ? i === 0 : i === a);
    });
    read.textContent = a < 0 ? "rest" : wedges[a].k;
    B.wake();
  }
  wedges[0].s.sil.classList.add("hi");
  draw(performance.now());

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { step = v; }, destroy: bag.dispose };
}

hairline({
  name: "plate",
  means: "A dinner plate divided into portions, half vegetables, a quarter protein, a quarter carbs: the pointer lifts one.",
  rules: [1, 2, 8, 10],
  range: [0, 40, 90],
  tour: [[185, 112], [250, 168], [160, 170], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.pitch = s; };
/**
 * Pitch: a miniature football pitch on a low platform, lines recessed, a goal
 * frame at each end. A ball rests off-centre (bright). The pointer's place on
 * the ground draws the ball: it rolls there on a spring and stays inside the
 * touchlines, a ring marks the spot (the bright goes to it) and the read-out
 * gives the grid cell. The pointer is tested on the ground plane only.
 */
const {
  Cam, clamp, fit, open, poly, proj, rings, prism, solid, put, spring, stepS, unproj,
  disposer, mk, pointer, register,
} = HL;

const PX = 66, PY = 36, BR = 5.5, GW = 10, GH = 9, GD = 6, COLS = 6, ROWS = 4;
const REST = [-22, 12];

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}

function mount({ stage, svg, read }) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.92);
  fit(C, [[-80, -44, -3], [80, 62, -3], [80, -44, 0], [-80, 62, 0], [-PX, 0, GH + 1], [PX, 0, GH + 1]], 200, 168);
  const P = proj(C);
  const g = mk("g", {}, svg);

  const [ring, inner] = rings(-80, -44, 80, 62, 8, 1.6);
  put(solid(g), prism(P, () => true, ring, inner, -3, 0));
  adamMark(P, g, 0, 52, 12);

  // the lines, recessed strokes on the ground
  const gp = (pts) => pts.map(([x, y]) => P(x, y, 0));
  const circle = (cx, cy, r, n = 40) => gp(Array.from({ length: n }, (_, k) => [cx + r * Math.cos((k / n) * 6.2832), cy + r * Math.sin((k / n) * 6.2832)]));
  const lines = [
    poly(gp([[-PX, -PY], [PX, -PY], [PX, PY], [-PX, PY]])),
    poly(circle(0, 0, 11)),
    poly(circle(0, 0, 1.2, 10)),
    open(gp([[0, -PY], [0, PY]])),
    open(gp([[-PX, -16], [-PX + 14, -16], [-PX + 14, 16], [-PX, 16]])),
    open(gp([[PX, -16], [PX - 14, -16], [PX - 14, 16], [PX, 16]])),
    open(gp([[-PX, -7], [-PX + 5, -7], [-PX + 5, 7], [-PX, 7]])),
    open(gp([[PX, -7], [PX - 5, -7], [PX - 5, 7], [PX, 7]])),
  ];
  for (const d of lines) mk("path", { d, class: "nf lo" }, g);

  const marker = mk("path", { class: "nf hi", d: "" }, g);

  const goal = (s) => {
    const x = s * PX, xb = s * (PX + GD), q = (X, y, z) => P(X, y, z);
    mk("path", { d: open([q(xb, -GW, 0), q(xb, -GW, GH - 2), q(xb, GW, GH - 2), q(xb, GW, 0)]), class: "nf lo" }, g);
    mk("path", { d: open([q(x, -GW, GH), q(xb, -GW, GH - 2)]) + open([q(x, GW, GH), q(xb, GW, GH - 2)]), class: "nf lo" }, g);
    mk("path", { d: open([q(x, -GW, 0), q(x, -GW, GH), q(x, GW, GH), q(x, GW, 0)]), class: "nf sil" }, g);
  };
  goal(-1);

  const ball = mk("g", {}, g);
  const body = mk("path", { class: "sil" }, ball), crease = mk("path", { class: "nf" }, ball);
  goal(1);

  const sx = spring(REST[0]), sy = spring(REST[1]);
  const V = [0.612, 0.612, 0.5];
  let last = "";
  function draw() {
    const bx = sx.x, by = sy.x, phi = bx * 0.06 + by * 0.1 + 1.2;
    const key = bx.toFixed(2) + by.toFixed(2);
    if (key === last) return;
    last = key;
    const c = [bx, by, BR];
    const pt = (r, e1, e2, t) => P(c[0] + r * (Math.cos(t) * e1[0] + Math.sin(t) * e2[0]), c[1] + r * (Math.cos(t) * e1[1] + Math.sin(t) * e2[1]), c[2] + r * (Math.cos(t) * e1[2] + Math.sin(t) * e2[2]));
    const cc = P(bx, by, BR);
    body.setAttribute("d", poly(Array.from({ length: 28 }, (_, k) => [cc[0] + BR * 1.92 * Math.cos((k / 28) * 6.2832), cc[1] + BR * 1.92 * Math.sin((k / 28) * 6.2832)])));
    const e1 = [Math.cos(phi), Math.sin(phi), 0], e2 = [-Math.sin(phi) * 0.5, Math.cos(phi) * 0.5, 0.866];
    const A = V[0] * e1[0] + V[1] * e1[1] + V[2] * e1[2], B = V[0] * e2[0] + V[1] * e2[1] + V[2] * e2[2];
    const t0 = Math.atan2(B, A), pts = [];
    for (let k = 0; k <= 16; k++) pts.push(pt(BR, e1, e2, t0 - 1.5708 + (k / 16) * 3.1416));
    crease.setAttribute("d", open(pts));
  }
  draw();
  body.classList.add("hi");

  const B = register(stage, (dt) => { const a = stepS(sx, dt), b = stepS(sy, dt); draw(); return a || b; });
  bag.add(B.unregister);

  let cell = "";
  function aim(pt) {
    const [x, y] = unproj(C, pt[0], pt[1], 0);
    const inside = Math.abs(x) < PX + 6 && Math.abs(y) < PY + 6;
    if (!inside) { aim.out(); return; }
    const tx = clamp(x, -PX + BR + 1, PX - BR - 1), ty = clamp(y, -PY + BR + 1, PY - BR - 1);
    sx.t = tx; sy.t = ty;
    const ci = clamp(Math.floor(((clamp(x, -PX, PX - 0.01) + PX) / (2 * PX)) * COLS), 0, COLS - 1) + 1;
    const cj = clamp(Math.floor(((clamp(y, -PY, PY - 0.01) + PY) / (2 * PY)) * ROWS), 0, ROWS - 1) + 1;
    const mc = (xx, yy) => Array.from({ length: 18 }, (_, k) => P(xx + 5 * Math.cos((k / 18) * 6.2832), yy + 5 * Math.sin((k / 18) * 6.2832), 0));
    marker.setAttribute("d", poly(mc(tx, ty)));
    body.classList.remove("hi");
    cell = ci + "·" + cj;
    read.textContent = cell;
    B.wake();
  }
  aim.out = () => {
    if (!cell) return;
    cell = ""; sx.t = REST[0]; sy.t = REST[1];
    marker.setAttribute("d", ""); body.classList.add("hi");
    read.textContent = "rest"; B.wake();
  };

  bag.add(pointer(stage, { move: aim, leave: aim.out }));
  bag.add(() => svg.replaceChildren());
  return { set: () => {}, destroy: bag.dispose };
}

hairline({
  name: "pitch",
  means: "A miniature pitch: the ball rolls to wherever the pointer touches the grass and stays inside the lines.",
  rules: [1, 4, 8, 10],
  range: [0, 1, 2],
  tour: [[130, 150], [260, 150], [200, 220], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.firstaid = s; };
/**
 * First-aid kit: a rounded box with a hinged lid. The pointer's height sets the
 * lid angle on a spring; the compartments inside (a roll, a bottle, a pack)
 * rise a little once it is open, staggered outwards from the one nearest the
 * pointer. At rest the lid is ajar and the raised plus is the bright mark.
 */
const {
  Cam, clamp, facing, fit, hull, open, poly, proj, rad, ringAt, rings, rrect, run, solid, put, prism,
  spring, stepS, tdone, tset, tval, tween, unproj, disposer, mk, pointer, register,
} = HL;

const H = 12, FL = 2, WT = 2.5, T = 3, REL = 1.8, REST = 18;
const ITEMS = [
  { x: -20, a: [-27, -7, -13, 7, 7, 1.2], parts: [[2, 11]] },
  { x: 5, a: [1, -4, 9, 4, 4, 1], parts: [[2, 16]], b: [3, -2, 7, 2, 2, 0.6, 16, 20] },
  { x: 26, a: [20, -8, 32, 8, 2.5, 1], parts: [[2, 8]] },
];

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let step = value;
  const C = Cam(45, 0.5, 2.7);
  const lp = (th, v, w) => [0, -22 + v * Math.cos(rad(th)) - w * Math.sin(rad(th)), H + v * Math.sin(rad(th)) + w * Math.cos(rad(th))];
  fit(C, [[-46, -30, -3], [46, 42, -3], [46, -30, 0], [-46, 42, 0], [-34, lp(108, 44, T)[1], lp(108, 44, T)[2]], [34, lp(108, 44, T)[1], lp(108, 44, T)[2]]], 200, 160);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  const [pr, pi] = rings(-46, -30, 46, 42, 7, 1.6);
  put(solid(g), prism(P, () => true, pr, pi, -3, 0));
  adamMark(P, g, 0, 33, 11);

  const outer = rrect(-34, -22, 34, 22, 6, 6), inner = rrect(-34 + WT, -22 + WT, 34 - WT, 22 - WT, 6 - WT, 6);
  const lidG = mk("g", {}, g);
  const bodyFirst = mk("path", { d: poly(hull(ringAt(P, outer, 0).concat(ringAt(P, outer, H)))), class: "sil" }, g);
  mk("path", { d: poly(ringAt(P, inner, H)), class: "nf" }, g);
  mk("path", { d: open(ringAt(P, run(inner, (q) => !front(q)), FL)), class: "nf lo" }, g);

  // dividers, then the items, back to front by x
  const mkSolid = (a) => { const [x0, y0, x1, y1, r, b] = a; const [o, i] = rings(x0, y0, x1, y1, r, b); return { o, i, s: solid(g) }; };
  const parts = [
    { x: -6, a: [-7, -18, -5, 18, 0.9, 0.5], z: [FL, 14], d: true },
    { x: 16, a: [15, -18, 17, 18, 0.9, 0.5], z: [FL, 14], d: true },
  ];
  ITEMS.forEach((it, k) => {
    parts.push({ x: it.x, a: it.a, z: it.parts[0], item: k });
    if (it.b) parts.push({ x: it.x, a: it.b.slice(0, 6), z: [it.b[6], it.b[7]], item: k, top: true });
  });
  parts.sort((p, q) => p.x - q.x);
  parts.forEach((p) => Object.assign(p, mkSolid(p.a), { tw: tween(0), last: NaN }));
  const dz = (p, now) => (p.item === undefined ? 0 : tval(ITEMS[p.item].tw, now));
  ITEMS.forEach((it) => { it.tw = tween(0); });

  const LR = (pts) => (pts[0][0] <= pts[pts.length - 1][0] ? pts : pts.slice().reverse());
  const iF = LR(ringAt(P, run(inner, front), H)), oT = LR(ringAt(P, run(outer, front), H)), oB = LR(ringAt(P, run(outer, front), 0));
  mk("path", { d: poly([...iF, oT[oT.length - 1], ...oB.slice().reverse(), oT[0]]), class: "fo" }, g);
  mk("path", { d: open(oT), class: "nf lo" }, g);
  mk("path", { d: open(iF), class: "nf" }, g);
  mk("path", { d: open([oT[0], ...oB, oT[oT.length - 1]]), class: "nf sil" }, g);

  // the lid: a slab hinged on the far long edge
  const lring = rrect(-34, 0, 34, 44, 6, 6), lin = rrect(-32.2, 1.8, 32.2, 42.2, 4.2, 6);
  const lid = mk("path", { class: "sil" }, lidG), lcr = mk("path", { class: "nf lo" }, lidG);
  const pb = mk("path", { class: "lo" }, lidG), pt = mk("path", { class: "sil hi" }, lidG);
  const a = 11, b = 3.6, PLUS = [[-b, -a], [b, -a], [b, -b], [a, -b], [a, b], [b, b], [b, a], [-b, a], [-b, b], [-a, b], [-a, -b], [-b, -b]];
  const sp = spring(REST, { eps: 0.05 });
  let lidFront = true, lastTh = NaN;
  function drawLid() {
    const th = clamp(sp.x, 0, 112);
    if (th.toFixed(2) === lastTh) return;
    lastTh = th.toFixed(2);
    const L = (u, v, w) => { const q = lp(th, v, w); return P(u, q[1], q[2]); };
    const top = th < 39;
    lid.setAttribute("d", poly(hull([...lring.map((q) => L(q.u, q.v, 0)), ...lring.map((q) => L(q.u, q.v, T))])));
    lcr.setAttribute("d", poly(lin.map((q) => L(q.u, q.v, top ? T : 0))));
    pb.setAttribute("d", top ? poly(PLUS.map(([u, v]) => L(u, 22 + v, T))) : "");
    pt.setAttribute("d", top ? poly(PLUS.map(([u, v]) => L(u, 22 + v, T + REL))) : "");
    const f = th <= 88;
    if (f !== lidFront) { lidFront = f; if (f) g.appendChild(lidG); else g.insertBefore(lidG, bodyFirst); }
  }
  function drawParts(now) {
    parts.forEach((p) => {
      const d = dz(p, now);
      if (d === p.last) return;
      p.last = d;
      put(p.s, prism(P, front, p.o, p.i, p.z[0] + d, p.z[1] + d));
    });
  }
  const draw = (now) => { drawLid(); drawParts(now); };
  g.appendChild(lidG);
  pt.classList.add("hi");
  draw(performance.now());

  const B = register(stage, (dt, now) => {
    const m = stepS(sp, dt);
    draw(now);
    return m || ITEMS.some((it) => !tdone(it.tw, now));
  });
  bag.add(B.unregister);

  // the pointer's active area is fixed: the footprint and the air above it
  const xl = P(-46, 42, 0)[0], xr = P(46, -30, 0)[0], yT = P(0, -30, H + 60)[1], yB = P(46, 42, -3)[1];
  const yLow = P(0, 22, H)[1], yHigh = P(0, -22, H + 60)[1];
  let act = false, near = 1, shown = "";
  function aim(pt_) {
    const [x, y] = pt_;
    if (x < xl || x > xr || y < yT || y > yB) { out(); return; }
    const th = Math.round(4 + 102 * clamp((yLow - y) / (yLow - yHigh), 0, 1));
    sp.t = th;
    const gx = unproj(C, x, y, 0)[0];
    near = gx < (ITEMS[0].x + ITEMS[1].x) / 2 ? 0 : gx < (ITEMS[1].x + ITEMS[2].x) / 2 ? 1 : 2;
    const now = performance.now();
    ITEMS.forEach((it, i) => tset(it.tw, th > 60 ? 3 : 0, now, Math.abs(i - near) * step));
    if (!act) { act = true; pt.classList.remove("hi"); lid.classList.add("hi"); }
    if (shown !== th + "°") { shown = th + "°"; read.textContent = shown; }
    B.wake();
  }
  function out() {
    if (!act) return;
    act = false; shown = "";
    const now = performance.now();
    sp.t = REST;
    ITEMS.forEach((it, i) => tset(it.tw, 0, now, Math.abs(i - near) * step));
    lid.classList.remove("hi"); pt.classList.add("hi");
    read.textContent = "rest"; B.wake();
  }
  bag.add(pointer(stage, { move: aim, leave: out }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { step = v; }, destroy: bag.dispose };
}

hairline({
  name: "firstaid",
  means: "A first-aid kit: the pointer's height swings the lid open, and the things inside rise out of their compartments.",
  rules: [1, 2, 8, 10],
  range: [0, 40, 90],
  tour: [[200, 190], [200, 130], [200, 80], null],
  mount,
});

})();
(function () { const hairline = function (s) { SPECS.trophy = s; };
/**
 * Trophy: a cup built from four stacked parts (base, stem, knob, bowl with two
 * handles), slightly apart at rest with the bowl's rim bright. The pointer's
 * height picks a part; the two gaps beside it open, staggered by distance from
 * it, and the part takes the bright. Hit test on the parts' rest heights.
 */
const {
  Cam, clamp, facing, fit, hull, open, poly, proj, ringAt, rings, rrect, run, solid, put, prism,
  tdone, tset, tval, tween, disposer, mk, pointer, register,
} = HL;

const G0 = 2.5, G1 = 12;
const NOM = [0, 8, 22, 28];

/** The ADAM mark (an A over a bar), lying flat on the ground plane at (cx, cy), `s` world units tall. Drawn as plain strokes. */
function adamMark(P, parent, cx, cy, s) {
  const k = s / Math.SQRT2;
  const W = (u, v) => P(cx + ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), cy - ((u - 0.5) * k) - ((v - 0.5) * k * 1.0), 0);
  const A = [[0, 0], [0.28, 1], [0.72, 1], [1, 0], [0.78, 0], [0.7, 0.24], [0.3, 0.24], [0.22, 0]].map(([u, v]) => W(u, v));
  const hole = [[0.36, 0.42], [0.64, 0.42], [0.5, 0.8]].map(([u, v]) => W(u, v));
  const bar = [[0.04, -0.2], [0.96, -0.2], [0.96, -0.1], [0.04, -0.1]].map(([u, v]) => W(u, v));
  const g = mk("g", {}, parent);
  mk("path", { d: HL.poly(A), class: "nf sil" }, g);
  mk("path", { d: HL.poly(hole), class: "nf sil" }, g);
  mk("path", { d: HL.poly(bar), class: "nf sil" }, g);
  return g;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let step = value;
  const C = Cam(45, 0.5, 2.55);
  fit(C, [[-34, -26, -3], [34, 46, -3], [34, -26, 0], [-34, 46, 0], [0, 0, 82], [-24, 24, 60], [24, -24, 60]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const [pr, pi] = rings(-34, -26, 34, 46, 7, 1.6);
  put(solid(g), prism(P, () => true, pr, pi, -3, 0));
  adamMark(P, g, 0, 35, 10);

  const disc = (r, b) => [rrect(-r, -r, r, r, r, 14), rrect(-r + b, -r + b, r - b, r - b, r - b, 14)];
  const pris = (s, [o, i], z0, z1) => put(s, prism(P, front, o, i, z0, z1));
  const parts = [];
  const mkPart = (draw, sils) => parts.push({ g: null, draw, sils, last: NaN });
  const grp = () => mk("g", {}, g);

  // 1 base: two tiers
  { const k = grp(), a = solid(k), b = solid(k), A = disc(20, 1.6), B = disc(14, 1.4);
    mkPart((z) => { pris(a, A, z, z + 4); pris(b, B, z + 4, z + 8); }, [a.sil, b.sil]); }
  // 2 stem
  { const k = grp(), a = solid(k), A = disc(3.4, 0.8);
    mkPart((z) => pris(a, A, z, z + 14), [a.sil]); }
  // 3 knob: a flattened bead
  { const k = grp(), sil = mk("path", { class: "sil" }, k), cr = mk("path", { class: "nf lo" }, k), R = rrect(-7, -7, 7, 7, 7, 14);
    const r = (q, s) => rrect(-q, -q, q, q, q, 14).map((p) => ({ ...p, u: p.u * s, v: p.v * s }));
    mkPart((z) => {
      sil.setAttribute("d", poly(hull([...ringAt(P, rrect(-4.5, -4.5, 4.5, 4.5, 4.5, 14), z), ...ringAt(P, R, z + 3), ...ringAt(P, rrect(-4.5, -4.5, 4.5, 4.5, 4.5, 14), z + 6)])));
      cr.setAttribute("d", open(ringAt(P, run(R, front), z + 3)));
    }, [sil]); }
  // 4 bowl, with two handles
  { const k = grp(), hl = [mk("path", { class: "nf sil" }, k), mk("path", { class: "nf sil" }, k)];
    const sil = mk("path", { class: "sil" }, k), rim = mk("path", { class: "nf" }, k), mouth = mk("path", { class: "nf lo" }, k), band = mk("path", { class: "nf lo" }, k);
    const R0 = rrect(-9, -9, 9, 9, 9, 14), R1 = rrect(-16, -16, 16, 16, 16, 14), R2 = rrect(-19, -19, 19, 19, 19, 14), R3 = rrect(-16.5, -16.5, 16.5, 16.5, 16.5, 14);
    const arc = (s, z, ax, az, ph0, ph1, n = 12) => Array.from({ length: n + 1 }, (_, j) => {
      const ph = ph0 + ((ph1 - ph0) * j) / n, u = s * (17 + ax * Math.cos(ph)) * 0.7071;
      return P(u, -u, z + az * Math.sin(ph));
    });
    sil.classList.add("sil");
    mkPart((z) => {
      sil.setAttribute("d", poly(hull([...ringAt(P, R0, z), ...ringAt(P, R1, z + 9), ...ringAt(P, R2, z + 22)])));
      rim.setAttribute("d", poly(ringAt(P, R2, z + 22)));
      mouth.setAttribute("d", poly(ringAt(P, R3, z + 22)));
      band.setAttribute("d", open(ringAt(P, run(R1, front), z + 9)));
      [-1, 1].forEach((s, j) => hl[j].setAttribute("d", poly([...arc(s, z + 14, 11, 6.5, -1.5708, 1.5708), ...arc(s, z + 14, 7, 3.2, 1.5708, -1.5708)])));
    }, [sil, ...hl]);
    parts[3].rim = rim; }

  const gaps = [0, 1, 2].map(() => tween(G0));
  const zs = (now) => { let acc = 0; return parts.map((_, i) => { if (i) acc += tval(gaps[i - 1], now); return NOM[i] + acc; }); };
  function draw(now) {
    zs(now).forEach((z, i) => {
      const p = parts[i], key = z.toFixed(2);
      if (key === p.last) return;
      p.last = key; p.draw(z);
    });
  }
  draw(performance.now());
  parts[3].rim.classList.add("hi");

  const B = register(stage, (_dt, now) => { draw(now); return gaps.some((t) => !tdone(t, now)); });
  bag.add(B.unregister);

  // hit: the pointer's height against each part's REST centre on screen
  const rc = [4, 17.5, 30, 46.5].map((z) => P(0, 0, z)[1]);
  const xl = P(-34, 46, 0)[0], xr = P(34, -26, 0)[0], yT = P(0, 0, 80)[1], yB = P(34, 46, -3)[1];
  function hit([x, y]) {
    if (x < xl || x > xr || y < yT || y > yB) return -1;
    let best = 0;
    rc.forEach((c, i) => { if (Math.abs(y - c) < Math.abs(y - rc[best])) best = i; });
    return best;
  }

  let act = -1;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : act;
    act = a;
    gaps.forEach((t, k) => {
      const d = Math.min(Math.abs(k - from), Math.abs(k + 1 - from));
      tset(t, a >= 0 && (k === a || k === a - 1) ? G1 : G0, now, d * step);
    });
    parts.forEach((p, i) => p.sils.forEach((e) => e.classList.toggle("hi", i === a)));
    parts[3].rim.classList.toggle("hi", a < 0 || a === 3);
    read.textContent = a < 0 ? "rest" : String(a + 1);
    B.wake();
  }
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  return { set: (v) => { step = v; }, destroy: bag.dispose };
}

hairline({
  name: "trophy",
  means: "A trophy of four stacked parts: the pointer's height picks one, and the gaps beside it open, spreading outwards.",
  rules: [1, 2, 8, 10],
  range: [0, 40, 90],
  tour: [[200, 230], [200, 170], [200, 110], null],
  mount,
});

})();

/** Draws figure `name` into `host`, and lets it play its tour until a hand touches it. Returns { destroy }. */
export function art(name, host) {
  const spec = SPECS[name];
  if (!spec || !host) return null;
  if (host.__art) { try { host.__art.destroy(); } catch (e) { /* عادي */ } host.__art = null; }
  HL.inject(document);
  host.innerHTML = '';
  host.setAttribute('data-hairline', name);
  host.setAttribute('role', 'img');
  host.setAttribute('aria-label', spec.means);
  const svg = HL.mk('svg', { viewBox: '0 0 400 320', 'aria-hidden': 'true' }, host);
  const read = { get textContent() { return ''; }, set textContent(v) { /* مفيش سطر قراءة هنا */ } };
  const h = spec.mount({ stage: host, svg: svg, read: read }, spec.range[1]);
  let tour = null;
  try { tour = HL.tour(host, spec.tour || HL.LAP, function () {}); } catch (e) { tour = null; }
  const api = { destroy: function () { try { if (tour) tour.stop(); } catch (e) { /* عادي */ } h.destroy(); host.__art = null; } };
  host.__art = api;
  return api;
}
