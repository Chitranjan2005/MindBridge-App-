/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#8B5CF6",
        secondary: "#EC4899",
        background: "#0F172A",
        surface: "#1E293B",
        text: "#F1F5F9",
      },
    },
  },
  plugins: [],
};
