<script lang="ts">
	import Select from '$lib/components/basic/Select.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogBody,
		DialogContent,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';

	export let show = false;
	export let reload: any;
	export let selectedDevice: device;
	let formData: device;

	$: if (show || true) setFormData();

	function setFormData() {
		formData = { ...selectedDevice };
	}

	const activeValues = [
		{ value: true, name: 'Activa' },
		{ value: false, name: 'Inactiva' }
	];

	async function handleSubmit() {
		if (selectedDevice.id) {
			await api.put('/computers', {
				...formData,
				id: parseInt(formData.id || '')
			});
			showSuccess('Computadora editada');
		} else {
			await api.post('/computers', formData);
			showSuccess('Computadora registrada');
		}
		await reload();
		show = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedDevice.id ? `Editar ${selectedDevice.name}` : 'Registrar computadora'}
			</DialogTitle>
		</DialogHeader>

		<DialogBody>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full grid-cols-2 gap-4">
					<div class="space-y-2">
						<span>Nombre</span>
						<Input name="text" bind:value={formData.name} />
					</div>
					<div class="space-y-2">
						<span>Usuario</span>
						<Input name="text" bind:value={formData.owner} />
					</div>
					<div class="space-y-2">
						<span>Anydesk</span>
						<Input name="text" bind:value={formData.anydesk} />
					</div>
					<div class="space-y-2">
						<span>Anydesk PW</span>
						<Input name="text" bind:value={formData.anydeskPW} />
					</div>
					<div class="space-y-2">
						<span>PW</span>
						<Input name="text" bind:value={formData.password} />
					</div>
					<div class="space-y-2">
						<span>Activa</span>
						<Select items={activeValues} bind:value={formData.active} />
					</div>
					<div class="space-y-2">
						<span>Último Mantenimiento</span>
						<Input name="text" bind:value={formData.lastMaintance} />
					</div>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
