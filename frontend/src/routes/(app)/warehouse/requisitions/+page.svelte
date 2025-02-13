<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { FilePlus2, Search } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import OptionsCell from '$lib/components/basic/OptionsCell.svelte';
	import RequisitionForm from './RequisitionForm.svelte';

	let clients: any = {};
	let show = false;

	let filters = {
		programation: '',
		import: '',
		jobpo: '',
		code: '',
		checked: ''
	};

	let movements: any[] = [];
	let selectedMovement: any;

	async function getMovements() {
		const result = (await api.get(`/requisitions/movements`, { params: filters })).data;

		movements = result.map((e: any) => {
			return { ...e, realAmount: e.realAmount?.toString() };
		});
	}
	async function fetchClients() {
		const clientList = (await api.get('/inventoryvarious/clients')).data;
		clientList.forEach((client: any) => {
			clients[client.value] = client;
		});
		clients = clients;
	}
	function createRequisition(i: number) {
		show = true;
		selectedMovement = movements[i];
	}

	onMount(() => {
		getMovements();
		fetchClients();
	});
</script>

<MenuBar>
	<form class="flex flex-col gap-1 lg:flex-row" on:submit|preventDefault={getMovements} action={''}>
		<Input menu bind:value={filters.programation} placeholder="Programacion" />
		<Input menu bind:value={filters.jobpo} placeholder="Job" />
		<Input menu bind:value={filters.code} placeholder="Material" />
		<Button type="submit"><Search class="mr-1.5 size-3.5" />Buscar</Button>
	</form>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="fixed left-3 z-30 bg-inherit p-1"></TableHead>
		<TableHead>Programacion</TableHead>
		<TableHead>Job-PO</TableHead>
		<TableHead>Codigo</TableHead>
		<TableHead>Descripcion</TableHead>
		<TableHead>Inventario</TableHead>
		<TableHead>En area</TableHead>
		<TableHead>Requerido</TableHead>
		<TableHead>Medida</TableHead>
		<TableHead>Cliente</TableHead>
	</TableHeader>
	<TableBody>
		{#each movements as movement, i}
			<TableRow>
				<OptionsCell
					extraButtons={[
						{
							fn: () => createRequisition(i),
							name: 'Requisicion',
							icon: FilePlus2
						}
					]}
				/>
				<TableCell>{movement.programation || ''}</TableCell>
				<TableCell>{(movement.jobpo || '') + (movement.extra ? ' -R' : '')}</TableCell>
				<TableCell>{movement.code}</TableCell>
				<TableCell class="w-full min-w-24 max-w-1 overflow-hidden">{movement.description}</TableCell
				>
				<TableCell><Badge color="gray">{movement.inventory}</Badge></TableCell>
				<TableCell><Badge color="gray">{movement.leftoverAmount}</Badge></TableCell>
				<TableCell><Badge color={'red'}>{movement.amount}</Badge></TableCell>
				<TableCell>{movement.measurement}</TableCell>
				<TableCell
					>{#if clients[movement.clientId]}
						<Badge color={clients[movement.clientId].color}
							>{clients[movement.clientId].name}
						</Badge>
					{/if}</TableCell
				>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<RequisitionForm bind:show bind:selectedMovement />
