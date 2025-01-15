<script lang="ts">
	import MaterialInput from '$lib/components/basic/MaterialInput.svelte';
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

	interface material {
		code: string;
		amount: string;
		measurement: string;
	}

	let materials: material[] = [];
	let formData: importMovement = {};
	let files: any;
	$: inputDisabled = !!files;
	$: if (files) processPDF();
	$: if (!show) cleanData();

	async function handleSubmit() {
		await api.post('/materialmovements/import', {
			...formData,
			materials
		});
		reload();
		show = false;
		showSuccess(`Importacion ${formData.import} Registrada`);
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
</script>

<Dialog bind:open={show}>
	<DialogContent class="max-w-2xl">
		<DialogHeader>
			<DialogTitle>Registrar importacion</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<div class="grid w-full grid-cols-2 gap-4">
				<div class="space-y-2">
					<span>Importacion</span>
					<Input disabled={inputDisabled} name="text" bind:value={formData.import} />
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
