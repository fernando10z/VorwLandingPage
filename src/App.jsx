import { useState, useEffect, useRef } from "react";

const IconEye = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
const IconChart = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>);
const IconShield = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);
const IconUsers = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IconClock = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const IconArrowRight = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const IconCheck = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const IconPlay = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>);

function useCounter(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = Date.now();
        const run = () => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          setCount(Math.floor(start + (end - start) * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(run);
        };
        run();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration, start]);
  return [count, ref];
}

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [af, setAf] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [s1, s1r] = useCounter(98, 2000);
  const [s2, s2r] = useCounter(340, 2200);
  const [s3, s3r] = useCounter(47, 1800);
  const [s4, s4r] = useCounter(24, 1600);
  const [hRef, hV] = useReveal();
  const [fRef, fV] = useReveal();
  const [wRef, wV] = useReveal();
  const [pRef, pV] = useReveal();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const features = [
    { icon: <IconEye />, title: "Análisis Visual Inteligente", desc: "Nuestro sistema se conecta a tus cámaras existentes y analiza en tiempo real el comportamiento de clientes, flujos de tráfico y zonas de interés." },
    { icon: <IconChart />, title: "Reportes Accionables", desc: "Dashboards claros que transforman datos complejos en decisiones simples. Métricas de afluencia, tiempos de permanencia y patrones de compra." },
    { icon: <IconUsers />, title: "Conteo de Personas", desc: "Conteo preciso de visitantes por hora, día y zona. Identifica horarios pico, optimiza turnos de personal y mejora la distribución del espacio." },
    { icon: <IconClock />, title: "Alertas en Tiempo Real", desc: "Notificaciones instantáneas sobre eventos relevantes: afluencia inusual, zonas desatendidas o comportamientos que requieren atención." },
  ];

  const plans = [
    { name: "Starter", price: "99", period: "/mes", desc: "Para locales individuales", features: ["Hasta 4 cámaras", "Reportes semanales", "Conteo de personas", "Dashboard básico", "Soporte por email"], cta: "Comenzar gratis", hl: false },
    { name: "Business", price: "249", period: "/mes", desc: "Para cadenas en crecimiento", features: ["Hasta 16 cámaras", "Reportes en tiempo real", "Mapas de calor", "API de integración", "Alertas personalizadas", "Soporte prioritario"], cta: "Prueba 14 días gratis", hl: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "Para grandes operaciones", features: ["Cámaras ilimitadas", "Multi-sucursal", "Análisis predictivo", "Integración ERP/POS", "SLA dedicado", "Gerente de cuenta"], cta: "Contactar ventas", hl: false },
  ];

  const tr = (d) => ({ transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)", transitionDelay: `${d}s` });

  return (
    <div style={{ fontFamily: "'DM Sans', -apple-system, sans-serif", background: "#fff", color: "#111827", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;overflow-x:hidden}body{font-family:'DM Sans',sans-serif;background:#fff;-webkit-font-smoothing:antialiased;overflow-x:hidden;width:100%}::selection{background:#0D1B54;color:#fff}a{text-decoration:none;color:inherit}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:900px){.hide-m{display:none!important}.show-m{display:flex!important}.sg{grid-template-columns:repeat(2,1fr)!important}.fg{grid-template-columns:1fr!important}.stg{grid-template-columns:1fr 1fr!important}.pg{grid-template-columns:1fr!important;max-width:400px!important}.ft{flex-direction:column!important}.ms{display:none!important}.mc{grid-template-columns:1fr!important}}
        @media(max-width:600px){.stg{grid-template-columns:1fr!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 24px", background: scrolled ? "rgba(255,255,255,0.92)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid transparent", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ color: "#0D1B54" }}><IconEye /></div>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, letterSpacing: "0.1em", color: "#0D1B54" }}>VORW</span>
          </a>
          <div className="hide-m" style={{ display: "flex", gap: 32 }}>
            {["Solución", "Características", "Precios", "Contacto"].map(i => <a key={i} href={`#${i.toLowerCase()}`} style={{ fontSize: 14, color: "#6b7280", fontWeight: 450 }}>{i}</a>)}
          </div>
          <div className="hide-m" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a href="#" style={{ fontSize: 14, color: "#6b7280" }}>Iniciar sesión</a>
            <a href="#demo" style={{ padding: "9px 20px", background: "#0D1B54", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 500 }}>Solicitar demo</a>
          </div>
          <button className="show-m" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <div style={{ width: 20, height: 2, background: "#111", borderRadius: 2, transition: "all .3s", ...(menuOpen ? { transform: "rotate(45deg) translate(4px,4px)" } : {}) }} />
            <div style={{ width: 20, height: 2, background: "#111", borderRadius: 2, transition: "all .3s", ...(menuOpen ? { opacity: 0 } : {}) }} />
            <div style={{ width: 20, height: 2, background: "#111", borderRadius: 2, transition: "all .3s", ...(menuOpen ? { transform: "rotate(-45deg) translate(4px,-4px)" } : {}) }} />
          </button>
        </div>
        {menuOpen && <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0 20px", borderTop: "1px solid #e5e7eb" }}>
          {["Solución", "Características", "Precios", "Contacto"].map(i => <a key={i} href={`#${i.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: "#374151", padding: "6px 0" }}>{i}</a>)}
          <a href="#demo" style={{ padding: "10px 20px", background: "#0D1B54", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 500, textAlign: "center" }}>Solicitar demo</a>
        </div>}
      </nav>

      {/* HERO */}
      <section ref={hRef} style={{ position: "relative", padding: "140px 24px 80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", width: "100%" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)", backgroundSize: "32px 32px", maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 20%, transparent 70%)", opacity: 0.5 }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 680, width: "100%", margin: "0 auto", ...tr(0), opacity: hV ? 1 : 0, transform: hV ? "translateY(0)" : "translateY(24px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "#EEF2FF", border: "1px solid #E0E7FF", borderRadius: 100, fontSize: 13, fontWeight: 500, color: "#4338CA", marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4338CA", animation: "pulse 2s infinite" }} />Inteligencia visual para retail
          </div>
          <h1 style={{ fontSize: "clamp(38px, 5.5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", color: "#0D1B54", marginBottom: 24 }}>
            Tus cámaras ya ven todo.<br /><span style={{ color: "#4338CA" }}>Ahora pueden entender.</span>
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.6vw, 18px)", lineHeight: 1.7, color: "#6b7280", maxWidth: 520, margin: "0 auto 36px" }}>
            VORW transforma las cámaras de tus locales en inteligencia de negocio. Reportes automáticos, mapas de calor y métricas para tomar mejores decisiones.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="#demo" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px", background: "#0D1B54", color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Solicitar demo gratuita <IconArrowRight /></a>
            <a href="#video" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", background: "#F9FAFB", color: "#374151", borderRadius: 10, fontSize: 15, fontWeight: 500, border: "1px solid #e5e7eb" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#4338CA" }}><IconPlay /></div>Ver cómo funciona
            </a>
          </div>
          <p style={{ marginTop: 36, fontSize: 13, color: "#9ca3af" }}>Confiado por +200 locales comerciales en Latinoamérica</p>
        </div>

        {/* Dashboard Mock */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 880, margin: "56px auto 0", ...tr(0.3), opacity: hV ? 1 : 0, transform: hV ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)" }}>
          <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 25px 80px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fca5a5" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fcd34d" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#86efac" }} />
              </div>
              <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "'JetBrains Mono',monospace" }}>app.vorw.io/dashboard</span>
            </div>
            <div style={{ display: "flex", minHeight: 280 }}>
              <div className="ms" style={{ width: 150, borderRight: "1px solid #f3f4f6", padding: "14px 10px" }}>
                {["Dashboard", "Cámaras", "Reportes", "Alertas", "Config"].map((item, i) => (
                  <div key={item} style={{ padding: "8px 12px", borderRadius: 7, fontSize: 13, color: i === 0 ? "#4338CA" : "#9ca3af", fontWeight: i === 0 ? 500 : 400, background: i === 0 ? "#EEF2FF" : "transparent", marginBottom: 2 }}>{item}</div>
                ))}
              </div>
              <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="mc" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[{ l: "Visitantes hoy", v: "1,247", c: "+12%" }, { l: "Tiempo promedio", v: "8.3 min", c: "+5%" }, { l: "Tasa conversión", v: "34.2%", c: "+2.1%" }].map(c => (
                    <div key={c.l} style={{ background: "#fafafa", borderRadius: 10, padding: "14px 16px", border: "1px solid #f3f4f6" }}>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>{c.l}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: "#0D1B54", fontFamily: "'JetBrains Mono',monospace" }}>{c.v}</div>
                      <div style={{ fontSize: 12, color: "#22c55e", marginTop: 4 }}>{c.c}</div>
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, background: "#fafafa", borderRadius: 10, padding: "16px 18px", border: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 14 }}>Afluencia por hora</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
                    {[30, 45, 60, 80, 95, 100, 85, 90, 70, 55, 40, 25].map((h, i) => (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }}>
                        <div style={{ width: "100%", height: `${h}%`, borderRadius: "4px 4px 0 0", background: "linear-gradient(to top, #0D1B54, #6366f1)", opacity: 0.85 }} />
                        <span style={{ fontSize: 9, color: "#9ca3af", fontFamily: "'JetBrains Mono',monospace" }}>{8 + i}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "56px 24px", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6" }}>
        <div className="sg" style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }}>
          {[[s1, s1r, "%", "Precisión en conteo"], [s2, s2r, "+", "Locales activos"], [s3, s3r, "%", "Mejora en decisiones"], [s4, s4r, "/7", "Monitoreo continuo"]].map(([v, r, sfx, lbl], i) => (
            <div key={i} ref={r}>
              <div style={{ fontSize: 42, fontWeight: 700, color: "#0D1B54", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "-0.02em" }}>{v}{sfx}</div>
              <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section ref={fRef} id="características" style={{ padding: "96px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 56px", ...tr(0), opacity: fV ? 1 : 0, transform: fV ? "translateY(0)" : "translateY(20px)" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", background: "#EEF2FF", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "#4338CA", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Características</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#0D1B54", marginBottom: 14 }}>De cámaras pasivas a inteligencia activa</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6b7280" }}>Tu infraestructura ya está instalada. VORW la convierte en tu herramienta de análisis más poderosa.</p>
        </div>
        <div className="fg" style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {features.map((f, i) => (
              <button key={i} onClick={() => setAf(i)} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", borderRadius: 12, border: af === i ? "1px solid #e5e7eb" : "1px solid transparent", background: af === i ? "#fafafa" : "transparent", cursor: "pointer", textAlign: "left", width: "100%", fontFamily: "'DM Sans',sans-serif", color: "#111827", transition: "all 0.2s" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: af === i ? "#EEF2FF" : "#f9fafb", color: af === i ? "#4338CA" : "#9ca3af", transition: "all 0.2s" }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: af === i ? "#0D1B54" : "#6b7280", transition: "color 0.2s", margin: 0 }}>{f.title}</h3>
                  {af === i && <p style={{ fontSize: 14, lineHeight: 1.6, color: "#9ca3af", marginTop: 8, animation: "slideUp 0.3s ease" }}>{f.desc}</p>}
                </div>
              </button>
            ))}
          </div>
          <div style={{ background: "#fafafa", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", minHeight: 360 }}>
            {af === 0 && <HeatmapVis />}
            {af === 1 && <ChartVis />}
            {af === 2 && <PeopleVis />}
            {af === 3 && <AlertsVis />}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={wRef} id="solución" style={{ padding: "96px 24px", background: "#fafafa" }}>
        <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 56px", ...tr(0), opacity: wV ? 1 : 0, transform: wV ? "translateY(0)" : "translateY(20px)" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", background: "#EEF2FF", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "#4338CA", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Proceso</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#0D1B54", marginBottom: 14 }}>En funcionamiento en 24 horas</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6b7280" }}>Sin hardware adicional. Sin instalaciones complejas. Solo conexión y resultados.</p>
        </div>
        <div className="stg" style={{ maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            { s: "01", t: "Conecta tus cámaras", d: "Integración directa con tu sistema CCTV existente. Compatible con las principales marcas." },
            { s: "02", t: "VORW analiza", d: "Nuestro motor de visión artificial procesa los feeds en tiempo real sin almacenar video." },
            { s: "03", t: "Recibe reportes", d: "Dashboards interactivos y reportes automatizados llegan a tus gerentes." },
            { s: "04", t: "Toma decisiones", d: "Optimiza personal, redistribuye espacios y mejora la experiencia del cliente." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "28px 22px", background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", ...tr(i * 0.12), opacity: wV ? 1 : 0, transform: wV ? "translateY(0)" : "translateY(24px)" }}>
              <span style={{ fontSize: 44, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#E0E7FF", lineHeight: 1, display: "block", marginBottom: 14 }}>{item.s}</span>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0D1B54", marginBottom: 8 }}>{item.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#9ca3af" }}>{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRIVACY */}
      <section style={{ padding: "72px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 22, padding: "36px 32px", background: "#fafafa", borderRadius: 16, border: "1px solid #e5e7eb" }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669", flexShrink: 0 }}><IconShield /></div>
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 600, color: "#0D1B54", marginBottom: 8 }}>Privacidad por diseño</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#6b7280" }}>VORW no almacena video ni imágenes. Solo procesamos metadatos anónimos: conteos, trayectorias y zonas de interés.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section ref={pRef} id="precios" style={{ padding: "96px 24px" }}>
        <div style={{ textAlign: "center", maxWidth: 540, margin: "0 auto 56px", ...tr(0), opacity: pV ? 1 : 0, transform: pV ? "translateY(0)" : "translateY(20px)" }}>
          <div style={{ display: "inline-block", padding: "4px 14px", background: "#EEF2FF", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "#4338CA", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>Precios</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#0D1B54", marginBottom: 14 }}>Planes que escalan contigo</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#6b7280" }}>Comienza con lo que necesitas. Crece sin fricciones.</p>
        </div>
        <div className="pg" style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "start" }}>
          {plans.map((p, i) => (
            <div key={i} style={{ position: "relative", padding: "32px 26px", background: "#fff", borderRadius: 16, border: p.hl ? "2px solid #0D1B54" : "1px solid #e5e7eb", boxShadow: p.hl ? "0 8px 40px rgba(13,27,84,0.08)" : "none", ...tr(i * 0.1), opacity: pV ? 1 : 0, transform: pV ? "translateY(0)" : "translateY(24px)" }}>
              {p.hl && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", padding: "4px 16px", background: "#0D1B54", color: "#fff", borderRadius: 100, fontSize: 12, fontWeight: 600 }}>Más popular</div>}
              <h3 style={{ fontSize: 19, fontWeight: 600, color: "#0D1B54" }}>{p.name}</h3>
              <p style={{ fontSize: 14, color: "#9ca3af", marginBottom: 20 }}>{p.desc}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 24 }}>
                {p.price !== "Custom" && <span style={{ fontSize: 20, fontWeight: 500, color: "#6b7280" }}>$</span>}
                <span style={{ fontSize: 42, fontWeight: 700, color: "#0D1B54", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "-0.02em" }}>{p.price}</span>
                <span style={{ fontSize: 14, color: "#9ca3af", marginLeft: 4 }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 28 }}>
                {p.features.map(f => <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#6b7280" }}><span style={{ color: p.hl ? "#4338CA" : "#9ca3af", display: "flex" }}><IconCheck /></span>{f}</li>)}
              </ul>
              <a href="#demo" style={{ display: "block", textAlign: "center", padding: "12px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", ...(p.hl ? { background: "#0D1B54", color: "#fff", border: "none" } : { background: "#fff", color: "#0D1B54", border: "1px solid #e5e7eb" }) }}>{p.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 24px", background: "#0D1B54" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 36px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#fff", marginBottom: 14 }}>Convierte tus cámaras en tu mejor fuente de datos</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>Agenda una demo personalizada y descubre cómo VORW puede transformar tu negocio.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <a href="#demo" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px", background: "#fff", color: "#0D1B54", borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Agendar demo gratuita <IconArrowRight /></a>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", background: "transparent", color: "rgba(255,255,255,0.8)", borderRadius: 10, fontSize: 15, fontWeight: 500, border: "1px solid rgba(255,255,255,0.2)" }}>Hablar con ventas</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #f3f4f6", padding: "56px 24px 28px" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <div className="ft" style={{ display: "flex", justifyContent: "space-between", gap: 48, marginBottom: 44, flexWrap: "wrap" }}>
            <div style={{ maxWidth: 240 }}>
              <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ color: "#0D1B54" }}><IconEye /></div>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 17, letterSpacing: "0.1em", color: "#0D1B54" }}>VORW</span>
              </a>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#9ca3af", marginTop: 14 }}>Inteligencia visual que transforma la operación de tu negocio.</p>
            </div>
            <div style={{ display: "flex", gap: 52, flexWrap: "wrap" }}>
              {[{ t: "Producto", l: ["Características", "Precios", "Integraciones", "API"] }, { t: "Empresa", l: ["Nosotros", "Blog", "Carreras", "Contacto"] }, { t: "Legal", l: ["Privacidad", "Términos", "Seguridad"] }].map(col => (
                <div key={col.t} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, color: "#0D1B54", marginBottom: 2 }}>{col.t}</h4>
                  {col.l.map(link => <a key={link} href="#" style={{ fontSize: 14, color: "#9ca3af" }}>{link}</a>)}
                </div>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: 20, borderTop: "1px solid #f3f4f6" }}>
            <span style={{ fontSize: 13, color: "#9ca3af" }}>© 2026 VORW. Todos los derechos reservados.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* FEATURE VISUALS */
function HeatmapVis() {
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1B54" }}>Mapa de calor · Planta baja</span>
        <span style={{ fontSize: 12, color: "#22c55e", fontFamily: "'JetBrains Mono',monospace", animation: "pulse 2s infinite" }}>● En vivo</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 4 }}>
        {Array.from({ length: 48 }).map((_, i) => {
          const n = Math.random();
          const c = n > 0.8 ? "rgba(220,38,38,0.6)" : n > 0.6 ? "rgba(249,115,22,0.5)" : n > 0.4 ? "rgba(234,179,8,0.4)" : n > 0.2 ? "rgba(34,197,94,0.25)" : "rgba(13,27,84,0.05)";
          return <div key={i} style={{ aspectRatio: "1", borderRadius: 4, background: c }} />;
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, justifyContent: "center" }}>
        <span style={{ fontSize: 11, color: "#9ca3af" }}>Baja</span>
        <div style={{ width: 120, height: 8, borderRadius: 4, background: "linear-gradient(to right, rgba(13,27,84,0.1), #22c55e, #eab308, #f97316, #dc2626)" }} />
        <span style={{ fontSize: 11, color: "#9ca3af" }}>Alta</span>
      </div>
    </div>
  );
}

function ChartVis() {
  const d = [65, 45, 78, 52, 90, 68, 85];
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1B54" }}>Conversión semanal</span>
        <span style={{ fontSize: 13, color: "#4338CA", fontWeight: 600 }}>+12.4%</span>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 230, padding: "0 6px" }}>
        {d.map((v, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%" }}>
            <div style={{ flex: 1, width: "100%", background: "#f3f4f6", borderRadius: 6, display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
              <div style={{ width: "100%", height: `${v}%`, background: "linear-gradient(to top, #0D1B54, #818cf8)", borderRadius: 6 }} />
            </div>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PeopleVis() {
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1B54" }}>Conteo en tiempo real</span>
        <span style={{ fontSize: 12, color: "#22c55e", fontFamily: "'JetBrains Mono',monospace", animation: "pulse 2s infinite" }}>● En vivo</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[{ z: "Entrada principal", c: 23, t: "↑" }, { z: "Área de cajas", c: 8, t: "↓" }, { z: "Pasillo central", c: 45, t: "↑" }, { z: "Zona gourmet", c: 12, t: "→" }].map(z => (
          <div key={z.z} style={{ background: "#fff", borderRadius: 10, padding: 14, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{z.z}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", color: "#0D1B54" }}>{z.c}</span>
              <span style={{ fontSize: 16, color: "#4338CA" }}>{z.t}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsVis() {
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1B54" }}>Alertas recientes</span>
        <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 100, background: "#FEF2F2", color: "#ef4444", fontWeight: 500 }}>3 nuevas</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[{ t: "Hace 2 min", m: "Afluencia pico detectada en Zona A", tp: "warning" }, { t: "Hace 15 min", m: "Cola en cajas supera 8 personas", tp: "alert" }, { t: "Hace 1 hr", m: "Zona promocional sin visitantes por 30 min", tp: "info" }].map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 14, background: "#fff", borderRadius: 10, border: "1px solid #e5e7eb" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: a.tp === "alert" ? "#ef4444" : a.tp === "warning" ? "#f59e0b" : "#3b82f6" }} />
            <div>
              <div style={{ fontSize: 14, color: "#0D1B54", lineHeight: 1.5 }}>{a.m}</div>
              <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 3 }}>{a.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}