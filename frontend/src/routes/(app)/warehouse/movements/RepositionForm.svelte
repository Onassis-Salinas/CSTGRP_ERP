<script lang="ts">
	import Label from '$lib/components/basic/Label.svelte';
	import MaterialInput from '$lib/components/basic/MaterialInput.svelte';
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

	export let show: boolean;
	export let reload: any;

	let formData: any = {};

	$: if (!show) formData = {};

	async function handleSubmit() {
		await api.post('/materialmovements/reposition', formData);
		reload();
		show = false;
		showSuccess(`Salida Registrada`);
	}
</script>

<Dialog bind:open={show}>
	<DialogContent class="max-w-lg">
		<DialogHeader>
			<DialogTitle>Registrar salida</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<div class="grid w-full gap-4">
				<Label name="Job - PO">
					<Input bind:value={formData.job} />
				</Label>
				<Label name="Codigo">
					<MaterialInput normal bind:value={formData.code} />
				</Label>
				<Label name="Cantidad">
					<Input bind:value={formData.amount} />
				</Label>
			</div>

			<Button on:click={handleSubmit} variant="default" class="mt-4 w-full">Guardar cambios</Button>
		</DialogBody>
	</DialogContent>
</Dialog>
