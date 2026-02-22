import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

/* ICONS */
const I=({d,s=24,w=1.5})=><svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>;
const Eye=()=><I d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>;
const Bar=()=><I d="M18 20V10M12 20V4M6 20v-6"/>;
const Shield=()=><I d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>;
const Users=()=><I d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"/>;
const Clock=()=><I d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 6v6l4 2"/>;
const Arr=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const Chk=({c="currentColor"})=><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const Play=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21"/></svg>;

/* IMAGES */
const IMG={
  hero:"/src/assets/img/cafeteria.jpeg",
  lima:"/src/assets/img/lima.jpeg",
  iquitos:"/src/assets/img/iquitos.jpeg",
  restaurante:"/src/assets/img/restaurante.jpeg",
  urbano:"/src/assets/img/restauranteurbano.jpeg",
};

/* HOOKS */
function useVis(th=0.12){const r=useRef(null);const[v,s]=useState(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>e.isIntersecting&&s(true),{threshold:th});r.current&&o.observe(r.current);return()=>o.disconnect()},[th]);return[r,v]}
function useCnt(end,dur=2200){const[n,sn]=useState(0);const r=useRef(null);const d=useRef(false);useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!d.current){d.current=true;const t0=performance.now();const go=now=>{const p=Math.min((now-t0)/dur,1);sn(Math.floor(end*(1-Math.pow(1-p,4))));p<1&&requestAnimationFrame(go)};requestAnimationFrame(go)}},{threshold:0.4});r.current&&o.observe(r.current);return()=>o.disconnect()},[end,dur]);return[n,r]}

