import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Calculator } from './components/Calculator';
import { LoanSimulator } from './components/LoanSimulator';
import { ContactForm } from './components/ContactForm';
import { FAQ } from './components/FAQ';
import { ServiceView } from './components/ServiceView';
import { 
  Menu, Moon, Sun, PlayCircle, ArrowRight, CheckCircle, MapPin, Phone, ArrowUp, Landmark, 
  Gem, Car, Smartphone, Watch, Palette, Shield, Repeat, Banknote, Percent, CalendarClock, X,
  Calculator as CalculatorIcon, DollarSign, Users
} from 'lucide-react';

// Data for dynamic pages - Updated to Bolivianos (Bs.)
const SERVICE_DATA: Record<string, any> = {
  joyeria: {
    title: "Empeño de Alta Joyería",
    subtitle: "Valoramos tus tesoros",
    description: "Obtén el avalúo más alto del mercado por tus piezas de oro, diamantes y piedras preciosas. Tasadores certificados GIA.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1920&q=80",
    features: ["Avalúo gemológico certificado gratuito", "Resguardo en bóveda bancaria asegurada", "Hasta el 95% del valor comercial", "Sin límite de monto en préstamo"],
    requirements: ["Documento de Identidad (C.I.) vigente", "La pieza de joyería para avalúo físico", "Certificados de autenticidad (opcional, mejora el valor)"]
  },
  autos: {
    title: "Empeño de Autos",
    subtitle: "Liquidez sobre ruedas",
    description: "Convierte tu vehículo en efectivo inmediato. Ofrecemos modalidades de resguardo o 'síguelo manejando' con GPS.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80",
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
  relojes: {
    title: "Relojes de Alta Gama",
    subtitle: "Precisión y Valor",
    description: "Aceptamos marcas como Rolex, Patek Philippe, Audemars Piguet, Cartier y más. Expertos en horología a tu servicio.",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1920&q=80",
    features: ["Tasación experta internacional", "Seguro al 100% del valor", "Mantenimiento básico incluido", "Privacidad absoluta"],
    requirements: ["Reloj físico para inspección", "Documento de Identidad (C.I.)", "Caja y papeles originales (incrementan el valor de tasación)"]
  },
  electronicos: {
    title: "Empeño de Electrónicos",
    subtitle: "Tecnología por efectivo",
    description: "Aceptamos laptops (MacBook, Alienware), cámaras profesionales, consolas de última generación y celulares de gama alta.",
    image: "https://images.unsplash.com/photo-1468495244187-d43f4683c4bb?auto=format&fit=crop&w=1920&q=80",
    features: ["Borrado de datos seguro (opcional)", "Almacenamiento anti-estático", "Préstamos rápidos desde Bs. 1,400", "Renovación mensual ilimitada"],
    requirements: ["Equipo completo con cargador original", "Batería con carga para pruebas", "Sin cuentas bloqueadas (iCloud/Google)", "Documento de Identidad (C.I.)"]
  },
  arte: {
    title: "Arte y Antigüedades",
    subtitle: "Coleccionismo inteligente",
    description: "Financiamiento respaldado por obras de arte, esculturas y antigüedades certificadas. Valoramos la historia de tus piezas.",
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=1920&q=80",
    features: ["Consultores de arte especializados", "Transporte blindado especializado", "Condiciones de humedad controlada", "Contratos flexibles"],
    requirements: ["Obra física o fotografías de alta resolución (pre-evaluación)", "Certificado de autenticidad o procedencia", "Tasación previa (si la tuviera)", "Documento de Identidad (C.I.)"]
  },
  banca: {
    title: "Banca Comunal",
    subtitle: "Crecimiento Grupal",
    description: "Créditos grupales diseñados para emprendedores que buscan crecer juntos. Sin garantía individual, respaldados por la solidaridad.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=1920&q=80",
    features: ["Tasas de interés reducidas", "Capacitación financiera gratuita", "Premios por puntualidad", "Ciclos de renovación rápida"],
    requirements: ["Grupo mínimo de 5 personas", "Fotocopia de C.I. de cada integrante", "Factura de luz o agua del domicilio", "Tener un negocio propio o actividad económica"]
  },
  garantia: {
    title: "Crédito con Garantía",
    subtitle: "El estándar ProCredit",
    description: "Nuestro producto estrella. Un préstamo personal respaldado por tus activos físicos, combinando lo mejor de la banca y el empeño.",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1920&q=80",
    features: ["Combinación de garantías aceptada", "Aprobación en 24 horas", "Intereses sobre saldos insolutos", "Sin penalización por prepago"],
    requirements: ["Documento de Identidad (C.I.) vigente", "Avalúo de la garantía (realizado por nosotros)", "Comprobante de ingresos (opcional, mejora tasa)"]
  },
  micro: {
    title: "Microcrédito Solidario",
    subtitle: "Apoyo Emprendedor",
    description: "Pequeños créditos para grandes sueños. Diseñados para impulsar tu negocio desde el primer día.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1920&q=80",
    features: ["Mínimos requisitos", "Aprobación inmediata", "Sin garantía prendaria", "Plazos semanales o quincenales"],
    colorClass: "text-green-600 bg-green-50",
    requirements: ["Cédula de Identidad Vigente", "Aviso de Cobranza de Luz o Agua", "Croquis del Domicilio y Negocio", "Garante Personal (si aplica)"]
  }
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'loan' | 'pawn'>('loan');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    setActiveTab('loan');
    // Pequeño timeout para asegurar que el cambio de tab se procese si fuera necesario
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

  const handleWhatsAppClick = () => {
      window.open('https://wa.me/59162327873', '_blank');
  };

  // Render content based on current view
  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <>
        {/* Hero Section */}
        <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Transacción Bancaria Segura" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent dark:from-black dark:to-transparent mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 max-w-5xl">
            <div className="animate-fade-in-up">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 flex items-center gap-2">
                    <Landmark className="text-secondary w-5 h-5" />
                    <span className="text-white font-bold text-xs uppercase tracking-wider">Respaldo Bancario</span>
                  </span>
                  <span className="bg-primary/90 p-2 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/20">
                    <CheckCircle className="text-white w-5 h-5" />
                    <span className="text-white font-bold text-xs uppercase tracking-wider">Garantía Prendaria</span>
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl">
                  TU PRÉSTAMO <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white relative inline-block">
                    INMEDIATO Y SEGURO
                  </span>
                </h1>
                
                <p className="text-gray-200 text-lg md:text-xl max-w-xl leading-relaxed mb-10 drop-shadow-lg font-light">
                  Obtén la liquidez de un banco con la facilidad de un empeño. Aceptamos vehículos, joyas y electrónicos bajo los más estrictos estándares de seguridad bancaria.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={scrollToCalculator}
                    className="bg-primary hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-[0_10px_20px_rgba(227,28,88,0.4)] transform hover:scale-105 transition-all flex items-center group"
                  >
                    SIMULAR CRÉDITO
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setShowInfoModal(true)}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold py-4 px-8 rounded-full transition-all border border-white/30 flex items-center"
                  >
                    <PlayCircle className="mr-2 w-5 h-5" /> Cómo Funciona
                  </button>
                </div>
            </div>
          </div>

          {/* Decorative Shape */}
          <div className="absolute bottom-0 right-0 hidden lg:block">
            <svg width="250" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 100 L100 0 V100 H0 Z" fill="#E31C58" fillOpacity="0.9" />
            </svg>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 relative -mt-24 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Column (Content & Calculator) */}
                <div className="lg:col-span-8 space-y-12">
                    
                    {/* Quienes Somos Section - NEW */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-10 -mt-10 blur-2xl transition-all group-hover:bg-primary/10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full -ml-8 -mb-8 blur-2xl"></div>

                        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                            <div className="w-full md:w-3/5 space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
                                    <Users className="w-3 h-3" />
                                    Sobre Nosotros
                                </div>
                                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                                    ¿Quiénes <span className="text-primary">Somos?</span>
                                </h2>
                                <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed space-y-3 text-justify">
                                    <p>
                                        Desde 2024, nacimos en la ciudad de La Paz, en plena <strong>Av. Cardos Santos</strong>, apoyando a las familias y emprendedores, razón por la cual se debe nuestro nombre <strong>“Pro Credit”</strong>.
                                    </p>
                                    <p>
                                        Somos la mano amiga para muchos emprendedores que requieren un crédito de forma rápida y sencilla, <strong>sin complicaciones ni extenuantes requisitos</strong>.
                                    </p>
                                    <p>
                                        Tenemos presencia en 2 ciudades con sucursales estratégicas en la ciudad de <strong>Potosí</strong> y en la ciudad de <strong>La Paz</strong>. Son 2 años que respaldan nuestra solidez y confianza.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-2/5">
                                <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 rotate-2 hover:rotate-0 transition-all duration-500">
                                    <img 
                                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                        alt="Equipo Pro Credit" 
                                        className="w-full h-48 md:h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                         <p className="text-white font-bold text-xs md:text-sm">Compromiso y Solidez</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Intro Section Card */}
                    <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-lg h-64 group">
                                <img 
                                    src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                    alt="Joyas y Valores" 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur text-gray-900 dark:text-white font-bold px-4 py-2 rounded-lg text-sm shadow-md flex items-center gap-2">
                                    <CheckCircle className="text-secondary w-4 h-4" /> Avalúo Certificado
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                    Solvencia financiera <br/>
                                    <span className="text-primary">al instante</span>
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                                    Transformamos tus activos en capital de trabajo inmediato. Operamos con la transparencia de un banco y la agilidad que tu negocio necesita.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Contratos regulados por la SBS", 
                                        "Bóvedas de seguridad bancaria", 
                                        "Tasas de interés preferenciales"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center text-gray-600 dark:text-gray-400 text-sm font-medium">
                                            <div className="bg-secondary/10 p-1.5 rounded-full mr-3">
                                                <Landmark className="text-secondary w-4 h-4" />
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
                            <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl inline-flex gap-1 shadow-inner">
                                <button 
                                    onClick={() => setActiveTab('loan')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                                        activeTab === 'loan' 
                                        ? 'bg-white dark:bg-gray-700 text-secondary shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                >
                                    <DollarSign className="w-4 h-4" />
                                    Simular Préstamo
                                </button>
                                <button 
                                    onClick={() => setActiveTab('pawn')}
                                    className={`px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                                        activeTab === 'pawn' 
                                        ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' 
                                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
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
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                        <Gem className="text-primary w-6 h-6" />
                        Activos que Aceptamos
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                          {[
                            { id:'joyeria', title: "Alta Joyería", subtitle: "Oro, Diamantes, Rolex", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80", icon: <Gem /> },
                            { id:'autos', title: "Vehículos", subtitle: "Autos, Motos, Camiones", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80", icon: <Car /> },
                            { id:'electronicos', title: "Tecnología", subtitle: "Laptops, Alta Gama", img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80", icon: <Smartphone /> },
                            { id:'inmuebles', title: "Inmuebles", subtitle: "Propiedades Libres", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80", icon: <Landmark /> }
                          ].map((cat, i) => (
                            <div key={i} onClick={() => handleNavigation(cat.id)} className="group relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-md">
                              <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                              <div className="absolute bottom-0 left-0 p-4 w-full">
                                <div className="flex items-center gap-2 text-white mb-1">
                                  {React.cloneElement(cat.icon as React.ReactElement, { className: "w-4 h-4 text-secondary" })}
                                  <span className="font-bold text-sm">{cat.title}</span>
                                </div>
                                <p className="text-[10px] text-gray-300">{cat.subtitle}</p>
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
                             <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-secondary transition-all hover:shadow-md group cursor-pointer flex gap-4 items-start">
                                 <div className="w-10 h-10 rounded-full bg-secondary/10 flex-shrink-0 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                                     {feat.icon}
                                 </div>
                                 <div>
                                    <h4 className="text-base font-bold text-gray-800 dark:text-white mb-1">{feat.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
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

                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center">
                            <div className="bg-primary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="text-primary w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Red de Sucursales</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                                Acércate a cualquiera de nuestras agencias para un avalúo formal gratuito y confidencial.
                            </p>
                            <a 
                                href="https://maps.app.goo.gl/FV4hFBpEz578fU796" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
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

    // Default Fallback
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Sección en Construcción</h2>
        <p className="text-gray-500 mb-6">Estamos trabajando en esta sección.</p>
        <button onClick={() => handleNavigation('home')} className="bg-primary text-white px-6 py-3 rounded-lg">Volver al Inicio</button>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        currentView={currentView}
        onNavigate={handleNavigation}
      />

      {/* Main Content */}
      <main className="flex-1 md:ml-72 transition-all duration-300 relative">
        
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center shadow-sm">
           <button onClick={toggleSidebar} className="p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
             <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
           </button>
           <span className="font-bold text-gray-800 dark:text-white">PRO CREDIT</span>
           <button onClick={toggleDarkMode} className="p-2 -mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
             {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
           </button>
        </div>

        {/* Desktop Theme Toggle (Floating) */}
        <button 
          onClick={toggleDarkMode}
          className="hidden md:flex fixed top-6 right-6 z-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
        </button>

        {renderContent()}

        {/* Call to Action Banner (Always visible at bottom) */}
        <div className="bg-primary py-16 px-6 relative overflow-hidden">
             {/* Background Pattern */}
             <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/2 pointer-events-none">
                 <svg width="600" height="600" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                     <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z" />
                 </svg>
             </div>

             <div className="max-w-4xl mx-auto text-center relative z-10">
                 <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 uppercase tracking-tight">
                    ¿Requieres asistencia personalizada?
                 </h2>
                 <a 
                    href="https://wa.me/59162327873" 
                    target="_blank"
                    className="inline-flex items-center bg-secondary hover:bg-teal-600 text-white font-bold py-5 px-12 rounded-full shadow-2xl transition-all transform hover:scale-110 text-xl md:text-2xl"
                 >
                    <Phone className="mr-3 w-6 h-6" /> +591 623 27873
                 </a>

                 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
                     <a 
                        href="https://maps.app.goo.gl/FV4hFBpEz578fU796" 
                        target="_blank"
                        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors block cursor-pointer"
                     >
                         <h4 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                            <Landmark className="w-5 h-5" /> ATENCIÓN EN AGENCIA
                         </h4>
                         <p className="text-white/80 text-sm">Haz clic aquí para ver nuestra ubicación en Google Maps.</p>
                     </a>
                     
                     <a 
                        href="https://wa.me/59162327873" 
                        target="_blank"
                        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors block cursor-pointer"
                     >
                         <h4 className="text-secondary font-bold text-lg mb-2 flex items-center gap-2">
                             <Phone className="w-5 h-5" /> LÍNEA PREFERENCIAL
                         </h4>
                         <p className="text-white/80 text-sm">Haz clic aquí para chatear directamente con nosotros.</p>
                     </a>
                 </div>
             </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-black text-white pt-20 pb-10 px-6 text-sm border-t border-gray-700">
             <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                 <div className="space-y-6">
                     <div className="flex items-center gap-2">
                         <div className="bg-white p-1.5 rounded">
                            <div className="bg-primary w-6 h-6 rounded-sm"></div>
                         </div>
                         <span className="font-bold text-2xl tracking-tight">PRO CREDIT</span>
                     </div>
                     <p className="text-gray-400 leading-relaxed max-w-xs">
                         Av. Financiera N°5411, Torre Central.<br />Soluciones financieras con garantía real.
                     </p>
                     <div className="pt-2">
                         <span className="inline-block px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300 border border-gray-600">Entidad Supervisada por la SBS</span>
                     </div>
                 </div>

                 <div>
                     <h5 className="font-bold mb-6 text-lg text-white">Nosotros</h5>
                     <ul className="space-y-3 text-gray-400">
                         {['Gobierno Corporativo', 'Transparencia', 'Inversionistas', 'Trabaja con Nosotros'].map(link => (
                             <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                         ))}
                     </ul>
                 </div>

                 <div>
                     <h5 className="font-bold mb-6 text-lg text-white">Productos</h5>
                     <ul className="space-y-3 text-gray-400">
                         {['Crédito Joyas', 'Crédito Vehicular', 'Crédito Maquinaria', 'Tasaciones'].map(link => (
                             <li key={link}><a href="#" className="hover:text-primary transition-colors">{link}</a></li>
                         ))}
                     </ul>
                 </div>

                 <div>
                     <h5 className="font-bold mb-6 text-lg text-white">Boletín Financiero</h5>
                     <p className="text-gray-400 mb-4 text-xs">Información de mercados y tasas de interés.</p>
                     <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                         <input 
                            type="email" 
                            placeholder="Tu correo corporativo" 
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                         />
                         <button className="w-full bg-primary hover:bg-white hover:text-primary text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                             Suscribirse <ArrowRight className="w-4 h-4" />
                         </button>
                     </form>
                 </div>
             </div>

             <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                 <p>© 2024 Pro Credit. Todos los derechos reservados.</p>
                 <div className="flex gap-6 mt-4 md:mt-0">
                     <a href="#" className="hover:text-white">Política de Privacidad</a>
                     <a href="#" className="hover:text-white">Términos y Condiciones</a>
                     <a href="#" className="hover:text-white">Seguridad</a>
                 </div>
             </div>
        </footer>

        {/* Scroll to Top Button */}
        <button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-gray-800 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg hover:-translate-y-1 transition-transform z-40 opacity-80 hover:opacity-100"
            aria-label="Volver arriba"
        >
            <ArrowUp className="w-6 h-6" />
        </button>

        {/* Info Modal */}
        {showInfoModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl border border-gray-200 dark:border-gray-700">
               <button 
                onClick={() => setShowInfoModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-red-500 transition-colors z-10"
               >
                 <X className="w-6 h-6" />
               </button>
               
               <div className="prose dark:prose-invert max-w-none">
                 <h2 className="text-2xl font-bold text-primary mb-4">¿Qué son las casas de empeño?</h2>
                 <p className="mb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                   Empecemos por la definición. Las casas de empeño son entidades privadas cuyo modelo de negocio se basa en prestar dinero de forma inmediata a sus clientes a través de lo que se conoce como un <strong>préstamo prendario</strong>.
                 </p>
                 
                 <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border-l-4 border-secondary mb-6">
                    <p className="text-sm italic text-gray-600 dark:text-gray-300">
                      "Un préstamo prendario es un préstamo cuya garantía es un bien con valor. Por ejemplo, una joya, un reloj de oro, antigüedades, un aparato electrónico, un automóvil e incluso un local o una vivienda."
                    </p>
                 </div>

                 <p className="mb-6 text-gray-600 dark:text-gray-300">
                    Actualmente son muy populares como garantía los smartphones, las tablets, los ordenadores y los ebooks. Muchas casas de empeño se han especializado en un tipo concreto de bien (solo oro, solo antigüedades), pero predominan las generalistas que aceptan cualquier tipo de producto.
                 </p>

                 <h2 className="text-2xl font-bold text-primary mb-4">¿Cómo funcionan?</h2>
                 <p className="mb-4 text-gray-600 dark:text-gray-300">
                   El funcionamiento es bastante sencillo. Cualquier persona mayor de edad puede acudir y presentar el bien a empeñar. Un responsable valorará el estado para determinar su valor y la cuantía del préstamo.
                 </p>

                 <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Factores de valoración:</h3>
                 <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                   <li><strong>El estado general:</strong> Se comprueba el estado físico, si faltan piezas y si funciona correctamente (fundamental para una futura venta).</li>
                   <li><strong>La demanda del producto:</strong> Los productos que se venden rápido se valoran más que los difíciles de colocar en el mercado.</li>
                 </ul>

                 <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
                   <p className="text-sm text-gray-600 dark:text-gray-300">
                     Si ambas partes están de acuerdo, se firma un contrato donde todo queda por escrito (interés, plazos, condiciones de recuperación). En ausencia de contratiempos, una operación de este tipo se cierra en muy poco tiempo, consiguiendo dinero <strong>sin papeleo ni trámites burocráticos en apenas una hora</strong>.
                   </p>
                 </div>
               </div>

               <div className="mt-8 text-center">
                  <button 
                    onClick={() => setShowInfoModal(false)}
                    className="bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
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