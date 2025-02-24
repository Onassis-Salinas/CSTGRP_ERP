<script lang="ts">
	import type { HTMLThAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLThAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<th
	class={cn(
		'h-10 whitespace-nowrap border-r px-3 text-left align-middle font-medium text-sm [&:has([role=checkbox])]:pr-0',
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
