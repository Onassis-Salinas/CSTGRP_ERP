<script lang="ts">
	import * as Select from '../ui/select/index';
	import { cn } from '$lib/utils.js';

	let className = '';
	export { className as class };
	export let items: { value: String | number | boolean; name: string; label?: string }[];
	export let placeholder = 'Seleccione una opcion';
	export let value: string | number;
	export let onSelectedChange = () => {};

	$: newItems = items?.map((item) => ({
		value: item.value,
		label: item.name
	}));

	let selected: any = {};
	$: if (newItems && value) setSelected();

	const setSelected = () => {
		selected = newItems.find((item) => item.value === value);
	};
</script>

<Select.Root
	bind:selected
	onSelectedChange={(e) => {
		value = e.value;
		onSelectedChange();
	}}
>
	<Select.Trigger class={cn('w-full', className)}>
		<Select.Value {placeholder}></Select.Value>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each newItems as item}
				<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
