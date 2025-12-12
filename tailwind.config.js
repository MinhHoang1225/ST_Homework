/** @type {import('tailwindcss').Config} */
export default {
  // Dòng này chỉ ra nơi Tailwind CSS cần quét các class của nó (tất cả file .html, .js, .ts, .jsx, .tsx trong thư mục src)
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}