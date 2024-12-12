import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},

				// custom colors`
				gray: {
					foreground: 'hsl(var(--gray) / <alpha-value>)',
					DEFAULT: 'hsl(var(--gray-foreground) / <alpha-value>)'
				},

				red: {
					foreground: 'hsl(var(--red) / <alpha-value>)',
					DEFAULT: 'hsl(var(--red-foreground) / <alpha-value>)'
				},

				brown: {
					foreground: 'hsl(var(--brown) / <alpha-value>)',
					DEFAULT: 'hsl(var(--brown-foreground) / <alpha-value>)'
				},

				orange: {
					foreground: 'hsl(var(--orange) / <alpha-value>)',
					DEFAULT: 'hsl(var(--orange-foreground) / <alpha-value>)'
				},

				lime: {
					foreground: 'hsl(var(--lime) / <alpha-value>)',
					DEFAULT: 'hsl(var(--lime-foreground) / <alpha-value>)'
				},

				green: {
					foreground: 'hsl(var(--green) / <alpha-value>)',
					DEFAULT: 'hsl(var(--green-foreground) / <alpha-value>)'
				},

				cyan: {
					foreground: 'hsl(var(--cyan) / <alpha-value>)',
					DEFAULT: 'hsl(var(--cyan-foreground) / <alpha-value>)'
				},

				blue: {
					foreground: 'hsl(var(--blue) / <alpha-value>)',
					DEFAULT: 'hsl(var(--blue-foreground) / <alpha-value>)'
				},

				purple: {
					foreground: 'hsl(var(--purple) / <alpha-value>)',
					DEFAULT: 'hsl(var(--purple-foreground) / <alpha-value>)'
				},

				yellow: {
					foreground: 'hsl(var(--yellow) / <alpha-value>)',
					DEFAULT: 'hsl(var(--yellow-foreground) / <alpha-value>)'
				},

				pink: {
					foreground: 'hsl(var(--pink) / <alpha-value>)',
					DEFAULT: 'hsl(var(--pink-foreground) / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	}
};

export default config;
