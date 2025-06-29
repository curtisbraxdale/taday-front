/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ['JetBrains Mono', 'monospace'],
        'mono': ['Space Mono', 'monospace'],
        'body': ['Space Mono', 'monospace'],
      },
      spacing: {
        '30': '7.5rem', // 120px - 1.25x wider than w-24 (96px)
        '45': '11.25rem', // 180px - 1.5x wider than w-30 (120px)
      },
      colors: {
        background: '#C0C0C0',
        foreground: '#2D3436',
        taday: {
          primary: '#2D3436',
          secondary: '#636E72',
          accent: '#00B894',
          background: '#C0C0C0',
          error: '#D63031',
          success: '#00B894',
          white: '#FFFFFF',
          light: '#DDD6FE',
          win98: {
            gray: '#C0C0C0',
            darkGray: '#808080',
            lightGray: '#E0E0E0',
            blue: '#0000FF',
            red: '#FF0000',
            green: '#008000',
            yellow: '#FFFF00',
            black: '#000000',
            white: '#FFFFFF',
          }
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3436',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#2D3436',
        },
        primary: {
          DEFAULT: '#2D3436',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#636E72',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#C0C0C0',
          foreground: '#636E72',
        },
        accent: {
          DEFAULT: '#00B894',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#D63031',
          foreground: '#FFFFFF',
        },
        border: '#808080',
        input: '#C0C0C0',
        ring: '#00B894',
        chart: {
          1: '#00B894',
          2: '#636E72',
          3: '#2D3436',
          4: '#D63031',
          5: '#74B9FF',
        },
      },
      borderRadius: {
        lg: '0rem',
        md: '0rem',
        sm: '0rem',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in': {
          from: {
            opacity: '0',
            transform: 'translateX(-10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};