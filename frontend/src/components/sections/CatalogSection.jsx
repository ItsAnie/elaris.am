import React, { useState, useEffect, useMemo } from 'react';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import invitationsData from '../../data/invitations';
import InvitationCard from '../ui/InvitationCard';
import useTranslation from '../../hooks/useTranslation';
import { fetchInvitations } from '../../services/api';

export default function CatalogSection({ selectedCategory, onCategoryChange, onOrderInvitation }) {
  const { t, getLocalized } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [invitations, setInvitations] = useState(invitationsData);

  // Strictly 5 categories + All
  const filterTabs = [
    { key: 'all', label: t('catalog.filterAll') },
    { key: 'wedding', label: t('catalog.filterWedding') },
    { key: 'engagement', label: t('catalog.filterEngagement') },
    { key: 'birthday', label: t('catalog.filterBirthday') },
    { key: 'baptism', label: t('catalog.filterBaptism') },
    { key: 'corporate', label: t('catalog.filterCorporate') },
  ];

  // Try fetching fresh data from backend, fallback to static
  useEffect(() => {
    let isMounted = true;
    async function loadBackendData() {
      try {
        const data = await fetchInvitations(selectedCategory === 'all' ? '' : selectedCategory);
        if (isMounted && data && Array.isArray(data) && data.length > 0) {
          setInvitations(data);
        }
      } catch (e) {
        // Fallback to local static
      }
    }
    loadBackendData();
    return () => { isMounted = false; };
  }, [selectedCategory]);

  // Client-side filtering by category and search
  const filteredInvitations = useMemo(() => {
    return invitations.filter((inv) => {
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === 'all' ||
        inv.category.toLowerCase() === selectedCategory.toLowerCase();

      const title = getLocalized(inv.title).toLowerCase();
      const desc = getLocalized(inv.description).toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || title.includes(q) || desc.includes(q) || inv.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [invitations, selectedCategory, searchQuery, getLocalized]);

  return (
    <section id="invitations" className="py-20 md:py-28 bg-elaris-bg relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-elaris-text-muted mb-2 block">
            {t('catalog.badge')}
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-elaris-dark tracking-tight">
            {t('catalog.title')}
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-elaris-text-muted leading-relaxed">
            {t('catalog.subtitle')}
          </p>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="space-y-6 mb-12">
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-elaris-text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('catalog.searchPlaceholder')}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-elaris-bg-card border border-elaris-border focus:border-elaris-accent text-sm text-elaris-text placeholder-elaris-text-muted/60 transition-all outline-none shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-elaris-text-muted hover:text-elaris-text"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs: Exactly 5 categories + All */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2 px-2">
            {filterTabs.map((tab) => {
              const isActive = (selectedCategory || 'all') === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onCategoryChange && onCategoryChange(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-elaris-dark text-elaris-bg shadow-sm'
                      : 'bg-elaris-bg-card text-elaris-text hover:bg-elaris-bg-secondary/70 border border-elaris-border/70'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredInvitations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
            {filteredInvitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                onOrder={onOrderInvitation}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-elaris-bg-card rounded-2xl border border-dashed border-elaris-border max-w-md mx-auto">
            <SlidersHorizontal className="w-8 h-8 mx-auto text-elaris-text-muted/60 mb-3" />
            <p className="text-sm text-elaris-text-muted">
              {t('catalog.noResults')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onCategoryChange && onCategoryChange('all');
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-elaris-bg border border-elaris-border text-elaris-text hover:bg-elaris-bg-secondary transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('catalog.filterAll')}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
