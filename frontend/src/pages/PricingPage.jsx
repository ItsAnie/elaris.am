import React from 'react';
import { useNavigate } from 'react-router-dom';
import PricingSection from '../components/sections/PricingSection';

export default function PricingPage() {
  const navigate = useNavigate();

  const handleSelectPackage = (pkg) => {
    navigate('/order', { state: { preselectedPackage: pkg } });
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen">
      <PricingSection onSelectPackage={handleSelectPackage} />
    </div>
  );
}
