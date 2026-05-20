import React from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, Phone, ChevronLeft, FileText } from 'lucide-react';
import { Calculator } from './Calculator';
import { WHATSAPP_PHONE, WHATSAPP_PHONE_SECONDARY } from '../constants';

interface ServiceViewProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  requirements?: string[];
  onBack: () => void;
  colorClass?: string;
  enableLocation?: boolean;
}

export const ServiceView: React.FC<ServiceViewProps> = ({ 
  title, 
  subtitle, 
  description, 
  image, 
  features, 
  requirements,
  onBack,
  colorClass = "text-primary",
  enableLocation = false
}) => {
  const openWhatsApp = (phone: string = WHATSAPP_PHONE) => {
      window.open(`https://wa.me/${phone}`, '_blank');
  };

  // Lista por defecto si no se pasan requisitos específicos
  const defaultRequirements = [
    "Identificación Oficial Vigente (C.I.)",
    "Factura original o documento de propiedad",
    "Comprobante de domicilio (menor a 3 meses)"
  ];

  const displayRequirements = requirements && requirements.length > 0 ? requirements : defaultRequirements;

  return (
    <div className="animate-fade-in-up">
      {/* Hero Section of the Service */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-b-[3rem] shadow-2xl">
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-4xl mx-auto">
          <button 
            onClick={onBack}
            className="absolute top-8 left-6 md:left-12 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all text-sm font-bold border border-white/20 shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" /> Volver al Inicio
          </button>

          <span className="text-white/90 font-bold tracking-widest uppercase text-sm mb-2 drop-shadow-md">{subtitle}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
            {title}
          </h1>
          <p className="text-white/90 text-lg max-w-2xl leading-relaxed font-medium drop-shadow-md">
            {description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Benefits Grid */}
            <div>
              <h3 className="text-2xl font-bold text-text-main mb-6">Beneficios Exclusivos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-surface-light border border-primary/5 shadow-sm">
                    <div className={`mt-1 p-2 rounded-full bg-primary/5 ${colorClass}`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main mb-1">Ventaja {idx + 1}</h4>
                      <p className="text-sm text-text-muted">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-surface-light p-6 rounded-2xl flex gap-4 items-center border border-primary/20 shadow-sm">
              <ShieldCheck className="w-10 h-10 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-text-main">Garantía de Seguridad Total</h4>
                <p className="text-sm text-text-muted mt-1">
                  Tus bienes son resguardados en bóvedas de alta seguridad o estacionamientos privados con vigilancia 24/7. Póliza de seguro incluida.
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div>
               <h3 className="text-xl font-bold text-text-main mb-4 flex items-center gap-2">
                 <FileText className="w-6 h-6 text-primary" /> Requisitos para el Trámite
               </h3>
               <ul className="space-y-3 bg-surface-light p-6 rounded-2xl border border-primary/5 shadow-sm">
                 {displayRequirements.map((req, idx) => (
                   <li key={idx} className="flex items-start gap-3 text-text-muted">
                     <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span> 
                     <span className="font-medium">{req}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="lg:col-span-5 space-y-8">
             <div className="bg-surface-light p-8 rounded-3xl shadow-xl border border-primary/5 sticky top-8">
                <h3 className="text-xl font-bold text-center mb-6 text-text-main">Cotiza tu {title}</h3>
                <Calculator enableLocation={enableLocation} />
                <div className="mt-6 pt-6 border-t border-primary/10 text-center">
                  <p className="text-sm text-text-muted mb-4">¿Prefieres hablar con un experto?</p>
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => openWhatsApp(WHATSAPP_PHONE)}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-accent transition-colors shadow-lg shadow-primary/20 text-sm"
                    >
                      <Phone className="w-4 h-4" /> Asesor Principal (62327873)
                    </button>
                    <button 
                      onClick={() => openWhatsApp(WHATSAPP_PHONE_SECONDARY)}
                      className="w-full flex items-center justify-center gap-2 bg-[#128C7E] text-white font-bold py-3.5 rounded-xl hover:bg-[#0f7569] transition-colors shadow-lg shadow-emerald-700/20 text-sm"
                    >
                      <Phone className="w-4 h-4" /> Asesor Auxiliar (77274528)
                    </button>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};