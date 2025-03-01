export const colors = {
	blue: {
		foreground: 'rgb(37, 128, 187)',
		balanced: 'rgba(37, 128, 187, 0.5)',
		DEFAULT: 'rgba(37, 128, 187, 0.05)'
	},
	orange: {
		foreground: 'rgb(207, 68, 19)',
		balanced: 'rgba(207, 68, 19, 0.5)',
		DEFAULT: 'rgba(207, 68, 19, 0.05)'
	},
	green: {
		foreground: 'rgb(46, 142, 85)',
		balanced: 'rgba(46, 142, 85, 0.5)',
		DEFAULT: 'rgba(46, 142, 85, 0.05)'
	},
	yellow: {
		foreground: 'rgb(204, 137, 18)',
		balanced: 'rgba(204, 137, 18, 0.5)',
		DEFAULT: 'rgba(204, 137, 18, 0.05)'
	},
	purple: {
		foreground: 'rgb(111, 27, 210)',
		balanced: 'rgba(111, 27, 210, 0.5)',
		DEFAULT: 'rgba(111, 27, 210, 0.05)'
	},
	cyan: {
		foreground: 'rgb(18, 157, 135)',
		balanced: 'rgba(18, 157, 135, 0.5)',
		DEFAULT: 'rgba(18, 157, 135, 0.05)'
	},
	red: {
		foreground: 'rgb(229, 30, 36)',
		balanced: 'rgba(229, 30, 36, 0.5)',
		DEFAULT: 'rgba(229, 30, 36, 0.05)'
	}
};

export type ColorKeys = keyof typeof colors;
