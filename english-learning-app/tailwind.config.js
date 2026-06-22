/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a4d4a',
          light: '#2a6b66',
          dark: '#0f3531',
        },
        secondary: {
          DEFAULT: '#f5f0e8',
          dark: '#e8e0d0',
        },
        accent: {
          gold: '#c9a959',
          green: '#4a9d7c',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans Pro', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
