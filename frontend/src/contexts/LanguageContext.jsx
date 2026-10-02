import React, { createContext, useContext, useState, useEffect } from 'react';
import hy from '../locales/hy.json';
import ru from '../locales/ru.json';
import en from '../locales/en.json';

const translations = { hy, ru, en };
const SUPPORTED_LANGUAGES = ['hy', 'ru', 'en'];
const DEFAULT_LANGUAGE = 'hy';
const STORAGE_KEY = 'elaris_language';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Could not read language from localStorage:', e);
    }
    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, currentLang);
      document.documentElement.lang = currentLang;
    } catch (e) {
      console.warn('Could not save language to localStorage:', e);
    }
  }, [currentLang]);

  const changeLanguage = (lang) => {
    if (SUPPORTED_LANGUAGES.includes(lang)) {
      setCurrentLang(lang);
    }
  };

  /**
   * Translate a key using dot notation, e.g. t('hero.title')
   */
  const t = (path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    let current = translations[currentLang];

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to Armenian if key is missing in active language
        let fallbackVal = translations[DEFAULT_LANGUAGE];
        for (const p of parts) {
          if (fallbackVal && typeof fallbackVal === 'object' && p in fallbackVal) {
            fallbackVal = fallbackVal[p];
          } else {
            return fallback || path;
          }
        }
        return fallbackVal !== undefined ? fallbackVal : (fallback || path);
      }
    }
    return current !== undefined ? current : (fallback || path);
  };

  /**
   * Helper for localized objects: { hy: "...", ru: "...", en: "..." }
   */
  const getLocalized = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[currentLang] || obj[DEFAULT_LANGUAGE] || obj['en'] || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        changeLanguage,
        t,
        getLocalized,
        supportedLanguages: [
          { code: 'hy', label: 'Հայերեն', short: 'HY' },
          { code: 'ru', label: 'Русский', short: 'RU' },
          { code: 'en', label: 'English', short: 'EN' }
        ]
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
