<script lang="ts">
	import MaterialInput from '$lib/components/basic/MaterialInput.svelte';
	import Select from '$lib/components/basic/Select.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogBody,
		DialogContent,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { FileInput, Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { Trash } from 'lucide-svelte';

	export let show: boolean;
	export let reload: any;
	export let selectedMovement: any = {};
	interface material {
		code: string;
		amount: string;
		measurement: string;
	}

	let materials: material[] = [];
	let formData: any = {};
	let files: any;
	$: inputDisabled = !!files;
	$: if (files) processPDF();
	$: if (!show || show) cleanData();
	$: if (selectedMovement.id) getData();

	async function handleSubmit() {
		if (selectedMovement.id) {
			await api.put('/materialmovements/import', {
				...formData,
				materials
			});
		} else {
			await api.post('/materialmovements/import', {
				...formData,
				materials
			});
		}

		reload();

		show = false;
		showSuccess(selectedMovement.id ? 'Importacion actualizada' : `Importacion Registrada`);
	}

	async function processPDF() {
		const form = new FormData();
		form.append('file', files[0]);

		const result = (await api.post('/inventoryvarious/importpdf', form)).data;
		formData.import = result.importNum;
		formData.due = result.dueDate;
		materials = result.materials;
	}

	function addMaterial() {
		materials.push({ code: '', measurement: '', amount: '' });
		materials = materials;
	}
	function deleteMaterial(i: number) {
		materials.splice(i, 1);
		materials = materials;
	}

	function cleanData() {
		materials = [{ code: '', measurement: '', amount: '' }];
		formData = {};
		files = null;
		inputDisabled = false;
	}

	async function getData() {
		cleanData();
		const { data } = await api.get('/materialmovements/ie/' + selectedMovement.id);
		materials = data.materials;
		formData = { id: data.id, import: data.import, location: data.location, due: data.due };
		files = null;
		inputDisabled = false;
	}

	let options = [
		{ value: 'At M&M, In transit', name: 'En transito' },
		{ value: 'At CST, In revision', name: 'En revisión' },
		{ value: 'At CST, Qtys verified', name: 'Listo' }
	];
</script>

<Dialog bind:open={show}>
	<DialogContent class="max-w-2xl">
		<DialogHeader>
			<DialogTitle
				>{selectedMovement.id ? 'Actualizar importacion' : 'Registrar importacion'}</DialogTitle
			>
		</DialogHeader>
		<DialogBody>
			<div class="grid w-full grid-cols-3 gap-4">
				<div class="space-y-2">
					<span>Importacion</span>
					<Input disabled={inputDisabled} name="text" bind:value={formData.import} />
				</div>
				<div class="space-y-2">
					<span>Ubicacion</span>
					<Select items={options} bind:value={formData.location} />
				</div>
				<div class="space-y-2">
					<span>Fecha</span>
					<Input type="date" bind:value={formData.due} />
				</div>
				<div class=" col-span-3 space-y-2">
					<span>Archivo</span>
					<FileInput type="file" bind:files />
				</div>
			</div>

			<hr class="my-4" />

			<Table>
				<TableHeader>
					<TableHead>Codigo</TableHead>
					<TableHead>Cantidad</TableHead>
					<TableHead>Medida</TableHead>
					<TableHead class="w-1 p-0"></TableHead>
				</TableHeader>

				<TableBody>
					{#each materials as material, i}
						<TableRow>
							<TableCell class="p-0"
								><MaterialInput
									bind:value={materials[i].code}
									bind:measurement={materials[i].measurement}
								/></TableCell
							>
							<TableCell class="p-0"
								><Input
									class="rounded-none border-none"
									type="number"
									bind:value={materials[i].amount}
								/></TableCell
							>
							<TableCell class="w-5">{materials[i].measurement}</TableCell>
							<TableCell class="flex h-9 justify-center p-0"
								><Button
									on:click={() => deleteMaterial(i)}
									variant="ghost"
									class="text-destructive-foreground aspect-square p-1"
									><Trash class="size-5" /></Button
								></TableCell
							>
						</TableRow>
					{/each}
					<TableRow>
						<TableCell class="col-span-4"
							><Button on:click={addMaterial} class="w-full" color="light">Anadir material</Button
							></TableCell
						>
					</TableRow>
				</TableBody>
			</Table>

			<Button on:click={handleSubmit} type="submit" class="mt-4 w-full">Guardar cambios</Button>
		</DialogBody>
	</DialogContent>
</Dialog>
