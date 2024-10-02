<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
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
	import ComputersForm from './ComputersForm.svelte';
	import { formatDate } from '$lib/utils/functions';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import PwCell from '$lib/components/ui/table/pw-cell.svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';

	let show: boolean;
	let show1: boolean;
	let selectedDevice: device = {};

	let devices: device[] = [];

	async function getComputers() {
		const result = await api.get('/computers');
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
		getComputers();
	});
</script>

<MenuBar>
	<span></span>
	<Button on:click={createDevice}><PlusCircle class="mr-1.5 size-3.5" />Añadir computadora</Button>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="fixed left-0 z-30 bg-inherit p-1"></TableHead>
		<TableHead class="w-[13%]">Nombre</TableHead>
		<TableHead class="w-[12.5%]">Usuario</TableHead>
		<TableHead class="w-[12.5%]">Anydesk</TableHead>
		<TableHead class="w-[12.5%]">Anydesk PW</TableHead>
		<TableHead class="w-[12.5%]">PW</TableHead>
		<TableHead class="w-[12.5%]">Activa</TableHead>
		<TableHead class="w-[12.5%]">Ultimo mantenimiento</TableHead>
		<TableHead class="w-[12.5%]">Proximo mantenimiento</TableHead>
	</TableHeader>
	<TableBody>
		{#each devices as device, i}
			<TableRow>
				<TableCell class="sticky left-0 bg-background px-0">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost" class="h-full w-10 p-0">
								<EllipsisVertical class="size-3.5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem on:click={() => editDevice(i)}
								><Pen class="size-3.5" />Editar</DropdownMenuItem
							>
							<DropdownMenuItem on:click={() => deleteDevice(i)} color="red"
								><Trash class="size-3.5" />Eliminar</DropdownMenuItem
							>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
				<TableCell>{device.name || ''}</TableCell>
				<TableCell>{device.owner || ''}</TableCell>
				<TableCell>{device.anydesk || ''}</TableCell>
				<PwCell password={device.anydeskPW || ''}></PwCell>
				<PwCell password={device.password || ''}></PwCell>
				<TableCell
					><Badge color={device.active ? 'green' : 'gray'}
						>{device.active ? 'Activo' : 'Inactivo'}</Badge
					></TableCell
				>
				<TableCell>{formatDate(device.lastMaintance) || ''}</TableCell>
				<TableCell>
					{#if device.lastMaintance}
						{formatDate(
							new Date(
								new Date(device.lastMaintance).setMonth(
									new Date(device.lastMaintance).getMonth() + 6
								)
							).toISOString()
						)}
					{/if}
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<ComputersForm bind:show bind:selectedDevice reload={getComputers} />
<DeletePopUp
	bind:show={show1}
	text="Borrar computadora"
	deleteFunc={async () => {
		await api.delete('/computers', { data: { id: parseInt(selectedDevice.id || '') } });
		showSuccess('Computadora eliminada');
		await getComputers();
		show1 = false;
	}}
/>
