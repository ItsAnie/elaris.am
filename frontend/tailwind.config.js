/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elaris: {
          bg: '#F7F3EE',             // Primary background: Warm ivory
          'bg-secondary': '#EFE8DF',   // Secondary background: Soft beige
          'bg-card': '#FBF9F6',        // Card background: Warm white surface
          text: '#3F3A36',             // Main text: Deep warm charcoal
          'text-muted': '#77706A',       // Secondary text: Warm taupe gray
          'text-light': '#9C958E',       // Light muted text
          accent: '#B8A79A',           // Soft accent: Warm taupe
          'accent-hover': '#A39183',     // Taupe hover
          'accent-subtle': '#EAE1D7',    // Subtle warm highlight
          champagne: '#C9B6A8',        // Optional subtle accent / warm champagne
          border: '#DDD4CA',           // Delicate warm border
          'border-light': 'rgba(221, 212, 202, 0.45)',
          dark: '#2F2B28',             // Deep editorial charcoal for buttons
          'dark-hover': '#1F1C1A'
        }
      },
      fontFamily: {
        serif: ['"Noto Serif Armenian"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Noto Sans Armenian"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elaris-soft': '0 4px 20px -2px rgba(63, 58, 54, 0.04)',
        'elaris-card': '0 10px 30px -10px rgba(63, 58, 54, 0.06)',
        'elaris-hover': '0 18px 40px -12px rgba(63, 58, 54, 0.1)',
        'elaris-dropdown': '0 14px 35px -8px rgba(63, 58, 54, 0.12), 0 4px 12px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-down': 'slideDown 0.25s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
