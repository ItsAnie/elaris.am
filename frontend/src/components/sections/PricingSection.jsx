import React from 'react';
import { Sparkles } from 'lucide-react';
import pricingData from '../../data/pricing';
import PricingCard from '../ui/PricingCard';
import useTranslation from '../../hooks/useTranslation';

export default function PricingSection({ onSelectPackage }) {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-20 md:py-28 bg-elaris-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-elaris-text tracking-tight">
            {t('pricing.title')}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-elaris-text-muted leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {pricingData.map((pkg) => (
            <PricingCard
              key={pkg.id}
              packageData={pkg}
              onSelect={onSelectPackage}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
