import React from 'react';

/**
 * Reusable ELARIS Button Component
 * Warm neutral luxury studio aesthetic
 */
export default function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon,
  iconPosition = 'left'
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-elaris-accent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary: 'bg-elaris-dark text-elaris-bg hover:bg-black shadow-sm hover:shadow',
    secondary: 'bg-elaris-accent text-white hover:bg-elaris-accent-hover shadow-sm',
    outline: 'border border-elaris-border text-elaris-text hover:border-elaris-dark hover:text-elaris-dark hover:bg-elaris-bg-secondary/40',
    ghost: 'text-elaris-text hover:text-elaris-dark hover:bg-elaris-bg-secondary/50'
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-xs sm:text-sm px-5 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-7 py-3 gap-2.5'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
    </button>
  );
}
