/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#A855F7',
          500: '#6E3BFF',
          600: '#7C3AED',
        },
        blue: {
          400: '#00D4FF',
          500: '#3B82F6',
          600: '#2563EB',
        },
        green: {
          400: '#00FF9D',
          500: '#10B981',
          600: '#059669',
        },
        gray: {
          800: '#1E1E2E',
          900: '#0F0F23',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-pattern': 'linear-gradient(90deg, rgba(110,59,255,0.1) 1px, transparent 1px), linear-gradient(rgba(110,59,255,0.1) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
  safelist: [
    // Dynamic class generation for stats cards
    {
      pattern: /(bg|text|border)-(purple|blue|green|yellow|red)-(400|500|600)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /(from|to)-(purple|blue|green|yellow|red)-(500|600)/,
      variants: ['hover'],
    },
  ],
};