import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Logo from '../ui/Logo';
import LanguageSwitcher from './LanguageSwitcher';
import MobileNav from './MobileNav';
import useTranslation from '../../hooks/useTranslation';

export default function Header({ onOrderClick }) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'invitations', label: t('nav.invitations') },
    { id: 'occasions', label: t('nav.occasions') },
    { id: 'how-it-works', label: t('nav.howItWorks') },
    { id: 'pricing', label: t('nav.pricing') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -75;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-elaris-bg/95 backdrop-blur-md shadow-elaris-soft py-2.5 sm:py-3 border-b border-elaris-border'
            : 'bg-elaris-bg/80 backdrop-blur-sm py-3.5 sm:py-4 border-b border-elaris-border/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between">
          {/* Logo on Left: Exact original logo asset */}
          <div className="flex-shrink-0 flex items-center">
            <Logo
              size="md"
              onClick={() => scrollToSection('hero')}
            />
          </div>

          {/* Centered Navigation Links: Generous spacing & clean typography */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-[13.5px] font-sans font-medium text-elaris-text/75 hover:text-elaris-dark tracking-[0.01em] transition-colors duration-200 cursor-pointer relative py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Side Controls: Dropdown Language Selector & Minimalist CTA */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-5">
            {/* Elegant Language Dropdown */}
            <LanguageSwitcher />

            {/* Subtle Luxury CTA Button */}
            <button
              type="button"
              onClick={onOrderClick}
              className="px-5 py-2 rounded-full text-xs font-medium tracking-wide uppercase bg-elaris-dark text-elaris-bg hover:bg-black transition-all duration-200 shadow-sm cursor-pointer"
            >
              {t('nav.orderCta')}
            </button>
          </div>

          {/* Mobile Right Controls: Language Dropdown + Hamburger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-elaris-text hover:bg-elaris-bg-secondary/60 transition-colors"
              aria-label={t('nav.openMenu')}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        onNavigate={scrollToSection}
        onOrderClick={onOrderClick}
      />
    </>
  );
}