export default function App(){
  const[menu,setMenu]=useState(false);
  const[scr,setScr]=useState(false);
  const[af,setAf]=useState(0);
  const[loaded,setLoaded]=useState(false);
  const[showDemo,setShowDemo]=useState(false);
  const[hR,hV]=useVis(0.05);
  const[fR,fV]=useVis();
  const[wR,wV]=useVis();
  const[pR,pV]=useVis();
  const[tR,tV]=useVis();
  const[gR,gV]=useVis();
  const[c1,c1r]=useCnt(98);
  const[c2,c2r]=useCnt(340);
  const[c3,c3r]=useCnt(47);
  const[c4,c4r]=useCnt(24);

  useEffect(()=>{
    const fn=()=>setScr(window.scrollY>50);
    window.addEventListener("scroll",fn,{passive:true});
    setTimeout(()=>setLoaded(true),200);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const feats=[
    {icon:<Eye/>,t:"Visión Inteligente",d:"Conectamos con tus cámaras CCTV existentes y analizamos en tiempo real: flujos de clientes, zonas calientes y patrones de comportamiento. Sin instalar hardware nuevo.",tag:"Core"},
    {icon:<Bar/>,t:"Reportes Ejecutivos",d:"Cada mañana, tus gerentes reciben un dashboard con las métricas que importan: afluencia, conversión, permanencia y tendencias. Todo automatizado.",tag:"Analytics"},
    {icon:<Users/>,t:"Conteo Preciso",d:"98% de precisión. Por hora, por zona, por día. Detecta picos, optimiza personal y mide el impacto real de cada promoción.",tag:"Tracking"},
    {icon:<Clock/>,t:"Alertas Inteligentes",d:"Colas largas, zonas vacías, afluencia inusual — recibe alertas instantáneas y actúa antes de que se convierta en problema.",tag:"Real-time"},
  ];

  const plans=[
    {n:"Starter",p:"99",d:"Ideal para un local",items:["Hasta 4 cámaras","Reportes semanales","Conteo de personas","Dashboard básico","Soporte email"],cta:"Comenzar gratis",pop:false},
    {n:"Business",p:"249",d:"Para cadenas en crecimiento",items:["Hasta 16 cámaras","Reportes en tiempo real","Mapas de calor","API integración","Alertas custom","Soporte prioritario"],cta:"14 días gratis",pop:true},
    {n:"Enterprise",p:"Custom",d:"Operaciones a escala",items:["Cámaras ilimitadas","Multi-sucursal","Análisis predictivo","Integración ERP/POS","SLA dedicado","Account manager"],cta:"Contactar ventas",pop:false},
  ];

  const a=(del=0)=>({transition:"all 0.85s cubic-bezier(0.22,1,0.36,1)",transitionDelay:`${del}s`});

  return(
    <div className="vorw-app">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav ${scr?"nav-s":""}`}>
        <div className="nav-in">
          <a href="#" className="logo"><img className="logo-img" src="/src/assets/img/logovorw.png" alt="VORW"/><span className="logo-t">VORW</span></a>
          <div className="nav-lk hd-m">{["Solución","Características","Precios","Contacto"].map(x=><a key={x} href={`#${x.toLowerCase()}`} className="nl">{x}</a>)}</div>
          <div className="nav-r hd-m">
            <a href="#" className="nl">Iniciar sesión</a>
            <a href="#" onClick={(e)=>{e.preventDefault();setShowDemo(true)}} className="btn-sm">Solicitar demo</a>
          </div>
          <button className="m-btn sh-m" onClick={()=>setMenu(!menu)}><span className={`ml ${menu?"o":""}`}/><span className={`ml ${menu?"o":""}`}/><span className={`ml ${menu?"o":""}`}/></button>
        </div>
        {menu&&<div className="mob-nav">{["Solución","Características","Precios","Contacto"].map(x=><a key={x} href={`#${x.toLowerCase()}`} className="mob-lk" onClick={()=>setMenu(false)}>{x}</a>)}<a href="#demo" className="btn-sm" style={{textAlign:"center"}}>Solicitar Runión</a></div>}
      </nav>

      {/* HERO */}
      <section ref={hR} className="hero">
        <div className="hero-bg"><img src={IMG.hero} alt="VORW en acción" className="hero-bg-img"/><div className="hero-ov"/></div>
        <div className="hero-ct" style={{...a(0.15),opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(40px)"}}>
          <div className="h-badge"><span className="h-pulse"/>Inteligencia visual para restaurantes y retail</div>
          <h1 className="h-title">Tus cámaras ya ven.<br/><span className="h-accent">Nosotros las hacemos pensar.</span></h1>
          <p className="h-sub">VORW convierte tus cámaras de seguridad en analistas de datos. Conteo de personas, mapas de calor, ocupación en tiempo real — directo a tus gerentes, cada día.</p>
          <div className="h-ctas">
            <a href="#" onClick={(e)=>{e.preventDefault();setShowDemo(true)}} className="btn-w">Agenda tu reunión gratuita <Arr/></a>
            <a href="#video" className="btn-o"><div className="play-c"><Play/></div>Ver en 90 segundos</a>
          </div>
          <div className="h-proof" style={{...a(0.6),opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)"}}>
            <div className="h-avs">{["MR","KL","AS","JP","DV"].map((x,i)=><div key={i} className="h-av" style={{background:["#0D1B54","#4338CA","#6366f1","#818cf8","#1e1b4b"][i],zIndex:6-i}}>{x}</div>)}</div>
            <div><span className="h-stars">★★★★★</span><span className="h-ptxt">+200 locales en Latinoamérica</span></div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust"><span className="trust-l">Empresas que confían en nosotros</span><div className="trust-logos">{["RetailMax","Plaza Central","Grupo Éxito","MegaStore","Cevichería Limeño","FashionHub"].map(x=><span key={x} className="trust-n">{x}</span>)}</div></section>

      {/* STATS */}
      <section className="stats"><div className="stats-g">{[[c1,c1r,"%","Precisión en conteo"],[c2,c2r,"+","Locales activos"],[c3,c3r,"%","Mejora en decisiones"],[c4,c4r,"/7","Monitoreo continuo"]].map(([v,r,sfx,lbl],i)=>(<div key={i} ref={r} className="stat"><div className="stat-n">{v}{sfx}</div><div className="stat-l">{lbl}</div></div>))}</div></section>

      {/* SHOWCASE */}
      <section ref={gR} className="showcase">
        <div className="sc-in" style={{...a(0),opacity:gV?1:0,transform:gV?"translateY(0)":"translateY(30px)"}}>
          <div className="sc-imgs">
            <div className="sc-main"><img src={IMG.lima} alt="VORW Lima" className="sc-img"/><div className="sc-live">● ANÁLISIS EN VIVO</div></div>
            <div className="sc-small"><img src={IMG.iquitos} alt="VORW Iquitos" className="sc-img"/><div className="sc-label">Iquitos · Ocupación: 88%</div></div>
          </div>
          <div className="sc-ct">
            <span className="sec-tag">Así funciona</span>
            <h2 className="sec-title">Detección automática en<br/><span className="accent">cada frame.</span></h2>
            <p className="sec-sub">Nuestro motor de IA identifica personas, objetos y zonas de interés en tiempo real. Sin almacenar video — solo datos anónimos que se convierten en reportes accionables.</p>
            <div className="sc-checks">{["Conteo de personas con 98% de precisión","Detección de zonas calientes y frías","Ocupación en tiempo real por local","Compatible con Hikvision, Dahua, Axis y más"].map(x=><div key={x} className="sc-chk"><Chk c="#4338CA"/><span>{x}</span></div>)}</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section ref={fR} id="características" className="section">
        <div className="sec-head" style={{...a(0),opacity:fV?1:0,transform:fV?"translateY(0)":"translateY(24px)"}}><span className="sec-tag">Características</span><h2 className="sec-title">De cámaras pasivas a<br/><span className="accent">inteligencia activa</span></h2><p className="sec-sub">Tu infraestructura ya existe. VORW la convierte en tu activo más valioso.</p></div>
        <div className="feat-grid">
          <div className="feat-list">{feats.map((f,i)=>(<button key={i} onClick={()=>setAf(i)} className={`feat-btn ${af===i?"active":""}`}><div className={`feat-icon ${af===i?"active":""}`}>{f.icon}</div><div style={{flex:1}}><div style={{display:"flex",alignItems:"center",gap:8}}><h3 className="feat-t">{f.t}</h3><span className="feat-tag">{f.tag}</span></div>{af===i&&<p className="feat-d">{f.d}</p>}</div></button>))}</div>
          <div className="feat-vis">{af===0&&<VHeat/>}{af===1&&<VChart/>}{af===2&&<VPeople/>}{af===3&&<VAlerts/>}</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section ref={wR} id="solución" className="section bg-s">
        <div className="sec-head" style={{...a(0),opacity:wV?1:0,transform:wV?"translateY(0)":"translateY(24px)"}}><span className="sec-tag">Cómo funciona</span><h2 className="sec-title">Operativo en <span className="accent">24 horas</span></h2><p className="sec-sub">Sin hardware nuevo. Sin complicaciones. Solo resultados.</p></div>
        <div className="steps-g">{[
          {n:"01",t:"Conecta tus cámaras",d:"Integración directa con tu CCTV existente. Compatible con Hikvision, Dahua, Axis y más.",img:IMG.restaurante},
          {n:"02",t:"IA analiza en tiempo real",d:"Nuestro motor de visión artificial detecta personas y objetos. No almacenamos video.",img:IMG.lima},
          {n:"03",t:"Reportes automáticos",d:"Dashboards y alertas llegan a tus gerentes cada mañana con métricas claras.",img:IMG.urbano},
          {n:"04",t:"Decisiones con datos",d:"Optimiza staff, redistribuye espacios, mide el ROI de cada decisión.",img:IMG.iquitos},
        ].map((s,i)=>(<div key={i} className="step-card" style={{...a(i*0.1),opacity:wV?1:0,transform:wV?"translateY(0)":"translateY(30px)"}}><div className="step-img-w"><img src={s.img} alt={s.t} className="step-img"/><span className="step-num">{s.n}</span></div><h3 className="step-t">{s.t}</h3><p className="step-d">{s.d}</p></div>))}</div>
      </section>

      {/* PRIVACY */}
      <section className="section" style={{paddingTop:0}}><div className="priv-card"><div className="priv-ic"><Shield/></div><div><h3 className="priv-t">Privacidad por diseño</h3><p className="priv-d">VORW <strong>no almacena video ni imágenes</strong>. Solo procesamos metadatos anónimos: conteos, trayectorias y zonas de interés. 100% compatible con GDPR y normativas locales.</p></div></div></section>

      {/* TESTIMONIALS */}
      <section ref={tR} className="section bg-s">
        <div className="sec-head" style={{...a(0),opacity:tV?1:0,transform:tV?"translateY(0)":"translateY(24px)"}}><span className="sec-tag">Testimonios</span><h2 className="sec-title">Lo que dicen nuestros clientes</h2></div>
        <div className="testi-g">{[
          {name:"María Rodríguez",role:"Gerente de Ops · RetailMax",q:"Redujimos los tiempos de espera en caja un 35%. Los reportes llegan cada mañana y mi equipo actúa de inmediato."},
          {name:"Carlos Mendoza",role:"Dir. Comercial · Plaza Central",q:"Antes decidíamos por intuición. Ahora sabemos exactamente qué zonas generan más tráfico y cómo optimizar el layout."},
          {name:"Ana López",role:"VP Retail · Grupo Éxito",q:"La implementación fue rápida. En 24 horas teníamos datos accionables de nuestras 12 sucursales."},
        ].map((t,i)=>(<div key={i} className="testi-card" style={{...a(i*0.12),opacity:tV?1:0,transform:tV?"translateY(0)":"translateY(24px)"}}><div className="t-stars">★★★★★</div><p className="t-q">"{t.q}"</p><div className="t-author"><div className="t-av" style={{background:["#0D1B54","#4338CA","#6366f1"][i]}}>{t.name[0]}{t.name.split(" ")[1]?.[0]}</div><div><div className="t-name">{t.name}</div><div className="t-role">{t.role}</div></div></div></div>))}</div>
      </section>

      {/* PRICING */}
      <section ref={pR} id="precios" className="section">
        <div className="sec-head" style={{...a(0),opacity:pV?1:0,transform:pV?"translateY(0)":"translateY(24px)"}}><span className="sec-tag">Precios</span><h2 className="sec-title">Planes que escalan contigo</h2><p className="sec-sub">Sin contratos largos. Sin sorpresas. Cancela cuando quieras.</p></div>
        <div className="price-g">{plans.map((p,i)=>(<div key={i} className={`price-card ${p.pop?"pop":""}`} style={{...a(i*0.1),opacity:pV?1:0,transform:pV?"translateY(0)":"translateY(24px)"}}>{p.pop&&<div className="pop-b">Más popular</div>}<h3 className="pr-name">{p.n}</h3><p className="pr-desc">{p.d}</p><div className="pr-row">{p.p!=="Custom"&&<span className="pr-cur">$</span>}<span className="pr-num">{p.p}</span>{p.p!=="Custom"&&<span className="pr-per">/mes</span>}</div><ul className="pr-list">{p.items.map(f=><li key={f} className="pr-item"><Chk c={p.pop?"#4338CA":"#9ca3af"}/>{f}</li>)}</ul><a href="#" onClick={(e)=>{e.preventDefault();setShowDemo(true)}} className={p.pop?"btn-pr-pop":"btn-pr"}>{p.cta}</a></div>))}</div>
      </section>

      {/* CTA */}
      <section className="cta-sec">
        <div className="cta-bg"><img src={IMG.urbano} alt="" className="cta-bg-img"/><div className="cta-ov"/></div>
        <div className="cta-ct"><h2 className="cta-h2">¿Listo para convertir tus cámaras en tu mejor fuente de datos?</h2><p className="cta-sub">15 minutos de demo en una reunión. Sin compromiso. Sin tarjeta de crédito.</p><div className="cta-btns"><a href="#" onClick={(e)=>{e.preventDefault();setShowDemo(true)}} className="btn-cta-w">Agendar reunión gratuita <Arr/></a><a href="#" className="btn-cta-o">Hablar con ventas</a></div></div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="f-inner">
          <div className="f-top">
            <div className="f-brand"><a href="#" className="logo"><img className="logo-img" src="/src/assets/img/logovorw.png" alt="VORW"/><span className="logo-t">VORW</span></a><p className="f-tagline">Inteligencia visual que transforma la operación de tu negocio.</p></div>
            <div className="f-cols">{[{t:"Producto",l:["Características","Precios","Integraciones","API"]},{t:"Empresa",l:["Nosotros","Blog","Carreras","Contacto"]},{t:"Legal",l:["Privacidad","Términos","Seguridad","GDPR"]}].map(c=>(<div key={c.t} className="f-col"><h4 className="f-col-t">{c.t}</h4>{c.l.map(x=><a key={x} href="#" className="f-link">{x}</a>)}</div>))}</div>
          </div>
          <div className="f-bottom"><span>© 2026 VORW. Todos los derechos reservados.</span><span style={{color:"#d1d5db"}}>Hecho con visión en LATAM 🌎</span></div>
        </div>
      </footer>
      {showDemo&&<DemoModal onClose={()=>setShowDemo(false)}/>}
    </div>
  );
}

/* FEATURE VISUALS */
function VHeat(){return<div className="vis-p"><div className="vis-h"><span className="vis-t">Mapa de calor · Planta baja</span><span className="vis-live">● En vivo</span></div><div className="heat-g">{Array.from({length:48}).map((_,i)=>{const n=Math.random();return<div key={i} className="heat-c" style={{background:n>.8?"rgba(220,38,38,.65)":n>.6?"rgba(249,115,22,.55)":n>.4?"rgba(234,179,8,.45)":n>.2?"rgba(34,197,94,.3)":"rgba(13,27,84,.06)"}}/>})}</div><div className="heat-leg"><span>Baja</span><div className="heat-bar"/><span>Alta</span></div></div>}
function VChart(){return<div className="vis-p"><div className="vis-h"><span className="vis-t">Conversión semanal</span><span className="vis-acc">+12.4%</span></div><div className="chart-bars">{[65,45,78,52,90,68,85].map((v,i)=><div key={i} className="ch-col"><div className="ch-track"><div className="ch-fill" style={{height:`${v}%`}}/></div><span className="ch-day">{["L","M","X","J","V","S","D"][i]}</span></div>)}</div></div>}
function VPeople(){return<div className="vis-p"><div className="vis-h"><span className="vis-t">Conteo en tiempo real</span><span className="vis-live">● En vivo</span></div><div className="ppl-g">{[{z:"Entrada principal",c:23,t:"↑"},{z:"Área de cajas",c:8,t:"↓"},{z:"Pasillo central",c:45,t:"↑"},{z:"Zona gourmet",c:12,t:"→"}].map(z=><div key={z.z} className="ppl-c"><div className="ppl-z">{z.z}</div><span className="ppl-n">{z.c}</span><span className="ppl-tr">{z.t}</span></div>)}</div></div>}
function VAlerts(){return<div className="vis-p"><div className="vis-h"><span className="vis-t">Alertas recientes</span><span className="a-badge">3 nuevas</span></div><div className="a-list">{[{t:"Hace 2 min",m:"Afluencia pico en Zona A",tp:"warning"},{t:"Hace 15 min",m:"Cola en cajas supera 8 personas",tp:"alert"},{t:"Hace 1 hr",m:"Zona promo sin visitantes 30 min",tp:"info"}].map((x,i)=><div key={i} className="a-row"><div className="a-dot" style={{background:x.tp==="alert"?"#ef4444":x.tp==="warning"?"#f59e0b":"#3b82f6"}}/><div><div className="a-msg">{x.m}</div><div className="a-time">{x.t}</div></div></div>)}</div></div>}

/* DEMO MODAL */
function DemoModal({onClose}){
  const[step,setStep]=useState(1);
  const[form,setForm]=useState({nombre:"",email:"",telefono:"",negocio:""});
  const[selDate,setSelDate]=useState(null);
  const[selTime,setSelTime]=useState(null);
  const[sending,setSending]=useState(false);

  const today=new Date();
  const days=[];
  for(let i=1;i<=14;i++){const d=new Date(today);d.setDate(today.getDate()+i);if(d.getDay()!==0)days.push(d)}

  const slots=["09:00","09:30","10:00","10:30","11:00","11:30","14:00","14:30","15:00","15:30","16:00","16:30"];
  const meses=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  const diasSem=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

  const valid1=form.nombre&&form.email&&form.telefono&&form.negocio;
  const valid2=selDate&&selTime;

  const handleSubmit=()=>{
    setSending(true);
    const diasSemFull=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
    const mesesFull=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const fechaStr=`${diasSemFull[selDate.getDay()]} ${selDate.getDate()} de ${mesesFull[selDate.getMonth()]} ${selDate.getFullYear()}`;

    const EMAILJS_SERVICE_ID  = "service_nz1lshg"; 
    const EMAILJS_TEMPLATE_ID = "template_hzchzu3"; 
    const EMAILJS_PUBLIC_KEY  = "dZkiU1Wbyk1gOFtYd";    

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      negocio: form.negocio,
      fecha: fechaStr,
      hora: selTime + " hrs (Lima, Perú)",
    }, EMAILJS_PUBLIC_KEY)
    .then(()=>{
      setSending(false);
      setStep(3);
    })
    .catch((err)=>{
      console.error("EmailJS error:", err);
      setSending(false);
      alert("Hubo un error al enviar. Intenta de nuevo.");
    });
  };

  return(
    <div className="dm-overlay" onClick={onClose}>
      <div className="dm-modal" onClick={e=>e.stopPropagation()}>
        <button className="dm-close" onClick={onClose}>✕</button>

        {/* Progress */}
        <div className="dm-progress">
          {[1,2,3].map(s=><div key={s} className="dm-prog-step">
            <div className={`dm-dot ${step>=s?"active":""} ${step>s?"done":""}`}>{step>s?"✓":s}</div>
            {s<3&&<div className={`dm-line ${step>s?"active":""}`}/>}
          </div>)}
        </div>
        <div className="dm-prog-labels"><span className={step>=1?"active":""}>Tus datos</span><span className={step>=2?"active":""}>Fecha y hora</span><span className={step>=3?"active":""}>Confirmado</span></div>

        {/* STEP 1: Form */}
        {step===1&&<div className="dm-step">
          <h3 className="dm-title">Agenda tu reunión gratuita</h3>
          <p className="dm-sub">15 minutos para mostrarte cómo VORW transforma tu negocio y impacta en tus decisiones estratégicas</p>
          <div className="dm-form">
            <div className="dm-field">
              <label className="dm-label">Nombre completo</label>
              <input className="dm-input" placeholder="Ej: Juan Pérez" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/>
            </div>
            <div className="dm-field">
              <label className="dm-label">Email</label>
              <input className="dm-input" type="email" placeholder="juan@empresa.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            </div>
            <div className="dm-row2">
              <div className="dm-field">
                <label className="dm-label">Teléfono</label>
                <input className="dm-input" type="tel" placeholder="+51 999 999 999" value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})}/>
              </div>
              <div className="dm-field">
                <label className="dm-label">Nombre del negocio</label>
                <input className="dm-input" placeholder="Ej: Restaurante El Buen Sabor" value={form.negocio} onChange={e=>setForm({...form,negocio:e.target.value})}/>
              </div>
            </div>
          </div>
          <button className={`dm-btn ${valid1?"":"disabled"}`} disabled={!valid1} onClick={()=>setStep(2)}>Siguiente: elegir fecha <Arr/></button>
        </div>}

        {/* STEP 2: Calendar + Time */}
        {step===2&&<div className="dm-step">
          <h3 className="dm-title">Elige fecha y hora</h3>
          <p className="dm-sub">Selecciona el momento que mejor te funcione</p>

          <div className="dm-cal-section">
            <div className="dm-cal-label">Próximos días disponibles</div>
            <div className="dm-cal-grid">
              {days.slice(0,10).map((d,i)=>{
                const isSel=selDate&&d.toDateString()===selDate.toDateString();
                return<button key={i} className={`dm-day ${isSel?"sel":""}`} onClick={()=>setSelDate(d)}>
                  <span className="dm-day-name">{diasSem[d.getDay()]}</span>
                  <span className="dm-day-num">{d.getDate()}</span>
                  <span className="dm-day-month">{meses[d.getMonth()]}</span>
                </button>
              })}
            </div>
          </div>

          {selDate&&<div className="dm-time-section">
            <div className="dm-cal-label">Horarios disponibles — {diasSem[selDate.getDay()]} {selDate.getDate()} {meses[selDate.getMonth()]}</div>
            <div className="dm-time-grid">
              {slots.map(s=><button key={s} className={`dm-time ${selTime===s?"sel":""}`} onClick={()=>setSelTime(s)}>{s}</button>)}
            </div>
          </div>}

          <div className="dm-nav-btns">
            <button className="dm-btn-back" onClick={()=>setStep(1)}>← Volver</button>
            <button className={`dm-btn ${valid2?"":"disabled"}`} disabled={!valid2} onClick={handleSubmit}>
              {sending?"Agendando...":"Confirmar reunión"} {!sending&&<Arr/>}
            </button>
          </div>
        </div>}

        {/* STEP 3: Confirmation */}
        {step===3&&<div className="dm-step dm-confirm">
          <div className="dm-check-circle">✓</div>
          <h3 className="dm-title">Reunión agendada!</h3>
          <p className="dm-sub">Te enviamos un email de confirmación a <strong>{form.email}</strong></p>
          <div className="dm-summary">
            <div className="dm-sum-row"><span className="dm-sum-label">Fecha</span><span className="dm-sum-val">{diasSem[selDate.getDay()]} {selDate.getDate()} de {meses[selDate.getMonth()]}</span></div>
            <div className="dm-sum-row"><span className="dm-sum-label">Hora</span><span className="dm-sum-val">{selTime} hrs (Lima, Perú)</span></div>
            <div className="dm-sum-row"><span className="dm-sum-label">Negocio</span><span className="dm-sum-val">{form.negocio}</span></div>
            <div className="dm-sum-row"><span className="dm-sum-label">Contacto</span><span className="dm-sum-val">{form.nombre}</span></div>
          </div>
          <p className="dm-confirm-note">Un miembro del equipo VORW se pondrá en contacto contigo antes de la reunión. ¡Nos vemos pronto!</p>
          <button className="dm-btn" onClick={onClose}>Cerrar</button>
        </div>}
      </div>
    </div>
  );
}

