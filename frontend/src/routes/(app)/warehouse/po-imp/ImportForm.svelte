<script lang="ts">
	import Label from '$lib/components/basic/Label.svelte';
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
	export let selectedMovement: any;

	let formData = {
		due: '',
		import: '',
		location: '',
		id: ''
	};

	$: if (selectedMovement.id) setValues();

	function setValues() {
		formData.due = selectedMovement.due?.split('T')[0];
		formData.import = selectedMovement.import;
		formData.location = selectedMovement.location;
		formData.id = selectedMovement.id;
	}

	async function handleSubmit() {
		if (selectedMovement.id) {
			await api.put('materialmovements/import', formData);
			showSuccess('Job-PO actualizado');
		}

		await reload();
		show = false;
	}

	let options = [
		{ value: 'At M&M, In transit', name: 'En transito' },
		{ value: 'At CST, In revision', name: 'En revisión' },
		{ value: 'At CST, Qtys verified', name: 'Listo' }
	];
</script>

<Dialog bind:open={show}>
	<DialogContent class="max-w-lg">
		<DialogHeader>
			<DialogTitle>Editar importacion</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<img src={selectedMovement.image} alt="" class="w-full" />
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full gap-4">
					<Label name="Fecha">
						<Input type="date" bind:value={formData.due} />
					</Label>
					<Label name="Importacion">
						<Input bind:value={formData.import} />
					</Label>

					<Label name="Importacion">
						<Select items={options} bind:value={formData.location} />
					</Label>
				</div>

				<Button type="submit" size="sm" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
