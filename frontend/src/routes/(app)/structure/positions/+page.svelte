<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import { EllipsisVertical, Pen, PlusCircle, Trash } from 'lucide-svelte';
	import PositionsForm from './PositionsForm.svelte';
	import DeletePopUp from '$lib/components/complex/DeletePopUp.svelte';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';

	let show: boolean;
	let show1: boolean;
	let selectedPosition: position = {};

	let positions: position[] = [];

	async function getPositions() {
		const result = await api.get('/positions');
		positions = result.data;
	}

	function editPosition(i: number) {
		selectedPosition = positions[i];
		show = true;
	}
	function createPosition() {
		selectedPosition = {};
		show = true;
	}
	function deletePosition(i: number) {
		selectedPosition = positions[i];
		show1 = true;
	}

	onMount(() => {
		getPositions();
	});
</script>

<MenuBar>
	<span></span>
	<Button on:click={createPosition}><PlusCircle class="mr-1.5 size-3.5" />Añadir posicion</Button>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="fixed left-0 z-30 bg-inherit p-1"></TableHead>
		<TableHead class="w-full">Nombre</TableHead>
	</TableHeader>
	<TableBody>
		{#each positions as position, i}
			<TableRow>
				<TableCell class="bg-background sticky left-0 px-0">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost">
								<EllipsisVertical class="size-3.5" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuItem on:click={() => editPosition(i)}
								><Pen class="size-3.5" />Editar</DropdownMenuItem
							>
							<DropdownMenuItem on:click={() => deletePosition(i)} color="red"
								><Trash class="size-3.5" />Eliminar</DropdownMenuItem
							>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
				<TableCell>{position.name}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<PositionsForm bind:show bind:selectedPosition reload={getPositions} />
<DeletePopUp
	bind:show={show1}
	text="Borrar posicion"
	deleteFunc={async () => {
		await api.delete('positions', { data: { id: parseInt(selectedPosition.id || '') } });
		showSuccess('Posicion eliminada');
		show1 = false;
	}}
/>