/* CSS */
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
:root{--navy:#0D1B54;--ind:#4338CA;--ind-l:#EEF2FF;--ind-b:#E0E7FF;--tx:#111827;--tx2:#6b7280;--tx3:#9ca3af;--bg:#fff;--bg2:#f8f9fb;--brd:#e5e7eb;--mono:'JetBrains Mono',monospace;--sans:'Outfit',-apple-system,sans-serif;--r:14px}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth;overflow-x:hidden}body{font-family:var(--sans);background:var(--bg);color:var(--tx);-webkit-font-smoothing:antialiased;overflow-x:hidden}::selection{background:var(--ind);color:#fff}a{text-decoration:none;color:inherit}.vorw-app{min-height:100vh;overflow-x:hidden}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 24px;transition:all .35s}.nav-s{background:rgba(255,255,255,.96);backdrop-filter:blur(24px);border-bottom:1px solid var(--brd);box-shadow:0 1px 12px rgba(0,0,0,.03)}
.nav-in{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{display:flex;align-items:center;gap:10px}.logo-img{height:36px;width:auto;object-fit:contain;display:block}.logo-t{font-family:var(--mono);font-weight:800;font-size:18px;letter-spacing:.12em;color:var(--navy)}
.nav-lk{display:flex;gap:36px}.nl{font-size:14px;color:var(--tx2);font-weight:500;transition:color .2s}.nl:hover{color:var(--navy)}.nav-r{display:flex;align-items:center;gap:16px}
.btn-sm{padding:10px 22px;background:var(--navy);color:#fff;border-radius:9px;font-size:14px;font-weight:600;transition:all .2s}.btn-sm:hover{background:#1e2a5e}
.m-btn{background:none;border:none;cursor:pointer;display:flex;flex-direction:column;gap:5px;padding:8px}.ml{width:22px;height:2px;background:var(--navy);border-radius:2px;transition:all .3s}.ml.o:first-child{transform:rotate(45deg) translate(4px,4px)}.ml.o:nth-child(2){opacity:0}.ml.o:last-child{transform:rotate(-45deg) translate(4px,-4px)}
.mob-nav{display:flex;flex-direction:column;gap:12px;padding:16px 0 24px;border-top:1px solid var(--brd);background:#fff}.mob-lk{font-size:17px;color:var(--tx);padding:8px 0;font-weight:500}.sh-m{display:none}

.hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.hero-bg{position:absolute;inset:0;z-index:0}.hero-bg-img{width:100%;height:100%;object-fit:cover;display:block}
.hero-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,27,84,.88) 0%,rgba(67,56,202,.7) 40%,rgba(13,27,84,.85) 100%)}
.hero-ct{position:relative;z-index:2;max-width:720px;text-align:center;padding:120px 24px 80px;margin:0 auto}
.h-badge{display:inline-flex;align-items:center;gap:9px;padding:7px 20px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:100px;font-size:13px;font-weight:600;color:rgba(255,255,255,.85);margin-bottom:28px;backdrop-filter:blur(8px)}
.h-pulse{width:7px;height:7px;border-radius:50%;background:#34d399;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(52,211,153,.4)}50%{opacity:.5;box-shadow:0 0 0 8px rgba(52,211,153,0)}}
.h-title{font-size:clamp(36px,5.5vw,68px);font-weight:900;line-height:1.05;letter-spacing:-.04em;color:#fff;margin-bottom:24px}
.h-accent{background:linear-gradient(90deg,#c7d2fe,#e0e7ff,#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.h-sub{font-size:clamp(16px,1.5vw,19px);line-height:1.7;color:rgba(255,255,255,.6);max-width:560px;margin:0 auto 36px}
.h-ctas{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin-bottom:40px}
.btn-w{display:inline-flex;align-items:center;gap:10px;padding:15px 32px;background:#fff;color:var(--navy);border-radius:12px;font-size:16px;font-weight:700;transition:all .25s;box-shadow:0 4px 24px rgba(0,0,0,.15)}.btn-w:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(0,0,0,.2)}
.btn-o{display:inline-flex;align-items:center;gap:12px;padding:15px 28px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.9);border-radius:12px;font-size:16px;font-weight:500;border:1px solid rgba(255,255,255,.15);transition:all .25s;backdrop-filter:blur(8px)}.btn-o:hover{background:rgba(255,255,255,.14)}
.play-c{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#fff}
.h-proof{display:flex;align-items:center;gap:14px;justify-content:center}.h-avs{display:flex}
.h-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;border:2.5px solid rgba(255,255,255,.3);margin-left:-10px}.h-av:first-child{margin-left:0}
.h-stars{font-size:14px;color:#fbbf24;letter-spacing:2px;display:block}.h-ptxt{font-size:13px;color:rgba(255,255,255,.45);display:block;margin-top:1px}

.trust{padding:40px 24px;border-bottom:1px solid var(--brd);text-align:center}.trust-l{font-size:12px;font-weight:700;color:var(--tx3);text-transform:uppercase;letter-spacing:.1em;display:block;margin-bottom:24px}.trust-logos{display:flex;justify-content:center;gap:48px;flex-wrap:wrap}.trust-n{font-size:17px;font-weight:800;color:#d1d5db;letter-spacing:.02em}

.stats{padding:64px 24px;border-bottom:1px solid var(--brd)}.stats-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:32px;text-align:center}.stat-n{font-size:48px;font-weight:900;color:var(--navy);font-family:var(--mono);letter-spacing:-.03em}.stat-l{font-size:15px;font-weight:600;color:var(--tx2);margin-top:4px}

.showcase{padding:100px 24px}.sc-in{max-width:1140px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:56px;align-items:center}
.sc-imgs{display:flex;flex-direction:column;gap:16px}.sc-main{position:relative;border-radius:18px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.12)}.sc-main .sc-img{width:100%;display:block;aspect-ratio:16/10;object-fit:cover}
.sc-live{position:absolute;top:16px;left:16px;padding:6px 14px;background:rgba(220,38,38,.9);color:#fff;border-radius:8px;font-size:12px;font-weight:700;font-family:var(--mono);letter-spacing:.06em;animation:pulse 2s infinite}
.sc-small{position:relative;border-radius:14px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.08)}.sc-small .sc-img{width:100%;display:block;aspect-ratio:16/7;object-fit:cover}
.sc-label{position:absolute;bottom:12px;right:12px;padding:5px 12px;background:rgba(13,27,84,.85);color:#fff;border-radius:6px;font-size:12px;font-weight:600;font-family:var(--mono);backdrop-filter:blur(4px)}
.sc-ct{max-width:440px}.sc-checks{display:flex;flex-direction:column;gap:12px;margin-top:24px}.sc-chk{display:flex;align-items:center;gap:10px;font-size:15px;color:var(--tx);font-weight:500}

.section{padding:100px 24px}.bg-s{background:var(--bg2)}.sec-head{text-align:center;max-width:560px;margin:0 auto 60px}
.sec-tag{display:inline-block;padding:5px 16px;background:var(--ind-l);border-radius:100px;font-size:12px;font-weight:700;color:var(--ind);letter-spacing:.08em;text-transform:uppercase}
.sec-title{font-size:clamp(30px,3.5vw,44px);font-weight:900;line-height:1.12;letter-spacing:-.03em;color:var(--navy);margin:14px 0 16px}.accent{color:var(--ind)}.sec-sub{font-size:17px;line-height:1.7;color:var(--tx2)}

.feat-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr 1.2fr;gap:40px;align-items:start}.feat-list{display:flex;flex-direction:column;gap:4px}
.feat-btn{display:flex;align-items:flex-start;gap:14px;padding:16px 20px;border-radius:var(--r);border:1px solid transparent;background:transparent;cursor:pointer;text-align:left;width:100%;font-family:var(--sans);color:var(--tx);transition:all .2s}.feat-btn.active{background:var(--bg2);border-color:var(--brd)}.feat-btn:hover{background:var(--bg2)}
.feat-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:#f3f4f6;color:var(--tx3);transition:all .2s}.feat-icon.active{background:var(--ind-l);color:var(--ind)}
.feat-t{font-size:15px;font-weight:700;color:var(--tx2);margin:0;transition:color .2s}.feat-btn.active .feat-t{color:var(--navy)}.feat-tag{font-size:10px;font-weight:700;color:var(--tx3);background:#f3f4f6;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.06em}
.feat-d{font-size:14px;line-height:1.65;color:var(--tx3);margin-top:8px;animation:fadeUp .35s ease}@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.feat-vis{background:var(--bg2);border-radius:18px;border:1px solid var(--brd);overflow:hidden;min-height:380px}

.vis-p{padding:24px}.vis-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.vis-t{font-size:15px;font-weight:700;color:var(--navy)}.vis-live{font-size:12px;color:#22c55e;font-family:var(--mono);animation:pulse 2s infinite}.vis-acc{font-size:14px;color:var(--ind);font-weight:700}
.heat-g{display:grid;grid-template-columns:repeat(8,1fr);gap:5px}.heat-c{aspect-ratio:1;border-radius:5px}.heat-leg{display:flex;align-items:center;gap:8px;margin-top:16px;justify-content:center;font-size:11px;color:var(--tx3)}.heat-bar{width:140px;height:8px;border-radius:4px;background:linear-gradient(to right,rgba(13,27,84,.08),#22c55e,#eab308,#f97316,#dc2626)}
.chart-bars{display:flex;gap:10px;align-items:flex-end;height:230px}.ch-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;height:100%}.ch-track{flex:1;width:100%;background:#f3f4f6;border-radius:6px;display:flex;align-items:flex-end;overflow:hidden}.ch-fill{width:100%;background:linear-gradient(to top,var(--navy),#818cf8);border-radius:6px;transition:height .8s ease}.ch-day{font-size:13px;color:var(--tx3);font-weight:600}
.ppl-g{display:grid;grid-template-columns:1fr 1fr;gap:12px}.ppl-c{background:#fff;border-radius:12px;padding:16px;border:1px solid var(--brd);transition:all .2s}.ppl-c:hover{border-color:var(--ind-b)}.ppl-z{font-size:13px;color:var(--tx2);margin-bottom:8px}.ppl-n{font-size:30px;font-weight:800;font-family:var(--mono);color:var(--navy)}.ppl-tr{font-size:18px;color:var(--ind);margin-left:6px}
.a-badge{font-size:12px;padding:4px 12px;border-radius:100px;background:#FEF2F2;color:#ef4444;font-weight:600}.a-list{display:flex;flex-direction:column;gap:10px}.a-row{display:flex;gap:12px;align-items:flex-start;padding:14px;background:#fff;border-radius:12px;border:1px solid var(--brd);transition:all .2s}.a-row:hover{border-color:#fca5a5}.a-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:6px}.a-msg{font-size:14px;color:var(--navy);line-height:1.5;font-weight:500}.a-time{font-size:12px;color:var(--tx3);margin-top:2px}

.steps-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.step-card{background:#fff;border-radius:18px;border:1px solid var(--brd);overflow:hidden;transition:all .3s}.step-card:hover{border-color:var(--ind-b);box-shadow:0 8px 28px rgba(67,56,202,.06);transform:translateY(-4px)!important}
.step-img-w{position:relative;height:170px;overflow:hidden}.step-img{width:100%;height:100%;object-fit:cover}.step-num{position:absolute;top:12px;left:12px;font-size:13px;font-weight:800;color:#fff;font-family:var(--mono);background:rgba(13,27,84,.75);backdrop-filter:blur(8px);padding:4px 10px;border-radius:6px;letter-spacing:.08em}
.step-t{font-size:17px;font-weight:700;color:var(--navy);padding:20px 22px 8px}.step-d{font-size:14px;line-height:1.65;color:var(--tx3);padding:0 22px 22px}

.priv-card{max-width:800px;margin:0 auto;display:flex;align-items:flex-start;gap:22px;padding:36px;background:var(--bg2);border-radius:18px;border:1px solid var(--brd);transition:all .3s}.priv-card:hover{border-color:#a7f3d0}.priv-ic{width:50px;height:50px;border-radius:14px;background:#ECFDF5;display:flex;align-items:center;justify-content:center;color:#059669;flex-shrink:0}.priv-t{font-size:20px;font-weight:700;color:var(--navy);margin-bottom:8px}.priv-d{font-size:15px;line-height:1.7;color:var(--tx2);margin:0}

.testi-g{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.testi-card{padding:28px;background:#fff;border-radius:16px;border:1px solid var(--brd);transition:all .3s}.testi-card:hover{border-color:var(--ind-b);box-shadow:0 4px 20px rgba(67,56,202,.06);transform:translateY(-3px)}
.t-stars{font-size:16px;color:#f59e0b;letter-spacing:3px;margin-bottom:14px}.t-q{font-size:15px;line-height:1.7;color:var(--tx);margin:0 0 20px;font-style:italic}.t-author{display:flex;align-items:center;gap:12px}.t-av{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px}.t-name{font-size:14px;font-weight:700;color:var(--navy)}.t-role{font-size:13px;color:var(--tx3)}

.price-g{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;align-items:start}
.price-card{position:relative;padding:36px 28px;background:#fff;border-radius:18px;border:1px solid var(--brd);transition:all .3s}.price-card:hover{box-shadow:0 8px 30px rgba(0,0,0,.06);transform:translateY(-3px)}.price-card.pop{border:2px solid var(--navy);box-shadow:0 8px 40px rgba(13,27,84,.1)}
.pop-b{position:absolute;top:-13px;left:50%;transform:translateX(-50%);padding:5px 18px;background:var(--navy);color:#fff;border-radius:100px;font-size:12px;font-weight:700}.pr-name{font-size:20px;font-weight:700;color:var(--navy)}.pr-desc{font-size:14px;color:var(--tx3);margin:4px 0 20px}
.pr-row{display:flex;align-items:baseline;gap:3px;margin-bottom:24px}.pr-cur{font-size:20px;color:var(--tx2);font-weight:500}.pr-num{font-size:48px;font-weight:900;color:var(--navy);font-family:var(--mono);letter-spacing:-.03em}.pr-per{font-size:14px;color:var(--tx3);margin-left:4px}
.pr-list{list-style:none;display:flex;flex-direction:column;gap:12px;margin-bottom:28px}.pr-item{display:flex;align-items:center;gap:10px;font-size:14px;color:var(--tx2)}
.btn-pr{display:block;text-align:center;padding:13px 24px;border-radius:11px;font-size:14px;font-weight:700;background:#fff;color:var(--navy);border:1px solid var(--brd);transition:all .2s}.btn-pr:hover{background:var(--bg2);border-color:var(--ind-b)}
.btn-pr-pop{display:block;text-align:center;padding:13px 24px;border-radius:11px;font-size:14px;font-weight:700;background:var(--navy);color:#fff;border:none;transition:all .2s}.btn-pr-pop:hover{background:#1e2a5e}

.cta-sec{position:relative;padding:120px 24px;overflow:hidden}.cta-bg{position:absolute;inset:0}.cta-bg-img{width:100%;height:100%;object-fit:cover}.cta-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,27,84,.93),rgba(67,56,202,.85))}
.cta-ct{position:relative;z-index:2;max-width:640px;margin:0 auto;text-align:center}.cta-h2{font-size:clamp(28px,3.5vw,40px);font-weight:900;line-height:1.12;color:#fff;margin-bottom:16px;letter-spacing:-.025em}.cta-sub{font-size:17px;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:36px}.cta-btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
.btn-cta-w{display:inline-flex;align-items:center;gap:10px;padding:15px 32px;background:#fff;color:var(--navy);border-radius:12px;font-size:16px;font-weight:700;transition:all .25s;box-shadow:0 4px 24px rgba(0,0,0,.15)}.btn-cta-w:hover{transform:translateY(-2px);box-shadow:0 8px 36px rgba(0,0,0,.2)}
.btn-cta-o{display:inline-flex;align-items:center;gap:10px;padding:15px 28px;background:transparent;color:rgba(255,255,255,.8);border-radius:12px;font-size:16px;font-weight:500;border:1px solid rgba(255,255,255,.2);transition:all .25s}.btn-cta-o:hover{background:rgba(255,255,255,.08)}

.footer{border-top:1px solid var(--brd);padding:60px 24px 28px}.f-inner{max-width:1100px;margin:0 auto}.f-top{display:flex;justify-content:space-between;gap:48px;margin-bottom:48px;flex-wrap:wrap}.f-brand{max-width:260px}.f-tagline{font-size:14px;line-height:1.7;color:var(--tx3);margin-top:14px}
.f-cols{display:flex;gap:56px;flex-wrap:wrap}.f-col{display:flex;flex-direction:column;gap:10px}.f-col-t{font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px;letter-spacing:.06em;text-transform:uppercase}.f-link{font-size:14px;color:var(--tx3);transition:color .2s}.f-link:hover{color:var(--ind)}
.f-bottom{padding-top:24px;border-top:1px solid var(--brd);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:13px;color:var(--tx3)}

@media(max-width:1024px){.hero-ct{padding:140px 24px 80px}.sc-in{grid-template-columns:1fr}.sc-ct{max-width:100%}.dm-modal{max-width:95vw;margin:16px}}
@media(max-width:900px){.hd-m{display:none!important}.sh-m{display:flex!important}.stats-g{grid-template-columns:repeat(2,1fr)!important}.feat-grid{grid-template-columns:1fr!important}.steps-g{grid-template-columns:1fr 1fr!important}.price-g{grid-template-columns:1fr!important;max-width:420px!important}.testi-g{grid-template-columns:1fr!important;max-width:500px!important}.f-top{flex-direction:column}.dm-row2{grid-template-columns:1fr!important}.dm-cal-grid{grid-template-columns:repeat(5,1fr)!important}}
@media(max-width:600px){.steps-g{grid-template-columns:1fr!important}.trust-logos{gap:24px}.dm-time-grid{grid-template-columns:repeat(3,1fr)!important}.dm-cal-grid{grid-template-columns:repeat(4,1fr)!important}}

/* DEMO MODAL */
.dm-overlay{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;animation:dmFadeIn .25s ease}
@keyframes dmFadeIn{from{opacity:0}to{opacity:1}}
.dm-modal{background:#fff;border-radius:20px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;padding:36px;position:relative;box-shadow:0 32px 80px rgba(0,0,0,.2);animation:dmSlideUp .35s cubic-bezier(.22,1,.36,1)}
@keyframes dmSlideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.dm-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;border:1px solid var(--brd);background:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--tx3);transition:all .2s}.dm-close:hover{background:var(--bg2);color:var(--tx)}

.dm-progress{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:8px}
.dm-prog-step{display:flex;align-items:center}
.dm-dot{width:32px;height:32px;border-radius:50%;border:2px solid var(--brd);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--tx3);transition:all .3s;font-family:var(--mono)}
.dm-dot.active{border-color:var(--ind);color:var(--ind);background:var(--ind-l)}
.dm-dot.done{border-color:var(--ind);background:var(--ind);color:#fff}
.dm-line{width:48px;height:2px;background:var(--brd);transition:all .3s}.dm-line.active{background:var(--ind)}
.dm-prog-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--tx3);margin-bottom:28px;padding:0 12px}.dm-prog-labels span.active{color:var(--ind);font-weight:600}

.dm-step{animation:fadeUp .3s ease}
.dm-title{font-size:24px;font-weight:800;color:var(--navy);margin-bottom:8px;letter-spacing:-.02em}
.dm-sub{font-size:15px;color:var(--tx2);line-height:1.6;margin-bottom:28px}
.dm-form{display:flex;flex-direction:column;gap:16px;margin-bottom:28px}
.dm-field{display:flex;flex-direction:column;gap:6px}
.dm-label{font-size:13px;font-weight:600;color:var(--tx)}
.dm-input{padding:12px 16px;border:1px solid var(--brd);border-radius:10px;font-size:15px;font-family:var(--sans);color:var(--tx);outline:none;transition:all .2s;background:var(--bg)}.dm-input:focus{border-color:var(--ind);box-shadow:0 0 0 3px rgba(67,56,202,.1)}
.dm-input::placeholder{color:var(--tx3)}
.dm-row2{display:grid;grid-template-columns:1fr 1fr;gap:16px}

.dm-btn{width:100%;padding:14px 24px;background:var(--navy);color:#fff;border:none;border-radius:11px;font-size:15px;font-weight:700;font-family:var(--sans);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s}.dm-btn:hover{background:#1e2a5e}
.dm-btn.disabled{opacity:.4;cursor:not-allowed;pointer-events:none}
.dm-btn-back{padding:14px 20px;background:transparent;border:1px solid var(--brd);border-radius:11px;font-size:14px;font-weight:600;font-family:var(--sans);cursor:pointer;color:var(--tx2);transition:all .2s}.dm-btn-back:hover{background:var(--bg2)}
.dm-nav-btns{display:flex;gap:12px;margin-top:24px}
.dm-nav-btns .dm-btn{flex:1}

.dm-cal-section{margin-bottom:24px}.dm-cal-label{font-size:13px;font-weight:700;color:var(--tx);margin-bottom:12px;text-transform:uppercase;letter-spacing:.04em}
.dm-cal-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.dm-day{padding:12px 8px;border:1px solid var(--brd);border-radius:10px;background:#fff;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;transition:all .2s;font-family:var(--sans)}.dm-day:hover{border-color:var(--ind-b);background:var(--bg2)}
.dm-day.sel{border-color:var(--ind);background:var(--ind-l)}
.dm-day-name{font-size:11px;font-weight:600;color:var(--tx3);text-transform:uppercase}.dm-day.sel .dm-day-name{color:var(--ind)}
.dm-day-num{font-size:20px;font-weight:800;color:var(--navy);font-family:var(--mono)}.dm-day.sel .dm-day-num{color:var(--ind)}
.dm-day-month{font-size:11px;color:var(--tx3)}.dm-day.sel .dm-day-month{color:var(--ind)}

.dm-time-section{margin-bottom:0}.dm-time-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.dm-time{padding:10px;border:1px solid var(--brd);border-radius:8px;background:#fff;cursor:pointer;font-size:14px;font-weight:600;font-family:var(--mono);color:var(--tx);text-align:center;transition:all .2s}.dm-time:hover{border-color:var(--ind-b);background:var(--bg2)}
.dm-time.sel{border-color:var(--ind);background:var(--ind-l);color:var(--ind)}

.dm-confirm{text-align:center}
.dm-check-circle{width:64px;height:64px;border-radius:50%;background:#ECFDF5;color:#059669;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;margin:0 auto 20px;animation:dmPop .5s cubic-bezier(.22,1,.36,1)}
@keyframes dmPop{from{transform:scale(0)}to{transform:scale(1)}}
.dm-summary{background:var(--bg2);border-radius:14px;padding:20px;margin:24px 0;text-align:left}
.dm-sum-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--brd)}.dm-sum-row:last-child{border:none}
.dm-sum-label{font-size:13px;color:var(--tx3);font-weight:500}.dm-sum-val{font-size:14px;color:var(--navy);font-weight:700}
.dm-confirm-note{font-size:14px;color:var(--tx2);line-height:1.6;margin-bottom:20px}
`;