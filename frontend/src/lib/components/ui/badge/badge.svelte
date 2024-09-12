<script lang="ts">
	import { type Variant, badgeVariants } from './index.js';
	import { cn } from '$lib/utils.js';
	import type { ColorKeys } from '$lib/utils/colors.js';

	let className: string | undefined | null = undefined;
	export let href: string | undefined = undefined;
	export let color: Variant = 'default';
	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn('whitespace-nowrap', badgeVariants({ variant: color, className }))}
	{...$$restProps}
>
	<slot />
</svelte:element>
