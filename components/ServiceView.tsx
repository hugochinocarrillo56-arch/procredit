import React from 'react';
import { ArrowRight, CheckCircle, ShieldCheck, Phone, ChevronLeft, FileText } from 'lucide-react';
import { Calculator } from './Calculator';

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
  const openWhatsApp = () => {
      window.open('https://wa.me/59162327873', '_blank');
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
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-4xl mx-auto">
          <button 
            onClick={onBack}
            className="absolute top-8 left-6 md:left-12 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all text-sm font-bold border border-white/20"
          >
            <ChevronLeft className="w-4 h-4" /> Volver al Inicio
          </button>

          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2">{subtitle}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl leading-relaxed">
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
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Beneficios Exclusivos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className={`mt-1 p-2 rounded-full bg-gray-50 dark:bg-gray-700 ${colorClass}`}>
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-white mb-1">Ventaja {idx + 1}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl flex gap-4 items-center border border-blue-100 dark:border-blue-800">
              <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 dark:text-blue-300">Garantía de Seguridad Total</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                  Tus bienes son resguardados en bóvedas de alta seguridad o estacionamientos privados con vigilancia 24/7. Póliza de seguro incluida.
                </p>
              </div>
            </div>

            {/* Requirements */}
            <div>
               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                 <FileText className="w-6 h-6 text-primary" /> Requisitos para el Trámite
               </h3>
               <ul className="space-y-3 bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                 {displayRequirements.map((req, idx) => (
                   <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                     <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></span> 
                     <span className="font-medium">{req}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="lg:col-span-5 space-y-8">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 sticky top-8">
                <h3 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">Cotiza tu {title}</h3>
                <Calculator enableLocation={enableLocation} />
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
                  <p className="text-sm text-gray-500 mb-4">¿Prefieres hablar con un experto?</p>
                  <button 
                    onClick={openWhatsApp}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <Phone className="w-5 h-5" /> Hablar con un Asesor
                  </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};