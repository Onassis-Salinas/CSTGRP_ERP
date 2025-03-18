<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { cn } from '$lib/utils.js';

	type $$Props = SelectPrimitive.TriggerProps & { chevron: boolean };
	type $$Events = SelectPrimitive.TriggerEvents;

	interface Props {
		class?: $$Props['class'];
		chevron?: $$Props['chevron'];
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any;
	}

	let { class: className = undefined, chevron = true, children, ...rest }: Props = $props();

	const children_render = $derived(children);
</script>

<SelectPrimitive.Trigger
	class={cn(
		'flex h-8 w-full items-center justify-between rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50  aria-[invalid]:border-destructive [&>span]:line-clamp-1 data-[placeholder]:[&>span]:text-muted-foreground',
		className
	)}
	{...rest}
	on:click
	on:keydown
>
	{#snippet children({ builder })}
		{@render children_render?.({ builder })}
		{#if chevron}
			<div>
				<ChevronDown class="h-4 w-4 opacity-50" />
			</div>
		{/if}
	{/snippet}
</SelectPrimitive.Trigger>
