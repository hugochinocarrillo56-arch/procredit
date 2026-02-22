import React, { useState, useEffect } from 'react';
import { INTEREST_RATE, INSURANCE_RATE, STORAGE_RATE, WHATSAPP_PHONE } from '../constants';
import { Minus, Plus, Send, Calendar, DollarSign, Percent } from 'lucide-react';

export const LoanSimulator: React.FC = () => {
  const [amountInput, setAmountInput] = useState<string>("1000");
  const [months, setMonths] = useState<number>(1);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  // Convert input string to number safely
  const amount = parseInt(amountInput.replace(/[^0-9]/g, '') || '0', 10);

  useEffect(() => {
    // Tasa total mensual: 3% interés + 3.5% seguro + 3.5% depósito = 10% (0.10)
    const totalMonthlyRate = INTEREST_RATE + INSURANCE_RATE + STORAGE_RATE;
    
    if (amount > 0) {
        // Lógica de Interés Simple (Tasa Plana) solicitada por el usuario
        const monthlyInterestAmount = amount * totalMonthlyRate;
        const totalInterest = monthlyInterestAmount * months;
        const totalToPay = amount + totalInterest;
        const monthlyQuota = totalToPay / months;

        setMonthlyPayment(monthlyQuota);
        setTotalPayment(totalToPay);
    } else {
        setMonthlyPayment(0);
        setTotalPayment(0);
    }
  }, [amount, months]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permitir solo números
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    // Limite superior visual para evitar números infinitos
    if (value.length > 8) return; 
    
    setAmountInput(value);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(e.target.value);
  }

  const sendToWhatsApp = () => {
    const message = `👋 Hola ProCredit. 
    
🏦 *Solicitud de Crédito Personal*

💰 *Monto Solicitado:* Bs. ${amountInput}
📅 *Plazo:* ${months} meses
📊 *Cuota Fija:* Bs. ${monthlyPayment.toFixed(2)}/mes
📝 *Total a Devolver:* Bs. ${totalPayment.toFixed(2)}

Quisiera saber los requisitos para este préstamo.`;
    
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-surface-light rounded-3xl p-6 shadow-blue-intense border border-primary/5 h-fit">
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-text-main mb-2">
          SIMULADOR DE <span className="text-primary">CRÉDITO</span>
        </h3>
        <p className="text-text-muted text-xs max-w-xs mx-auto">
          Elige el monto exacto que necesitas y el tiempo para pagar.
        </p>
      </div>

      <div className="space-y-8">
        {/* Amount Input */}
        <div>
           <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                 <DollarSign className="w-3 h-3" /> Monto del Préstamo (Bs.)
              </label>
              <span className="text-xs font-extrabold text-primary">Bs. {parseInt(amountInput || '0').toLocaleString()}</span>
           </div>
           
           <input 
              type="range" 
              min="500" 
              max="150000" 
              step="100"
              value={amount > 150000 ? 150000 : amount} 
              onChange={handleRangeChange}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
           />
           <div className="flex justify-between mt-2 text-[10px] text-slate-600 font-bold">
              <span>Bs. 500</span>
              <span>Bs. 150,000</span>
           </div>
           
           <div className="mt-6 flex justify-center">
             <div className="relative w-full max-w-[240px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-extrabold text-xl z-10 pointer-events-none">Bs.</span>
                <input
                    type="text"
                    inputMode="numeric"
                    value={amountInput}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="w-full pl-14 pr-4 py-3 text-center text-3xl font-extrabold bg-white border-2 border-primary/20 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none text-text-main shadow-xl transition-all placeholder-slate-300"
                />
             </div>
           </div>
        </div>

        {/* Term Input */}
        <div>
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1 mb-3">
                 <Calendar className="w-3 h-3" /> Plazo de Pago
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {[1, 3, 6, 9, 12, 18, 24].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                            months === m 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                            : 'bg-secondary text-slate-700 hover:bg-primary/5 border border-primary/10'
                        }`}
                    >
                        {m} Meses
                    </button>
                ))}
            </div>
        </div>

        {/* Results */}
        <div className="bg-secondary/50 rounded-2xl p-6 text-text-main relative overflow-hidden shadow-xl border-2 border-primary/20">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-end border-b border-primary/20 pb-4">
                    <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">Cuota Fija Mensual</span>
                    <span className="text-3xl font-bold text-text-main">Bs. {monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-600 font-medium flex items-center gap-1"><Percent className="w-3 h-3" /> Interés Mensual</span>
                     <span className="font-bold text-primary">{(INTEREST_RATE * 100).toFixed(1)}%</span>
                </div>
                 <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-600 font-medium">Seguro del Préstamo</span>
                     <span className="font-bold text-slate-700">{(INSURANCE_RATE * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-600 font-medium">Depósito de Prenda</span>
                     <span className="font-bold text-slate-700">{(STORAGE_RATE * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-primary/20">
                     <span className="text-slate-700 font-bold">Total a Devolver</span>
                     <span className="font-bold text-text-main">Bs. {totalPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                
                <button 
                    onClick={sendToWhatsApp}
                    className="mt-2 w-full bg-primary text-white hover:bg-accent font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <Send className="w-4 h-4" /> Solicitar este Crédito
                </button>
                
                <p className="text-[9px] text-center text-text-muted mt-1">
                    * Cálculo de cuota fija (Interés Simple) con tasa total del 10% mensual.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};