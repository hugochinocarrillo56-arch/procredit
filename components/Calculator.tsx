import React, { useState, useEffect } from 'react';
import { INTEREST_RATE, INSURANCE_RATE, STORAGE_RATE, WHATSAPP_PHONE, WHATSAPP_PHONE_SECONDARY, EMAIL_CONTACT } from '../constants';
import { ChevronRight, Plus, Minus, Send, FileText, MapPin, Mail, Calendar } from 'lucide-react';

interface CalculatorProps {
  enableLocation?: boolean;
}

export const Calculator: React.FC<CalculatorProps> = ({ enableLocation = false }) => {
  // Valores iniciales en Bolivianos
  const [amountInput, setAmountInput] = useState<string>("1000");
  const [months, setMonths] = useState<number>(1); // Default 1 mes
  const [itemDescription, setItemDescription] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [monthlyInterest, setMonthlyInterest] = useState<number>(0);
  const [totalRedemption, setTotalRedemption] = useState<number>(0);
  
  // Botones de selección rápida
  const monthOptions = [1, 2, 3, 6, 12];

  // Derived number value for calculations
  const amount = Number(amountInput) || 0;

  useEffect(() => {
    // Cálculo de EMPEÑO (Interés Simple)
    // Tasa total = Interés (3%) + Seguro (3.5%) + Depósito (3.5%) = 10%
    const totalRate = INTEREST_RATE + INSURANCE_RATE + STORAGE_RATE;
    
    if (amount > 0) {
        // El costo mensual es solo el interés + seguro
        const monthlyCost = amount * totalRate;
        
        // El total a pagar para recuperar la prenda (Desempeño) es:
        // Capital Original + (Costo Mensual * Número de Meses)
        const totalToRedeem = amount + (monthlyCost * months);

        setMonthlyInterest(monthlyCost);
        setTotalRedemption(totalToRedeem);
    } else {
        setMonthlyInterest(0);
        setTotalRedemption(0);
    }
  }, [amount, months]);

  const handleDecreaseAmount = () => {
    setAmountInput(prev => {
        const val = Number(prev) || 0;
        return Math.max(0, val - 100).toString();
    });
  };

  const handleIncreaseAmount = () => {
    setAmountInput(prev => {
        const val = Number(prev) || 0;
        return Math.min(350000, val + 100).toString();
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
        setAmountInput('');
        return;
    }
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
         if (val > 350000) setAmountInput("350000");
         else setAmountInput(val.toString());
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      if (!isNaN(val) && val > 0) {
          // Límite lógico de meses, ej: 60 meses (5 años)
          setMonths(val > 60 ? 60 : val);
      } else if (e.target.value === '') {
          setMonths(0); // Temporal para permitir borrado, se valida en render o efecto
      }
  };

  const sendToWhatsApp = (phone: string = WHATSAPP_PHONE) => {
    const desc = itemDescription ? itemDescription : "N/A";
    const locInfo = enableLocation && locationInput ? `📍 *Ubicación:* ${locationInput}` : "";

    // Mensaje base simplificado
    const message = `👋 Hola ProCredit. 
    
🏦 *Cotización de Empeño*

📦 *Prenda:* ${desc}
${locInfo}

💰 *Préstamo:* Bs. ${amountInput}
📅 *Tiempo:* ${months} mes(es)
💵 *Total a devolver:* Bs. ${totalRedemption.toFixed(0)}`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const sendToEmail = () => {
    const subject = "Solicitud de Cotización - ProCredit";
    const desc = itemDescription ? itemDescription : "N/A";
    const locInfo = enableLocation && locationInput ? `\nUbicación: ${locationInput}` : "";
    
    // Construir el cuerpo del correo
    const body = `Hola ProCredit,

Solicito una cotización para el siguiente artículo:

DETALLES DE LA PRENDA
---------------------
Descripción: ${desc}
${locInfo}

DATOS DEL EMPEÑO
------------------
Monto Solicitado: Bs. ${amountInput}
Plazo estimado: ${months} meses
Total estimado a devolver: Bs. ${totalRedemption.toFixed(0)}

Quedo atento a su respuesta.`;

    const mailtoLink = `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="bg-surface-light rounded-3xl p-5 shadow-blue-intense border border-primary/5 h-fit relative z-10">
        <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-text-main mb-1">
            COTIZA TU <span className="text-primary opacity-90">EMPEÑO</span>
            </h3>
            <p className="text-text-muted max-w-2xl mx-auto text-xs">
            Calculadora de interés simple.
            </p>
        </div>

        <div className="flex flex-col gap-6">
            <div className="space-y-5">
            
            {/* Item Description Input */}
            <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> ¿Qué deseas empeñar?
                </label>
                <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="Ej: Laptop HP Core i7, Reloj Rolex, Casa en Zona Norte..."
                    className="w-full p-3 rounded-xl bg-secondary border border-primary/20 text-sm text-text-main focus:ring-2 focus:ring-primary outline-none resize-none h-20 placeholder-slate-500 font-medium"
                />
            </div>

            {/* Location Input (Conditional) */}
            {enableLocation && (
                <div className="animate-fade-in-up">
                    <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Ubicación del Inmueble
                    </label>
                    <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="Pegar link de Google Maps o Dirección"
                        className="w-full p-3 rounded-xl bg-secondary border border-primary/20 text-sm text-text-main focus:ring-2 focus:ring-primary outline-none placeholder-slate-500 font-medium"
                    />
                    <p className="text-[9px] text-slate-600 mt-1 ml-1 font-bold">
                        * Ayuda a agilizar el avalúo preliminar.
                    </p>
                </div>
            )}

            {/* Amount Section */}
            <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                ¿Cuánto necesitas? (Bs.)
                </label>
                
                <div className="flex items-center gap-2 mb-2">
                <button 
                    onClick={handleDecreaseAmount}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-secondary border border-primary/20 text-slate-700 hover:bg-primary/5 transition-colors active:scale-95 shadow-sm"
                >
                    <Minus className="w-4 h-4" />
                </button>
                
                <div className="relative flex-1">
                    <input
                    type="text"
                    inputMode="numeric"
                    value={amountInput}
                    onChange={handleAmountChange}
                    className="w-full h-10 bg-secondary border border-primary/20 rounded-lg px-4 text-center font-bold text-lg text-text-main focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                </div>

                <button 
                    onClick={handleIncreaseAmount}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-accent transition-colors active:scale-95 shadow-md shadow-primary/20"
                >
                    <Plus className="w-4 h-4" />
                </button>
                </div>
                
                <input 
                    type="range" 
                    min="100" 
                    max="100000" 
                    step="100"
                    value={amount > 100000 ? 100000 : amount} 
                    onChange={(e) => setAmountInput(e.target.value)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            {/* Months Section (Manual Input + Quick Select) */}
            <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                   <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/> Meses de plazo</span>
                   <span className="text-[10px] text-slate-600 font-bold">Escribe o selecciona</span>
                </label>
                
                <div className="flex gap-2 mb-3">
                     <div className="w-20">
                         <input 
                            type="number" 
                            min="1" 
                            max="60"
                            value={months === 0 ? '' : months}
                            onChange={handleMonthChange}
                            placeholder="#"
                            className="w-full h-10 bg-secondary border border-primary/30 rounded-lg px-2 text-center font-bold text-text-main focus:ring-2 focus:ring-primary outline-none"
                         />
                     </div>
                     <div className="flex-1 grid grid-cols-5 gap-1.5">
                        {monthOptions.map((m) => (
                            <button
                            key={m}
                            onClick={() => setMonths(m)}
                            className={`h-10 rounded-md text-xs font-bold transition-all duration-200 border ${
                                months === m
                                ? 'bg-primary border-primary text-white shadow-md'
                                : 'bg-secondary border-primary/20 text-slate-700 hover:border-primary/50 hover:text-primary'
                            }`}
                            >
                            {m}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            </div>

            {/* Results Card Compact */}
            <div className="bg-secondary/50 rounded-xl p-4 shadow-inner border-2 border-primary/20 relative overflow-hidden mt-2">
                
                {/* Interest Calculation Row */}
                <div className="flex justify-between items-center mb-2 border-b border-primary/10 pb-2">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-text-muted uppercase">Costo mensual</span>
                        <span className="text-[9px] text-text-muted">
                            {(INTEREST_RATE * 100).toFixed(1)}% Int + {(INSURANCE_RATE * 100).toFixed(1)}% Seg + {(STORAGE_RATE * 100).toFixed(1)}% Dep
                        </span>
                    </div>
                    <span className="text-lg font-bold text-text-main">
                        Bs. {monthlyInterest.toFixed(0)}
                    </span>
                </div>

                {/* Total Redemption Row */}
                <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col">
                         <span className="text-xs font-bold text-primary uppercase">Total Desempeño</span>
                         <span className="text-[9px] text-text-muted">Capital + ({months} meses de interés)</span>
                    </div>
                    <span className="text-2xl font-extrabold text-text-main">Bs. {totalRedemption.toFixed(0)}</span>
                </div>
                
                {/* Example / Disclaimer */}
                <div className="mt-3 pt-2 border-t border-dashed border-primary/20 text-center">
                    <p className="text-[10px] text-text-muted">
                        Si recuperas tu prenda en <strong>{months} mes{months !== 1 ? 'es' : ''}</strong>, pagas 
                        Bs. {amount} (Capital) + Bs. {(monthlyInterest * months).toFixed(0)} (Interés acumulado).
                    </p>
                </div>
            </div>

            {/* Action Buttons Section */}
            <div className="space-y-3 pt-2">
                <p className="text-center text-[10px] text-text-muted font-medium uppercase tracking-wider">
                    Elige cómo enviar tu solicitud
                </p>
                
                {/* WhatsApp Principal Button */}
                <button 
                    onClick={() => sendToWhatsApp(WHATSAPP_PHONE)}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center group shadow-lg hover:shadow-xl transform active:scale-95"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                            <Send className="w-5 h-5" />
                            WhatsApp Principal
                        </span>
                        <span className="text-[10px] opacity-90 font-normal">
                             Envío rápido al +591 62327873
                        </span>
                    </div>
                     <span className="bg-white/20 text-white rounded-full p-1 transition-colors group-hover:bg-white/30">
                        <ChevronRight className="w-5 h-5" />
                    </span>
                </button>

                {/* WhatsApp Secundario Button */}
                <button 
                    onClick={() => sendToWhatsApp(WHATSAPP_PHONE_SECONDARY)}
                    className="w-full bg-[#128C7E] hover:bg-[#0f7569] text-white border-none font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center group shadow-lg hover:shadow-xl transform active:scale-95"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                            <Send className="w-5 h-5" />
                            WhatsApp Auxiliar
                        </span>
                        <span className="text-[10px] opacity-90 font-normal">
                             En caso de falla al +591 77274528
                        </span>
                    </div>
                     <span className="bg-white/20 text-white rounded-full p-1 transition-colors group-hover:bg-white/30">
                        <ChevronRight className="w-5 h-5" />
                    </span>
                </button>

                {/* Email Button */}
                <button 
                    onClick={sendToEmail}
                    className="w-full bg-white border border-primary/10 hover:border-primary/50 text-text-main font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center group hover:bg-secondary transform active:scale-95"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="flex items-center gap-2 text-sm uppercase tracking-wide text-text-muted group-hover:text-primary transition-colors">
                            <Mail className="w-5 h-5" />
                            Correo Electrónico
                        </span>
                        <span className="text-[10px] text-text-muted font-normal">
                             {EMAIL_CONTACT}
                        </span>
                    </div>
                    <span className="bg-secondary text-text-muted rounded-full p-1 transition-colors group-hover:text-white group-hover:bg-primary">
                        <ChevronRight className="w-5 h-5" />
                    </span>
                </button>
            </div>
        </div>
    </div>
  );
};