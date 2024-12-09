/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'amazon-yellow': '#FF9900',
        'amazon-yellow-dark': '#E68A00',
        'amazon-blue': '#146EB4',
        'amazon-blue-dark': '#004B91',
      },
    },
  },
  plugins: [],
}

