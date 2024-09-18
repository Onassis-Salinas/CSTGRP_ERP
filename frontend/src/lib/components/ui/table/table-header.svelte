<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<thead class={cn("[&_tr]:border-b","sticky top-0 z-20 w-full bg-gray-100 text-xs uppercase text-gray-700", className)} {...$$restProps} on:click on:keydown>
	<slot />
</thead>
