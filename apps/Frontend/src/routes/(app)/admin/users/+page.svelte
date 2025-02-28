<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import DeletePopUp from '$lib/components/complex/DeletePopUp.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import UsersForm from './UsersForm.svelte';
	import { ChevronDown, EllipsisVertical, Pen, PlusCircle, Trash } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import OptionsCell from '$lib/components/basic/OptionsCell.svelte';

	let show: boolean;
	let show1: boolean;
	let selectedUser = {
		id: '',
		username: '',
		password: '',
		perm_assistance_areas: '',
		perm_users: 0,
		perm_materialmovements: 0,
		perm_assistance: 0,
		perm_productivity: 0,
		perm_employees: 0,
		perm_inventory: 0,
		perm_structure: 0,
		perm_it: 0,
		perm_inventorystats: 0,
		perm_petitions: 0,
		perm_requisitions: 0
	};
	let users: (typeof selectedUser)[] = [];
	let areas: any = {};

	async function getUsers() {
		const result = await api.get('/users');
		users = result.data;
		const areasList = (await api.get('/hrvarious/areas')).data;
		areasList.forEach((area: any) => {
			areas[area.value] = area.name;
		});
	}

	function editUser(i: number) {
		selectedUser = users[i];
		show = true;
	}
	function createUser() {
		selectedUser = {
			id: '',
			username: '',
			password: '',
			perm_assistance_areas: '',
			perm_users: 0,
			perm_materialmovements: 0,
			perm_assistance: 0,
			perm_productivity: 0,
			perm_employees: 0,
			perm_inventory: 0,
			perm_structure: 0,
			perm_inventorystats: 0,
			perm_petitions: 0,
			perm_requisitions: 0,
			perm_it: 0
		};
		show = true;
	}

	function deleteUser(i: number) {
		selectedUser = users[i];
		show1 = true;
	}

	async function handleDelete() {
		await api.delete('/users', { data: { id: parseInt(selectedUser.id) } });
		selectedUser = {
			id: '',
			username: '',
			password: '',
			perm_assistance_areas: '',
			perm_users: 0,
			perm_materialmovements: 0,
			perm_assistance: 0,
			perm_productivity: 0,
			perm_employees: 0,
			perm_inventory: 0,
			perm_structure: 0,
			perm_requisitions: 0,
			perm_it: 0,
			perm_inventorystats: 0,
			perm_petitions: 0
		};
		showSuccess('Usuario eliminado');
		await getUsers();
		show1 = false;
	}

	function getBadgeColor(num: number): 'red' | 'green' | 'blue' {
		if (num === 0) return 'red';
		if (num === 1) return 'green';
		if (num === 2) return 'blue';
		return 'red';
	}

	const badgeTexts = ['Ninguno', 'Leer', 'Modificar'];

	onMount(() => {
		getUsers();
	});
</script>

<MenuBar>
	<svelte:fragment slot="right">
		<Button on:click={createUser}
			><PlusCircle class="ml-auto mr-1.5 size-3.5" />Añadir Usuario</Button
		>
	</svelte:fragment>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="fixed left-3 z-30 bg-inherit p-1"></TableHead>
		<TableHead class="w-[12.5%]">Usuario</TableHead>
		<TableHead class="w-[12.5%]">Asistencia</TableHead>
		<TableHead class="w-[12.5%]">Empleados</TableHead>
		<TableHead class="w-[12.5%]">Inventario</TableHead>
		<TableHead class="w-[12.5%]">Productividad</TableHead>
		<TableHead class="w-[12.5%]">Usuarios</TableHead>
		<TableHead class="w-[12.5%]">Estructura</TableHead>
		<TableHead class="w-[12.5%]">Sistemas</TableHead>
		<TableHead class="w-[12.5%]">Movimientos</TableHead>
		<TableHead class="w-[12.5%]">Dashboard</TableHead>
		<TableHead class="w-[12.5%]">Requisiciones</TableHead>
		<TableHead class="w-[12.5%]">Peticiones</TableHead>
		<TableHead class="w-[12.5%]">Areas</TableHead>
	</TableHeader>
	<TableBody>
		{#each users as user, i}
			<TableRow>
				<OptionsCell editFunc={() => editUser(i)} deleteFunc={() => deleteUser(i)} />

				<TableCell class="font-semibold">{user.username}</TableCell>
				<TableCell
					><Badge color={getBadgeColor(user.perm_assistance)}
						>{badgeTexts[user.perm_assistance]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_employees)}
						>{badgeTexts[user.perm_employees]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_inventory)}
						>{badgeTexts[user.perm_inventory]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_productivity)}
						>{badgeTexts[user.perm_productivity]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_users)}>{badgeTexts[user.perm_users]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_structure)}
						>{badgeTexts[user.perm_structure]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_it)}>{badgeTexts[user.perm_it]}</Badge></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_materialmovements)}
						>{badgeTexts[user.perm_materialmovements]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_inventorystats)}
						>{badgeTexts[user.perm_inventorystats]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_requisitions)}
						>{badgeTexts[user.perm_requisitions]}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={getBadgeColor(user.perm_petitions)}
						>{badgeTexts[user.perm_petitions]}</Badge
					></TableCell
				>
				<TableCell class="px-2 py-0">
					<DropdownMenu>
						<DropdownMenuTrigger class="h-full w-full">
							<Button class="border-none" variant="outline"
								>Areas<ChevronDown class="ms-2 size-4" /></Button
							>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{#each user.perm_assistance_areas?.split(',') || [] as area}
								<DropdownMenuItem class="px-3 py-1"
									>{area === 'Todas' ? area : areas[area]}</DropdownMenuItem
								>
							{/each}
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<UsersForm bind:show bind:selectedUser reload={getUsers} />
<DeletePopUp bind:show={show1} text="Eliminar usuario" deleteFunc={handleDelete} />
