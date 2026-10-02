import React from 'react';
import { X, ArrowRight } from 'lucide-react';
import Logo from '../ui/Logo';
import LanguageSwitcher from './LanguageSwitcher';
import useTranslation from '../../hooks/useTranslation';

export default function MobileNav({ isOpen, onClose, navItems, onNavigate, onOrderClick }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-elaris-dark/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-elaris-bg shadow-elaris-dropdown flex flex-col justify-between p-6 z-10 border-l border-elaris-border animate-slide-down">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-elaris-border/70">
            <Logo size="sm" onClick={() => { onNavigate('hero'); onClose(); }} />
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-elaris-text hover:bg-elaris-bg-secondary transition-colors"
              aria-label={t('nav.closeMenu')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="mt-6 flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="w-full text-left py-3 px-3.5 rounded-xl text-sm font-medium text-elaris-text hover:text-elaris-dark hover:bg-elaris-bg-secondary/60 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-40" />
              </button>
            ))}
          </nav>
        </div>

        {/* Footer controls: language selector & CTA */}
        <div className="pt-6 border-t border-elaris-border/70 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-elaris-text-muted">Language:</span>
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={() => {
              onOrderClick();
              onClose();
            }}
            className="w-full py-3 px-4 rounded-full bg-elaris-dark text-elaris-bg font-medium text-xs tracking-wide uppercase flex items-center justify-center gap-2 shadow-sm hover:bg-black transition-colors"
          >
            <span>{t('nav.orderCta')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
