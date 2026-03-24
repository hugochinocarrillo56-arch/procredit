import React, { useState } from 'react';
import { 
  Home, 
  Wallet, 
  CreditCard, 
  Gem, 
  Car, 
  Smartphone, 
  ShieldCheck, 
  PiggyBank,
  Landmark,
  ChevronDown,
  Menu
} from 'lucide-react';

interface TopNavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  toggleSidebar: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ currentView, onNavigate, toggleSidebar }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = {
    main: [
      { id: 'home', icon: <Home className="w-4 h-4" />, label: 'Inicio' },
    ],
    services: [
      { id: 'banca', icon: <Wallet className="w-4 h-4" />, label: 'Banca Comunal' },
      { id: 'garantia', icon: <CreditCard className="w-4 h-4" />, label: 'Crédito con Garantía' },
      { id: 'micro', icon: <PiggyBank className="w-4 h-4" />, label: 'Microcrédito Solidario' },
    ],
    pawn: [
      { id: 'joyeria', icon: <Gem className="w-4 h-4" />, label: 'Alta Joyería' },
      { id: 'autos', icon: <Car className="w-4 h-4" />, label: 'Autos (Rodando)' },
      { id: 'inmuebles', icon: <Landmark className="w-4 h-4" />, label: 'Inmuebles' },
      { id: 'electronicos', icon: <Smartphone className="w-4 h-4" />, label: 'Electrónicos' },
    ],
    other: [
      { id: 'seguros', icon: <ShieldCheck className="w-4 h-4" />, label: 'Seguros' },
    ]
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setActiveDropdown(null);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-surface-light/95 backdrop-blur-md border-b-2 border-primary/20 h-20 hidden md:flex items-center px-8 shadow-md">
      <div className="flex items-center gap-3 cursor-pointer mr-12" onClick={() => handleNavClick('home')}>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50 shrink-0">
          <img 
            src="https://i.ibb.co/jP3Jhmj6/photo-2025-10-02-12-15-41.jpg" 
            alt="Pro Credit Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="font-extrabold text-lg tracking-tight leading-none text-text-main">
            <span className="text-text-main">PRO</span> <span className="text-primary">CREDIT</span>
          </h1>
          <p className="text-[8px] uppercase tracking-widest text-slate-600 font-bold">Crecemos Juntos</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {navItems.main.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              currentView === item.id ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-primary hover:bg-primary/5'
            }`}
          >
            {item.label}
          </button>
        ))}

        {/* Services Dropdown */}
        <div className="relative group">
          <button 
            onMouseEnter={() => setActiveDropdown('services')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-all ${
              ['banca', 'garantia', 'micro'].includes(currentView) ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-primary hover:bg-primary/5'
            }`}
          >
            Servicios <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="bg-surface-light border border-primary/10 rounded-xl shadow-xl p-2 w-64">
              {navItems.services.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    currentView === item.id ? 'bg-primary/10 text-primary font-bold' : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pawn Dropdown */}
        <div className="relative group">
          <button 
            onMouseEnter={() => setActiveDropdown('pawn')}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-all ${
              ['joyeria', 'autos', 'inmuebles', 'electronicos'].includes(currentView) ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-primary hover:bg-primary/5'
            }`}
          >
            Empeños <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="bg-surface-light border border-primary/10 rounded-xl shadow-xl p-2 w-64">
              {navItems.pawn.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    currentView === item.id ? 'bg-primary/10 text-primary font-bold' : 'text-text-muted hover:bg-primary/5 hover:text-primary'
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {navItems.other.map(item => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              currentView === item.id ? 'text-primary bg-primary/10' : 'text-text-muted hover:text-primary hover:bg-primary/5'
            }`}
          >
            {item.label}
          </button>
        ))}

        <a 
          href="https://pro-credit-verificar.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-extrabold text-black bg-highlight hover:bg-orange-600 shadow-lg shadow-highlight/40 transition-all flex items-center gap-2 animate-pulse-subtle border-2 border-highlight hover:border-orange-600"
        >
          <ShieldCheck className="w-4 h-4" />
          VERIFICAR MI PRÉSTAMO
        </a>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="text-right hidden lg:block">
          <p className="text-sm font-bold text-text-main">Maria González</p>
          <p className="text-[10px] text-slate-600 font-medium">Cliente Preferencial</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
            alt="User" 
            className="w-full h-full rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>
    </nav>
  );
};
