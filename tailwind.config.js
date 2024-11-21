/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
    './about.html',
    './contact.html',
    './project.html',
    './projects.html',
    './resume.html',
    './src/**/*.html',],
  theme: {screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {},
  },
  plugins: [],
}

