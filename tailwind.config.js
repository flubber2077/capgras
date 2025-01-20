/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{tsx,mdx}'
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      animation: {
        breathe: 'wiggle 1s ease-in-out infinite alternate'
      },
      backgroundImage: {
        'water-tile': "url('/images/water.jpg')",
        'paper-texture': "url('/images/texture.jpg')"
      },
      blur: {
        xs: '1px'
      },
      flex: { 2: '2 2 0%' },
      fontFamily: {
        header: ['var(--font-header)'],
        serif: ['var(--font-bellefair)']
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(-2px)' }
        }
      },
      typography: {
        DEFAULT: {
          // Custom CSS here ↓
          css: {
            h1: {
              fontSize: '1.5rem'
            },
            h2: {
              fontStyle: 'italic',
              fontWeight: '600'
            },
            h3: {
              fontStyle: 'italic',
              fontWeight: '500',
            },
            p: {
              fontSize: '1.25rem',
              lineHeight: '1rem'
            },

            // More custom CSS…
          }
        }
      }
    }
  }
}
