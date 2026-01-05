// tailwind.config.js
import daisyui from "daisyui";
import { themes } from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand Colors (Maximum 3 primary colors)
        brand: {
          primary: "#632EE3",
          secondary: "#9F62F2", 
          accent: "#FF6B6B"
        }
      },
      spacing: {
        // Consistent spacing system
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        // Consistent border radius
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: { 
          ...themes["light"],
          primary: "#632EE3",
          secondary: "#9F62F2",
          accent: "#FF6B6B",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          "base-200": "#F2F2F2",
          "base-300": "#E5E6E6",
          "base-content": "#1F2937",
        },
        dark: { 
          ...themes["dark"],
          primary: "#632EE3",
          secondary: "#9F62F2", 
          accent: "#FF6B6B",
          neutral: "#2A2E37",
          "base-100": "#1D232A",
          "base-200": "#191E24",
          "base-300": "#15191E",
          "base-content": "#A6ADBB",
        },
      },
    ],
  },
};
