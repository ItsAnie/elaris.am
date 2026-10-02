import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CatalogSection from '../components/sections/CatalogSection';

export default function InvitationsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryFromUrl = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey);
    if (catKey === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catKey });
    }
  };

  const handleOrderInvitation = (invitation) => {
    navigate('/order', { state: { preselectedInvitation: invitation } });
  };

  return (
    <div className="pt-24 md:pt-28 min-h-screen">
      <CatalogSection
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onOrderInvitation={handleOrderInvitation}
      />
    </div>
  );
}
