<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cn } from '$lib/utils';
	export let incidence: string;
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		<div
			class={cn(
				'aspect-square w-full rounded-[4px]',
				incidence ? (incidence === '✔' ? 'bg-green-500' : 'bg-rose-500') : 'bg-gray'
			)}
		></div>
	</Tooltip.Trigger>
	{#if incidence && incidence !== '✔'}
		<Tooltip.Content>
			<p>{incidence}</p>
		</Tooltip.Content>
	{/if}
</Tooltip.Root>
