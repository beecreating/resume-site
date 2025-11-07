/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d10", panel: "#12161b", ink: "#eaf1f7",
        muted: "#9bb0c3", accent: "#7ee687", line: "#22303c",
      },
      maxWidth: { content: "980px" },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [],
};