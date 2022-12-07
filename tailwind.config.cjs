/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
      'serif': ['Roboto Serif', 'ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular']
    },
    extend: {},
  },
  plugins: [],
}