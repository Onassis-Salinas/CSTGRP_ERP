<script lang="ts">
	import Label from '$lib/components/basic/Label.svelte';
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
				{selectedDevice.id ? `Editar ${selectedDevice.name}` : 'Registrar dispositivo'}
			</DialogTitle>
		</DialogHeader>

		<DialogBody>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full grid-cols-2 gap-4">
					<Label name="Nombre">
						<Input name="text" bind:value={formData.name} />
					</Label>
					<Label name="IP">
						<Input name="text" bind:value={formData.ip} />
					</Label>
					<Label name="Usuario">
						<Input name="text" bind:value={formData.user} />
					</Label>
					<Label name="Contrasena">
						<Input name="text" bind:value={formData.password} />
					</Label>
					<Label name="Wifi">
						<Input name="text" bind:value={formData.wifipw} />
					</Label>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
