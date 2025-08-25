/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#005CA9",
        secondary: "#F39200",
      },
      fontFamily: {
        sans: ["CAIXASTD_Regular"],  // Fonte padrão
        bold: ["CAIXASTD_Bold"],
        light: ["CAIXASTD_Light"],
      },
    },
  },
  plugins: [],
}