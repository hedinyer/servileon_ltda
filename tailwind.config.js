/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: '#D4AF37',
        'gold-light': '#F4E4BC',
        'gold-dark': '#B8860B',
        'servileon-black': '#121212',
        'servileon-white': '#FFFFFF',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        'helvetica-light': ['Helvetica Neue Light', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        'helvetica-bold': ['Helvetica Neue Bold', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      },
      animation: {
        'gradient-slow': 'gradient 8s ease infinite',
        'fade-in': 'fadeIn 1.5s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-in-out',
        'slide-down': 'slideDown 0.8s ease-in-out',
        'slide-in-right': 'slideInRight 0.8s ease-in-out',
      },
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundSize: {
        'gradient-size': '200% 200%',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(45deg, #B8860B 0%, #D4AF37 35%, #FFDF00 50%, #D4AF37 65%, #B8860B 100%)',
        'gold-radial': 'radial-gradient(circle, #D4AF37 0%, #B8860B 100%)',
        'black-gradient': 'linear-gradient(to bottom, #121212 0%, #1E1E1E 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

