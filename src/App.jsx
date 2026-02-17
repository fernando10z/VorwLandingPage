import { useState, useEffect, useRef } from "react";

/* ══════ ICONS ══════ */
const I = ({ d, s = 24, w = 1.5 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const Eye = () => <I d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>;
const Bar = () => <I d="M18 20V10M12 20V4M6 20v-6"/>;
const Shield = () => <I d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>;
const Users = () => <I d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"/>;
const Clock = () => <I d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2"/>;
const Arr = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Chk = ({ c = "currentColor" }) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Play = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21"/></svg>;

/* ══════ HOOKS ══════ */
function useVis(th = 0.12) {
  const r = useRef(null);
  const [v, s] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => e.isIntersecting && s(true), { threshold: th });
    r.current && o.observe(r.current);
    return () => o.disconnect();
  }, [th]);
  return [r, v];
}

function useCnt(end, dur = 2200) {
  const [n, sn] = useState(0);
  const r = useRef(null);
  const d = useRef(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !d.current) {
        d.current = true;
        const t0 = performance.now();
        const go = now => {
          const p = Math.min((now - t0) / dur, 1);
          sn(Math.floor(end * (1 - Math.pow(1 - p, 4))));
          p < 1 && requestAnimationFrame(go);
        };
        requestAnimationFrame(go);
      }
    }, { threshold: 0.4 });
    r.current && o.observe(r.current);
    return () => o.disconnect();
  }, [end, dur]);
  return [n, r];
}

/* ══════ IMAGES ══════ */
const IMG = {
  hero: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&q=80",
  store1: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  store2: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
  analytics: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  team: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  camera: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
  retail: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
};

