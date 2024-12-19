/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      flex: {
        2: '2 2 0%'
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(-2px)' },
        }
      },
      animation: {
        'breathe': 'wiggle 1s ease-in-out infinite alternate',
      },
    }
  }
}
