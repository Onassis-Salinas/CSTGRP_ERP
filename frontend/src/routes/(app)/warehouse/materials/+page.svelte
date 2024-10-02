<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { EllipsisVertical, Pen, PlusCircle, Trash } from 'lucide-svelte';
	import MaterialsForm from './MaterialsForm.svelte';
	import DeletePopUp from '$lib/components/complex/DeletePopUp.svelte';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import OptionsCell from '$lib/components/basic/OptionsCell.svelte';

	let show: boolean;
	let show1: boolean;
	let selectedMaterial: material = {
		code: '',
		measurement: '',
		description: '',
		minAmount: '',
		clientId: '',
		id: ''
	};
	let materials: material[] = [];
	let clients: any = {};

	let filters = {
		code: '',
		clients: ['']
	};

	$: filteredMaterials = materials.filter((material) => {
		if (filters.code) {
			if (filters.code) return material.code?.toUpperCase()?.includes(filters.code.toUpperCase());
		}
		return true;
	});

	async function getMaterials() {
		const result = await api.get('/materials');
		materials = result.data;
		const clientList = (await api.get('/inventoryvarious/clients')).data;
		clientList.forEach((client: any) => {
			clients[client.value] = client.name;
		});
	}

	function editMaterial(i: number) {
		selectedMaterial = filteredMaterials[i];
		show = true;
	}
	function createMaterial() {
		selectedMaterial = {
			code: '',
			measurement: '',
			description: '',
			minAmount: '',
			clientId: '',
			id: ''
		};
		show = true;
	}

	function deleteMaterial(i: number) {
		selectedMaterial = filteredMaterials[i];
		show1 = true;
	}

	async function handleDelete() {
		await api.delete('/materials', { data: { id: parseInt(selectedMaterial.id) } });
		selectedMaterial = {
			code: '',
			measurement: '',
			description: '',
			minAmount: '',
			clientId: '',
			id: ''
		};
		showSuccess('Material eliminado');
		await getMaterials();
		show1 = false;
	}

	onMount(() => {
		getMaterials();
	});
</script>

<MenuBar>
	<div>
		<Input bind:value={filters.code} placeholder="Codigo" />
	</div>
	<div>
		<Button on:click={createMaterial}><PlusCircle class="mr-1.5 size-3.5" />Añadir Material</Button>
	</div>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="fixed left-3 z-30 bg-inherit p-1"></TableHead>
		<TableHead class="">Codigo</TableHead>
		<TableHead class="w-full">Descripcion</TableHead>
		<TableHead class="">Medida</TableHead>
		<TableHead class="">Cliente</TableHead>
	</TableHeader>
	<TableBody class="divide-y">
		{#each filteredMaterials as material, i}
			<TableRow>
				<OptionsCell editFunc={() => editMaterial(i)} deleteFunc={() => deleteMaterial(i)} />
				<TableCell class="whitespace-nowrap">{material.code}</TableCell>
				<TableCell>{material.description}</TableCell>
				<TableCell>{material.measurement}</TableCell>
				<TableCell><Badge color="blue">{clients[material.clientId]}</Badge></TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<MaterialsForm bind:show bind:selectedMaterial reload={getMaterials} />
<DeletePopUp bind:show={show1} text="Eliminar material" deleteFunc={handleDelete} />
