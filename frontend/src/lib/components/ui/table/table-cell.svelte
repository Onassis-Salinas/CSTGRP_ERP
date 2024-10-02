<script lang="ts">
	import type { HTMLTdAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";

	type $$Props = HTMLTdAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<td
	class={cn("px-3 whitespace-nowrap py-0 align-middle h-9 border-r", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</td>
