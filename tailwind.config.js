module.exports = {
  content: [
    "./packages/renderer/index.html",
    "./packages/renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: 'rgb(75,145,199)',
        600: 'rgb(34,129,204)',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      secondary: {
        50: '#fff',
        100: '#f1f5f9',
        200: 'rgb(232,232,232)',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: 'rgb(149,149,149)',
        900: '#0f172a',
      },
    },
  },
  plugins: [],
}
