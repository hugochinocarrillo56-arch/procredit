import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Preguntas Frecuentes</h2>
            <p className="text-gray-500 dark:text-gray-400">Resuelve tus dudas sobre nuestro proceso de empeño</p>
        </div>
      
      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 transition-all duration-300 ${openId === item.id ? 'shadow-md ring-1 ring-primary/20' : 'shadow-sm'}`}
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            >
              <div className="flex items-center gap-3">
                <span className={`p-2 rounded-full ${openId === item.id ? 'bg-primary/10 text-primary' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                    <HelpCircle className="w-5 h-5" />
                </span>
                <span className="font-semibold text-gray-800 dark:text-white text-lg">
                  {item.question}
                </span>
              </div>
              {openId === item.id ? (
                <ChevronUp className="w-5 h-5 text-primary" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 mt-2">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};