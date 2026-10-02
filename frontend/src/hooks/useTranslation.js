import { useLanguage } from '../contexts/LanguageContext';

export function useTranslation() {
  const { t, currentLang, changeLanguage, getLocalized, supportedLanguages } = useLanguage();
  return { t, currentLang, changeLanguage, getLocalized, supportedLanguages };
}

export default useTranslation;
