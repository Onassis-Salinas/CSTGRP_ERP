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
	export let selectedDevice: any;
	let formData: any;

	$: if (show || true) setFormData();

	function setFormData() {
		formData = { ...selectedDevice };
	}

	async function handleSubmit() {
		if (selectedDevice.id) {
			await api.put('/emails', {
				...formData,
				id: parseInt(formData.id || '')
			});
			showSuccess('Correo editada');
		} else {
			await api.post('/emails', formData);
			showSuccess('Correo registrada');
		}
		await reload();
		show = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedDevice.id ? `Editar ${selectedDevice.email}` : 'Registrar correo'}
			</DialogTitle>
		</DialogHeader>

		<DialogBody>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full grid-cols-2 gap-4">
					<Label name="Correo">
						<Input name="text" bind:value={formData.email} />
					</Label>
					<Label name="Contrasena">
						<Input name="text" bind:value={formData.password} />
					</Label>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
