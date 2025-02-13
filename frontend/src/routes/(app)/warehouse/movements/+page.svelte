<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import Select from '$lib/components/basic/Select.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { FileDown, Pen, Search } from 'lucide-svelte';
	import WarningPopUp from './WarningPopUp.svelte';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import { format } from 'date-fns';
	import MovementsMenu from './MovementsMenu.svelte';
	import { es } from 'date-fns/locale';

	let show = false;
	let show1 = false;
	let show2 = false;
	let show3 = false;
	let movementI = 0;

	let clients: any = {};

	let filters = {
		programation: '',
		import: '',
		jobpo: '',
		code: '',
		checked: ''
	};

	let checkStatus = [
		{ value: '', name: 'Sin filtro' },
		{ value: 'true', name: 'Surtido' },
		{ value: 'false', name: 'No surtido' }
	];

	let movements: any[] = [];

	async function getMovements() {
		const result = (await api.get(`/materialmovements`, { params: filters })).data;

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

	function viewCheckModal(i: number) {
		show2 = true;
		movementI = i;
	}

	async function checkMovement() {
		try {
			const result = await api.put('/materialmovements/activate', { id: movements[movementI].id });
			console.log(result.data);
			showSuccess(result.data ? 'Check eliminado' : 'Material surtido');
			show2 = false;
			await getMovements();
		} catch (err: any) {
			if (err.response.status !== 400) throw err;
		}
	}

	async function changeAmount(id: string, amount: string) {
		console.log(amount);
		await api.put('/materialmovements/realamount', { id: id, newAmount: amount });
		showSuccess('Cantidad actualizada');
		await getMovements();
	}

	async function exportUncheckedMovements() {
		const response = await api.get('/materialmovements/export-pending', {
			responseType: 'arraybuffer'
		});

		const blob = new Blob([response.data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = `Pendientes ${format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}.xlsx`;

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	}

	onMount(() => {
		getMovements();
		fetchClients();
	});
</script>

<MenuBar>
	<form class="flex flex-col gap-1 lg:flex-row" on:submit|preventDefault={getMovements} action={''}>
		<Input menu bind:value={filters.import} placeholder="Importacion" />
		<Input menu bind:value={filters.programation} placeholder="Programacion" />
		<Input menu bind:value={filters.jobpo} placeholder="Job" />
		<Input menu bind:value={filters.code} placeholder="Material" />
		<Select menu items={checkStatus} bind:value={filters.checked} />
		<Button type="submit"><Search class="mr-1.5 size-3.5" />Buscar</Button>
	</form>
	<svelte:fragment slot="right">
		<Button on:click={exportUncheckedMovements}><FileDown class="size-3.5" /></Button>

		<Button on:click={() => (show3 = true)}><Pen class="mr-1.5 size-3.5" />Registrar</Button>
	</svelte:fragment>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead>Importacion</TableHead>
		<TableHead>Programacion</TableHead>
		<TableHead>Job-PO</TableHead>
		<TableHead>Req</TableHead>
		<TableHead>Codigo</TableHead>
		<TableHead>Descripcion</TableHead>
		<TableHead>Inventario</TableHead>
		<TableHead>Sobrante</TableHead>
		<TableHead>Cantidad</TableHead>
		<TableHead>Cantidad Real</TableHead>
		<TableHead>Medida</TableHead>
		<TableHead>Cliente</TableHead>
		<TableHead>Surtido</TableHead>
	</TableHeader>
	<TableBody>
		{#each movements as movement, i}
			<TableRow>
				<TableCell>{movement.import || ''}</TableCell>
				<TableCell>{movement.programation || ''}</TableCell>
				<TableCell>{(movement.jobpo || '') + (movement.extra ? ' -R' : '')}</TableCell>
				<TableCell>{movement.req || ''}</TableCell>
				<TableCell>{movement.code}</TableCell>
				<TableCell class="w-full min-w-24 max-w-1 overflow-hidden">{movement.description}</TableCell
				>
				<TableCell><Badge color="gray">{movement.inventory}</Badge></TableCell>
				<TableCell><Badge color="gray">{movement.leftoverAmount}</Badge></TableCell>
				<TableCell
					><Badge color={parseFloat(movement.amount) >= 0 ? 'green' : 'red'}
						>{movement.amount}</Badge
					></TableCell
				>

				<TableCell
					><Input
						menu
						class="w-24"
						type="number"
						bind:value={movement.realAmount}
						on:blur={() => changeAmount(movement.id, movement.realAmount)}
					/></TableCell
				>
				<TableCell>{movement.measurement}</TableCell>
				<TableCell
					>{#if clients[movement.clientId]}
						<Badge color={clients[movement.clientId].color}
							>{clients[movement.clientId].name}
						</Badge>
					{/if}</TableCell
				>
				<TableCell
					><Checkbox
						onCheckedChange={() => {
							viewCheckModal(i);
						}}
						checked={movement.active}
					/></TableCell
				>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<WarningPopUp
	bind:show={show2}
	action={checkMovement}
	text={`Seguro que quieres surtir ${movements[movementI]?.realAmount} ${movements[movementI]?.measurement} del material ${movements[movementI]?.code} ?`}
/>
<MovementsMenu bind:show={show3} reload={getMovements} />
