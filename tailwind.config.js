/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#003366',
        secondary: '#6699cc',
        accent: '#b3d9ff',
        gold: '#d4af37',
        'dark-gold': '#b5922e',
        cream: '#f5f3ee',
        'text-dark': '#333333',
        'text-light': '#777777',
        medical: '#e6f2ff',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'Georgia', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 20px -5px rgba(212, 175, 55, 0.4)',
        'gold-lg': '0 10px 30px -5px rgba(212, 175, 55, 0.5)',
      }
    }
  },
  plugins: [],
}