/* ══════ APP ══════ */
export default function App() {
  const [menu, setMenu] = useState(false);
  const [scr, setScr] = useState(false);
  const [af, setAf] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [hR, hV] = useVis(0.05);
  const [fR, fV] = useVis();
  const [wR, wV] = useVis();
  const [pR, pV] = useVis();
  const [tR, tV] = useVis();
  const [gR, gV] = useVis();

  const [c1, c1r] = useCnt(98);
  const [c2, c2r] = useCnt(340);
  const [c3, c3r] = useCnt(47);
  const [c4, c4r] = useCnt(24);

  useEffect(() => {
    const fn = () => setScr(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    setTimeout(() => setLoaded(true), 200);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const feats = [
    { icon: <Eye/>, t: "Visión Inteligente", d: "Analizamos los feeds de tus cámaras existentes en tiempo real: flujos de clientes, zonas calientes, patrones de comportamiento. Sin instalar hardware nuevo.", tag: "Core" },
    { icon: <Bar/>, t: "Reportes Ejecutivos", d: "Cada mañana, tus gerentes reciben un dashboard con las métricas que importan: afluencia, conversión, permanencia y tendencias. Todo automatizado.", tag: "Analytics" },
    { icon: <Users/>, t: "Conteo Preciso", d: "98% de precisión. Por hora, por zona, por día. Detecta picos, optimiza personal y mide el impacto real de cada promoción.", tag: "Tracking" },
    { icon: <Clock/>, t: "Alertas Inteligentes", d: "Colas largas, zonas vacías, afluencia inusual — recibe alertas instantáneas y actúa antes de que se convierta en problema.", tag: "Real-time" },
  ];

  const plans = [
    { n: "Starter", p: "99", d: "Ideal para un local", items: ["Hasta 4 cámaras","Reportes semanales","Conteo de personas","Dashboard básico","Soporte email"], cta: "Comenzar gratis", pop: false },
    { n: "Business", p: "249", d: "Para cadenas en crecimiento", items: ["Hasta 16 cámaras","Reportes en tiempo real","Mapas de calor","API integración","Alertas custom","Soporte prioritario"], cta: "14 días gratis", pop: true },
    { n: "Enterprise", p: "Custom", d: "Operaciones a escala", items: ["Cámaras ilimitadas","Multi-sucursal","Análisis predictivo","Integración ERP/POS","SLA dedicado","Account manager"], cta: "Contactar ventas", pop: false },
  ];

  const a = (del = 0) => ({ transition: "all 0.85s cubic-bezier(0.22,1,0.36,1)", transitionDelay: `${del}s` });

  return (
    <div className="app">
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav className={`nav ${scr ? "nav-scroll" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="logo"><div className="logo-mark"><Eye/></div><span className="logo-type">VORW</span></a>
          <div className="nav-links hd-m">{["Solución","Características","Precios","Contacto"].map(x => <a key={x} href={`#${x.toLowerCase()}`} className="nav-link">{x}</a>)}</div>
          <div className="nav-right hd-m">
            <a href="#" className="nav-link">Iniciar sesión</a>
            <a href="#demo" className="btn-sm">Solicitar demo</a>
          </div>
          <button className="menu-btn sh-m" onClick={() => setMenu(!menu)} aria-label="Menu">
            <span className={`ml ${menu ? "open" : ""}`}/><span className={`ml ${menu ? "open" : ""}`}/><span className={`ml ${menu ? "open" : ""}`}/>
          </button>
        </div>
        {menu && <div className="mob-nav">
          {["Solución","Características","Precios","Contacto"].map(x => <a key={x} href={`#${x.toLowerCase()}`} className="mob-link" onClick={() => setMenu(false)}>{x}</a>)}
          <a href="#demo" className="btn-sm" style={{ textAlign: "center" }}>Solicitar demo</a>
        </div>}
      </nav>

      {/* ── HERO: SPLIT SCREEN ── */}
      <section ref={hR} className="hero">
        {/* Left: Content */}
        <div className="hero-left" style={{ ...a(0.1), opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0)" : "translateX(-40px)" }}>
          <div className="hero-badge"><span className="badge-pulse"/>Plataforma de inteligencia visual</div>
          <h1 className="hero-h1">
            Cada cámara es un<br/>
            <span className="hero-accent">analista de datos.</span>
          </h1>
          <p className="hero-sub">
            VORW convierte tus cámaras de seguridad en la fuente de inteligencia más poderosa de tu negocio. Reportes automáticos, mapas de calor y métricas accionables — directo a tus gerentes, cada día.
          </p>
          <div className="hero-ctas">
            <a href="#demo" className="btn-primary">Agenda tu demo gratuita <Arr/></a>
            <a href="#video" className="btn-ghost"><div className="play-wrap"><Play/></div>Ver en 90 segundos</a>
          </div>
          <div className="hero-proof" style={{ ...a(0.6), opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)" }}>
            <div className="proof-avatars">
              {["MR","KL","AS","JP","DV"].map((x, i) => <div key={i} className="proof-av" style={{ background: ["#0D1B54","#4338CA","#6366f1","#818cf8","#1e1b4b"][i], zIndex: 6 - i }}>{x}</div>)}
            </div>
            <div><div className="proof-stars">★★★★★</div><span className="proof-txt">+200 locales en Latinoamérica</span></div>
          </div>
        </div>

        {/* Right: Image + Floating Cards */}
        <div className="hero-right" style={{ ...a(0.3), opacity: loaded ? 1 : 0, transform: loaded ? "translateX(0) scale(1)" : "translateX(40px) scale(0.97)" }}>
          <div className="hero-img-wrap">
            <img src={IMG.hero} alt="Retail store interior" className="hero-img"/>
            {/* Overlay scan line effect */}
            <div className="scan-overlay"/>
            {/* Floating metric cards */}
            <div className="float-card fc-1" style={{ ...a(0.7), opacity: loaded ? 1 : 0, transform: loaded ? "translate(0,0)" : "translate(20px,-20px)" }}>
              <span className="fc-label">Visitantes ahora</span>
              <span className="fc-value">127</span>
              <span className="fc-badge up">+18%</span>
            </div>
            <div className="float-card fc-2" style={{ ...a(0.9), opacity: loaded ? 1 : 0, transform: loaded ? "translate(0,0)" : "translate(-20px,20px)" }}>
              <span className="fc-label">Zona caliente</span>
              <div className="fc-heat">
                {[0.9,0.7,0.5,0.8,0.3,0.6,0.95,0.4].map((v, i) => <div key={i} className="fc-heat-cell" style={{ opacity: 0.3 + v * 0.7, background: v > 0.7 ? "#ef4444" : v > 0.4 ? "#f59e0b" : "#22c55e" }}/>)}
              </div>
            </div>
            <div className="float-card fc-3" style={{ ...a(1.1), opacity: loaded ? 1 : 0, transform: loaded ? "translate(0,0)" : "translate(0,20px)" }}>
              <span className="fc-label">Conversión</span>
              <span className="fc-value sm">34.2%</span>
              <span className="fc-badge up">+2.1%</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGOS / TRUST BAR ── */}
      <section className="trust-bar">
        <span className="trust-label">Empresas que confían en nosotros</span>
        <div className="trust-logos">
          {["RetailMax","Plaza Central","Grupo Éxito","MegaStore","SuperMarket+","FashionHub"].map(x => <span key={x} className="trust-logo">{x}</span>)}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats">
        <div className="stats-grid">
          {[[c1,c1r,"%","Precisión en conteo"],[c2,c2r,"+","Locales activos"],[c3,c3r,"%","Mejora en decisiones"],[c4,c4r,"/7","Monitoreo continuo"]].map(([v,r,sfx,lbl],i) => (
            <div key={i} ref={r} className="stat">
              <div className="stat-num">{v}{sfx}</div>
              <div className="stat-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BIG IMAGE + TEXT BLOCK ── */}
      <section ref={gR} className="showcase">
        <div className="showcase-inner" style={{ ...a(0), opacity: gV ? 1 : 0, transform: gV ? "translateY(0)" : "translateY(30px)" }}>
          <div className="showcase-img-wrap">
            <img src={IMG.store2} alt="Retail analytics" className="showcase-img"/>
            <div className="showcase-overlay">
              <div className="showcase-stat">
                <span className="showcase-big">1,247</span>
                <span className="showcase-sub-stat">visitantes hoy</span>
              </div>
            </div>
          </div>
          <div className="showcase-content">
            <span className="sec-tag">El problema</span>
            <h2 className="sec-title">Tus cámaras graban 24/7.<br/><span className="accent">Nadie mira esas grabaciones.</span></h2>
            <p className="sec-sub">Tienes horas y horas de video almacenado que nunca se revisa. Mientras tanto, tus gerentes toman decisiones basándose en corazonadas. VORW cambia eso: extrae datos de valor de cada frame, automáticamente.</p>
            <div className="showcase-checks">
              {["Sin revisar horas de video manualmente","Sin instalar cámaras nuevas","Sin cambiar tu infraestructura"].map(x => <div key={x} className="sc-check"><Chk c="#4338CA"/><span>{x}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section ref={fR} id="características" className="section">
        <div className="sec-head" style={{ ...a(0), opacity: fV ? 1 : 0, transform: fV ? "translateY(0)" : "translateY(24px)" }}>
          <span className="sec-tag">Características</span>
          <h2 className="sec-title">De cámaras pasivas a<br/><span className="accent">inteligencia activa</span></h2>
          <p className="sec-sub">Tu infraestructura ya existe. VORW la convierte en tu activo más valioso.</p>
        </div>
        <div className="feat-grid">
          <div className="feat-list">
            {feats.map((f, i) => (
              <button key={i} onClick={() => setAf(i)} className={`feat-btn ${af === i ? "active" : ""}`}>
                <div className={`feat-icon ${af === i ? "active" : ""}`}>{f.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <h3 className="feat-t">{f.t}</h3>
                    <span className="feat-tag">{f.tag}</span>
                  </div>
                  {af === i && <p className="feat-d">{f.d}</p>}
                </div>
              </button>
            ))}
          </div>
          <div className="feat-vis">
            {af === 0 && <VHeat/>}
            {af === 1 && <VChart/>}
            {af === 2 && <VPeople/>}
            {af === 3 && <VAlerts/>}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={wR} id="solución" className="section bg-soft">
        <div className="sec-head" style={{ ...a(0), opacity: wV ? 1 : 0, transform: wV ? "translateY(0)" : "translateY(24px)" }}>
          <span className="sec-tag">Cómo funciona</span>
          <h2 className="sec-title">Operativo en <span className="accent">24 horas</span></h2>
          <p className="sec-sub">Sin hardware. Sin complicaciones. Solo resultados.</p>
        </div>
        <div className="steps-grid">
          {[
            { n: "01", t: "Conecta tus cámaras", d: "Integración directa con Hikvision, Dahua, Axis y más. Tu CCTV existente es todo lo que necesitamos.", img: IMG.camera },
            { n: "02", t: "IA analiza en tiempo real", d: "Nuestro motor de visión artificial procesa cada feed. No almacenamos video — solo metadatos.", img: IMG.analytics },
            { n: "03", t: "Reportes automáticos", d: "Dashboards interactivos y alertas llegan a tu equipo cada mañana. Métricas claras, accionables.", img: IMG.team },
            { n: "04", t: "Decisiones con datos", d: "Optimiza staff, redistribuye layout, mide ROI. Cada decisión respaldada por evidencia real.", img: IMG.retail },
          ].map((s, i) => (
            <div key={i} className="step-card" style={{ ...a(i * 0.1), opacity: wV ? 1 : 0, transform: wV ? "translateY(0)" : "translateY(30px)" }}>
              <div className="step-img-wrap">
                <img src={s.img} alt={s.t} className="step-img"/>
                <span className="step-num">{s.n}</span>
              </div>
              <h3 className="step-t">{s.t}</h3>
              <p className="step-d">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRIVACY ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="privacy-card">
          <div className="priv-icon"><Shield/></div>
          <div>
            <h3 className="priv-title">Privacidad por diseño</h3>
            <p className="priv-desc">VORW <strong>no almacena video ni imágenes</strong>. Solo procesamos metadatos anónimos: conteos, trayectorias y zonas de interés. 100% compatible con GDPR y normativas locales.</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={tR} className="section bg-soft">
        <div className="sec-head" style={{ ...a(0), opacity: tV ? 1 : 0, transform: tV ? "translateY(0)" : "translateY(24px)" }}>
          <span className="sec-tag">Testimonios</span>
          <h2 className="sec-title">Lo que dicen nuestros clientes</h2>
        </div>
        <div className="testi-grid">
          {[
            { name: "María Rodríguez", role: "Gerente de Ops · RetailMax", q: "Redujimos los tiempos de espera en caja un 35%. Los reportes llegan cada mañana y mi equipo actúa de inmediato." },
            { name: "Carlos Mendoza", role: "Dir. Comercial · Plaza Central", q: "Antes decidíamos por intuición. Ahora sabemos exactamente qué zonas generan más tráfico y cómo optimizar el layout." },
            { name: "Ana López", role: "VP Retail · Grupo Éxito", q: "La implementación fue increíblemente rápida. En 24 horas teníamos datos accionables de nuestras 12 sucursales." },
          ].map((t, i) => (
            <div key={i} className="testi-card" style={{ ...a(i * 0.12), opacity: tV ? 1 : 0, transform: tV ? "translateY(0)" : "translateY(24px)" }}>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-q">"{t.q}"</p>
              <div className="testi-author">
                <div className="testi-av" style={{ background: ["#0D1B54","#4338CA","#6366f1"][i] }}>{t.name[0]}{t.name.split(" ")[1]?.[0]}</div>
                <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section ref={pR} id="precios" className="section">
        <div className="sec-head" style={{ ...a(0), opacity: pV ? 1 : 0, transform: pV ? "translateY(0)" : "translateY(24px)" }}>
          <span className="sec-tag">Precios</span>
          <h2 className="sec-title">Planes que escalan contigo</h2>
          <p className="sec-sub">Sin contratos largos. Sin sorpresas. Cancela cuando quieras.</p>
        </div>
        <div className="price-grid">
          {plans.map((p, i) => (
            <div key={i} className={`price-card ${p.pop ? "pop" : ""}`} style={{ ...a(i * 0.1), opacity: pV ? 1 : 0, transform: pV ? "translateY(0)" : "translateY(24px)" }}>
              {p.pop && <div className="pop-badge">Más popular</div>}
              <h3 className="price-name">{p.n}</h3>
              <p className="price-desc">{p.d}</p>
              <div className="price-row">
                {p.p !== "Custom" && <span className="price-cur">$</span>}
                <span className="price-num">{p.p}</span>
                {p.p !== "Custom" && <span className="price-per">/mes</span>}
              </div>
              <ul className="price-list">
                {p.items.map(f => <li key={f} className="price-item"><Chk c={p.pop ? "#4338CA" : "#9ca3af"}/>{f}</li>)}
              </ul>
              <a href="#demo" className={p.pop ? "btn-price-pop" : "btn-price"}>{p.cta}</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="cta-section">
        <div className="cta-bg">
          <img src={IMG.store1} alt="" className="cta-bg-img"/>
          <div className="cta-overlay"/>
        </div>
        <div className="cta-content">
          <h2 className="cta-h2">¿Listo para ver lo que tus cámaras pueden hacer?</h2>
          <p className="cta-sub">15 minutos de demo. Sin compromiso. Sin tarjeta de crédito.</p>
          <div className="cta-btns">
            <a href="#demo" className="btn-cta-w">Agendar demo gratuita <Arr/></a>
            <a href="#" className="btn-cta-o">Hablar con ventas</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="foot-inner">
          <div className="foot-top">
            <div className="foot-brand">
              <a href="#" className="logo"><div className="logo-mark"><Eye/></div><span className="logo-type">VORW</span></a>
              <p className="foot-tagline">Inteligencia visual que transforma la operación de tu negocio.</p>
            </div>
            <div className="foot-cols">
              {[
                { t: "Producto", l: ["Características","Precios","Integraciones","API","Changelog"] },
                { t: "Empresa", l: ["Nosotros","Blog","Carreras","Contacto"] },
                { t: "Legal", l: ["Privacidad","Términos","Seguridad","GDPR"] },
              ].map(c => (
                <div key={c.t} className="foot-col">
                  <h4 className="foot-col-t">{c.t}</h4>
                  {c.l.map(x => <a key={x} href="#" className="foot-link">{x}</a>)}
                </div>
              ))}
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 VORW. Todos los derechos reservados.</span>
            <span style={{ color: "#d1d5db" }}>Hecho con visión en LATAM 🌎</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ══════ FEATURE VISUALS ══════ */
function VHeat() {
  return <div className="vis-p"><div className="vis-head"><span className="vis-t">Mapa de calor · Planta baja</span><span className="vis-live">● En vivo</span></div>
    <div className="heat-grid">{Array.from({length:48}).map((_,i)=>{const n=Math.random();return <div key={i} className="heat-cell" style={{background:n>.8?"rgba(220,38,38,.65)":n>.6?"rgba(249,115,22,.55)":n>.4?"rgba(234,179,8,.45)":n>.2?"rgba(34,197,94,.3)":"rgba(13,27,84,.06)"}}/>})}</div>
    <div className="heat-legend"><span>Baja</span><div className="heat-bar"/><span>Alta</span></div></div>;
}
function VChart() {
  return <div className="vis-p"><div className="vis-head"><span className="vis-t">Conversión semanal</span><span className="vis-accent">+12.4%</span></div>
    <div className="chart-bars">{[65,45,78,52,90,68,85].map((v,i)=><div key={i} className="chart-col"><div className="chart-track"><div className="chart-fill" style={{height:`${v}%`}}/></div><span className="chart-day">{["L","M","X","J","V","S","D"][i]}</span></div>)}</div></div>;
}
function VPeople() {
  return <div className="vis-p"><div className="vis-head"><span className="vis-t">Conteo en tiempo real</span><span className="vis-live">● En vivo</span></div>
    <div className="ppl-grid">{[{z:"Entrada principal",c:23,t:"↑"},{z:"Área de cajas",c:8,t:"↓"},{z:"Pasillo central",c:45,t:"↑"},{z:"Zona gourmet",c:12,t:"→"}].map(z=><div key={z.z} className="ppl-card"><div className="ppl-zone">{z.z}</div><span className="ppl-num">{z.c}</span><span className="ppl-trend">{z.t}</span></div>)}</div></div>;
}
function VAlerts() {
  return <div className="vis-p"><div className="vis-head"><span className="vis-t">Alertas recientes</span><span className="alert-badge">3 nuevas</span></div>
    <div className="alert-list">{[{t:"Hace 2 min",m:"Afluencia pico en Zona A",tp:"warning"},{t:"Hace 15 min",m:"Cola en cajas supera 8 personas",tp:"alert"},{t:"Hace 1 hr",m:"Zona promo sin visitantes 30 min",tp:"info"}].map((x,i)=><div key={i} className="alert-row"><div className="alert-dot" style={{background:x.tp==="alert"?"#ef4444":x.tp==="warning"?"#f59e0b":"#3b82f6"}}/><div><div className="alert-msg">{x.m}</div><div className="alert-time">{x.t}</div></div></div>)}</div></div>;
}

/* ══════ MEGA CSS ══════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap');
@font-face{font-family:'Satoshi';src:url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap')}
:root{--navy:#0D1B54;--indigo:#4338CA;--indigo-light:#EEF2FF;--indigo-border:#E0E7FF;--text:#111827;--text2:#6b7280;--text3:#9ca3af;--bg:#ffffff;--bg2:#f8f9fb;--border:#e5e7eb;--mono:'JetBrains Mono',monospace;--sans:'Outfit',-apple-system,sans-serif;--radius:14px}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;overflow-x:hidden}
body{font-family:var(--sans);background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden}
::selection{background:var(--indigo);color:#fff}
a{text-decoration:none;color:inherit}
.app{min-height:100vh;overflow-x:hidden}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 24px;transition:all .35s}
.nav-scroll{background:rgba(255,255,255,.96);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);box-shadow:0 1px 12px rgba(0,0,0,.03)}
.nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{display:flex;align-items:center;gap:10px}
.logo-mark{color:var(--navy)}
.logo-type{font-family:var(--mono);font-weight:800;font-size:18px;letter-spacing:.12em;color:var(--navy)}
.nav-links{display:flex;gap:36px}
.nav-link{font-size:14px;color:var(--text2);font-weight:500;transition:color .2s}
.nav-link:hover{color:var(--navy)}
.nav-right{display:flex;align-items:center;gap:16px}
.btn-sm{padding:10px 22px;background:var(--navy);color:#fff;border-radius:9px;font-size:14px;font-weight:600;transition:all .2s}
.btn-sm:hover{background:#1e2a5e}
.menu-btn{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;gap:5px;padding:8px}
.ml{width:22px;height:2px;background:var(--navy);border-radius:2px;transition:all .3s}
.ml.open:first-child{transform:rotate(45deg) translate(4px,4px)}
.ml.open:nth-child(2){opacity:0}
.ml.open:last-child{transform:rotate(-45deg) translate(4px,-4px)}
.mob-nav{display:flex;flex-direction:column;gap:12px;padding:16px 0 24px;border-top:1px solid var(--border);background:#fff}
.mob-link{font-size:17px;color:var(--text);padding:8px 0;font-weight:500}
.sh-m{display:none}

/* HERO */
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:48px;max-width:1280px;margin:0 auto;padding:110px 32px 80px}
.hero-left{max-width:580px}
.hero-badge{display:inline-flex;align-items:center;gap:9px;padding:7px 18px;background:var(--indigo-light);border:1px solid var(--indigo-border);border-radius:100px;font-size:13px;font-weight:600;color:var(--indigo);margin-bottom:28px}
.badge-pulse{width:7px;height:7px;border-radius:50%;background:var(--indigo);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(67,56,202,.4)}50%{opacity:.5;box-shadow:0 0 0 8px rgba(67,56,202,0)}}
.hero-h1{font-size:clamp(40px,5.5vw,68px);font-weight:900;line-height:1.05;letter-spacing:-.04em;color:var(--navy);margin-bottom:24px}
.hero-accent{color:var(--indigo)}
.hero-sub{font-size:clamp(16px,1.5vw,19px);line-height:1.7;color:var(--text2);max-width:460px;margin-bottom:36px}
.hero-ctas{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px}
.btn-primary{display:inline-flex;align-items:center;gap:10px;padding:15px 32px;background:var(--navy);color:#fff;border-radius:12px;font-size:16px;font-weight:700;transition:all .25s;box-shadow:0 4px 20px rgba(13,27,84,.18)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(13,27,84,.22);background:#1a2b6b}
.btn-ghost{display:inline-flex;align-items:center;gap:12px;padding:15px 28px;background:var(--bg2);color:var(--text);border-radius:12px;font-size:16px;font-weight:600;border:1px solid var(--border);transition:all .25s}
.btn-ghost:hover{background:#f0f1f3;border-color:#d1d5db}
.play-wrap{width:36px;height:36px;border-radius:50%;background:var(--indigo-light);display:flex;align-items:center;justify-content:center;color:var(--indigo)}
.hero-proof{display:flex;align-items:center;gap:14px}
.proof-avatars{display:flex}
.proof-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;border:2.5px solid #fff;margin-left:-10px}
.proof-av:first-child{margin-left:0}
.proof-stars{font-size:14px;color:#f59e0b;letter-spacing:2px}
.proof-txt{font-size:13px;color:var(--text3);margin-top:1px;display:block}

/* HERO RIGHT - IMAGE */
.hero-right{position:relative}
.hero-img-wrap{position:relative;border-radius:20px;overflow:hidden;box-shadow:0 32px 80px rgba(0,0,0,.12),0 2px 16px rgba(0,0,0,.06);aspect-ratio:4/3}
.hero-img{width:100%;height:100%;object-fit:cover;display:block}
.scan-overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,rgba(13,27,84,.03) 50%,transparent 100%);pointer-events:none}
.scan-overlay::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(67,56,202,.4),transparent);animation:scanLine 3s linear infinite}
@keyframes scanLine{0%{top:0}100%{top:100%}}

/* FLOATING CARDS */
.float-card{position:absolute;background:rgba(255,255,255,.95);backdrop-filter:blur(16px);border-radius:14px;padding:14px 18px;box-shadow:0 8px 32px rgba(0,0,0,.12);border:1px solid rgba(255,255,255,.8);z-index:5}
.fc-1{top:16px;right:-24px}
.fc-2{bottom:60px;left:-28px}
.fc-3{bottom:-12px;right:32px}
.fc-label{font-size:11px;color:var(--text3);display:block;margin-bottom:4px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
.fc-value{font-size:28px;font-weight:800;color:var(--navy);font-family:var(--mono)}
.fc-value.sm{font-size:22px}
.fc-badge{font-size:12px;font-weight:700;margin-left:6px}
.fc-badge.up{color:#22c55e}
.fc-heat{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;margin-top:6px}
.fc-heat-cell{width:16px;height:16px;border-radius:3px}

/* TRUST BAR */
.trust-bar{padding:40px 24px;border-bottom:1px solid var(--border);text-align:center}
.trust-label{font-size:12px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:24px}
.trust-logos{display:flex;justify-content:center;gap:48px;flex-wrap:wrap;align-items:center}
.trust-logo{font-size:17px;font-weight:800;color:#d1d5db;letter-spacing:.02em}

/* STATS */
.stats{padding:64px 24px;border-bottom:1px solid var(--border)}
.stats-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:32px;text-align:center}
.stat-num{font-size:48px;font-weight:900;color:var(--navy);font-family:var(--mono);letter-spacing:-.03em}
.stat-lbl{font-size:15px;font-weight:600;color:var(--text2);margin-top:4px}

/* SHOWCASE */
.showcase{padding:100px 24px}
.showcase-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}
.showcase-img-wrap{position:relative;border-radius:20px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.1)}
.showcase-img{width:100%;display:block;aspect-ratio:4/3;object-fit:cover}
.showcase-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,27,84,.7),rgba(67,56,202,.5));display:flex;align-items:center;justify-content:center}
.showcase-stat{text-align:center}
.showcase-big{font-size:72px;font-weight:900;color:#fff;font-family:var(--mono);display:block;letter-spacing:-.04em}
.showcase-sub-stat{font-size:16px;color:rgba(255,255,255,.7);font-weight:500}
.showcase-content{max-width:460px}
.showcase-checks{display:flex;flex-direction:column;gap:12px;margin-top:24px}
.sc-check{display:flex;align-items:center;gap:10px;font-size:15px;color:var(--text);font-weight:500}

/* SECTIONS */
.section{padding:100px 24px}
.bg-soft{background:var(--bg2)}
.sec-head{text-align:center;max-width:560px;margin:0 auto 60px}
.sec-tag{display:inline-block;padding:5px 16px;background:var(--indigo-light);border-radius:100px;font-size:12px;font-weight:700;color:var(--indigo);letter-spacing:.08em;text-transform:uppercase}
.sec-title{font-size:clamp(30px,3.5vw,44px);font-weight:900;line-height:1.12;letter-spacing:-.03em;color:var(--navy);margin:14px 0 16px}
.accent{color:var(--indigo)}
.sec-sub{font-size:17px;line-height:1.7;color:var(--text2)}

/* FEATURES */
.feat-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:start}
.feat-list{display:flex;flex-direction:column;gap:4px}
.feat-btn{display:flex;align-items:flex-start;gap:14px;padding:16px 20px;border-radius:var(--radius);border:1px solid transparent;background:transparent;cursor:pointer;text-align:left;width:100%;font-family:var(--sans);color:var(--text);transition:all .2s}
.feat-btn.active{background:var(--bg2);border-color:var(--border)}
.feat-btn:hover{background:var(--bg2)}
.feat-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#f3f4f6;color:var(--text3);transition:all .2s}
.feat-icon.active{background:var(--indigo-light);color:var(--indigo)}
.feat-t{font-size:15px;font-weight:700;color:var(--text2);margin:0;transition:color .2s}
.feat-btn.active .feat-t{color:var(--navy)}
.feat-tag{font-size:10px;font-weight:700;color:var(--text3);background:#f3f4f6;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.06em}
.feat-d{font-size:14px;line-height:1.65;color:var(--text3);margin-top:8px;animation:fadeUp .35s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.feat-vis{background:var(--bg2);border-radius:18px;border:1px solid var(--border);overflow:hidden;min-height:380px}

/* VIS INTERNALS */
.vis-p{padding:24px}
.vis-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.vis-t{font-size:15px;font-weight:700;color:var(--navy)}
.vis-live{font-size:12px;color:#22c55e;font-family:var(--mono);animation:pulse 2s infinite}
.vis-accent{font-size:14px;color:var(--indigo);font-weight:700}
.heat-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:5px}
.heat-cell{aspect-ratio:1;border-radius:5px}
.heat-legend{display:flex;align-items:center;gap:8px;margin-top:16px;justify-content:center;font-size:11px;color:var(--text3)}
.heat-bar{width:140px;height:8px;border-radius:4px;background:linear-gradient(to right,rgba(13,27,84,.08),#22c55e,#eab308,#f97316,#dc2626)}
.chart-bars{display:flex;gap:10px;align-items:flex-end;height:230px}
.chart-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;height:100%}
.chart-track{flex:1;width:100%;background:#f3f4f6;border-radius:6px;display:flex;align-items:flex-end;overflow:hidden}
.chart-fill{width:100%;background:linear-gradient(to top,var(--navy),#818cf8);border-radius:6px;transition:height .8s ease}
.chart-day{font-size:13px;color:var(--text3);font-weight:600}
.ppl-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ppl-card{background:#fff;border-radius:12px;padding:16px;border:1px solid var(--border);transition:all .2s}
.ppl-card:hover{border-color:var(--indigo-border);box-shadow:0 2px 12px rgba(67,56,202,.06)}
.ppl-zone{font-size:13px;color:var(--text2);margin-bottom:8px}
.ppl-num{font-size:30px;font-weight:800;font-family:var(--mono);color:var(--navy)}
.ppl-trend{font-size:18px;color:var(--indigo);margin-left:6px}
.alert-badge{font-size:12px;padding:4px 12px;border-radius:100px;background:#FEF2F2;color:#ef4444;font-weight:600}
.alert-list{display:flex;flex-direction:column;gap:10px}
.alert-row{display:flex;gap:12px;align-items:flex-start;padding:14px;background:#fff;border-radius:12px;border:1px solid var(--border);transition:all .2s}
.alert-row:hover{border-color:#fca5a5}
.alert-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:6px}
.alert-msg{font-size:14px;color:var(--navy);line-height:1.5;font-weight:500}
.alert-time{font-size:12px;color:var(--text3);margin-top:2px}

/* STEPS */
.steps-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.step-card{background:#fff;border-radius:18px;border:1px solid var(--border);overflow:hidden;transition:all .3s}
.step-card:hover{border-color:var(--indigo-border);box-shadow:0 8px 28px rgba(67,56,202,.06);transform:translateY(-4px)!important}
.step-img-wrap{position:relative;height:160px;overflow:hidden}
.step-img{width:100%;height:100%;object-fit:cover}
.step-num{position:absolute;top:12px;left:12px;font-size:13px;font-weight:800;color:#fff;font-family:var(--mono);background:rgba(13,27,84,.7);backdrop-filter:blur(8px);padding:4px 10px;border-radius:6px;letter-spacing:.08em}
.step-t{font-size:17px;font-weight:700;color:var(--navy);padding:20px 22px 8px}
.step-d{font-size:14px;line-height:1.65;color:var(--text3);padding:0 22px 22px}

/* PRIVACY */
.privacy-card{max-width:800px;margin:0 auto;display:flex;align-items:flex-start;gap:22px;padding:36px;background:var(--bg2);border-radius:18px;border:1px solid var(--border);transition:all .3s}
.privacy-card:hover{border-color:#a7f3d0;box-shadow:0 4px 20px rgba(5,150,105,.05)}
.priv-icon{width:50px;height:50px;border-radius:14px;background:#ECFDF5;display:flex;align-items:center;justify-content:center;color:#059669;flex-shrink:0}
.priv-title{font-size:20px;font-weight:700;color:var(--navy);margin-bottom:8px}
.priv-desc{font-size:15px;line-height:1.7;color:var(--text2);margin:0}

/* TESTIMONIALS */
.testi-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.testi-card{padding:28px;background:#fff;border-radius:16px;border:1px solid var(--border);transition:all .3s}
.testi-card:hover{border-color:var(--indigo-border);box-shadow:0 4px 20px rgba(67,56,202,.06);transform:translateY(-3px)}
.testi-stars{font-size:16px;color:#f59e0b;letter-spacing:3px;margin-bottom:14px}
.testi-q{font-size:15px;line-height:1.7;color:var(--text);margin:0 0 20px;font-style:italic}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}
.testi-name{font-size:14px;font-weight:700;color:var(--navy)}
.testi-role{font-size:13px;color:var(--text3)}

/* PRICING */
.price-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
.price-card{position:relative;padding:36px 28px;background:#fff;border-radius:18px;border:1px solid var(--border);transition:all .3s}
.price-card:hover{box-shadow:0 8px 30px rgba(0,0,0,.06);transform:translateY(-3px)}
.price-card.pop{border:2px solid var(--navy);box-shadow:0 8px 40px rgba(13,27,84,.1)}
.pop-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:5px 18px;background:var(--navy);color:#fff;border-radius:100px;font-size:12px;font-weight:700}
.price-name{font-size:20px;font-weight:700;color:var(--navy)}
.price-desc{font-size:14px;color:var(--text3);margin:4px 0 20px}
.price-row{display:flex;align-items:baseline;gap:3px;margin-bottom:24px}
.price-cur{font-size:20px;color:var(--text2);font-weight:500}
.price-num{font-size:48px;font-weight:900;color:var(--navy);font-family:var(--mono);letter-spacing:-.03em}
.price-per{font-size:14px;color:var(--text3);margin-left:4px}
.price-list{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px}
.price-item{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--text2)}
.btn-price{display:block;text-align:center;padding:13px 24px;border-radius:11px;font-size:14px;font-weight:700;background:#fff;color:var(--navy);border:1px solid var(--border);cursor:pointer;transition:all .2s}
.btn-price:hover{background:var(--bg2);border-color:var(--indigo-border)}
.btn-price-pop{display:block;text-align:center;padding:13px 24px;border-radius:11px;font-size:14px;font-weight:700;background:var(--navy);color:#fff;border:none;cursor:pointer;transition:all .2s}
.btn-price-pop:hover{background:#1e2a5e}

/* CTA */
.cta-section{position:relative;padding:120px 24px;overflow:hidden}
.cta-bg{position:absolute;inset:0}
.cta-bg-img{width:100%;height:100%;object-fit:cover}
.cta-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,27,84,.93),rgba(67,56,202,.85))}
.cta-content{position:relative;z-index:2;max-width:640px;margin:0 auto;text-align:center}
.cta-h2{font-size:clamp(28px,3.5vw,40px);font-weight:900;line-height:1.12;color:#fff;margin-bottom:16px;letter-spacing:-.025em}
.cta-sub{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px}
.cta-btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
.btn-cta-w{display:inline-flex;align-items:center;gap:10px;padding:15px 32px;background:#fff;color:var(--navy);border-radius:12px;font-size:16px;font-weight:700;transition:all .25s;box-shadow:0 4px 24px rgba(0,0,0,.15)}
.btn-cta-w:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(0,0,0,.2)}
.btn-cta-o{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;background:transparent;color:rgba(255,255,255,.8);border-radius:12px;font-size:16px;font-weight:500;border:1px solid rgba(255,255,255,.2);transition:all .25s}
.btn-cta-o:hover{background:rgba(255,255,255,.08)}

/* FOOTER */
.footer{border-top:1px solid var(--border);padding:60px 24px 28px}
.foot-inner{max-width:1100px;margin:0 auto}
.foot-top{display:flex;justify-content:space-between;gap:48px;margin-bottom:48px;flex-wrap:wrap}
.foot-brand{max-width:260px}
.foot-tagline{font-size:14px;line-height:1.7;color:var(--text3);margin-top:14px}
.foot-cols{display:flex;gap:56px;flex-wrap:wrap}
.foot-col{display:flex;flex-direction:column;gap:10px}
.foot-col-t{font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px;letter-spacing:.06em;text-transform:uppercase}
.foot-link{font-size:14px;color:var(--text3);transition:color .2s}
.foot-link:hover{color:var(--indigo)}
.foot-bottom{padding-top:24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--text3)}

/* RESPONSIVE */
@media(max-width:1024px){
  .hero{grid-template-columns:1fr;text-align:center;padding:120px 24px 60px}
  .hero-left{max-width:100%;margin:0 auto}
  .hero-sub{margin:0 auto 36px}
  .hero-ctas{justify-content:center}
  .hero-proof{justify-content:center}
  .hero-right{max-width:560px;margin:0 auto}
  .showcase-inner{grid-template-columns:1fr}
  .showcase-content{max-width:100%}
}
@media(max-width:900px){
  .hd-m{display:none!important}
  .sh-m{display:flex!important}
  .stats-grid{grid-template-columns:repeat(2,1fr)!important}
  .feat-grid{grid-template-columns:1fr!important}
  .steps-grid{grid-template-columns:1fr 1fr!important}
  .price-grid{grid-template-columns:1fr!important;max-width:420px!important}
  .testi-grid{grid-template-columns:1fr!important;max-width:500px!important}
  .foot-top{flex-direction:column}
  .fc-1{top:8px;right:-8px}
  .fc-2{bottom:40px;left:-8px}
}
@media(max-width:600px){
  .steps-grid{grid-template-columns:1fr!important}
  .trust-logos{gap:24px}
}
`;