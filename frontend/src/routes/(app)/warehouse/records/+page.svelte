<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import { format } from 'date-fns';
	import { es } from 'date-fns/locale';

	let records: any[] = [];

	async function getRecords() {
		records = (await api.get('/inventory-records')).data;
	}

	onMount(() => {
		getRecords();
	});

	const actionColors: Record<string, string> = {
		create: 'bg-green',
		delete: 'bg-red',
		update: 'bg-yellow'
	};
</script>

<MenuBar>
	<svelte:fragment slot="left"></svelte:fragment>
	<svelte:fragment slot="right"></svelte:fragment>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead>Creado</TableHead>
		<TableHead>Usuario</TableHead>
		<TableHead class="w-full">Mensaje</TableHead>
	</TableHeader>
	<TableBody>
		{#each records as record, i}
			<TableRow>
				<TableCell class={actionColors[record.action]}
					>{format(record.created_at, 'dd/MM/yyyy HH:mm', { locale: es })}</TableCell
				>
				<TableCell>{record.user}</TableCell>
				<TableCell>{record.text}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>
