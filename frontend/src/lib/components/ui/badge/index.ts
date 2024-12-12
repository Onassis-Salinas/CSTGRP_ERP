import { type VariantProps, tv } from 'tailwind-variants';
export { default as Badge } from './badge.svelte';

export const badgeVariants = tv({
	base: 'focus:ring-ring outline outline-1 inline-flex select-none items-center rounded-sm px-1.5  transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/80 ',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 ',
			gray: 'bg-gray text-gray-foreground outline-gray-foreground/15 ',
			red: 'bg-red text-red-foreground outline-red-foreground/15 ',
			brown: 'bg-brown text-brown-foreground outline-brown-foreground/15 ',
			orange: 'bg-orange text-orange-foreground outline-orange-foreground/15 ',
			lime: 'bg-lime text-lime-foreground outline-lime-foreground/15 ',
			green: 'bg-green text-green-foreground outline-green-foreground/15 ',
			cyan: 'bg-cyan text-cyan-foreground outline-cyan-foreground/15 ',
			blue: 'bg-blue text-blue-foreground outline-blue-foreground/15 ',
			purple: 'bg-purple text-purple-foreground outline-purple-foreground/15 ',
			yellow: 'bg-yellow text-yellow-foreground outline-yellow-foreground/15 ',
			pink: 'bg-pink text-pink-foreground outline-pink-foreground/15 '
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type Variant = VariantProps<typeof badgeVariants>['variant'];
