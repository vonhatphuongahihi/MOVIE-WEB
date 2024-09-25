/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      height: {
        header: '560px',
        rate: '400px',
      },
      fontSize: {
        h1: '2.6rem',
      },
      screens: {
        xs: '475px',
      },
      colors: {
        main: '#080A1A',
        subMain: '#28BD11',
        dry: '#0B0F29',
        star: '#FFB000',
        text: '#C0C0C0',
        border: '#4B5563',
        dryGray: '#E0D5D5',
        customGreen: '#B1FFA5'
    },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}

