<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { location } from '$lib/utils/store';
	import { Dot } from 'lucide-svelte';
	import { fade, scale } from 'svelte/transition';

	let className = '';
	export { className as class };
	export let href = '';
	$: active = href === $location;
</script>

<a
	{href}
	class={cn(
		' relative flex h-[34px] items-center py-[1px] text-sm',
		className
	)}
	on:click
>
	<div class="absolute left-0 top-0 size-8">
		<svg width="32" height="34" xmlns="http://www.w3.org/2000/svg" class="absolute -top-3.5 left-0">
			<line x1="16" y1="0" x2="16" y2="34" stroke="#bcbeb3" stroke-width="1" />
		</svg>
	</div>

	{#if active}
		<div
			class="absolute left-0 top-0 z-50"
			in:scale={{ duration: 300 }}
			out:fade={{ duration: 200 }}
		>
			<Dot class="size-8 text-[#5c5e63]" />
		</div>
	{/if}

	<span class={cn('hover:bg-muted flex items-center h-full w-full rounded-sm pl-8', active ? 'bg-muted' : '')}>
		<slot />
	</span>
</a>
