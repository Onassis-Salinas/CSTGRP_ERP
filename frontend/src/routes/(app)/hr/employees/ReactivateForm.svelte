<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogBody } from '$lib/components/ui/dialog';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import { Input } from '$lib/components/ui/input';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { UserPlus } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let show = false;
	export let selectedEmployee: employee;
	export let reload: any;

	let areas: any;
	let positions: any;

	async function fetchOptions() {
		areas = (await api.get('/hrvarious/areas')).data;
		positions = (await api.get('/hrvarious/positions')).data;
	}

	let formData: employee = {
		id: selectedEmployee.id,
		admissionDate: new Date().toISOString().split('T')[0]
	};

	async function handleSubmmit() {
		await api.put('/employees/reactivate', {
			...formData,
			id: parseInt(selectedEmployee.id || '0'),
			positionId: parseInt(formData.positionId || '0'),
			areaId: parseInt(formData.areaId || '0')
		});

		showSuccess('Empleado dado de baja');
		formData = {
			id: '',
			admissionDate: '',
			positionId: '',
			areaId: ''
		};
	}

	onMount(() => {
		show = false;
		reload();
		fetchOptions();
	});
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogBody>
			<div class="text-center">
				<UserPlus class="mx-auto mb-2 h-16 w-16 text-gray-400 dark:text-gray-200" />
				<h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">Recontratar a:</h3>
				<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
					{selectedEmployee.name} - {selectedEmployee.noEmpleado}
				</h3>
			</div>
			<form class="flex flex-col space-y-6" action="#">
				<b class="space-y-2">
					<span>Fecha de Alta</span>
					<Input type="date" bind:value={formData.admissionDate} />
				</b>
				<b class="space-y-2">
					<span>Area</span>
					<!-- <Select items={areas} bind:value={formData.areaId} placeholder="Elige una opcion" /> -->
				</b>
				<b class="space-y-2">
					<span>Posicion</span>
					<!-- <Select items={positions} bind:value={formData.positionId} placeholder="Elige una opcion" /> -->
				</b>
				<div class="text-center">
					<Button on:click={handleSubmmit} class="me-2">Recontratar</Button>
					<Button on:click={() => (show = false)}>Cancelar</Button>
				</div>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
