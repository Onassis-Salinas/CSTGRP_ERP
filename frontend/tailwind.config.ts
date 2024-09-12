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
					foreground: 'rgb(67, 64, 60)',
					DEFAULT: 'rgba(67, 64, 60, 0.05)'
				},
				blue: {
					foreground: 'rgb(37, 128, 187)',
					DEFAULT: 'rgba(37, 128, 187, 0.05)'
				},
				orange: {
					foreground: 'rgb(207, 68, 19)',
					DEFAULT: 'rgba(207, 68, 19, 0.05)'
				},
				green: {
					foreground: 'rgb(46, 142, 85)',
					DEFAULT: 'rgba(46, 142, 85, 0.05)'
				},
				yellow: {
					foreground: 'rgb(204, 137, 18)',
					DEFAULT: 'rgba(204, 137, 18, 0.05)'
				},
				purple: {
					foreground: 'rgb(111, 27, 210)',
					DEFAULT: 'rgba(111, 27, 210, 0.05)'
				},
				cyan: {
					foreground: 'rgb(18, 157, 135)',
					DEFAULT: 'rgba(18, 157, 135, 0.05)'
				},
				red: {
					foreground: 'rgb(229, 30, 36)',
					DEFAULT: 'rgba(229, 30, 36, 0.05)'
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
