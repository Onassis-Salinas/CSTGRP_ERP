<script lang="ts">
	import * as Select from '../ui/select/index';
	import { cn } from '$lib/utils.js';
	let className = '';
	export { className as class };
	export let items: { value: string | number | boolean; name: string; label?: string }[];
	export let placeholder = 'Selecciona una opción';
	export let value: string | number;
	export let onSelectedChange = () => {};
	export let cell = false;
	export let menu = false;
	export let chevron: boolean = true;
	export let disabled: boolean = false;

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
		value = String(e?.value);
		onSelectedChange();
	}}
>
	<Select.Trigger
		{chevron}
		{disabled}
		class={cn(className, cell ? 'h-full w-full border-none' : '', menu ? 'h-[28px]' : '')}
	>
		<slot>
			<Select.Value {placeholder}></Select.Value>
		</slot>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each newItems as item}
				<Select.Item value={item.value} label={item.label}>{item.label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
