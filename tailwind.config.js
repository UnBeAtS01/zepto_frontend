/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
