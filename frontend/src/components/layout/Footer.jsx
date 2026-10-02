import React from 'react';
import { ArrowUp, Instagram, Send, Phone, Mail, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';
import LanguageSwitcher from './LanguageSwitcher';
import contactConfig from '../../data/contactConfig';
import useTranslation from '../../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'hero', label: t('nav.home') },
    { id: 'invitations', label: t('nav.invitations') },
    { id: 'occasions', label: t('nav.occasions') },
    { id: 'how-it-works', label: t('nav.howItWorks') },
    { id: 'pricing', label: t('nav.pricing') },
    { id: 'faq', label: t('nav.faq') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const occasionLinks = [
    { key: 'wedding', label: t('occasions.items.wedding.title') },
    { key: 'engagement', label: t('occasions.items.engagement.title') },
    { key: 'birthday', label: t('occasions.items.birthday.title') },
    { key: 'baptism', label: t('occasions.items.baptism.title') },
    { key: 'corporate', label: t('occasions.items.corporate.title') },
  ];

  return (
    <footer className="bg-elaris-bg-secondary/40 border-t border-elaris-border pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-elaris-border/70">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showSubtitle={true} onClick={scrollToTop} />
            <p className="text-sm text-elaris-text-muted leading-relaxed max-w-sm pt-2">
              {t('footer.brandDescription')}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 pt-3">
              <a
                href={contactConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white border border-elaris-border flex items-center justify-center text-elaris-text hover:text-elaris-accent hover:border-elaris-accent transition-colors shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={contactConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-10 h-10 rounded-full bg-white border border-elaris-border flex items-center justify-center text-elaris-text hover:text-elaris-accent hover:border-elaris-accent transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-serif text-base font-semibold text-elaris-text mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm text-elaris-text-muted">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-elaris-accent transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Occasions */}
          <div>
            <h4 className="font-serif text-base font-semibold text-elaris-text mb-4">
              {t('footer.occasions')}
            </h4>
            <ul className="space-y-2.5 text-sm text-elaris-text-muted">
              {occasionLinks.map((item) => (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('invitations')}
                    className="hover:text-elaris-accent transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info & Lang */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-semibold text-elaris-text mb-4">
              {t('footer.contactInfo')}
            </h4>
            <div className="space-y-2.5 text-sm text-elaris-text-muted">
              <a
                href={`tel:${contactConfig.phoneRaw}`}
                className="flex items-center gap-2 hover:text-elaris-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-elaris-accent flex-shrink-0" />
                <span>{contactConfig.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${contactConfig.email}`}
                className="flex items-center gap-2 hover:text-elaris-accent transition-colors"
              >
                <Mail className="w-4 h-4 text-elaris-accent flex-shrink-0" />
                <span>{contactConfig.email}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-elaris-accent flex-shrink-0" />
                <span>{contactConfig.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <LanguageSwitcher isMobile={false} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-elaris-text-muted">
          <div>
            © {new Date().getFullYear()} ELARIS. {t('footer.rights')}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-elaris-border hover:border-elaris-text hover:text-elaris-text transition-colors shadow-sm"
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
