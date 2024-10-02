<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { Expand, FileDown } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import MaterialCard from './MaterialCard.svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';

	let show = false;
	let selectedMaterial: material = {
		code: '',
		measurement: '',
		description: '',
		minAmount: '',
		clientId: '',
		id: '',
		leftoverAmount: ''
	};
	let inventory: material[] = [];
	let clients: any = {};

	let filters = {
		code: '',
		clients: ['']
	};

	$: filteredInventory = inventory.filter((material) => {
		if (filters.code) {
			if (filters.code) return material.code?.toUpperCase()?.includes(filters.code.toUpperCase());
		}
		return true;
	});

	async function getInventory() {
		const result = await api.get('/inventory');
		inventory = result.data;
		const clientList = (await api.get('/inventoryvarious/clients')).data;
		clientList.forEach((client: any) => {
			clients[client.value] = client.name;
		});
	}

	function viewMaterial(i: number) {
		console.log('s');
		selectedMaterial = filteredInventory[i];
		show = true;
	}

	async function exportInventory() {
		const response = await api.get('/inventory/export', {
			responseType: 'arraybuffer'
		});

		const blob = new Blob([response.data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'Inventario.xlsx';

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	}

	onMount(() => {
		getInventory();
	});
</script>

<MenuBar>
	<div>
		<Input bind:value={filters.code} placeholder="Codigo" />
	</div>
	<div>
		<Button on:click={exportInventory}><FileDown class="mr-1.5 size-3.5" /> Exportar</Button>
	</div>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="fixed left-3 z-30 bg-inherit p-1"></TableHead>
		<TableHead class="">Codigo</TableHead>
		<TableHead class="w-full">Descripcion</TableHead>
		<TableHead class="">Cantidad sobrante</TableHead>
		<TableHead class="">Cantidad</TableHead>
		<TableHead class="">Minimo</TableHead>
		<TableHead class="">Medida</TableHead>
		<TableHead class="">Cliente</TableHead>
	</TableHeader>
	<TableBody>
		{#each filteredInventory as material, i}
			<TableRow>
				<TableCell class="sticky left-0 bg-background px-0">
					<Button on:click={() => viewMaterial(i)} variant="ghost" class="h-full aspect-square hover:bg-muted/50 ">
						<Expand class="size-3.5" />
					</Button>
				</TableCell>

				<TableCell class="whitespace-nowrap">{material.code}</TableCell>
				<TableCell>{material.description}</TableCell>
				<TableCell>{material.leftoverAmount}</TableCell>
				<TableCell>{material.amount}</TableCell>
				<TableCell>{material.minAmount}</TableCell>
				<TableCell>{material.measurement}</TableCell>
				<TableCell><Badge color="blue">{clients[material.clientId]}</Badge></TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<MaterialCard bind:show bind:selectedMaterial />
