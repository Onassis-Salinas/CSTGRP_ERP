<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLTableAttributes & {
		divClass?: string;
	};

	interface Props {
		class?: $$Props['class'];
		divClass?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let { class: className = undefined, divClass = '', children, ...rest }: Props = $props();
</script>

<div class={cn('relative w-full overflow-auto', divClass)}>
	<table class={cn('w-full caption-bottom text-sm', className)} {...rest}>
		{@render children?.()}
	</table>
</div>
