import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

const languageOptions = [
  { code: 'hy', label: 'Հայերեն', flag: '🇦🇲' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' }
];

export default function LanguageSwitcher({ className = '' }) {
  const { currentLang, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Active language option
  const activeOption = languageOptions.find(l => l.code === currentLang) || languageOptions[0];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Handle selection
  const handleSelect = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button: Shows only currently active language */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-elaris-text hover:text-elaris-dark bg-elaris-bg-secondary/50 hover:bg-elaris-bg-secondary/80 border border-elaris-border transition-all duration-200 cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-xs">{activeOption.flag}</span>
        <span className="font-sans text-[13px]">{activeOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-elaris-text-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu: Opens downward below selector */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl bg-elaris-bg-card border border-elaris-border shadow-elaris-dropdown py-1.5 z-50 animate-slide-down origin-top-right">
          <div className="px-3 py-1.5 border-b border-elaris-border/50 text-[10px] uppercase tracking-wider text-elaris-text-muted font-semibold">
            Language / Լեզու
          </div>

          <div className="py-1">
            {languageOptions.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-elaris-bg-secondary/70 text-elaris-dark font-medium'
                      : 'text-elaris-text hover:bg-elaris-bg-secondary/40'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-sm">{lang.flag}</span>
                    <span className="text-[13px]">{lang.label}</span>
                  </span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-elaris-text" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
