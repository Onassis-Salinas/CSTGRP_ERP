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
	export let selectedPosition: position;
	let formData: position;

	$: if (show || true) setFormData();

	function setFormData() {
		formData = { ...selectedPosition };
	}

	async function handleSubmit() {
		if (selectedPosition.id) {
			await api.put('/positions', {
				...formData,
				id: parseInt(formData.id || '')
			});
			showSuccess('Posicion editada');
		} else {
			await api.post('/positions', formData);
			showSuccess('Posicion registrada');
		}
		await reload();
		show = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedPosition.id ? `Editar ${selectedPosition.name}` : 'Registrar posicion'}
			</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full grid-cols-2 gap-4">
					<div class="space-y-2">
						<span>Nombre</span>
						<Input name="text" bind:value={formData.name} />
					</div>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
