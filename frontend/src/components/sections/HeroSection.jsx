import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Volume2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';
import useTranslation from '../../hooks/useTranslation';
import framyImg1 from '../../assets/framy-img1.png';
import framyImg2 from '../../assets/framy-img2.png';

export default function HeroSection({ onViewInvitations, onOrderClick }) {
  const { t } = useTranslation();

  // Simulated countdown for mockup card
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    mins: 28,
    secs: 50
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 };
        return { ...prev, hours: Math.max(0, prev.hours - 1), mins: 59, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-elaris-accent-light/30 via-elaris-bg-secondary/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex uppercase items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-elaris-border shadow-sm text-xs font-semibold text-elaris-text tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-elaris-accent" />
              <span>Elaris - Թվային հրավիրատոմսեր</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3.5xl sm:text-5xl lg:text-6xl font-bold text-elaris-text tracking-tight leading-[1.18]">
              {t('hero.title')}
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-elaris-text-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onOrderClick}
                className="w-full sm:w-auto shadow-md"
              >
                {t('hero.createInvitation')}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onViewInvitations}
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto bg-white/60 hover:bg-white"
              >
                {t('hero.viewInvitations')}
              </Button>
            </div>

          </div>

          {/* Right Column: Interactive Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
              {/* Phone Frame */}
              <div className='flex'>
                <img src={framyImg1} className='rounded-3xl' />
                <img src={framyImg2} className='absolute z-10 right-1/4 top-6 rounded-3xl' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
