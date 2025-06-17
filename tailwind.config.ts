import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/app/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutrals: {
          100: 'var(--color-neutrals-100)',
          200: 'var(--color-neutrals-200)',
          300: 'var(--color-neutrals-300)',
          400: 'var(--color-neutrals-400)',
          500: 'var(--color-neutrals-500)',
          600: 'var(--color-neutrals-600)',
          700: 'var(--color-neutrals-700)',
          800: 'var(--color-neutrals-800)',
          900: 'var(--color-neutrals-900)',
          "base-white": 'var(--color-neutrals-base-white)',
          "base-black": 'var(--color-neutrals-base-black)',
        },
        green: {
          100: 'var(--color-green-100)',
          200: 'var(--color-green-200)',
          300: 'var(--color-green-300)',
        },
        error: {
          100: 'var(--color-error-100)',
          200: 'var(--color-error-200)',
          300: 'var(--color-error-300)',
        },
        "base-white": 'var(--color-base-white)',
      },
    },
  },
  plugins: [],
};

export default config;
