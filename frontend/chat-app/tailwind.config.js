// tailwind.config.js (V3 Syntax)

module.exports = { // Using module.exports for maximum V3 compatibility
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}