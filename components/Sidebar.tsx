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
  Landmark,
  Palette,
  Watch
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
    { id: 'banca', icon: <Wallet className="w-5 h-5" />, label: 'Banca Comunal' },
    { id: 'garantia', icon: <CreditCard className="w-5 h-5" />, label: 'Crédito con Garantía' },
    { id: 'micro', icon: <PiggyBank className="w-5 h-5" />, label: 'Microcrédito Solidario' },
    { label: 'TIPOS DE EMPEÑO', isHeader: true },
    { id: 'joyeria', icon: <Gem className="w-5 h-5" />, label: 'Alta Joyería' },
    { id: 'relojes', icon: <Watch className="w-5 h-5" />, label: 'Relojes de Lujo' },
    { id: 'autos', icon: <Car className="w-5 h-5" />, label: 'Autos (Rodando)' },
    { id: 'inmuebles', icon: <Landmark className="w-5 h-5" />, label: 'Inmuebles' },
    { id: 'electronicos', icon: <Smartphone className="w-5 h-5" />, label: 'Electrónicos' },
    { id: 'arte', icon: <Palette className="w-5 h-5" />, label: 'Arte y Antigüedades' },
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
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-surface-light dark:bg-surface-dark border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col shadow-2xl md:shadow-none`}
      >
        {/* Logo Area */}
        <div 
          className="h-20 flex items-center px-8 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
           <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                  <PiggyBank className="text-primary w-8 h-8" />
              </div>
              <div>
                  <h1 className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white">
                      PRO <span className="text-primary">CREDIT</span>
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Crecemos Juntos</p>
              </div>
           </div>
           <button onClick={toggleSidebar} className="md:hidden ml-auto text-gray-500">
             <X className="w-6 h-6" />
           </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 sidebar-scroll">
          {navItems.map((item, index) => {
            if (item.isHeader) {
              return (
                <div key={index} className="px-4 py-3 mt-4 mb-2">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{item.label}</p>
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
                    ? 'bg-primary/5 text-primary font-bold border-l-4 border-primary shadow-sm' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
                } ${item.divider ? 'mt-4 border-t border-gray-100 dark:border-gray-700 pt-6' : ''}`}
              >
                <span className={`mr-3 transition-colors ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
           <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-400 p-[2px]">
                 <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
                    alt="User" 
                    className="w-full h-full rounded-full border-2 border-white dark:border-gray-800 object-cover"
                 />
              </div>
              <div className="overflow-hidden">
                 <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Maria González</p>
                 <p className="text-xs text-gray-500 truncate">Cliente Preferencial</p>
              </div>
           </div>
        </div>
      </aside>
    </>
  );
};