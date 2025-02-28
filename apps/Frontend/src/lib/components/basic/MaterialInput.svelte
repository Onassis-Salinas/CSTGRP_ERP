<script lang="ts">
	import { cn } from '$lib/utils';
	import api from '../../utils/server';
	import { Input } from '../ui/input';

	export let value: string | undefined;
	export let measurement = '';
	export let normal = false;

	$: if (value) getMeasurement();

	async function getMeasurement() {
		measurement = (await api.get('/inventoryvarious/measurement?code=' + value)).data;
	}
</script>

<Input
	bind:value
	class={cn(
		normal ? '' : 'rounded-none border-none',
		measurement ? '' : 'bg-destructive text-destructive-foreground'
	)}
/>
