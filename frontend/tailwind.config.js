/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'Palatino Linotype', 'serif'],
        mono: ['Courier New', 'Courier', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: "#ffffff",
        card: "#ffffff",
        "card-foreground": "#1e293b",
        primary: "#0f172a",
        "primary-hover": "#1e293b",
        "primary-foreground": "#ffffff",
        muted: "#64748b",
        "muted-foreground": "#64748b",
        border: "#e2e8f0",
        success: "#10b981",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
      }
    },
  },
  plugins: [],
};
