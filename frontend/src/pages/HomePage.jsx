import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '../components/sections/HeroSection';
import OccasionsSection from '../components/sections/OccasionsSection';
import InvitationCard from '../components/ui/InvitationCard';
import FeaturesSection from '../components/sections/FeaturesSection';
import invitationsData from '../data/invitations';
import useTranslation from '../hooks/useTranslation';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Top 4 curated invitations for the homepage preview
  const featuredInvitations = invitationsData.slice(0, 4);

  const handleOrderInvitation = (invitation) => {
    navigate('/order', { state: { preselectedInvitation: invitation } });
  };

  const handleSelectOccasion = (categoryKey) => {
    navigate(`/invitations?category=${categoryKey}`);
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection
        onViewInvitations={() => navigate('/invitations')}
        onOrderClick={() => navigate('/order')}
      />

      {/* 2. Occasions Section */}
      <OccasionsSection onSelectOccasion={handleSelectOccasion} />

      {/* 3. Featured Invitations Preview */}
      <section className="py-20 md:py-24 bg-elaris-bg border-t border-elaris-border/40">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-elaris-text-muted mb-2 block">
                {t('catalog.badge')}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-elaris-dark tracking-tight">
                {t('catalog.title')}
              </h2>
            </div>

            <Link
              to="/invitations"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold text-elaris-dark hover:text-black uppercase tracking-wider group"
            >
              <span>{t('hero.viewInvitations')}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInvitations.map((inv) => (
              <InvitationCard
                key={inv.id}
                invitation={inv}
                onOrder={handleOrderInvitation}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Digital Features */}
      <FeaturesSection />

      {/* 5. Studio Banner CTA */}
      <section className="py-16 md:py-20 bg-elaris-bg-secondary/40 border-t border-elaris-border/60">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <Sparkles className="w-6 h-6 mx-auto text-elaris-accent mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-elaris-dark tracking-tight">
            {t('hero.title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-elaris-text-muted max-w-xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/order"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-elaris-dark text-elaris-bg text-xs font-medium uppercase tracking-wide hover:bg-black transition-all shadow-sm"
            >
              {t('hero.createInvitation')}
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-3 rounded-full border border-elaris-border text-elaris-text text-xs font-medium uppercase tracking-wide hover:border-elaris-dark hover:text-elaris-dark transition-all"
            >
              {t('nav.pricing')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
