import { G as S, l as b, a1 as ct, k as de, M as o, B as Qe, v as x, a2 as lt, N as l, u as Ze, J as et, $ as dt, n as pt, z as wt, y as gt, f as ut, h as ft, i as ht, j as mt, w as De, q as L, a3 as yt } from "./archetypes-CtYrZcIt.js";
function vt(O) {
  const v = new S();
  v.name = "villa-assembly-root", v.position.set(42, 0, -22);
  const d = new b({
    color: 16117468,
    roughness: 0.65,
    metalness: 0.05
  }), T = new b({
    color: 16776953,
    roughness: 0.5,
    metalness: 0.08
  }), M = new b({
    color: 2303791,
    roughness: 0.6,
    metalness: 0.2
  });
  let D = d;
  const H = new b({
    color: 9125419,
    // Terracotta
    roughness: 0.75
  }), f = new b({
    color: 13216106,
    // Gold trim
    roughness: 0.45,
    metalness: 0.35
  }), I = new b({
    color: 1451594,
    roughness: 0.15,
    metalness: 0.8,
    transparent: !0,
    opacity: 0.85
  }), w = new b({
    color: 16769187,
    emissive: 16758861,
    emissiveIntensity: 0,
    roughness: 0.3
  }), E = w.clone(), h = w.clone(), C = w.clone(), g = w.clone(), F = new b({
    color: 3037757,
    roughness: 0.9
  }), z = new b({
    color: 14669765,
    roughness: 0.8
  }), k = new b({
    color: 3570844,
    roughness: 0.1,
    metalness: 0.8
  }), X = new ct({
    color: 13216106
  }), W = new S();
  v.add(W);
  const R = [];
  function i(n, t, e, c, G = 12) {
    const Q = t.position.clone(), q = Q.clone();
    q.y += G;
    const ce = t.scale.clone(), le = new x(1e-3, 1e-3, 1e-3);
    t.position.copy(q), t.scale.copy(le), t.visible = !1, W.add(t), R.push({
      name: n,
      mesh: t,
      startP: e,
      endP: c,
      initialPos: q,
      targetPos: Q,
      initialScale: le,
      targetScale: ce
    });
  }
  const V = new S(), N = new de(0.08, 0.08, 1.2, 6);
  N.translate(0, 0.6, 0);
  const Y = new b({ color: 9132587 }), U = [
    [-12, 12],
    [12, 12],
    [12, -12],
    [-12, -12]
  ];
  for (const [n, t] of U) {
    const e = new o(N, Y);
    e.position.set(n, 0, t), V.add(e);
  }
  const Z = new Qe().setFromPoints([
    new x(-12, 0.9, 12),
    new x(12, 0.9, 12),
    new x(12, 0.9, -12),
    new x(-12, 0.9, -12),
    new x(-12, 0.9, 12)
  ]), pe = new lt(Z, X);
  V.add(pe), i("survey_pegs", V, 0, 0.12, 0);
  const j = new l(20, 0.8, 18);
  j.translate(0, 0.4, 0);
  const ee = new o(j, d);
  ee.receiveShadow = !0, i("foundation_plinth", ee, 0.1, 0.24, -2.5);
  const B = new S(), J = new l(16, 4.2, 14);
  J.translate(0, 2.1 + 0.8, 0);
  const $ = new o(J, d);
  $.castShadow = !0, $.receiveShadow = !0, B.add($);
  const te = new de(0.4, 0.45, 4.2, 8);
  te.translate(0, 2.1 + 0.8, 0);
  const we = new o(te, f);
  we.position.set(-3.2, 0, 7.8), we.castShadow = !0, B.add(we);
  const ge = new o(te, f);
  ge.position.set(3.2, 0, 7.8), ge.castShadow = !0, B.add(ge);
  const s = new S(), a = new o(
    new de(0.06, 0.08, 4, 6),
    M
  );
  a.position.set(-9.5, 2, 9.5), s.add(a);
  const r = new o(
    new l(0.3, 0.2, 0.5),
    M
  );
  r.position.set(-9.5, 3.9, 9.5), r.rotation.y = Math.PI / 4, s.add(r), B.add(s), i("ground_structure", B, 0.22, 0.38, 14);
  const u = new S(), _ = new l(17.5, 0.45, 15.5);
  _.translate(0, 5.2, 0);
  const P = new o(_, f);
  u.add(P);
  const m = new l(14, 3.8, 11);
  m.translate(0, 7.3, -1.2);
  const se = new o(m, d);
  se.castShadow = !0, u.add(se);
  const oe = new l(4.2, 9.8, 4.8);
  oe.translate(0, 4.9 + 0.8, 0);
  const he = new o(oe, d);
  he.position.set(6.8, 0, -3.5), he.castShadow = !0, u.add(he), i("first_floor_structure", u, 0.36, 0.52, 16);
  const ne = new S(), me = new l(14.8, 0.45, 11.8);
  me.translate(0, 9.4, -1.2);
  const tt = new o(me, H);
  ne.add(tt);
  const ye = new l(14.6, 0.6, 11.6);
  ye.translate(0, 9.9, -1.2);
  const st = new o(ye, f);
  ne.add(st);
  const ie = new S();
  ie.position.set(6.8, 10.7, -3.5);
  const ot = 4;
  for (let n = 0; n < ot; n++) {
    const t = n * Math.PI / 2 + Math.PI / 4, e = new o(
      new de(0.12, 0.15, 1.8, 6),
      f
    );
    e.position.set(Math.cos(t) * 1.2, 0.9, Math.sin(t) * 1.2), ie.add(e);
  }
  const ve = new o(
    new Ze(1.6, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    f
  );
  ve.position.y = 1.8, ie.add(ve);
  const Me = new o(
    new et(0.25, 0.8, 8),
    f
  );
  Me.position.y = 3.6, ie.add(Me), ne.add(ie);
  const be = new dt(1.8, 2.1, 32);
  be.rotateX(-Math.PI / 2);
  const Pe = new pt({
    color: 13216106,
    side: wt,
    transparent: !0,
    opacity: 0.9
  }), ae = new o(be, Pe);
  ae.position.set(0, 9.7, 0), ne.add(ae), i("roof_and_dome", ne, 0.5, 0.65, 20);
  const K = new S(), Ge = new l(2.4, 2.6, 0.2), Fe = new o(Ge, I);
  Fe.position.set(-4.5, 2.2 + 0.8, 7.05), K.add(Fe);
  const ze = new o(Ge, I);
  ze.position.set(4.5, 2.2 + 0.8, 7.05), K.add(ze);
  const We = new l(2.2, 3.2, 0.2), Be = new o(We, M);
  Be.position.set(0, 1.6 + 0.8, 7.05), K.add(Be);
  const _e = new l(3.6, 2.4, 0.2), Oe = new o(_e, I);
  Oe.position.set(0, 7, 4.35), K.add(Oe);
  const Te = new l(8.5, 0.9, 0.1), Xe = new o(Te, f);
  Xe.position.set(0, 5.8, 7.6), K.add(Xe), i("glazing_and_doors", K, 0.63, 0.76, 5);
  const p = new S(), Se = new l(28, 0.15, 28);
  Se.translate(0, 0.08, 0);
  const Re = new o(Se, F);
  Re.receiveShadow = !0, p.add(Re);
  const Le = new l(3.6, 0.2, 10);
  Le.translate(0, 0.12, 10);
  const nt = new o(Le, z);
  p.add(nt);
  const Ie = new de(2, 2.2, 0.45, 16);
  Ie.translate(0, 0.3, 0);
  const Ve = new o(Ie, d);
  Ve.position.set(-7.5, 0, 8.5), p.add(Ve);
  const ue = new o(
    new gt(1.8, 16),
    k
  );
  ue.rotateX(-Math.PI / 2), ue.position.set(-7.5, 0.55, 8.5), p.add(ue);
  const Ce = new o(
    new et(1.5, 3.8, 6),
    new b({ color: 2246702, roughness: 0.85 })
  );
  Ce.position.set(-10, 2.4, -6), p.add(Ce);
  const Ye = Ce.clone();
  Ye.position.set(10.5, 2.4, 6), p.add(Ye);
  const qe = new o(
    new l(9, 1.8, 0.4),
    d
  );
  qe.position.set(-8.5, 0.9, 14), p.add(qe);
  const He = new o(
    new l(9, 1.8, 0.4),
    d
  );
  He.position.set(8.5, 0.9, 14), p.add(He), i("landscaping_garden", p, 0.74, 0.88, 4);
  const re = new S(), Ne = new o(new l(2.2, 2.2, 0.05), E);
  Ne.position.set(-4.5, 3, 7), re.add(Ne);
  const Ue = new o(new l(2.2, 2.2, 0.05), h);
  Ue.position.set(4.5, 3, 7), re.add(Ue);
  const je = new o(new l(3.2, 2.2, 0.05), C);
  je.position.set(0, 7, 4.3), re.add(je);
  const Ee = new o(new Ze(0.4, 8, 8), g);
  Ee.position.set(6.8, 11.5, -3.5), re.add(Ee), i("interior_lights", re, 0.86, 1, 0);
  const Je = 80, ke = new Qe(), fe = new Float32Array(Je * 3);
  for (let n = 0; n < Je; n++)
    fe[n * 3] = (Math.random() - 0.5) * 16, fe[n * 3 + 1] = Math.random() * 2.5 + 0.2, fe[n * 3 + 2] = (Math.random() - 0.5) * 16;
  ke.setAttribute("position", new ut(fe, 3));
  const Ae = new ft({
    color: 13216106,
    size: 0.65,
    transparent: !0,
    opacity: 0,
    blending: ht,
    depthWrite: !1
  }), $e = new mt(ke, Ae);
  v.add($e), O.add(v);
  function it(n) {
    return 1 + 2.70158 * Math.pow(n - 1, 3) + 1.70158 * Math.pow(n - 1, 2);
  }
  const at = (n) => {
    const t = L.clamp(n, 0, 1);
    for (const e of R)
      if (t < e.startP)
        e.mesh.visible = !1, e.mesh.position.copy(e.initialPos), e.mesh.scale.copy(e.initialScale);
      else if (t >= e.endP)
        e.mesh.visible = !0, e.mesh.position.copy(e.targetPos), e.mesh.scale.copy(e.targetScale);
      else {
        e.mesh.visible = !0;
        const c = (t - e.startP) / (e.endP - e.startP), G = L.clamp(it(c), 0, 1.15);
        e.mesh.position.lerpVectors(e.initialPos, e.targetPos, G), e.mesh.scale.lerpVectors(e.initialScale, e.targetScale, G), c > 0.85 && c < 0.98 && (Ae.opacity = (1 - c) * 3.5);
      }
    if (t >= 0.5) {
      const e = L.clamp((t - 0.5) / 0.15, 0, 1);
      ae.scale.set(e, e, e), ae.rotation.z = e * Math.PI * 2;
    }
    if (t >= 0.86) {
      const e = L.clamp((t - 0.86) / 0.035, 0, 1);
      E.emissiveIntensity = e * 2.5;
    } else
      E.emissiveIntensity = 0;
    if (t >= 0.895) {
      const e = L.clamp((t - 0.895) / 0.035, 0, 1);
      h.emissiveIntensity = e * 2.5;
    } else
      h.emissiveIntensity = 0;
    if (t >= 0.93) {
      const e = L.clamp((t - 0.93) / 0.035, 0, 1);
      C.emissiveIntensity = e * 2.5;
    } else
      C.emissiveIntensity = 0;
    if (t >= 0.965) {
      const e = L.clamp((t - 0.965) / 0.035, 0, 1);
      g.emissiveIntensity = e * 3.2;
    } else
      g.emissiveIntensity = 0;
  }, rt = (n) => {
    const t = {
      sandstone: { color: 16117468, roughness: 0.65, metalness: 0.05 },
      ivory: { color: 16776953, roughness: 0.45, metalness: 0.08 },
      charcoal: { color: 2303791, roughness: 0.6, metalness: 0.2 }
    }, e = t[n] || t.sandstone, c = new De(e.color);
    window.gsap ? (window.gsap.to(D.color, {
      r: c.r,
      g: c.g,
      b: c.b,
      duration: 0.8,
      ease: "power2.out"
    }), window.gsap.to(D, {
      roughness: e.roughness,
      metalness: e.metalness,
      duration: 0.8,
      ease: "power2.out"
    })) : (D.color.copy(c), D.roughness = e.roughness, D.metalness = e.metalness);
  };
  let Ke = !0;
  return {
    group: v,
    villaGroup: W,
    dustParticles: $e,
    clockRing: ae,
    clockProgressMat: Pe,
    materials: {
      sandstone: d,
      ivory: T,
      charcoal: M,
      activeFacade: D,
      roof: H,
      accent: f,
      glass: I,
      emissive: w,
      lawn: F,
      path: z,
      water: k
    },
    setAssemblyProgress: at,
    setFacadeFinish: rt,
    setGardenVisible: (n) => {
      Ke = n, window.gsap ? n ? (p.visible = !0, window.gsap.to(p.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: "back.out(1.4)"
      })) : window.gsap.to(p.scale, {
        x: 1e-3,
        y: 1e-3,
        z: 1e-3,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          Ke || (p.visible = !1);
        }
      }) : (p.visible = n, p.scale.setScalar(n ? 1 : 1e-3));
    },
    setLightingMood: (n, t, e) => {
      const c = t && ("isScene" in t ? t : t.scene), G = e || t && t.dirLight, Q = t && t.sky, q = t && t.lighting, ce = t && t.postFx, le = {
        day: {
          fogCol: 15257786,
          fogDensity: 2e-3,
          dirCol: 16774630,
          dirIntensity: 2.8,
          sunP: 0,
          timeOfDay: 0,
          emissive: 0.25,
          bloom: 0.15
        },
        dusk: {
          fogCol: 1714246,
          fogDensity: 35e-4,
          dirCol: 16766880,
          dirIntensity: 2.2,
          sunP: 0.5,
          timeOfDay: 0.5,
          emissive: 2.2,
          bloom: 0.38
        },
        night: {
          fogCol: 726832,
          fogDensity: 45e-4,
          dirCol: 4874376,
          dirIntensity: 0.55,
          sunP: 1,
          timeOfDay: 1,
          emissive: 3.8,
          bloom: 0.65
        }
      }, y = le[n] || le.dusk;
      if (window.gsap) {
        if (G) {
          const A = new De(y.dirCol);
          window.gsap.to(G.color, {
            r: A.r,
            g: A.g,
            b: A.b,
            duration: 1,
            ease: "power2.out"
          }), window.gsap.to(G, {
            intensity: y.dirIntensity,
            duration: 1,
            ease: "power2.out"
          });
        }
        if (c && c.fog && c.fog.isFogExp2) {
          const A = new De(y.fogCol);
          window.gsap.to(c.fog.color, {
            r: A.r,
            g: A.g,
            b: A.b,
            duration: 1,
            ease: "power2.out"
          }), window.gsap.to(c.fog, {
            density: y.fogDensity,
            duration: 1,
            ease: "power2.out"
          });
        }
        const xe = [w, E, h, C, g];
        for (const A of xe)
          window.gsap.to(A, {
            emissiveIntensity: y.emissive,
            duration: 1,
            ease: "power2.out"
          });
      } else
        G && (G.color.setHex(y.dirCol), G.intensity = y.dirIntensity), c && c.fog && c.fog.isFogExp2 && (c.fog.color.setHex(y.fogCol), c.fog.density = y.fogDensity), [w, E, h, C, g].forEach((xe) => {
          xe.emissiveIntensity = y.emissive;
        });
      Q && typeof Q.setSunProgress == "function" && Q.setSunProgress(y.sunP), q && typeof q.setTimeOfDay == "function" && q.setTimeOfDay(y.timeOfDay), ce && typeof ce.setBloomStrength == "function" && ce.setBloomStrength(y.bloom);
    },
    dispose: () => {
      O.remove(v), N.dispose(), Y.dispose(), Z.dispose(), X.dispose(), j.dispose(), J.dispose(), te.dispose(), _.dispose(), m.dispose(), oe.dispose(), me.dispose(), ye.dispose(), ve.geometry.dispose(), Me.geometry.dispose(), be.dispose(), Pe.dispose(), Ge.dispose(), We.dispose(), _e.dispose(), Te.dispose(), Se.dispose(), Le.dispose(), Ie.dispose(), ue.geometry.dispose(), Ee.geometry.dispose(), ke.dispose(), Ae.dispose(), d.dispose(), T.dispose(), M.dispose(), H.dispose(), f.dispose(), I.dispose(), w.dispose(), E.dispose(), h.dispose(), C.dispose(), g.dispose(), F.dispose(), z.dispose(), k.dispose();
    }
  };
}
function St(O, v, d, T) {
  const M = vt(O), D = T && "isDirectionalLight" in T ? { scene: O, dirLight: T } : T || { scene: O }, H = v.querySelectorAll("[data-mood]");
  H.forEach((s) => {
    s.addEventListener("click", (a) => {
      const r = a.currentTarget;
      H.forEach((_) => _.classList.remove("is-active")), r.classList.add("is-active");
      const u = r.dataset.mood || "dusk";
      M.setLightingMood(u, D);
    });
  });
  const f = v.querySelectorAll("[data-facade]");
  f.forEach((s) => {
    s.addEventListener("click", (a) => {
      const r = a.currentTarget;
      f.forEach((_) => _.classList.remove("is-active")), r.classList.add("is-active");
      const u = r.dataset.facade || "sandstone";
      M.setFacadeFinish(u);
    });
  });
  const I = v.querySelector("[data-toggle-garden]");
  let w = !0;
  I && I.addEventListener("click", () => {
    w = !w, I.classList.toggle("is-active", w), I.textContent = w ? "Garden: ON" : "Garden: OFF", M.setGardenVisible(w);
  });
  const E = v.querySelectorAll(".assembly-step");
  let h = !1;
  const C = new x(42, 5.5, -22);
  let g = 26, F = Math.PI / 3, z = 0.4, k = 26, X = Math.PI / 3, W = 0.4;
  const R = new yt(k, X, W), i = /* @__PURE__ */ new Map();
  let V = 0, N = 26, Y = 0, U = 0;
  function Z(s, a) {
    const r = s.x - a.x, u = s.y - a.y;
    return Math.sqrt(r * r + u * u);
  }
  const pe = (s) => {
    if (h) {
      if (i.set(s.pointerId, { x: s.clientX, y: s.clientY }), i.size === 1)
        Y = s.clientX, U = s.clientY;
      else if (i.size === 2) {
        const a = Array.from(i.values());
        V = Z(a[0], a[1]), N = g;
      }
    }
  }, j = (s) => {
    if (!(!h || !i.has(s.pointerId))) {
      if (i.set(s.pointerId, { x: s.clientX, y: s.clientY }), i.size === 1) {
        const a = s.clientX - Y, r = s.clientY - U;
        Y = s.clientX, U = s.clientY, z -= a * 7e-3, F = L.clamp(
          F - r * 7e-3,
          Math.PI / 6,
          // Min ~30 deg elevation
          Math.PI / 2.12
          // Max ~85 deg (never go below ground)
        );
      } else if (i.size === 2) {
        const a = Array.from(i.values()), r = Z(a[0], a[1]);
        if (V > 10) {
          const u = V / r;
          g = L.clamp(N * u, 18, 38);
        }
      }
    }
  }, ee = (s) => {
    if (i.delete(s.pointerId), i.size === 1) {
      const a = Array.from(i.values())[0];
      Y = a.x, U = a.y;
    }
  }, B = (s) => {
    i.delete(s.pointerId);
  }, J = (s) => {
    h && (s.preventDefault(), g = L.clamp(g + s.deltaY * 0.02, 18, 38));
  }, $ = () => {
    h && (g = 26, F = Math.PI / 3, z = 0.4);
  };
  return window.addEventListener("pointerdown", pe, { passive: !0 }), window.addEventListener("pointermove", j, { passive: !0 }), window.addEventListener("pointerup", ee, { passive: !0 }), window.addEventListener("pointercancel", B, { passive: !0 }), d.addEventListener("wheel", J, { passive: !1 }), d.addEventListener("dblclick", $), {
    assemblyRig: M,
    update: (s, a, r) => {
      let P = 0;
      if (s < 0.57 ? P = 0 : s >= 0.72 ? P = 1 : P = (s - 0.57) / (0.72 - 0.57), M.setAssemblyProgress(P), E.length > 0) {
        let m = -1;
        s >= 0.57 && s <= 0.72 + 0.04 && (P < 0.22 ? m = 0 : P < 0.36 ? m = 1 : P < 0.5 ? m = 2 : P < 0.66 ? m = 3 : P < 0.82 ? m = 4 : m = 5), E.forEach((se, oe) => {
          oe === m ? se.classList.add("is-active") : se.classList.remove("is-active");
        });
      }
      if (h) {
        i.size === 0 && (z += 25e-4), W += (z - W) * 0.08, X += (F - X) * 0.08, k += (g - k) * 0.08, R.radius = k, R.phi = X, R.theta = W;
        const m = new x().setFromSpherical(R);
        r.position.copy(C).add(m), r.lookAt(C);
      }
    },
    setActiveConfigurator: (s) => {
      if (h = s, d.style.pointerEvents = s ? "auto" : "none", d.style.touchAction = "pan-y", s) {
        const a = new x().subVectors(O.position, C), r = L.clamp(a.length(), 18, 38);
        g = r, k = r;
      }
    },
    dispose: () => {
      window.removeEventListener("pointerdown", pe), window.removeEventListener("pointermove", j), window.removeEventListener("pointerup", ee), window.removeEventListener("pointercancel", B), d.removeEventListener("wheel", J), d.removeEventListener("dblclick", $), M.dispose();
    }
  };
}
export {
  St as loadScenes5And6
};
