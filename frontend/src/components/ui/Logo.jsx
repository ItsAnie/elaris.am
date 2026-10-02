import React from 'react';
import elarisLogoImg from '../../assets/elaris-logo.png';

/**
 * ELARIS Brand Logo Component
 *
 * Uses the EXACT original logo asset provided by the user (media_1790714732083.png),
 * featuring the original calligraphy flourish, 4-pointed sparkle star,
 * and exact subtitle "DIGITAL INVITATIONS".
 */
export default function Logo({
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  className = '',
  onClick
}) {
  // Height classes that give comfortable, prominent, non-cramped visibility
  const sizeClasses = {
    sm: 'h-11 sm:h-12',
    md: 'h-14 sm:h-16',
    lg: 'h-20 sm:h-24',
    xl: 'h-28 sm:h-32'
  }[size] || 'h-14 sm:h-16';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center select-none ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      aria-label="ELARIS Digital Invitations"
    >
      <img
        src={elarisLogoImg}
        alt="ELARIS — Digital Invitations"
        className={`${sizeClasses} w-auto object-contain mix-blend-multiply transition-opacity duration-200 hover:opacity-95`}
        loading="eager"
      />
    </div>
  );
}
