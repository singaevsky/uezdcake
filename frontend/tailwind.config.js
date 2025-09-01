// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFF8F0',
        // 'rose': '#FADADD', // Удалите это, чтобы вернуть стандартные оттенки
        'mint': '#D0F0C0',
        'chocolate': '#6B4423',
        'gold': '#D4AF37',
        'dark-chocolate': '#4A2C17',
      },
    },
  },
  plugins: [],
}
