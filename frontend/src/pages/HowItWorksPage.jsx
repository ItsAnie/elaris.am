import React from 'react';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import FeaturesSection from '../components/sections/FeaturesSection';

export default function HowItWorksPage() {
  return (
    <div className="pt-24 md:pt-28 min-h-screen">
      <HowItWorksSection />
      <FeaturesSection />
    </div>
  );
}
