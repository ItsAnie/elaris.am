import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import OccasionsSection from './components/sections/OccasionsSection';
import CatalogSection from './components/sections/CatalogSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import FeaturesSection from './components/sections/FeaturesSection';
import PricingSection from './components/sections/PricingSection';
import OrderSection from './components/sections/OrderSection';
import ContactSection from './components/sections/ContactSection';
import FaqSection from './components/sections/FaqSection';

function MainApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [preselectedInvitation, setPreselectedInvitation] = useState(null);
  const [preselectedPackage, setPreselectedPackage] = useState(null);

  const scrollToElement = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -70;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // When user clicks an occasion card, filter catalog and scroll down to it
  const handleSelectOccasion = (categoryKey) => {
    setSelectedCategory(categoryKey);
    scrollToElement('invitations');
  };

  // When user clicks "Order" on an invitation card
  const handleOrderInvitation = (invitation) => {
    setPreselectedInvitation(invitation);
    scrollToElement('order');
  };

  // When user selects a package in pricing
  const handleSelectPackage = (pkg) => {
    setPreselectedPackage(pkg);
    scrollToElement('order');
  };

  // Quick navigation helpers
  const handleViewInvitations = () => {
    scrollToElement('invitations');
  };

  const handleOrderClick = () => {
    scrollToElement('order');
  };

  return (
    <div className="min-h-screen flex flex-col bg-elaris-bg text-elaris-text selection:bg-elaris-accent-light selection:text-elaris-text font-sans">
      {/* Sticky Header with Logo and Language Switcher */}
      <Header onOrderClick={handleOrderClick} />

      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection
          onViewInvitations={handleViewInvitations}
          onOrderClick={handleOrderClick}
        />

        {/* 2. Occasions Section */}
        <OccasionsSection
          onSelectOccasion={handleSelectOccasion}
        />

        {/* 3. Catalog Section with search & filter */}
        <CatalogSection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onOrderInvitation={handleOrderInvitation}
        />

        {/* 4. How It Works */}
        <HowItWorksSection />

        {/* 5. Features Section */}
        <FeaturesSection />

        {/* 6. Pricing Packages */}
        <PricingSection
          onSelectPackage={handleSelectPackage}
        />

        {/* 7. Order Form */}
        <OrderSection
          preselectedInvitation={preselectedInvitation}
          preselectedPackage={preselectedPackage}
        />

        {/* 8. FAQ Accordion */}
        <FaqSection />

        {/* 9. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
