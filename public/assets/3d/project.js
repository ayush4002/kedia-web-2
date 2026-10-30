import { g as Se, s as ue, c as Ce, W as pe, A as Ae, S as me, P as ve, a as Ee, b as Pe, V as he, M as B, T as je, d as Te, L as Ge, e as Re, B as ke, f as De, C as Fe, h as ze, i as Ie, j as Be, G as He, k as Ue, l as We, m as qe, n as Ve, o as Oe, D as $e, p as Xe, q as we } from "./chunks/archetypes-CtYrZcIt.js";
function ge() {
  const t = document.querySelector(".phero");
  if (!t) return;
  const m = Se();
  if (m === "off") {
    document.documentElement.classList.add("no3d"), ue(document.body, (e) => {
      e && window.location.reload();
    });
    return;
  }
  document.documentElement.classList.remove("no3d"), ue(document.body, (e) => {
    e ? window.location.reload() : (document.documentElement.classList.add("no3d"), de());
  });
  const H = Ce(), U = t.querySelector("img.phero-bg"), W = U?.currentSrc || U?.src;
  if (!W) return;
  const s = document.createElement("canvas");
  s.className = "phero-3d-canvas", s.setAttribute("aria-hidden", "true"), t.insertBefore(s, t.firstChild);
  let c = t.clientWidth, l = t.clientHeight;
  const a = new pe({
    canvas: s,
    alpha: !0,
    antialias: m === "high",
    powerPreference: "high-performance"
  });
  a.setSize(c, l), a.setPixelRatio(Math.min(window.devicePixelRatio, m === "high" ? 2 : 1.25)), a.toneMapping = Ae, a.toneMappingExposure = 1.05;
  const P = new me(), o = new ve(45, c / l, 0.1, 100);
  o.position.set(0, 0, 10), o.lookAt(0, 0, 0);
  const Me = o.fov * Math.PI / 180, d = 2 * Math.tan(Me / 2) * o.position.z, f = d * o.aspect, q = new Ee(f * 1.1, d * 1.1, 1, 1), v = {
    uTexture: { value: null },
    uMouse: { value: new he(0, 0) },
    uResolution: { value: new he(c, l) },
    uTime: { value: 0 }
  }, V = new Pe({
    uniforms: v,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform float uTime;
      varying vec2 vUv;

      void main() {
        // Perspective depth gradient: foreground (mid/lower) moves more, background moves less
        float depth = mix(0.15, 0.95, clamp(1.0 - vUv.y * 0.75, 0.0, 1.0));
        vec2 offset = uMouse * depth * 0.024;
        vec2 uv = clamp(vUv + offset, 0.001, 0.999);

        vec4 col = texture2D(uTexture, uv);

        // Soft photographic vignette
        float dist = distance(vUv, vec2(0.5, 0.5));
        float vignette = smoothstep(0.85, 0.32, dist);
        col.rgb *= mix(0.82, 1.0, vignette);

        // Subtle Kedia warm golden rim
        col.rgb += vec3(0.045, 0.03, 0.01) * (1.0 - vignette);

        gl_FragColor = col;
      }
    `,
    depthWrite: !1
  }), O = new B(q, V);
  P.add(O), new je().load(W, (e) => {
    e.colorSpace = Te, e.anisotropy = Math.min(a.capabilities.getMaxAnisotropy(), 4), e.generateMipmaps = !0, e.minFilter = Ge, e.magFilter = Re, v.uTexture.value = e;
  });
  const M = m === "high" ? 80 : 30, h = new ke(), b = new Float32Array(M * 3), y = new Float32Array(M * 3);
  for (let e = 0; e < M; e++)
    b[e * 3] = (Math.random() - 0.5) * f * 1.1, b[e * 3 + 1] = (Math.random() - 0.5) * d * 1.1, b[e * 3 + 2] = Math.random() * 4 + 1, y[e * 3] = (Math.random() - 0.5) * 0.15, y[e * 3 + 1] = Math.random() * 0.25 + 0.1, y[e * 3 + 2] = 0;
  h.setAttribute("position", new De(b, 3));
  const x = document.createElement("canvas");
  x.width = 32, x.height = 32;
  const j = x.getContext("2d"), L = j.createRadialGradient(16, 16, 0, 16, 16, 16);
  L.addColorStop(0, "rgba(255, 235, 185, 1.0)"), L.addColorStop(0.35, "rgba(201, 169, 106, 0.6)"), L.addColorStop(1, "rgba(201, 169, 106, 0)"), j.fillStyle = L, j.fillRect(0, 0, 32, 32);
  const $ = new Fe(x), X = new ze({
    map: $,
    color: 16771253,
    size: 0.35,
    transparent: !0,
    opacity: 0.75,
    blending: Ie,
    depthWrite: !1
  }), be = new Be(h, X);
  P.add(be);
  let T = 0, G = 0, S = 0, C = 0;
  const Y = (e) => {
    T = e.clientX / window.innerWidth * 2 - 1, G = e.clientY / window.innerHeight * 2 - 1;
  };
  window.addEventListener("mousemove", Y, { passive: !0 });
  const J = (e) => {
    e.gamma !== null && e.beta !== null && (T = we.clamp(e.gamma / 30, -1, 1), G = we.clamp((e.beta - 45) / 30, -1, 1));
  };
  window.DeviceOrientationEvent && window.addEventListener("deviceorientation", J, { passive: !0 });
  const R = t.getAttribute("data-project-type") || "Villas", N = t.getAttribute("data-project-location") || "Jaipur", ye = (t.getAttribute("data-project-status") || "ongoing") === "ongoing", i = document.createElement("div");
  i.className = "kedia-mini-locator", i.setAttribute("role", "button"), i.setAttribute("tabindex", "0"), i.setAttribute("aria-label", `View portfolio map for ${R} in ${N}`), i.title = "Click to explore all projects in portfolio", i.innerHTML = `
    <div class="locator-canvas-box"></div>
    <div class="locator-info">
      <span class="locator-tag">${R.toUpperCase()}</span>
      <span class="locator-zone">${N.toUpperCase()}</span>
      <span class="locator-hint">All Projects →</span>
    </div>
  `, t.appendChild(i), i.addEventListener("click", () => {
    window.location.href = "/projects";
  }), i.addEventListener("keydown", (e) => {
    (e.key === "Enter" || e.key === " ") && (window.location.href = "/projects");
  });
  const xe = i.querySelector(".locator-canvas-box"), u = 84, p = document.createElement("canvas");
  p.width = u * (window.devicePixelRatio || 1), p.height = u * (window.devicePixelRatio || 1), p.style.width = `${u}px`, p.style.height = `${u}px`, xe.appendChild(p);
  const A = new pe({
    canvas: p,
    alpha: !0,
    antialias: !0
  });
  A.setSize(u, u), A.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const E = new me(), k = new ve(38, 1, 0.1, 50);
  k.position.set(0, 10, 16), k.lookAt(0, 0, 0);
  const w = new He();
  E.add(w);
  const _ = new Ue(5.2, 5.5, 0.5, 32), K = new We({
    color: 1978720,
    roughness: 0.6
  }), Q = new B(_, K);
  Q.position.y = -0.25, w.add(Q);
  const D = new qe(5.3, 0.1, 8, 32);
  D.rotateX(Math.PI / 2);
  const Z = new Ve({ color: 13216106 }), ee = new B(D, Z);
  ee.position.y = 0.02, w.add(ee);
  const { group: te } = Oe(R, ye, "low");
  te.scale.set(0.65, 0.65, 0.65), w.add(te);
  const oe = new $e(16770208, 2.2);
  oe.position.set(8, 12, 10), E.add(oe);
  const Le = new Xe(16776956, 0.8);
  E.add(Le);
  let ne = !0, F = 0, ie = performance.now(), ae = !1;
  const se = () => {
    if (!t) return;
    c = t.clientWidth, l = t.clientHeight, a.setSize(c, l), o.aspect = c / l, o.updateProjectionMatrix(), v.uResolution.value.set(c, l);
    const e = 2 * Math.tan(o.fov * Math.PI / 180 / 2) * o.position.z, r = e * o.aspect;
    O.scale.set(r * 1.1 / f, e * 1.1 / d, 1);
  };
  window.addEventListener("resize", se);
  let z = !0;
  const re = new IntersectionObserver((e) => {
    for (const r of e)
      z = r.isIntersecting;
  });
  re.observe(t);
  const ce = () => {
    z = !document.hidden;
  };
  document.addEventListener("visibilitychange", ce);
  const le = (e) => {
    e.preventDefault(), console.warn("[kedia3d] Project WebGL context lost."), de();
  };
  s.addEventListener("webglcontextlost", le, !1);
  function I() {
    if (!ne) return;
    if (!z) {
      F = requestAnimationFrame(I);
      return;
    }
    const e = performance.now(), r = Math.min((e - ie) / 1e3, 0.1);
    ie = e, S += (T - S) * 0.05, C += (G - C) * 0.05, v.uMouse.value.set(S, C), v.uTime.value = e / 1e3;
    const g = h.attributes.position.array;
    for (let n = 0; n < M; n++)
      g[n * 3 + 1] += y[n * 3 + 1] * r * 2, g[n * 3] += Math.sin(e * 1e-3 + n) * r * 0.2, g[n * 3 + 1] > d * 0.6 && (g[n * 3 + 1] = -d * 0.6, g[n * 3] = (Math.random() - 0.5) * f * 1.1);
    if (h.attributes.position.needsUpdate = !0, o.position.x = S * 0.4, o.position.y = -C * 0.3, o.lookAt(0, 0, 0), a.render(P, o), w.rotation.y += r * 0.5, A.render(E, k), ae || (ae = !0, s.classList.add("is-ready"), console.log("[kedia3d] Project Light 3D ready.")), H) {
      const n = a.info;
      H({
        tier: m,
        fps: Math.round(1 / r),
        drawCalls: n.render.calls,
        triangles: n.render.triangles,
        jsHeapMB: performance.memory ? performance.memory.usedJSHeapSize / (1024 * 1024) : null
      });
    }
    F = requestAnimationFrame(I);
  }
  I();
  function de() {
    ne = !1, cancelAnimationFrame(F), window.removeEventListener("mousemove", Y), window.removeEventListener("resize", se), window.DeviceOrientationEvent && window.removeEventListener("deviceorientation", J), re.disconnect(), document.removeEventListener("visibilitychange", ce), s.removeEventListener("webglcontextlost", le), s.remove(), i.remove(), a.dispose(), A.dispose(), h.dispose(), X.dispose(), $.dispose(), q.dispose(), V.dispose(), _.dispose(), K.dispose(), D.dispose(), Z.dispose();
  }
}
function fe() {
  "requestIdleCallback" in window ? window.requestIdleCallback(ge, { timeout: 600 }) : setTimeout(ge, 120);
}
document.readyState === "complete" ? fe() : window.addEventListener("load", fe, { once: !0 });
