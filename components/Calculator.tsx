import React, { useState, useEffect } from 'react';
import { INTEREST_RATE, STORAGE_INSURANCE_RATE } from '../constants';
import { ChevronRight, Info, Plus, Minus, Send, Camera, FileText, Image as ImageIcon, X, Paperclip, MapPin } from 'lucide-react';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const monthOptions = [1, 3, 6, 12, 24];

  // Derived number value for calculations
  const amount = Number(amountInput) || 0;

  useEffect(() => {
    // Cálculo de amortización
    // NOTA: Calculamos el pago mensual REAL (Interés + Seguro) para que la cuota no sea engañosa,
    // aunque visualmente destacaremos solo el interés base.
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "59162327873";
    const desc = itemDescription ? itemDescription : "N/A";
    const hasPhoto = selectedImage ? "Si (Ver adjunto en chat)" : "No adjuntada aún";
    const locInfo = enableLocation && locationInput ? `📍 *Ubicación:* ${locationInput}` : "";
    
    const message = `👋 Hola ProCredit. 
    
🏦 *Solicitud de Cotización/Empeño*

📦 *Prenda/Garantía:* ${desc}
${locInfo}
📸 *Foto:* ${hasPhoto}
💰 *Monto que pido:* Bs. ${amountInput}
📅 *Plazo estimado:* ${months} meses

⚠️ *Nota:* Estoy enviando la foto de mi garantía a continuación...`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-5 shadow-inner border border-gray-100 dark:border-gray-700 h-fit">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-1">
          COTIZA TU <span className="text-primary opacity-90">EMPEÑO</span>
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-xs">
          Calculadora referencial en Bolivianos.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="space-y-5">
          
          {/* Item Description Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
               <FileText className="w-4 h-4 text-primary" /> ¿Qué deseas empeñar?
            </label>
            <textarea
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Ej: Laptop HP Core i7, Reloj Rolex, Casa en Zona Norte..."
                className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-primary outline-none resize-none h-20"
            />
          </div>

          {/* Location Input (Conditional) */}
          {enableLocation && (
            <div className="animate-fade-in-up">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                   <MapPin className="w-4 h-4 text-secondary" /> Ubicación del Inmueble
                </label>
                <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder="Pegar link de Google Maps o Dirección"
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-secondary outline-none"
                />
                <p className="text-[9px] text-gray-400 mt-1 ml-1">
                    * Ayuda a agilizar el avalúo preliminar.
                </p>
            </div>
          )}

          {/* Photo Upload Section */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
               <Camera className="w-4 h-4 text-primary" /> Foto de la Prenda
            </label>
            
            {!selectedImage ? (
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group">
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-primary/10 p-2 rounded-full mb-1 group-hover:bg-primary/20 transition-colors">
                            <ImageIcon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium">Toca para subir o tomar foto</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            ) : (
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors backdrop-blur-sm"
                    >
                        <X className="w-3 h-3" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] p-2 pt-4 text-center font-medium">
                        <span className="flex items-center justify-center gap-1">
                            <Paperclip className="w-3 h-3" /> Lista para enviar
                        </span>
                    </div>
                </div>
            )}
            <p className="text-[9px] text-gray-400 mt-1.5 leading-tight">
               * Importante: Al abrir WhatsApp, deberás confirmar el envío de la imagen seleccionada desde tu galería.
            </p>
          </div>

          {/* Amount Section */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              ¿Cuánto necesitas? (Bs.)
            </label>
            
            <div className="flex items-center gap-2 mb-2">
              <button 
                onClick={handleDecreaseAmount}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors active:scale-95 shadow-sm"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  inputMode="numeric"
                  value={amountInput}
                  onChange={handleAmountChange}
                  className="w-full h-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 text-center font-bold text-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                />
              </div>

              <button 
                onClick={handleIncreaseAmount}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-red-600 transition-colors active:scale-95 shadow-md shadow-primary/20"
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
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
            />
          </div>

          {/* Months Section */}
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
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
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card Compact */}
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                <span className="text-xs font-bold text-gray-500 uppercase">Pago Mensual*</span>
                <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  Bs. {monthlyPayment.toFixed(0)}
                </span>
            </div>
            <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-gray-500 uppercase">Tasa Interés</span>
                 <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {(INTEREST_RATE * 100).toFixed(1)}% Mensual
                 </span>
            </div>
            <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-gray-500 uppercase">Total a Pagar</span>
                 <span className="text-sm font-bold text-primary">Bs. {totalPayment.toFixed(0)}</span>
            </div>
            
            {/* Fine Print / Disclaimer */}
            <div className="mt-3 pt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-[9px] text-gray-400 dark:text-gray-500 leading-tight">
                    * La cuota mensual estimada incluye interés ({(INTEREST_RATE * 100).toFixed(0)}%) más 
                    un cargo adicional del {(STORAGE_INSURANCE_RATE * 100).toFixed(0)}% por concepto de resguardo, depósito y seguro.
                    Sujeto a evaluación.
                </p>
            </div>
        </div>

        {/* Action Button */}
        <div>
            <button 
                onClick={sendToWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white border-none font-bold py-3.5 px-4 rounded-xl transition-all flex justify-between items-center group shadow-lg hover:shadow-xl transform active:scale-95"
            >
                <div className="flex flex-col items-start text-left">
                    <span className="flex items-center gap-2 text-sm"><Send className="w-4 h-4" /> Cotizar en WhatsApp</span>
                    <span className="text-[10px] opacity-80 font-normal flex items-center gap-1">
                        {selectedImage ? "Foto lista para adjuntar" : "Recuerda enviar tu foto"}
                    </span>
                </div>
                <span className="bg-white/20 text-white rounded-full p-1 transition-colors">
                <ChevronRight className="w-5 h-5" />
                </span>
            </button>
        </div>
      </div>
    </div>
  );
};