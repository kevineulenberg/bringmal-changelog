/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        // You can customize Bringmal.de colors here if known, sticking to a neutral modern palette for now
        gray: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          100: '#f3f4f6',
          50: '#f9fafb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
	},
	plugins: [
    require('@tailwindcss/typography'),
  ],
}
