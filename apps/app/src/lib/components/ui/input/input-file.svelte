<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLInputAttributes & { files: FileList | undefined };
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let files: $$Props['files'] = undefined;
	export { className as class };
</script>

<input
	class={cn(
		'file h-8 w-full cursor-pointer rounded-sm border border-input bg-background px-3 py-1 text-sm ring-offset-background file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:text-muted-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring  disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
	bind:files
	type="file"
	on:blur
	on:change
	on:click
	on:focus
	on:focusin
	on:focusout
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:mousemove
	on:paste
	on:input
	on:wheel|passive
	{...$$restProps}
/>
