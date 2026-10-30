function c(n) {
  "requestIdleCallback" in window ? window.requestIdleCallback(n, { timeout: 2e3 }) : setTimeout(n, 200);
}
function d() {
  if (typeof window > "u") return !0;
  const r = new URLSearchParams(window.location.search).get("3d");
  if (r === "off" || r === "0") return !0;
  try {
    if (localStorage.getItem("kedia3d") === "off") return !0;
  } catch {
  }
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return !0;
  try {
    if (!document.createElement("canvas").getContext("webgl2")) return !0;
  } catch {
    return !0;
  }
  const t = navigator;
  if (t.connection) {
    if (t.connection.saveData === !0) return !0;
    const o = t.connection.effectiveType;
    if (o === "slow-2g" || o === "2g" || o === "3g")
      return !0;
  }
  return (t.deviceMemory ?? 4) < 2;
}
function i() {
  const n = document.querySelector("script[data-3d-entry]");
  if (!n) return;
  const r = n.getAttribute("data-3d-entry");
  if (!r) return;
  if (d()) {
    document.documentElement.classList.add("no3d");
    const e = document.getElementById("world");
    e && (e.style.display = "none");
    return;
  }
  const t = () => {
    c(() => {
      const e = document.createElement("script");
      e.type = "module", e.src = r, e.async = !0, document.body.appendChild(e);
    });
  };
  document.readyState === "complete" ? t() : window.addEventListener("load", t, { once: !0 });
}
i();
