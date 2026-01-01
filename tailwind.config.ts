import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E2E8F0",
        input: "#E2E8F0",
        ring: "#C2410C",
        background: "#FAFAFA",
        foreground: "#2C3E50",
        primary: {
          DEFAULT: "#C2410C",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#2C3E50",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "#F8FAFC",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#F1F5F9",
          foreground: "#2C3E50",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#2C3E50",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2C3E50",
          hover: "hsl(var(--card-hover))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        upvote: "hsl(var(--upvote))",
        downvote: "hsl(var(--downvote))",
        thread: {
          card: "hsl(var(--thread-card))",
          "card-hover": "hsl(var(--thread-card-hover))",
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "vote-bounce": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-in-from-bottom-4": { "0%": { transform: "translateY(1rem)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        "slide-in-from-top-2": { "0%": { transform: "translateY(-0.5rem)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
        "slide-in-from-left-4": { "0%": { transform: "translateX(-1rem)", opacity: "0" }, "100%": { transform: "translateX(0)", opacity: "1" } },
        "shimmer": { "100%": { transform: "translateX(100%)" } }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "vote-bounce": "vote-bounce 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-in-from-bottom-4": "slide-in-from-bottom-4 0.5s ease-out forwards",
        "slide-in-from-top-2": "slide-in-from-top-2 0.3s ease-out forwards",
        "slide-in-from-left-4": "slide-in-from-left-4 0.5s ease-out forwards",
        "shimmer": "shimmer 2s infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
