<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { Button } from '$lib/components/ui/button';
	import { TableBody, TableCell, TableHeader, TableRow } from '$lib/components/ui/table';
	import TableHead from '$lib/components/ui/table/table-head.svelte';
	import api from '$lib/utils/server';
	import { EllipsisVertical, Pen, PlusCircle, Trash } from 'lucide-svelte';
	import DevicesForm from './DevicesForm.svelte';
	import DeletePopUp from '$lib/components/complex/DeletePopUp.svelte';
	import { onMount } from 'svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { showSuccess } from '$lib/utils/showToast';

	let show: boolean;
	let show1: boolean;
	let selectedDevice: device = {};

	let devices: device[] = [];

	async function getDevices() {
		const result = await api.get('/devices');
		devices = result.data;
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

<div class="mb-6 flex justify-between">
	<div>
		<Button on:click={createDevice}><PlusCircle class="mr-2 size-4" />Añadir dispositivo</Button>
	</div>
</div>

<CusTable>
	<TableHeader
		class="sticky top-0 z-20 bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
	>
		<TableHead class="fixed left-0 z-30 bg-inherit p-1"></TableHead>
		<TableHead class="w-[20%]">Nombre</TableHead>
		<TableHead class="w-[20%]">Ip</TableHead>
		<TableHead class="w-[20%]">Usuario</TableHead>
		<TableHead class="w-[20%]">Contrasena</TableHead>
		<TableHead class="w-[20%]">Wifi</TableHead>
	</TableHeader>
	<TableBody>
		{#each devices as device, i}
			<TableRow>
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
				<TableCell>{device.name || ''}</TableCell>
				<TableCell>{device.ip || ''}</TableCell>
				<TableCell>{device.user || ''}</TableCell>
				<TableCell>{device.password || ''}</TableCell>
				<TableCell>{device.wifipw || ''}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<DevicesForm bind:show bind:selectedDevice reload={getDevices} />
<DeletePopUp
	bind:show={show1}
	text="Borrar Dispositivo"
	deleteFunc={async () => {
		await api.delete('devices', { data: { id: parseInt(selectedDevice.id || '') } });
		showSuccess('Posicion eliminada');
		show1 = false;
	}}
/>
