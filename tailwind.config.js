/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDEAED',
          100: '#FBCDD2',
          200: '#F8A1A9',
          300: '#F57380',
          400: '#F24D5C',
          500: '#EE3F55', // Main primary color
          600: '#D32B40',
          700: '#B01F32',
          800: '#8F1826',
          900: '#6D121D',
        },
        accent: {
          DEFAULT: '#FFBB00',
          light: '#FFD54F',
          dark: '#FFB300',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 12px 40px rgba(238, 63, 85, 0.15)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'pizza-pattern': "url('/img/pizza-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};
