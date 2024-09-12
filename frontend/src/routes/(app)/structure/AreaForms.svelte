<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
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
	export let selectedArea: area;
	let formData: area;

	$: if (show || true) setFormData();

	function setFormData() {
		formData = { ...selectedArea };
	}

	async function handleSubmit() {
		if (selectedArea.id) {
			await api.put('/areas', {
				...formData,
				id: parseInt(formData.id || '')
			});
			showSuccess('Area editada');
		} else {
			await api.post('/areas', formData);
			showSuccess('Area registrada');
		}
		await reload();
		show = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedArea.id ? `Editar ${selectedArea.name}` : 'Registrar Area'}
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
						<span>Es capturada</span>
						<Checkbox name="text" bind:checked={formData.captured} />
					</div>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
