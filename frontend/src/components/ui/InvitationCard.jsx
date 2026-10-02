import React from 'react';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';

export default function InvitationCard({ invitation, onOrder }) {
  const { t, getLocalized } = useTranslation();

  if (!invitation) return null;

  const title = getLocalized(invitation.title);
  const description = getLocalized(invitation.description);
  const formattedPrice = Number(invitation.price || 0).toLocaleString();

  // Category translation mapping
  const categoryKeys = {
    wedding: 'catalog.filterWedding',
    engagement: 'catalog.filterEngagement',
    birthday: 'catalog.filterBirthday',
    baptism: 'catalog.filterBaptism',
    corporate: 'catalog.filterCorporate'
  };
  const categoryLabel = t(categoryKeys[invitation.category] || 'catalog.filterWedding');

  return (
    <div className="group bg-elaris-bg-card rounded-2xl overflow-hidden border border-elaris-border hover:border-elaris-accent/60 shadow-elaris-soft hover:shadow-elaris-card transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Visual / Preview Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-elaris-bg-secondary/40">
        <img
          src={invitation.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide bg-elaris-bg-card/90 text-elaris-dark backdrop-blur-sm shadow-sm border border-elaris-border/50">
            {categoryLabel}
          </span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3 bg-elaris-dark/90 backdrop-blur-sm text-elaris-bg px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm">
          {formattedPrice} {t('catalog.priceCurrency')}
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-serif text-lg font-medium text-elaris-dark tracking-tight">
            {title}
          </h3>
          <p className="mt-1.5 text-xs text-elaris-text-muted leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Action Buttons: Minimal and Elegant */}
        <div className="mt-4 pt-3.5 border-t border-elaris-border/60 flex items-center gap-2">
          {/* View Button - opens exact previewUrl in new tab */}
          <a
            href={invitation.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={t('catalog.demoNotice')}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-medium border border-elaris-border text-elaris-text hover:border-elaris-dark hover:text-elaris-dark transition-all duration-200"
          >
            <span>{t('catalog.viewButton')}</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Order Button - pre-selects invitation in order form */}
          <button
            type="button"
            onClick={() => onOrder && onOrder(invitation)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-medium bg-elaris-dark text-elaris-bg hover:bg-black transition-all duration-200 shadow-sm"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>{t('catalog.orderButton')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
