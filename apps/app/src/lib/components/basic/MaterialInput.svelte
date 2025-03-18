<script lang="ts">
	import { run } from 'svelte/legacy';

	import { cn } from '$lib/utils';
	import api from '../../utils/server';
	import { Input } from '../ui/input';

	interface Props {
		value: string | undefined;
		measurement?: string;
		normal?: boolean;
	}

	let { value = $bindable(), measurement = $bindable(''), normal = false }: Props = $props();

	async function getMeasurement() {
		measurement = (await api.get('/inventoryvarious/measurement?code=' + value)).data;
	}
	run(() => {
		if (value) getMeasurement();
	});
</script>

<Input
	bind:value
	class={cn(
		normal ? '' : 'rounded-none border-none',
		measurement ? '' : 'bg-destructive text-destructive-foreground'
	)}
/>
