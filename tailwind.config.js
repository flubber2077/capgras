/* eslint-disable @typescript-eslint/no-require-imports */

const headerFont = ['var(--font-header)', 'garamond', 'serif']
const titleFont = ['var(--font-title)', 'garamond', 'serif'].reverse()
const subTitleFont = ['var(--font-subtitle)', 'garamond', 'serif'].reverse()
const textFont = ['var(--font-text)', 'garamond', 'serif'].reverse()

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
        header: headerFont,
        title: titleFont,
        serif: textFont
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
            a: {
              fontFamily: textFont
            },
            h1: {
              fontSize: '1.5rem',
              fontFamily: titleFont
            },
            h2: {
              fontSize: '2rem',
              fontStyle: 'italic',
              fontFamily: subTitleFont
            },
            h3: {
              fontFamily: titleFont,
              fontStyle: 'italic',
              fontWeight: '500'
            },
            li: {
              fontFamily: textFont,
              fontSize: '1.25rem',
              marginTop: '0',
              marginBottom: '0'
            },
            ol: {
              paddingInlineStart: '4em'
            },
            p: {
              fontFamily: textFont,
              fontSize: '1.25rem',
              lineHeight: '2.25rem',
              marginTop: '2rem'
            }

            // More custom CSS…
          }
        }
      }
    }
  }
}
