<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from './index.js';
	import { cn } from '$lib/utils.js';
	import Input from './input.svelte';

	type $$Props = HTMLInputAttributes & { edit: boolean; divClass?: string };
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	let divClass: $$Props['divClass'] = undefined;

	export let value: $$Props['value'] = undefined;
	export let edit: $$Props['edit'];
	export { className as class };

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
</script>

{#if edit}
	<slot>
		<Input bind:value class={cn('h-[1.75rem] p-1', className)} {...$$restProps} />
	</slot>
{:else}
	<p class={cn('h-7 p-1 text-sm', divClass)}>{value || ''}</p>
{/if}
