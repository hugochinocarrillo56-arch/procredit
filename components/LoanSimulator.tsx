import React, { useState, useEffect } from 'react';
import { INTEREST_RATE, STORAGE_INSURANCE_RATE } from '../constants';
import { Minus, Plus, Send, Calendar, DollarSign, Percent } from 'lucide-react';

export const LoanSimulator: React.FC = () => {
  const [amountInput, setAmountInput] = useState<string>("5000");
  const [months, setMonths] = useState<number>(12);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  const amount = Number(amountInput) || 0;

  useEffect(() => {
    // Tasa total: 3% interés + 5% seguro = 8%
    const totalRate = INTEREST_RATE + STORAGE_INSURANCE_RATE;
    
    if (amount > 0) {
        // Fórmula de cuota nivelada (Anualidad)
        const pmt = (amount * totalRate * Math.pow(1 + totalRate, months)) / (Math.pow(1 + totalRate, months) - 1);
        setMonthlyPayment(pmt);
        setTotalPayment(pmt * months);
    } else {
        setMonthlyPayment(0);
        setTotalPayment(0);
    }
  }, [amount, months]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountInput(e.target.value);
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "59162327873";
    const message = `👋 Hola ProCredit. 
    
🏦 *Solicitud de Crédito Personal*

💰 *Monto Solicitado:* Bs. ${amountInput}
📅 *Plazo:* ${months} meses
📊 *Cuota Estimada:* Bs. ${monthlyPayment.toFixed(0)}/mes

Quisiera saber los requisitos para este préstamo.`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-inner border border-gray-100 dark:border-gray-700 h-fit">
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
          SIMULADOR DE <span className="text-secondary">CRÉDITO</span>
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs max-w-xs mx-auto">
          Elige el monto exacto que necesitas y el tiempo para pagar.
        </p>
      </div>

      <div className="space-y-8">
        {/* Amount Input */}
        <div>
           <div className="flex justify-between mb-2">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1">
                 <DollarSign className="w-3 h-3" /> Monto del Préstamo (Bs.)
              </label>
              <span className="text-xs font-bold text-primary">Bs. {amountInput}</span>
           </div>
           
           <input 
              type="range" 
              min="1000" 
              max="150000" 
              step="500"
              value={amount} 
              onChange={handleAmountChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-secondary"
           />
           <div className="flex justify-between mt-2 text-[10px] text-gray-400">
              <span>Bs. 1,000</span>
              <span>Bs. 150,000</span>
           </div>
           
           <div className="mt-4 flex justify-center">
             <div className="relative w-full max-w-[200px]">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Bs.</span>
                <input
                    type="number"
                    value={amountInput}
                    onChange={handleAmountChange}
                    className="w-full pl-10 pr-4 py-2 text-center text-xl font-bold bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-secondary outline-none"
                />
             </div>
           </div>
        </div>

        {/* Term Input */}
        <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-1 mb-3">
                 <Calendar className="w-3 h-3" /> Plazo de Pago
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[3, 6, 9, 12, 18, 24].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMonths(m)}
                        className={`py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                            months === m 
                            ? 'bg-secondary text-white shadow-lg shadow-secondary/30 scale-105' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        {m} Meses
                    </button>
                ))}
            </div>
        </div>

        {/* Results */}
        <div className="bg-gray-900 dark:bg-black rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Cuota Mensual</span>
                    <span className="text-3xl font-bold text-white">Bs. {monthlyPayment.toFixed(0)}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                     <span className="text-gray-400 flex items-center gap-1"><Percent className="w-3 h-3" /> Tasa Mensual (Base)</span>
                     <span className="font-bold text-green-400">{(INTEREST_RATE * 100).toFixed(1)}%</span>
                </div>
                 <div className="flex justify-between items-center text-xs">
                     <span className="text-gray-400">Seguro y Resguardo</span>
                     <span className="font-bold text-gray-300">{(STORAGE_INSURANCE_RATE * 100).toFixed(1)}%</span>
                </div>
                
                <button 
                    onClick={sendToWhatsApp}
                    className="mt-2 w-full bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <Send className="w-4 h-4" /> Solicitar este Crédito
                </button>
                
                <p className="text-[9px] text-center text-gray-500 mt-1">
                    * Calculo referencial. Sujeto a evaluación crediticia y garantía.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};