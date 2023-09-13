/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito']
      },
      colors: {
        primary: '#17b39c',
        primaryDark: 'primary',
        
        secondary: '#212432'
        
      }
    },
  },
  plugins: [],
}