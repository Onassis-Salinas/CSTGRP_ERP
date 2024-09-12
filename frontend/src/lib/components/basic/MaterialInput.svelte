<script lang="ts">
	import api from '../../utils/server';
	import { Input } from '../ui/input';

	export let value: string | undefined;
	export let measurement = '';

	$: if (value) getMeasurement();

	async function getMeasurement() {
		measurement = (await api.get('/inventoryvarious/measurement?code=' + value)).data;
	}
</script>

<Input
	bind:value
	class={measurement
		? ''
		: 'bg-destructive text-destructive-foreground border-destructive-foreground'}
/>
