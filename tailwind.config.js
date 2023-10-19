/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.vue",
    "./src/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope'],
        logo: ['Titillium Web']
      },
      fontSize: {
        'xxs': '0.65rem'
      },
      colors: {
        primary: {
          DEFAULT: '#14348A',
          50: '#F6FAFE',
          100: '#E0ECFB',
          200: '#B3D0F4',
          300: '#86B0EE',
          400: '#5A8EE8',
          500: '#2D6AE1',
          600: '#1B4CBC',
          700: '#14348A',
          800: '#0D1F59',
          900: '#060D28',
        },
        secondary: '#ff731d',
        paper: '#fff769',
        shade: '#1746a2'
      }
    },
    fontWeight: {
      'normal': '500',
      'bold': '800',
    },
  },
  plugins: [],
}

