/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#F8E7B4',
          DEFAULT: '#D4AF37',
          dark: '#997E24',
          antique: '#C5A059',
        },
        royal: {
          crimson: '#8B0000',
          burgundy: '#5B0E1E',
          deepRed: '#7A1828',
          sandstone: '#E8D8C3',
          cream: '#FFF9F0',
        }
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        script: ['var(--font-great-vibes)', 'cursive'],
        royal: ['var(--font-marcellus)', 'Cinzel', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
      boxShadow: {
        'royal': '0 10px 40px -10px rgba(184, 134, 11, 0.35)',
        'glow': '0 0 25px rgba(212, 175, 55, 0.45)',
      }
    },
  },
  plugins: [],
};
