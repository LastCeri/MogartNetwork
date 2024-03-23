/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        pulseGreenBorder: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'rgba(5, 150, 105, 0.75)' }, 
        },
        voiceActivity: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.75' },
        },
      },
      animation: {
        pulseGreenBorder: 'pulseGreenBorder 5s infinite',
        voiceActivity: 'voiceActivity 10.5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}

