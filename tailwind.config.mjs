/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mvc,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'accent-purple': '#a78bfa',
				'accent-amber': '#fbbf24',
			},
		},
	},
	plugins: [],
}