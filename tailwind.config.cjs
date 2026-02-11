/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary palette
        primary: {
          DEFAULT: '#137fec',
          hover: '#1066c7',
          light: 'rgba(19, 127, 236, 0.12)',
          border: 'rgba(19, 127, 236, 0.3)',
        },
        // Accent colors
        accent: {
          green: '#19cc61',
          orange: '#f59f0a',
          red: '#ef4444',
          purple: '#8b5cf6',
        },
        // Dark theme neutrals
        surface: {
          primary: '#0f172a',    // Main background (slate-900)
          secondary: '#1e293b',  // Cards, elevated surfaces (slate-800)
          tertiary: '#334155',   // Inputs, hover states (slate-700)
        },
        // Status colors
        status: {
          ok: '#22c55e',
          warning: '#f59e0b',
          critical: '#ef4444',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '0.75rem',   // 12px - Cards
        '2xl': '1rem',     // 16px - Modals
        '3xl': '1.5rem',   // 24px - Hero sections
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(19, 127, 236, 0.2)',
        'glow-green': '0 0 20px rgba(25, 204, 97, 0.2)',
        'glow-orange': '0 0 20px rgba(245, 159, 10, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      zIndex: {
        'dropdown': '10',
        'sticky': '20',
        'fixed': '30',
        'modal-backdrop': '40',
        'modal': '50',
        'popover': '60',
        'tooltip': '70',
        'toast': '80',
      },
    },
  },
  plugins: [],
}
