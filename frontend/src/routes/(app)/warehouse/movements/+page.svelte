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
	import { Pen, Search } from 'lucide-svelte';
	import WarningPopUp from './WarningPopUp.svelte';
	import { onMount } from 'svelte';
	import ImportMovementsForm from './ImportMovementsForm.svelte';
	import ExportMovementsForm from './ExportMovementsForm.svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import { DropdownMenu, DropdownMenuTrigger } from '$lib/components/ui/dropdown-menu';
	import DropdownMenuContent from '$lib/components/ui/dropdown-menu/dropdown-menu-content.svelte';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';
	import RepositionForm from './RepositionForm.svelte';
	import ReturnForm from './returnForm.svelte';

	let show = false;
	let show1 = false;
	let show2 = false;
	let show3 = false;
	let show4 = false;
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

	let movements: movement[] = [];

	async function getMovements() {
		const result = (await api.get(`/materialmovements`, { params: filters })).data;

		movements = result.map((e: any) => {
			return { ...e, realAmount: e.realAmount?.toString() };
		});
	}
	async function fetchClients() {
		const clientList = (await api.get('/inventoryvarious/clients')).data;
		clientList.forEach((client: any) => {
			clients[client.value] = client.name;
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

	onMount(() => {
		getMovements();
		fetchClients();
	});
</script>

<MenuBar>
	<form class="flex gap-2" on:submit|preventDefault={getMovements} action={''}>
		<Input menu bind:value={filters.import} placeholder="Importacion" />
		<Input menu bind:value={filters.programation} placeholder="Programacion" />
		<Input menu bind:value={filters.jobpo} placeholder="Job" />
		<Input menu bind:value={filters.code} placeholder="Material" />
		<Select menu items={checkStatus} bind:value={filters.checked} />
		<Button type="submit"><Search class="mr-1.5 size-3.5" />Buscar</Button>
	</form>
	<div class="flex gap-2">
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button><Pen class="mr-1.5 size-3.5" />Registrar</Button>
				<DropdownMenuContent>
					<DropdownMenuItem on:click={() => (show = true)}>Importacion</DropdownMenuItem>
					<DropdownMenuItem on:click={() => (show1 = true)}>Job - PO</DropdownMenuItem>
					<DropdownMenuItem on:click={() => (show3 = true)}>Reposicion</DropdownMenuItem>
					<DropdownMenuItem on:click={() => (show4 = true)}>Retorno</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuTrigger>
		</DropdownMenu>
	</div>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="">Importacion</TableHead>
		<TableHead class="">Programacion</TableHead>
		<TableHead class="">Job-PO</TableHead>
		<TableHead class="">Codigo</TableHead>
		<TableHead class="">Descripcion</TableHead>
		<TableHead class="">Cantidad sobrante</TableHead>
		<TableHead class="">Cantidad</TableHead>
		<TableHead class="">Cantidad Real</TableHead>
		<TableHead class="">Medida</TableHead>
		<TableHead class="">Cliente</TableHead>
		<TableHead class="">Surtido</TableHead>
	</TableHeader>
	<TableBody>
		{#each movements as movement, i}
			<TableRow>
				<TableCell>{movement.import || ''}</TableCell>
				<TableCell>{movement.programation || ''}</TableCell>
				<TableCell>{movement.jobpo || ''}</TableCell>
				<TableCell>{movement.code}</TableCell>
				<TableCell class="w-full min-w-24 max-w-1 overflow-hidden">{movement.description}</TableCell
				>
				<TableCell
					><Badge color={parseFloat(movement.leftoverAmount) >= 0 ? 'primary' : 'red'}
						>{movement.leftoverAmount}</Badge
					></TableCell
				>
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
				<TableCell><Badge color="blue">{clients[movement.clientId]}</Badge></TableCell>
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

<ImportMovementsForm bind:show reload={getMovements} />
<ExportMovementsForm bind:show={show1} reload={getMovements} />
<WarningPopUp
	bind:show={show2}
	action={checkMovement}
	text={`Seguro que quieres surtir ${movements[movementI]?.realAmount} ${movements[movementI]?.measurement} del material ${movements[movementI]?.code} ?`}
/>
<RepositionForm bind:show={show3} reload={getMovements} />
<ReturnForm bind:show={show4} reload={getMovements} />
