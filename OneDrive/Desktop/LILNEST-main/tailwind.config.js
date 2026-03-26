/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
  ],
  theme: {
    extend: {
      colors: {
        /* Core Colors */
        background: 'var(--color-background)', /* soft off-white */
        foreground: 'var(--color-foreground)', /* deep forest tone */
        border: 'var(--color-border)', /* muted border tone */
        input: 'var(--color-input)', /* elevated surface color */
        ring: 'var(--color-ring)', /* deep forest green */
        
        /* Card Colors */
        card: {
          DEFAULT: 'var(--color-card)', /* elevated surface color */
          foreground: 'var(--color-card-foreground)' /* deep forest tone */
        },
        
        /* Popover Colors */
        popover: {
          DEFAULT: 'var(--color-popover)', /* soft off-white */
          foreground: 'var(--color-popover-foreground)' /* deep forest tone */
        },
        
        /* Muted Colors */
        muted: {
          DEFAULT: 'var(--color-muted)', /* elevated surface color */
          foreground: 'var(--color-muted-foreground)' /* muted green-gray */
        },
        
        /* Primary Colors */
        primary: {
          DEFAULT: 'var(--color-primary)', /* deep forest green */
          foreground: 'var(--color-primary-foreground)' /* soft off-white */
        },
        
        /* Secondary Colors */
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* sage green */
          foreground: 'var(--color-secondary-foreground)' /* deep forest tone */
        },
        
        /* Accent Colors */
        accent: {
          DEFAULT: 'var(--color-accent)', /* warm golden tone */
          foreground: 'var(--color-accent-foreground)' /* deep forest tone */
        },
        
        /* Success Colors */
        success: {
          DEFAULT: 'var(--color-success)', /* positive feedback color */
          foreground: 'var(--color-success-foreground)' /* soft off-white */
        },
        
        /* Warning Colors */
        warning: {
          DEFAULT: 'var(--color-warning)', /* earthy gold */
          foreground: 'var(--color-warning-foreground)' /* deep forest tone */
        },
        
        /* Error/Destructive Colors */
        error: {
          DEFAULT: 'var(--color-error)', /* muted terracotta */
          foreground: 'var(--color-error-foreground)' /* soft off-white */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* muted terracotta */
          foreground: 'var(--color-destructive-foreground)' /* soft off-white */
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'], /* modern geometric sans-serif */
        'body': ['Source Sans 3', 'sans-serif'], /* humanist sans-serif */
        'caption': ['Nunito Sans', 'sans-serif'], /* friendly rounded sans-serif */
        'mono': ['JetBrains Mono', 'monospace'] /* clean monospace */
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.5rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 2s ease-in-out infinite',
        'organic-grow': 'organic-grow 3s ease-out forwards'
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'breathe': 'cubic-bezier(0.4, 0, 0.6, 1)'
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '2000': '2000ms',
        '4000': '4000ms'
      },
      boxShadow: {
        'organic': '0 1px 3px rgba(45, 90, 61, 0.1), 0 4px 12px rgba(45, 90, 61, 0.05)',
        'organic-lg': '0 4px 6px rgba(45, 90, 61, 0.1), 0 8px 25px rgba(45, 90, 61, 0.08)',
        'organic-xl': '0 8px 15px rgba(45, 90, 61, 0.1), 0 16px 40px rgba(45, 90, 61, 0.06)',
        'floating': '0 4px 12px rgba(45, 90, 61, 0.1)',
        'floating-hover': '0 6px 20px rgba(45, 90, 61, 0.15)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate')
  ],
}