/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FECF5B', 
          hover: '#FFB74D', 
        },
        secondary: {
          light: '#F5F5F5', 
          dark: '#333333', 
        },
        complementary: {
          lightBlue: '#00A8E8', 
          blue: '#3ABEFF', 
        },
        black: '#000000', 
        white: '#FFFFFF', 
        customYellow1: '#FFB500', 
        customYellow2: '#FFA300', 
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards', 
        slideIn: 'slideIn 0.5s ease-out forwards', 
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' }, 
        },
        slideIn: {
          '0%': { transform: 'translateY(-50px)', opacity: '0' }, 
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
