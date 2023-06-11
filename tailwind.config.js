/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#6278FF',
        'yellow': '#FFEF80',
        'green': '#3EE8B5',
        'cyan': '#0CC5DB',
        'custom-blue':'#397FEB',
        'logo-white':'#D9D9D9',
        'dark':'#141414',
        'pink':'#FF557A',
        'purple':'#94A4FF'
      },
    },
    
  },
  plugins: [],
}

