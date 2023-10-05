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
      keyframes: {
        rotate: {
          '100%': { 
            'background-position': '50% 100%' 
          },
        }
      },
      animation: {
        rotate: 'rotate 10s infinite alternate ease-in-out',
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