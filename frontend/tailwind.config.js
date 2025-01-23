/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        work: ['"Work Sans"', 'sans-serif'],
      },
      colors: {
        light: '#F5F5F5',
        lightdiv: '#E6F7FF',
        dark: '#333333',
        buttons: '#0056D2',
        highlight: '#FFC107',
      },
      animation: {
        typing: 'typing 2s steps(30) infinite',
        'text-fade': 'text-fade 1s ease-in-out forwards',
        'fade-in': 'fade-in 1s ease-in-out forwards',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'text-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
