import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-elaris-accent/40 shadow-elaris-soft'
                : 'bg-white/60 hover:bg-white border-elaris-border'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className={`font-serif text-base sm:text-lg font-semibold tracking-tight transition-colors ${
                isOpen ? 'text-elaris-accent' : 'text-elaris-text'
              }`}>
                {item.q}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                isOpen ? 'bg-elaris-accent text-white rotate-180' : 'bg-elaris-bg-secondary text-elaris-text'
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out px-6 ${
                isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="pt-2 border-t border-elaris-border/50 text-sm sm:text-base text-elaris-text-muted leading-relaxed">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
