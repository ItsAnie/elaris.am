import React from 'react';
import { Check } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

export default function PricingCard({ packageData, onSelect }) {
  const { t } = useTranslation();

  if (!packageData) return null;

  const key = packageData.key;
  const name = t(`pricing.packages.${key}.name`);
  const price = t(`pricing.packages.${key}.price`);
  const desc = t(`pricing.packages.${key}.desc`);
  const features = t(`pricing.packages.${key}.features`);
  const featuresList = Array.isArray(features) ? features : [];

  const isPopular = packageData.popular;
  const isBespoke = packageData.bespoke;

  return (
    <div
      className={`relative bg-elaris-bg-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
        isPopular
          ? 'border-2 border-elaris-accent shadow-elaris-card md:-translate-y-2'
          : isBespoke
          ? 'border border-elaris-border shadow-elaris-soft'
          : 'border border-elaris-border shadow-elaris-soft'
      }`}
    >
      {/* Featured Ribbon / Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center bg-elaris-dark text-elaris-bg text-[10px] uppercase tracking-wider font-semibold px-3 py-0.5 rounded-full shadow-sm">
            {t('pricing.popular')}
          </span>
        </div>
      )}

      {isBespoke && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="inline-flex items-center bg-elaris-accent text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-0.5 rounded-full shadow-sm">
            {t('pricing.bespoke')}
          </span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="text-center pb-5 border-b border-elaris-border/70">
          <h3 className="font-serif text-xl font-bold tracking-tight text-elaris-dark">
            {name}
          </h3>
          <p className="mt-1.5 text-xs text-elaris-text-muted min-h-[36px] leading-relaxed">
            {desc}
          </p>

          <div className="mt-4 flex items-baseline justify-center gap-1">
            <span className="font-serif text-3xl sm:text-4xl font-normal text-elaris-dark tracking-tight">
              {price}
            </span>
            <span className="text-sm font-medium text-elaris-text-muted">֏</span>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="py-5 space-y-2.5">
          {featuresList.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className="mt-0.5 w-4 h-4 rounded-full bg-elaris-bg-secondary flex items-center justify-center flex-shrink-0 text-elaris-dark">
                <Check className="w-2.5 h-2.5 stroke-[2]" />
              </div>
              <span className="text-xs sm:text-sm text-elaris-text leading-snug">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="pt-3">
        <button
          type="button"
          onClick={() => onSelect && onSelect(packageData)}
          className={`w-full py-2.5 px-4 rounded-full text-xs font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer shadow-sm ${
            isPopular
              ? 'bg-elaris-dark text-elaris-bg hover:bg-black'
              : 'border border-elaris-border text-elaris-text hover:border-elaris-dark hover:text-elaris-dark hover:bg-elaris-bg-secondary/40'
          }`}
        >
          {t('pricing.cta')}
        </button>
      </div>
    </div>
  );
}
