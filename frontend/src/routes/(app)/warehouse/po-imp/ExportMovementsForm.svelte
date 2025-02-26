<script lang="ts">
	import {
		Dialog,
		DialogBody,
		DialogContent,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { FileInput, Input } from '$lib/components/ui/input';
	import api from '$lib/utils/server';
	import { showError, showSuccess } from '$lib/utils/showToast';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import MaterialInput from '$lib/components/basic/MaterialInput.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash } from 'lucide-svelte';

	export let show: boolean;
	export let reload: any;
	export let selectedMovement: any = {};

	interface material {
		code: string;
		amount: string;
		realAmount: string;
		measurement: string;
		active: boolean;
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
			await api.put('/materialmovements/export', {
				...formData,
				materials
			});
		} else {
			await api.post('/materialmovements/export', {
				...formData,
				materials
			});
		}

		reload();
		show = false;
		showSuccess(selectedMovement.id ? 'Salida actualizada' : `Salida Registrada`);
	}

	async function processPDF() {
		const form = new FormData();
		form.append('file', files[0]);

		let result;
		const fileName = form.get('file')?.name;
		if (fileName?.includes('.pdf')) {
			result = (await api.post('/inventoryvarious/jobpdf', form)).data;
			console.log(result);
			formData.jobpo = result.jobpo;
			formData.due = result.dueDate;

			materials = result.materials;
		}
		if (fileName?.includes('.xlsx')) {
			result = (await api.post('/inventoryvarious/exportxlsx', form)).data;
			formData.jobpo = result.jobpo;
			formData.due = result.dueDate;
			materials = result.materials;
			console.log(result);
		}
		if (!result) showError(null, 'Archivo invalido');
	}

	function addMaterial() {
		materials.push({ code: '', measurement: '', amount: '', active: false, realAmount: '' });
		materials = materials;
	}
	function deleteMaterial(i: number) {
		materials.splice(i, 1);
		materials = materials;
	}
	function cleanData() {
		materials = [{ code: '', measurement: '', amount: '', active: false, realAmount: '' }];
		formData = {};
		files = null;
		inputDisabled = false;
	}

	async function getData() {
		const { data } = await api.get('/materialmovements/ie/' + selectedMovement.id);
		materials = data.materials;
		formData = { id: data.id, jobpo: data.jobpo, programation: data.programation, due: data.due };
		files = null;
		inputDisabled = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent class="max-w-3xl ">
		<DialogHeader>
			<DialogTitle>{selectedMovement.id ? 'Actualizar job-po' : 'Registrar job-po'}</DialogTitle>
		</DialogHeader>
		<DialogBody class="h-[85lvh]">
			<div class="grid w-full grid-cols-3 gap-4">
				<div class="space-y-2">
					<span>Programacion</span>
					<Input name="text" bind:value={formData.programation} />
				</div>
				<div class="space-y-2">
					<span>Job o PO</span>
					<Input disabled={inputDisabled} name="text" bind:value={formData.jobpo} />
				</div>
				<div class="space-y-2">
					<span>Fecha</span>
					<Input type="date" bind:value={formData.due} />
				</div>
				<div class="col-span-3 space-y-2">
					<span>Archivo</span>
					<FileInput type="file" bind:files />
				</div>
			</div>

			<hr class="my-4" />

			<Table>
				<TableHeader>
					<TableHead>Codigo</TableHead>
					<TableHead>Cantidad</TableHead>
					<TableHead>Real</TableHead>
					<TableHead>Medida</TableHead>
					<TableHead class="w-1">Surtido</TableHead>
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
									class="rounded-none border-none !opacity-100"
									type="number"
									bind:value={materials[i].amount}
								/></TableCell
							>
							<TableCell class="p-0"
								><Input
									class="rounded-none border-none !opacity-100"
									type="number"
									bind:value={materials[i].realAmount}
								/></TableCell
							>
							<TableCell class="w-5">{materials[i].measurement}</TableCell>
							<TableCell class="w-1 p-0 text-center"
								><Checkbox class="mx-auto size-5" bind:checked={materials[i].active} /></TableCell
							>
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
							><Button on:click={addMaterial} class="w-full">Anadir material</Button></TableCell
						>
					</TableRow>
				</TableBody>
			</Table>

			<Button on:click={handleSubmit} type="submit" class="mt-4 w-full">Guardar cambios</Button>
		</DialogBody>
	</DialogContent>
</Dialog>
