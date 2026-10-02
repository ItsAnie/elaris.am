import React from 'react';
import { Sparkles, Palette, FileText, Wand2, Eye, Send } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

const stepIcons = [Palette, FileText, Wand2, Eye, Send];

export default function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    {
      num: '01',
      title: t('howItWorks.steps.step1.title'),
      desc: t('howItWorks.steps.step1.desc'),
      icon: Palette
    },
    {
      num: '02',
      title: t('howItWorks.steps.step2.title'),
      desc: t('howItWorks.steps.step2.desc'),
      icon: FileText
    },
    {
      num: '03',
      title: t('howItWorks.steps.step3.title'),
      desc: t('howItWorks.steps.step3.desc'),
      icon: Wand2
    },
    {
      num: '04',
      title: t('howItWorks.steps.step4.title'),
      desc: t('howItWorks.steps.step4.desc'),
      icon: Eye
    },
    {
      num: '05',
      title: t('howItWorks.steps.step5.title'),
      desc: t('howItWorks.steps.step5.desc'),
      icon: Send
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-elaris-bg relative overflow-hidden">
      {/* Decorative background curve */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-elaris-border text-xs font-semibold text-elaris-accent mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('howItWorks.badge')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-elaris-text tracking-tight">
            {t('howItWorks.title')}
          </h2>

          <p className="mt-4 text-base sm:text-lg text-elaris-text-muted leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative bg-white/70 hover:bg-white rounded-3xl p-6 border border-elaris-border hover:border-elaris-accent/40 shadow-elaris-card hover:shadow-elaris-hover transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Top Bar: Number + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-3xl font-extrabold text-elaris-accent/40 group-hover:text-elaris-accent transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-elaris-bg flex items-center justify-center text-elaris-text group-hover:bg-elaris-accent group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-elaris-text mb-2.5">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-elaris-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-elaris-border/50 flex items-center gap-1.5 text-[11px] font-semibold text-elaris-accent uppercase tracking-wider">
                  <span>Step {step.num}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
