/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#0762FE',
        'dark': '#090909',
        'yellow': '#FFEF80',
        'green': '#3EE8B5',
        'cyan': '#0CC5DB',
        'custom-blue':'#397FEB'
      },
    },
    
  },
  plugins: [],
}

