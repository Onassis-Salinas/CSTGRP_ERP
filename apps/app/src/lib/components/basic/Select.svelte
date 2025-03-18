<script lang="ts">
	import { run } from 'svelte/legacy';

	import * as Select from '../ui/select/index';
	import { cn } from '$lib/utils.js';

	interface Props {
		class?: string;
		items: { value: string | number | boolean; name: string; label?: string }[];
		placeholder?: string;
		value: string | number;
		onSelectedChange?: any;
		cell?: boolean;
		menu?: boolean;
		chevron?: boolean;
		disabled?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		class: className = '',
		items,
		placeholder = 'Selecciona una opción',
		value = $bindable(),
		onSelectedChange = () => {},
		cell = false,
		menu = false,
		chevron = true,
		disabled = false,
		children
	}: Props = $props();

	let selected: any = $state({});

	const setSelected = () => {
		selected = newItems.find((item) => item.value === value);
	};
	let newItems = $derived(
		items?.map((item) => ({
			value: item.value,
			label: item.name
		}))
	);
	run(() => {
		if (newItems && value) setSelected();
	});
</script>

<Select.Root
	bind:selected
	onSelectedChange={(e) => {
		value = String(e?.value);
		onSelectedChange();
	}}
>
	<Select.Trigger
		{chevron}
		{disabled}
		class={cn(className, cell ? 'h-full w-full border-none' : '', menu ? 'h-[28px]' : '')}
	>
		{#if children}{@render children()}{:else}
			<Select.Value {placeholder}></Select.Value>
		{/if}
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each newItems as item}
				<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
