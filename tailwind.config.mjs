// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'


const config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3B82F6',
          foreground: '#fff',
          ring: '#93c5fd',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...defaultTheme.sans],
        mono: ['var(--font-geist-mono)', ...defaultTheme.mono],
      },
      boxShadow: {
        card: '0 8px 24px -6px rgba(0,0,0,.06)',
        cardHover: '0 12px 28px -6px rgba(0,0,0,.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
