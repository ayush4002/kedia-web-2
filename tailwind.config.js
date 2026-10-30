/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limeAccent: {
          DEFAULT: '#D4E845',
          light: '#E2F365',
          dark: '#B4C82E',
          50: '#FAFDE8',
          100: '#F4FBC6',
          200: '#EAF795',
          300: '#DFF160',
          400: '#D4E845',
          500: '#BCD129',
          600: '#94A618',
        },
        navy: {
          DEFAULT: '#0B1F3A',
          50: '#EBF1F8',
          100: '#D2DEEE',
          200: '#A4BFDF',
          300: '#6FA0CE',
          400: '#3D7CBD',
          500: '#1D5A9C',
          600: '#123D70',
          700: '#0B1F3A',
          800: '#071527',
          900: '#040B15',
        },
        ivory: {
          DEFAULT: '#F6F1E7',
          50: '#FCFBF8',
          100: '#F6F1E7',
          200: '#ECE4D4',
          300: '#DFD2BC',
          400: '#D0BDA0',
          500: '#BEA481',
          600: '#A38760',
          700: '#816947',
          800: '#604C33',
          900: '#3F3120',
        },
        brass: {
          DEFAULT: '#C8A24B',
          50: '#FBF8F0',
          100: '#F5EDD9',
          200: '#ECDAB4',
          300: '#E2C48E',
          400: '#D5AE67',
          500: '#C8A24B',
          600: '#A98433',
          700: '#846624',
          800: '#5F4917',
          900: '#3B2D0B',
        },
        terracotta: {
          DEFAULT: '#D4735E',
          50: '#FAF1EF',
          100: '#F3DED9',
          200: '#E7BBB1',
          300: '#DA9687',
          400: '#D4735E',
          500: '#BD533D',
          600: '#9B402E',
          700: '#773022',
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'blueprint': '0 0 0 1px rgba(200, 162, 75, 0.25), 0 8px 32px rgba(11, 31, 58, 0.08)',
        'elevated': '0 16px 40px -8px rgba(11, 31, 58, 0.12), 0 0 0 1px rgba(11, 31, 58, 0.05)',
        'luxury': '0 24px 60px -12px rgba(11, 31, 58, 0.2), 0 0 0 1px rgba(200, 162, 75, 0.3)',
      },
      backgroundImage: {
        'blueprint-grid': "radial-gradient(circle at 1px 1px, rgba(200, 162, 75, 0.15) 1px, transparent 0)",
        'navy-blueprint': "linear-gradient(rgba(11, 31, 58, 0.96), rgba(11, 31, 58, 0.96)), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(200, 162, 75, 0.08) 39px, rgba(200, 162, 75, 0.08) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(200, 162, 75, 0.08) 39px, rgba(200, 162, 75, 0.08) 40px)",
      }
    },
  },
  plugins: [],
}

