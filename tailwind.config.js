/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#c72828',
        primaryDark: '#d6112f',
        secondary: '#EC4899',
        background: '#F3F4F6',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        textTertiary: '#EBEBF599',

        dashboardGradient1: '#FF7170',
        dashboardGradient2: '#9F1110',
        dashboardGradient3: '#B81614',
        dashboardGradient4: '#F9030783',
      },
      borderRadius: {
        '5xl': 40,
        '6xl': 45,
        '7xl': 50,
      }
    },
  },
  plugins: [],
}