import React from 'react';
import { useNavigate } from 'react-router-dom';
import OccasionsSection from '../components/sections/OccasionsSection';

export default function OccasionsPage() {
  const navigate = useNavigate();

  const handleSelectOccasion = (categoryKey) => {
    navigate(`/invitations?category=${categoryKey}`);
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen">
      <OccasionsSection onSelectOccasion={handleSelectOccasion} />
    </div>
  );
}
