import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import Accordion from '../ui/Accordion';
import useTranslation from '../../hooks/useTranslation';

export default function FaqSection() {
  const { t } = useTranslation();

  // Retrieve translated FAQ items
  const faqItems = t('faq.items');
  const items = Array.isArray(faqItems) ? faqItems : [];

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-elaris-text tracking-tight">
            {t('faq.title')}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-elaris-text-muted leading-relaxed">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <Accordion items={items} />

        {/* Extra Prompt */}
        <div className="mt-14 text-center">
          <p className="text-sm text-elaris-text-muted">
            Չգտա՞ք Ձեր հարցի պատասխանը։{' '}
            <a
              href="#contact"
              className="text-elaris-accent hover:underline font-semibold"
            >
              Կապվեք մեզ հետ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
