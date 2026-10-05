/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: '#EDEBDE', dim: '#E3E0CF' },
        ink: { DEFAULT: '#1F2420', soft: '#3B443C' },
        forest: { DEFAULT: '#3B5D48', deep: '#264034', light: '#6B9A7C' },
        ochre: { DEFAULT: '#B8862E', light: '#D4A65A', text: '#7A5519' },
        brick: { DEFAULT: '#A24A3B', light: '#C16B54' },
        nightpaper: '#EDEBDD',
        night: { DEFAULT: '#14180F', card: '#1B211A', line: '#2B332A' },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Newsreader"', 'Georgia', 'serif'],
        mono: ['"Courier Prime"', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
      },
      fontWeight: { medium: '600' },
      boxShadow: {
        // Hard offset "printed" edge instead of a soft blur.
        card: '4px 4px 0 0 rgba(31,36,32,0.85)',
        'card-lg': '7px 7px 0 0 rgba(31,36,32,0.85)',
      },
    },
  },
  plugins: [],
}
