const headerFont = ['var(--font-header)', 'garamond', 'serif'];
const titleFont = ['var(--font-title)', 'garamond', 'serif'];
const subTitleFont = ['var(--font-subtitle)', 'garamond', 'serif'];
const textFont = ['var(--font-text)', 'garamond', 'serif'];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      animation: {
        breathe: 'wiggle 1s ease-in-out infinite alternate',
      },
      backgroundImage: {},
      flex: { 2: '2 2 0%' },
      fontFamily: {
        header: headerFont,
        title: titleFont,
        subtitle: subTitleFont,
        serif: textFont,
      },
      scale: { '-100': '1' },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(5px)' },
          '100%': { transform: 'translateY( -3px)' },
        },
      },
    },
  },
};
