/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Inter'", "'Helvetica Neue'", "system-ui", "-apple-system", "'Segoe UI'", "'Microsoft YaHei'", "sans-serif"],
        body: ["'Inter'", "'Helvetica Neue'", "system-ui", "-apple-system", "'Segoe UI'", "'Microsoft YaHei'", "sans-serif"]
      }
    }
  },
  plugins: []
}
