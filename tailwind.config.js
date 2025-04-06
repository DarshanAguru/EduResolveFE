/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        MajorMono: ["Major Mono Display, monospace"],
      },
      backgroundImage: {
        homeImage: "url('./src/assets/images/homepageimg.jpg')",
      },
      boxShadow: {
        custom: "0 0px 10px rgba(0, 0, 0, 0.15)",
        navbar: "0 0 10px 1px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
