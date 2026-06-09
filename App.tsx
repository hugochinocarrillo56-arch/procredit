import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { Calculator } from './components/Calculator';
import { ContactForm } from './components/ContactForm';
import { FAQ } from './components/FAQ';
import { ServiceView } from './components/ServiceView';
import { WHATSAPP_PHONE, WHATSAPP_PHONE_SECONDARY } from './constants';
import { 
  Menu, Moon, Sun, PlayCircle, ArrowRight, CheckCircle, MapPin, Phone, ArrowUp, Landmark, 
  Gem, Car, Smartphone, Shield, Repeat, Banknote, Percent, CalendarClock, X,
  Calculator as CalculatorIcon, DollarSign, Users, Facebook, ShieldCheck
} from 'lucide-react';

// Data for dynamic pages - Updated to Bolivianos (Bs.)
const SERVICE_DATA: Record<string, any> = {
  joyeria: {
    title: "Empeño de Alta Joyería",
    subtitle: "Valoramos tus tesoros",
    description: "Obtén el avalúo más alto del mercado por tus piezas de oro, diamantes y piedras preciosas. Tasadores certificados GIA.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1920&auto=format&fit=crop",
    features: ["Avalúo gemológico certificado gratuito", "Resguardo en bóveda bancaria asegurada", "Hasta el 95% del valor comercial", "Sin límite de monto en préstamo"],
    requirements: ["Documento de Identidad (C.I.) vigente", "La pieza de joyería para avalúo físico", "Certificados de autenticidad (opcional, mejora el valor)"]
  },
  autos: {
    title: "Empeño de Autos",
    subtitle: "Liquidez sobre ruedas",
    description: "Convierte tu vehículo en efectivo inmediato. Ofrecemos modalidades de resguardo o 'síguelo manejando' con GPS.",
    image: "https://i.ibb.co/Xrwt0M9y/feria-autos-elalto.jpg",
    features: ["Opción: Déjalo o Manéjalo", "Hasta el 80% del valor de la guía", "Trámite en menos de 2 horas", "Tasa preferencial desde 1.5%"],
    requirements: [
      "Ruat + carnet de propiedad",
      "Póliza de importación",
      "Resolución de inscripción vehícular en tránsito",
      "Poder para dar en garantía prendaria (si fuera el caso)",
      "Certificado alodial (Tránsito)",
      "Impuestos al día (sin gravamen)",
      "Factura de luz"
    ]
  },
  inmuebles: {
    title: "Garantía Inmobiliaria",
    subtitle: "Tu propiedad te respalda",
    description: "Préstamos de alto valor con garantía hipotecaria. Ideal para inyección de capital de negocios o consolidación de deudas.",
    image: "https://i.ibb.co/gFRdJbRb/600293691-122147092430710584-3646622031107360372-n.jpg",
    features: ["Montos desde Bs. 350,000", "Plazos de hasta 10 años", "Sin buró de crédito estricto", "Notarización ágil y segura"],
    enableLocation: true,
    requirements: ["Título de propiedad registrado en Derechos Reales", "Folio Real actualizado (Alodial)", "Plano Catastral aprobado", "Impuestos pagados de la última gestión", "C.I. del propietario y cónyuge (si aplica)"]
  },
  electronicos: {
    title: "Empeño de Electrónicos",
    subtitle: "Tecnología por efectivo",
    description: "Aceptamos laptops (MacBook, Alienware), cámaras profesionales, consolas de última generación y celulares de gama alta.",
    image: "https://i.ibb.co/Y48GkP6q/noticias-unitel-101-14200601-20260115002247.webp",
    features: ["Borrado de datos seguro (opcional)", "Almacenamiento anti-estático", "Préstamos rápidos desde Bs. 1,400", "Renovación mensual ilimitada"],
    requirements: ["Equipo completo con cargador original", "Batería con carga para pruebas", "Sin cuentas bloqueadas (iCloud/Google)", "Documento de Identidad (C.I.)"]
  },
  garantia: {
    title: "Crédito con Garantía",
    subtitle: "El estándar ProCredit",
    description: "Nuestro producto estrella. Un préstamo personal respaldado por tus activos físicos, combinando lo mejor de la banca y el empeño.",
    image: "https://images.unsplash.com/photo-1626265774643-f1943311a86b?q=80&w=1920&auto=format&fit=crop",
    features: ["Combinación de garantías aceptada", "Aprobación en 24 horas", "Intereses sobre saldos insolutos", "Sin penalización por prepago"],
    requirements: ["Documento de Identidad (C.I.) vigente", "Avalúo de la garantía (realizado por nosotros)", "Comprobante de ingresos (opcional, mejora tasa)"]
  },
  seguros: {
    title: "Seguros Integrales",
    subtitle: "Protección Total",
    description: "Asegura lo que más valoras. Ofrecemos seguros de vida, automotriz y protección de bienes empeñados con cobertura amplia.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80",
    features: ["Cobertura inmediata", "Primas competitivas", "Asistencia 24/7", "Respaldo de aseguradoras líderes"],
    requirements: ["Documento de Identidad (C.I.)", "Formulario de solicitud", "Inspección del bien (si aplica)"]
  }
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    { url: "https://i.ibb.co/60TrSSQn/484348315-122123947544616809-8652967539908385468-n.jpg", link: null },
    { url: "https://i.ibb.co/KxCFxYZV/484387942-122123947844616809-485915212088624553-n-1.jpg", link: null },
    { url: "https://i.ibb.co/pjTsP7y6/484621097-1043915254434075-3753849569599482617-n-2.jpg", link: "https://subasta-pro-phje.vercel.app/" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    setTimeout(() => {
        const element = document.getElementById('calculator-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 50);
  };

  const handleNavigation = (view: string) => {
    setCurrentView(view);
    scrollToTop();
  };

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <>
        {/* Hero Section - Image Slider Only */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[500px] overflow-hidden bg-slate-100">
          {heroImages.map((img, index) => (
            <div 
              key={img.url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {img.link ? (
                <a 
                  href={img.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 w-full h-full z-10 cursor-pointer group block"
                >
                  <img 
                    src={img.url} 
                    alt={`Hero Image ${index + 1}`} 
                    className="absolute inset-0 w-full h-full object-contain md:object-cover border-0"
                  />
                  {/* Floating CTA Badge for clickable slide */}
                  <div className="absolute bottom-6 right-6 z-20 bg-gradient-to-r from-amber-400 to-highlight hover:from-amber-500 hover:to-orange-600 text-black font-extrabold text-xs px-5 py-3 rounded-xl shadow-2xl flex items-center gap-1.5 border border-amber-300 transition-all hover:scale-105 animate-pulse">
                    <span>🔨 VER REMATES / SUBASTAS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </a>
              ) : (
                <img 
                  src={img.url} 
                  alt={`Hero Image ${index + 1}`} 
                  className="absolute inset-0 w-full h-full object-contain md:object-cover z-10"
                />
              )}
            </div>
          ))}
        </div>

        {/* Hero Content - Now below the images for full visibility */}
        <div className="bg-background-light pt-6 pb-12 md:py-10 px-6 md:px-16 max-w-7xl mx-auto relative z-20">
          <div className="animate-fade-in-up">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4 md:mb-6">
                <span className="bg-white p-1.5 md:p-2 rounded-lg border-2 border-primary flex items-center gap-1.5 md:gap-2 shadow-md">
                  <Landmark className="text-primary w-3.5 h-3.5 md:w-5 md:h-5" />
                  <span className="text-primary font-extrabold text-[8px] md:text-xs uppercase tracking-wider">Respaldo Bancario</span>
                </span>
                <span className="bg-white p-1.5 md:p-2 rounded-lg border-2 border-primary flex items-center gap-1.5 md:gap-2 shadow-md">
                  <CheckCircle className="text-primary w-3.5 h-3.5 md:w-5 md:h-5" />
                  <span className="text-primary font-extrabold text-[8px] md:text-xs uppercase tracking-wider">Garantía Prendaria</span>
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-2xl sm:text-4xl md:text-7xl font-extrabold text-primary leading-tight md:leading-[1.1] mb-4 md:mb-6">
                TU PRÉSTAMO <br />
                <span className="text-text-main relative inline-block">
                  INMEDIATO Y SEGURO
                </span>
              </h1>
              
              {/* Description */}
              <p className="text-text-muted text-xs md:text-xl max-w-3xl leading-relaxed mb-8 md:mb-10 font-medium">
                Obtén la liquidez de un banco con la facilidad de un empeño. Aceptamos vehículos, joyas y electrónicos bajo los más estrictos estándares de seguridad bancaria.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <a 
                  href="https://pro-credit-verificar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-amber-400 to-highlight hover:from-amber-500 hover:to-orange-600 text-black font-black py-3 px-6 md:py-4 md:px-10 rounded-2xl shadow-xl shadow-highlight/40 border-2 border-amber-300 hover:border-orange-500 transform hover:scale-[1.02] transition-all flex items-center justify-center group text-sm md:text-base animate-pulse-subtle"
                >
                  <ShieldCheck className="mr-2 w-4 h-4 md:w-5 md:h-5 text-black animate-pulse" fill="currentColor" />
                  VERIFICAR MI PRÉSTAMO
                </a>
                <a 
                  href="https://www.tiktok.com/@hugo.chino75/video/7547876950086389048?is_from_webapp=1&sender_device=pc&web_id=7570304632188208651"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-secondary text-primary font-bold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all border border-primary/20 flex items-center justify-center shadow-lg text-sm md:text-base hover:scale-[1.02] transform"
                >
                  <PlayCircle className="mr-2 w-4 h-4 md:w-5 md:h-5 text-primary" /> Cómo Funciona
                </a>
              </div>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 md:px-12 relative -mt-6 md:-mt-24 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column (Content & Calculator) */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* Quienes Somos Section */}
                    <div className="bg-surface-light rounded-3xl p-6 md:p-8 shadow-blue-glow border border-primary/5 relative overflow-hidden group">
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-60 h-60 bg-primary/5 rounded-full -mr-10 -mt-10 blur-3xl"></div>

                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            <div className="w-full md:w-3/5 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-2 border border-primary/10">
                                    <Users className="w-3 h-3" />
                                    Sobre Nosotros
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-text-main">
                                    ¿Quiénes <span className="text-primary">Somos?</span>
                                </h2>
                                <div className="text-black text-sm leading-relaxed space-y-3 text-justify font-medium">
                                    <p>
                                        Desde 2024, nacimos en la ciudad de La Paz, en plena <strong>Av. Cardos Santos</strong>, apoyando a las familias y emprendedores, razón por la cual se debe nuestro nombre <strong>“Pro Credit”</strong>.
                                    </p>
                                    <p>
                                        Somos la mano amiga para muchos emprendedores que requieren un crédito de forma rápida y sencilla, <strong>sin complicaciones ni extenuantes requisitos</strong>.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-2/5">
                                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 rotate-2 hover:rotate-0 transition-all duration-500">
                                    <img 
                                        src="https://thumbs.dreamstime.com/b/una-gran-cantidad-de-dinero-boliviano-en-la-mano-y-convertido-moneda-bolivia-convertida-211984285.jpg" 
                                        alt="Equipo Pro Credit" 
                                        className="w-full h-48 md:h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent pt-12 pb-4 px-4">
                                         <p className="text-white font-extrabold text-xs md:text-sm text-center drop-shadow-md">Compromiso y Solidez</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Intro Section Card */}
                    <div className="bg-surface-light rounded-3xl p-6 shadow-blue-glow border border-primary/5">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-lg h-64 group">
                                <img 
                                    src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Joyas y Valores" 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white font-bold px-4 py-2 rounded-lg text-sm shadow-md flex items-center gap-2 border border-white/10">
                                    <CheckCircle className="text-white w-4 h-4" /> Avalúo Certificado
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className="text-2xl md:text-3xl font-bold text-text-main mb-4">
                                    Solvencia financiera <br/>
                                    <span className="text-primary">al instante</span>
                                </h2>
                                <p className="text-text-muted leading-relaxed mb-6 text-sm">
                                    Transformamos tus activos en capital de trabajo inmediato. Operamos con la transparencia de un banco y la agilidad que tu negocio necesita.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Contratos regulados", 
                                        "Bóvedas de seguridad bancaria", 
                                        "Tasas de interés preferenciales"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center text-text-muted text-sm font-medium">
                                            <div className="bg-primary/10 p-1.5 rounded-full mr-3">
                                                <Landmark className="text-primary w-4 h-4" />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                     {/* Dynamic Calculator Section */}
                    <div id="calculator-section" className="scroll-mt-24">
                        <div className="animate-fade-in-up">
                            <Calculator />
                        </div>
                    </div>

                    {/* Pawn Categories Grid */}
                    <div>
                      <h3 className="text-xl font-bold text-text-main mb-6 flex items-center gap-2">
                        <Gem className="text-primary w-6 h-6" />
                        Activos que Aceptamos
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                          {[
                            { id:'joyeria', title: "Alta Joyería", subtitle: "Oro, Diamantes, Rolex", img: "https://pxcdn.eldeber.com.bo/eldeber/530159/092025/1758916811157.webp?cw=1200&ch=675&extw=jpeg", icon: <Gem /> },
                            { id:'autos', title: "Vehículos", subtitle: "Autos, Motos, Camiones", img: "https://i.ibb.co/Xrwt0M9y/feria-autos-elalto.jpg", icon: <Car /> },
                            { id:'electronicos', title: "Tecnología", subtitle: "Laptops, Alta Gama", img: "https://i.ibb.co/Y48GkP6q/noticias-unitel-101-14200601-20260115002247.webp", icon: <Smartphone /> },
                            { id:'inmuebles', title: "Inmuebles", subtitle: "Propiedades Libres", img: "https://i.ibb.co/gFRdJbRb/600293691-122147092430710584-3646622031107360372-n.jpg", icon: <Landmark /> }
                          ].map((cat, i) => (
                            <div key={i} onClick={() => handleNavigation(cat.id)} className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-primary/10">
                              <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-12">
                                <div className="flex items-center gap-2 text-white mb-1">
                                  {React.cloneElement(cat.icon as React.ReactElement, { className: "w-4 h-4 text-white drop-shadow-md" })}
                                  <span className="font-extrabold text-sm drop-shadow-md">{cat.title}</span>
                                </div>
                                <p className="text-[10px] text-white/90 font-bold drop-shadow-md">{cat.subtitle}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Section of Remates de Bienes Adjudicados */}
                    <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 rounded-3xl p-6 md:p-8 border-2 border-emerald-500/30 text-white relative overflow-hidden shadow-xl shadow-emerald-950/40 group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -z-10 group-hover:bg-amber-500/20 transition-all duration-500"></div>
                      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-3 shrink-1 text-left">
                          <span className="bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider animate-pulse inline-block">
                            🔥 OPORTUNIDAD DE REMATE 🔥
                          </span>
                          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                            REMATES Y <span className="text-amber-400">SUBASTAS</span>
                          </h3>
                          <p className="text-xs md:text-sm text-slate-300 leading-relaxed max-w-xl font-medium">
                            ¿Buscas vehículos, inmuebles o artículos electrónicos adjudicados a precios de liquidación? Accede a nuestro portal oficial de subastas con total seguridad y transparencia.
                          </p>
                        </div>
                        <a 
                          href="https://subasta-pro-phje.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full md:w-auto bg-gradient-to-r from-amber-400 to-highlight hover:from-amber-500 hover:to-orange-600 text-black font-extrabold py-3.5 px-7 rounded-2xl shadow-xl shadow-highlight/20 text-center tracking-wider shrink-0 flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95 transition-all text-xs border border-amber-300"
                        >
                          <span>🔨 IR A REMATES</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Expanded Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         {[
                            { title: "Capital Operativo", desc: "Financiamiento inmediato para flujo de caja empresarial.", icon: <ArrowUp className="w-5 h-5 rotate-45" /> },
                            { title: "Refinanciamiento", desc: "Mejoramos las condiciones de tus empeños actuales.", icon: <Repeat className="w-5 h-5" /> },
                            { title: "Abonos a Capital", desc: "Reduce tus intereses pagando directo al capital.", icon: <Banknote className="w-5 h-5" /> },
                            { title: "Seguridad Total", desc: "Tus prendas aseguradas en bóvedas bancarias.", icon: <Shield className="w-5 h-5" /> }
                         ].map((feat, i) => (
                             <div key={i} className="bg-surface-light p-6 rounded-2xl shadow-sm border border-primary/5 hover:border-primary/50 transition-all hover:shadow-md group cursor-pointer flex gap-4 items-start">
                                 <div className="w-10 h-10 rounded-full bg-primary/5 flex-shrink-0 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                     {feat.icon}
                                 </div>
                                 <div>
                                    <h4 className="text-base font-bold text-text-main mb-1">{feat.title}</h4>
                                    <p className="text-xs text-text-muted leading-relaxed">{feat.desc}</p>
                                 </div>
                             </div>
                         ))}
                    </div>

                    {/* FAQ Section */}
                    <FAQ />
                </div>

                {/* Right Column (Sticky Sidebar) */}
                <div className="lg:col-span-4 space-y-8">
                   <div className="lg:sticky lg:top-8 space-y-8">
                       <ContactForm />

                        <div className="bg-surface-light rounded-2xl p-6 shadow-lg border border-primary/5 text-center">
                            <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="text-primary w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-text-main mb-2">Red de Sucursales</h4>
                            <p className="text-sm text-text-muted mb-6">
                                Acércate a cualquiera de nuestras agencias para un avalúo formal gratuito y confidencial.
                            </p>
                            <a 
                                href="https://maps.app.goo.gl/FV4hFBpEz578fU796" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full bg-primary/5 hover:bg-primary text-primary hover:text-white font-bold py-3 px-6 rounded-xl transition-all text-sm border border-primary/10"
                            >
                                Ubicar en Google Maps
                            </a>
                        </div>
                   </div>
                </div>

            </div>
        </div>
        </>
      );
    } 
    
    // Check if we have data for this view
    const pageData = SERVICE_DATA[currentView];
    if (pageData) {
      return (
        <ServiceView 
          {...pageData} 
          onBack={() => handleNavigation('home')}
        />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-light text-text-main">
      <TopNavbar 
        currentView={currentView}
        onNavigate={handleNavigation}
        toggleSidebar={toggleSidebar}
      />

      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        currentView={currentView}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 relative md:pt-20">
        
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white border-b border-primary/10 px-4 py-3 flex justify-between items-center shadow-lg">
           <button 
             onClick={toggleSidebar} 
             className="p-2 -ml-2 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/20 transition-all duration-300 group relative overflow-hidden"
           >
             {/* Ping animation element to draw attention */}
             <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
             </span>

             <div className="flex items-center gap-2">
                <Menu className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-text-muted group-hover:text-primary transition-colors">MENÚ</span>
             </div>
           </button>
           
           <span className="font-bold text-text-main tracking-tight">PRO <span className="text-primary">CREDIT</span></span>
           
           <div className="flex items-center gap-2">
                <a 
                  href="https://pro-credit-verificar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-amber-400 to-highlight hover:from-amber-500 hover:to-orange-600 text-black text-[10px] font-black px-3.5 py-2 rounded-xl shadow-lg shadow-highlight/50 flex items-center gap-1 animate-heartbeat border border-amber-300 tracking-wider text-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-black" fill="currentColor" /> VERIFICAR MI PRÉSTAMO
                </a>

           </div>
        </div>

        {renderContent()}

        {/* Footer */}
        <footer className="bg-surface-light text-text-main pt-20 pb-10 px-6 text-sm border-t border-primary/10 mt-12">
             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                 <div className="space-y-6">
                     <div className="flex items-center gap-2">
                         <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 shrink-0 bg-white p-0.5">
                            <img 
                                src="https://i.ibb.co/jP3Jhmj6/photo-2025-10-02-12-15-41.jpg" 
                                alt="Pro Credit Logo" 
                                className="w-full h-full object-cover rounded-full"
                            />
                         </div>
                         <span className="font-bold text-2xl tracking-tight text-text-main">PRO CREDIT</span>
                     </div>
                     <div className="text-text-muted leading-relaxed max-w-xs">
                         <p>Av. Cardos Santos 2074.</p>
                         <p>Soluciones financieras con garantía real.</p>
                         <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold mt-2">
                            <Phone className="w-4 h-4" /> Principal: +591 623 27873</a> <a href={`https://wa.me/${WHATSAPP_PHONE_SECONDARY}`} target="_blank" className="flex items-center gap-2 text-primary hover:text-accent transition-colors font-bold mt-1.5"><Phone className="w-4 h-4" /> Auxiliar: +591 77274528
                         </a>
                     </div>
                 </div>

                 <div>
                     <h5 className="font-bold mb-6 text-lg text-primary">Nosotros</h5>
                     <ul className="space-y-3 text-text-muted">
                         {['Gobierno Corporativo', 'Transparencia', 'Inversionistas', 'Trabaja con Nosotros'].map(link => (
                             <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                         ))}
                     </ul>
                 </div>

                 <div>
                     <h5 className="font-bold mb-6 text-lg text-primary">Productos</h5>
                     <ul className="space-y-3 text-text-muted">
                         {['Crédito Joyas', 'Crédito Vehicular', 'Crédito Maquinaria', 'Tasaciones'].map(link => (
                             <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                         ))}
                     </ul>
                 </div>

                 <div>
                     <h5 className="font-bold mb-6 text-lg text-primary">Boletín Financiero</h5>
                     <p className="text-text-muted mb-4 text-xs">Información de mercados y tasas de interés.</p>
                     <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                         <input 
                            type="email" 
                            placeholder="Tu correo corporativo" 
                            className="w-full px-4 py-3 bg-secondary border border-primary/10 rounded-lg text-text-main placeholder-text-muted focus:outline-none focus:border-primary transition-colors"
                         />
                         <button className="w-full bg-primary hover:bg-accent text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                             Suscribirse <ArrowRight className="w-4 h-4" />
                         </button>
                     </form>
                 </div>
             </div>

             <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-muted">
                 <p>© 2024 Pro Credit. Todos los derechos reservados.</p>
                 <div className="flex gap-6 mt-4 md:mt-0 items-center">
                     <a href="https://www.facebook.com/lau.por.siempre.922203?locale=es_LA" target="_blank" className="hover:text-primary flex items-center gap-1 group">
                        <Facebook className="w-4 h-4 group-hover:text-primary transition-colors" /> Facebook
                     </a>
                     <a href="#" className="hover:text-primary">Política de Privacidad</a>
                     <a href="#" className="hover:text-primary">Términos y Condiciones</a>
                 </div>
             </div>
        </footer>

        {/* Scroll to Top Button */}
        <button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-white text-primary rounded-full shadow-lg hover:-translate-y-1 transition-transform z-40 opacity-80 hover:opacity-100 border border-primary/25"
            aria-label="Volver arriba"
        >
            <ArrowUp className="w-6 h-6" />
        </button>

        {/* Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-primary/10">
               <button 
                 onClick={() => setShowInfoModal(false)}
                 className="absolute top-4 right-4 p-2 rounded-full bg-primary/5 text-text-muted hover:text-primary transition-colors z-10"
               >
                 <X className="w-6 h-6" />
               </button>
               
               <div className="prose max-w-none text-text-muted">
                 <h2 className="text-2xl font-bold text-primary mb-4">¿Qué son las casas de empeño?</h2>
                 <p className="mb-4 leading-relaxed">
                   Empecemos por la definición. Las casas de empeño son entidades privadas cuyo modelo de negocio se basa en prestar dinero de forma inmediata a sus clientes a través de lo que se conoce como un <strong>préstamo prendario</strong>.
                 </p>
                 
                 <div className="bg-primary/5 p-4 rounded-xl border-l-4 border-primary mb-6">
                    <p className="text-sm italic">
                      "Un préstamo prendario es un préstamo cuya garantía es un bien con valor. Por ejemplo, una joya, un reloj de oro, antigüedades, un aparato electrónico, un automóvil e incluso un local o una vivienda."
                    </p>
                 </div>

                 <p className="mb-6">
                    Actualmente son muy populares como garantía los smartphones, las tablets, los ordenadores y los ebooks. Muchas casas de empeño se han especializado en un tipo concreto de bien (solo oro, solo antigüedades), pero predominan las generalistas que aceptan cualquier tipo de producto.
                 </p>

                 <h2 className="text-2xl font-bold text-primary mb-4">¿Cómo funcionan?</h2>
                 <p className="mb-4">
                   El funcionamiento es bastante sencillo. Cualquier persona mayor de edad puede acudir y presentar el bien a empeñar. Un responsable valorará el estado para determinar su valor y la cuantía del préstamo.
                 </p>
               </div>

               <div className="mt-8 text-center border-t border-slate-100 pt-5">
                  <button 
                    onClick={() => setShowInfoModal(false)}
                    className="bg-primary hover:bg-accent text-white font-bold py-3 px-8 rounded-full transition-colors"
                  >
                    Entendido
                  </button>
               </div>
            </div>
          </div>
        )}

        {/* Welcome Modal Popup */}
        {showWelcomeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in-up">
            <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden relative shadow-2xl border-4 border-primary/40 flex flex-col transform transition-all duration-300">
               {/* Close cross in top right corner */}
               <button 
                 onClick={() => setShowWelcomeModal(false)}
                 className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors z-[110] border border-white/20 shadow-md"
                 title="Cerrar"
               >
                 <X className="w-4 h-4 font-black" />
               </button>
               
               {/* Clickable Image (Redirects to loan verify in new tab and model closes) */}
               <a 
                 href="https://pro-credit-verificar.vercel.app/"
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={() => setShowWelcomeModal(false)}
                 className="relative w-full overflow-hidden bg-slate-950 group cursor-pointer block text-center"
               >
                 <img 
                   src="https://i.ibb.co/Dg7k9zzW/Whats-App-Image-2026-05-29-at-15-12-53.jpg" 
                   alt="Anuncio Especial Pro Credit" 
                   className="w-full h-auto max-h-[55vh] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                   referrerPolicy="no-referrer"
                 />
                 
                 {/* Decorative Pulse Banner at the top of image */}
                 <div className="absolute top-3 left-3 bg-primary text-black text-[9px] font-black px-2.5 py-1 rounded-full shadow-md animate-pulse">
                   ¡NOTIFICACIÓN!
                 </div>
               </a>

               {/* Action buttons area */}
               <div className="p-4 bg-white flex flex-col gap-2 border-t border-slate-100">
                  <a 
                    href="https://pro-credit-verificar.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowWelcomeModal(false)}
                    className="w-full bg-gradient-to-r from-amber-400 to-highlight hover:from-amber-500 hover:to-orange-600 text-black font-black py-3 px-5 rounded-xl shadow-lg shadow-highlight/20 text-center tracking-wider flex items-center justify-center gap-1.5 animate-heartbeat text-xs border border-amber-300"
                  >
                    <ShieldCheck className="w-4 h-4 text-black animate-pulse" fill="currentColor" />
                    VERIFICAR MI PRÉSTAMO
                  </a>

                  <a 
                    href="https://drive.google.com/file/d/1MyKQyAyI9czhpL369G1ssjP0r-Oo53m8/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowWelcomeModal(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3 px-5 rounded-xl shadow-lg text-center flex items-center justify-center gap-1.5 text-xs transition-all hover:scale-[1.01] border border-blue-500 mt-1"
                  >
                    <Smartphone className="w-4 h-4 text-white animate-bounce" />
                    DESCARGAR E INSTALAR APP
                  </a>

                  <button 
                    onClick={() => setShowWelcomeModal(false)}
                    className="w-full py-2 px-5 rounded-xl text-slate-600 hover:text-black font-bold text-xs bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
                  >
                    CERRAR Y NAVEGAR NORMAL
                  </button>
               </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;