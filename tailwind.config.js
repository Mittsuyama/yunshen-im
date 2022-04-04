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
        400: 'rgb(158,158,158)',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: 'rgb(149,149,149)',
        900: '#0f172a',
      },
      red: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
      }
    },
  },
  plugins: [],
}
