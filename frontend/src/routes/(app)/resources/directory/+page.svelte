<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import Cookies from 'js-cookie';
	import { Button } from '$lib/components/ui/button';
	import { TableBody, TableCell, TableHeader, TableRow } from '$lib/components/ui/table';
	import TableHead from '$lib/components/ui/table/table-head.svelte';
	import api from '$lib/utils/server';
	import { EllipsisVertical, Pen, PlusCircle, Trash } from 'lucide-svelte';
	import DeletePopUp from '$lib/components/complex/DeletePopUp.svelte';
	import { onMount } from 'svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { showSuccess } from '$lib/utils/showToast';
	import DirectoryForm from './DirectoryForm.svelte';

	let show: boolean;
	let show1: boolean;
	let selectedDevice: device = {};

	let devices: device[] = [];

	async function getDevices() {
		devices = (await api.get('/resources/directory')).data;
	}

	function editDevice(i: number) {
		selectedDevice = devices[i];
		show = true;
	}
	function createDevice() {
		selectedDevice = {};
		show = true;
	}
	function deleteDevice(i: number) {
		selectedDevice = devices[i];
		show1 = true;
	}

	onMount(() => {
		getDevices();
	});
</script>

{#if parseInt(Cookies.get('perm_it') || '0') == 2}
	<div class="mb-6 flex justify-between">
		<Button on:click={createDevice}><PlusCircle class="mr-2 size-4" />Añadir fila</Button>
	</div>
{/if}

<CusTable>
	<TableHeader>
		{#if parseInt(Cookies.get('perm_it') || '0') == 2}
			<TableHead class="fixed left-0 z-30 bg-inherit p-1"></TableHead>
		{/if}
		<TableHead class="w-[50%]">Nombre</TableHead>
		<TableHead class="w-[25%]">Posicion</TableHead>
		<TableHead class="w-[25%]">Correo</TableHead>
		<TableHead class="w-[25%]">Extension</TableHead>
	</TableHeader>
	<TableBody>
		{#each devices as device, i}
			<TableRow>
				{#if parseInt(Cookies.get('perm_it') || '0') == 2}
					<TableCell class="sticky left-0 bg-inherit px-0">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="ghost" class="h-full w-10 p-0">
									<EllipsisVertical class="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem on:click={() => editDevice(i)}
									><Pen class="size-4" />Editar</DropdownMenuItem
								>
								<DropdownMenuItem on:click={() => deleteDevice(i)} color="red"
									><Trash class="size-4" />Eliminar</DropdownMenuItem
								>
							</DropdownMenuContent>
						</DropdownMenu>
					</TableCell>
				{/if}
				<TableCell>{device.name || ''}</TableCell>
				<TableCell>{device.position || ''}</TableCell>
				<TableCell><a href="mailto:{device.email || ''}">{device.email || ''}</a></TableCell>
				<TableCell>{device.extension || ''}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

{#if parseInt(Cookies.get('perm_it') || '0') == 2}
	<DirectoryForm bind:show bind:selectedDevice reload={getDevices} />
	<DeletePopUp
		bind:show={show1}
		text="Borrar fila"
		deleteFunc={async () => {
			await api.delete('/directory', { data: { id: parseInt(selectedDevice.id || '') } });
			showSuccess('Fila eliminada');
			await getDevices();
			show1 = false;
		}}
	/>
{/if}
