<script lang="ts">
	import type { HTMLTdAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLTdAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<td
	class={cn('h-[35px] whitespace-nowrap border-r px-3 py-0 align-middle', className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
