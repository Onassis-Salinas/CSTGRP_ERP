<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import { cn } from "$lib/utils.js";

	type $$Props = AccordionPrimitive.TriggerProps;
	type $$Events = AccordionPrimitive.TriggerEvents;

	let className: $$Props["class"] = undefined;
	export let level: AccordionPrimitive.HeaderProps["level"] = 3;
	export { className as class };
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		class={cn(
			"flex flex-1 items-center justify-between py-4 transition-all rounded-sm hover:underline [&[data-state=open]>svg]:rotate-0",
			className
		)}
		{...$$restProps}
		on:click
	>
		<slot />
		<ChevronDown class="h-3.5 w-3.5 transition-transform duration-200 -rotate-90" /> 
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
