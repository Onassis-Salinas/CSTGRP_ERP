<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<thead
	class={cn(
		'sticky top-0 z-20 w-full bg-[#fbfafa] text-sm border-b',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</thead>
