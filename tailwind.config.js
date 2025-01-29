/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fourth: {
          DEFAULT: "#FF5733",
        },
        tertiary: {
          DEFAULT: "#FFD700",
        },
        secundary: {
          DEFAULT: "#7FFF00",
        },
        primary: {
          DEFAULT: "#8B4513",
        },
        greenButton: {
          DEFAULT: "#22c55e"
        },
        redButton: {
          DEFAULT: "#ef4444"
        }
      },
    },
  },
  plugins: [],
};
