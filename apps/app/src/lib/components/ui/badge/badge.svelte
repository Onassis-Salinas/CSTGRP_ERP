<script lang="ts">
	import { type Variant, badgeVariants } from './index.js';
	import { cn } from '$lib/utils.js';

	interface Props {
		class?: string | undefined | null;
		href?: string | undefined;
		color?: Variant;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		class: className = undefined,
		href = undefined,
		color = 'default',
		children,
		...rest
	}: Props = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	{href}
	class={cn('whitespace-nowrap', badgeVariants({ variant: color, className }))}
	{...rest}
>
	{@render children?.()}
</svelte:element>
