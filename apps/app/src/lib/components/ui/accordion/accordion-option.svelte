<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { location } from '$lib/utils/store';

	interface Props {
		class?: string;
		href?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', href = '', children }: Props = $props();
	let active = $derived(href === $location);
</script>

<a {href} class={cn(' relative flex h-7 items-center text-sm', className)}>
	<span
		class={cn(
			'hover:bg-muted flex h-full w-full items-center rounded-sm p-2',
			active ? 'bg-muted' : ''
		)}
	>
		<span class="flex items-center gap-1.5">
			{@render children?.()}
		</span>
	</span>
</a>
