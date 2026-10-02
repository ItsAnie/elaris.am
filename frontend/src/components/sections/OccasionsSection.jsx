import React from 'react';
import { Sparkles } from 'lucide-react';
import occasionsData from '../../data/occasions';
import OccasionCard from '../ui/OccasionCard';
import useTranslation from '../../hooks/useTranslation';

export default function OccasionsSection({ onSelectOccasion }) {
  const { t } = useTranslation();

  return (
    <section id="occasions" className="py-20 md:py-28 bg-elaris-bg-secondary/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-elaris-border text-xs font-semibold text-elaris-accent mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('occasions.badge')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-elaris-text tracking-tight">
            {t('occasions.title')}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-elaris-text-muted leading-relaxed">
            {t('occasions.subtitle')}
          </p>
        </div>

        {/* Data-driven Occasions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasionsData.map((occasion) => (
            <OccasionCard
              key={occasion.id}
              occasion={occasion}
              onSelect={onSelectOccasion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
