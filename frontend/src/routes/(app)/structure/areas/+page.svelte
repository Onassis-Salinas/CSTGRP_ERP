<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { Button } from '$lib/components/ui/button';
	import { TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import TableBody from '$lib/components/ui/table/table-body.svelte';
	import api from '$lib/utils/server';
	import DeletePopUp from '$lib/components/complex/DeletePopUp.svelte';
	import AreaForms from './AreaForms.svelte';
	import { showSuccess } from '$lib/utils/showToast';
	import { Check, EllipsisVertical, Pen, PlusCircle, Trash } from 'lucide-svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';

	let show: boolean;
	let show1: boolean;
	let selectedArea: area = {};

	let areas: area[] = [];

	async function getAreas() {
		const result = await api.get('/areas');
		areas = result.data;
	}

	function editArea(i: number) {
		selectedArea = areas[i];
		show = true;
	}
	function createArea() {
		selectedArea = {};
		show = true;
	}
	function deleteArea(i: number) {
		selectedArea = areas[i];
		show1 = true;
	}

	onMount(() => {
		getAreas();
	});
</script>

<MenuBar>
	<span></span>
	<Button on:click={createArea}><PlusCircle class="mr-1.5 size-3.5" />Añadir area</Button>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead></TableHead>
		<TableHead class="w-full">Nombre</TableHead>
		<TableHead>Captura</TableHead>
	</TableHeader>
	<TableBody>
		{#each areas as area, i}
			<TableRow>
				<TableCell class="bg-background sticky left-0 px-0">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost">
								<EllipsisVertical class="size-3.5" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuItem on:click={() => editArea(i)}
								><Pen class="size-3.5" />Editar</DropdownMenuItem
							>
							<DropdownMenuItem on:click={() => deleteArea(i)} color="red"
								><Trash class="size-3.5" />Eliminar</DropdownMenuItem
							>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
				<TableCell>{area.name}</TableCell>
				<TableCell>
					{#if area.captured}
						<Check />
					{/if}
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<AreaForms bind:show bind:selectedArea reload={getAreas} />
<DeletePopUp
	bind:show={show1}
	text="Borrar area"
	deleteFunc={async () => {
		await api.delete('areas', { data: { id: parseInt(selectedArea.id || '') } });
		showSuccess('Area eliminada');
		show1 = false;
	}}
/>
