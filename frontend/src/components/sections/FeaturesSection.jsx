import React from 'react';
import { 
  CheckCircle2, 
  Users, 
  Clock, 
  MapPin, 
  Music, 
  Camera, 
  CalendarDays, 
  Sparkles, 
  Share2, 
  Smartphone 
} from 'lucide-react';
import featuresData from '../../data/features';
import useTranslation from '../../hooks/useTranslation';

const featureIconMap = {
  CheckCircle2,
  Users,
  Clock,
  MapPin,
  Music,
  Camera,
  CalendarDays,
  Sparkles,
  Share2,
  Smartphone
};

export default function FeaturesSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-elaris-text tracking-tight">
            {t('features.title')}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-elaris-text-muted leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {featuresData.map((item) => {
            const Icon = featureIconMap[item.iconName] || Sparkles;
            const title = t(`features.items.${item.key}.title`);
            const desc = t(`features.items.${item.key}.desc`);

            return (
              <div
                key={item.id}
                className="group bg-elaris-bg/50 hover:bg-white rounded-2xl p-6 border border-elaris-border hover:border-elaris-accent/40 shadow-sm hover:shadow-elaris-card transition-all duration-300 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-elaris-border/70 flex items-center justify-center text-elaris-accent group-hover:bg-elaris-accent group-hover:text-white transition-all duration-300 shadow-sm mb-4">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                <h3 className="font-serif text-base font-semibold text-elaris-text mb-2 group-hover:text-elaris-accent transition-colors">
                  {title}
                </h3>

                <p className="text-xs sm:text-sm text-elaris-text-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
