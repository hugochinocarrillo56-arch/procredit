import React, { useState } from 'react';
import { Phone, X, Send, Camera, DollarSign, Package, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_PHONE_SECONDARY } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const PAWN_OPTIONS = [
  { id: 'joyas', label: '💎 Joyas / Oro', placeholder: 'Ej. Anillo de oro 18k, 12gr' },
  { id: 'vehiculo', label: '🚗 Vehículo / Auto', placeholder: 'Ej. Toyota Corolla 2018' },
  { id: 'electronico', label: '💻 Laptop / Celular', placeholder: 'Ej. Laptop HP Core i7 16GB' },
  { id: 'inmueble', label: '🏠 Inmueble / Lote', placeholder: 'Ej. Terreno en El Alto' },
  { id: 'otro', label: '📦 Otra prenda', placeholder: 'Descripción del objeto' },
];

const QUICK_AMOUNTS = ['1,000', '3,000', '5,000', '10,000'];

const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  // Form State
  const [monto, setMonto] = useState('');
  const [selectedPawn, setSelectedPawn] = useState('joyas');
  const [descripcion, setDescripcion] = useState('');
  const [selectedPhone, setSelectedPhone] = useState(WHATSAPP_PHONE);

  const activeCategory = PAWN_OPTIONS.find(p => p.id === selectedPawn) || PAWN_OPTIONS[0];

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const labelPawn = activeCategory.label;
    const montoText = monto ? `Bs. ${monto}` : 'A evaluar';
    const detText = descripcion.trim() ? descripcion.trim() : 'Sin descripción adicional';

    const message = `Hola ProCredit 🤝, solicito la evaluación de un préstamo con garantía prendaria:\n\n` +
      `💰 *Monto que necesito:* ${montoText}\n` +
      `📦 *Tipo de prenda:* ${labelPawn}\n` +
      `📝 *Detalles de la prenda:* ${detText}\n\n` +
      `📸 *Nota:* Adjunto fotografías de mi prenda a continuación en este chat para su valoración inmediata.`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${selectedPhone}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-5 md:right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {/* Floating Tooltip Callout */}
        {!isOpen && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3 cursor-pointer group max-w-xs"
            onClick={() => setIsOpen(true)}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md animate-pulse">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-amber-300 leading-tight flex items-center gap-1">
                ¡Cotiza tu préstamo! 💸
              </p>
              <p className="text-[11px] text-slate-300 font-medium">
                Haz clic y envía fotos de tu prenda
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            
            {/* Arrow indicator pointing to WhatsApp button */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-slate-900 rotate-45 border-r border-b border-amber-400/40"></div>
          </motion.div>
        )}

        {/* Modal / Popover Form */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            className="bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border-2 border-green-500/30 w-[92vw] max-w-md mb-2 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[720px]"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white p-4 sm:p-5 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-md shrink-0">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base leading-tight">
                      Evaluación por WhatsApp 📲
                    </h3>
                    <p className="text-xs text-green-100 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping inline-block" />
                      <span>Respuesta inmediata en minutos</span>
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSendWhatsApp} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-slate-800">
              
              {/* Select Line */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedPhone(WHATSAPP_PHONE)}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    selectedPhone === WHATSAPP_PHONE 
                      ? 'bg-white text-green-700 shadow-sm font-extrabold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Línea Principal</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPhone(WHATSAPP_PHONE_SECONDARY)}
                  className={`flex-1 py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    selectedPhone === WHATSAPP_PHONE_SECONDARY 
                      ? 'bg-white text-green-700 shadow-sm font-extrabold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Línea Auxiliar</span>
                </button>
              </div>

              {/* 1. Monto necesitado */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. ¿Cuánto préstamo necesitas? (Bs.)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold">
                    Bs.
                  </div>
                  <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    placeholder="Ej. 3000"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                  />
                </div>
                {/* Quick amount suggestions */}
                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
                  <span className="text-[10px] text-slate-400 font-semibold shrink-0">Sugeridos:</span>
                  {QUICK_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setMonto(amt.replace(',', ''))}
                      className={`text-[11px] px-2 py-0.5 rounded-lg border font-bold transition-all shrink-0 ${
                        monto === amt.replace(',', '')
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Bs. {amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Categoría de Prenda */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  2. ¿Qué prenda deseas empeñar?
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {PAWN_OPTIONS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedPawn(item.id)}
                      className={`p-2 rounded-xl text-xs font-bold text-left border transition-all flex items-center justify-between ${
                        selectedPawn === item.id
                          ? 'bg-green-50 border-green-500 text-green-900 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      {selectedPawn === item.id && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Detalles o descripción de la prenda */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Detalles o modelo de la prenda
                </label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder={activeCategory.placeholder}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white"
                />
              </div>

              {/* Photo Notice Banner */}
              <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-3 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 font-bold shadow-sm">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="text-[11px] leading-relaxed text-amber-950">
                  <span className="font-extrabold block text-amber-900 uppercase">
                    📸 Adjunta fotos en WhatsApp
                  </span>
                  Al presionar el botón abajo, se abrirá el chat. <strong className="underline">Envía las fotografías de tu prenda</strong> para darte una oferta inmediata.
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-green-500 via-emerald-600 to-green-600 hover:from-green-600 hover:to-emerald-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>SOLICITAR EVALUACIÓN POR WHATSAPP</span>
              </button>

              <p className="text-[10px] text-center text-slate-400 font-semibold">
                🔒 Atención confidencial y asesoría personalizada al instante
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button with Heartbeat / Pulsing Animation */}
      <div className="relative group">
        {/* Heartbeat pulse outer ring animations */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-35 pointer-events-none" />
        <div className="absolute -inset-2 bg-[#25D366]/30 rounded-full blur-md animate-pulse pointer-events-none" />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-[0_12px_35px_rgba(37,211,102,0.5)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isOpen 
              ? 'bg-slate-900 text-white rotate-90' 
              : 'bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white animate-heartbeat'
          }`}
          aria-label="Atención por WhatsApp"
        >
          {isOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10 sm:w-12 sm:h-12 fill-current drop-shadow-md">
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
