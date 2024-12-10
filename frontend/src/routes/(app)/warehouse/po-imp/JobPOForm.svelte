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
	export let selectedMovement: any;

	let formData = {
		due: new Date(),
		programation: '',
		jobpo: '',
		id: ''
	};

	$: if (selectedMovement.id) setValues();

	function setValues() {
		formData.due = selectedMovement.due?.split('T')[0];
		formData.programation = selectedMovement.programation;
		formData.jobpo = selectedMovement.jobpo;
		formData.id = selectedMovement.id;
	}

	async function handleSubmit() {
		if (selectedMovement.id) {
			await api.put('materialmovements/export', formData);
			showSuccess('Job-PO actualizado');
		}

		await reload();
		show = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				Editar PO-Job
			</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<img src={selectedMovement.image} alt="" class="w-full" />
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full gap-4">
					<Label name="Fecha">
						<Input type="date" name="text" bind:value={formData.due} />
					</Label>
					<Label name="Job-PO">
						<Input name="text" bind:value={formData.jobpo} />
					</Label>
					<Label name="Programacion">
						<Input name="text" bind:value={formData.programation} />
					</Label>
				</div>

				<Button type="submit" size="sm" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
