/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutrals tinted with the logo's blue-grey / teal.
        gray: {
          50: '#f3f7f8',
          100: '#e3ecee',
          200: '#c8d6da',
          300: '#a5b8be',
          400: '#8097a0',
          500: '#62777f',
          600: '#46585f',
          700: '#2f3f46',
          800: '#1c2a30',
          900: '#111c21',
          950: '#0a1115',
        },
        // Logo turquoise.
        brand: {
          300: '#6fe0d2',
          400: '#2fd0bd',
          500: '#1fbfae',
          600: '#14917f',
          700: '#0f6e61',
          900: '#0a3a35',
        },
      },
    },
  },
  plugins: [],
}
