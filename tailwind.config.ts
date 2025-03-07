import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // shadcn/ui variables
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        // ... (other shadcn/ui colors)
        pawblue: {
          50: '#f0f7ff',
          100: '#e0eefe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36a9f6',
          500: '#1493e5',
          600: '#0675c3',
          700: '#045c9e',
          800: '#064d82',
          900: '#0a416c',
          950: '#07294a',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        // Accordion, slide, fade, bounce, float, pulse, swipe animations
      },
      animation: {
        // Corresponding animation definitions
      },
      backgroundImage: {
        'paw-pattern': "url('data:image/svg+xml;base64,...')"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
