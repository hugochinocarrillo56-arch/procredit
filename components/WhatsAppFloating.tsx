import React, { useState } from 'react';
import { MessageCircle, Phone, X, MessageSquare } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_PHONE_SECONDARY } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openWhatsApp = (phone: string) => {
    const url = `https://wa.me/${phone}?text=Hola,%20vengo%20de%20la%20página%20web.%20Me%20gustaría%20recibir%20información%20sobre%20los%20préstamos.`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-2 border-green-500/20 p-5 w-72 mb-4 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h3 className="font-black text-slate-800 text-sm tracking-tight uppercase">Chat WhatsApp</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-red-500 transition-colors bg-slate-100 p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-slate-500 font-bold mb-4 px-1 leading-relaxed">
              Hola 👋 ¿En qué podemos ayudarte hoy? Elige una línea:
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => openWhatsApp(WHATSAPP_PHONE)}
                className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 rounded-2xl border-2 border-green-200/30 hover:border-green-400 transition-all group relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left relative z-10">
                  <span className="block text-xs font-black text-[#075E54] uppercase tracking-tighter">Línea Principal</span>
                  <span className="block text-[10px] text-green-700 font-bold">Atención de Préstamos</span>
                </div>
              </button>

              <button
                onClick={() => openWhatsApp(WHATSAPP_PHONE_SECONDARY)}
                className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-green-50 rounded-2xl border-2 border-slate-200/50 hover:border-green-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-green-500 group-hover:text-white transition-all group-hover:scale-110">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-black text-slate-800 uppercase tracking-tighter">Línea Auxiliar</span>
                  <span className="block text-[10px] text-slate-500 font-bold">Información General</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {/* Extreme pulsing effect with new custom animation */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-whatsapp-pulse opacity-50 scale-110"></div>
        <div className="absolute -inset-1 bg-white/30 rounded-full blur-md group-hover:blur-xl transition-all"></div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 w-20 h-20 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-500 transform hover:scale-110 active:scale-95 animate-whatsapp-pulse ${
            isOpen ? 'bg-slate-900 text-white rotate-[360deg]' : 'bg-[#25D366] text-white'
          }`}
        >
          {isOpen ? (
            <X className="w-10 h-10" />
          ) : (
            <div className="relative">
              <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default WhatsAppFloating;
