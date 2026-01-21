import React, { useState } from 'react';
import { Send, User, Mail, Phone } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    celular: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "59162327873";
    const message = `Hola ProCredit, mi nombre es ${formData.nombre} ${formData.apellido}. Mi correo es ${formData.email} y mi celular es ${formData.celular}. Quisiera recibir más información sobre los préstamos.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setFormData({ nombre: '', apellido: '', email: '', celular: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-secondary rounded-2xl shadow-xl overflow-hidden relative">
       {/* Decorative circles */}
       <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
       <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col items-center mb-6 text-white">
            <h3 className="font-bold text-2xl mb-1">Solicita Información</h3>
            <p className="text-white/80 text-sm text-center">Déjanos tus datos y te contactaremos por WhatsApp.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre*"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95 border-0 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
            />
          </div>
          
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido*"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95 border-0 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              required
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95 border-0 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="w-24 flex-shrink-0">
                 <select className="w-full px-2 py-3 rounded-lg bg-white/95 border-0 text-gray-600 focus:ring-2 focus:ring-primary outline-none">
                     <option>+591</option>
                     <option>+52</option>
                     <option>+1</option>
                 </select>
            </div>
            <div className="relative flex-grow">
                <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                type="tel"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                placeholder="Celular*"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95 border-0 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg transition-transform transform active:scale-95 uppercase tracking-wider text-sm flex justify-center items-center gap-2"
            >
              <span>Enviar a WhatsApp</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
          
          <p className="text-white/60 text-[10px] text-center mt-4 px-4">
            Al enviar serás redirigido a nuestro chat oficial de WhatsApp.
          </p>
        </form>
      </div>
      
      <div className="bg-teal-700/50 p-4 text-center border-t border-white/10 backdrop-blur-sm">
        <p className="text-white text-xs font-semibold mb-1">¿Necesitas ayuda inmediata?</p>
        <a href="https://wa.me/59162327873" target="_blank" className="text-white text-xl font-bold block hover:underline tracking-widest">
            +591 623 27873
        </a>
      </div>
    </div>
  );
};