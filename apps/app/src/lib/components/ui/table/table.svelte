<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLTableAttributes & {
		divClass?: string;
	};

	let className: $$Props['class'] = undefined;
	export let divClass = '';
	export { className as class };
</script>

<div class={cn('relative w-full overflow-auto', divClass)}>
	<table class={cn('w-full caption-bottom text-sm', className)} {...$$restProps}>
		<slot />
	</table>
</div>
