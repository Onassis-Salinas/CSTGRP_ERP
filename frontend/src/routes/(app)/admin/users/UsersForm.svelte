<script lang="ts">
	import Select from '$lib/components/basic/Select.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		Dialog,
		DialogBody,
		DialogContent,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent
	} from '$lib/components/ui/dropdown-menu';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { ChevronDown } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let show = false;
	export let reload: any;
	export let selectedUser: user;
	let formData: user;

	$: if (show || true) setFormData();
	function setFormData() {
		selectedAreas = selectedUser?.perm_assistance_areas?.split(',') || [];
		formData = { ...selectedUser };
	}

	const permissions = [
		{ value: 0, name: 'Ninguno' },
		{ value: 1, name: 'Leer' },
		{ value: 2, name: 'Modificar' }
	];
	let selectedAreas: any[] = [];

	let areas: any[];

	async function getAreas() {
		areas = (await api.get('/hrvarious/areas')).data;
	}

	async function handleSubmit() {
		if (selectedUser.id) {
			if (formData.password === '') delete formData.password;
			await api.put('users', {
				...formData,
				id: parseInt(formData.id || ''),
				perm_assistance_areas: selectedAreas[0] === 'Todas' ? 'Todas' : selectedAreas.join(',')
			});
			showSuccess('Usuario actualizado');
		} else {
			await api.post('users', {
				...formData,
				id: parseInt(formData.id || ''),
				perm_assistance_areas: selectedAreas[0] === 'Todas' ? 'Todas' : selectedAreas.join(',')
			});
			showSuccess('Usuario registrado');
		}
		await reload();
		show = false;
	}

	function handleCheck(v: any, i: number) {
		if (v) {
			selectedAreas.push(areas[i].value);
		} else {
			selectedAreas = selectedAreas.filter((area) => {
				return area !== areas[i].value;
			});
		}
	}
	function checkAll(v: any) {
		if (v) {
			selectedAreas = ['Todas'];
		} else {
			selectedAreas = [];
		}
	}

	onMount(() => {
		getAreas();
	});
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle
				>{selectedUser.id
					? `Editar Informacion de ${selectedUser.username}`
					: 'Registrar Usuario'}</DialogTitle
			>
		</DialogHeader>

		<DialogBody>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full grid-cols-2 gap-4">
					<div class="space-y-2">
						<span>Nombre</span>
						<Input name="text" bind:value={formData.username} />
					</div>
					<div class="space-y-2">
						<span>Contraseña</span>
						<Input name="text" bind:value={formData.password} />
					</div>
					<div class="space-y-2">
						<span>Perm. Usuarios</span>
						<Select items={permissions} bind:value={formData.perm_users} />
					</div>
					<div class="space-y-2">
						<span>Perm. Asistencia</span>
						<Select items={permissions} bind:value={formData.perm_assistance} />
					</div>
					<div class="space-y-2">
						<span>Perm. Empleados</span>
						<Select items={permissions} bind:value={formData.perm_employees} />
					</div>
					<div class="space-y-2">
						<span>Perm. Productividad</span>
						<Select items={permissions} bind:value={formData.perm_productivity} />
					</div>
					<div class="space-y-2">
						<span>Perm. Inventario</span>
						<Select items={permissions} bind:value={formData.perm_inventory} />
					</div>
					<div class="space-y-2">
						<span>Perm. Estructura</span>
						<Select items={permissions} bind:value={formData.perm_structure} />
					</div>
					<div class="space-y-2">
						<span>Perm. Sistemas</span>
						<Select items={permissions} bind:value={formData.perm_it} />
					</div>
					<div class="space-y-2">
						<span>Perm. Materiales</span>
						<Select items={permissions} bind:value={formData.perm_materials} />
					</div>
					<div class="space-y-2">
						<span>Areas</span>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="outline" class="w-full"
									>Seleccionar<ChevronDown class="text-primary ms-2 size-4" /></Button
								>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{#each areas as area, i}
									<li class="list-none">
										<Checkbox
											id={'c-' + area.name}
											checked={selectedAreas.includes(area.value) || selectedAreas[0] === 'Todas'}
											onCheckedChange={(v) => {
												handleCheck(v, i);
											}}
										/>
										<Label for={'c-' + area.name}>{area.name}</Label>
									</li>
								{/each}
								<li class="list-none">
									<Checkbox
										id="c-todas"
										checked={selectedAreas[0] === 'Todas'}
										onCheckedChange={(v) => {
											console.log(v);
											checkAll(v);
										}}
									/>
									<Label for="c-todas" class="font-semibold">Todas</Label>
								</li>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
