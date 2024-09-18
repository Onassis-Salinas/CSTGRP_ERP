<script lang="ts">
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

	async function handleSubmit() {
		if (selectedDevice.id) {
			await api.put('/devices', {
				...formData,
				id: parseInt(formData.id || '')
			});
			showSuccess('Dispositivo editado');
		} else {
			await api.post('/devices', formData);
			showSuccess('Dispositivo registrado');
		}
		await reload();
		show = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedDevice.id ? `Editar ${selectedDevice.name}` : 'Registrar posicion'}
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
						<span>IP</span>
						<Input name="text" bind:value={formData.ip} />
					</div>
					<div class="space-y-2">
						<span>Usuario</span>
						<Input name="text" bind:value={formData.user} />
					</div>
					<div class="space-y-2">
						<span>Contrasena</span>
						<Input name="text" bind:value={formData.password} />
					</div>
					<div class="space-y-2">
						<span>Wifi</span>
						<Input name="text" bind:value={formData.wifipw} />
					</div>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
