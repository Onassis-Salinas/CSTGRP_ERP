<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLTdAttributes & {
		password?: string;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let password = '';

	let show = false;
</script>

<td
	class={cn('h-[35px] px-3 align-middle border-r', className)}
	{...$$restProps}
	on:click={() => (show = !show)}
>
	{#if password}
		{#if show}
			{password}
		{:else}
			<span class="text-sm">●●●●●●●●●●●●●●●</span>
		{/if}
	{/if}
</td>
