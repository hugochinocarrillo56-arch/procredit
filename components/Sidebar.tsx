import React from 'react';
import { 
  Home, 
  Wallet, 
  CreditCard, 
  Gem, 
  Car, 
  Smartphone, 
  ShieldCheck, 
  X,
  PiggyBank,
  Landmark
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Inicio' },
    { label: 'SERVICIOS FINANCIEROS', isHeader: true },
    { id: 'garantia', icon: <CreditCard className="w-5 h-5" />, label: 'Crédito con Garantía' },
    { label: 'TIPOS DE EMPEÑO', isHeader: true },
    { id: 'joyeria', icon: <Gem className="w-5 h-5" />, label: 'Alta Joyería' },
    { id: 'autos', icon: <Car className="w-5 h-5" />, label: 'Autos (Rodando)' },
    { id: 'inmuebles', icon: <Landmark className="w-5 h-5" />, label: 'Inmuebles' },
    { id: 'electronicos', icon: <Smartphone className="w-5 h-5" />, label: 'Electrónicos' },
    { id: 'seguros', icon: <ShieldCheck className="w-5 h-5" />, label: 'Seguros', divider: true },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-primary/10 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col shadow-2xl md:hidden`}
      >
        {/* Logo Area */}
        <div 
          className="h-24 flex items-center px-6 border-b border-primary/10 bg-white cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
           <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/50 shrink-0">
                  <img 
                    src="https://i.ibb.co/jP3Jhmj6/photo-2025-10-02-12-15-41.jpg" 
                    alt="Pro Credit Logo" 
                    className="w-full h-full object-cover"
                  />
              </div>
              <div>
                  <h1 className="font-extrabold text-xl tracking-tight leading-none text-slate-900">
                      <span className="text-slate-900">PRO</span> <span className="text-primary">CREDIT</span>
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest text-slate-700 font-bold mt-1">Crecemos Juntos</p>
              </div>
           </div>
           <button onClick={toggleSidebar} className="md:hidden ml-auto text-slate-500 hover:text-primary">
             <X className="w-6 h-6" />
           </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 sidebar-scroll bg-white">
          {navItems.map((item, index) => {
            if (item.isHeader) {
              return (
                <div key={index} className="px-4 py-3 mt-4 mb-2">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider">{item.label}</p>
                </div>
              );
            }

            const isActive = currentView === item.id;

            return (
              <button
                key={index}
                onClick={() => item.id && handleNavClick(item.id)}
                className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-200 group text-left ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-bold border-l-4 border-primary shadow-sm' 
                    : 'text-slate-700 hover:bg-primary/5 hover:text-primary'
                } ${item.divider ? 'mt-4 border-t border-primary/10 pt-6' : ''}`}
              >
                <span className={`mr-3 transition-colors ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}`}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-primary/10 bg-slate-50">
           <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px]">
                 <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
                    alt="User" 
                    className="w-full h-full rounded-full border-2 border-white object-cover"
                 />
              </div>
              <div className="overflow-hidden">
                 <p className="text-sm font-bold text-slate-900 truncate">Maria González</p>
                 <p className="text-xs text-slate-700 font-medium truncate">Cliente Preferencial</p>
              </div>
           </div>
        </div>
      </aside>
    </>
  );
};