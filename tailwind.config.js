/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/(frontend)/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./Header/**/*.{js,ts,jsx,tsx,mdx}",
    "./Footer/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFFF0',
        'off-white': '#FAFAF8',
        'warm-white': '#F5F5F0',
        charcoal: '#2C2C2C',
        'deep-charcoal': '#1A1A1A',
        'soft-black': '#0A0A0A',
        'glacier-grey': '#8899AA',
        'glacier-grey-light': '#9AACBE',
        'rose-gold': '#B89778',
        taupe: '#8B7D6B',
        'warm-gray': '#A9A9A9',
        'soft-beige': '#E8E3D9',
        stone: '#D4CFC5',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
