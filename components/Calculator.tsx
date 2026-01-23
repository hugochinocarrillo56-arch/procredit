import React, { useState, useEffect } from 'react';
import { INTEREST_RATE, STORAGE_INSURANCE_RATE, WHATSAPP_PHONE, EMAIL_CONTACT } from '../constants';
import { ChevronRight, Plus, Minus, Send, FileText, MapPin, Mail } from 'lucide-react';

interface CalculatorProps {
  enableLocation?: boolean;
}

export const Calculator: React.FC<CalculatorProps> = ({ enableLocation = false }) => {
  // Valores iniciales en Bolivianos
  const [amountInput, setAmountInput] = useState<string>("2500");
  const [months, setMonths] = useState<number>(6);
  const [itemDescription, setItemDescription] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  
  const monthOptions = [1, 3, 6, 12, 24];

  // Derived number value for calculations
  const amount = Number(amountInput) || 0;

  useEffect(() => {
    // Cálculo de amortización
    const totalRate = INTEREST_RATE + STORAGE_INSURANCE_RATE;
    const n = months;
    
    if (amount > 0) {
        // Fórmula de anualidad (cuota fija)
        const pmt = (amount * totalRate * Math.pow(1 + totalRate, n)) / (Math.pow(1 + totalRate, n) - 1);
        setMonthlyPayment(pmt);
        setTotalPayment(pmt * n);
    } else {
        setMonthlyPayment(0);
        setTotalPayment(0);
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

  const sendToWhatsApp = () => {
    const desc = itemDescription ? itemDescription : "N/A";
    const locInfo = enableLocation && locationInput ? `📍 *Ubicación:* ${locationInput}` : "";

    // Mensaje base simplificado
    const message = `👋 Hola ProCredit. 
    
🏦 *Solicitud de Cotización/Empeño*

📦 *Prenda/Garantía:* ${desc}
${locInfo}

💰 *Monto que pido:* Bs. ${amountInput}
📅 *Plazo estimado:* ${months} meses`;
    
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
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

DATOS DEL PRÉSTAMO
------------------
Monto Solicitado: Bs. ${amountInput}
Plazo estimado: ${months} meses

Quedo atento a su respuesta.`;

    const mailtoLink = `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div className="bg-surface-light rounded-3xl p-5 shadow-2xl border border-white/5 h-fit relative z-10">
        <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
            COTIZA TU <span className="text-primary opacity-90">EMPEÑO</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-xs">
            Calculadora referencial en Bolivianos.
            </p>
        </div>

        <div className="flex flex-col gap-6">
            <div className="space-y-5">
            
            {/* Item Description Input */}
            <div>
                <label className="block text-xs font-bold text-gray-300 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> ¿Qué deseas empeñar?
                </label>
                <textarea
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    placeholder="Ej: Laptop HP Core i7, Reloj Rolex, Casa en Zona Norte..."
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:ring-2 focus:ring-primary outline-none resize-none h-20 placeholder-gray-500"
                />
            </div>

            {/* Location Input (Conditional) */}
            {enableLocation && (
                <div className="animate-fade-in-up">
                    <label className="block text-xs font-bold text-gray-300 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> Ubicación del Inmueble
                    </label>
                    <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => setLocationInput(e.target.value)}
                        placeholder="Pegar link de Google Maps o Dirección"
                        className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:ring-2 focus:ring-primary outline-none placeholder-gray-500"
                    />
                    <p className="text-[9px] text-gray-400 mt-1 ml-1">
                        * Ayuda a agilizar el avalúo preliminar.
                    </p>
                </div>
            )}

            {/* Amount Section */}
            <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">
                ¿Cuánto necesitas? (Bs.)
                </label>
                
                <div className="flex items-center gap-2 mb-2">
                <button 
                    onClick={handleDecreaseAmount}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-colors active:scale-95 shadow-sm"
                >
                    <Minus className="w-4 h-4" />
                </button>
                
                <div className="relative flex-1">
                    <input
                    type="text"
                    inputMode="numeric"
                    value={amountInput}
                    onChange={handleAmountChange}
                    className="w-full h-10 bg-white/5 border border-white/10 rounded-lg px-4 text-center font-bold text-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
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
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            {/* Months Section */}
            <div>
                <label className="block text-xs font-bold text-gray-300 mb-2">
                Plazo estimado (meses)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                {monthOptions.map((m) => (
                    <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`py-1.5 rounded-md text-xs font-bold transition-all duration-200 border ${
                        months === m
                        ? 'bg-primary border-primary text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-primary/50 hover:text-white'
                    }`}
                    >
                    {m}
                    </button>
                ))}
                </div>
            </div>
            </div>

            {/* Results Card Compact */}
            <div className="bg-background-light rounded-xl p-4 shadow-inner border border-white/5 relative overflow-hidden mt-2">
                <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase">Pago Mensual*</span>
                    <span className="text-2xl font-extrabold text-white">
                    Bs. {monthlyPayment.toFixed(0)}
                    </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase">Tasa Interés</span>
                    <span className="text-sm font-bold text-primary">
                        {(INTEREST_RATE * 100).toFixed(1)}% Mensual
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Total a Pagar</span>
                    <span className="text-sm font-bold text-primary">Bs. {totalPayment.toFixed(0)}</span>
                </div>
                
                {/* Fine Print / Disclaimer */}
                <div className="mt-3 pt-2 border-t border-dashed border-white/10">
                    <p className="text-[9px] text-gray-500 leading-tight">
                        * La cuota mensual estimada incluye interés ({(INTEREST_RATE * 100).toFixed(0)}%) más 
                        un cargo adicional del {(STORAGE_INSURANCE_RATE * 100).toFixed(0)}% por concepto de resguardo, depósito y seguro.
                        Sujeto a evaluación.
                    </p>
                </div>
            </div>

            {/* Action Buttons Section */}
            <div className="space-y-3 pt-2">
                <p className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                    Elige cómo enviar tu solicitud
                </p>
                
                {/* WhatsApp Button */}
                <button 
                    onClick={sendToWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white border-none font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center group shadow-lg hover:shadow-xl transform active:scale-95"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="flex items-center gap-2 text-sm uppercase tracking-wide">
                            <Send className="w-5 h-5" />
                            WhatsApp
                        </span>
                        <span className="text-[10px] opacity-90 font-normal">
                             Envío rápido al {WHATSAPP_PHONE}
                        </span>
                    </div>
                     <span className="bg-white/20 text-white rounded-full p-1 transition-colors group-hover:bg-white/30">
                        <ChevronRight className="w-5 h-5" />
                    </span>
                </button>

                {/* Email Button */}
                <button 
                    onClick={sendToEmail}
                    className="w-full bg-surface-light border border-white/10 hover:border-primary/50 text-white font-bold py-3 px-4 rounded-xl transition-all flex justify-between items-center group hover:bg-white/5 transform active:scale-95"
                >
                    <div className="flex flex-col items-start text-left">
                        <span className="flex items-center gap-2 text-sm uppercase tracking-wide text-gray-200 group-hover:text-primary transition-colors">
                            <Mail className="w-5 h-5" />
                            Correo Electrónico
                        </span>
                        <span className="text-[10px] text-gray-500 font-normal">
                             {EMAIL_CONTACT}
                        </span>
                    </div>
                    <span className="bg-white/5 text-gray-400 rounded-full p-1 transition-colors group-hover:text-white group-hover:bg-primary">
                        <ChevronRight className="w-5 h-5" />
                    </span>
                </button>
            </div>
        </div>
    </div>
  );
};