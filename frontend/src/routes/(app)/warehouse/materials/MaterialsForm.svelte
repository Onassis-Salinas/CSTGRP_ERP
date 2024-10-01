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
	import { onMount } from 'svelte';

	export let show = false;
	export let reload: any;
	export let selectedMaterial: material;
	let formData: material;

	$: if (show || true) setFormData();
	function setFormData() {
		formData = { ...selectedMaterial };
	}
	let clients: any[];

	const measurements = [
		{ name: 'YARDAS', value: 'YD' },
		{ name: 'METROS', value: 'MT' },
		{ name: 'PIEZAS', value: 'PC' },
		{ name: 'PIES', value: 'FT' }
	];

	async function getClients() {
		clients = (await api.get('/inventoryvarious/clients')).data;
	}

	async function handleSubmit() {
		if (selectedMaterial.id) {
			await api.put('materials', {
				...formData,
				id: parseInt(formData.id),
				clientId: parseInt(formData.clientId),
				minAmount: formData.minAmount?.toString()
			});
			showSuccess('Material actualizado');
		} else {
			await api.post('materials', {
				...formData,
				id: parseInt(formData.id),
				clientId: parseInt(formData.clientId),
				minAmount: formData.minAmount?.toString()
			});
			showSuccess('Material registrado');
		}
		await reload();
		show = false;
	}

	onMount(() => {
		getClients();
	});
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedMaterial.id ? `Editar ${selectedMaterial.code}` : 'Registrar Material'}
			</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="grid w-full grid-cols-2 gap-4">
					<Label name="Codigo">
						<Input name="text" bind:value={formData.code} />
					</Label>
					<Label name="Cliente">
						<Select items={clients} bind:value={formData.clientId} />
					</Label>
					<Label name="Descripcion" class="col-span-2">
						<Input name="text" bind:value={formData.description} />
					</Label>
					<Label name="Medida">
						<Select items={measurements} bind:value={formData.measurement} />
					</Label>
					<Label name="Cantidad minima">
						<Input name="" type="number" bind:value={formData.minAmount} />
					</Label>
				</div>

				<Button type="submit" class="mt-4 w-full">Guardar cambios</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
