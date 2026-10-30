import { W as jg, d as Eg, A as Dg, r as Ig, t as kg, u as Si, v as G, w as _e, b as nr, x as wl, M as ie, y as Rg, n as Sr, z as Pl, B as Yr, f as bi, h as Tl, j as Sl, F as zg, q as Te, D as Lg, H as Fg, p as Bg, G as pt, a as Vg, l as Fe, k as sr, E as wi, I as qn, J as Pi, K as Xr, O as Ng, N as Qe, C as Ug, i as xl, Q as Gg, U as Ti, V as st, R as Gn, X as Hn, Y as Hg, Z as qg, _ as $g, o as Wg, $ as Kg, a0 as Xg, g as Yg, s as gl, S as Jg, P as Qg, c as Zg } from "./chunks/archetypes-CtYrZcIt.js";
function e0(w, l, u) {
  const h = document.createElement("canvas");
  h.setAttribute("aria-hidden", "true"), h.setAttribute("role", "none"), h.style.position = "absolute", h.style.top = "0", h.style.left = "0", h.style.width = "100%", h.style.height = "100%", h.style.display = "block", h.style.pointerEvents = "none", w.appendChild(h);
  const m = new jg({
    canvas: h,
    antialias: l === "high",
    powerPreference: "high-performance",
    alpha: !1,
    stencil: !1,
    depth: !0
  });
  m.outputColorSpace = Eg, m.toneMapping = Dg, m.toneMappingExposure = 1, l === "high" ? (m.shadowMap.enabled = !0, m.shadowMap.type = Ig) : m.shadowMap.enabled = !1;
  const g = l === "high" ? 2 : 1.25;
  let P = Math.min(window.devicePixelRatio || 1, g);
  m.setPixelRatio(P);
  let M = w.clientWidth || window.innerWidth, x = w.clientHeight || window.innerHeight;
  m.setSize(M, x, !1);
  const T = /* @__PURE__ */ new Set(), I = /* @__PURE__ */ new Set(), E = new ResizeObserver((f) => {
    for (const F of f) {
      const O = F.contentRect, _ = Math.round(O.width), k = Math.round(O.height);
      if (_ > 0 && k > 0 && (_ !== M || k !== x)) {
        M = _, x = k, m.setSize(_, k, !1);
        for (const R of T) R(_, k);
      }
    }
  });
  E.observe(w);
  let j = !0;
  const S = new IntersectionObserver(
    (f) => {
      for (const F of f)
        j = F.isIntersecting, Y();
    },
    { rootMargin: "100px 0px 100px 0px" }
  );
  S.observe(w);
  const z = () => {
    Y();
  };
  document.addEventListener("visibilitychange", z);
  let H = !document.hidden;
  function Y() {
    H = !document.hidden && j;
    for (const f of I)
      f(H);
  }
  const X = (f) => {
    f.preventDefault(), console.warn("[kedia3d] WebGL context lost. Gracefully falling back."), u && u();
  };
  return h.addEventListener("webglcontextlost", X, !1), {
    renderer: m,
    canvas: h,
    container: w,
    get width() {
      return M;
    },
    get height() {
      return x;
    },
    get pixelRatio() {
      return P;
    },
    setPixelRatio: (f) => {
      P = Math.min(f, g), m.setPixelRatio(P);
    },
    onResize(f) {
      return T.add(f), () => T.delete(f);
    },
    onVisibilityChange(f) {
      return I.add(f), () => I.delete(f);
    },
    dispose: () => {
      E.disconnect(), S.disconnect(), document.removeEventListener("visibilitychange", z), h.removeEventListener("webglcontextlost", X), T.clear(), I.clear(), m.dispose(), h.parentElement && h.parentElement.removeChild(h);
    }
  };
}
function t0(w) {
  const l = /* @__PURE__ */ new Set();
  let u = null, h = !1, m = !1, g = performance.now();
  const P = [];
  let M = 60, x = !1;
  if (typeof navigator < "u" && "getBattery" in navigator)
    try {
      navigator.getBattery().then((D) => {
        const q = () => {
          x = !D.charging && D.level <= 0.25;
        };
        q(), D.addEventListener("levelchange", q), D.addEventListener("chargingchange", q);
      }).catch(() => {
      });
    } catch {
    }
  let T = 0, I = performance.now();
  function E(D) {
    if (!h) return;
    if (m) {
      g = D, u = requestAnimationFrame(E);
      return;
    }
    if (((w?.getTier() ?? "high") === "low" || x) && D - g < 32) {
      u = requestAnimationFrame(E);
      return;
    }
    const F = (D - g) / 1e3;
    g = D;
    const O = Math.min(Math.max(F, 1e-3), 0.1);
    P.push(O), P.length > 60 && P.shift();
    const _ = P.reduce((k, R) => k + R, 0);
    if (_ > 0 && (M = P.length / _), w && w.getTier() === "high") {
      const k = (D - I) / 1e3;
      if (M < 45 ? T += O : T = Math.max(0, T - O * 0.5), T > 2 && k > 8) {
        const R = w.currentPixelRatio();
        R > 1.25 ? (w.onAdjustPixelRatio(Math.max(1, R - 0.25)), T = 0, I = D) : M < 30 && (w.onDropQuality("low", "FPS critically low (<30)"), T = 0, I = D);
      }
    }
    for (const k of l)
      try {
        k(O, D * 1e-3);
      } catch (R) {
        console.error("[kedia3d] Error in loop update callback:", R);
      }
    u = requestAnimationFrame(E);
  }
  const j = () => {
    h || (h = !0, m = !1, g = performance.now(), u = requestAnimationFrame(E));
  }, S = () => {
    h = !1, u !== null && (cancelAnimationFrame(u), u = null);
  };
  return {
    add: (D) => (l.add(D), () => l.delete(D)),
    start: j,
    stop: S,
    pause: () => {
      m = !0;
    },
    resume: () => {
      m && (m = !1, g = performance.now());
    },
    getFps: () => M,
    dispose: () => {
      S(), l.clear();
    }
  };
}
async function r0(w, l = 7) {
  const u = /* @__PURE__ */ new Set();
  let h = 0, m = 0, g = null;
  const P = await n0(3e3), M = window.gsap, x = window.ScrollTrigger;
  P && x && P.on("scroll", x.update);
  const T = (S) => {
    h = Math.min(Math.max(S, 0), 1);
    const z = Math.floor(h * l);
    m = Math.min(z, l - 1);
    for (const H of u)
      H(h, m);
  };
  if (M && x)
    g = x.create({
      trigger: w,
      start: "top top",
      end: "bottom bottom",
      scrub: !0,
      onUpdate: (S) => {
        T(S.progress);
      }
    });
  else {
    const S = () => {
      const z = w.getBoundingClientRect(), H = window.innerHeight, Y = w.offsetHeight - H;
      if (Y > 0) {
        const X = -z.top;
        T(X / Y);
      }
    };
    window.addEventListener("scroll", S, { passive: !0 });
  }
  return {
    get progress() {
      return h;
    },
    get chapterIndex() {
      return m;
    },
    goToChapter: (S, z = !1) => {
      const Y = (Math.max(0, Math.min(S, l - 1)) + 0.5) / l;
      let X = 0;
      if (g && g.end > g.start) {
        const D = g.start, q = g.end;
        X = D + Y * (q - D);
      } else {
        const D = w.getBoundingClientRect().top + window.scrollY, q = w.offsetHeight - window.innerHeight;
        X = D + Y * q;
      }
      window.lenisInstance && typeof window.lenisInstance.scrollTo == "function" ? window.lenisInstance.scrollTo(X, { immediate: z, duration: z ? 0 : 1.2 }) : window.scrollTo({ top: X, behavior: z ? "auto" : "smooth" });
    },
    onProgress(S) {
      return u.add(S), S(h, m), () => u.delete(S);
    },
    refresh: () => {
      g && typeof g.refresh == "function" && g.refresh();
    },
    dispose: () => {
      g && (g.kill(), g = null), u.clear();
    }
  };
}
function n0(w = 3e3) {
  return new Promise((l) => {
    if (window.lenisInstance) {
      l(window.lenisInstance);
      return;
    }
    const u = performance.now(), h = setInterval(() => {
      window.lenisInstance ? (clearInterval(h), l(window.lenisInstance)) : performance.now() - u > w && (clearInterval(h), l(null));
    }, 50);
  });
}
function s0() {
  const w = document.getElementById("bar");
  let l = !1, u = !1;
  const h = new kg();
  h.onProgress = (M, x, T) => {
    if (w && T > 0) {
      const I = Math.round(x / T * 100);
      w.style.width = `${I}%`;
    }
  }, h.onLoad = () => {
    u = !0, P();
  };
  const m = () => {
    l = !0, P();
  }, g = () => {
    document.getElementById("loader") && w && (w.style.width = "100%");
  };
  function P() {
    l && u && g();
  }
  return {
    manager: h,
    onFirstFrameReady: m,
    finish: g
  };
}
function o0(w = document.body) {
  const l = window.matchMedia("(pointer: fine)").matches, u = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!l || u)
    return {
      setHoverState: () => {
      },
      dispose: () => {
      }
    };
  const h = document.createElement("div");
  h.className = "kedia-cursor", h.setAttribute("aria-hidden", "true");
  const m = document.createElement("div");
  m.className = "kedia-cursor-dot";
  const g = document.createElement("div");
  g.className = "kedia-cursor-ring";
  const P = document.createElement("span");
  P.className = "kedia-cursor-label", P.textContent = "", g.appendChild(P), h.appendChild(m), h.appendChild(g), w.appendChild(h);
  let M = -100, x = -100, T = -100, I = -100, E = !1, j = !1, S = !1, z = "", H = 0;
  const Y = (_) => {
    M = _.clientX, x = _.clientY, E || (E = !0, T = M, I = x, h.classList.add("is-visible"));
    const k = _.target;
    if (k) {
      const R = k.matches('input, textarea, select, [contenteditable="true"]') || k.closest('input, textarea, select, [contenteditable="true"]') !== null;
      R !== S && (S = R, h.classList.toggle("is-hidden", S));
    }
  }, X = () => {
    E = !1, h.classList.remove("is-visible");
  }, D = () => {
    h.classList.add("is-pressed");
  }, q = () => {
    h.classList.remove("is-pressed");
  };
  window.addEventListener("mousemove", Y, { passive: !0 }), document.addEventListener("mouseleave", X, { passive: !0 }), window.addEventListener("mousedown", D, { passive: !0 }), window.addEventListener("mouseup", q, { passive: !0 });
  const f = () => {
    m.style.transform = `translate3d(${M}px, ${x}px, 0) translate(-50%, -50%)`;
    const _ = 0.16;
    T += (M - T) * _, I += (x - I) * _, g.style.transform = `translate3d(${T}px, ${I}px, 0) translate(-50%, -50%)`, H = requestAnimationFrame(f);
  };
  return H = requestAnimationFrame(f), {
    setHoverState: (_, k = "VIEW") => {
      j = _, z = _ ? k : "", P.textContent = z, h.classList.toggle("is-hovering", j);
    },
    dispose: () => {
      cancelAnimationFrame(H), window.removeEventListener("mousemove", Y), document.removeEventListener("mouseleave", X), window.removeEventListener("mousedown", D), window.removeEventListener("mouseup", q), h.parentElement && h.parentElement.removeChild(h);
    }
  };
}
const i0 = [
  "Hero",
  "Fly",
  "Map",
  "Portfolio",
  "Build",
  "Live",
  "Finish"
];
function a0(w, l) {
  const u = document.createElement("nav");
  u.className = "kedia-progress-rail", u.setAttribute("aria-label", "3D Journey Chapters Navigation");
  const h = [];
  i0.forEach((M, x) => {
    const T = document.createElement("div");
    T.className = "kedia-progress-item";
    const I = document.createElement("button");
    I.type = "button", I.className = "kedia-progress-dot", I.setAttribute("aria-label", `Chapter ${x + 1}: ${M}`), I.setAttribute("data-index", x.toString());
    const E = document.createElement("span");
    E.className = "kedia-dot-inner", I.appendChild(E);
    const j = document.createElement("span");
    j.className = "kedia-progress-label", j.textContent = `${(x + 1).toString().padStart(2, "0")} · ${M}`, I.appendChild(j), I.addEventListener("click", (S) => {
      S.preventDefault(), l(x);
    }), T.appendChild(I), u.appendChild(T), h.push(T);
  }), w.appendChild(u);
  let m = 0;
  return h[0]?.classList.add("is-active"), {
    setActiveChapter: (M) => {
      M !== m && (m = M, h.forEach((x, T) => {
        T === M ? (x.classList.add("is-active"), x.querySelector("button")?.setAttribute("aria-current", "step")) : (x.classList.remove("is-active"), x.querySelector("button")?.removeAttribute("aria-current"));
      }));
    },
    dispose: () => {
      u.parentElement && u.parentElement.removeChild(u);
    }
  };
}
const ml = "kedia_audio";
function l0(w = document.body) {
  let l = localStorage.getItem(ml) === "on", u = null, h = null, m = null, g = null, P = !1, M = null;
  const x = [], T = document.createElement("button");
  T.type = "button", T.className = "kedia-audio-toggle", T.setAttribute("aria-label", "Toggle ambient 3D sound"), T.setAttribute("aria-pressed", l ? "true" : "false");
  const I = (_) => {
    T.innerHTML = `
      <span class="audio-icon ${_ ? "is-playing" : "is-muted"}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${_ ? '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>' : '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>'}
        </svg>
      </span>
      <span class="audio-label">${_ ? "SOUND ON" : "SOUND OFF"}</span>
    `, T.classList.toggle("is-active", _);
  };
  I(l), w.appendChild(T);
  function E() {
    if (!u) {
      const _ = window.AudioContext || window.webkitAudioContext;
      u = new _(), h = u.createGain(), h.gain.setValueAtTime(0, u.currentTime), h.connect(u.destination), m = u.createGain(), m.gain.setValueAtTime(0.35, u.currentTime), m.connect(h), g = u.createGain(), g.gain.setValueAtTime(0.25, u.currentTime), g.connect(h);
    }
    return u;
  }
  function j() {
    const _ = E();
    if (P) return;
    P = !0;
    const k = [73.42, 110, 174.61, 220], R = _.createBiquadFilter();
    R.type = "lowpass", R.frequency.setValueAtTime(420, _.currentTime), R.Q.setValueAtTime(3, _.currentTime), R.connect(m);
    const N = _.createOscillator();
    N.frequency.setValueAtTime(0.08, _.currentTime);
    const B = _.createGain();
    B.gain.setValueAtTime(140, _.currentTime), N.connect(B), B.connect(R.frequency), N.start(), x.push(N), k.forEach((W, ee) => {
      const J = _.createOscillator();
      J.type = ee % 2 === 0 ? "sine" : "triangle", J.frequency.setValueAtTime(W, _.currentTime), J.detune.setValueAtTime((Math.random() - 0.5) * 8, _.currentTime);
      const Q = _.createGain();
      Q.gain.setValueAtTime(0.2 / k.length, _.currentTime), J.connect(Q), Q.connect(R), J.start(), x.push(J);
    }), z();
  }
  const S = [587.33, 698.46, 783.99, 880, 1046.5];
  function z() {
    if (!P || !u) return;
    const _ = (Math.random() * 5 + 6) * 1e3;
    M = window.setTimeout(() => {
      H(), z();
    }, _);
  }
  function H() {
    if (!u || !P || h?.gain.value === 0) return;
    const _ = S[Math.floor(Math.random() * S.length)], k = u.createOscillator(), R = u.createGain();
    k.type = "sine", k.frequency.setValueAtTime(_, u.currentTime), R.gain.setValueAtTime(0.08, u.currentTime), R.gain.exponentialRampToValueAtTime(1e-4, u.currentTime + 3.2), k.connect(R), R.connect(m), k.start(), k.stop(u.currentTime + 3.3);
  }
  function Y() {
    const _ = E();
    _.state === "suspended" && _.resume(), j(), h?.gain.cancelScheduledValues(_.currentTime), h?.gain.setValueAtTime(h.gain.value, _.currentTime), h?.gain.linearRampToValueAtTime(0.75, _.currentTime + 1.6);
  }
  function X() {
    u && (h?.gain.cancelScheduledValues(u.currentTime), h?.gain.setValueAtTime(h.gain.value, u.currentTime), h?.gain.linearRampToValueAtTime(1e-4, u.currentTime + 0.9));
  }
  const D = () => (l = !l, localStorage.setItem(ml, l ? "on" : "off"), I(l), l ? Y() : X(), l);
  T.addEventListener("click", (_) => {
    _.preventDefault(), D();
  });
  const q = () => {
    if (!(!l || !u || !P))
      try {
        const _ = u.createOscillator(), k = u.createGain();
        _.type = "sine", _.frequency.setValueAtTime(880, u.currentTime), _.frequency.exponentialRampToValueAtTime(1320, u.currentTime + 0.05), k.gain.setValueAtTime(0.04, u.currentTime), k.gain.exponentialRampToValueAtTime(1e-3, u.currentTime + 0.06), _.connect(k), k.connect(g), _.start(), _.stop(u.currentTime + 0.07);
      } catch {
      }
  }, f = () => {
    if (!(!l || !u || !P))
      try {
        const _ = u.createOscillator(), k = u.createGain();
        _.type = "triangle", _.frequency.setValueAtTime(520, u.currentTime), _.frequency.exponentialRampToValueAtTime(260, u.currentTime + 0.08), k.gain.setValueAtTime(0.08, u.currentTime), k.gain.exponentialRampToValueAtTime(1e-3, u.currentTime + 0.09), _.connect(k), k.connect(g), _.start(), _.stop(u.currentTime + 0.1);
      } catch {
      }
  }, F = () => {
    document.hidden ? u?.suspend().catch(() => {
    }) : l && P && u?.resume().catch(() => {
    });
  };
  return document.addEventListener("visibilitychange", F), {
    toggle: D,
    isEnabled: () => l,
    playHoverSfx: q,
    playClickSfx: f,
    dispose: () => {
      document.removeEventListener("visibilitychange", F), M && clearTimeout(M), x.forEach((_) => {
        try {
          _.stop(), _.disconnect();
        } catch {
        }
      }), u?.close(), T.parentElement && T.parentElement.removeChild(T);
    }
  };
}
function c0(w) {
  const l = new Si(450, 32, 24), u = {
    topColor: { value: new _e(726832) },
    midColor: { value: new _e(1451594) },
    horizonColor: { value: new _e(13216106) },
    warmColor: { value: new _e(15255962) },
    sunPosition: { value: new G(50, 25, -200).normalize() },
    offset: { value: 15 },
    exponent: { value: 0.75 },
    duskMix: { value: 0.65 }
  }, h = `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `, m = `
    uniform vec3 topColor;
    uniform vec3 midColor;
    uniform vec3 horizonColor;
    uniform vec3 warmColor;
    uniform vec3 sunPosition;
    uniform float offset;
    uniform float exponent;
    uniform float duskMix;
    varying vec3 vWorldPosition;

    void main() {
      vec3 norm = normalize(vWorldPosition);
      float h = max(norm.y, 0.0);
      
      // Vertical gradient from horizon to zenith
      vec3 colBottom = mix(warmColor, horizonColor, smoothstep(0.0, 0.2, h));
      vec3 colMid = mix(colBottom, midColor, smoothstep(0.1, 0.45, h));
      vec3 col = mix(colMid, topColor, pow(h, exponent));

      // Sun glow aura
      float sunDot = max(dot(norm, sunPosition), 0.0);
      vec3 sunGlow = warmColor * pow(sunDot, 18.0) * 1.5;
      col += sunGlow * (1.0 - h * 0.7);

      gl_FragColor = vec4(col, 1.0);
    }
  `, g = new nr({
    vertexShader: h,
    fragmentShader: m,
    uniforms: u,
    side: wl,
    depthWrite: !1
  }), P = new ie(l, g);
  w.add(P);
  const M = new Rg(16, 32), x = new Sr({
    color: 16769712,
    transparent: !0,
    opacity: 0.9,
    depthWrite: !1,
    side: Pl
  }), T = new ie(M, x);
  T.position.set(50, 32, -380), T.lookAt(0, 32, 0), w.add(T);
  const I = 350, E = new Yr(), j = new Float32Array(I * 3);
  for (let ee = 0; ee < I; ee++) {
    const J = Math.random(), Q = Math.random(), $ = J * 2 * Math.PI, oe = Math.acos(2 * Q - 1), Ae = Math.abs(Math.sin(oe)) * 380 + 40, Be = Math.sqrt(Math.max(0, 420 * 420 - Ae * Ae)), ye = Be * Math.cos($), ze = Be * Math.sin($);
    j[ee * 3] = ye, j[ee * 3 + 1] = Ae, j[ee * 3 + 2] = ze;
  }
  E.setAttribute("position", new bi(j, 3));
  const S = new Tl({
    color: 16776956,
    size: 2.2,
    transparent: !0,
    opacity: 0.65,
    depthWrite: !1
  }), z = new Sl(E, S);
  w.add(z);
  const H = new _e(1714246), Y = new _e(3822970);
  w.fog = new zg(1714246, 35e-4);
  const X = new G(50, 30, -200), D = (ee) => {
    const J = Te.lerp(60, -10, ee);
    T.position.y = J, u.sunPosition.value.set(50, Math.max(J, 2), -200).normalize(), S.opacity = Te.clamp((ee - 0.3) * 1.5, 0.1, 0.85);
  }, q = new _e(726832), f = new _e(1451594), F = new _e(13216106), O = new _e(15255962), _ = new _e(4879517), k = new _e(15776371), R = new _e(16770208), N = new _e(16774624);
  return {
    mesh: P,
    sunDisc: T,
    stars: z,
    sunLightTarget: X,
    setSunProgress: D,
    setSunriseProgress: (ee) => {
      const J = Te.clamp(ee, 0, 1);
      u.topColor.value.copy(q).lerp(_, J), u.midColor.value.copy(f).lerp(k, J), u.horizonColor.value.copy(F).lerp(R, J), u.warmColor.value.copy(O).lerp(N, J);
      const Q = Te.lerp(32, 110, J);
      if (T.position.set(50, Q, -380), u.sunPosition.value.set(50, Q, -200).normalize(), S.opacity = Math.max(0, 0.65 * (1 - J * 1.5)), w.fog && w.fog.isFogExp2) {
        const $ = w.fog;
        $.color.copy(H).lerp(Y, J), $.density = Te.lerp(35e-4, 18e-4, J);
      }
    },
    dispose: () => {
      w.remove(P), w.remove(T), w.remove(z), l.dispose(), g.dispose(), M.dispose(), x.dispose(), E.dispose(), S.dispose();
    }
  };
}
function u0(w, l) {
  const u = new Lg(16766880, 2.2);
  if (u.position.set(70, 45, 60), u.castShadow = l === "high", l === "high") {
    u.shadow.mapSize.width = 2048, u.shadow.mapSize.height = 2048, u.shadow.camera.near = 10, u.shadow.camera.far = 300;
    const j = 80;
    u.shadow.camera.left = -j, u.shadow.camera.right = j, u.shadow.camera.top = j, u.shadow.camera.bottom = -j, u.shadow.bias = -4e-4, u.shadow.normalBias = 0.02;
  }
  w.add(u);
  const h = new Fg(10465487, 1451594, 0.85);
  h.position.set(0, 100, 0), w.add(h);
  const m = new Bg(16776956, 0.25);
  w.add(m);
  const g = (j) => {
    const S = (1 - j) * Math.PI * 0.4 + 0.15;
    u.position.x = Math.cos(S) * 100, u.position.y = Math.sin(S) * 70, u.position.z = Math.sin(S) * 50, u.intensity = Te.lerp(2.4, 0.4, j), h.intensity = Te.lerp(0.9, 0.35, j), m.intensity = Te.lerp(0.25, 0.15, j);
  }, P = new _e(16766880), M = new _e(16774885), x = new _e(10465487), T = new _e(10536168);
  return {
    dirLight: u,
    hemiLight: h,
    ambientLight: m,
    setTimeOfDay: g,
    setSunrise: (j) => {
      const S = Te.clamp(j, 0, 1);
      u.position.set(
        Te.lerp(70, 45, S),
        Te.lerp(45, 95, S),
        Te.lerp(60, 50, S)
      ), u.color.copy(P).lerp(M, S), u.intensity = Te.lerp(2.2, 2.8, S), h.color.copy(x).lerp(T, S), h.intensity = Te.lerp(0.85, 1.15, S), m.intensity = Te.lerp(0.25, 0.4, S);
    },
    dispose: () => {
      w.remove(u), w.remove(h), w.remove(m), u.shadow.map && u.shadow.map.dispose();
    }
  };
}
function d0(w) {
  const l = new pt(), u = new Vg(360, 360, 48, 48);
  u.rotateX(-Math.PI / 2);
  const h = u.attributes.position;
  for (let j = 0; j < h.count; j++) {
    const S = h.getX(j), z = h.getZ(j), H = Math.sqrt(S * S + z * z);
    if (H > 42) {
      const Y = Math.min((H - 42) / 70, 1), X = Math.sin(S * 0.035) * Math.cos(z * 0.035) * 3.5 + Math.sin(S * 0.08 + 1.2) * Math.cos(z * 0.07 + 0.8) * 1.5;
      h.setY(j, X * Y);
    } else
      h.setY(j, 0);
  }
  u.computeVertexNormals();
  const m = new Fe({
    color: 14733502,
    roughness: 0.9,
    metalness: 0.05,
    flatShading: !0
  }), g = new ie(u, m);
  g.receiveShadow = !0, l.add(g);
  const P = new Fe({
    color: 1582140,
    roughness: 0.7,
    metalness: 0.2
  }), M = new Sr({
    color: 13216106
  });
  function x(j, S = 4) {
    const z = new wi(j), H = z.getPoints(60), Y = new Yr(), X = [], D = [], q = [], f = [], F = S * 0.5;
    for (let R = 0; R < H.length; R++) {
      const N = H[R], B = z.getTangent(R / (H.length - 1)), W = new G(-B.z, 0, B.x).normalize(), ee = N.clone().addScaledVector(W, -F), J = N.clone().addScaledVector(W, F);
      ee.y += 0.08, J.y += 0.08, X.push(ee.x, ee.y, ee.z), X.push(J.x, J.y, J.z);
      const Q = N.clone().addScaledVector(W, -0.15), $ = N.clone().addScaledVector(W, 0.15);
      if (Q.y += 0.12, $.y += 0.12, q.push(Q.x, Q.y, Q.z), q.push($.x, $.y, $.z), R < H.length - 1) {
        const oe = R * 2;
        D.push(oe, oe + 1, oe + 2), D.push(oe + 1, oe + 3, oe + 2), f.push(oe, oe + 1, oe + 2), f.push(oe + 1, oe + 3, oe + 2);
      }
    }
    Y.setAttribute("position", new qn(X, 3)), Y.setIndex(D), Y.computeVertexNormals();
    const O = new ie(Y, P);
    O.receiveShadow = !0, l.add(O);
    const _ = new Yr();
    _.setAttribute("position", new qn(q, 3)), _.setIndex(f);
    const k = new ie(_, M);
    l.add(k);
  }
  x([
    new G(0, 0, 24),
    new G(-10, 0, 70),
    new G(-25, 0, 130),
    new G(-35, 0, 180)
  ]), x([
    new G(-15, 0, 0),
    new G(-60, 0, -35),
    new G(-110, 0, -80),
    new G(-160, 0, -130)
  ]), x([
    new G(-150, 0, -40),
    new G(-80, 0, 60),
    new G(40, 0, 90),
    new G(120, 0, 20)
  ]);
  const T = new pt(), I = [
    { radius: 240, heightScale: 28, color: 1978720, count: 64 },
    // Mid layer
    { radius: 310, heightScale: 42, color: 1451594, count: 72 },
    // Far layer
    { radius: 380, heightScale: 58, color: 726832, count: 80 }
    // Outer silhouette
  ];
  for (const j of I) {
    const S = new sr(
      j.radius,
      j.radius * 1.05,
      j.heightScale,
      j.count,
      3,
      !0
    ), z = S.attributes.position;
    for (let X = 0; X < z.count; X++) {
      const D = z.getY(X), q = Math.atan2(z.getZ(X), z.getX(X)), f = Math.sin(q * 6) * 0.45 + Math.cos(q * 14) * 0.25 + Math.sin(q * 28) * 0.15;
      D > 0 && z.setY(X, D * (0.6 + f));
    }
    S.computeVertexNormals();
    const H = new Sr({
      color: j.color,
      side: wl,
      fog: !0
    }), Y = new ie(S, H);
    Y.position.y = j.heightScale * 0.35, T.add(Y);
  }
  return l.add(T), w.add(l), {
    group: l,
    dispose: () => {
      w.remove(l), u.dispose(), m.dispose(), P.dispose(), M.dispose();
    }
  };
}
function f0(w) {
  const l = new pt(), u = 120, h = new Pi(1.6, 3.8, 6);
  h.translate(0, 2.5, 0);
  const m = new Fe({
    color: 2837560,
    roughness: 0.85,
    flatShading: !0
  }), g = new Xr(h, m, u);
  g.castShadow = !0, g.receiveShadow = !0;
  const P = new Ng();
  let M = 0;
  for (let N = 0; N < u; N++) {
    const B = Math.random() * Math.PI * 2, W = 35 + Math.random() * 95, ee = Math.cos(B) * W, J = Math.sin(B) * W;
    P.position.set(ee, 0, J);
    const Q = 0.75 + Math.random() * 0.7;
    P.scale.set(Q, Q * (0.9 + Math.random() * 0.4), Q), P.rotation.y = Math.random() * Math.PI * 2, P.updateMatrix(), g.setMatrixAt(M++, P.matrix);
  }
  g.instanceMatrix.needsUpdate = !0, l.add(g);
  const x = 32, T = new sr(0.08, 0.1, 3.2, 5);
  T.translate(0, 1.6, 0);
  const I = new Fe({
    color: 1451594,
    roughness: 0.4,
    metalness: 0.8
  }), E = new Xr(T, I, x), j = new Si(0.22, 8, 8);
  j.translate(0, 3.2, 0);
  const S = new Fe({
    color: 16766880,
    emissive: 16755008,
    emissiveIntensity: 2.2
  }), z = new Xr(j, S, x);
  let H = 0;
  for (let N = -20; N <= 24 && (P.position.set(-3.2, 0, N), P.scale.set(1, 1, 1), P.rotation.set(0, 0, 0), P.updateMatrix(), E.setMatrixAt(H, P.matrix), z.setMatrixAt(H, P.matrix), H++, P.position.set(3.2, 0, N), P.updateMatrix(), E.setMatrixAt(H, P.matrix), z.setMatrixAt(H, P.matrix), H++, !(H >= x)); N += 3.2)
    ;
  E.instanceMatrix.needsUpdate = !0, z.instanceMatrix.needsUpdate = !0, l.add(E), l.add(z);
  const Y = 48, X = new Qe(4, 3, 4.8);
  X.translate(0, 1.5, 0);
  const D = new Fe({
    color: 15920089,
    roughness: 0.75
  }), q = new Xr(X, D, Y);
  q.castShadow = !0, q.receiveShadow = !0;
  const f = new Pi(3.6, 1.6, 4);
  f.rotateY(Math.PI / 4), f.translate(0, 3.8, 0);
  const F = new Fe({
    color: 9129016,
    // Terracotta tile roof
    roughness: 0.8
  }), O = new Xr(f, F, Y);
  O.castShadow = !0;
  let _ = 0;
  const k = [
    { cx: -80, cz: 40, count: 16 },
    { cx: 75, cz: -60, count: 16 },
    { cx: -50, cz: -90, count: 16 }
  ];
  for (const N of k)
    for (let B = 0; B < N.count; B++) {
      const W = N.cx + (Math.random() - 0.5) * 35, ee = N.cz + (Math.random() - 0.5) * 35;
      P.position.set(W, 0, ee);
      const J = Math.floor(Math.random() * 4) * Math.PI / 2;
      P.rotation.set(0, J, 0);
      const Q = 0.8 + Math.random() * 0.4;
      P.scale.set(Q, Q, Q), P.updateMatrix(), q.setMatrixAt(_, P.matrix), O.setMatrixAt(_, P.matrix), _++;
    }
  return q.instanceMatrix.needsUpdate = !0, O.instanceMatrix.needsUpdate = !0, l.add(q), l.add(O), w.add(l), {
    treesMesh: g,
    lampsMesh: E,
    lampBulbsMesh: z,
    housesMesh: q,
    roofsMesh: O,
    dispose: () => {
      w.remove(l), h.dispose(), m.dispose(), T.dispose(), I.dispose(), j.dispose(), S.dispose(), X.dispose(), D.dispose(), f.dispose(), F.dispose();
    }
  };
}
function p0(w) {
  const l = new pt();
  l.name = "hero-estate";
  const u = new Fe({
    color: 16051937,
    roughness: 0.6,
    metalness: 0.05
  }), h = new Fe({
    color: 13216106,
    roughness: 0.45,
    metalness: 0.25
  }), m = new Fe({
    color: 1978720,
    roughness: 0.8
  }), g = new Fe({
    color: 16766880,
    emissive: 16755264,
    emissiveIntensity: 1.8,
    roughness: 0.3
  }), P = new Fe({
    color: 14274232,
    roughness: 0.85
  }), M = new Fe({
    color: 3035708,
    roughness: 0.9
  }), x = new Qe(54, 0.4, 54);
  x.translate(0, 0.2, 0);
  const T = new ie(x, P);
  T.receiveShadow = !0, l.add(T);
  const I = new Qe(16, 0.45, 26);
  I.translate(0, 0.22, 0);
  const E = new ie(I, M);
  E.receiveShadow = !0, l.add(E);
  const j = 0.6, S = 2.4, z = new Qe(j, S, 52);
  z.translate(0, S / 2 + 0.4, 0);
  const H = new ie(z, u);
  H.position.x = -26, H.castShadow = !0, l.add(H);
  const Y = new ie(z, u);
  Y.position.x = 26, Y.castShadow = !0, l.add(Y);
  const X = new Qe(52, S, j);
  X.translate(0, S / 2 + 0.4, 0);
  const D = new ie(X, u);
  D.position.z = -26, D.castShadow = !0, l.add(D);
  const q = new Qe(20, S, j);
  q.translate(0, S / 2 + 0.4, 0);
  const f = new ie(q, u);
  f.position.set(-15, 0, 26), f.castShadow = !0, l.add(f);
  const F = new ie(q, u);
  F.position.set(15, 0, 26), F.castShadow = !0, l.add(F);
  const O = new pt();
  O.position.set(0, 0, 26);
  const _ = new Qe(1.4, 4.6, 1.4);
  _.translate(0, 2.3, 0);
  const k = new ie(_, h);
  k.position.x = -4.5, k.castShadow = !0, O.add(k);
  const R = new ie(_, h);
  R.position.x = 4.5, R.castShadow = !0, O.add(R);
  const N = new Qe(11, 0.9, 1.8);
  N.translate(0, 4.8, 0);
  const B = new ie(N, h);
  B.castShadow = !0, O.add(B);
  const W = new sr(1.8, 2.2, 0.6, 8);
  W.translate(0, 5.5, 0);
  const ee = new ie(W, u);
  O.add(ee);
  const J = new Si(1.6, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  J.translate(0, 5.8, 0);
  const Q = new ie(J, h);
  O.add(Q);
  const $ = new Pi(0.3, 0.8, 8);
  $.translate(0, 7.6, 0);
  const oe = new ie($, h);
  O.add(oe), l.add(O);
  const Ae = new pt();
  Ae.position.set(0, 0, -2);
  const Be = new Qe(6, 3.2, 6);
  Be.translate(0, 1.6 + 0.4, 0);
  const ye = new ie(Be, u);
  ye.castShadow = !0, Ae.add(ye);
  const ze = new sr(3.6, 4.2, 0.8, 8);
  ze.translate(0, 3.8, 0);
  const lt = new ie(ze, h);
  lt.castShadow = !0, Ae.add(lt);
  const Ze = new sr(2.4, 2.4, 0.35, 16);
  Ze.translate(0, 0.5, 7);
  const ct = new Fe({
    color: 3570844,
    roughness: 0.1,
    metalness: 0.8
  }), Se = new ie(Ze, ct);
  Ae.add(Se), l.add(Ae);
  const ot = new Qe(6.2, 4.2, 5.2);
  ot.translate(0, 2.1 + 0.4, 0);
  const Me = new Qe(6.6, 0.5, 5.6);
  Me.translate(0, 4.4 + 0.4, 0);
  const Ge = new Qe(1.2, 1.2, 0.15), et = [
    { x: -16, z: -18 },
    { x: -9, z: -18 },
    { x: -16, z: -8 },
    { x: -9, z: -8 },
    { x: -16, z: 2 },
    { x: -9, z: 2 },
    { x: -16, z: 12 },
    { x: -9, z: 12 }
  ], ht = [
    { x: 9, z: -18 },
    { x: 16, z: -18 },
    { x: 9, z: -8 },
    { x: 16, z: -8 },
    { x: 9, z: 2 },
    { x: 16, z: 2 },
    { x: 9, z: 12 },
    { x: 16, z: 12 }
  ], tt = [...et, ...ht];
  for (const it of tt) {
    const V = new pt();
    V.position.set(it.x, 0, it.z);
    const ne = new ie(ot, u);
    ne.castShadow = !0, ne.receiveShadow = !0, V.add(ne);
    const be = new ie(Me, m);
    be.castShadow = !0, V.add(be);
    const ce = new ie(Ge, g);
    ce.position.set(-1.6, 2.2, 2.7), V.add(ce);
    const fe = new ie(Ge, g);
    fe.position.set(1.6, 2.2, 2.7), V.add(fe);
    const He = new ie(Ge, g);
    He.position.set(-1.6, 3.6, 2.7), V.add(He);
    const De = new ie(Ge, g);
    De.position.set(1.6, 3.6, 2.7), V.add(De), l.add(V);
  }
  return w.add(l), {
    group: l,
    windowsMat: g,
    setWindowGlow: (it) => {
      g.emissiveIntensity = it;
    },
    dispose: () => {
      w.remove(l), x.dispose(), I.dispose(), z.dispose(), X.dispose(), q.dispose(), _.dispose(), N.dispose(), W.dispose(), J.dispose(), $.dispose(), Be.dispose(), ze.dispose(), Ze.dispose(), ot.dispose(), Me.dispose(), Ge.dispose(), u.dispose(), h.dispose(), m.dispose(), g.dispose(), P.dispose(), M.dispose(), ct.dispose();
    }
  };
}
function h0(w, l) {
  const u = l === "high" ? 1200 : 300, h = document.createElement("canvas");
  h.width = 64, h.height = 64;
  const m = h.getContext("2d"), g = m.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255, 235, 180, 1.0)"), g.addColorStop(0.3, "rgba(201, 169, 106, 0.7)"), g.addColorStop(0.7, "rgba(201, 169, 106, 0.2)"), g.addColorStop(1, "rgba(22, 38, 74, 0.0)"), m.fillStyle = g, m.fillRect(0, 0, 64, 64);
  const P = new Ug(h), M = new Yr(), x = new Float32Array(u * 3), T = new Float32Array(u * 3), I = new Float32Array(u);
  for (let D = 0; D < u; D++)
    x[D * 3] = (Math.random() - 0.5) * 110, x[D * 3 + 1] = Math.random() * 26 + 0.5, x[D * 3 + 2] = (Math.random() - 0.5) * 110, T[D * 3] = (Math.random() - 0.5) * 0.15, T[D * 3 + 1] = Math.random() * 0.25 + 0.05, T[D * 3 + 2] = (Math.random() - 0.5) * 0.15, I[D] = Math.random() * 0.8 + 0.4;
  M.setAttribute("position", new bi(x, 3)), M.setAttribute("scale", new bi(I, 1));
  const E = new Tl({
    size: 0.85,
    map: P,
    transparent: !0,
    opacity: 0.75,
    blending: xl,
    depthWrite: !1,
    color: 16765573
  }), j = new Sl(M, E);
  w.add(j);
  const S = (D, q) => {
    const f = M.attributes.position, F = f.array;
    for (let O = 0; O < u; O++)
      F[O * 3 + 1] += T[O * 3 + 1] * D * 2.2, F[O * 3] += Math.sin(q + O) * D * 0.2, F[O * 3 + 2] += Math.cos(q + O * 0.7) * D * 0.2, F[O * 3 + 1] > 28 && (F[O * 3 + 1] = 0.5, F[O * 3] = (Math.random() - 0.5) * 110, F[O * 3 + 2] = (Math.random() - 0.5) * 110);
    f.needsUpdate = !0;
  }, z = new _e(16765573), H = new _e(16775915);
  return {
    points: j,
    update: S,
    setSunriseRays: (D) => {
      const q = Te.clamp(D, 0, 1);
      E.color.copy(z).lerp(H, q), E.size = Te.lerp(0.85, 1.4, q), E.opacity = Te.lerp(0.75, 0.88, q);
    },
    dispose: () => {
      w.remove(j), M.dispose(), E.dispose(), P.dispose();
    }
  };
}
const Cl = {
  name: "CopyShader",
  uniforms: {
    tDiffuse: { value: null },
    opacity: { value: 1 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`
  )
};
class Jr {
  constructor() {
    this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
  }
  setSize() {
  }
  render() {
    console.error("THREE.Pass: .render() must be implemented in derived pass.");
  }
  dispose() {
  }
}
const v0 = new Gg(-1, 1, 1, -1, 0, 1);
class g0 extends Yr {
  constructor() {
    super(), this.setAttribute("position", new qn([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), this.setAttribute("uv", new qn([0, 2, 0, 0, 2, 0], 2));
  }
}
const m0 = new g0();
class Al {
  constructor(l) {
    this._mesh = new ie(m0, l);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(l) {
    l.render(this._mesh, v0);
  }
  get material() {
    return this._mesh.material;
  }
  set material(l) {
    this._mesh.material = l;
  }
}
class Ml extends Jr {
  constructor(l, u) {
    super(), this.textureID = u !== void 0 ? u : "tDiffuse", l instanceof nr ? (this.uniforms = l.uniforms, this.material = l) : l && (this.uniforms = Ti.clone(l.uniforms), this.material = new nr({
      name: l.name !== void 0 ? l.name : "unspecified",
      defines: Object.assign({}, l.defines),
      uniforms: this.uniforms,
      vertexShader: l.vertexShader,
      fragmentShader: l.fragmentShader
    })), this.fsQuad = new Al(this.material);
  }
  render(l, u, h) {
    this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = h.texture), this.fsQuad.material = this.material, this.renderToScreen ? (l.setRenderTarget(null), this.fsQuad.render(l)) : (l.setRenderTarget(u), this.clear && l.clear(l.autoClearColor, l.autoClearDepth, l.autoClearStencil), this.fsQuad.render(l));
  }
  dispose() {
    this.material.dispose(), this.fsQuad.dispose();
  }
}
class yl extends Jr {
  constructor(l, u) {
    super(), this.scene = l, this.camera = u, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
  }
  render(l, u, h) {
    const m = l.getContext(), g = l.state;
    g.buffers.color.setMask(!1), g.buffers.depth.setMask(!1), g.buffers.color.setLocked(!0), g.buffers.depth.setLocked(!0);
    let P, M;
    this.inverse ? (P = 0, M = 1) : (P = 1, M = 0), g.buffers.stencil.setTest(!0), g.buffers.stencil.setOp(m.REPLACE, m.REPLACE, m.REPLACE), g.buffers.stencil.setFunc(m.ALWAYS, P, 4294967295), g.buffers.stencil.setClear(M), g.buffers.stencil.setLocked(!0), l.setRenderTarget(h), this.clear && l.clear(), l.render(this.scene, this.camera), l.setRenderTarget(u), this.clear && l.clear(), l.render(this.scene, this.camera), g.buffers.color.setLocked(!1), g.buffers.depth.setLocked(!1), g.buffers.color.setMask(!0), g.buffers.depth.setMask(!0), g.buffers.stencil.setLocked(!1), g.buffers.stencil.setFunc(m.EQUAL, 1, 4294967295), g.buffers.stencil.setOp(m.KEEP, m.KEEP, m.KEEP), g.buffers.stencil.setLocked(!0);
  }
}
class y0 extends Jr {
  constructor() {
    super(), this.needsSwap = !1;
  }
  render(l) {
    l.state.buffers.stencil.setLocked(!1), l.state.buffers.stencil.setTest(!1);
  }
}
class _0 {
  constructor(l, u) {
    if (this.renderer = l, this._pixelRatio = l.getPixelRatio(), u === void 0) {
      const h = l.getSize(new st());
      this._width = h.width, this._height = h.height, u = new Gn(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: Hn }), u.texture.name = "EffectComposer.rt1";
    } else
      this._width = u.width, this._height = u.height;
    this.renderTarget1 = u, this.renderTarget2 = u.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new Ml(Cl), this.copyPass.material.blending = Hg, this.clock = new qg();
  }
  swapBuffers() {
    const l = this.readBuffer;
    this.readBuffer = this.writeBuffer, this.writeBuffer = l;
  }
  addPass(l) {
    this.passes.push(l), l.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  insertPass(l, u) {
    this.passes.splice(u, 0, l), l.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
  }
  removePass(l) {
    const u = this.passes.indexOf(l);
    u !== -1 && this.passes.splice(u, 1);
  }
  isLastEnabledPass(l) {
    for (let u = l + 1; u < this.passes.length; u++)
      if (this.passes[u].enabled)
        return !1;
    return !0;
  }
  render(l) {
    l === void 0 && (l = this.clock.getDelta());
    const u = this.renderer.getRenderTarget();
    let h = !1;
    for (let m = 0, g = this.passes.length; m < g; m++) {
      const P = this.passes[m];
      if (P.enabled !== !1) {
        if (P.renderToScreen = this.renderToScreen && this.isLastEnabledPass(m), P.render(this.renderer, this.writeBuffer, this.readBuffer, l, h), P.needsSwap) {
          if (h) {
            const M = this.renderer.getContext(), x = this.renderer.state.buffers.stencil;
            x.setFunc(M.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, l), x.setFunc(M.EQUAL, 1, 4294967295);
          }
          this.swapBuffers();
        }
        yl !== void 0 && (P instanceof yl ? h = !0 : P instanceof y0 && (h = !1));
      }
    }
    this.renderer.setRenderTarget(u);
  }
  reset(l) {
    if (l === void 0) {
      const u = this.renderer.getSize(new st());
      this._pixelRatio = this.renderer.getPixelRatio(), this._width = u.width, this._height = u.height, l = this.renderTarget1.clone(), l.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = l, this.renderTarget2 = l.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
  }
  setSize(l, u) {
    this._width = l, this._height = u;
    const h = this._width * this._pixelRatio, m = this._height * this._pixelRatio;
    this.renderTarget1.setSize(h, m), this.renderTarget2.setSize(h, m);
    for (let g = 0; g < this.passes.length; g++)
      this.passes[g].setSize(h, m);
  }
  setPixelRatio(l) {
    this._pixelRatio = l, this.setSize(this._width, this._height);
  }
  dispose() {
    this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
  }
}
class b0 extends Jr {
  constructor(l, u, h = null, m = null, g = null) {
    super(), this.scene = l, this.camera = u, this.overrideMaterial = h, this.clearColor = m, this.clearAlpha = g, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this._oldClearColor = new _e();
  }
  render(l, u, h) {
    const m = l.autoClear;
    l.autoClear = !1;
    let g, P;
    this.overrideMaterial !== null && (P = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (l.getClearColor(this._oldClearColor), l.setClearColor(this.clearColor)), this.clearAlpha !== null && (g = l.getClearAlpha(), l.setClearAlpha(this.clearAlpha)), this.clearDepth == !0 && l.clearDepth(), l.setRenderTarget(this.renderToScreen ? null : h), this.clear === !0 && l.clear(l.autoClearColor, l.autoClearDepth, l.autoClearStencil), l.render(this.scene, this.camera), this.clearColor !== null && l.setClearColor(this._oldClearColor), this.clearAlpha !== null && l.setClearAlpha(g), this.overrideMaterial !== null && (this.scene.overrideMaterial = P), l.autoClear = m;
  }
}
const w0 = {
  uniforms: {
    tDiffuse: { value: null },
    luminosityThreshold: { value: 1 },
    smoothWidth: { value: 1 },
    defaultColor: { value: new _e(0) },
    defaultOpacity: { value: 0 }
  },
  vertexShader: (
    /* glsl */
    `

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`
  ),
  fragmentShader: (
    /* glsl */
    `

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`
  )
};
class xr extends Jr {
  constructor(l, u, h, m) {
    super(), this.strength = u !== void 0 ? u : 1, this.radius = h, this.threshold = m, this.resolution = l !== void 0 ? new st(l.x, l.y) : new st(256, 256), this.clearColor = new _e(0, 0, 0), this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    let g = Math.round(this.resolution.x / 2), P = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new Gn(g, P, { type: Hn }), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (let E = 0; E < this.nMips; E++) {
      const j = new Gn(g, P, { type: Hn });
      j.texture.name = "UnrealBloomPass.h" + E, j.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(j);
      const S = new Gn(g, P, { type: Hn });
      S.texture.name = "UnrealBloomPass.v" + E, S.texture.generateMipmaps = !1, this.renderTargetsVertical.push(S), g = Math.round(g / 2), P = Math.round(P / 2);
    }
    const M = w0;
    this.highPassUniforms = Ti.clone(M.uniforms), this.highPassUniforms.luminosityThreshold.value = m, this.highPassUniforms.smoothWidth.value = 0.01, this.materialHighPassFilter = new nr({
      uniforms: this.highPassUniforms,
      vertexShader: M.vertexShader,
      fragmentShader: M.fragmentShader
    }), this.separableBlurMaterials = [];
    const x = [3, 5, 7, 9, 11];
    g = Math.round(this.resolution.x / 2), P = Math.round(this.resolution.y / 2);
    for (let E = 0; E < this.nMips; E++)
      this.separableBlurMaterials.push(this.getSeperableBlurMaterial(x[E])), this.separableBlurMaterials[E].uniforms.invSize.value = new st(1 / g, 1 / P), g = Math.round(g / 2), P = Math.round(P / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = u, this.compositeMaterial.uniforms.bloomRadius.value = 0.1;
    const T = [1, 0.8, 0.6, 0.4, 0.2];
    this.compositeMaterial.uniforms.bloomFactors.value = T, this.bloomTintColors = [new G(1, 1, 1), new G(1, 1, 1), new G(1, 1, 1), new G(1, 1, 1), new G(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors;
    const I = Cl;
    this.copyUniforms = Ti.clone(I.uniforms), this.blendMaterial = new nr({
      uniforms: this.copyUniforms,
      vertexShader: I.vertexShader,
      fragmentShader: I.fragmentShader,
      blending: xl,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.enabled = !0, this.needsSwap = !1, this._oldClearColor = new _e(), this.oldClearAlpha = 1, this.basic = new Sr(), this.fsQuad = new Al(null);
  }
  dispose() {
    for (let l = 0; l < this.renderTargetsHorizontal.length; l++)
      this.renderTargetsHorizontal[l].dispose();
    for (let l = 0; l < this.renderTargetsVertical.length; l++)
      this.renderTargetsVertical[l].dispose();
    this.renderTargetBright.dispose();
    for (let l = 0; l < this.separableBlurMaterials.length; l++)
      this.separableBlurMaterials[l].dispose();
    this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this.basic.dispose(), this.fsQuad.dispose();
  }
  setSize(l, u) {
    let h = Math.round(l / 2), m = Math.round(u / 2);
    this.renderTargetBright.setSize(h, m);
    for (let g = 0; g < this.nMips; g++)
      this.renderTargetsHorizontal[g].setSize(h, m), this.renderTargetsVertical[g].setSize(h, m), this.separableBlurMaterials[g].uniforms.invSize.value = new st(1 / h, 1 / m), h = Math.round(h / 2), m = Math.round(m / 2);
  }
  render(l, u, h, m, g) {
    l.getClearColor(this._oldClearColor), this.oldClearAlpha = l.getClearAlpha();
    const P = l.autoClear;
    l.autoClear = !1, l.setClearColor(this.clearColor, 0), g && l.state.buffers.stencil.setTest(!1), this.renderToScreen && (this.fsQuad.material = this.basic, this.basic.map = h.texture, l.setRenderTarget(null), l.clear(), this.fsQuad.render(l)), this.highPassUniforms.tDiffuse.value = h.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.fsQuad.material = this.materialHighPassFilter, l.setRenderTarget(this.renderTargetBright), l.clear(), this.fsQuad.render(l);
    let M = this.renderTargetBright;
    for (let x = 0; x < this.nMips; x++)
      this.fsQuad.material = this.separableBlurMaterials[x], this.separableBlurMaterials[x].uniforms.colorTexture.value = M.texture, this.separableBlurMaterials[x].uniforms.direction.value = xr.BlurDirectionX, l.setRenderTarget(this.renderTargetsHorizontal[x]), l.clear(), this.fsQuad.render(l), this.separableBlurMaterials[x].uniforms.colorTexture.value = this.renderTargetsHorizontal[x].texture, this.separableBlurMaterials[x].uniforms.direction.value = xr.BlurDirectionY, l.setRenderTarget(this.renderTargetsVertical[x]), l.clear(), this.fsQuad.render(l), M = this.renderTargetsVertical[x];
    this.fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, l.setRenderTarget(this.renderTargetsHorizontal[0]), l.clear(), this.fsQuad.render(l), this.fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, g && l.state.buffers.stencil.setTest(!0), this.renderToScreen ? (l.setRenderTarget(null), this.fsQuad.render(l)) : (l.setRenderTarget(h), this.fsQuad.render(l)), l.setClearColor(this._oldClearColor, this.oldClearAlpha), l.autoClear = P;
  }
  getSeperableBlurMaterial(l) {
    const u = [];
    for (let h = 0; h < l; h++)
      u.push(0.39894 * Math.exp(-0.5 * h * h / (l * l)) / l);
    return new nr({
      defines: {
        KERNEL_RADIUS: l
      },
      uniforms: {
        colorTexture: { value: null },
        invSize: { value: new st(0.5, 0.5) },
        // inverse texture size
        direction: { value: new st(0.5, 0.5) },
        gaussianCoefficients: { value: u }
        // precomputed Gaussian coefficients
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`
    });
  }
  getCompositeMaterial(l) {
    return new nr({
      defines: {
        NUM_MIPS: l
      },
      uniforms: {
        blurTexture1: { value: null },
        blurTexture2: { value: null },
        blurTexture3: { value: null },
        blurTexture4: { value: null },
        blurTexture5: { value: null },
        bloomStrength: { value: 1 },
        bloomFactors: { value: null },
        bloomTintColors: { value: null },
        bloomRadius: { value: 0 }
      },
      vertexShader: `varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,
      fragmentShader: `varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`
    });
  }
}
xr.BlurDirectionX = new st(1, 0);
xr.BlurDirectionY = new st(0, 1);
const P0 = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: 1.05 },
    darkness: { value: 1.15 },
    grainAmount: { value: 0.015 },
    time: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float offset;
    uniform float darkness;
    uniform float grainAmount;
    uniform float time;
    varying vec2 vUv;

    // Simple pseudo-random hash
    float rand(vec2 co) {
      return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
    }

    void main() {
      vec4 tex = texture2D(tDiffuse, vUv);

      // Vignette
      vec2 uv = (vUv - vec2(0.5)) * vec2(offset);
      float dist = dot(uv, uv);
      float vig = clamp(1.0 - dist * (darkness - 0.5), 0.0, 1.0);
      tex.rgb *= vig;

      // Subtle warm grain
      float noise = (rand(vUv + time) - 0.5) * grainAmount;
      tex.rgb += noise;

      gl_FragColor = tex;
    }
  `
};
function T0(w, l, u, h, m, g) {
  if (h !== "high")
    return {
      composer: null,
      render: () => {
        w.render(l, u);
      },
      setSize: () => {
      },
      dispose: () => {
      }
    };
  const P = new _0(w);
  P.addPass(new b0(l, u));
  const M = new xr(
    new st(m, g),
    0.35,
    // strength
    0.6,
    // radius
    0.85
    // threshold (only emissive windows and streetlights glow)
  );
  P.addPass(M);
  const x = new Ml(P0);
  P.addPass(x);
  let T = 0;
  return {
    composer: P,
    render: (z) => {
      T += z, x.uniforms.time.value = T * 0.5, P.render(z);
    },
    setSize: (z, H) => {
      P.setSize(z, H), M.resolution.set(z, H);
    },
    setBloomStrength: (z) => {
      M.strength = z;
    },
    dispose: () => {
      P.dispose();
    }
  };
}
var ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $n = { exports: {} }, Pe = {};
(function(w) {
  var l = Object.defineProperty, u = Object.defineProperties, h = Object.getOwnPropertyDescriptors, m = Object.getOwnPropertySymbols, g = Object.prototype.hasOwnProperty, P = Object.prototype.propertyIsEnumerable, M = (s, a, d) => a in s ? l(s, a, { enumerable: !0, configurable: !0, writable: !0, value: d }) : s[a] = d, x = (s, a) => {
    for (var d in a || (a = {}))
      g.call(a, d) && M(s, d, a[d]);
    if (m)
      for (var d of m(a))
        P.call(a, d) && M(s, d, a[d]);
    return s;
  }, T = (s, a) => u(s, h(a)), I = (s) => l(s, "__esModule", { value: !0 }), E = (s, a) => {
    I(s);
    for (var d in a)
      l(s, d, { get: a[d], enumerable: !0 });
  };
  E(w, {
    Atom: () => Pn,
    PointerProxy: () => Mo,
    Ticker: () => Sn,
    getPointerParts: () => Bt,
    isPointer: () => mt,
    isPrism: () => gr,
    iterateAndCountTicks: () => xo,
    iterateOver: () => Ao,
    pointer: () => Dr,
    pointerToPrism: () => yr,
    prism: () => Gt,
    val: () => Fr
  });
  var j = Array.isArray, S = j, z = typeof ft == "object" && ft && ft.Object === Object && ft, H = z, Y = typeof self == "object" && self && self.Object === Object && self, X = H || Y || Function("return this")(), D = X, q = D.Symbol, f = q, F = Object.prototype, O = F.hasOwnProperty, _ = F.toString, k = f ? f.toStringTag : void 0;
  function R(s) {
    var a = O.call(s, k), d = s[k];
    try {
      s[k] = void 0;
      var y = !0;
    } catch {
    }
    var Z = _.call(s);
    return y && (a ? s[k] = d : delete s[k]), Z;
  }
  var N = R, B = Object.prototype, W = B.toString;
  function ee(s) {
    return W.call(s);
  }
  var J = ee, Q = "[object Null]", $ = "[object Undefined]", oe = f ? f.toStringTag : void 0;
  function Ae(s) {
    return s == null ? s === void 0 ? $ : Q : oe && oe in Object(s) ? N(s) : J(s);
  }
  var Be = Ae;
  function ye(s) {
    return s != null && typeof s == "object";
  }
  var ze = ye, lt = "[object Symbol]";
  function Ze(s) {
    return typeof s == "symbol" || ze(s) && Be(s) == lt;
  }
  var ct = Ze, Se = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ot = /^\w*$/;
  function Me(s, a) {
    if (S(s))
      return !1;
    var d = typeof s;
    return d == "number" || d == "symbol" || d == "boolean" || s == null || ct(s) ? !0 : ot.test(s) || !Se.test(s) || a != null && s in Object(a);
  }
  var Ge = Me;
  function et(s) {
    var a = typeof s;
    return s != null && (a == "object" || a == "function");
  }
  var ht = et, tt = "[object AsyncFunction]", or = "[object Function]", ir = "[object GeneratorFunction]", it = "[object Proxy]";
  function V(s) {
    if (!ht(s))
      return !1;
    var a = Be(s);
    return a == or || a == ir || a == tt || a == it;
  }
  var ne = V, be = D["__core-js_shared__"], ce = be, fe = function() {
    var s = /[^.]+$/.exec(ce && ce.keys && ce.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }();
  function He(s) {
    return !!fe && fe in s;
  }
  var De = He, qe = Function.prototype, It = qe.toString;
  function Ve(s) {
    if (s != null) {
      try {
        return It.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  var ar = Ve, Cr = /[\\^$.*+?()[\]{}|]/g, lr = /^\[object .+?Constructor\]$/, Wn = Function.prototype, Kn = Object.prototype, Xn = Wn.toString, Ar = Kn.hasOwnProperty, Yn = RegExp("^" + Xn.call(Ar).replace(Cr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function $e(s) {
    if (!ht(s) || De(s))
      return !1;
    var a = ne(s) ? Yn : lr;
    return a.test(ar(s));
  }
  var Jn = $e;
  function Qn(s, a) {
    return s?.[a];
  }
  var Zn = Qn;
  function es(s, a) {
    var d = Zn(s, a);
    return Jn(d) ? d : void 0;
  }
  var Qr = es, Zr = Qr(Object, "create"), kt = Zr;
  function Mr() {
    this.__data__ = kt ? kt(null) : {}, this.size = 0;
  }
  var en = Mr;
  function ts(s) {
    var a = this.has(s) && delete this.__data__[s];
    return this.size -= a ? 1 : 0, a;
  }
  var rs = ts, ns = "__lodash_hash_undefined__", ss = Object.prototype, os = ss.hasOwnProperty;
  function vt(s) {
    var a = this.__data__;
    if (kt) {
      var d = a[s];
      return d === ns ? void 0 : d;
    }
    return os.call(a, s) ? a[s] : void 0;
  }
  var is = vt, as = Object.prototype, ls = as.hasOwnProperty;
  function cs(s) {
    var a = this.__data__;
    return kt ? a[s] !== void 0 : ls.call(a, s);
  }
  var us = cs, ds = "__lodash_hash_undefined__";
  function fs(s, a) {
    var d = this.__data__;
    return this.size += this.has(s) ? 0 : 1, d[s] = kt && a === void 0 ? ds : a, this;
  }
  var ps = fs;
  function St(s) {
    var a = -1, d = s == null ? 0 : s.length;
    for (this.clear(); ++a < d; ) {
      var y = s[a];
      this.set(y[0], y[1]);
    }
  }
  St.prototype.clear = en, St.prototype.delete = rs, St.prototype.get = is, St.prototype.has = us, St.prototype.set = ps;
  var tn = St;
  function hs() {
    this.__data__ = [], this.size = 0;
  }
  var vs = hs;
  function gt(s, a) {
    return s === a || s !== s && a !== a;
  }
  var gs = gt;
  function Rt(s, a) {
    for (var d = s.length; d--; )
      if (gs(s[d][0], a))
        return d;
    return -1;
  }
  var cr = Rt, ms = Array.prototype, ys = ms.splice;
  function _s(s) {
    var a = this.__data__, d = cr(a, s);
    if (d < 0)
      return !1;
    var y = a.length - 1;
    return d == y ? a.pop() : ys.call(a, d, 1), --this.size, !0;
  }
  var bs = _s;
  function ws(s) {
    var a = this.__data__, d = cr(a, s);
    return d < 0 ? void 0 : a[d][1];
  }
  var Ps = ws;
  function Ts(s) {
    return cr(this.__data__, s) > -1;
  }
  var Ss = Ts;
  function xs(s, a) {
    var d = this.__data__, y = cr(d, s);
    return y < 0 ? (++this.size, d.push([s, a])) : d[y][1] = a, this;
  }
  var Cs = xs;
  function xt(s) {
    var a = -1, d = s == null ? 0 : s.length;
    for (this.clear(); ++a < d; ) {
      var y = s[a];
      this.set(y[0], y[1]);
    }
  }
  xt.prototype.clear = vs, xt.prototype.delete = bs, xt.prototype.get = Ps, xt.prototype.has = Ss, xt.prototype.set = Cs;
  var As = xt, Ms = Qr(D, "Map"), Os = Ms;
  function js() {
    this.size = 0, this.__data__ = {
      hash: new tn(),
      map: new (Os || As)(),
      string: new tn()
    };
  }
  var Ct = js;
  function rn(s) {
    var a = typeof s;
    return a == "string" || a == "number" || a == "symbol" || a == "boolean" ? s !== "__proto__" : s === null;
  }
  var Es = rn;
  function Ds(s, a) {
    var d = s.__data__;
    return Es(a) ? d[typeof a == "string" ? "string" : "hash"] : d.map;
  }
  var ur = Ds;
  function Or(s) {
    var a = ur(this, s).delete(s);
    return this.size -= a ? 1 : 0, a;
  }
  var Is = Or;
  function dr(s) {
    return ur(this, s).get(s);
  }
  var ks = dr;
  function Rs(s) {
    return ur(this, s).has(s);
  }
  var zs = Rs;
  function Ls(s, a) {
    var d = ur(this, s), y = d.size;
    return d.set(s, a), this.size += d.size == y ? 0 : 1, this;
  }
  var Fs = Ls;
  function At(s) {
    var a = -1, d = s == null ? 0 : s.length;
    for (this.clear(); ++a < d; ) {
      var y = s[a];
      this.set(y[0], y[1]);
    }
  }
  At.prototype.clear = Ct, At.prototype.delete = Is, At.prototype.get = ks, At.prototype.has = zs, At.prototype.set = Fs;
  var nn = At, Bs = "Expected a function";
  function jr(s, a) {
    if (typeof s != "function" || a != null && typeof a != "function")
      throw new TypeError(Bs);
    var d = function() {
      var y = arguments, Z = a ? a.apply(this, y) : y[0], ae = d.cache;
      if (ae.has(Z))
        return ae.get(Z);
      var Ee = s.apply(this, y);
      return d.cache = ae.set(Z, Ee) || ae, Ee;
    };
    return d.cache = new (jr.Cache || nn)(), d;
  }
  jr.Cache = nn;
  var Vs = jr, Mt = 500;
  function fr(s) {
    var a = Vs(s, function(y) {
      return d.size === Mt && d.clear(), y;
    }), d = a.cache;
    return a;
  }
  var Ns = fr, zt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Us = /\\(\\)?/g, Gs = Ns(function(s) {
    var a = [];
    return s.charCodeAt(0) === 46 && a.push(""), s.replace(zt, function(d, y, Z, ae) {
      a.push(Z ? ae.replace(Us, "$1") : y || d);
    }), a;
  }), Hs = Gs;
  function qs(s, a) {
    for (var d = -1, y = s == null ? 0 : s.length, Z = Array(y); ++d < y; )
      Z[d] = a(s[d], d, s);
    return Z;
  }
  var $s = qs, Lt = f ? f.prototype : void 0, sn = Lt ? Lt.toString : void 0;
  function on(s) {
    if (typeof s == "string")
      return s;
    if (S(s))
      return $s(s, on) + "";
    if (ct(s))
      return sn ? sn.call(s) : "";
    var a = s + "";
    return a == "0" && 1 / s == -1 / 0 ? "-0" : a;
  }
  var Ws = on;
  function Ks(s) {
    return s == null ? "" : Ws(s);
  }
  var Xs = Ks;
  function Ys(s, a) {
    return S(s) ? s : Ge(s, a) ? [s] : Hs(Xs(s));
  }
  var Js = Ys;
  function Qs(s) {
    if (typeof s == "string" || ct(s))
      return s;
    var a = s + "";
    return a == "0" && 1 / s == -1 / 0 ? "-0" : a;
  }
  var Ot = Qs;
  function pr(s, a) {
    a = Js(a, s);
    for (var d = 0, y = a.length; s != null && d < y; )
      s = s[Ot(a[d++])];
    return d && d == y ? s : void 0;
  }
  var Zs = pr;
  function Er(s, a, d) {
    var y = s == null ? void 0 : Zs(s, a);
    return y === void 0 ? d : y;
  }
  var eo = Er;
  function to(s, a) {
    return function(d) {
      return s(a(d));
    };
  }
  var ro = to, no = ro(Object.getPrototypeOf, Object), so = no, oo = "[object Object]", io = Function.prototype, ao = Object.prototype, an = io.toString, lo = ao.hasOwnProperty, ln = an.call(Object);
  function cn(s) {
    if (!ze(s) || Be(s) != oo)
      return !1;
    var a = so(s);
    if (a === null)
      return !0;
    var d = lo.call(a, "constructor") && a.constructor;
    return typeof d == "function" && d instanceof d && an.call(d) == ln;
  }
  var un = cn;
  function dn(s) {
    var a = s == null ? 0 : s.length;
    return a ? s[a - 1] : void 0;
  }
  var co = dn, hr = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap(), Ft = Symbol("pointerMeta"), uo = {
    get(s, a) {
      if (a === Ft)
        return hr.get(s);
      let d = fn.get(s);
      d || (d = /* @__PURE__ */ new Map(), fn.set(s, d));
      const y = d.get(a);
      if (y !== void 0)
        return y;
      const Z = hr.get(s), ae = vr({ root: Z.root, path: [...Z.path, a] });
      return d.set(a, ae), ae;
    }
  }, at = (s) => s[Ft], Bt = (s) => {
    const { root: a, path: d } = at(s);
    return { root: a, path: d };
  };
  function vr(s) {
    var a;
    const d = {
      root: s.root,
      path: (a = s.path) != null ? a : []
    }, y = {};
    return hr.set(y, d), new Proxy(y, uo);
  }
  var Dr = vr, mt = (s) => s && !!at(s);
  function pn(s, a, d) {
    return a.length === 0 ? d(s) : jt(s, a, d);
  }
  var jt = (s, a, d) => {
    if (a.length === 0)
      return d(s);
    if (Array.isArray(s)) {
      let [y, ...Z] = a;
      y = parseInt(String(y), 10), isNaN(y) && (y = 0);
      const ae = s[y], Ee = jt(ae, Z, d);
      if (ae === Ee)
        return s;
      const rt = [...s];
      return rt.splice(y, 1, Ee), rt;
    } else if (typeof s == "object" && s !== null) {
      const [y, ...Z] = a, ae = s[y], Ee = jt(ae, Z, d);
      return ae === Ee ? s : T(x({}, s), { [y]: Ee });
    } else {
      const [y, ...Z] = a;
      return { [y]: jt(void 0, Z, d) };
    }
  }, xe = class {
    constructor() {
      this._head = void 0;
    }
    peek() {
      return this._head && this._head.data;
    }
    pop() {
      const s = this._head;
      if (s)
        return this._head = s.next, s.data;
    }
    push(s) {
      const a = { next: this._head, data: s };
      this._head = a;
    }
  };
  function gr(s) {
    return !!(s && s.isPrism && s.isPrism === !0);
  }
  function Ir() {
    const s = () => {
    }, a = new xe(), d = s;
    return {
      type: "Dataverse_discoveryMechanism",
      startIgnoringDependencies: () => {
        a.push(d);
      },
      stopIgnoringDependencies: () => {
        a.peek() !== d || a.pop();
      },
      reportResolutionStart: (Et) => {
        const Ht = a.peek();
        Ht && Ht(Et), a.push(d);
      },
      reportResolutionEnd: (Et) => {
        a.pop();
      },
      pushCollector: (Et) => {
        a.push(Et);
      },
      popCollector: (Et) => {
        if (a.peek() !== Et)
          throw new Error("Popped collector is not on top of the stack");
        a.pop();
      }
    };
  }
  function fo() {
    const s = "__dataverse_discoveryMechanism_sharedStack", a = typeof window < "u" ? window : typeof ft < "u" ? ft : {};
    if (a) {
      const d = a[s];
      if (d && typeof d == "object" && d.type === "Dataverse_discoveryMechanism")
        return d;
      {
        const y = Ir();
        return a[s] = y, y;
      }
    } else
      return Ir();
  }
  var {
    startIgnoringDependencies: yt,
    stopIgnoringDependencies: Vt,
    reportResolutionEnd: po,
    reportResolutionStart: ho,
    pushCollector: kr,
    popCollector: vo
  } = fo(), hn = () => {
  }, go = class {
    constructor(s, a) {
      this._fn = s, this._prismInstance = a, this._didMarkDependentsAsStale = !1, this._isFresh = !1, this._cacheOfDendencyValues = /* @__PURE__ */ new Map(), this._dependents = /* @__PURE__ */ new Set(), this._dependencies = /* @__PURE__ */ new Set(), this._possiblyStaleDeps = /* @__PURE__ */ new Set(), this._scope = new vn(this), this._lastValue = void 0, this._forciblySetToStale = !1, this._reactToDependencyGoingStale = (d) => {
        this._possiblyStaleDeps.add(d), this._markAsStale();
      };
      for (const d of this._dependencies)
        d._addDependent(this._reactToDependencyGoingStale);
      yt(), this.getValue(), Vt();
    }
    get hasDependents() {
      return this._dependents.size > 0;
    }
    removeDependent(s) {
      this._dependents.delete(s);
    }
    addDependent(s) {
      this._dependents.add(s);
    }
    destroy() {
      for (const s of this._dependencies)
        s._removeDependent(this._reactToDependencyGoingStale);
      gn(this._scope);
    }
    getValue() {
      if (!this._isFresh) {
        const s = this._recalculate();
        this._lastValue = s, this._isFresh = !0, this._didMarkDependentsAsStale = !1, this._forciblySetToStale = !1;
      }
      return this._lastValue;
    }
    _recalculate() {
      let s;
      if (!this._forciblySetToStale && this._possiblyStaleDeps.size > 0) {
        let y = !1;
        yt();
        for (const Z of this._possiblyStaleDeps)
          if (this._cacheOfDendencyValues.get(Z) !== Z.getValue()) {
            y = !0;
            break;
          }
        if (Vt(), this._possiblyStaleDeps.clear(), !y)
          return this._lastValue;
      }
      const a = /* @__PURE__ */ new Set();
      this._cacheOfDendencyValues.clear();
      const d = (y) => {
        a.add(y), this._addDependency(y);
      };
      kr(d), Oe.push(this._scope);
      try {
        s = this._fn();
      } catch (y) {
        console.error(y);
      } finally {
        Oe.pop() !== this._scope && console.warn("The Prism hook stack has slipped. This is a bug.");
      }
      vo(d);
      for (const y of this._dependencies)
        a.has(y) || this._removeDependency(y);
      this._dependencies = a, yt();
      for (const y of a)
        this._cacheOfDendencyValues.set(y, y.getValue());
      return Vt(), s;
    }
    forceStale() {
      this._forciblySetToStale = !0, this._markAsStale();
    }
    _markAsStale() {
      if (!this._didMarkDependentsAsStale) {
        this._didMarkDependentsAsStale = !0, this._isFresh = !1;
        for (const s of this._dependents)
          s(this._prismInstance);
      }
    }
    _addDependency(s) {
      this._dependencies.has(s) || (this._dependencies.add(s), s._addDependent(this._reactToDependencyGoingStale));
    }
    _removeDependency(s) {
      this._dependencies.has(s) && (this._dependencies.delete(s), s._removeDependent(this._reactToDependencyGoingStale));
    }
  }, Rr = {}, mo = class {
    constructor(s) {
      this._fn = s, this.isPrism = !0, this._state = {
        hot: !1,
        handle: void 0
      };
    }
    get isHot() {
      return this._state.hot;
    }
    onChange(s, a, d = !1) {
      const y = () => {
        s.onThisOrNextTick(ae);
      };
      let Z = Rr;
      const ae = () => {
        const rt = this.getValue();
        rt !== Z && (Z = rt, a(rt));
      };
      return this._addDependent(y), d && (Z = this.getValue(), a(Z)), () => {
        this._removeDependent(y), s.offThisOrNextTick(ae), s.offNextTick(ae);
      };
    }
    onStale(s) {
      const a = () => {
        this._removeDependent(d);
      }, d = () => s();
      return this._addDependent(d), a;
    }
    keepHot() {
      return this.onStale(() => {
      });
    }
    _addDependent(s) {
      this._state.hot || this._goHot(), this._state.handle.addDependent(s);
    }
    _goHot() {
      const s = new go(this._fn, this);
      this._state = {
        hot: !0,
        handle: s
      };
    }
    _removeDependent(s) {
      const a = this._state;
      if (!a.hot)
        return;
      const d = a.handle;
      d.removeDependent(s), d.hasDependents || (this._state = { hot: !1, handle: void 0 }, d.destroy());
    }
    getValue() {
      ho(this);
      const s = this._state;
      let a;
      return s.hot ? a = s.handle.getValue() : a = Ut(this._fn), po(this), a;
    }
  }, vn = class {
    constructor(s) {
      this._hotHandle = s, this._refs = /* @__PURE__ */ new Map(), this.isPrismScope = !0, this.subs = {}, this.effects = /* @__PURE__ */ new Map(), this.memos = /* @__PURE__ */ new Map();
    }
    ref(s, a) {
      let d = this._refs.get(s);
      if (d !== void 0)
        return d;
      {
        const y = {
          current: a
        };
        return this._refs.set(s, y), y;
      }
    }
    effect(s, a, d) {
      let y = this.effects.get(s);
      y === void 0 && (y = {
        cleanup: hn,
        deps: void 0
      }, this.effects.set(s, y)), mn(y.deps, d) && (y.cleanup(), yt(), y.cleanup = mr(a, hn).value, Vt(), y.deps = d);
    }
    memo(s, a, d) {
      let y = this.memos.get(s);
      return y === void 0 && (y = {
        cachedValue: null,
        deps: void 0
      }, this.memos.set(s, y)), mn(y.deps, d) && (yt(), y.cachedValue = mr(a, void 0).value, Vt(), y.deps = d), y.cachedValue;
    }
    state(s, a) {
      const { value: d, setValue: y } = this.memo("state/" + s, () => {
        const Z = { current: a };
        return { value: Z, setValue: (Ee) => {
          Z.current = Ee, this._hotHandle.forceStale();
        } };
      }, []);
      return [d.current, y];
    }
    sub(s) {
      return this.subs[s] || (this.subs[s] = new vn(this._hotHandle)), this.subs[s];
    }
    cleanupEffects() {
      for (const s of this.effects.values())
        mr(s.cleanup, void 0);
      this.effects.clear();
    }
    source(s, a) {
      return this.effect("$$source/blah", () => s(() => {
        this._hotHandle.forceStale();
      }), [s]), a();
    }
  };
  function gn(s) {
    for (const a of Object.values(s.subs))
      gn(a);
    s.cleanupEffects();
  }
  function mr(s, a) {
    try {
      return { value: s(), ok: !0 };
    } catch (d) {
      return setTimeout(function() {
        throw d;
      }), { value: a, ok: !1 };
    }
  }
  var Oe = new xe();
  function yo(s, a) {
    const d = Oe.peek();
    if (!d)
      throw new Error("prism.ref() is called outside of a prism() call.");
    return d.ref(s, a);
  }
  function zr(s, a, d) {
    const y = Oe.peek();
    if (!y)
      throw new Error("prism.effect() is called outside of a prism() call.");
    return y.effect(s, a, d);
  }
  function mn(s, a) {
    if (s === void 0 || a === void 0)
      return !0;
    const d = s.length;
    if (d !== a.length)
      return !0;
    for (let y = 0; y < d; y++)
      if (s[y] !== a[y])
        return !0;
    return !1;
  }
  function yn(s, a, d) {
    const y = Oe.peek();
    if (!y)
      throw new Error("prism.memo() is called outside of a prism() call.");
    return y.memo(s, a, d);
  }
  function Le(s, a) {
    const d = Oe.peek();
    if (!d)
      throw new Error("prism.state() is called outside of a prism() call.");
    return d.state(s, a);
  }
  function _o() {
    if (!Oe.peek())
      throw new Error("The parent function is called outside of a prism() call.");
  }
  function bo(s, a) {
    const d = Oe.peek();
    if (!d)
      throw new Error("prism.scope() is called outside of a prism() call.");
    const y = d.sub(s);
    Oe.push(y);
    const Z = mr(a, void 0).value;
    return Oe.pop(), Z;
  }
  function wo(s, a, d) {
    return yn(s, () => Ce(a), d).getValue();
  }
  function _n() {
    return !!Oe.peek();
  }
  function Po(s, a) {
    const d = Oe.peek();
    if (!d)
      throw new Error("prism.source() is called outside of a prism() call.");
    return d.source(s, a);
  }
  var Ce = (s) => new mo(s), Nt = class {
    effect(s, a, d) {
      console.warn("prism.effect() does not run in cold prisms");
    }
    memo(s, a, d) {
      return a();
    }
    state(s, a) {
      return [a, () => {
      }];
    }
    ref(s, a) {
      return { current: a };
    }
    sub(s) {
      return new Nt();
    }
    source(s, a) {
      return a();
    }
  };
  function Ut(s) {
    const a = new Nt();
    Oe.push(a);
    let d;
    try {
      d = s();
    } catch (y) {
      console.error(y);
    } finally {
      Oe.pop() !== a && console.warn("The Prism hook stack has slipped. This is a bug.");
    }
    return d;
  }
  Ce.ref = yo, Ce.effect = zr, Ce.memo = yn, Ce.ensurePrism = _o, Ce.state = Le, Ce.scope = bo, Ce.sub = wo, Ce.inPrism = _n, Ce.source = Po;
  var Gt = Ce, bn;
  (function(s) {
    s[s.Dict = 0] = "Dict", s[s.Array = 1] = "Array", s[s.Other = 2] = "Other";
  })(bn || (bn = {}));
  var ue = (s) => Array.isArray(s) ? 1 : un(s) ? 0 : 2, Lr = (s, a, d = ue(s)) => d === 0 && typeof a == "string" || d === 1 && To(a) ? s[a] : void 0, To = (s) => {
    const a = typeof s == "number" ? s : parseInt(s, 10);
    return !isNaN(a) && a >= 0 && a < 1 / 0 && (a | 0) === a;
  }, wn = class {
    constructor(s, a) {
      this._parent = s, this._path = a, this.children = /* @__PURE__ */ new Map(), this.identityChangeListeners = /* @__PURE__ */ new Set();
    }
    addIdentityChangeListener(s) {
      this.identityChangeListeners.add(s);
    }
    removeIdentityChangeListener(s) {
      this.identityChangeListeners.delete(s), this._checkForGC();
    }
    removeChild(s) {
      this.children.delete(s), this._checkForGC();
    }
    getChild(s) {
      return this.children.get(s);
    }
    getOrCreateChild(s) {
      let a = this.children.get(s);
      return a || (a = a = new wn(this, this._path.concat([s])), this.children.set(s, a)), a;
    }
    _checkForGC() {
      this.identityChangeListeners.size > 0 || this.children.size > 0 || this._parent && this._parent.removeChild(co(this._path));
    }
  }, Pn = class {
    constructor(s) {
      this.$$isPointerToPrismProvider = !0, this.pointer = Dr({ root: this, path: [] }), this.prism = this.pointerToPrism(this.pointer), this._onPointerValueChange = (a, d) => {
        const { path: y } = Bt(a), Z = this._getOrCreateScopeForPath(y);
        return Z.identityChangeListeners.add(d), () => {
          Z.identityChangeListeners.delete(d);
        };
      }, this._currentState = s, this._rootScope = new wn(void 0, []);
    }
    set(s) {
      const a = this._currentState;
      this._currentState = s, this._checkUpdates(this._rootScope, a, s);
    }
    get() {
      return this._currentState;
    }
    getByPointer(s) {
      const a = mt(s) ? s : s(this.pointer), d = Bt(a).path;
      return this._getIn(d);
    }
    _getIn(s) {
      return s.length === 0 ? this.get() : eo(this.get(), s);
    }
    reduce(s) {
      this.set(s(this.get()));
    }
    reduceByPointer(s, a) {
      const d = mt(s) ? s : s(this.pointer), y = Bt(d).path, Z = pn(this.get(), y, a);
      this.set(Z);
    }
    setByPointer(s, a) {
      this.reduceByPointer(s, () => a);
    }
    _checkUpdates(s, a, d) {
      if (a === d)
        return;
      for (const ae of s.identityChangeListeners)
        ae(d);
      if (s.children.size === 0)
        return;
      const y = ue(a), Z = ue(d);
      if (!(y === 2 && y === Z))
        for (const [ae, Ee] of s.children) {
          const rt = Lr(a, ae, y), xn = Lr(d, ae, Z);
          this._checkUpdates(Ee, rt, xn);
        }
    }
    _getOrCreateScopeForPath(s) {
      let a = this._rootScope;
      for (const d of s)
        a = a.getOrCreateChild(d);
      return a;
    }
    pointerToPrism(s) {
      const { path: a } = Bt(s), d = (Z) => this._onPointerValueChange(s, Z), y = () => this._getIn(a);
      return Gt(() => Gt.source(d, y));
    }
  }, Tn = /* @__PURE__ */ new WeakMap();
  function So(s) {
    return typeof s == "object" && s !== null && s.$$isPointerToPrismProvider === !0;
  }
  var yr = (s) => {
    const a = at(s);
    let d = Tn.get(a);
    if (!d) {
      const y = a.root;
      if (!So(y))
        throw new Error("Cannot run pointerToPrism() on a pointer whose root is not an PointerToPrismProvider");
      d = y.pointerToPrism(s), Tn.set(a, d);
    }
    return d;
  }, Fr = (s) => mt(s) ? yr(s).getValue() : gr(s) ? s.getValue() : s;
  function* xo(s) {
    let a;
    if (mt(s))
      a = yr(s);
    else if (gr(s))
      a = s;
    else
      throw new Error("Only pointers and prisms are supported");
    let d = 0;
    const y = a.onStale(() => {
      d++;
    });
    try {
      for (; ; ) {
        const Z = d;
        d = 0, yield { value: a.getValue(), ticks: Z };
      }
    } finally {
      y();
    }
  }
  var Co = 60 * 3, Sn = class {
    constructor(s) {
      this._conf = s, this._ticking = !1, this._dormant = !0, this._numberOfDormantTicks = 0, this.__ticks = 0, this._scheduledForThisOrNextTick = /* @__PURE__ */ new Set(), this._scheduledForNextTick = /* @__PURE__ */ new Set(), this._timeAtCurrentTick = 0;
    }
    get dormant() {
      return this._dormant;
    }
    onThisOrNextTick(s) {
      this._scheduledForThisOrNextTick.add(s), this._dormant && this._goActive();
    }
    onNextTick(s) {
      this._scheduledForNextTick.add(s), this._dormant && this._goActive();
    }
    offThisOrNextTick(s) {
      this._scheduledForThisOrNextTick.delete(s);
    }
    offNextTick(s) {
      this._scheduledForNextTick.delete(s);
    }
    get time() {
      return this._ticking ? this._timeAtCurrentTick : performance.now();
    }
    _goActive() {
      var s, a;
      this._dormant && (this._dormant = !1, (a = (s = this._conf) == null ? void 0 : s.onActive) == null || a.call(s));
    }
    _goDormant() {
      var s, a;
      this._dormant || (this._dormant = !0, this._numberOfDormantTicks = 0, (a = (s = this._conf) == null ? void 0 : s.onDormant) == null || a.call(s));
    }
    tick(s = performance.now()) {
      if (this.__ticks++, !this._dormant && this._scheduledForNextTick.size === 0 && this._scheduledForThisOrNextTick.size === 0 && (this._numberOfDormantTicks++, this._numberOfDormantTicks >= Co)) {
        this._goDormant();
        return;
      }
      this._ticking = !0, this._timeAtCurrentTick = s;
      for (const a of this._scheduledForNextTick)
        this._scheduledForThisOrNextTick.add(a);
      this._scheduledForNextTick.clear(), this._tick(0), this._ticking = !1;
    }
    _tick(s) {
      const a = this.time;
      if (s > 10 && console.warn("_tick() recursing for 10 times"), s > 100)
        throw new Error("Maximum recursion limit for _tick()");
      const d = this._scheduledForThisOrNextTick;
      this._scheduledForThisOrNextTick = /* @__PURE__ */ new Set();
      for (const y of d)
        y(a);
      if (this._scheduledForThisOrNextTick.size > 0)
        return this._tick(s + 1);
    }
  };
  function* Ao(s) {
    let a;
    if (mt(s))
      a = yr(s);
    else if (gr(s))
      a = s;
    else
      throw new Error("Only pointers and prisms are supported");
    const d = new Sn(), y = a.onChange(d, (Z) => {
    });
    try {
      for (; ; )
        d.tick(), yield a.getValue();
    } finally {
      y();
    }
  }
  var Mo = class {
    constructor(s) {
      this.$$isPointerToPrismProvider = !0, this._currentPointerBox = new Pn(s), this.pointer = Dr({ root: this, path: [] });
    }
    setPointer(s) {
      this._currentPointerBox.set(s);
    }
    pointerToPrism(s) {
      const { path: a } = at(s);
      return Gt(() => {
        const d = this._currentPointerBox.prism.getValue(), y = a.reduce((Z, ae) => Z[ae], d);
        return Fr(y);
      });
    }
  };
})(Pe);
$n.exports;
(function(w, l) {
  var u = Object.create, h = Object.defineProperty, m = Object.defineProperties, g = Object.getOwnPropertyDescriptor, P = Object.getOwnPropertyDescriptors, M = Object.getOwnPropertyNames, x = Object.getOwnPropertySymbols, T = Object.getPrototypeOf, I = Object.prototype.hasOwnProperty, E = Object.prototype.propertyIsEnumerable, j = (e, t, r) => t in e ? h(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, S = (e, t) => {
    for (var r in t || (t = {}))
      I.call(t, r) && j(e, r, t[r]);
    if (x)
      for (var r of x(t))
        E.call(t, r) && j(e, r, t[r]);
    return e;
  }, z = (e, t) => m(e, P(t)), H = (e, t) => function() {
    return t || (0, e[M(e)[0]])((t = { exports: {} }).exports, t), t.exports;
  }, Y = (e, t) => {
    for (var r in t)
      h(e, r, { get: t[r], enumerable: !0 });
  }, X = (e, t, r, n) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let o of M(t))
        !I.call(e, o) && o !== r && h(e, o, { get: () => t[o], enumerable: !(n = g(t, o)) || n.enumerable });
    return e;
  }, D = (e, t, r) => (r = e != null ? u(T(e)) : {}, X(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    !e || !e.__esModule ? h(r, "default", { value: e, enumerable: !0 }) : r,
    e
  )), q = (e) => X(h({}, "__esModule", { value: !0 }), e), f = (e, t, r) => (j(e, typeof t != "symbol" ? t + "" : t, r), r), F = H({
    "../node_modules/timing-function/lib/UnitBezier.js"(e, t) {
      t.exports = function() {
        function r(n, o, i, c) {
          this.set(n, o, i, c);
        }
        return r.prototype.set = function(n, o, i, c) {
          this._cx = 3 * n, this._bx = 3 * (i - n) - this._cx, this._ax = 1 - this._cx - this._bx, this._cy = 3 * o, this._by = 3 * (c - o) - this._cy, this._ay = 1 - this._cy - this._by;
        }, r.epsilon = 1e-6, r.prototype._sampleCurveX = function(n) {
          return ((this._ax * n + this._bx) * n + this._cx) * n;
        }, r.prototype._sampleCurveY = function(n) {
          return ((this._ay * n + this._by) * n + this._cy) * n;
        }, r.prototype._sampleCurveDerivativeX = function(n) {
          return (3 * this._ax * n + 2 * this._bx) * n + this._cx;
        }, r.prototype._solveCurveX = function(n, o) {
          var i, c, p, v, b, C;
          for (p = void 0, v = void 0, b = void 0, C = void 0, i = void 0, c = void 0, b = n, c = 0; c < 8; ) {
            if (C = this._sampleCurveX(b) - n, Math.abs(C) < o)
              return b;
            if (i = this._sampleCurveDerivativeX(b), Math.abs(i) < o)
              break;
            b = b - C / i, c++;
          }
          if (p = 0, v = 1, b = n, b < p)
            return p;
          if (b > v)
            return v;
          for (; p < v; ) {
            if (C = this._sampleCurveX(b), Math.abs(C - n) < o)
              return b;
            n > C ? p = b : v = b, b = (v - p) * 0.5 + p;
          }
          return b;
        }, r.prototype.solve = function(n, o) {
          return this._sampleCurveY(this._solveCurveX(n, o));
        }, r.prototype.solveSimple = function(n) {
          return this._sampleCurveY(this._solveCurveX(n, 1e-6));
        }, r;
      }();
    }
  }), O = H({
    "../node_modules/levenshtein-edit-distance/index.js"(e, t) {
      var r, n;
      r = [], n = [];
      function o(i, c, p) {
        var v, b, C, A, L, K, U, re;
        if (i === c)
          return 0;
        if (v = i.length, b = c.length, v === 0)
          return b;
        if (b === 0)
          return v;
        for (p && (i = i.toLowerCase(), c = c.toLowerCase()), U = 0; U < v; )
          n[U] = i.charCodeAt(U), r[U] = ++U;
        for (re = 0; re < b; )
          for (C = c.charCodeAt(re), A = L = re++, U = -1; ++U < v; )
            K = C === n[U] ? L : L + 1, L = r[U], r[U] = A = L > A ? K > A ? A + 1 : K : K > L ? L + 1 : K;
        return A;
      }
      t.exports = o;
    }
  }), _ = H({
    "../node_modules/propose/propose.js"(e, t) {
      var r = O();
      function n() {
        var o, i, c, p, v, b = 0, C = arguments[0], A = arguments[1], L = A.length, K = arguments[2];
        K && (p = K.threshold, v = K.ignoreCase), p === void 0 && (p = 0);
        for (var U = 0; U < L; ++U)
          v ? i = r(C, A[U], !0) : i = r(C, A[U]), i > C.length ? o = 1 - i / A[U].length : o = 1 - i / C.length, o > b && (b = o, c = A[U]);
        return b >= p ? c : null;
      }
      t.exports = n;
    }
  }), k = H({
    "../node_modules/fast-deep-equal/index.js"(e, t) {
      t.exports = function r(n, o) {
        if (n === o)
          return !0;
        if (n && o && typeof n == "object" && typeof o == "object") {
          if (n.constructor !== o.constructor)
            return !1;
          var i, c, p;
          if (Array.isArray(n)) {
            if (i = n.length, i != o.length)
              return !1;
            for (c = i; c-- !== 0; )
              if (!r(n[c], o[c]))
                return !1;
            return !0;
          }
          if (n.constructor === RegExp)
            return n.source === o.source && n.flags === o.flags;
          if (n.valueOf !== Object.prototype.valueOf)
            return n.valueOf() === o.valueOf();
          if (n.toString !== Object.prototype.toString)
            return n.toString() === o.toString();
          if (p = Object.keys(n), i = p.length, i !== Object.keys(o).length)
            return !1;
          for (c = i; c-- !== 0; )
            if (!Object.prototype.hasOwnProperty.call(o, p[c]))
              return !1;
          for (c = i; c-- !== 0; ) {
            var v = p[c];
            if (!r(n[v], o[v]))
              return !1;
          }
          return !0;
        }
        return n !== n && o !== o;
      };
    }
  }), R = {};
  Y(R, {
    createRafDriver: () => Yo,
    getProject: () => hl,
    notify: () => wr,
    onChange: () => yi,
    types: () => Jo,
    val: () => vl
  }), w.exports = q(R);
  var N = {};
  Y(N, {
    createRafDriver: () => Yo,
    getProject: () => hl,
    notify: () => wr,
    onChange: () => yi,
    types: () => Jo,
    val: () => vl
  });
  var B = Pe, W = class {
    constructor() {
      f(this, "atom", new B.Atom({ projects: {} }));
    }
    /**
     * We're trusting here that each project id is unique
     */
    add(e, t) {
      this.atom.setByPointer((r) => r.projects[e], t);
    }
    get(e) {
      return this.atom.get().projects[e];
    }
    has(e) {
      return !!this.get(e);
    }
  }, ee = new W(), J = ee, Q = /* @__PURE__ */ new WeakMap();
  function $(e) {
    return Q.get(e);
  }
  function oe(e, t) {
    Q.set(e, t);
  }
  var Ae = [], Be = Array.isArray, ye = Be, ze = typeof ft == "object" && ft && ft.Object === Object && ft, lt = ze, Ze = typeof self == "object" && self && self.Object === Object && self, ct = lt || Ze || Function("return this")(), Se = ct, ot = Se.Symbol, Me = ot, Ge = Object.prototype, et = Ge.hasOwnProperty, ht = Ge.toString, tt = Me ? Me.toStringTag : void 0;
  function or(e) {
    var t = et.call(e, tt), r = e[tt];
    try {
      e[tt] = void 0;
      var n = !0;
    } catch {
    }
    var o = ht.call(e);
    return n && (t ? e[tt] = r : delete e[tt]), o;
  }
  var ir = or, it = Object.prototype, V = it.toString;
  function ne(e) {
    return V.call(e);
  }
  var be = ne, ce = "[object Null]", fe = "[object Undefined]", He = Me ? Me.toStringTag : void 0;
  function De(e) {
    return e == null ? e === void 0 ? fe : ce : He && He in Object(e) ? ir(e) : be(e);
  }
  var qe = De;
  function It(e) {
    return e != null && typeof e == "object";
  }
  var Ve = It, ar = "[object Symbol]";
  function Cr(e) {
    return typeof e == "symbol" || Ve(e) && qe(e) == ar;
  }
  var lr = Cr, Wn = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Kn = /^\w*$/;
  function Xn(e, t) {
    if (ye(e))
      return !1;
    var r = typeof e;
    return r == "number" || r == "symbol" || r == "boolean" || e == null || lr(e) ? !0 : Kn.test(e) || !Wn.test(e) || t != null && e in Object(t);
  }
  var Ar = Xn;
  function Yn(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  var $e = Yn, Jn = "[object AsyncFunction]", Qn = "[object Function]", Zn = "[object GeneratorFunction]", es = "[object Proxy]";
  function Qr(e) {
    if (!$e(e))
      return !1;
    var t = qe(e);
    return t == Qn || t == Zn || t == Jn || t == es;
  }
  var Zr = Qr, kt = Se["__core-js_shared__"], Mr = kt, en = function() {
    var e = /[^.]+$/.exec(Mr && Mr.keys && Mr.keys.IE_PROTO || "");
    return e ? "Symbol(src)_1." + e : "";
  }();
  function ts(e) {
    return !!en && en in e;
  }
  var rs = ts, ns = Function.prototype, ss = ns.toString;
  function os(e) {
    if (e != null) {
      try {
        return ss.call(e);
      } catch {
      }
      try {
        return e + "";
      } catch {
      }
    }
    return "";
  }
  var vt = os, is = /[\\^$.*+?()[\]{}|]/g, as = /^\[object .+?Constructor\]$/, ls = Function.prototype, cs = Object.prototype, us = ls.toString, ds = cs.hasOwnProperty, fs = RegExp(
    "^" + us.call(ds).replace(is, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function ps(e) {
    if (!$e(e) || rs(e))
      return !1;
    var t = Zr(e) ? fs : as;
    return t.test(vt(e));
  }
  var St = ps;
  function tn(e, t) {
    return e?.[t];
  }
  var hs = tn;
  function vs(e, t) {
    var r = hs(e, t);
    return St(r) ? r : void 0;
  }
  var gt = vs, gs = gt(Object, "create"), Rt = gs;
  function cr() {
    this.__data__ = Rt ? Rt(null) : {}, this.size = 0;
  }
  var ms = cr;
  function ys(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  var _s = ys, bs = "__lodash_hash_undefined__", ws = Object.prototype, Ps = ws.hasOwnProperty;
  function Ts(e) {
    var t = this.__data__;
    if (Rt) {
      var r = t[e];
      return r === bs ? void 0 : r;
    }
    return Ps.call(t, e) ? t[e] : void 0;
  }
  var Ss = Ts, xs = Object.prototype, Cs = xs.hasOwnProperty;
  function xt(e) {
    var t = this.__data__;
    return Rt ? t[e] !== void 0 : Cs.call(t, e);
  }
  var As = xt, Ms = "__lodash_hash_undefined__";
  function Os(e, t) {
    var r = this.__data__;
    return this.size += this.has(e) ? 0 : 1, r[e] = Rt && t === void 0 ? Ms : t, this;
  }
  var js = Os;
  function Ct(e) {
    var t = -1, r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Ct.prototype.clear = ms, Ct.prototype.delete = _s, Ct.prototype.get = Ss, Ct.prototype.has = As, Ct.prototype.set = js;
  var rn = Ct;
  function Es() {
    this.__data__ = [], this.size = 0;
  }
  var Ds = Es;
  function ur(e, t) {
    return e === t || e !== e && t !== t;
  }
  var Or = ur;
  function Is(e, t) {
    for (var r = e.length; r--; )
      if (Or(e[r][0], t))
        return r;
    return -1;
  }
  var dr = Is, ks = Array.prototype, Rs = ks.splice;
  function zs(e) {
    var t = this.__data__, r = dr(t, e);
    if (r < 0)
      return !1;
    var n = t.length - 1;
    return r == n ? t.pop() : Rs.call(t, r, 1), --this.size, !0;
  }
  var Ls = zs;
  function Fs(e) {
    var t = this.__data__, r = dr(t, e);
    return r < 0 ? void 0 : t[r][1];
  }
  var At = Fs;
  function nn(e) {
    return dr(this.__data__, e) > -1;
  }
  var Bs = nn;
  function jr(e, t) {
    var r = this.__data__, n = dr(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
  }
  var Vs = jr;
  function Mt(e) {
    var t = -1, r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Mt.prototype.clear = Ds, Mt.prototype.delete = Ls, Mt.prototype.get = At, Mt.prototype.has = Bs, Mt.prototype.set = Vs;
  var fr = Mt, Ns = gt(Se, "Map"), zt = Ns;
  function Us() {
    this.size = 0, this.__data__ = {
      hash: new rn(),
      map: new (zt || fr)(),
      string: new rn()
    };
  }
  var Gs = Us;
  function Hs(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
  }
  var qs = Hs;
  function $s(e, t) {
    var r = e.__data__;
    return qs(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
  }
  var Lt = $s;
  function sn(e) {
    var t = Lt(this, e).delete(e);
    return this.size -= t ? 1 : 0, t;
  }
  var on = sn;
  function Ws(e) {
    return Lt(this, e).get(e);
  }
  var Ks = Ws;
  function Xs(e) {
    return Lt(this, e).has(e);
  }
  var Ys = Xs;
  function Js(e, t) {
    var r = Lt(this, e), n = r.size;
    return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
  }
  var Qs = Js;
  function Ot(e) {
    var t = -1, r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Ot.prototype.clear = Gs, Ot.prototype.delete = on, Ot.prototype.get = Ks, Ot.prototype.has = Ys, Ot.prototype.set = Qs;
  var pr = Ot, Zs = "Expected a function";
  function Er(e, t) {
    if (typeof e != "function" || t != null && typeof t != "function")
      throw new TypeError(Zs);
    var r = function() {
      var n = arguments, o = t ? t.apply(this, n) : n[0], i = r.cache;
      if (i.has(o))
        return i.get(o);
      var c = e.apply(this, n);
      return r.cache = i.set(o, c) || i, c;
    };
    return r.cache = new (Er.Cache || pr)(), r;
  }
  Er.Cache = pr;
  var eo = Er, to = 500;
  function ro(e) {
    var t = eo(e, function(n) {
      return r.size === to && r.clear(), n;
    }), r = t.cache;
    return t;
  }
  var no = ro, so = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, oo = /\\(\\)?/g, io = no(function(e) {
    var t = [];
    return e.charCodeAt(0) === 46 && t.push(""), e.replace(so, function(r, n, o, i) {
      t.push(o ? i.replace(oo, "$1") : n || r);
    }), t;
  }), ao = io;
  function an(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
      o[r] = t(e[r], r, e);
    return o;
  }
  var lo = an, ln = Me ? Me.prototype : void 0, cn = ln ? ln.toString : void 0;
  function un(e) {
    if (typeof e == "string")
      return e;
    if (ye(e))
      return lo(e, un) + "";
    if (lr(e))
      return cn ? cn.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
  }
  var dn = un;
  function co(e) {
    return e == null ? "" : dn(e);
  }
  var hr = co;
  function fn(e, t) {
    return ye(e) ? e : Ar(e, t) ? [e] : ao(hr(e));
  }
  var Ft = fn;
  function uo(e) {
    if (typeof e == "string" || lr(e))
      return e;
    var t = e + "";
    return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
  }
  var at = uo;
  function Bt(e, t) {
    t = Ft(t, e);
    for (var r = 0, n = t.length; e != null && r < n; )
      e = e[at(t[r++])];
    return r && r == n ? e : void 0;
  }
  var vr = Bt;
  function Dr(e, t, r) {
    var n = e == null ? void 0 : vr(e, t);
    return n === void 0 ? r : n;
  }
  var mt = Dr;
  function pn(e, t) {
    return t.length === 0 ? e : mt(e, t);
  }
  var jt = class {
    constructor() {
      f(this, "_values", {});
    }
    /**
     * get the cache item at `key` or produce it using `producer` and cache _that_.
     *
     * Note that this won't work if you change the producer, like `get(key, producer1); get(key, producer2)`.
     */
    get(e, t) {
      if (this.has(e))
        return this._values[e];
      {
        const r = t();
        return this._values[e] = r, r;
      }
    }
    /**
     * Returns true if the cache has an item at `key`.
     */
    has(e) {
      return this._values.hasOwnProperty(e);
    }
  }, xe = Pe, gr = function() {
    try {
      var e = gt(Object, "defineProperty");
      return e({}, "", {}), e;
    } catch {
    }
  }(), Ir = gr;
  function fo(e, t, r) {
    t == "__proto__" && Ir ? Ir(e, t, {
      configurable: !0,
      enumerable: !0,
      value: r,
      writable: !0
    }) : e[t] = r;
  }
  var yt = fo, Vt = Object.prototype, po = Vt.hasOwnProperty;
  function ho(e, t, r) {
    var n = e[t];
    (!(po.call(e, t) && Or(n, r)) || r === void 0 && !(t in e)) && yt(e, t, r);
  }
  var kr = ho, vo = 9007199254740991, hn = /^(?:0|[1-9]\d*)$/;
  function go(e, t) {
    var r = typeof e;
    return t = t ?? vo, !!t && (r == "number" || r != "symbol" && hn.test(e)) && e > -1 && e % 1 == 0 && e < t;
  }
  var Rr = go;
  function mo(e, t, r, n) {
    if (!$e(e))
      return e;
    t = Ft(t, e);
    for (var o = -1, i = t.length, c = i - 1, p = e; p != null && ++o < i; ) {
      var v = at(t[o]), b = r;
      if (v === "__proto__" || v === "constructor" || v === "prototype")
        return e;
      if (o != c) {
        var C = p[v];
        b = n ? n(C, v, p) : void 0, b === void 0 && (b = $e(C) ? C : Rr(t[o + 1]) ? [] : {});
      }
      kr(p, v, b), p = p[v];
    }
    return e;
  }
  var vn = mo;
  function gn(e, t, r) {
    return e == null ? e : vn(e, t, r);
  }
  var mr = gn, Oe = /* @__PURE__ */ new WeakMap();
  function yo(e) {
    return zr(e);
  }
  function zr(e) {
    if (Oe.has(e))
      return Oe.get(e);
    const t = e.type === "compound" ? yn(e) : e.type === "enum" ? mn(e) : e.default;
    return Oe.set(e, t), t;
  }
  function mn(e) {
    const t = {
      $case: e.defaultCase
    };
    for (const [r, n] of Object.entries(e.cases))
      t[r] = zr(n);
    return t;
  }
  function yn(e) {
    const t = {};
    for (const [r, n] of Object.entries(e.props))
      t[r] = zr(n);
    return t;
  }
  var Le = Pe, _o = D(F());
  function bo(e, t, r) {
    return (0, Le.prism)(() => {
      const n = (0, Le.val)(t);
      return Le.prism.memo(
        "driver",
        () => n ? n.type === "BasicKeyframedTrack" ? wo(e, n, r) : (e.logger.error("Track type not yet supported."), (0, Le.prism)(() => {
        })) : (0, Le.prism)(() => {
        }),
        [n]
      ).getValue();
    });
  }
  function wo(e, t, r) {
    return (0, Le.prism)(() => {
      let n = Le.prism.ref("state", { started: !1 }), o = n.current;
      const i = r.getValue();
      return (!o.started || i < o.validFrom || o.validTo <= i) && (n.current = o = Po(e, r, t)), o.der.getValue();
    });
  }
  var _n = (0, Le.prism)(() => {
  });
  function Po(e, t, r) {
    const n = t.getValue();
    if (r.keyframes.length === 0)
      return {
        started: !0,
        validFrom: -1 / 0,
        validTo: 1 / 0,
        der: _n
      };
    let o = 0;
    for (; ; ) {
      const i = r.keyframes[o];
      if (!i)
        return Ce.error;
      const c = o === r.keyframes.length - 1;
      if (n < i.position)
        return o === 0 ? Ce.beforeFirstKeyframe(i) : Ce.error;
      if (i.position === n)
        return c ? Ce.lastKeyframe(i) : Ce.between(
          i,
          r.keyframes[o + 1],
          t
        );
      if (o === r.keyframes.length - 1)
        return Ce.lastKeyframe(i);
      {
        const p = o + 1;
        if (r.keyframes[p].position <= n) {
          o = p;
          continue;
        } else
          return Ce.between(
            i,
            r.keyframes[o + 1],
            t
          );
      }
    }
  }
  var Ce = {
    beforeFirstKeyframe(e) {
      return {
        started: !0,
        validFrom: -1 / 0,
        validTo: e.position,
        der: (0, Le.prism)(() => ({ left: e.value, progression: 0 }))
      };
    },
    lastKeyframe(e) {
      return {
        started: !0,
        validFrom: e.position,
        validTo: 1 / 0,
        der: (0, Le.prism)(() => ({ left: e.value, progression: 0 }))
      };
    },
    between(e, t, r) {
      if (!e.connectedRight)
        return {
          started: !0,
          validFrom: e.position,
          validTo: t.position,
          der: (0, Le.prism)(() => ({ left: e.value, progression: 0 }))
        };
      const n = (i) => (i - e.position) / (t.position - e.position);
      if (!e.type || e.type === "bezier") {
        const i = new _o.default(
          e.handles[2],
          e.handles[3],
          t.handles[0],
          t.handles[1]
        ), c = (0, Le.prism)(() => {
          const p = n(
            r.getValue()
          ), v = i.solveSimple(p);
          return {
            left: e.value,
            right: t.value,
            progression: v
          };
        });
        return {
          started: !0,
          validFrom: e.position,
          validTo: t.position,
          der: c
        };
      }
      const o = (0, Le.prism)(() => {
        const i = n(
          r.getValue()
        ), c = Math.floor(i);
        return {
          left: e.value,
          right: t.value,
          progression: c
        };
      });
      return {
        started: !0,
        validFrom: e.position,
        validTo: t.position,
        der: o
      };
    },
    error: {
      started: !0,
      validFrom: -1 / 0,
      validTo: 1 / 0,
      der: _n
    }
  };
  function Nt(e, t, r) {
    const o = r.get(e);
    if (o && o.override === t)
      return o.merged;
    const i = S({}, e);
    for (const c of Object.keys(t)) {
      const p = t[c], v = e[c];
      i[c] = typeof p == "object" && typeof v == "object" ? Nt(
        v,
        p,
        r
      ) : p === void 0 ? v : p;
    }
    return r.set(e, { override: t, merged: i }), i;
  }
  function Ut(e, t) {
    let r = e;
    for (const n of t)
      r = r[n];
    return r;
  }
  var Gt = Pe, bn = (e, t) => {
    const r = Gt.prism.memo(e, () => new Gt.Atom(t), []);
    return r.set(t), r;
  }, ue = Pe, Lr = Pe, To = /\s/;
  function wn(e) {
    for (var t = e.length; t-- && To.test(e.charAt(t)); )
      ;
    return t;
  }
  var Pn = wn, Tn = /^\s+/;
  function So(e) {
    return e && e.slice(0, Pn(e) + 1).replace(Tn, "");
  }
  var yr = So, Fr = NaN, xo = /^[-+]0x[0-9a-f]+$/i, Co = /^0b[01]+$/i, Sn = /^0o[0-7]+$/i, Ao = parseInt;
  function Mo(e) {
    if (typeof e == "number")
      return e;
    if (lr(e))
      return Fr;
    if ($e(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = $e(t) ? t + "" : t;
    }
    if (typeof e != "string")
      return e === 0 ? e : +e;
    e = yr(e);
    var r = Co.test(e);
    return r || Sn.test(e) ? Ao(e.slice(2), r ? 2 : 8) : xo.test(e) ? Fr : +e;
  }
  var s = Mo, a = 1 / 0, d = 17976931348623157e292;
  function y(e) {
    if (!e)
      return e === 0 ? e : 0;
    if (e = s(e), e === a || e === -a) {
      var t = e < 0 ? -1 : 1;
      return t * d;
    }
    return e === e ? e : 0;
  }
  var Z = y;
  function ae(e) {
    var t = Z(e), r = t % 1;
    return t === t ? r ? t - r : t : 0;
  }
  var Ee = ae;
  function rt(e) {
    return e;
  }
  var xn = rt, Et = gt(Se, "WeakMap"), Ht = Et, xi = Object.create, Ol = /* @__PURE__ */ function() {
    function e() {
    }
    return function(t) {
      if (!$e(t))
        return {};
      if (xi)
        return xi(t);
      e.prototype = t;
      var r = new e();
      return e.prototype = void 0, r;
    };
  }(), jl = Ol;
  function El(e, t) {
    var r = -1, n = e.length;
    for (t || (t = Array(n)); ++r < n; )
      t[r] = e[r];
    return t;
  }
  var Dl = El;
  function Il(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n && t(e[r], r, e) !== !1; )
      ;
    return e;
  }
  var kl = Il;
  function Rl(e, t, r, n) {
    var o = !r;
    r || (r = {});
    for (var i = -1, c = t.length; ++i < c; ) {
      var p = t[i], v = n ? n(r[p], e[p], p, r, e) : void 0;
      v === void 0 && (v = e[p]), o ? yt(r, p, v) : kr(r, p, v);
    }
    return r;
  }
  var Cn = Rl, zl = 9007199254740991;
  function Ll(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= zl;
  }
  var Oo = Ll;
  function Fl(e) {
    return e != null && Oo(e.length) && !Zr(e);
  }
  var Ci = Fl, Bl = Object.prototype;
  function Vl(e) {
    var t = e && e.constructor, r = typeof t == "function" && t.prototype || Bl;
    return e === r;
  }
  var jo = Vl;
  function Nl(e, t) {
    for (var r = -1, n = Array(e); ++r < e; )
      n[r] = t(r);
    return n;
  }
  var Ul = Nl, Gl = "[object Arguments]";
  function Hl(e) {
    return Ve(e) && qe(e) == Gl;
  }
  var Ai = Hl, Mi = Object.prototype, ql = Mi.hasOwnProperty, $l = Mi.propertyIsEnumerable, Wl = Ai(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Ai : function(e) {
    return Ve(e) && ql.call(e, "callee") && !$l.call(e, "callee");
  }, Oi = Wl;
  function Kl() {
    return !1;
  }
  var Xl = Kl, ji = l && !l.nodeType && l, Ei = ji && !0 && w && !w.nodeType && w, Yl = Ei && Ei.exports === ji, Di = Yl ? Se.Buffer : void 0, Jl = Di ? Di.isBuffer : void 0, Ql = Jl || Xl, An = Ql, Zl = "[object Arguments]", ec = "[object Array]", tc = "[object Boolean]", rc = "[object Date]", nc = "[object Error]", sc = "[object Function]", oc = "[object Map]", ic = "[object Number]", ac = "[object Object]", lc = "[object RegExp]", cc = "[object Set]", uc = "[object String]", dc = "[object WeakMap]", fc = "[object ArrayBuffer]", pc = "[object DataView]", hc = "[object Float32Array]", vc = "[object Float64Array]", gc = "[object Int8Array]", mc = "[object Int16Array]", yc = "[object Int32Array]", _c = "[object Uint8Array]", bc = "[object Uint8ClampedArray]", wc = "[object Uint16Array]", Pc = "[object Uint32Array]", me = {};
  me[hc] = me[vc] = me[gc] = me[mc] = me[yc] = me[_c] = me[bc] = me[wc] = me[Pc] = !0, me[Zl] = me[ec] = me[fc] = me[tc] = me[pc] = me[rc] = me[nc] = me[sc] = me[oc] = me[ic] = me[ac] = me[lc] = me[cc] = me[uc] = me[dc] = !1;
  function Tc(e) {
    return Ve(e) && Oo(e.length) && !!me[qe(e)];
  }
  var Sc = Tc;
  function xc(e) {
    return function(t) {
      return e(t);
    };
  }
  var Eo = xc, Ii = l && !l.nodeType && l, Br = Ii && !0 && w && !w.nodeType && w, Cc = Br && Br.exports === Ii, Do = Cc && lt.process, Ac = function() {
    try {
      var e = Br && Br.require && Br.require("util").types;
      return e || Do && Do.binding && Do.binding("util");
    } catch {
    }
  }(), _r = Ac, ki = _r && _r.isTypedArray, Mc = ki ? Eo(ki) : Sc, Ri = Mc, Oc = Object.prototype, jc = Oc.hasOwnProperty;
  function Ec(e, t) {
    var r = ye(e), n = !r && Oi(e), o = !r && !n && An(e), i = !r && !n && !o && Ri(e), c = r || n || o || i, p = c ? Ul(e.length, String) : [], v = p.length;
    for (var b in e)
      (t || jc.call(e, b)) && !(c && // Safari 9 has enumerable `arguments.length` in strict mode.
      (b == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      o && (b == "offset" || b == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      i && (b == "buffer" || b == "byteLength" || b == "byteOffset") || // Skip index properties.
      Rr(b, v))) && p.push(b);
    return p;
  }
  var zi = Ec;
  function Dc(e, t) {
    return function(r) {
      return e(t(r));
    };
  }
  var Li = Dc, Ic = Li(Object.keys, Object), kc = Ic, Rc = Object.prototype, zc = Rc.hasOwnProperty;
  function Lc(e) {
    if (!jo(e))
      return kc(e);
    var t = [];
    for (var r in Object(e))
      zc.call(e, r) && r != "constructor" && t.push(r);
    return t;
  }
  var Fc = Lc;
  function Bc(e) {
    return Ci(e) ? zi(e) : Fc(e);
  }
  var Vr = Bc;
  function Vc(e) {
    var t = [];
    if (e != null)
      for (var r in Object(e))
        t.push(r);
    return t;
  }
  var Nc = Vc, Uc = Object.prototype, Gc = Uc.hasOwnProperty;
  function Hc(e) {
    if (!$e(e))
      return Nc(e);
    var t = jo(e), r = [];
    for (var n in e)
      n == "constructor" && (t || !Gc.call(e, n)) || r.push(n);
    return r;
  }
  var qc = Hc;
  function $c(e) {
    return Ci(e) ? zi(e, !0) : qc(e);
  }
  var Io = $c;
  function Wc(e, t) {
    for (var r = -1, n = t.length, o = e.length; ++r < n; )
      e[o + r] = t[r];
    return e;
  }
  var Fi = Wc, Kc = Li(Object.getPrototypeOf, Object), ko = Kc, Xc = "[object Object]", Yc = Function.prototype, Jc = Object.prototype, Bi = Yc.toString, Qc = Jc.hasOwnProperty, Zc = Bi.call(Object);
  function eu(e) {
    if (!Ve(e) || qe(e) != Xc)
      return !1;
    var t = ko(e);
    if (t === null)
      return !0;
    var r = Qc.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && Bi.call(r) == Zc;
  }
  var tu = eu;
  function ru(e, t, r) {
    var n = -1, o = e.length;
    t < 0 && (t = -t > o ? 0 : o + t), r = r > o ? o : r, r < 0 && (r += o), o = t > r ? 0 : r - t >>> 0, t >>>= 0;
    for (var i = Array(o); ++n < o; )
      i[n] = e[n + t];
    return i;
  }
  var Vi = ru;
  function nu(e, t, r) {
    var n = e.length;
    return r = r === void 0 ? n : r, !t && r >= n ? e : Vi(e, t, r);
  }
  var su = nu, ou = "\\ud800-\\udfff", iu = "\\u0300-\\u036f", au = "\\ufe20-\\ufe2f", lu = "\\u20d0-\\u20ff", cu = iu + au + lu, uu = "\\ufe0e\\ufe0f", du = "\\u200d", fu = RegExp("[" + du + ou + cu + uu + "]");
  function pu(e) {
    return fu.test(e);
  }
  var Ro = pu;
  function hu(e) {
    return e.split("");
  }
  var vu = hu, Ni = "\\ud800-\\udfff", gu = "\\u0300-\\u036f", mu = "\\ufe20-\\ufe2f", yu = "\\u20d0-\\u20ff", _u = gu + mu + yu, bu = "\\ufe0e\\ufe0f", wu = "[" + Ni + "]", zo = "[" + _u + "]", Lo = "\\ud83c[\\udffb-\\udfff]", Pu = "(?:" + zo + "|" + Lo + ")", Ui = "[^" + Ni + "]", Gi = "(?:\\ud83c[\\udde6-\\uddff]){2}", Hi = "[\\ud800-\\udbff][\\udc00-\\udfff]", Tu = "\\u200d", qi = Pu + "?", $i = "[" + bu + "]?", Su = "(?:" + Tu + "(?:" + [Ui, Gi, Hi].join("|") + ")" + $i + qi + ")*", xu = $i + qi + Su, Cu = "(?:" + [Ui + zo + "?", zo, Gi, Hi, wu].join("|") + ")", Au = RegExp(Lo + "(?=" + Lo + ")|" + Cu + xu, "g");
  function Mu(e) {
    return e.match(Au) || [];
  }
  var Ou = Mu;
  function ju(e) {
    return Ro(e) ? Ou(e) : vu(e);
  }
  var Eu = ju;
  function Du(e, t, r) {
    return e === e && (r !== void 0 && (e = e <= r ? e : r), t !== void 0 && (e = e >= t ? e : t)), e;
  }
  var Iu = Du;
  function ku(e, t, r) {
    return r === void 0 && (r = t, t = void 0), r !== void 0 && (r = s(r), r = r === r ? r : 0), t !== void 0 && (t = s(t), t = t === t ? t : 0), Iu(s(e), t, r);
  }
  var Wi = ku;
  function Ru() {
    this.__data__ = new fr(), this.size = 0;
  }
  var zu = Ru;
  function Lu(e) {
    var t = this.__data__, r = t.delete(e);
    return this.size = t.size, r;
  }
  var Fu = Lu;
  function Bu(e) {
    return this.__data__.get(e);
  }
  var Vu = Bu;
  function Nu(e) {
    return this.__data__.has(e);
  }
  var Uu = Nu, Gu = 200;
  function Hu(e, t) {
    var r = this.__data__;
    if (r instanceof fr) {
      var n = r.__data__;
      if (!zt || n.length < Gu - 1)
        return n.push([e, t]), this.size = ++r.size, this;
      r = this.__data__ = new pr(n);
    }
    return r.set(e, t), this.size = r.size, this;
  }
  var qu = Hu;
  function br(e) {
    var t = this.__data__ = new fr(e);
    this.size = t.size;
  }
  br.prototype.clear = zu, br.prototype.delete = Fu, br.prototype.get = Vu, br.prototype.has = Uu, br.prototype.set = qu;
  var Nr = br;
  function $u(e, t) {
    return e && Cn(t, Vr(t), e);
  }
  var Wu = $u;
  function Ku(e, t) {
    return e && Cn(t, Io(t), e);
  }
  var Xu = Ku, Ki = l && !l.nodeType && l, Xi = Ki && !0 && w && !w.nodeType && w, Yu = Xi && Xi.exports === Ki, Yi = Yu ? Se.Buffer : void 0, Ji = Yi ? Yi.allocUnsafe : void 0;
  function Ju(e, t) {
    if (t)
      return e.slice();
    var r = e.length, n = Ji ? Ji(r) : new e.constructor(r);
    return e.copy(n), n;
  }
  var Qu = Ju;
  function Zu(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
      var c = e[r];
      t(c, r, e) && (i[o++] = c);
    }
    return i;
  }
  var ed = Zu;
  function td() {
    return [];
  }
  var Qi = td, rd = Object.prototype, nd = rd.propertyIsEnumerable, Zi = Object.getOwnPropertySymbols, sd = Zi ? function(e) {
    return e == null ? [] : (e = Object(e), ed(Zi(e), function(t) {
      return nd.call(e, t);
    }));
  } : Qi, Fo = sd;
  function od(e, t) {
    return Cn(e, Fo(e), t);
  }
  var id = od, ad = Object.getOwnPropertySymbols, ld = ad ? function(e) {
    for (var t = []; e; )
      Fi(t, Fo(e)), e = ko(e);
    return t;
  } : Qi, ea = ld;
  function cd(e, t) {
    return Cn(e, ea(e), t);
  }
  var ud = cd;
  function dd(e, t, r) {
    var n = t(e);
    return ye(e) ? n : Fi(n, r(e));
  }
  var ta = dd;
  function fd(e) {
    return ta(e, Vr, Fo);
  }
  var Bo = fd;
  function pd(e) {
    return ta(e, Io, ea);
  }
  var hd = pd, vd = gt(Se, "DataView"), Vo = vd, gd = gt(Se, "Promise"), No = gd, md = gt(Se, "Set"), Uo = md, ra = "[object Map]", yd = "[object Object]", na = "[object Promise]", sa = "[object Set]", oa = "[object WeakMap]", ia = "[object DataView]", _d = vt(Vo), bd = vt(zt), wd = vt(No), Pd = vt(Uo), Td = vt(Ht), qt = qe;
  (Vo && qt(new Vo(new ArrayBuffer(1))) != ia || zt && qt(new zt()) != ra || No && qt(No.resolve()) != na || Uo && qt(new Uo()) != sa || Ht && qt(new Ht()) != oa) && (qt = function(e) {
    var t = qe(e), r = t == yd ? e.constructor : void 0, n = r ? vt(r) : "";
    if (n)
      switch (n) {
        case _d:
          return ia;
        case bd:
          return ra;
        case wd:
          return na;
        case Pd:
          return sa;
        case Td:
          return oa;
      }
    return t;
  });
  var Ur = qt, Sd = Object.prototype, xd = Sd.hasOwnProperty;
  function Cd(e) {
    var t = e.length, r = new e.constructor(t);
    return t && typeof e[0] == "string" && xd.call(e, "index") && (r.index = e.index, r.input = e.input), r;
  }
  var Ad = Cd, Md = Se.Uint8Array, Mn = Md;
  function Od(e) {
    var t = new e.constructor(e.byteLength);
    return new Mn(t).set(new Mn(e)), t;
  }
  var Go = Od;
  function jd(e, t) {
    var r = t ? Go(e.buffer) : e.buffer;
    return new e.constructor(r, e.byteOffset, e.byteLength);
  }
  var Ed = jd, Dd = /\w*$/;
  function Id(e) {
    var t = new e.constructor(e.source, Dd.exec(e));
    return t.lastIndex = e.lastIndex, t;
  }
  var kd = Id, aa = Me ? Me.prototype : void 0, la = aa ? aa.valueOf : void 0;
  function Rd(e) {
    return la ? Object(la.call(e)) : {};
  }
  var zd = Rd;
  function Ld(e, t) {
    var r = t ? Go(e.buffer) : e.buffer;
    return new e.constructor(r, e.byteOffset, e.length);
  }
  var Fd = Ld, Bd = "[object Boolean]", Vd = "[object Date]", Nd = "[object Map]", Ud = "[object Number]", Gd = "[object RegExp]", Hd = "[object Set]", qd = "[object String]", $d = "[object Symbol]", Wd = "[object ArrayBuffer]", Kd = "[object DataView]", Xd = "[object Float32Array]", Yd = "[object Float64Array]", Jd = "[object Int8Array]", Qd = "[object Int16Array]", Zd = "[object Int32Array]", ef = "[object Uint8Array]", tf = "[object Uint8ClampedArray]", rf = "[object Uint16Array]", nf = "[object Uint32Array]";
  function sf(e, t, r) {
    var n = e.constructor;
    switch (t) {
      case Wd:
        return Go(e);
      case Bd:
      case Vd:
        return new n(+e);
      case Kd:
        return Ed(e, r);
      case Xd:
      case Yd:
      case Jd:
      case Qd:
      case Zd:
      case ef:
      case tf:
      case rf:
      case nf:
        return Fd(e, r);
      case Nd:
        return new n();
      case Ud:
      case qd:
        return new n(e);
      case Gd:
        return kd(e);
      case Hd:
        return new n();
      case $d:
        return zd(e);
    }
  }
  var of = sf;
  function af(e) {
    return typeof e.constructor == "function" && !jo(e) ? jl(ko(e)) : {};
  }
  var lf = af, cf = "[object Map]";
  function uf(e) {
    return Ve(e) && Ur(e) == cf;
  }
  var df = uf, ca = _r && _r.isMap, ff = ca ? Eo(ca) : df, pf = ff, hf = "[object Set]";
  function vf(e) {
    return Ve(e) && Ur(e) == hf;
  }
  var gf = vf, ua = _r && _r.isSet, mf = ua ? Eo(ua) : gf, yf = mf, _f = 1, bf = 2, wf = 4, da = "[object Arguments]", Pf = "[object Array]", Tf = "[object Boolean]", Sf = "[object Date]", xf = "[object Error]", fa = "[object Function]", Cf = "[object GeneratorFunction]", Af = "[object Map]", Mf = "[object Number]", pa = "[object Object]", Of = "[object RegExp]", jf = "[object Set]", Ef = "[object String]", Df = "[object Symbol]", If = "[object WeakMap]", kf = "[object ArrayBuffer]", Rf = "[object DataView]", zf = "[object Float32Array]", Lf = "[object Float64Array]", Ff = "[object Int8Array]", Bf = "[object Int16Array]", Vf = "[object Int32Array]", Nf = "[object Uint8Array]", Uf = "[object Uint8ClampedArray]", Gf = "[object Uint16Array]", Hf = "[object Uint32Array]", pe = {};
  pe[da] = pe[Pf] = pe[kf] = pe[Rf] = pe[Tf] = pe[Sf] = pe[zf] = pe[Lf] = pe[Ff] = pe[Bf] = pe[Vf] = pe[Af] = pe[Mf] = pe[pa] = pe[Of] = pe[jf] = pe[Ef] = pe[Df] = pe[Nf] = pe[Uf] = pe[Gf] = pe[Hf] = !0, pe[xf] = pe[fa] = pe[If] = !1;
  function On(e, t, r, n, o, i) {
    var c, p = t & _f, v = t & bf, b = t & wf;
    if (r && (c = o ? r(e, n, o, i) : r(e)), c !== void 0)
      return c;
    if (!$e(e))
      return e;
    var C = ye(e);
    if (C) {
      if (c = Ad(e), !p)
        return Dl(e, c);
    } else {
      var A = Ur(e), L = A == fa || A == Cf;
      if (An(e))
        return Qu(e, p);
      if (A == pa || A == da || L && !o) {
        if (c = v || L ? {} : lf(e), !p)
          return v ? ud(e, Xu(c, e)) : id(e, Wu(c, e));
      } else {
        if (!pe[A])
          return o ? e : {};
        c = of(e, A, p);
      }
    }
    i || (i = new Nr());
    var K = i.get(e);
    if (K)
      return K;
    i.set(e, c), yf(e) ? e.forEach(function(se) {
      c.add(On(se, t, r, se, e, i));
    }) : pf(e) && e.forEach(function(se, te) {
      c.set(te, On(se, t, r, te, e, i));
    });
    var U = b ? v ? hd : Bo : v ? Io : Vr, re = C ? void 0 : U(e);
    return kl(re || e, function(se, te) {
      re && (te = se, se = e[te]), kr(c, te, On(se, t, r, te, e, i));
    }), c;
  }
  var qf = On, $f = 1, Wf = 4;
  function Kf(e) {
    return qf(e, $f | Wf);
  }
  var Xf = Kf, Yf = "__lodash_hash_undefined__";
  function Jf(e) {
    return this.__data__.set(e, Yf), this;
  }
  var Qf = Jf;
  function Zf(e) {
    return this.__data__.has(e);
  }
  var ep = Zf;
  function jn(e) {
    var t = -1, r = e == null ? 0 : e.length;
    for (this.__data__ = new pr(); ++t < r; )
      this.add(e[t]);
  }
  jn.prototype.add = jn.prototype.push = Qf, jn.prototype.has = ep;
  var tp = jn;
  function rp(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
      if (t(e[r], r, e))
        return !0;
    return !1;
  }
  var np = rp;
  function sp(e, t) {
    return e.has(t);
  }
  var op = sp, ip = 1, ap = 2;
  function lp(e, t, r, n, o, i) {
    var c = r & ip, p = e.length, v = t.length;
    if (p != v && !(c && v > p))
      return !1;
    var b = i.get(e), C = i.get(t);
    if (b && C)
      return b == t && C == e;
    var A = -1, L = !0, K = r & ap ? new tp() : void 0;
    for (i.set(e, t), i.set(t, e); ++A < p; ) {
      var U = e[A], re = t[A];
      if (n)
        var se = c ? n(re, U, A, t, e, i) : n(U, re, A, e, t, i);
      if (se !== void 0) {
        if (se)
          continue;
        L = !1;
        break;
      }
      if (K) {
        if (!np(t, function(te, le) {
          if (!op(K, le) && (U === te || o(U, te, r, n, i)))
            return K.push(le);
        })) {
          L = !1;
          break;
        }
      } else if (!(U === re || o(U, re, r, n, i))) {
        L = !1;
        break;
      }
    }
    return i.delete(e), i.delete(t), L;
  }
  var ha = lp;
  function cp(e) {
    var t = -1, r = Array(e.size);
    return e.forEach(function(n, o) {
      r[++t] = [o, n];
    }), r;
  }
  var up = cp;
  function dp(e) {
    var t = -1, r = Array(e.size);
    return e.forEach(function(n) {
      r[++t] = n;
    }), r;
  }
  var fp = dp, pp = 1, hp = 2, vp = "[object Boolean]", gp = "[object Date]", mp = "[object Error]", yp = "[object Map]", _p = "[object Number]", bp = "[object RegExp]", wp = "[object Set]", Pp = "[object String]", Tp = "[object Symbol]", Sp = "[object ArrayBuffer]", xp = "[object DataView]", va = Me ? Me.prototype : void 0, Ho = va ? va.valueOf : void 0;
  function Cp(e, t, r, n, o, i, c) {
    switch (r) {
      case xp:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        e = e.buffer, t = t.buffer;
      case Sp:
        return !(e.byteLength != t.byteLength || !i(new Mn(e), new Mn(t)));
      case vp:
      case gp:
      case _p:
        return Or(+e, +t);
      case mp:
        return e.name == t.name && e.message == t.message;
      case bp:
      case Pp:
        return e == t + "";
      case yp:
        var p = up;
      case wp:
        var v = n & pp;
        if (p || (p = fp), e.size != t.size && !v)
          return !1;
        var b = c.get(e);
        if (b)
          return b == t;
        n |= hp, c.set(e, t);
        var C = ha(p(e), p(t), n, o, i, c);
        return c.delete(e), C;
      case Tp:
        if (Ho)
          return Ho.call(e) == Ho.call(t);
    }
    return !1;
  }
  var Ap = Cp, Mp = 1, Op = Object.prototype, jp = Op.hasOwnProperty;
  function Ep(e, t, r, n, o, i) {
    var c = r & Mp, p = Bo(e), v = p.length, b = Bo(t), C = b.length;
    if (v != C && !c)
      return !1;
    for (var A = v; A--; ) {
      var L = p[A];
      if (!(c ? L in t : jp.call(t, L)))
        return !1;
    }
    var K = i.get(e), U = i.get(t);
    if (K && U)
      return K == t && U == e;
    var re = !0;
    i.set(e, t), i.set(t, e);
    for (var se = c; ++A < v; ) {
      L = p[A];
      var te = e[L], le = t[L];
      if (n)
        var Ie = c ? n(le, te, L, t, e, i) : n(te, le, L, e, t, i);
      if (!(Ie === void 0 ? te === le || o(te, le, r, n, i) : Ie)) {
        re = !1;
        break;
      }
      se || (se = L == "constructor");
    }
    if (re && !se) {
      var Ue = e.constructor, ke = t.constructor;
      Ue != ke && "constructor" in e && "constructor" in t && !(typeof Ue == "function" && Ue instanceof Ue && typeof ke == "function" && ke instanceof ke) && (re = !1);
    }
    return i.delete(e), i.delete(t), re;
  }
  var Dp = Ep, Ip = 1, ga = "[object Arguments]", ma = "[object Array]", En = "[object Object]", kp = Object.prototype, ya = kp.hasOwnProperty;
  function Rp(e, t, r, n, o, i) {
    var c = ye(e), p = ye(t), v = c ? ma : Ur(e), b = p ? ma : Ur(t);
    v = v == ga ? En : v, b = b == ga ? En : b;
    var C = v == En, A = b == En, L = v == b;
    if (L && An(e)) {
      if (!An(t))
        return !1;
      c = !0, C = !1;
    }
    if (L && !C)
      return i || (i = new Nr()), c || Ri(e) ? ha(e, t, r, n, o, i) : Ap(e, t, v, r, n, o, i);
    if (!(r & Ip)) {
      var K = C && ya.call(e, "__wrapped__"), U = A && ya.call(t, "__wrapped__");
      if (K || U) {
        var re = K ? e.value() : e, se = U ? t.value() : t;
        return i || (i = new Nr()), o(re, se, r, n, i);
      }
    }
    return L ? (i || (i = new Nr()), Dp(e, t, r, n, o, i)) : !1;
  }
  var zp = Rp;
  function _a(e, t, r, n, o) {
    return e === t ? !0 : e == null || t == null || !Ve(e) && !Ve(t) ? e !== e && t !== t : zp(e, t, r, n, _a, o);
  }
  var ba = _a, Lp = 1, Fp = 2;
  function Bp(e, t, r, n) {
    var o = r.length, i = o, c = !n;
    if (e == null)
      return !i;
    for (e = Object(e); o--; ) {
      var p = r[o];
      if (c && p[2] ? p[1] !== e[p[0]] : !(p[0] in e))
        return !1;
    }
    for (; ++o < i; ) {
      p = r[o];
      var v = p[0], b = e[v], C = p[1];
      if (c && p[2]) {
        if (b === void 0 && !(v in e))
          return !1;
      } else {
        var A = new Nr();
        if (n)
          var L = n(b, C, v, e, t, A);
        if (!(L === void 0 ? ba(C, b, Lp | Fp, n, A) : L))
          return !1;
      }
    }
    return !0;
  }
  var Vp = Bp;
  function Np(e) {
    return e === e && !$e(e);
  }
  var wa = Np;
  function Up(e) {
    for (var t = Vr(e), r = t.length; r--; ) {
      var n = t[r], o = e[n];
      t[r] = [n, o, wa(o)];
    }
    return t;
  }
  var Gp = Up;
  function Hp(e, t) {
    return function(r) {
      return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
    };
  }
  var Pa = Hp;
  function qp(e) {
    var t = Gp(e);
    return t.length == 1 && t[0][2] ? Pa(t[0][0], t[0][1]) : function(r) {
      return r === e || Vp(r, e, t);
    };
  }
  var $p = qp;
  function Wp(e, t) {
    return e != null && t in Object(e);
  }
  var Kp = Wp;
  function Xp(e, t, r) {
    t = Ft(t, e);
    for (var n = -1, o = t.length, i = !1; ++n < o; ) {
      var c = at(t[n]);
      if (!(i = e != null && r(e, c)))
        break;
      e = e[c];
    }
    return i || ++n != o ? i : (o = e == null ? 0 : e.length, !!o && Oo(o) && Rr(c, o) && (ye(e) || Oi(e)));
  }
  var Yp = Xp;
  function Jp(e, t) {
    return e != null && Yp(e, t, Kp);
  }
  var Qp = Jp, Zp = 1, eh = 2;
  function th(e, t) {
    return Ar(e) && wa(t) ? Pa(at(e), t) : function(r) {
      var n = mt(r, e);
      return n === void 0 && n === t ? Qp(r, e) : ba(t, n, Zp | eh);
    };
  }
  var rh = th;
  function nh(e) {
    return function(t) {
      return t?.[e];
    };
  }
  var Ta = nh;
  function sh(e) {
    return function(t) {
      return vr(t, e);
    };
  }
  var oh = sh;
  function ih(e) {
    return Ar(e) ? Ta(at(e)) : oh(e);
  }
  var ah = ih;
  function lh(e) {
    return typeof e == "function" ? e : e == null ? xn : typeof e == "object" ? ye(e) ? rh(e[0], e[1]) : $p(e) : ah(e);
  }
  var ch = lh;
  function uh(e) {
    return function(t, r, n) {
      for (var o = -1, i = Object(t), c = n(t), p = c.length; p--; ) {
        var v = c[e ? p : ++o];
        if (r(i[v], v, i) === !1)
          break;
      }
      return t;
    };
  }
  var dh = uh, fh = dh(), ph = fh;
  function hh(e, t) {
    return e && ph(e, t, Vr);
  }
  var vh = hh, gh = function() {
    return Se.Date.now();
  }, qo = gh, mh = "Expected a function", yh = Math.max, _h = Math.min;
  function bh(e, t, r) {
    var n, o, i, c, p, v, b = 0, C = !1, A = !1, L = !0;
    if (typeof e != "function")
      throw new TypeError(mh);
    t = s(t) || 0, $e(r) && (C = !!r.leading, A = "maxWait" in r, i = A ? yh(s(r.maxWait) || 0, t) : i, L = "trailing" in r ? !!r.trailing : L);
    function K(de) {
      var Re = n, Ye = o;
      return n = o = void 0, b = de, c = e.apply(Ye, Re), c;
    }
    function U(de) {
      return b = de, p = setTimeout(te, t), C ? K(de) : c;
    }
    function re(de) {
      var Re = de - v, Ye = de - b, ut = t - Re;
      return A ? _h(ut, i - Ye) : ut;
    }
    function se(de) {
      var Re = de - v, Ye = de - b;
      return v === void 0 || Re >= t || Re < 0 || A && Ye >= i;
    }
    function te() {
      var de = qo();
      if (se(de))
        return le(de);
      p = setTimeout(te, re(de));
    }
    function le(de) {
      return p = void 0, L && n ? K(de) : (n = o = void 0, c);
    }
    function Ie() {
      p !== void 0 && clearTimeout(p), b = 0, n = v = o = p = void 0;
    }
    function Ue() {
      return p === void 0 ? c : le(qo());
    }
    function ke() {
      var de = qo(), Re = se(de);
      if (n = arguments, o = this, v = de, Re) {
        if (p === void 0)
          return U(v);
        if (A)
          return clearTimeout(p), p = setTimeout(te, t), K(v);
      }
      return p === void 0 && (p = setTimeout(te, t)), c;
    }
    return ke.cancel = Ie, ke.flush = Ue, ke;
  }
  var wh = bh;
  function Ph(e) {
    var t = e == null ? 0 : e.length;
    return t ? e[t - 1] : void 0;
  }
  var Th = Ph;
  function Sh(e, t) {
    return t.length < 2 ? e : vr(e, Vi(t, 0, -1));
  }
  var xh = Sh;
  function Ch(e) {
    return typeof e == "number" && e == Ee(e);
  }
  var Ah = Ch;
  function Mh(e, t) {
    var r = {};
    return t = ch(t), vh(e, function(n, o, i) {
      yt(r, o, t(n, o, i));
    }), r;
  }
  var Oh = Mh;
  function jh(e, t) {
    return t = Ft(t, e), e = xh(e, t), e == null || delete e[at(Th(t))];
  }
  var Eh = jh, Dh = 9007199254740991, Ih = Math.floor;
  function kh(e, t) {
    var r = "";
    if (!e || t < 1 || t > Dh)
      return r;
    do
      t % 2 && (r += e), t = Ih(t / 2), t && (e += e);
    while (t);
    return r;
  }
  var Sa = kh, Rh = Ta("length"), zh = Rh, xa = "\\ud800-\\udfff", Lh = "\\u0300-\\u036f", Fh = "\\ufe20-\\ufe2f", Bh = "\\u20d0-\\u20ff", Vh = Lh + Fh + Bh, Nh = "\\ufe0e\\ufe0f", Uh = "[" + xa + "]", $o = "[" + Vh + "]", Wo = "\\ud83c[\\udffb-\\udfff]", Gh = "(?:" + $o + "|" + Wo + ")", Ca = "[^" + xa + "]", Aa = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ma = "[\\ud800-\\udbff][\\udc00-\\udfff]", Hh = "\\u200d", Oa = Gh + "?", ja = "[" + Nh + "]?", qh = "(?:" + Hh + "(?:" + [Ca, Aa, Ma].join("|") + ")" + ja + Oa + ")*", $h = ja + Oa + qh, Wh = "(?:" + [Ca + $o + "?", $o, Aa, Ma, Uh].join("|") + ")", Ea = RegExp(Wo + "(?=" + Wo + ")|" + Wh + $h, "g");
  function Kh(e) {
    for (var t = Ea.lastIndex = 0; Ea.test(e); )
      ++t;
    return t;
  }
  var Xh = Kh;
  function Yh(e) {
    return Ro(e) ? Xh(e) : zh(e);
  }
  var Da = Yh, Jh = Math.ceil;
  function Qh(e, t) {
    t = t === void 0 ? " " : dn(t);
    var r = t.length;
    if (r < 2)
      return r ? Sa(t, e) : t;
    var n = Sa(t, Jh(e / Da(t)));
    return Ro(t) ? su(Eu(n), 0, e).join("") : n.slice(0, e);
  }
  var Zh = Qh;
  function ev(e, t, r) {
    e = hr(e), t = Ee(t);
    var n = t ? Da(e) : 0;
    return t && n < t ? Zh(t - n, r) + e : e;
  }
  var Gr = ev;
  function tv(e, t) {
    return e == null ? !0 : Eh(e, t);
  }
  var Ia = tv, rv = 5 * 1e3, nv = class {
    /**
     * @internal
     */
    constructor(e) {
      f(this, "_cache", new jt()), f(this, "_keepHotUntapDebounce"), oe(this, e);
    }
    get type() {
      return "Theatre_SheetObject_PublicAPI";
    }
    get props() {
      return $(this).propsP;
    }
    get sheet() {
      return $(this).sheet.publicApi;
    }
    get project() {
      return $(this).sheet.project.publicApi;
    }
    get address() {
      return S({}, $(this).address);
    }
    _valuesPrism() {
      return this._cache.get("_valuesPrism", () => {
        const e = $(this);
        return (0, Lr.prism)(() => (0, Lr.val)(e.getValues().getValue()));
      });
    }
    onValuesChange(e, t) {
      return yi(this._valuesPrism(), e, t);
    }
    // internal: Make the deviration keepHot if directly read
    get value() {
      const e = this._valuesPrism();
      {
        if (!e.isHot) {
          this._keepHotUntapDebounce != null && this._keepHotUntapDebounce.flush();
          const t = e.keepHot();
          this._keepHotUntapDebounce = wh(() => {
            t(), this._keepHotUntapDebounce = void 0;
          }, rv);
        }
        this._keepHotUntapDebounce && this._keepHotUntapDebounce();
      }
      return e.getValue();
    }
    set initialValue(e) {
      $(this).setInitialValue(e);
    }
  };
  function sv(e) {
    const t = /* @__PURE__ */ new WeakMap();
    return (r) => (t.has(r) || t.set(r, e(r)), t.get(r));
  }
  function Dn(e) {
    return e.type === "compound" || e.type === "enum";
  }
  function Ko(e, t) {
    if (!e)
      return;
    const [r, ...n] = t;
    if (r === void 0)
      return e;
    if (!Dn(e))
      return;
    const o = e.type === "enum" ? e.cases[r] : e.props[r];
    return Ko(o, n);
  }
  function ov(e) {
    return !Dn(e);
  }
  var iv = class {
    constructor(e, t, r) {
      this.sheet = e, this.template = t, this.nativeObject = r, f(this, "$$isPointerToPrismProvider", !0), f(this, "address"), f(this, "publicApi"), f(this, "_initialValue", new ue.Atom({})), f(this, "_cache", new jt()), f(this, "_logger"), f(this, "_internalUtilCtx"), this._logger = e._logger.named(
        "SheetObject",
        t.address.objectKey
      ), this._logger._trace("creating object"), this._internalUtilCtx = { logger: this._logger.utilFor.internal() }, this.address = z(S({}, t.address), {
        sheetInstanceId: e.address.sheetInstanceId
      }), this.publicApi = new nv(this);
    }
    get type() {
      return "Theatre_SheetObject";
    }
    getValues() {
      return this._cache.get(
        "getValues()",
        () => (0, ue.prism)(() => {
          const e = (0, ue.val)(this.template.getDefaultValues()), t = (0, ue.val)(this._initialValue.pointer), r = ue.prism.memo(
            "withInitialCache",
            () => /* @__PURE__ */ new WeakMap(),
            []
          ), n = Nt(
            e,
            t,
            r
          ), o = (0, ue.val)(this.template.getStaticValues()), i = ue.prism.memo(
            "withStatics",
            () => /* @__PURE__ */ new WeakMap(),
            []
          );
          let p = Nt(
            n,
            o,
            i
          ), v;
          {
            const C = ue.prism.memo(
              "seq",
              () => this.getSequencedValues(),
              []
            ), A = ue.prism.memo(
              "withSeqsCache",
              () => /* @__PURE__ */ new WeakMap(),
              []
            );
            v = (0, ue.val)((0, ue.val)(C)), p = Nt(p, v, A);
          }
          return bn("finalAtom", p).pointer;
        })
      );
    }
    getValueByPointer(e) {
      const t = (0, ue.val)(this.getValues()), { path: r } = (0, ue.getPointerParts)(e);
      return (0, ue.val)(
        Ut(t, r)
      );
    }
    pointerToPrism(e) {
      const { path: t } = (0, ue.getPointerParts)(e);
      return (0, ue.prism)(() => {
        const r = (0, ue.val)(this.getValues());
        return (0, ue.val)(Ut(r, t));
      });
    }
    /**
     * Returns values of props that are sequenced.
     */
    getSequencedValues() {
      return (0, ue.prism)(() => {
        const e = ue.prism.memo(
          "tracksToProcess",
          () => this.template.getArrayOfValidSequenceTracks(),
          []
        ), t = (0, ue.val)(e), r = new ue.Atom({}), n = (0, ue.val)(this.template.configPointer);
        return ue.prism.effect(
          "processTracks",
          () => {
            const o = [];
            for (const { trackId: i, pathToProp: c } of t) {
              const p = this._trackIdToPrism(i), v = Ko(
                n,
                c
              ), b = v.deserializeAndSanitize, C = v.interpolate, A = () => {
                const K = p.getValue();
                if (!K)
                  return r.setByPointer(
                    (le) => Ut(le, c),
                    void 0
                  );
                const U = b(K.left), re = U === void 0 ? v.default : U;
                if (K.right === void 0)
                  return r.setByPointer(
                    (le) => Ut(le, c),
                    re
                  );
                const se = b(K.right), te = se === void 0 ? v.default : se;
                return r.setByPointer(
                  (le) => Ut(le, c),
                  C(re, te, K.progression)
                );
              }, L = p.onStale(A);
              A(), o.push(L);
            }
            return () => {
              for (const i of o)
                i();
            };
          },
          [n, ...t]
        ), r.pointer;
      });
    }
    _trackIdToPrism(e) {
      const t = this.template.project.pointers.historic.sheetsById[this.address.sheetId].sequence.tracksByObject[this.address.objectKey].trackData[e], r = this.sheet.getSequence().positionPrism;
      return bo(this._internalUtilCtx, t, r);
    }
    get propsP() {
      return this._cache.get(
        "propsP",
        () => (0, ue.pointer)({ root: this, path: [] })
      );
    }
    validateValue(e, t) {
    }
    setInitialValue(e) {
      this.validateValue(this.propsP, e), this._initialValue.set(e);
    }
  };
  function he(e) {
    return function(r, n) {
      return e(r, n());
    };
  }
  var We = {
    _hmm: Ke(
      524
      /* _HMM */
    ),
    _todo: Ke(
      522
      /* _TODO */
    ),
    _error: Ke(
      521
      /* _ERROR */
    ),
    errorDev: Ke(
      529
      /* ERROR_DEV */
    ),
    errorPublic: Ke(
      545
      /* ERROR_PUBLIC */
    ),
    _kapow: Ke(
      268
      /* _KAPOW */
    ),
    _warn: Ke(
      265
      /* _WARN */
    ),
    warnDev: Ke(
      273
      /* WARN_DEV */
    ),
    warnPublic: Ke(
      289
      /* WARN_PUBLIC */
    ),
    _debug: Ke(
      137
      /* _DEBUG */
    ),
    debugDev: Ke(
      145
      /* DEBUG_DEV */
    ),
    _trace: Ke(
      73
      /* _TRACE */
    ),
    traceDev: Ke(
      81
      /* TRACE_DEV */
    )
  };
  function Ke(e) {
    return Object.freeze({
      audience: $t(
        e,
        8
        /* INTERNAL */
      ) ? "internal" : $t(
        e,
        16
        /* DEV */
      ) ? "dev" : "public",
      category: $t(
        e,
        4
        /* TROUBLESHOOTING */
      ) ? "troubleshooting" : $t(
        e,
        2
        /* TODO */
      ) ? "todo" : "general",
      level: (
        // I think this is equivalent... but I'm not using it until we have tests.
        // this code won't really impact performance much anyway, since it's just computed once
        // up front.
        // level &
        // (TheatreLoggerLevel.TRACE |
        //   TheatreLoggerLevel.DEBUG |
        //   TheatreLoggerLevel.WARN |
        //   TheatreLoggerLevel.ERROR),
        $t(
          e,
          512
          /* ERROR */
        ) ? 512 : $t(
          e,
          256
          /* WARN */
        ) ? 256 : $t(
          e,
          128
          /* DEBUG */
        ) ? 128 : (
          // no other option
          64
        )
      )
    });
  }
  function $t(e, t) {
    return (e & t) === t;
  }
  function ve(e, t) {
    return ((t & 32) === 32 ? !0 : (t & 16) === 16 ? e.dev : (t & 8) === 8 ? e.internal : !1) && e.min <= t;
  }
  var _t = {
    loggingConsoleStyle: !0,
    loggerConsoleStyle: !0,
    includes: Object.freeze({
      internal: !1,
      dev: !1,
      min: 256
      /* WARN */
    }),
    filtered: function() {
    },
    include: function() {
      return {};
    },
    create: null,
    creatExt: null,
    named(e, t, r) {
      return this.create({
        names: [...e.names, { name: t, key: r }]
      });
    },
    style: {
      bold: void 0,
      // /Service$/
      italic: void 0,
      // /Model$/
      cssMemo: /* @__PURE__ */ new Map([
        // handle empty names so we don't have to check for
        // name.length > 0 during this.css('')
        ["", ""]
        // bring a specific override
        // ["Marker", "color:#aea9ff;font-size:0.75em;text-transform:uppercase"]
      ]),
      collapseOnRE: /[a-z- ]+/g,
      color: void 0,
      // create collapsed name
      // insert collapsed name into cssMemo with original's style
      collapsed(e) {
        if (e.length < 5)
          return e;
        const t = e.replace(this.collapseOnRE, "");
        return this.cssMemo.has(t) || this.cssMemo.set(t, this.css(e)), t;
      },
      css(e) {
        var t, r, n, o;
        const i = this.cssMemo.get(e);
        if (i)
          return i;
        let c = "color:".concat((r = (t = this.color) == null ? void 0 : t.call(this, e)) != null ? r : "hsl(".concat((e.charCodeAt(0) + e.charCodeAt(e.length - 1)) % 360, ", 100%, 60%)"));
        return (n = this.bold) != null && n.test(e) && (c += ";font-weight:600"), (o = this.italic) != null && o.test(e) && (c += ";font-style:italic"), this.cssMemo.set(e, c), c;
      }
    }
  };
  function ka(e = console, t = {}) {
    const r = z(S({}, _t), { includes: S({}, _t.includes) }), n = {
      styled: cv.bind(r, e),
      noStyle: dv.bind(r, e)
    }, o = lv.bind(r);
    function i() {
      return r.loggingConsoleStyle && r.loggerConsoleStyle ? n.styled : n.noStyle;
    }
    return r.create = i(), {
      configureLogger(c) {
        var p;
        c === "console" ? (r.loggerConsoleStyle = _t.loggerConsoleStyle, r.create = i()) : c.type === "console" ? (r.loggerConsoleStyle = (p = c.style) != null ? p : _t.loggerConsoleStyle, r.create = i()) : c.type === "keyed" ? (r.creatExt = (v) => c.keyed(v.names), r.create = o) : c.type === "named" && (r.creatExt = av.bind(null, c.named), r.create = o);
      },
      configureLogging(c) {
        var p, v, b, C, A;
        r.includes.dev = (p = c.dev) != null ? p : _t.includes.dev, r.includes.internal = (v = c.internal) != null ? v : _t.includes.internal, r.includes.min = (b = c.min) != null ? b : _t.includes.min, r.include = (C = c.include) != null ? C : _t.include, r.loggingConsoleStyle = (A = c.consoleStyle) != null ? A : _t.loggingConsoleStyle, r.create = i();
      },
      getLogger() {
        return r.create({ names: [] });
      }
    };
  }
  function av(e, t) {
    const r = [];
    for (let { name: n, key: o } of t.names)
      r.push(o == null ? n : "".concat(n, " (").concat(o, ")"));
    return e(r);
  }
  function lv(e) {
    const t = S(S({}, this.includes), this.include(e)), r = this.filtered, n = this.named.bind(this, e), o = this.creatExt(e), i = ve(
      t,
      524
      /* _HMM */
    ), c = ve(
      t,
      522
      /* _TODO */
    ), p = ve(
      t,
      521
      /* _ERROR */
    ), v = ve(
      t,
      529
      /* ERROR_DEV */
    ), b = ve(
      t,
      545
      /* ERROR_PUBLIC */
    ), C = ve(
      t,
      265
      /* _WARN */
    ), A = ve(
      t,
      268
      /* _KAPOW */
    ), L = ve(
      t,
      273
      /* WARN_DEV */
    ), K = ve(
      t,
      289
      /* WARN_PUBLIC */
    ), U = ve(
      t,
      137
      /* _DEBUG */
    ), re = ve(
      t,
      145
      /* DEBUG_DEV */
    ), se = ve(
      t,
      73
      /* _TRACE */
    ), te = ve(
      t,
      81
      /* TRACE_DEV */
    ), le = i ? o.error.bind(o, We._hmm) : r.bind(
      e,
      524
      /* _HMM */
    ), Ie = c ? o.error.bind(o, We._todo) : r.bind(
      e,
      522
      /* _TODO */
    ), Ue = p ? o.error.bind(o, We._error) : r.bind(
      e,
      521
      /* _ERROR */
    ), ke = v ? o.error.bind(o, We.errorDev) : r.bind(
      e,
      529
      /* ERROR_DEV */
    ), de = b ? o.error.bind(o, We.errorPublic) : r.bind(
      e,
      545
      /* ERROR_PUBLIC */
    ), Re = A ? o.warn.bind(o, We._kapow) : r.bind(
      e,
      268
      /* _KAPOW */
    ), Ye = C ? o.warn.bind(o, We._warn) : r.bind(
      e,
      265
      /* _WARN */
    ), ut = L ? o.warn.bind(o, We.warnDev) : r.bind(
      e,
      273
      /* WARN_DEV */
    ), Qt = K ? o.warn.bind(o, We.warnPublic) : r.bind(
      e,
      273
      /* WARN_DEV */
    ), Zt = U ? o.debug.bind(o, We._debug) : r.bind(
      e,
      137
      /* _DEBUG */
    ), er = re ? o.debug.bind(o, We.debugDev) : r.bind(
      e,
      145
      /* DEBUG_DEV */
    ), tr = se ? o.trace.bind(o, We._trace) : r.bind(
      e,
      73
      /* _TRACE */
    ), rr = te ? o.trace.bind(o, We.traceDev) : r.bind(
      e,
      81
      /* TRACE_DEV */
    ), we = {
      _hmm: le,
      _todo: Ie,
      _error: Ue,
      errorDev: ke,
      errorPublic: de,
      _kapow: Re,
      _warn: Ye,
      warnDev: ut,
      warnPublic: Qt,
      _debug: Zt,
      debugDev: er,
      _trace: tr,
      traceDev: rr,
      lazy: {
        _hmm: i ? he(le) : le,
        _todo: c ? he(Ie) : Ie,
        _error: p ? he(Ue) : Ue,
        errorDev: v ? he(ke) : ke,
        errorPublic: b ? he(de) : de,
        _kapow: A ? he(Re) : Re,
        _warn: C ? he(Ye) : Ye,
        warnDev: L ? he(ut) : ut,
        warnPublic: K ? he(Qt) : Qt,
        _debug: U ? he(Zt) : Zt,
        debugDev: re ? he(er) : er,
        _trace: se ? he(tr) : tr,
        traceDev: te ? he(rr) : rr
      },
      //
      named: n,
      utilFor: {
        internal() {
          return {
            debug: we._debug,
            error: we._error,
            warn: we._warn,
            trace: we._trace,
            named(Je, ge) {
              return we.named(Je, ge).utilFor.internal();
            }
          };
        },
        dev() {
          return {
            debug: we.debugDev,
            error: we.errorDev,
            warn: we.warnDev,
            trace: we.traceDev,
            named(Je, ge) {
              return we.named(Je, ge).utilFor.dev();
            }
          };
        },
        public() {
          return {
            error: we.errorPublic,
            warn: we.warnPublic,
            debug(Je, ge) {
              we._warn('(public "debug" filtered out) '.concat(Je), ge);
            },
            trace(Je, ge) {
              we._warn('(public "trace" filtered out) '.concat(Je), ge);
            },
            named(Je, ge) {
              return we.named(Je, ge).utilFor.public();
            }
          };
        }
      }
    };
    return we;
  }
  function cv(e, t) {
    const r = S(S({}, this.includes), this.include(t)), n = [];
    let o = "";
    for (let v = 0; v < t.names.length; v++) {
      const { name: b, key: C } = t.names[v];
      if (o += " %c".concat(b), n.push(this.style.css(b)), C != null) {
        const A = "%c#".concat(C);
        o += A, n.push(this.style.css(A));
      }
    }
    const i = this.filtered, c = this.named.bind(this, t), p = [o, ...n];
    return Ra(
      i,
      t,
      r,
      e,
      p,
      uv(p),
      c
    );
  }
  function uv(e) {
    const t = e.slice(0);
    for (let r = 1; r < t.length; r++)
      t[r] += ";background-color:#e0005a;padding:2px;color:white";
    return t;
  }
  function dv(e, t) {
    const r = S(S({}, this.includes), this.include(t));
    let n = "";
    for (let p = 0; p < t.names.length; p++) {
      const { name: v, key: b } = t.names[p];
      n += " ".concat(v), b != null && (n += "#".concat(b));
    }
    const o = this.filtered, i = this.named.bind(this, t), c = [n];
    return Ra(
      o,
      t,
      r,
      e,
      c,
      c,
      i
    );
  }
  function Ra(e, t, r, n, o, i, c) {
    const p = ve(
      r,
      524
      /* _HMM */
    ), v = ve(
      r,
      522
      /* _TODO */
    ), b = ve(
      r,
      521
      /* _ERROR */
    ), C = ve(
      r,
      529
      /* ERROR_DEV */
    ), A = ve(
      r,
      545
      /* ERROR_PUBLIC */
    ), L = ve(
      r,
      265
      /* _WARN */
    ), K = ve(
      r,
      268
      /* _KAPOW */
    ), U = ve(
      r,
      273
      /* WARN_DEV */
    ), re = ve(
      r,
      289
      /* WARN_PUBLIC */
    ), se = ve(
      r,
      137
      /* _DEBUG */
    ), te = ve(
      r,
      145
      /* DEBUG_DEV */
    ), le = ve(
      r,
      73
      /* _TRACE */
    ), Ie = ve(
      r,
      81
      /* TRACE_DEV */
    ), Ue = p ? n.error.bind(n, ...o) : e.bind(
      t,
      524
      /* _HMM */
    ), ke = v ? n.error.bind(n, ...o) : e.bind(
      t,
      522
      /* _TODO */
    ), de = b ? n.error.bind(n, ...o) : e.bind(
      t,
      521
      /* _ERROR */
    ), Re = C ? n.error.bind(n, ...o) : e.bind(
      t,
      529
      /* ERROR_DEV */
    ), Ye = A ? n.error.bind(n, ...o) : e.bind(
      t,
      545
      /* ERROR_PUBLIC */
    ), ut = K ? n.warn.bind(n, ...i) : e.bind(
      t,
      268
      /* _KAPOW */
    ), Qt = L ? n.warn.bind(n, ...o) : e.bind(
      t,
      265
      /* _WARN */
    ), Zt = U ? n.warn.bind(n, ...o) : e.bind(
      t,
      273
      /* WARN_DEV */
    ), er = re ? n.warn.bind(n, ...o) : e.bind(
      t,
      273
      /* WARN_DEV */
    ), tr = se ? n.info.bind(n, ...o) : e.bind(
      t,
      137
      /* _DEBUG */
    ), rr = te ? n.info.bind(n, ...o) : e.bind(
      t,
      145
      /* DEBUG_DEV */
    ), we = le ? n.debug.bind(n, ...o) : e.bind(
      t,
      73
      /* _TRACE */
    ), Je = Ie ? n.debug.bind(n, ...o) : e.bind(
      t,
      81
      /* TRACE_DEV */
    ), ge = {
      _hmm: Ue,
      _todo: ke,
      _error: de,
      errorDev: Re,
      errorPublic: Ye,
      _kapow: ut,
      _warn: Qt,
      warnDev: Zt,
      warnPublic: er,
      _debug: tr,
      debugDev: rr,
      _trace: we,
      traceDev: Je,
      lazy: {
        _hmm: p ? he(Ue) : Ue,
        _todo: v ? he(ke) : ke,
        _error: b ? he(de) : de,
        errorDev: C ? he(Re) : Re,
        errorPublic: A ? he(Ye) : Ye,
        _kapow: K ? he(ut) : ut,
        _warn: L ? he(Qt) : Qt,
        warnDev: U ? he(Zt) : Zt,
        warnPublic: re ? he(er) : er,
        _debug: se ? he(tr) : tr,
        debugDev: te ? he(rr) : rr,
        _trace: le ? he(we) : we,
        traceDev: Ie ? he(Je) : Je
      },
      //
      named: c,
      utilFor: {
        internal() {
          return {
            debug: ge._debug,
            error: ge._error,
            warn: ge._warn,
            trace: ge._trace,
            named(Pt, Tt) {
              return ge.named(Pt, Tt).utilFor.internal();
            }
          };
        },
        dev() {
          return {
            debug: ge.debugDev,
            error: ge.errorDev,
            warn: ge.warnDev,
            trace: ge.traceDev,
            named(Pt, Tt) {
              return ge.named(Pt, Tt).utilFor.dev();
            }
          };
        },
        public() {
          return {
            error: ge.errorPublic,
            warn: ge.warnPublic,
            debug(Pt, Tt) {
              ge._warn('(public "debug" filtered out) '.concat(Pt), Tt);
            },
            trace(Pt, Tt) {
              ge._warn('(public "trace" filtered out) '.concat(Pt), Tt);
            },
            named(Pt, Tt) {
              return ge.named(Pt, Tt).utilFor.public();
            }
          };
        }
      }
    };
    return ge;
  }
  var za = ka(console, {});
  za.configureLogging({
    dev: !0,
    min: 64
    /* TRACE */
  });
  var In = za.getLogger().named("Theatre.js (default logger)").utilFor.dev(), La = /* @__PURE__ */ new WeakMap();
  function fv(e) {
    const t = La.get(e);
    if (t)
      return t;
    const r = /* @__PURE__ */ new Map();
    return La.set(e, r), Fa([], e, r), r;
  }
  function Fa(e, t, r) {
    for (const [n, o] of Object.entries(t.props))
      if (!Dn(o)) {
        const i = [...e, n];
        r.set(JSON.stringify(i), r.size), Ba(i, o, r);
      }
    for (const [n, o] of Object.entries(t.props))
      if (Dn(o)) {
        const i = [...e, n];
        r.set(JSON.stringify(i), r.size), Ba(i, o, r);
      }
  }
  function Ba(e, t, r) {
    if (t.type === "compound")
      Fa(e, t, r);
    else {
      if (t.type === "enum")
        throw new Error("Enums aren't supported yet");
      r.set(JSON.stringify(e), r.size);
    }
  }
  function Va(e) {
    return typeof e == "object" && e !== null && Object.keys(e).length === 0;
  }
  var pv = class {
    constructor(e, t, r, n, o) {
      this.sheetTemplate = e, f(this, "address"), f(this, "type", "Theatre_SheetObjectTemplate"), f(this, "_config"), f(this, "_temp_actions_atom"), f(this, "_cache", new jt()), f(this, "project"), f(this, "pointerToSheetState"), f(this, "pointerToStaticOverrides"), this.address = z(S({}, e.address), { objectKey: t }), this._config = new xe.Atom(n), this._temp_actions_atom = new xe.Atom(o), this.project = e.project, this.pointerToSheetState = this.sheetTemplate.project.pointers.historic.sheetsById[this.address.sheetId], this.pointerToStaticOverrides = this.pointerToSheetState.staticOverrides.byObject[this.address.objectKey];
    }
    get staticConfig() {
      return this._config.get();
    }
    get configPointer() {
      return this._config.pointer;
    }
    get _temp_actions() {
      return this._temp_actions_atom.get();
    }
    get _temp_actionsPointer() {
      return this._temp_actions_atom.pointer;
    }
    createInstance(e, t, r) {
      return this._config.set(r), new iv(e, this, t);
    }
    reconfigure(e) {
      this._config.set(e);
    }
    /**
     * The `actions` api is temporary until we implement events.
     */
    _temp_setActions(e) {
      this._temp_actions_atom.set(e);
    }
    /**
     * Returns the default values (all defaults are read from the config)
     */
    getDefaultValues() {
      return this._cache.get(
        "getDefaultValues()",
        () => (0, xe.prism)(() => {
          const e = (0, xe.val)(this.configPointer);
          return yo(e);
        })
      );
    }
    /**
     * Returns values that are set statically (ie, not sequenced, and not defaults)
     */
    getStaticValues() {
      return this._cache.get(
        "getStaticValues",
        () => (0, xe.prism)(() => {
          var e;
          const t = (e = (0, xe.val)(this.pointerToStaticOverrides)) != null ? e : {};
          return (0, xe.val)(this.configPointer).deserializeAndSanitize(t) || {};
        })
      );
    }
    /**
     * Filters through the sequenced tracks and returns those tracks who are valid
     * according to the object's prop types, then sorted in the same order as the config
     *
     * Returns an array.
     */
    getArrayOfValidSequenceTracks() {
      return this._cache.get(
        "getArrayOfValidSequenceTracks",
        () => (0, xe.prism)(() => {
          const e = this.project.pointers.historic.sheetsById[this.address.sheetId], t = (0, xe.val)(
            e.sequence.tracksByObject[this.address.objectKey].trackIdByPropPath
          );
          if (!t)
            return Ae;
          const r = [];
          if (!t)
            return Ae;
          const n = (0, xe.val)(this.configPointer), o = Object.entries(t);
          for (const [c, p] of o) {
            const v = hv(c);
            if (!v)
              continue;
            const b = Ko(n, v);
            b && ov(b) && r.push({ pathToProp: v, trackId: p });
          }
          const i = fv(n);
          return r.sort((c, p) => {
            const v = c.pathToProp, b = p.pathToProp, C = i.get(JSON.stringify(v)), A = i.get(JSON.stringify(b));
            return C > A ? 1 : -1;
          }), r.length === 0 ? Ae : r;
        })
      );
    }
    /**
     * Filters through the sequenced tracks those tracks that are valid
     * according to the object's prop types.
     *
     * Returns a map.
     *
     * Not available in core.
     */
    getMapOfValidSequenceTracks_forStudio() {
      return this._cache.get(
        "getMapOfValidSequenceTracks_forStudio",
        () => (0, xe.prism)(() => {
          const e = (0, xe.val)(this.getArrayOfValidSequenceTracks());
          let t = {};
          for (const { pathToProp: r, trackId: n } of e)
            mr(t, r, n);
          return t;
        })
      );
    }
    /**
     * @returns The static overrides that are not sequenced. Returns undefined if there are no static overrides,
     * or if all those static overrides are sequenced.
     */
    getStaticButNotSequencedOverrides() {
      return this._cache.get(
        "getStaticButNotSequencedOverrides",
        () => (0, xe.prism)(() => {
          const e = (0, xe.val)(this.getStaticValues()), t = (0, xe.val)(
            this.getArrayOfValidSequenceTracks()
          ), r = Xf(e);
          for (const { pathToProp: n } of t) {
            Ia(r, n);
            let o = n.slice(0, -1);
            for (; o.length > 0; ) {
              const i = pn(
                r,
                o
              );
              if (!Va(i))
                break;
              Ia(r, o), o = o.slice(0, -1);
            }
          }
          if (!Va(r))
            return r;
        })
      );
    }
    getDefaultsAtPointer(e) {
      const { path: t } = (0, xe.getPointerParts)(e), r = this.getDefaultValues().getValue();
      return pn(r, t);
    }
  };
  function hv(e) {
    try {
      return JSON.parse(e);
    } catch {
      In.warn(
        "property ".concat(JSON.stringify(
          e
        ), " cannot be parsed. Skipping.")
      );
      return;
    }
  }
  var Na = Pe, vv = sv(
    (e) => (
      // we're using JSON.stringify here, but we could use a faster alternative.
      // If you happen to do that, first make sure no `PathToProp_Encoded` is ever
      // used in the store, otherwise you'll have to write a migration.
      JSON.stringify(e)
    )
  );
  D(_());
  var gv = class extends Error {
  }, Hr = class extends gv {
  }, Ua = Pe, mv = Pe, yv = Pe, je = Pe;
  function Dt() {
    let e, t;
    const r = new Promise((o, i) => {
      e = (c) => {
        o(c), n.status = "resolved";
      }, t = (c) => {
        i(c), n.status = "rejected";
      };
    }), n = {
      resolve: e,
      reject: t,
      promise: r,
      status: "pending"
    };
    return n;
  }
  var _v = () => {
  }, kn = _v, bv = Pe, wv = class {
    constructor() {
      f(this, "_stopPlayCallback", kn), f(this, "_state", new bv.Atom({
        position: 0,
        playing: !1
      })), f(this, "statePointer"), this.statePointer = this._state.pointer;
    }
    destroy() {
    }
    pause() {
      this._stopPlayCallback(), this.playing = !1, this._stopPlayCallback = kn;
    }
    gotoPosition(e) {
      this._updatePositionInState(e);
    }
    _updatePositionInState(e) {
      this._state.setByPointer((t) => t.position, e);
    }
    getCurrentPosition() {
      return this._state.get().position;
    }
    get playing() {
      return this._state.get().playing;
    }
    set playing(e) {
      this._state.setByPointer((t) => t.playing, e);
    }
    play(e, t, r, n, o) {
      this.playing && this.pause(), this.playing = !0;
      const i = t[1] - t[0];
      {
        const L = this.getCurrentPosition();
        L < t[0] || L > t[1] ? n === "normal" || n === "alternate" ? this._updatePositionInState(t[0]) : (n === "reverse" || n === "alternateReverse") && this._updatePositionInState(t[1]) : n === "normal" || n === "alternate" ? L === t[1] && this._updatePositionInState(t[0]) : L === t[0] && this._updatePositionInState(t[1]);
      }
      const c = Dt(), p = o.time, v = i * e;
      let b = this.getCurrentPosition() - t[0];
      (n === "reverse" || n === "alternateReverse") && (b = t[1] - this.getCurrentPosition());
      const C = (L) => {
        const U = Math.max(
          L - p,
          0
        ) / 1e3, re = Math.min(
          U * r + b,
          v
        );
        if (re !== v) {
          const se = Math.floor(re / i);
          let te = re / i % 1 * i;
          if (n !== "normal")
            if (n === "reverse")
              te = i - te;
            else {
              const le = se % 2 === 0;
              n === "alternate" ? le || (te = i - te) : le && (te = i - te);
            }
          this._updatePositionInState(te + t[0]), A();
        } else {
          if (n === "normal")
            this._updatePositionInState(t[1]);
          else if (n === "reverse")
            this._updatePositionInState(t[0]);
          else {
            const se = (e - 1) % 2 === 0;
            n === "alternate" ? se ? this._updatePositionInState(t[1]) : this._updatePositionInState(t[0]) : se ? this._updatePositionInState(t[0]) : this._updatePositionInState(t[1]);
          }
          this.playing = !1, c.resolve(!0);
        }
      };
      this._stopPlayCallback = () => {
        o.offThisOrNextTick(C), o.offNextTick(C), this.playing && c.resolve(!1);
      };
      const A = () => o.onNextTick(C);
      return o.onThisOrNextTick(C), c.promise;
    }
    playDynamicRange(e, t) {
      this.playing && this.pause(), this.playing = !0;
      const r = Dt(), n = e.keepHot();
      r.promise.then(n, n);
      let o = t.time;
      const i = (p) => {
        const v = Math.max(
          p - o,
          0
        );
        o = p;
        const b = v / 1e3, C = this.getCurrentPosition(), A = e.getValue();
        if (C < A[0] || C > A[1])
          this.gotoPosition(A[0]);
        else {
          let L = C + b;
          L > A[1] && (L = A[0] + (L - A[1])), this.gotoPosition(L);
        }
        c();
      };
      this._stopPlayCallback = () => {
        t.offThisOrNextTick(i), t.offNextTick(i), r.resolve(!1);
      };
      const c = () => t.onNextTick(i);
      return t.onThisOrNextTick(i), r.promise;
    }
  }, Pv = Pe, Tv = "__TheatreJS_StudioBundle", Xo = "__TheatreJS_CoreBundle", Sv = "__TheatreJS_Notifications", Rn = (e) => (...t) => {
    var r;
    switch (e) {
      case "success": {
        In.debug(t.slice(0, 2).join(`
`));
        break;
      }
      case "info": {
        In.debug(t.slice(0, 2).join(`
`));
        break;
      }
      case "warning": {
        In.warn(t.slice(0, 2).join(`
`));
        break;
      }
    }
    return typeof window < "u" ? (
      // @ts-ignore
      (r = window[Sv]) == null ? void 0 : r.notify[e](...t)
    ) : void 0;
  }, wr = {
    warning: Rn("warning"),
    success: Rn("success"),
    info: Rn("info"),
    error: Rn("error")
  };
  typeof window < "u" && (window.addEventListener("error", (e) => {
    wr.error(
      "An error occurred",
      "<pre>".concat(e.message, `</pre>

See **console** for details.`)
    );
  }), window.addEventListener("unhandledrejection", (e) => {
    wr.error(
      "An error occurred",
      "<pre>".concat(e.reason, `</pre>

See **console** for details.`)
    );
  }));
  var xv = class {
    constructor(e, t, r) {
      this._decodedBuffer = e, this._audioContext = t, this._nodeDestination = r, f(this, "_mainGain"), f(this, "_state", new Pv.Atom({
        position: 0,
        playing: !1
      })), f(this, "statePointer"), f(this, "_stopPlayCallback", kn), this.statePointer = this._state.pointer, this._mainGain = this._audioContext.createGain(), this._mainGain.connect(this._nodeDestination);
    }
    playDynamicRange(e, t) {
      const r = Dt();
      this._playing && this.pause(), this._playing = !0;
      let n;
      const o = () => {
        n?.(), n = this._loopInRange(e.getValue(), t).stop;
      }, i = e.onStale(o);
      return o(), this._stopPlayCallback = () => {
        n?.(), i(), r.resolve(!1);
      }, r.promise;
    }
    _loopInRange(e, t) {
      let n = this.getCurrentPosition();
      const o = e[1] - e[0];
      n < e[0] || n > e[1] ? this._updatePositionInState(e[0]) : n === e[1] && this._updatePositionInState(e[0]), n = this.getCurrentPosition();
      const i = this._audioContext.createBufferSource();
      i.buffer = this._decodedBuffer, i.connect(this._mainGain), i.playbackRate.value = 1, i.loop = !0, i.loopStart = e[0], i.loopEnd = e[1];
      const c = t.time;
      let p = n - e[0];
      i.start(0, n);
      const v = (A) => {
        let re = (Math.max(
          A - c,
          0
        ) / 1e3 * 1 + p) / o % 1 * o;
        this._updatePositionInState(re + e[0]), b();
      }, b = () => t.onNextTick(v);
      return t.onThisOrNextTick(v), { stop: () => {
        i.stop(), i.disconnect(), t.offThisOrNextTick(v), t.offNextTick(v);
      } };
    }
    get _playing() {
      return this._state.get().playing;
    }
    set _playing(e) {
      this._state.setByPointer((t) => t.playing, e);
    }
    destroy() {
    }
    pause() {
      this._stopPlayCallback(), this._playing = !1, this._stopPlayCallback = kn;
    }
    gotoPosition(e) {
      this._updatePositionInState(e);
    }
    _updatePositionInState(e) {
      this._state.reduce((t) => z(S({}, t), { position: e }));
    }
    getCurrentPosition() {
      return this._state.get().position;
    }
    play(e, t, r, n, o) {
      this._playing && this.pause(), this._playing = !0;
      let i = this.getCurrentPosition();
      const c = t[1] - t[0];
      if (n !== "normal")
        throw new Hr(
          'Audio-controlled sequences can only be played in the "normal" direction. ' + "'".concat(n, "' given.")
        );
      i < t[0] || i > t[1] ? this._updatePositionInState(t[0]) : i === t[1] && this._updatePositionInState(t[0]), i = this.getCurrentPosition();
      const p = Dt(), v = this._audioContext.createBufferSource();
      v.buffer = this._decodedBuffer, v.connect(this._mainGain), v.playbackRate.value = r, e > 1e3 && (wr.warning(
        "Can't play sequences with audio more than 1000 times",
        "The sequence will still play, but only 1000 times. The `iterationCount: ".concat(e, "` provided to `sequence.play()`\nis too high for a sequence with audio.\n\nTo fix this, either set `iterationCount` to a lower value, or remove the audio from the sequence."),
        [
          {
            url: "https://www.theatrejs.com/docs/latest/manual/audio",
            title: "Using Audio"
          },
          {
            url: "https://www.theatrejs.com/docs/latest/api/core#sequence.attachaudio",
            title: "Audio API"
          }
        ]
      ), e = 1e3), e > 1 && (v.loop = !0, v.loopStart = t[0], v.loopEnd = t[1]);
      const b = o.time;
      let C = i - t[0];
      const A = c * e;
      v.start(0, i, A - C);
      const L = (re) => {
        const te = Math.max(
          re - b,
          0
        ) / 1e3, le = Math.min(
          te * r + C,
          A
        );
        if (le !== A) {
          let Ie = le / c % 1 * c;
          this._updatePositionInState(Ie + t[0]), U();
        } else
          this._updatePositionInState(t[1]), this._playing = !1, K(), p.resolve(!0);
      }, K = () => {
        v.stop(), v.disconnect();
      };
      this._stopPlayCallback = () => {
        K(), o.offThisOrNextTick(L), o.offNextTick(L), this._playing && p.resolve(!1);
      };
      const U = () => o.onNextTick(L);
      return o.onThisOrNextTick(L), p.promise;
    }
  }, Cv = Pe, Ga = 0;
  function Yo(e) {
    var t;
    const r = (c) => {
      n.tick(c);
    }, n = new Cv.Ticker({
      onActive() {
        var c;
        (c = e?.start) == null || c.call(e);
      },
      onDormant() {
        var c;
        (c = e?.stop) == null || c.call(e);
      }
    }), o = {
      tick: r,
      id: Ga++,
      name: (t = e?.name) != null ? t : "CustomRafDriver-".concat(Ga),
      type: "Theatre_RafDriver_PublicAPI"
    }, i = {
      type: "Theatre_RafDriver_PrivateAPI",
      publicApi: o,
      ticker: n,
      start: e?.start,
      stop: e?.stop
    };
    return oe(o, i), o;
  }
  function Av() {
    let e = null;
    const n = Yo({ name: "DefaultCoreRafDriver", start: () => {
      if (typeof window < "u") {
        const o = (i) => {
          n.tick(i), e = window.requestAnimationFrame(o);
        };
        e = window.requestAnimationFrame(o);
      } else
        n.tick(0), setTimeout(() => n.tick(1), 0);
    }, stop: () => {
      typeof window < "u" && e !== null && window.cancelAnimationFrame(e);
    } });
    return n;
  }
  var zn;
  function Ha() {
    return zn || Mv(Av()), zn;
  }
  function qa() {
    return Ha().ticker;
  }
  function Mv(e) {
    if (zn)
      throw new Error("`setCoreRafDriver()` is already called.");
    zn = $(e);
  }
  var Ov = class {
    get type() {
      return "Theatre_Sequence_PublicAPI";
    }
    /**
     * @internal
     */
    constructor(e) {
      oe(this, e);
    }
    play(e) {
      const t = $(this);
      if (t._project.isReady()) {
        const r = e?.rafDriver ? $(e.rafDriver).ticker : qa();
        return t.play(e ?? {}, r);
      } else {
        const r = Dt();
        return r.resolve(!0), r.promise;
      }
    }
    pause() {
      $(this).pause();
    }
    get position() {
      return $(this).position;
    }
    set position(e) {
      $(this).position = e;
    }
    __experimental_getKeyframes(e) {
      return $(this).getKeyframesOfSimpleProp(e);
    }
    async attachAudio(e) {
      const { audioContext: t, destinationNode: r, decodedBuffer: n, gainNode: o } = await jv(e), i = new xv(
        n,
        t,
        o
      );
      return $(this).replacePlaybackController(i), { audioContext: t, destinationNode: r, decodedBuffer: n, gainNode: o };
    }
    get pointer() {
      return $(this).pointer;
    }
  };
  async function jv(e) {
    function t() {
      if (e.audioContext)
        return Promise.resolve(e.audioContext);
      const b = new AudioContext();
      return b.state === "running" || typeof window > "u" ? Promise.resolve(b) : new Promise((C) => {
        const A = () => {
          b.resume().catch((U) => {
            console.error(U);
          });
        }, L = [
          "mousedown",
          "keydown",
          "touchstart"
        ], K = { capture: !0, passive: !1 };
        L.forEach((U) => {
          window.addEventListener(U, A, K);
        }), b.addEventListener("statechange", () => {
          b.state === "running" && (L.forEach((U) => {
            window.removeEventListener(U, A, K);
          }), C(b));
        });
      });
    }
    async function r() {
      if (e.source instanceof AudioBuffer)
        return e.source;
      const b = Dt();
      if (typeof e.source != "string")
        throw new Error(
          "Error validating arguments to sequence.attachAudio(). args.source must either be a string or an instance of AudioBuffer."
        );
      let C;
      try {
        C = await fetch(e.source);
      } catch (U) {
        throw console.error(U), new Error(
          "Could not fetch '".concat(e.source, "'. Network error logged above.")
        );
      }
      let A;
      try {
        A = await C.arrayBuffer();
      } catch (U) {
        throw console.error(U), new Error("Could not read '".concat(e.source, "' as an arrayBuffer."));
      }
      (await n).decodeAudioData(
        A,
        b.resolve,
        b.reject
      );
      let K;
      try {
        K = await b.promise;
      } catch (U) {
        throw console.error(U), new Error("Could not decode ".concat(e.source, " as an audio file."));
      }
      return K;
    }
    const n = t(), o = r(), [i, c] = await Promise.all([
      n,
      o
    ]), p = e.destinationNode || i.destination, v = i.createGain();
    return v.connect(p), {
      audioContext: i,
      decodedBuffer: c,
      gainNode: v,
      destinationNode: p
    };
  }
  var Ev = Dv("Theatre_SheetObject");
  function Dv(e) {
    return (t) => typeof t == "object" && !!t && t.type === e;
  }
  var Iv = class {
    constructor(e, t, r, n, o) {
      this._project = e, this._sheet = t, this._lengthD = r, this._subUnitsPerUnitD = n, f(this, "address"), f(this, "publicApi"), f(this, "_playbackControllerBox"), f(this, "_prismOfStatePointer"), f(this, "_positionD"), f(this, "_positionFormatterD"), f(this, "_playableRangeD"), f(this, "pointer", (0, yv.pointer)({ root: this, path: [] })), f(this, "$$isPointerToPrismProvider", !0), f(this, "_logger"), f(this, "closestGridPosition", (i) => {
        const p = 1 / this.subUnitsPerUnit;
        return parseFloat(
          (Math.round(i / p) * p).toFixed(3)
        );
      }), this._logger = e._logger.named("Sheet", t.address.sheetId).named("Instance", t.address.sheetInstanceId), this.address = z(S({}, this._sheet.address), { sequenceName: "default" }), this.publicApi = new Ov(this), this._playbackControllerBox = new mv.Atom(
        o ?? new wv()
      ), this._prismOfStatePointer = (0, je.prism)(
        () => this._playbackControllerBox.prism.getValue().statePointer
      ), this._positionD = (0, je.prism)(() => {
        const i = this._prismOfStatePointer.getValue();
        return (0, je.val)(i.position);
      }), this._positionFormatterD = (0, je.prism)(() => {
        const i = (0, je.val)(this._subUnitsPerUnitD);
        return new kv(i);
      });
    }
    get type() {
      return "Theatre_Sequence";
    }
    pointerToPrism(e) {
      const { path: t } = (0, Ua.getPointerParts)(e);
      if (t.length === 0)
        return (0, je.prism)(() => ({
          length: (0, je.val)(this.pointer.length),
          playing: (0, je.val)(this.pointer.playing),
          position: (0, je.val)(this.pointer.position),
          subUnitsPerUnit: (0, je.val)(this.pointer.subUnitsPerUnit)
        }));
      if (t.length > 1)
        return (0, je.prism)(() => {
        });
      const [r] = t;
      return r === "length" ? this._lengthD : r === "subUnitsPerUnit" ? this._subUnitsPerUnitD : r === "position" ? this._positionD : r === "playing" ? (0, je.prism)(() => (0, je.val)(this._prismOfStatePointer.getValue().playing)) : (0, je.prism)(() => {
      });
    }
    /**
     * Takes a pointer to a property of a SheetObject and returns the keyframes of that property.
     *
     * Theoretically, this method can be called from inside a prism so it can be reactive.
     */
    getKeyframesOfSimpleProp(e) {
      const { path: t, root: r } = (0, Ua.getPointerParts)(e);
      if (!Ev(r))
        throw new Hr(
          "Argument prop must be a pointer to a SheetObject property"
        );
      const n = (0, je.val)(
        this._project.pointers.historic.sheetsById[this._sheet.address.sheetId].sequence.tracksByObject[r.address.objectKey]
      );
      if (!n)
        return [];
      const { trackData: o, trackIdByPropPath: i } = n, c = vv(t), p = i[c];
      if (!p)
        return [];
      const v = o[p];
      return v ? v.keyframes : [];
    }
    get positionFormatter() {
      return this._positionFormatterD.getValue();
    }
    get prismOfStatePointer() {
      return this._prismOfStatePointer;
    }
    get length() {
      return this._lengthD.getValue();
    }
    get positionPrism() {
      return this._positionD;
    }
    get position() {
      return this._playbackControllerBox.get().getCurrentPosition();
    }
    get subUnitsPerUnit() {
      return this._subUnitsPerUnitD.getValue();
    }
    get positionSnappedToGrid() {
      return this.closestGridPosition(this.position);
    }
    set position(e) {
      let t = e;
      this.pause(), t > this.length && (t = this.length);
      const r = this.length;
      this._playbackControllerBox.get().gotoPosition(t > r ? r : t);
    }
    getDurationCold() {
      return this._lengthD.getValue();
    }
    get playing() {
      return (0, je.val)(this._playbackControllerBox.get().statePointer.playing);
    }
    _makeRangeFromSequenceTemplate() {
      return (0, je.prism)(() => [0, (0, je.val)(this._lengthD)]);
    }
    /**
     * Controls the playback within a range. Repeats infinitely unless stopped.
     *
     * @remarks
     *   One use case for this is to play the playback within the focus range.
     *
     * @param rangeD - The prism that contains the range that will be used for the playback
     *
     * @returns  a promise that gets rejected if the playback stopped for whatever reason
     *
     */
    playDynamicRange(e, t) {
      return this._playbackControllerBox.get().playDynamicRange(e, t);
    }
    async play(e, t) {
      const r = this.length, n = e && e.range ? e.range : [0, r], o = e && typeof e.iterationCount == "number" ? e.iterationCount : 1, i = e && typeof e.rate < "u" ? e.rate : 1, c = e && e.direction ? e.direction : "normal";
      return await this._play(
        o,
        [n[0], n[1]],
        i,
        c,
        t
      );
    }
    _play(e, t, r, n, o) {
      return this._playbackControllerBox.get().play(e, t, r, n, o);
    }
    pause() {
      this._playbackControllerBox.get().pause();
    }
    replacePlaybackController(e) {
      this.pause();
      const t = this._playbackControllerBox.get();
      this._playbackControllerBox.set(e);
      const r = t.getCurrentPosition();
      t.destroy(), e.gotoPosition(r);
    }
  }, kv = class {
    constructor(e) {
      this._fps = e;
    }
    formatSubUnitForGrid(e) {
      const t = e % 1, r = 1 / this._fps;
      return Math.round(t / r) + "f";
    }
    formatFullUnitForGrid(e) {
      let t = e, r = "";
      if (t >= Pr) {
        const o = Math.floor(t / Pr);
        r += o + "h", t = t % Pr;
      }
      if (t >= Kt) {
        const o = Math.floor(t / Kt);
        r += o + "m", t = t % Kt;
      }
      if (t >= Wt) {
        const o = Math.floor(t / Wt);
        r += o + "s", t = t % Wt;
      }
      const n = 1 / this._fps;
      if (t >= n) {
        const o = Math.floor(t / n);
        r += o + "f", t = t % n;
      }
      return r.length === 0 ? "0s" : r;
    }
    formatForPlayhead(e) {
      let t = e, r = "";
      if (t >= Pr) {
        const o = Math.floor(t / Pr);
        r += Gr(o.toString(), 2, "0") + "h", t = t % Pr;
      }
      if (t >= Kt) {
        const o = Math.floor(t / Kt);
        r += Gr(o.toString(), 2, "0") + "m", t = t % Kt;
      } else r.length > 0 && (r += "00m");
      if (t >= Wt) {
        const o = Math.floor(t / Wt);
        r += Gr(o.toString(), 2, "0") + "s", t = t % Wt;
      } else
        r += "00s";
      const n = 1 / this._fps;
      if (t >= n) {
        const o = Math.round(t / n);
        r += Gr(o.toString(), 2, "0") + "f", t = t % n;
      } else t / n > 0.98 ? (r += Gr("1", 2, "0") + "f", t = t % n) : r += "00f";
      return r.length === 0 ? "00s00f" : r;
    }
    formatBasic(e) {
      return e.toFixed(2) + "s";
    }
  }, Wt = 1, Kt = Wt * 60, Pr = Kt * 60, Jo = {};
  Y(Jo, {
    boolean: () => Qa,
    compound: () => Zo,
    file: () => Uv,
    image: () => Hv,
    number: () => Ja,
    rgba: () => Xv,
    string: () => Za,
    stringLiteral: () => eg
  });
  function $a(e, t) {
    return e.length <= t ? e : e.substr(0, t - 3) + "...";
  }
  var Rv = (e) => typeof e == "string" ? 'string("'.concat($a(e, 10), '")') : typeof e == "number" ? "number(".concat($a(String(e), 10), ")") : e === null ? "null" : e === void 0 ? "undefined" : typeof e == "boolean" ? String(e) : Array.isArray(e) ? "array" : typeof e == "object" ? "object" : "unknown", Wa = Rv;
  function zv(e, {
    /** Alpha is usually an optional value for most hex inputs, so if it's opaque, we can omit its value. */
    removeAlphaIfOpaque: t = !1
  } = {}) {
    const r = (e.a * 255 | 256).toString(16).slice(1), n = (e.r * 255 | 256).toString(16).slice(1) + (e.g * 255 | 256).toString(16).slice(1) + (e.b * 255 | 256).toString(16).slice(1) + (t && r === "ff" ? "" : r);
    return "#".concat(n);
  }
  function Qo(e) {
    return z(S({}, e), {
      toString() {
        return zv(this, { removeAlphaIfOpaque: !0 });
      }
    });
  }
  function Lv(e) {
    return Object.fromEntries(
      Object.entries(e).map(([t, r]) => [t, Wi(r, 0, 1)])
    );
  }
  function Fv(e) {
    function t(r) {
      return r >= 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
    }
    return Lv({
      r: t(e.r),
      g: t(e.g),
      b: t(e.b),
      a: e.a
    });
  }
  function Ka(e) {
    function t(r) {
      return r >= 0.04045 ? ((r + 0.055) / (1 + 0.055)) ** 2.4 : r / 12.92;
    }
    return {
      r: t(e.r),
      g: t(e.g),
      b: t(e.b),
      a: e.a
    };
  }
  function Xa(e) {
    let t = 0.4122214708 * e.r + 0.5363325363 * e.g + 0.0514459929 * e.b, r = 0.2119034982 * e.r + 0.6806995451 * e.g + 0.1073969566 * e.b, n = 0.0883024619 * e.r + 0.2817188376 * e.g + 0.6299787005 * e.b, o = Math.cbrt(t), i = Math.cbrt(r), c = Math.cbrt(n);
    return {
      L: 0.2104542553 * o + 0.793617785 * i - 0.0040720468 * c,
      a: 1.9779984951 * o - 2.428592205 * i + 0.4505937099 * c,
      b: 0.0259040371 * o + 0.7827717662 * i - 0.808675766 * c,
      alpha: e.a
    };
  }
  function Bv(e) {
    let t = e.L + 0.3963377774 * e.a + 0.2158037573 * e.b, r = e.L - 0.1055613458 * e.a - 0.0638541728 * e.b, n = e.L - 0.0894841775 * e.a - 1.291485548 * e.b, o = t * t * t, i = r * r * r, c = n * n * n;
    return {
      r: 4.0767416621 * o - 3.3077115913 * i + 0.2309699292 * c,
      g: -1.2684380046 * o + 2.6097574011 * i - 0.3413193965 * c,
      b: -0.0041960863 * o - 0.7034186147 * i + 1.707614701 * c,
      a: e.alpha
    };
  }
  var bt = Symbol("TheatrePropType_Basic");
  function Ya(e) {
    return typeof e == "object" && !!e && e[bt] === "TheatrePropType";
  }
  function Vv(e) {
    if (typeof e == "number")
      return Ja(e);
    if (typeof e == "boolean")
      return Qa(e);
    if (typeof e == "string")
      return Za(e);
    if (typeof e == "object" && e) {
      if (Ya(e))
        return e;
      if (tu(e))
        return Zo(e);
      throw new Hr(
        "This value is not a valid prop type: ".concat(Wa(e))
      );
    } else
      throw new Hr(
        "This value is not a valid prop type: ".concat(Wa(e))
      );
  }
  function Nv(e) {
    const t = {};
    for (const r of Object.keys(e)) {
      const n = e[r];
      Ya(n) ? t[r] = n : t[r] = Vv(n);
    }
    return t;
  }
  var Zo = (e, t = {}) => {
    const r = Nv(e), n = /* @__PURE__ */ new WeakMap();
    return {
      type: "compound",
      props: r,
      valueType: null,
      [bt]: "TheatrePropType",
      label: t.label,
      default: Oh(r, (i) => i.default),
      deserializeAndSanitize: (i) => {
        if (typeof i != "object" || !i)
          return;
        if (n.has(i))
          return n.get(i);
        const c = {};
        let p = !1;
        for (const [v, b] of Object.entries(r))
          if (Object.prototype.hasOwnProperty.call(i, v)) {
            const C = b.deserializeAndSanitize(
              i[v]
            );
            C != null && (p = !0, c[v] = C);
          }
        if (n.set(i, c), p)
          return c;
      }
    };
  }, Uv = (e, t = {}) => {
    const r = (n, o, i) => {
      var c;
      return {
        type: "file",
        id: ((c = t.interpolate) != null ? c : qr)(n.id, o.id, i)
      };
    };
    return {
      type: "file",
      default: { type: "file", id: e },
      valueType: null,
      [bt]: "TheatrePropType",
      label: t.label,
      interpolate: r,
      deserializeAndSanitize: Gv
    };
  }, Gv = (e) => {
    if (!e)
      return;
    let t = !0;
    if (typeof e.id != "string" && ![null, void 0].includes(e.id) && (t = !1), e.type !== "file" && (t = !1), !!t)
      return e;
  }, Hv = (e, t = {}) => {
    const r = (n, o, i) => {
      var c;
      return {
        type: "image",
        id: ((c = t.interpolate) != null ? c : qr)(n.id, o.id, i)
      };
    };
    return {
      type: "image",
      default: { type: "image", id: e },
      valueType: null,
      [bt]: "TheatrePropType",
      label: t.label,
      interpolate: r,
      deserializeAndSanitize: qv
    };
  }, qv = (e) => {
    if (!e)
      return;
    let t = !0;
    if (typeof e.id != "string" && ![null, void 0].includes(e.id) && (t = !1), e.type !== "image" && (t = !1), !!t)
      return e;
  }, Ja = (e, t = {}) => {
    var r;
    return z(S({
      type: "number",
      valueType: 0,
      default: e,
      [bt]: "TheatrePropType"
    }, t || {}), {
      label: t.label,
      nudgeFn: (r = t.nudgeFn) != null ? r : tg,
      nudgeMultiplier: typeof t.nudgeMultiplier == "number" ? t.nudgeMultiplier : void 0,
      interpolate: Kv,
      deserializeAndSanitize: $v(t.range)
    });
  }, $v = (e) => e ? (t) => {
    if (typeof t == "number" && isFinite(t))
      return Wi(t, e[0], e[1]);
  } : Wv, Wv = (e) => typeof e == "number" && isFinite(e) ? e : void 0, Kv = (e, t, r) => e + r * (t - e), Xv = (e = { r: 0, g: 0, b: 0, a: 1 }, t = {}) => {
    const r = {};
    for (const n of ["r", "g", "b", "a"])
      r[n] = Math.min(
        Math.max(e[n], 0),
        1
      );
    return {
      type: "rgba",
      valueType: null,
      default: Qo(r),
      [bt]: "TheatrePropType",
      label: t.label,
      interpolate: Jv,
      deserializeAndSanitize: Yv
    };
  }, Yv = (e) => {
    if (!e)
      return;
    let t = !0;
    for (const n of ["r", "g", "b", "a"])
      (!Object.prototype.hasOwnProperty.call(e, n) || typeof e[n] != "number") && (t = !1);
    if (!t)
      return;
    const r = {};
    for (const n of ["r", "g", "b", "a"])
      r[n] = Math.min(
        Math.max(e[n], 0),
        1
      );
    return Qo(r);
  }, Jv = (e, t, r) => {
    const n = Xa(Ka(e)), o = Xa(Ka(t)), i = {
      L: (1 - r) * n.L + r * o.L,
      a: (1 - r) * n.a + r * o.a,
      b: (1 - r) * n.b + r * o.b,
      alpha: (1 - r) * n.alpha + r * o.alpha
    }, c = Fv(Bv(i));
    return Qo(c);
  }, Qa = (e, t = {}) => {
    var r;
    return {
      type: "boolean",
      default: e,
      valueType: null,
      [bt]: "TheatrePropType",
      label: t.label,
      interpolate: (r = t.interpolate) != null ? r : qr,
      deserializeAndSanitize: Qv
    };
  }, Qv = (e) => typeof e == "boolean" ? e : void 0;
  function qr(e) {
    return e;
  }
  var Za = (e, t = {}) => {
    var r;
    return {
      type: "string",
      default: e,
      valueType: null,
      [bt]: "TheatrePropType",
      label: t.label,
      interpolate: (r = t.interpolate) != null ? r : qr,
      deserializeAndSanitize: Zv
    };
  };
  function Zv(e) {
    return typeof e == "string" ? e : void 0;
  }
  function eg(e, t, r = {}) {
    var n, o;
    return {
      type: "stringLiteral",
      default: e,
      valuesAndLabels: S({}, t),
      [bt]: "TheatrePropType",
      valueType: null,
      as: (n = r.as) != null ? n : "menu",
      label: r.label,
      interpolate: (o = r.interpolate) != null ? o : qr,
      deserializeAndSanitize(i) {
        if (typeof i == "string" && Object.prototype.hasOwnProperty.call(t, i))
          return i;
      }
    };
  }
  var tg = ({
    config: e,
    deltaX: t,
    deltaFraction: r,
    magnitude: n
  }) => {
    var o;
    const { range: i } = e;
    return !e.nudgeMultiplier && i && !i.includes(1 / 0) && !i.includes(-1 / 0) ? r * (i[1] - i[0]) * n : t * n * ((o = e.nudgeMultiplier) != null ? o : 1);
  }, rg = (e) => e.replace(/^[\s\/]*/, "").replace(/[\s\/]*$/, "").replace(/\s*\/\s*/g, " / ");
  function Ln(e, t) {
    return rg(e);
  }
  D(k());
  var ng = class {
    get type() {
      return "Theatre_Sheet_PublicAPI";
    }
    /**
     * @internal
     */
    constructor(e) {
      oe(this, e);
    }
    object(e, t, r) {
      const n = $(this), o = Ln(
        e
      ), i = n.getObject(o), c = null, p = r?.__actions__THIS_API_IS_UNSTABLE_AND_WILL_CHANGE_IN_THE_NEXT_VERSION;
      if (i)
        return p && i.template._temp_setActions(p), i.publicApi;
      {
        const v = Zo(t);
        return n.createObject(
          o,
          c,
          v,
          p
        ).publicApi;
      }
    }
    __experimental_getExistingObject(e) {
      const t = $(this), r = Ln(
        e
      ), n = t.getObject(r);
      return n?.publicApi;
    }
    get sequence() {
      return $(this).getSequence().publicApi;
    }
    get project() {
      return $(this).project.publicApi;
    }
    get address() {
      return S({}, $(this).address);
    }
    detachObject(e) {
      const t = $(this), r = Ln(
        e
      );
      if (!t.getObject(r)) {
        wr.warning(
          `Couldn't delete object "`.concat(r, '"'),
          'There is no object with key "'.concat(r, `".

To fix this, make sure you are calling \`sheet.deleteObject("`).concat(r, '")` with the correct key.')
        ), console.warn('Object key "'.concat(r, '" does not exist.'));
        return;
      }
      t.deleteObject(r);
    }
  }, $r = Pe, sg = class {
    constructor(e, t) {
      this.template = e, this.instanceId = t, f(this, "_objects", new $r.Atom({})), f(this, "_sequence"), f(this, "address"), f(this, "publicApi"), f(this, "project"), f(this, "objectsP", this._objects.pointer), f(this, "type", "Theatre_Sheet"), f(this, "_logger"), this._logger = e.project._logger.named("Sheet", t), this._logger._trace("creating sheet"), this.project = e.project, this.address = z(S({}, e.address), {
        sheetInstanceId: this.instanceId
      }), this.publicApi = new ng(this);
    }
    /**
     * @remarks At some point, we have to reconcile the concept of "an object"
     * with that of "an element."
     */
    createObject(e, t, r, n = {}) {
      const i = this.template.getObjectTemplate(
        e,
        t,
        r,
        n
      ).createInstance(this, t, r);
      return this._objects.setByPointer((c) => c[e], i), i;
    }
    getObject(e) {
      return this._objects.get()[e];
    }
    deleteObject(e) {
      this._objects.reduce((t) => {
        const r = S({}, t);
        return delete r[e], r;
      });
    }
    getSequence() {
      if (!this._sequence) {
        const e = (0, $r.prism)(() => {
          const r = (0, $r.val)(
            this.project.pointers.historic.sheetsById[this.address.sheetId].sequence.length
          );
          return og(r);
        }), t = (0, $r.prism)(() => {
          const r = (0, $r.val)(
            this.project.pointers.historic.sheetsById[this.address.sheetId].sequence.subUnitsPerUnit
          );
          return ig(r);
        });
        this._sequence = new Iv(
          this.template.project,
          this,
          e,
          t
        );
      }
      return this._sequence;
    }
  }, og = (e) => typeof e == "number" && isFinite(e) && e > 0 ? e : 10, ig = (e) => typeof e == "number" && Ah(e) && e >= 1 && e <= 1e3 ? e : 30, ag = class {
    constructor(e, t) {
      this.project = e, f(this, "type", "Theatre_SheetTemplate"), f(this, "address"), f(this, "_instances", new Na.Atom({})), f(this, "instancesP", this._instances.pointer), f(this, "_objectTemplates", new Na.Atom({})), f(this, "objectTemplatesP", this._objectTemplates.pointer), this.address = z(S({}, e.address), { sheetId: t });
    }
    getInstance(e) {
      let t = this._instances.get()[e];
      return t || (t = new sg(this, e), this._instances.setByPointer((r) => r[e], t)), t;
    }
    getObjectTemplate(e, t, r, n) {
      let o = this._objectTemplates.get()[e];
      return o || (o = new pv(
        this,
        e,
        t,
        r,
        n
      ), this._objectTemplates.setByPointer((i) => i[e], o)), o;
    }
  }, ei = Pe, el = Pe, lg = (e) => new Promise((t) => setTimeout(t, e)), cg = lg;
  function nt(e) {
    for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
      r[n - 1] = arguments[n];
    throw Error("[Immer] minified error nr: " + e + (r.length ? " " + r.map(function(o) {
      return "'" + o + "'";
    }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
  }
  function Xt(e) {
    return !!e && !!e[Ne];
  }
  function Yt(e) {
    return !!e && (function(t) {
      if (!t || typeof t != "object")
        return !1;
      var r = Object.getPrototypeOf(t);
      if (r === null)
        return !0;
      var n = Object.hasOwnProperty.call(r, "constructor") && r.constructor;
      return n === Object || typeof n == "function" && Function.toString.call(n) === yg;
    }(e) || Array.isArray(e) || !!e[ul] || !!e.constructor[ul] || ri(e) || ni(e));
  }
  function ug(e) {
    return Xt(e) || nt(23, e), e[Ne].t;
  }
  function Wr(e, t, r) {
    r === void 0 && (r = !1), Tr(e) === 0 ? (r ? Object.keys : vi)(e).forEach(function(n) {
      r && typeof n == "symbol" || t(n, e[n], e);
    }) : e.forEach(function(n, o) {
      return t(o, n, e);
    });
  }
  function Tr(e) {
    var t = e[Ne];
    return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(e) ? 1 : ri(e) ? 2 : ni(e) ? 3 : 0;
  }
  function ti(e, t) {
    return Tr(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
  }
  function dg(e, t) {
    return Tr(e) === 2 ? e.get(t) : e[t];
  }
  function tl(e, t, r) {
    var n = Tr(e);
    n === 2 ? e.set(t, r) : n === 3 ? (e.delete(t), e.add(r)) : e[t] = r;
  }
  function fg(e, t) {
    return e === t ? e !== 0 || 1 / e == 1 / t : e != e && t != t;
  }
  function ri(e) {
    return gg && e instanceof Map;
  }
  function ni(e) {
    return mg && e instanceof Set;
  }
  function Jt(e) {
    return e.o || e.t;
  }
  function si(e) {
    if (Array.isArray(e))
      return Array.prototype.slice.call(e);
    var t = _g(e);
    delete t[Ne];
    for (var r = vi(t), n = 0; n < r.length; n++) {
      var o = r[n], i = t[o];
      i.writable === !1 && (i.writable = !0, i.configurable = !0), (i.get || i.set) && (t[o] = { configurable: !0, writable: !0, enumerable: i.enumerable, value: e[o] });
    }
    return Object.create(Object.getPrototypeOf(e), t);
  }
  function oi(e, t) {
    return t === void 0 && (t = !1), ii(e) || Xt(e) || !Yt(e) || (Tr(e) > 1 && (e.set = e.add = e.clear = e.delete = pg), Object.freeze(e), t && Wr(e, function(r, n) {
      return oi(n, !0);
    }, !0)), e;
  }
  function pg() {
    nt(2);
  }
  function ii(e) {
    return e == null || typeof e != "object" || Object.isFrozen(e);
  }
  function wt(e) {
    var t = bg[e];
    return t || nt(18, e), t;
  }
  function rl() {
    return Kr;
  }
  function ai(e, t) {
    t && (wt("Patches"), e.u = [], e.s = [], e.v = t);
  }
  function Fn(e) {
    li(e), e.p.forEach(hg), e.p = null;
  }
  function li(e) {
    e === Kr && (Kr = e.l);
  }
  function nl(e) {
    return Kr = { p: [], l: Kr, h: e, m: !0, _: 0 };
  }
  function hg(e) {
    var t = e[Ne];
    t.i === 0 || t.i === 1 ? t.j() : t.O = !0;
  }
  function ci(e, t) {
    t._ = t.p.length;
    var r = t.p[0], n = e !== void 0 && e !== r;
    return t.h.g || wt("ES5").S(t, e, n), n ? (r[Ne].P && (Fn(t), nt(4)), Yt(e) && (e = Bn(t, e), t.l || Vn(t, e)), t.u && wt("Patches").M(r[Ne], e, t.u, t.s)) : e = Bn(t, r, []), Fn(t), t.u && t.v(t.u, t.s), e !== cl ? e : void 0;
  }
  function Bn(e, t, r) {
    if (ii(t))
      return t;
    var n = t[Ne];
    if (!n)
      return Wr(t, function(i, c) {
        return sl(e, n, t, i, c, r);
      }, !0), t;
    if (n.A !== e)
      return t;
    if (!n.P)
      return Vn(e, n.t, !0), n.t;
    if (!n.I) {
      n.I = !0, n.A._--;
      var o = n.i === 4 || n.i === 5 ? n.o = si(n.k) : n.o;
      Wr(n.i === 3 ? new Set(o) : o, function(i, c) {
        return sl(e, n, o, i, c, r);
      }), Vn(e, o, !1), r && e.u && wt("Patches").R(n, r, e.u, e.s);
    }
    return n.o;
  }
  function sl(e, t, r, n, o, i) {
    if (Xt(o)) {
      var c = Bn(e, o, i && t && t.i !== 3 && !ti(t.D, n) ? i.concat(n) : void 0);
      if (tl(r, n, c), !Xt(c))
        return;
      e.m = !1;
    }
    if (Yt(o) && !ii(o)) {
      if (!e.h.F && e._ < 1)
        return;
      Bn(e, o), t && t.A.l || Vn(e, o);
    }
  }
  function Vn(e, t, r) {
    r === void 0 && (r = !1), e.h.F && e.m && oi(t, r);
  }
  function ui(e, t) {
    var r = e[Ne];
    return (r ? Jt(r) : e)[t];
  }
  function ol(e, t) {
    if (t in e)
      for (var r = Object.getPrototypeOf(e); r; ) {
        var n = Object.getOwnPropertyDescriptor(r, t);
        if (n)
          return n;
        r = Object.getPrototypeOf(r);
      }
  }
  function di(e) {
    e.P || (e.P = !0, e.l && di(e.l));
  }
  function fi(e) {
    e.o || (e.o = si(e.t));
  }
  function pi(e, t, r) {
    var n = ri(t) ? wt("MapSet").N(t, r) : ni(t) ? wt("MapSet").T(t, r) : e.g ? function(o, i) {
      var c = Array.isArray(o), p = { i: c ? 1 : 0, A: i ? i.A : rl(), P: !1, I: !1, D: {}, l: i, t: o, k: null, o: null, j: null, C: !1 }, v = p, b = Nn;
      c && (v = [p], b = Un);
      var C = Proxy.revocable(v, b), A = C.revoke, L = C.proxy;
      return p.k = L, p.j = A, L;
    }(t, r) : wt("ES5").J(t, r);
    return (r ? r.A : rl()).p.push(n), n;
  }
  function vg(e) {
    return Xt(e) || nt(22, e), function t(r) {
      if (!Yt(r))
        return r;
      var n, o = r[Ne], i = Tr(r);
      if (o) {
        if (!o.P && (o.i < 4 || !wt("ES5").K(o)))
          return o.t;
        o.I = !0, n = il(r, i), o.I = !1;
      } else
        n = il(r, i);
      return Wr(n, function(c, p) {
        o && dg(o.t, c) === p || tl(n, c, t(p));
      }), i === 3 ? new Set(n) : n;
    }(e);
  }
  function il(e, t) {
    switch (t) {
      case 2:
        return new Map(e);
      case 3:
        return Array.from(e);
    }
    return si(e);
  }
  var al, Kr, hi = typeof Symbol < "u" && typeof Symbol("x") == "symbol", gg = typeof Map < "u", mg = typeof Set < "u", ll = typeof Proxy < "u" && Proxy.revocable !== void 0 && typeof Reflect < "u", cl = hi ? Symbol.for("immer-nothing") : ((al = {})["immer-nothing"] = !0, al), ul = hi ? Symbol.for("immer-draftable") : "__$immer_draftable", Ne = hi ? Symbol.for("immer-state") : "__$immer_state", yg = "" + Object.prototype.constructor, vi = typeof Reflect < "u" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(e) {
    return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
  } : Object.getOwnPropertyNames, _g = Object.getOwnPropertyDescriptors || function(e) {
    var t = {};
    return vi(e).forEach(function(r) {
      t[r] = Object.getOwnPropertyDescriptor(e, r);
    }), t;
  }, bg = {}, Nn = { get: function(e, t) {
    if (t === Ne)
      return e;
    var r = Jt(e);
    if (!ti(r, t))
      return function(o, i, c) {
        var p, v = ol(i, c);
        return v ? "value" in v ? v.value : (p = v.get) === null || p === void 0 ? void 0 : p.call(o.k) : void 0;
      }(e, r, t);
    var n = r[t];
    return e.I || !Yt(n) ? n : n === ui(e.t, t) ? (fi(e), e.o[t] = pi(e.A.h, n, e)) : n;
  }, has: function(e, t) {
    return t in Jt(e);
  }, ownKeys: function(e) {
    return Reflect.ownKeys(Jt(e));
  }, set: function(e, t, r) {
    var n = ol(Jt(e), t);
    if (n?.set)
      return n.set.call(e.k, r), !0;
    if (!e.P) {
      var o = ui(Jt(e), t), i = o?.[Ne];
      if (i && i.t === r)
        return e.o[t] = r, e.D[t] = !1, !0;
      if (fg(r, o) && (r !== void 0 || ti(e.t, t)))
        return !0;
      fi(e), di(e);
    }
    return e.o[t] === r && typeof r != "number" && (r !== void 0 || t in e.o) || (e.o[t] = r, e.D[t] = !0, !0);
  }, deleteProperty: function(e, t) {
    return ui(e.t, t) !== void 0 || t in e.t ? (e.D[t] = !1, fi(e), di(e)) : delete e.D[t], e.o && delete e.o[t], !0;
  }, getOwnPropertyDescriptor: function(e, t) {
    var r = Jt(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && { writable: !0, configurable: e.i !== 1 || t !== "length", enumerable: n.enumerable, value: r[t] };
  }, defineProperty: function() {
    nt(11);
  }, getPrototypeOf: function(e) {
    return Object.getPrototypeOf(e.t);
  }, setPrototypeOf: function() {
    nt(12);
  } }, Un = {};
  Wr(Nn, function(e, t) {
    Un[e] = function() {
      return arguments[0] = arguments[0][0], t.apply(this, arguments);
    };
  }), Un.deleteProperty = function(e, t) {
    return Nn.deleteProperty.call(this, e[0], t);
  }, Un.set = function(e, t, r) {
    return Nn.set.call(this, e[0], t, r, e[0]);
  };
  var wg = function() {
    function e(r) {
      var n = this;
      this.g = ll, this.F = !0, this.produce = function(o, i, c) {
        if (typeof o == "function" && typeof i != "function") {
          var p = i;
          i = o;
          var v = n;
          return function(K) {
            var U = this;
            K === void 0 && (K = p);
            for (var re = arguments.length, se = Array(re > 1 ? re - 1 : 0), te = 1; te < re; te++)
              se[te - 1] = arguments[te];
            return v.produce(K, function(le) {
              var Ie;
              return (Ie = i).call.apply(Ie, [U, le].concat(se));
            });
          };
        }
        var b;
        if (typeof i != "function" && nt(6), c !== void 0 && typeof c != "function" && nt(7), Yt(o)) {
          var C = nl(n), A = pi(n, o, void 0), L = !0;
          try {
            b = i(A), L = !1;
          } finally {
            L ? Fn(C) : li(C);
          }
          return typeof Promise < "u" && b instanceof Promise ? b.then(function(K) {
            return ai(C, c), ci(K, C);
          }, function(K) {
            throw Fn(C), K;
          }) : (ai(C, c), ci(b, C));
        }
        if (!o || typeof o != "object")
          return (b = i(o)) === cl ? void 0 : (b === void 0 && (b = o), n.F && oi(b, !0), b);
        nt(21, o);
      }, this.produceWithPatches = function(o, i) {
        return typeof o == "function" ? function(v) {
          for (var b = arguments.length, C = Array(b > 1 ? b - 1 : 0), A = 1; A < b; A++)
            C[A - 1] = arguments[A];
          return n.produceWithPatches(v, function(L) {
            return o.apply(void 0, [L].concat(C));
          });
        } : [n.produce(o, i, function(v, b) {
          c = v, p = b;
        }), c, p];
        var c, p;
      }, typeof r?.useProxies == "boolean" && this.setUseProxies(r.useProxies), typeof r?.autoFreeze == "boolean" && this.setAutoFreeze(r.autoFreeze);
    }
    var t = e.prototype;
    return t.createDraft = function(r) {
      Yt(r) || nt(8), Xt(r) && (r = vg(r));
      var n = nl(this), o = pi(this, r, void 0);
      return o[Ne].C = !0, li(n), o;
    }, t.finishDraft = function(r, n) {
      var o = r && r[Ne], i = o.A;
      return ai(i, n), ci(void 0, i);
    }, t.setAutoFreeze = function(r) {
      this.F = r;
    }, t.setUseProxies = function(r) {
      r && !ll && nt(20), this.g = r;
    }, t.applyPatches = function(r, n) {
      var o;
      for (o = n.length - 1; o >= 0; o--) {
        var i = n[o];
        if (i.path.length === 0 && i.op === "replace") {
          r = i.value;
          break;
        }
      }
      var c = wt("Patches").$;
      return Xt(r) ? c(r, n) : this.produce(r, function(p) {
        return c(p, n.slice(o + 1));
      });
    }, e;
  }(), Xe = new wg();
  Xe.produce, Xe.produceWithPatches.bind(Xe), Xe.setAutoFreeze.bind(Xe), Xe.setUseProxies.bind(Xe), Xe.applyPatches.bind(Xe), Xe.createDraft.bind(Xe), Xe.finishDraft.bind(Xe);
  var Pg = {
    /**
     * If the schema of the redux store changes in a backwards-incompatible way, then this version number should be incremented.
     *
     * While this looks like semver, it is not. There are no patch numbers, so any change in this number is a breaking change.
     *
     * However, as long as the schema of the redux store is backwards-compatible, then we don't have to change this number.
     *
     * Since the 0.4.0 release, this number has not had to change.
     */
    currentProjectStateDefinitionVersion: "0.4.0"
  }, gi = Pg;
  async function Tg(e, t, r) {
    await cg(0), e.transaction(({ drafts: n }) => {
      var o;
      const i = t.address.projectId;
      n.ephemeral.coreByProject[i] = {
        lastExportedObject: null,
        loadingState: { type: "loading" }
      }, n.ahistoric.coreByProject[i] = {
        ahistoricStuff: ""
      };
      function c() {
        n.ephemeral.coreByProject[i].loadingState = {
          type: "loaded"
        }, n.historic.coreByProject[i] = {
          sheetsById: {},
          definitionVersion: gi.currentProjectStateDefinitionVersion,
          revisionHistory: []
        };
      }
      function p(A) {
        n.ephemeral.coreByProject[i].loadingState = {
          type: "loaded"
        }, n.historic.coreByProject[i] = A;
      }
      function v() {
        n.ephemeral.coreByProject[i].loadingState = {
          type: "loaded"
        };
      }
      function b(A) {
        n.ephemeral.coreByProject[i].loadingState = {
          type: "browserStateIsNotBasedOnDiskState",
          onDiskState: A
        };
      }
      const C = (o = ug(n.historic)) == null ? void 0 : o.coreByProject[t.address.projectId];
      C ? r && C.revisionHistory.indexOf(
        r.revisionHistory[0]
      ) == -1 ? b(r) : v() : r ? p(r) : c();
    });
  }
  function dl() {
  }
  function fl(e) {
    var t, r;
    const n = (t = e?.logging) != null && t.internal ? (r = e.logging.min) != null ? r : 256 : 1 / 0, o = n <= 128, i = n <= 512, c = ka(void 0, {
      _debug: o ? console.debug.bind(console, "_coreLogger(TheatreInternalLogger) debug") : dl,
      _error: i ? console.error.bind(console, "_coreLogger(TheatreInternalLogger) error") : dl
    });
    if (e) {
      const { logger: p, logging: v } = e;
      p && c.configureLogger(p), v ? c.configureLogging(v) : c.configureLogging({
        dev: !1
      });
    }
    return c.getLogger().named("Theatre");
  }
  var Sg = class {
    constructor(e, t = {}, r) {
      this.config = t, this.publicApi = r, f(this, "pointers"), f(this, "_pointerProxies"), f(this, "address"), f(this, "_studioReadyDeferred"), f(this, "_assetStorageReadyDeferred"), f(this, "_readyPromise"), f(this, "_sheetTemplates", new el.Atom({})), f(this, "sheetTemplatesP", this._sheetTemplates.pointer), f(this, "_studio"), f(this, "assetStorage"), f(this, "type", "Theatre_Project"), f(this, "_logger");
      var n;
      this._logger = fl({ logging: { dev: !0 } }).named("Project", e), this._logger.traceDev("creating project"), this.address = { projectId: e };
      const o = new el.Atom({
        ahistoric: {
          ahistoricStuff: ""
        },
        historic: (n = t.state) != null ? n : {
          sheetsById: {},
          definitionVersion: gi.currentProjectStateDefinitionVersion,
          revisionHistory: []
        },
        ephemeral: {
          loadingState: {
            type: "loaded"
          },
          lastExportedObject: null
        }
      });
      this._assetStorageReadyDeferred = Dt(), this.assetStorage = {
        getAssetUrl: (i) => {
          var c;
          return "".concat((c = t.assets) == null ? void 0 : c.baseUrl, "/").concat(i);
        },
        // Until the asset storage is ready, we'll throw an error when the user tries to use it
        createAsset: () => {
          throw new Error("Please wait for Project.ready to use assets.");
        }
      }, this._pointerProxies = {
        historic: new ei.PointerProxy(o.pointer.historic),
        ahistoric: new ei.PointerProxy(o.pointer.ahistoric),
        ephemeral: new ei.PointerProxy(o.pointer.ephemeral)
      }, this.pointers = {
        historic: this._pointerProxies.historic.pointer,
        ahistoric: this._pointerProxies.ahistoric.pointer,
        ephemeral: this._pointerProxies.ephemeral.pointer
      }, J.add(e, this), this._studioReadyDeferred = Dt(), this._readyPromise = Promise.all([
        this._studioReadyDeferred.promise,
        this._assetStorageReadyDeferred.promise
        // hide the array from the user, i.e. make it Promise<void> instead of Promise<[undefined, undefined]>
      ]).then(() => {
      }), t.state ? setTimeout(() => {
        this._studio || (this._studioReadyDeferred.resolve(void 0), this._assetStorageReadyDeferred.resolve(void 0), this._logger._trace("ready deferred resolved with no state"));
      }, 0) : typeof window > "u" ? console.error(
        'Argument config.state in Theatre.getProject("'.concat(e, '", config) is empty. ') + "You can safely ignore this message if you're developing a Next.js/Remix project in development mode. But if you are shipping to your end-users, then you need to set config.state, otherwise your project's state will be empty and nothing will animate. Learn more at https://www.theatrejs.com/docs/latest/manual/projects#state"
      ) : setTimeout(() => {
        if (!this._studio)
          throw new Error(
            'Argument config.state in Theatre.getProject("'.concat(e, '", config) is empty. This is fine ') + "while you are using @theatre/core along with @theatre/studio. But since @theatre/studio " + 'is not loaded, the state of project "'.concat(e, `" will be empty.

`) + `To fix this, you need to add @theatre/studio into the bundle and export the project's state. Learn how to do that at https://www.theatrejs.com/docs/latest/manual/projects#state
`
          );
      }, 1e3);
    }
    attachToStudio(e) {
      if (this._studio) {
        if (this._studio !== e)
          throw new Error(
            "Project ".concat(this.address.projectId, " is already attached to studio ").concat(this._studio.address.studioId)
          );
        console.warn(
          "Project ".concat(this.address.projectId, " is already attached to studio ").concat(this._studio.address.studioId)
        );
        return;
      }
      this._studio = e, e.initialized.then(async () => {
        var t;
        await Tg(e, this, this.config.state), this._pointerProxies.historic.setPointer(
          e.atomP.historic.coreByProject[this.address.projectId]
        ), this._pointerProxies.ahistoric.setPointer(
          e.atomP.ahistoric.coreByProject[this.address.projectId]
        ), this._pointerProxies.ephemeral.setPointer(
          e.atomP.ephemeral.coreByProject[this.address.projectId]
        ), await e.createAssetStorage(this, (t = this.config.assets) == null ? void 0 : t.baseUrl).then((r) => {
          this.assetStorage = r, this._assetStorageReadyDeferred.resolve(void 0);
        }), this._studioReadyDeferred.resolve(void 0);
      }).catch((t) => {
        throw console.error(t), t;
      });
    }
    get isAttachedToStudio() {
      return !!this._studio;
    }
    get ready() {
      return this._readyPromise;
    }
    isReady() {
      return this._studioReadyDeferred.status === "resolved" && this._assetStorageReadyDeferred.status === "resolved";
    }
    getOrCreateSheet(e, t = "default") {
      let r = this._sheetTemplates.get()[e];
      return r || (r = new ag(this, e), this._sheetTemplates.reduce((n) => z(S({}, n), { [e]: r }))), r.getInstance(t);
    }
  }, xg = class {
    get type() {
      return "Theatre_Project_PublicAPI";
    }
    /**
     * @internal
     */
    constructor(e, t = {}) {
      oe(this, new Sg(e, t, this));
    }
    get ready() {
      return $(this).ready;
    }
    get isReady() {
      return $(this).isReady();
    }
    get address() {
      return S({}, $(this).address);
    }
    getAssetUrl(e) {
      if (!this.isReady) {
        console.error(
          "Calling `project.getAssetUrl()` before `project.ready` is resolved, will always return `undefined`. Either use `project.ready.then(() => project.getAssetUrl())` or `await project.ready` before calling `project.getAssetUrl()`."
        );
        return;
      }
      return e.id ? $(this).assetStorage.getAssetUrl(e.id) : void 0;
    }
    sheet(e, t = "default") {
      const r = Ln(
        e
      );
      return $(this).getOrCreateSheet(
        r,
        t
      ).publicApi;
    }
  };
  D(k());
  var pl = Pe, mi = Pe;
  function hl(e, t = {}) {
    const r = J.get(e);
    if (r)
      return r.publicApi;
    const o = fl().named("Project", e);
    return t.state ? (Ag(e, t.state), o._debug("deep validated config.state on disk")) : o._debug("no config.state"), new xg(e, t);
  }
  var Cg = (e, t) => {
    if (Array.isArray(t) || t == null || t.definitionVersion !== gi.currentProjectStateDefinitionVersion)
      throw new Hr(
        "Error validating conf.state in Theatre.getProject(".concat(JSON.stringify(
          e
        ), ", conf). The state seems to be formatted in a way that is unreadable to Theatre.js. Read more at https://www.theatrejs.com/docs/latest/manual/projects#state")
      );
  }, Ag = (e, t) => {
    Cg(e, t);
  };
  function yi(e, t, r) {
    const n = r ? $(r).ticker : qa();
    if ((0, pl.isPointer)(e))
      return (0, mi.pointerToPrism)(e).onChange(n, t, !0);
    if ((0, mi.isPrism)(e))
      return e.onChange(n, t, !0);
    throw new Error(
      "Called onChange(p) where p is neither a pointer nor a prism."
    );
  }
  function vl(e) {
    if ((0, pl.isPointer)(e))
      return (0, mi.pointerToPrism)(e).getValue();
    throw new Error("Called val(p) where p is not a pointer.");
  }
  var Mg = class {
    constructor() {
      f(this, "_studio");
    }
    get type() {
      return "Theatre_CoreBundle";
    }
    get version() {
      return "0.7.2";
    }
    getBitsForStudio(e, t) {
      if (this._studio)
        throw new Error("@theatre/core is already attached to @theatre/studio");
      this._studio = e;
      const r = {
        projectsP: J.atom.pointer.projects,
        privateAPI: $,
        coreExports: N,
        getCoreRafDriver: Ha
      };
      t(r);
    }
  };
  Og();
  function Og() {
    if (typeof window > "u")
      return;
    const e = (
      // @ts-ignore ignore
      window[Xo]
    );
    if (typeof e < "u")
      throw typeof e == "object" && e && typeof e.version == "string" ? new Error(
        `It seems that the module '@theatre/core' is loaded more than once. This could have two possible causes:
1. You might have two separate versions of Theatre.js in node_modules.
2. Or this might be a bundling misconfiguration, in case you're using a bundler like Webpack/ESBuild/Rollup.

Note that it **is okay** to import '@theatre/core' multiple times. But those imports should point to the same module.`
      ) : new Error(
        "The variable window.".concat(Xo, " seems to be already set by a module other than @theatre/core.")
      );
    const t = new Mg();
    window[Xo] = t;
    const r = (
      // @ts-ignore ignore
      window[Tv]
    );
    r && r !== null && r.type === "Theatre_StudioBundle" && r.registerCoreBundle(t);
  }
  /*! Bundled license information:
  
  	lodash-es/lodash.js:
  	  (**
  	   * @license
  	   * Lodash (Custom Build) <https://lodash.com/>
  	   * Build: `lodash modularize exports="es" -o ./`
  	   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
  	   * Released under MIT license <https://lodash.com/license>
  	   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
  	   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  	   *)
  	*/
})($n, $n.exports);
var dt = $n.exports;
const S0 = {
  Home: {
    staticOverrides: {
      byObject: {
        camera: {
          position: {
            x: 0,
            y: 6.5,
            z: 48
          },
          target: {
            x: 0,
            y: 2.5,
            z: 0
          },
          fov: 45
        },
        world: {
          timeOfDay: 0.35,
          fogDensity: 35e-4
        }
      }
    },
    sequence: {
      subUnitsPerUnit: 30,
      length: 10,
      type: "PositionalSequence",
      tracksByObject: {
        camera: {
          trackData: {
            "position.x": {
              type: "BasicKeyframedTrack",
              keyframes: [
                {
                  id: "px0",
                  position: 0,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px1",
                  position: 1.4,
                  value: 8,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px2",
                  position: 2.8,
                  value: -28,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px3",
                  position: 4.2,
                  value: -35,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px4",
                  position: 4.8,
                  value: -18,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px5",
                  position: 5.5,
                  value: -10,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px6",
                  position: 5.8,
                  value: 32,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px7",
                  position: 6.1,
                  value: 42,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px8",
                  position: 7.1,
                  value: 46,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px9",
                  position: 8.5,
                  value: 42,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "px10",
                  position: 10,
                  value: 38,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                }
              ]
            },
            "position.y": {
              type: "BasicKeyframedTrack",
              keyframes: [
                {
                  id: "py0",
                  position: 0,
                  value: 6.5,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py1",
                  position: 1.4,
                  value: 9,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py2",
                  position: 2.8,
                  value: 48,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py3",
                  position: 4.2,
                  value: 78,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py4",
                  position: 4.8,
                  value: 52,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py5",
                  position: 5.5,
                  value: 36,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py6",
                  position: 5.8,
                  value: 18,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py7",
                  position: 6.1,
                  value: 14,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py8",
                  position: 7.1,
                  value: 12,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py9",
                  position: 8.5,
                  value: 12,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "py10",
                  position: 10,
                  value: 16,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                }
              ]
            },
            "position.z": {
              type: "BasicKeyframedTrack",
              keyframes: [
                {
                  id: "pz0",
                  position: 0,
                  value: 48,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz1",
                  position: 1.4,
                  value: 44,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz2",
                  position: 2.8,
                  value: 105,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz3",
                  position: 4.2,
                  value: 145,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz4",
                  position: 4.8,
                  value: 105,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz5",
                  position: 5.5,
                  value: 68,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz6",
                  position: 5.8,
                  value: 12,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz7",
                  position: 6.1,
                  value: 8,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz8",
                  position: 7.1,
                  value: 5,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz9",
                  position: 8.5,
                  value: 6,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "pz10",
                  position: 10,
                  value: 22,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                }
              ]
            },
            "target.x": {
              type: "BasicKeyframedTrack",
              keyframes: [
                {
                  id: "tx0",
                  position: 0,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx1",
                  position: 1.4,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx2",
                  position: 2.8,
                  value: -12,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx3",
                  position: 4.2,
                  value: -20,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx4",
                  position: 4.8,
                  value: -15,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx5",
                  position: 5.5,
                  value: -10,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx6",
                  position: 5.8,
                  value: 38,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx7",
                  position: 6.1,
                  value: 42,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx8",
                  position: 7.1,
                  value: 42,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx9",
                  position: 8.5,
                  value: 42,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tx10",
                  position: 10,
                  value: 20,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                }
              ]
            },
            "target.y": {
              type: "BasicKeyframedTrack",
              keyframes: [
                {
                  id: "ty0",
                  position: 0,
                  value: 2.5,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty1",
                  position: 1.4,
                  value: 3,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty2",
                  position: 2.8,
                  value: 2,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty3",
                  position: 4.2,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty4",
                  position: 4.8,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty5",
                  position: 5.5,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty6",
                  position: 5.8,
                  value: 4,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty7",
                  position: 6.1,
                  value: 5,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty8",
                  position: 7.1,
                  value: 5,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty9",
                  position: 8.5,
                  value: 5.5,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "ty10",
                  position: 10,
                  value: 2,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                }
              ]
            },
            "target.z": {
              type: "BasicKeyframedTrack",
              keyframes: [
                {
                  id: "tz0",
                  position: 0,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz1",
                  position: 1.4,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz2",
                  position: 2.8,
                  value: 30,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz3",
                  position: 4.2,
                  value: 40,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz4",
                  position: 4.8,
                  value: 25,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz5",
                  position: 5.5,
                  value: 15,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz6",
                  position: 5.8,
                  value: -18,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz7",
                  position: 6.1,
                  value: -22,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz8",
                  position: 7.1,
                  value: -22,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz9",
                  position: 8.5,
                  value: -22,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                },
                {
                  id: "tz10",
                  position: 10,
                  value: 0,
                  handles: [
                    0.5,
                    0,
                    0.5,
                    0
                  ]
                }
              ]
            }
          }
        }
      }
    }
  }
}, x0 = "0.4.0", C0 = [], A0 = {
  sheetsById: S0,
  definitionVersion: x0,
  revisionHistory: C0
};
async function M0(w, l) {
  const u = new G(0, 2.5, 0);
  let h = 0, m = 0, g = 0, P = 0;
  const M = new wi([
    new G(0, 6.5, 48),
    // 0.0: Hero Framing (Scene 1)
    new G(8, 9, 44),
    // 0.1: Gentle Orbit
    new G(-14, 24, 68),
    // 0.2: Ascending over estate boundary (Scene 2)
    new G(-28, 48, 105),
    // 0.3: Over Aravali ridge line
    new G(-35, 78, 145),
    // 0.4: Regional map view over Jaipur corridors (Scene 3)
    new G(-12, 38, 68),
    // 0.5: Portfolio City overview & interactive angle (Scene 4)
    new G(42, 16, 14),
    // 0.6: Villa Plot arrival (Scene 5 How We Build begins)
    new G(44, 12, 8),
    // 0.7: Villa Assembly completion framing
    new G(42, 12, 6),
    // 0.8: Scene 6 Live It inspectable angle
    new G(12, 42, 60),
    // 0.9: Pulling back and up from villa over estate
    new G(-15, 72, 130)
    // 1.0: Scene 7 Finale wide establishing shot over Jaipur map
  ]), x = new wi([
    new G(0, 2.5, 0),
    // 0.0: Looking at estate central garden
    new G(0, 3, 0),
    // 0.1: Gentle Orbit center
    new G(-5, 4, 15),
    // 0.2: Ascending target
    new G(-12, 2, 30),
    // 0.3: Ridge line target
    new G(-20, 0, 40),
    // 0.4: Looking down at Jaipur corridor markers
    new G(-10, 0, 15),
    // 0.5: Centered on interactive city
    new G(42, 4, -22),
    // 0.6: Focused on villa plot center
    new G(42, 5, -22),
    // 0.7: Focused on assembling villa upper floors
    new G(42, 5.5, -22),
    // 0.8: Scene 6 configurator focal center
    new G(15, 12, 5),
    // 0.9: Tracking across the landscape
    new G(-10, 0, 20)
    // 1.0: Scene 7 Finale wide establishing shot focal center
  ]);
  let T = null, I = null, E = null;
  try {
    T = dt.getProject("Kedia", { state: A0 }), I = T.sheet("Home"), E = I.object("camera", {
      position: dt.types.compound({
        x: dt.types.number(w.position.x, { range: [-100, 100] }),
        y: dt.types.number(w.position.y, { range: [0, 150] }),
        z: dt.types.number(w.position.z, { range: [-100, 200] })
      }),
      target: dt.types.compound({
        x: dt.types.number(u.x, { range: [-100, 100] }),
        y: dt.types.number(u.y, { range: [-50, 100] }),
        z: dt.types.number(u.z, { range: [-100, 100] })
      }),
      fov: dt.types.number(w.fov, { range: [20, 90] })
    });
  } catch (X) {
    console.warn("[kedia3d] Theatre.js initialization fallback to CatmullRom:", X), I = null;
  }
  const j = new G(), S = new G();
  return {
    update: (X) => {
      const D = Math.max(0, Math.min(X, 1));
      if (M.getPoint(D, j), x.getPoint(D, S), w.position.set(
        j.x + g,
        j.y + P,
        j.z
      ), u.copy(S), w.lookAt(u), l.fog && l.fog.isFogExp2 && (l.fog.density = Te.lerp(35e-4, 2e-3, D)), I && I.sequence) {
        const q = I.sequence, f = typeof q.length == "number" ? q.length : 10;
        q.position = D * f;
      }
    },
    applyMouseParallax: (X, D, q) => {
      h = X * 0.6, m = -D * 0.45;
      const f = Math.min(q * 4, 1);
      g += (h - g) * f, P += (m - P) * f;
    },
    lookAtTarget: u,
    dispose: () => {
    }
  };
}
let _i = null;
async function O0(w = "/api/3d-scene") {
  if (_i)
    return _i;
  for (let l = 0; l < 2; l++) {
    const u = new AbortController(), h = setTimeout(() => u.abort(), 4e3);
    try {
      const m = await fetch(w, { signal: u.signal });
      if (clearTimeout(h), !m.ok)
        throw new Error(`HTTP ${m.status}`);
      const g = await m.json();
      return _i = g, g;
    } catch (m) {
      clearTimeout(h), l === 0 ? await new Promise((g) => setTimeout(g, 300)) : console.warn("[kedia3d] /api/3d-scene fetch failed after retry:", m);
    }
  }
  return null;
}
function j0(w, l, u, h) {
  const m = document.createElement("div");
  m.className = "kedia-zone-marker", m.innerHTML = `
    <div class="marker-dot"></div>
    <div class="marker-card">
      <span class="marker-title">${u}</span>
      <span class="marker-sub">${h}</span>
    </div>
  `, m.style.position = "absolute", m.style.top = "0", m.style.left = "0", m.style.transform = "translate(-50%, -100%)", m.style.pointerEvents = "none", m.style.opacity = "0", m.style.transition = "opacity 0.4s ease, transform 0.4s ease", m.style.zIndex = "25", w.appendChild(m);
  const g = new G();
  return {
    element: m,
    position: l,
    update: (T, I, E) => {
      if (g.copy(l), g.project(T), g.z > 1) {
        m.style.opacity = "0";
        return;
      }
      const j = (g.x * 0.5 + 0.5) * I, S = (-g.y * 0.5 + 0.5) * E;
      m.style.left = `${Math.round(j)}px`, m.style.top = `${Math.round(S)}px`;
    },
    setVisible: (T) => {
      T ? (m.style.opacity = "1", m.style.transform = "translate(-50%, -100%) scale(1)") : (m.style.opacity = "0", m.style.transform = "translate(-50%, -100%) scale(0.9)");
    },
    dispose: () => {
      m.parentElement && m.parentElement.removeChild(m);
    }
  };
}
function E0(w) {
  let l = 0;
  for (let u = 0; u < w.length; u++)
    l = (l << 5) - l + w.charCodeAt(u), l |= 0;
  return Math.abs(l);
}
function D0(w, l, u, h) {
  const m = new pt();
  m.name = "portfolio-city";
  const g = [], P = [], M = l.center.lat || 26.9124, x = l.center.lng || 75.7873, T = 450, I = 420, E = {
    "Sikar Road": new G(-22, 0, 75),
    // North
    "Ajmer Road": new G(-85, 0, -45),
    // South-West
    "Vaishali Nagar": new G(25, 0, 32),
    // West / Central-West
    Jaipur: new G(-15, 0, 10)
    // Central Urban
  }, j = $g(), S = new Sr({
    color: 13216106,
    transparent: !0,
    opacity: 0.75,
    side: Pl
  }), z = new Fe({
    color: 16747520,
    roughness: 0.4,
    metalness: 0.8
  }), H = {};
  for (const f of l.projects) {
    let F = 0, O = 0, _ = 6;
    if (f.type === "Township" ? _ = 9 : f.type === "Apartments" ? _ = 7 : f.type === "Villas" ? _ = 6.5 : _ = 5.5, f.lat !== null && f.lng !== null) {
      const R = f.lat - M;
      F = (f.lng - x) * I, O = R * T;
    } else {
      const R = f.location || "Jaipur", N = E[R] || E.Jaipur, B = H[R] || 0;
      H[R] = B + 1;
      const W = E0(f.slug), ee = B * 2.39996 + W % 100 * 0.02, J = 12 + B * 4.5;
      F = N.x + Math.cos(ee) * J, O = N.z + Math.sin(ee) * J;
    }
    const k = new G(F, 0, O);
    g.push({
      project: f,
      position: k,
      footprintRadius: _,
      pickProxy: null,
      group: new pt(),
      emissiveMeshes: []
    });
  }
  for (let f = 0; f < 18; f++)
    for (let F = 0; F < g.length; F++)
      for (let O = F + 1; O < g.length; O++) {
        const _ = g[F], k = g[O], R = k.position.x - _.position.x, N = k.position.z - _.position.z, B = R * R + N * N, W = _.footprintRadius + k.footprintRadius + 1.2;
        if (B < W * W) {
          const ee = Math.sqrt(B) || 1e-3, J = (W - ee) * 0.5, Q = R / ee * J, $ = N / ee * J;
          _.position.x -= Q, _.position.z -= $, k.position.x += Q, k.position.z += $;
        }
      }
  for (const f of g) {
    const F = f.group;
    F.position.copy(f.position);
    const O = f.project.status === "ongoing", { group: _, emissiveMeshes: k } = Wg(
      f.project.type,
      O,
      u,
      j
    );
    if (F.add(_), f.emissiveMeshes.push(...k), O) {
      const ee = new Kg(
        f.footprintRadius * 0.9,
        f.footprintRadius * 1.15,
        24
      );
      ee.rotateX(-Math.PI / 2);
      const J = new ie(ee, S.clone());
      J.position.y = 0.15, F.add(J), f.statusRing = J;
      const Q = new pt(), $ = new ie(
        new sr(0.12, 0.15, 6.5, 5),
        z
      );
      $.position.y = 3.25, Q.add($);
      const oe = new ie(
        new Qe(5.5, 0.18, 0.18),
        z
      );
      oe.position.set(1.5, 6.5, 0), Q.add(oe), Q.position.set(f.footprintRadius * 0.5, 0, -f.footprintRadius * 0.5), F.add(Q), f.crane = Q;
    }
    const R = new sr(
      f.footprintRadius,
      f.footprintRadius,
      8,
      12
    ), N = new Sr({
      visible: !1
    }), B = new ie(R, N);
    B.position.copy(f.position), B.position.y = 4, B.projectNode = f, m.add(F), w.add(B), f.pickProxy = B, P.push(B);
    const W = document.createElement("div");
    W.className = "kedia-city-label", W.innerHTML = `
      <span class="city-label-name">${f.project.name}</span>
      <span class="city-label-meta">${f.project.location} · ${f.project.status === "ongoing" ? "Ongoing" : "Completed"}</span>
    `, W.style.position = "absolute", W.style.transform = "translate(-50%, -100%)", W.style.pointerEvents = "none", W.style.opacity = "0", W.style.transition = "opacity 0.3s ease, transform 0.3s ease", W.style.zIndex = "15", h.appendChild(W), f.labelElement = W;
  }
  w.add(m);
  const Y = new G();
  return {
    group: m,
    nodes: g,
    pickProxies: P,
    update: (f, F, O, _, k, R = !0) => {
      for (const B of g) {
        if (B.statusRing) {
          const W = 1 + Math.sin(F * 3 + B.position.x) * 0.08;
          B.statusRing.scale.set(W, 1, W), B.statusRing.material.opacity = 0.5 + Math.sin(F * 3) * 0.25;
        }
        B.crane && (B.crane.rotation.y = Math.sin(F * 0.5 + B.position.z) * 0.6);
      }
      if (!R) {
        for (const B of g)
          B.labelElement && (B.labelElement.style.opacity = "0");
        return;
      }
      const N = [];
      for (const B of g) {
        const W = O.position.distanceTo(B.position);
        N.push({ node: B, dist: W });
      }
      N.sort((B, W) => B.dist - W.dist);
      for (let B = 0; B < N.length; B++) {
        const { node: W, dist: ee } = N[B];
        if (!W.labelElement) continue;
        if (B < 12 && ee < 180 && ee > 15)
          if (Y.copy(W.position), Y.y += 6.5, Y.project(O), Y.z > 1)
            W.labelElement.style.opacity = "0";
          else {
            const Q = (Y.x * 0.5 + 0.5) * _, $ = (-Y.y * 0.5 + 0.5) * k;
            W.labelElement.style.left = `${Math.round(Q)}px`, W.labelElement.style.top = `${Math.round($)}px`, W.labelElement.style.opacity = "1";
          }
        else
          W.labelElement.style.opacity = "0";
      }
    },
    setFilter: (f) => {
      const F = f.toLowerCase().trim();
      for (const O of g) {
        const _ = F === "all" || F === "ongoing" && O.project.status === "ongoing" || O.project.type.toLowerCase().includes(F), k = _ ? 1 : 0.85;
        O.group.scale.set(k, k, k), O.group.traverse((R) => {
          if (R.isMesh) {
            const N = R.material;
            Array.isArray(N) ? N.forEach((B) => {
              B.transparent = !_, B.opacity = _ ? 1 : 0.22;
            }) : N && (N.transparent = !_, N.opacity = _ ? 1 : 0.22);
          }
        }), O.labelElement && (O.labelElement.style.display = _ ? "block" : "none");
      }
    },
    dispose: () => {
      w.remove(m);
      for (const f of P)
        w.remove(f), f.geometry.dispose(), f.material.dispose();
      for (const f of g)
        f.labelElement?.parentElement && f.labelElement.parentElement.removeChild(f.labelElement);
    }
  };
}
function I0(w, l, u, h) {
  const m = new Xg(), g = new st(-999, -999);
  let P = !1, M = null;
  const x = document.createElement("div");
  x.className = "kedia-city-cursor", x.style.display = "none", document.body.appendChild(x);
  const T = document.createElement("a");
  T.className = "kedia-project-tooltip", T.style.display = "none", T.setAttribute("tabindex", "0"), h.appendChild(T);
  const I = /* @__PURE__ */ new Set(), E = (f) => {
    if (I.has(f)) return;
    I.add(f);
    const F = document.createElement("link");
    F.rel = "prefetch", F.href = f, document.head.appendChild(F);
  }, j = (f, F, O) => {
    const _ = f.project, k = `/projects/${_.slug}`;
    E(k), T.href = k, T.innerHTML = `
      <div class="tooltip-cover-wrap">
        <img class="tooltip-cover" src="${_.cover_url}" alt="${_.name}" loading="lazy">
        <span class="tooltip-tag ${_.status === "ongoing" ? "on" : ""}">${_.status === "ongoing" ? "Ongoing" : "Completed"}</span>
      </div>
      <div class="tooltip-body">
        <h4 class="tooltip-title">${_.name}</h4>
        <div class="tooltip-meta">
          <span>${_.type}</span> · <span>${_.location}</span>
        </div>
        ${_.price_label ? `<div class="tooltip-price">${_.price_label}</div>` : ""}
        <span class="tooltip-arrow">Explore Project →</span>
      </div>
    `, T.style.left = `${Math.min(F + 16, window.innerWidth - 300)}px`, T.style.top = `${Math.min(O + 16, window.innerHeight - 260)}px`, T.style.display = "flex";
  }, S = () => {
    T.style.display = "none", M && (M.group.scale.set(1, 1, 1), M = null), x.classList.remove("grow");
  }, z = (f) => {
    const F = `/projects/${f.project.slug}`, O = window.gsap;
    if (!O) {
      window.location.href = F;
      return;
    }
    const _ = f.position.clone().add(new G(0, 8, 16)), k = f.position.clone().add(new G(0, 2, 0)), R = document.createElement("div");
    R.style.position = "fixed", R.style.inset = "0", R.style.background = "#16264A", R.style.opacity = "0", R.style.zIndex = "999999", R.style.pointerEvents = "all", document.body.appendChild(R), O.to(l.position, {
      x: _.x,
      y: _.y,
      z: _.z,
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => l.lookAt(k)
    }), O.to(R, {
      opacity: 1,
      duration: 0.5,
      delay: 0.75,
      ease: "power2.in",
      onComplete: () => {
        window.location.href = F;
      }
    });
  }, H = (f) => {
    if (!P) return;
    const F = u.getBoundingClientRect();
    g.x = (f.clientX - F.left) / F.width * 2 - 1, g.y = -((f.clientY - F.top) / F.height) * 2 + 1, x.style.left = `${f.clientX}px`, x.style.top = `${f.clientY}px`;
  }, Y = (f) => {
    if (!(!P || !M)) {
      if (f.ctrlKey || f.metaKey || f.button === 1) {
        window.open(`/projects/${M.project.slug}`, "_blank");
        return;
      }
      z(M);
    }
  };
  return window.addEventListener("mousemove", H, { passive: !0 }), u.addEventListener("click", Y), {
    update: (f, F, O) => {
      if (!P) {
        S();
        return;
      }
      m.setFromCamera(g, f);
      const _ = m.intersectObjects(w.pickProxies, !1);
      if (_.length > 0) {
        const R = _[0].object.projectNode;
        if (R && R !== M) {
          M && M.group.scale.set(1, 1, 1), M = R, R.group.scale.set(1.08, 1.08, 1.08), x.classList.add("grow");
          const N = R.position.clone().project(f), B = (N.x * 0.5 + 0.5) * F, W = (-N.y * 0.5 + 0.5) * O;
          j(R, B, W);
        }
      } else
        M && S();
    },
    setActive: (f) => {
      P = f, u.style.pointerEvents = f ? "auto" : "none", u.style.touchAction = "pan-y", x.style.display = f ? "block" : "none", f || S();
    },
    flyToProject: z,
    dispose: () => {
      window.removeEventListener("mousemove", H), u.removeEventListener("click", Y), x.parentElement && x.parentElement.removeChild(x), T.parentElement && T.parentElement.removeChild(T);
    }
  };
}
function k0(w) {
  w.traverse((l) => {
    if (l.isMesh || l.isLine || l.isPoints) {
      const u = l;
      if (u.geometry && u.geometry.dispose(), u.material)
        if (Array.isArray(u.material))
          for (const h of u.material)
            _l(h);
        else
          _l(u.material);
    }
  });
}
function _l(w) {
  const l = w, u = [
    "map",
    "lightMap",
    "bumpMap",
    "normalMap",
    "displacementMap",
    "roughnessMap",
    "metalnessMap",
    "alphaMap",
    "envMap",
    "emissiveMap",
    "gradientMap"
  ];
  for (const h of u)
    l[h] && l[h].isTexture && l[h].dispose();
  w.dispose();
}
async function bl() {
  const w = document.getElementById("world");
  if (!w)
    return;
  const l = w.querySelector(".stage-sticky");
  if (!l)
    return;
  let u = Yg();
  if (u === "off") {
    document.documentElement.classList.add("no3d"), console.log("[kedia3d] 3D tier is OFF (reduced motion / low spec / disabled by user)."), gl(w, (V) => {
      V && window.location.reload();
    });
    return;
  }
  document.documentElement.classList.remove("no3d"), console.log(`[kedia3d] 3D tier is ${u.toUpperCase()}`);
  const h = gl(w, (V) => {
    V ? window.location.reload() : (document.documentElement.classList.add("no3d"), it());
  }), m = l0(h.dock), g = o0(document.body);
  let P = null;
  const M = w.querySelector(".stage-handoff-fade"), x = s0(), T = e0(l, u, () => {
    document.documentElement.classList.add("no3d"), it();
  }), I = new Jg(), E = new Qg(
    45,
    T.width / T.height,
    0.1,
    700
  );
  E.position.set(0, 45, 120), E.lookAt(0, 0, 0);
  const j = c0(I), S = u0(I, u), z = d0(I), H = f0(I), Y = p0(I), X = h0(I, u), D = T0(
    T.renderer,
    I,
    E,
    u,
    T.width,
    T.height
  );
  T.onResize((V, ne) => {
    E.aspect = V / ne, E.updateProjectionMatrix(), D.setSize(V, ne);
  });
  const q = await M0(E, I), f = [], F = document.body.dataset["3dApi"] || "/api/3d-scene", O = await O0(F);
  if (O) {
    const V = {
      "Sikar Road": new G(-25, 6, 120),
      "Ajmer Road": new G(-110, 6, -75),
      "Vaishali Nagar": new G(30, 6, 50),
      Jaipur: new G(-45, 8, 30)
    };
    for (const ne of O.zones) {
      const be = V[ne.name] || new G(0, 6, 0), ce = j0(
        l,
        be,
        ne.name.toUpperCase(),
        `${ne.count} Landmark ${ne.count === 1 ? "Project" : "Projects"}`
      );
      f.push(ce);
    }
    if (O.contact) {
      const ne = w.querySelector(".ch7-wa");
      if (ne && O.contact.whatsapp) {
        const ce = O.contact.whatsapp.replace(/\D/g, "");
        ne.href = `https://wa.me/${ce}`;
      }
      const be = w.querySelector(".ch7-tel");
      be && O.contact.phone && (be.href = `tel:${O.contact.phone}`);
    }
  }
  const _ = w.querySelector(".ch7-quote-toggle"), k = w.querySelector(".quote-short"), R = w.querySelector(".quote-full");
  _ && k && R && _.addEventListener("click", () => {
    _.getAttribute("aria-expanded") === "true" ? (k.style.display = "inline", R.style.display = "none", _.setAttribute("aria-expanded", "false"), _.textContent = "Read full") : (k.style.display = "none", R.style.display = "inline", _.setAttribute("aria-expanded", "true"), _.textContent = "Show less"), m.playClickSfx();
  });
  let N = null, B = null;
  if (O && O.projects.length > 0) {
    N = D0(I, O, u, l), B = I0(
      N,
      E,
      T.canvas,
      l
    );
    const V = w.querySelectorAll(".city-chip");
    V.forEach((be) => {
      be.addEventListener("click", (ce) => {
        const fe = ce.currentTarget;
        V.forEach((De) => De.classList.remove("is-active")), fe.classList.add("is-active");
        const He = fe.dataset.filter || "all";
        N?.setFilter(He);
      });
    }), w.querySelectorAll("[data-3d-slug]").forEach((be) => {
      be.addEventListener("focus", () => {
        const ce = be.getAttribute("data-3d-slug"), fe = N?.nodes.find((He) => He.project.slug === ce);
        fe && window.gsap?.to(E.position, {
          x: fe.position.x,
          y: fe.position.y + 12,
          z: fe.position.z + 18,
          duration: 1,
          ease: "power2.out",
          onUpdate: () => E.lookAt(fe.position)
        });
      });
    });
  }
  let W = 0, ee = 0;
  const J = (V) => {
    W = V.clientX / window.innerWidth * 2 - 1, ee = V.clientY / window.innerHeight * 2 - 1;
  };
  window.addEventListener("mousemove", J, { passive: !0 });
  let Q = null, $ = !1;
  const oe = document.createElement("div");
  oe.className = "live-chunk-shimmer", oe.setAttribute("aria-hidden", "true"), l.appendChild(oe);
  async function Ae() {
    if (!(Q || $)) {
      $ = !0, oe.classList.add("is-loading");
      try {
        const { loadScenes5And6: V } = await import("./chunks/live-Bn_WMQ9D.js");
        Q = V(I, w, T.canvas, {
          scene: I,
          dirLight: S.dirLight,
          sky: j,
          lighting: S,
          postFx: D
        }), Q.update(ye, 0, E), Q.setActiveConfigurator(ze === 5);
      } catch (V) {
        console.warn("[kedia3d] Failed to load Scenes 5 & 6 lazy chunk:", V);
      } finally {
        $ = !1, oe.classList.remove("is-loading");
      }
    }
  }
  const Be = w.querySelectorAll(".stage-chapter");
  let ye = 0, ze = 0, lt = !1;
  const Ze = await r0(w, 7);
  P = a0(w, (V) => {
    Ze.goToChapter(V), m.playClickSfx();
  }), window.__kedia3d = {
    scrollBridge: Ze,
    getLiveScene: () => Q,
    triggerLoadScenes5And6: Ae,
    scene: I,
    camera: E,
    rendererCtx: T
  }, Ze.onProgress((V, ne) => {
    ye = V, ze = ne, (V >= 0.48 || ne >= 3) && !Q && !$ && Ae(), Be.forEach((De, qe) => {
      qe === ne ? De.classList.add("is-active") : De.classList.remove("is-active");
    }), P?.setActiveChapter(ne);
    const be = ne === 3;
    B?.setActive(be);
    const ce = ne === 5;
    Q?.setActiveConfigurator(ce);
    const fe = Math.max(0, Math.min((V - 0.82) / 0.18, 1));
    if (j.setSunriseProgress(fe), S.setSunrise(fe), X.setSunriseRays(fe), M) {
      const De = Math.max(0, Math.min((V - 0.94) / 0.06, 1));
      M.style.opacity = De.toString();
    }
    ne === 1 && !lt && window.gsap && (lt = !0, w.querySelectorAll(".stat-num").forEach((qe) => {
      const It = qe, Ve = parseFloat(It.dataset.target || "0"), ar = Ve > 1e3;
      window.gsap?.fromTo(
        It,
        { textContent: ar ? "1900" : "0" },
        {
          textContent: Ve,
          duration: 1.6,
          ease: "power2.out",
          snap: { textContent: 1 },
          onUpdate: function() {
            const Cr = Math.round(parseFloat(this.targets()[0].textContent || "0"));
            It.textContent = Cr + (ar ? "" : "+");
          }
        }
      );
    }));
    const He = ne === 2;
    for (const De of f)
      De.setVisible(He);
  });
  const ct = (V, ne = "VIEW") => {
    V.addEventListener("mouseenter", () => {
      g.setHoverState(!0, ne), m.playHoverSfx();
    }), V.addEventListener("mouseleave", () => {
      g.setHoverState(!1);
    }), V.addEventListener("click", () => {
      m.playClickSfx();
    });
  };
  w.querySelectorAll("a, button, .city-chip, .config-btn, .kedia-progress-dot").forEach((V) => {
    const ne = V.classList.contains("chapter-btn") || V.classList.contains("btn") ? "EXPLORE" : V.classList.contains("config-btn") ? "SELECT" : V.classList.contains("city-chip") ? "FILTER" : V.classList.contains("kedia-progress-dot") ? "CHAPTER" : "VIEW";
    ct(V, ne);
  });
  let Se = 0, ot = !0;
  const Me = 2.2;
  let Ge = 0;
  const et = t0({
    getTier: () => u,
    currentPixelRatio: () => T.pixelRatio,
    onAdjustPixelRatio: (V) => T.setPixelRatio(V),
    onDropQuality: (V, ne) => {
      console.warn(`[kedia3d] Downgrading tier to ${V}: ${ne}`), u = V, T.renderer.shadowMap.enabled = !1, T.setPixelRatio(1);
    }
  });
  T.onVisibilityChange((V) => {
    V ? et.resume() : et.pause();
  });
  const ht = Zg();
  let tt = !1;
  T.renderer.info.autoReset = !1;
  const or = new G(0, 45, 120), ir = new G(0, 6.5, 48);
  et.add((V, ne) => {
    if (T.renderer.info.reset(), ot && ye < 0.02) {
      Ge += V, Se = Math.min(Ge / Me, 1);
      const ce = 1 - Math.pow(1 - Se, 3);
      E.position.lerpVectors(or, ir, ce), E.lookAt(0, Te.lerp(0, 2.5, ce), 0), Se >= 1 && (ot = !1);
    } else if (ot = !1, q.applyMouseParallax(W, ee, V), ye < 0.15) {
      const ce = Math.sin(ne * 0.35) * 0.08, fe = 48;
      E.position.x = Math.sin(ce) * fe, E.position.z = Math.cos(ce) * fe, E.lookAt(q.lookAtTarget);
    } else
      q.update(ye);
    const be = 1.6 + Math.sin(ne * 4) * 0.1 + Math.sin(ne * 9.2) * 0.05;
    if (Y.setWindowGlow(be), X.update(V, ne), ze === 2)
      for (const ce of f)
        ce.update(E, T.width, T.height);
    if (N && (N.update(V, ne, E, T.width, T.height, ze === 3), B?.update(E, T.width, T.height)), Q && Q.update(ye, ne, E), D.render(V), tt || (tt = !0, x.onFirstFrameReady(), x.finish(), console.log("kedia3d ready")), ht) {
      const ce = T.renderer.info, fe = performance.memory;
      ht({
        tier: u,
        fps: et.getFps(),
        drawCalls: ce.render.calls,
        triangles: ce.render.triangles,
        jsHeapMB: fe ? fe.usedJSHeapSize / (1024 * 1024) : null
      });
    }
  }), et.start();
  function it() {
    window.removeEventListener("mousemove", J), P?.dispose(), m.dispose(), g.dispose(), et.dispose(), Ze.dispose(), B?.dispose(), N?.dispose(), Q?.dispose(), oe.remove(), D.dispose(), j.dispose(), S.dispose(), z.dispose(), H.dispose(), Y.dispose(), X.dispose();
    for (const V of f) V.dispose();
    T.dispose(), k0(I);
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", bl) : bl();
