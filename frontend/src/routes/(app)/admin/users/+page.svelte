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

	let show: boolean;
	let show1: boolean;
	let selectedUser: user = {
		id: '',
		username: '',
		password: '',
		perm_assistance_areas: undefined,
		perm_users: 0,
		perm_materials: 0,
		perm_assistance: 0,
		perm_productivity: 0,
		perm_employees: 0,
		perm_inventory: 0,
		perm_structure: 0,
		perm_it: 0
	};
	let users: user[] = [];
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
			perm_assistance_areas: undefined,
			perm_users: 0,
			perm_materials: 0,
			perm_assistance: 0,
			perm_productivity: 0,
			perm_employees: 0,
			perm_inventory: 0,
			perm_structure: 0,
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
			perm_assistance_areas: undefined,
			perm_users: 0,
			perm_materials: 0,
			perm_assistance: 0,
			perm_productivity: 0,
			perm_employees: 0,
			perm_inventory: 0,
			perm_structure: 0,
			perm_it: 0
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

<div class="mb-6 flex justify-between">
	<div>
		<Button on:click={createUser}><PlusCircle class="mr-2 size-4" />Añadir Usuario</Button>
	</div>
</div>

<CusTable>
	<TableHeader
		class="sticky top-0 z-20 w-full bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
	>
		<TableHead class="fixed left-3 z-30 bg-inherit p-1"></TableHead>
		<TableHead class="w-[12.5%]">Usuario</TableHead>
		<TableHead class="w-[12.5%]">Perm. Asistencia</TableHead>
		<TableHead class="w-[12.5%]">Perm. Empleados</TableHead>
		<TableHead class="w-[12.5%]">Perm. Inventario</TableHead>
		<TableHead class="w-[12.5%]">Perm. Productividad</TableHead>
		<TableHead class="w-[12.5%]">Perm. Usuarios</TableHead>
		<TableHead class="w-[12.5%]">Perm. Estructura</TableHead>
		<TableHead class="w-[12.5%]">Perm. Sistemas</TableHead>
		<TableHead class="w-[12.5%]">Perm. Materiales</TableHead>
		<TableHead class="w-[12.5%]">Areas</TableHead>
	</TableHeader>
	<TableBody>
		{#each users as user, i}
			<TableRow>
				<TableCell class="sticky left-0 bg-inherit px-0">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button variant="ghost">
								<EllipsisVertical class="size-4" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent>
							<DropdownMenuItem on:click={() => editUser(i)}
								><Pen class="size-4" />Editar</DropdownMenuItem
							>
							<DropdownMenuItem on:click={() => deleteUser(i)} color="red">
								<Trash class="size-4" />Eliminar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>

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
					><Badge color={getBadgeColor(user.perm_materials)}
						>{badgeTexts[user.perm_materials]}</Badge
					></TableCell
				>
				<TableCell class="px-2 py-0">
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button class="py-1" variant="outline"
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
