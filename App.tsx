import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { Calculator } from './components/Calculator';
import { LoanSimulator } from './components/LoanSimulator';
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
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1920&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1920&q=80",
    features: ["Montos desde Bs. 350,000", "Plazos de hasta 10 años", "Sin buró de crédito estricto", "Notarización ágil y segura"],
    enableLocation: true,
    requirements: ["Título de propiedad registrado en Derechos Reales", "Folio Real actualizado (Alodial)", "Plano Catastral aprobado", "Impuestos pagados de la última gestión", "C.I. del propietario y cónyuge (si aplica)"]
  },
  electronicos: {
    title: "Empeño de Electrónicos",
    subtitle: "Tecnología por efectivo",
    description: "Aceptamos laptops (MacBook, Alienware), cámaras profesionales, consolas de última generación y celulares de gama alta.",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1920&auto=format&fit=crop",
    features: ["Borrado de datos seguro (opcional)", "Almacenamiento anti-estático", "Préstamos rápidos desde Bs. 1,400", "Renovación mensual ilimitada"],
    requirements: ["Equipo completo con cargador original", "Batería con carga para pruebas", "Sin cuentas bloqueadas (iCloud/Google)", "Documento de Identidad (C.I.)"]
  },
  banca: {
    title: "Banca Comunal",
    subtitle: "Crecimiento Grupal",
    description: "Créditos grupales diseñados para emprendedores que buscan crecer juntos. Sin garantía individual, respaldados por la solidaridad.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=1920&auto=format&fit=crop",
    features: ["Tasas de interés reducidas", "Capacitación financiera gratuita", "Premios por puntualidad", "Ciclos de renovación rápida"],
    requirements: ["Grupo mínimo de 5 personas", "Fotocopia de C.I. de cada integrante", "Factura de luz o agua del domicilio", "Tener un negocio propio o actividad económica"]
  },
  garantia: {
    title: "Crédito con Garantía",
    subtitle: "El estándar ProCredit",
    description: "Nuestro producto estrella. Un préstamo personal respaldado por tus activos físicos, combinando lo mejor de la banca y el empeño.",
    image: "https://images.unsplash.com/photo-1626265774643-f1943311a86b?q=80&w=1920&auto=format&fit=crop",
    features: ["Combinación de garantías aceptada", "Aprobación en 24 horas", "Intereses sobre saldos insolutos", "Sin penalización por prepago"],
    requirements: ["Documento de Identidad (C.I.) vigente", "Avalúo de la garantía (realizado por nosotros)", "Comprobante de ingresos (opcional, mejora tasa)"]
  },
  micro: {
    title: "Microcrédito Solidario",
    subtitle: "Apoyo Emprendedor",
    description: "Pequeños créditos para grandes sueños. Diseñados para impulsar tu negocio desde el primer día.",
    image: "https://scontent.flpb2-2.fna.fbcdn.net/v/t1.6435-9/75237511_2307915295981403_5981626641338597376_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=L1WGOSrHEcgQ7kNvwGeSmXK&_nc_oc=Adm6LZgvTnHeyP090T-798Fn4MSVbEIWpwdZcbnTOr1Nt3h8QfQWul4iLN2WBgmV__M_0rChuJdO8NdPK7ddzLML&_nc_zt=23&_nc_ht=scontent.flpb2-2.fna&_nc_gid=-jzJjz9Md0Cge3DWzGVV1Q&oh=00_Afp5wySwOVnde4FYAiLM0WDzxmIttbMqhTbNF8fcoCb4bw&oe=69995F09",
    features: ["Mínimos requisitos", "Aprobación inmediata", "Sin garantía prendaria", "Plazos semanales o quincenales"],
    colorClass: "text-cyan-400 bg-cyan-400/10",
    requirements: ["Cédula de Identidad Vigente", "Aviso de Cobranza de Luz o Agua", "Croquis del Domicilio y Negocio", "Garante Personal (si aplica)"]
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
  const [activeTab, setActiveTab] = useState<'loan' | 'pawn'>('loan');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://i.ibb.co/60TrSSQn/484348315-122123947544616809-8652967539908385468-n.jpg",
    "https://i.ibb.co/KxCFxYZV/484387942-122123947844616809-485915212088624553-n-1.jpg"
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
    setActiveTab('loan');
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
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Main complete image */}
              <img 
                src={img} 
                alt={`Hero Image ${index + 1}`} 
                className="absolute inset-0 w-full h-full object-contain md:object-cover z-10"
              />
            </div>
          ))}
        </div>

        {/* Hero Content - Now below the images for full visibility */}
        <div className="bg-background-light pt-6 pb-12 md:py-10 px-6 md:px-16 max-w-7xl mx-auto">
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
                <button 
                  onClick={scrollToCalculator}
                  className="bg-primary hover:bg-accent text-black font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg transform hover:scale-105 transition-all flex items-center justify-center group text-sm md:text-base"
                >
                  SIMULAR CRÉDITO
                  <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="https://pro-credit-verificar.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-highlight hover:bg-orange-600 text-black font-extrabold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg shadow-highlight/40 border-2 border-highlight hover:border-orange-600 transform hover:scale-105 transition-all flex items-center justify-center group text-sm md:text-base animate-pulse-subtle"
                >
                  <ShieldCheck className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                  VERIFICAR MI PRÉSTAMO
                </a>
                <button 
                  onClick={() => setShowInfoModal(true)}
                  className="bg-white hover:bg-secondary text-primary font-bold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all border border-primary/20 flex items-center justify-center shadow-lg text-sm md:text-base"
                >
                  <PlayCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" /> Cómo Funciona
                </button>
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
                                        "Contratos regulados por la SBS", 
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
                        <div className="flex items-center justify-center mb-6">
                            <div className="bg-surface-light p-1.5 rounded-xl inline-flex gap-1 shadow-blue-glow border border-primary/10">
                                <button 
                                    onClick={() => setActiveTab('loan')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                                        activeTab === 'loan' 
                                        ? 'bg-primary text-black shadow-md' 
                                        : 'text-text-muted hover:text-primary hover:bg-primary/5'
                                    }`}
                                >
                                    <DollarSign className="w-4 h-4" />
                                    Simular Préstamo
                                </button>
                                <button 
                                    onClick={() => setActiveTab('pawn')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                                        activeTab === 'pawn' 
                                        ? 'bg-primary text-black shadow-md' 
                                        : `text-text-muted hover:text-primary hover:bg-primary/5 ${activeTab === 'loan' ? 'animate-heartbeat text-primary' : ''}`
                                    }`}
                                >
                                    <CalculatorIcon className="w-4 h-4" />
                                    Cotizar Empeño
                                </button>
                            </div>
                        </div>

                        {activeTab === 'loan' ? (
                            <div className="animate-fade-in-up">
                                <LoanSimulator />
                            </div>
                        ) : (
                            <div className="animate-fade-in-up">
                                <Calculator />
                            </div>
                        )}
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
                            { id:'autos', title: "Vehículos", subtitle: "Autos, Motos, Camiones", img: "https://abyayala.tv.bo/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-06-at-17.51.19.jpeg", icon: <Car /> },
                            { id:'electronicos', title: "Tecnología", subtitle: "Laptops, Alta Gama", img: "https://www.pub.eldiario.net/noticias/2015/2015_11/nt151109/f_2015-11-09_15.jpg", icon: <Smartphone /> },
                            { id:'inmuebles', title: "Inmuebles", subtitle: "Propiedades Libres", img: "https://www.bienesonline.com/bolivia/photos/de-ocasion-venta-de-terreno-11510535847.jpg", icon: <Landmark /> }
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
            className="fixed bottom-6 right-6 p-3 bg-white text-primary rounded-full shadow-lg hover:-translate-y-1 transition-transform z-40 opacity-80 hover:opacity-100 border border-primary/20"
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

               <div className="mt-8 text-center">
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

      </main>
    </div>
  );
};

export default App;