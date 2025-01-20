/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            primary: '#6366f1',
            secondary: '#f472b6',
            accent: '#f59e0b',
          },
        },
      },
      plugins: [],
    }
