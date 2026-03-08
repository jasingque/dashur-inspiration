/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-delay-100': 'bounce 1s ease-in-out infinite 0.1s',
        'bounce-delay-200': 'bounce 1s ease-in-out infinite 0.2s',
        'bounce-delay-300': 'bounce 1s ease-in-out infinite 0.3s',
        
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.my-custom-class': {
          'color': 'red',
        },
      })
    },
  ],
}