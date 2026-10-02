import React from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Cake, 
  Flame, 
  Briefcase, 
  ArrowRight
} from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

const iconMap = {
  HeartHandshake,
  Sparkles,
  Cake,
  Flame,
  Briefcase
};

export default function OccasionCard({ occasion, onSelect }) {
  const { t } = useTranslation();

  if (!occasion) return null;

  const IconComponent = iconMap[occasion.iconName] || Sparkles;
  const title = t(`occasions.items.${occasion.categoryKey}.title`);
  const description = t(`occasions.items.${occasion.categoryKey}.description`);

  return (
    <div
      onClick={() => onSelect && onSelect(occasion.categoryKey)}
      className="group relative bg-elaris-bg-card rounded-2xl p-6 border border-elaris-border hover:border-elaris-accent/70 shadow-elaris-soft hover:shadow-elaris-card transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden transform hover:-translate-y-1"
    >
      <div>
        {/* Icon & Category Tag Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-xl bg-elaris-bg-secondary/60 flex items-center justify-center text-elaris-text group-hover:bg-elaris-dark group-hover:text-elaris-bg transition-all duration-200">
            <IconComponent className="w-5 h-5 stroke-[1.5]" />
          </div>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-elaris-text-muted px-2 py-0.5 rounded-full bg-elaris-bg-secondary/40">
            {occasion.tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-medium text-elaris-dark group-hover:text-black transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs text-elaris-text-muted leading-relaxed">
          {description}
        </p>
      </div>

      {/* Footer Link Prompt */}
      <div className="mt-5 pt-3 border-t border-elaris-border/50 flex items-center justify-between text-xs font-medium text-elaris-text-muted group-hover:text-elaris-dark transition-colors">
        <span>{t('catalog.title')}</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform opacity-70" />
      </div>
    </div>
  );
}
