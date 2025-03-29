import { outfit } from '@/app/fonts';
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class', 'html'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        construction: {
          yellow: '#FFCC00',
          orange: '#FF6600',
          grey: '#333333',
          blue: '#4682B4',
          white: '#F2F2F2',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        bebas: 'var(--font-bebas)',
        montserrat: 'var(--font-montserrat)',
        outfit: 'var(--font-outfit)',
        quicksand: 'var(--font-quicksand)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'build-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.02)', opacity: '0.7' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'pulse-soft': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.9',
            transform: 'scale(1.03)',
          },
        },
        'rotate-gear': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'number-count': {
          '0%': { transform: 'translateY(0)' },
          '10%': { transform: 'translateY(-100%)' },
          '20%': { transform: 'translateY(-200%)' },
          '30%': { transform: 'translateY(-300%)' },
          '40%': { transform: 'translateY(-400%)' },
          '50%': { transform: 'translateY(-500%)' },
          '60%': { transform: 'translateY(-600%)' },
          '70%': { transform: 'translateY(-700%)' },
          '80%': { transform: 'translateY(-800%)' },
          '90%': { transform: 'translateY(-900%)' },
          '100%': { transform: 'translateY(-1000%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.7s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.7s ease-out forwards',
        'build-in': 'build-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        typewriter: 'typewriter 3s steps(40) forwards',
        'pulse-soft': 'pulse-soft 3s infinite ease-in-out',
        'rotate-gear': 'rotate-gear 10s linear infinite',
        'rotate-gear-reverse': 'rotate-gear 15s linear infinite reverse',
        'number-count': 'number-count 1s infinite',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
