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
	import { formatDate } from '$lib/utils/functions';
	import EmailsForm from './EmailsForm.svelte';

	let show: boolean;
	let show1: boolean;
	let selectedDevice: device = {};

	let devices: device[] = [];

	async function getEmails() {
		const result = await api.get('/emails');
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
		getEmails();
	});
</script>

<div class="mb-6 flex justify-between">
	<div>
		<Button on:click={createDevice}><PlusCircle class="mr-2 size-4" />Añadir correo</Button>
	</div>
</div>

<CusTable>
	<TableHeader>
		<TableHead class="fixed left-0 z-30 bg-inherit p-1"></TableHead>
		<TableHead>Correo</TableHead>
		<TableHead>PW</TableHead>
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
				<TableCell class="w-full">{device.email || ''}</TableCell>
				<TableCell>{device.password || ''}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<EmailsForm bind:show bind:selectedDevice reload={getEmails} />
<DeletePopUp
	bind:show={show1}
	text="Borrar correo"
	deleteFunc={async () => {
		await api.delete('/emails', { data: { id: parseInt(selectedDevice.id || '') } });
		showSuccess('Correo eliminada');
		await getEmails();
		show1 = false;
	}}
/>
