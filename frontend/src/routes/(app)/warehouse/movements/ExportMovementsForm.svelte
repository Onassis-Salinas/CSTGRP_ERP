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
	import { Input } from '$lib/components/ui/input';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import MaterialInput from '$lib/components/basic/MaterialInput.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash } from 'lucide-svelte';

	export let show: boolean;
	export let reload: any;
	interface material {
		code: string;
		amount: string;
		measurement: string;
		active: boolean;
	}

	let materials: material[] = [];
	let formData: exportMovement = {};
	let files: any;
	$: inputDisabled = !!files;
	$: if (files) processPDF();
	$: if (!show) cleanData();

	async function handleSubmit() {
		await api.post('/materialmovements/export', {
			...formData,
			materials
		});
		reload();
		show = false;
		showSuccess(`Salida Registrada`);
	}

	async function processPDF() {
		const form = new FormData();
		form.append('file', files[0]);

		let result;
		const fileName = form.get('file').name;
		if (fileName?.includes('.pdf')) {
			result = (await api.post('/inventoryvarious/jobpdf', form)).data;
			formData.jobpo = result.jobpo;
			formData.due = result.dueDate;
			materials = result.materials;
		}
		if (fileName?.includes('.xlsx')) {
			result = (await api.post('/inventoryvarious/exportxlsx', form)).data;
			materials = result.materials;
			console.log(materials);
		}
		if (!result) throw new Error('Archivo invalido');
	}

	function addMaterial() {
		materials.push({ code: '', measurement: '', amount: '', active: false });
		materials = materials;
	}
	function deleteMaterial(i: number) {
		materials.splice(i, 1);
		materials = materials;
	}
	function cleanData() {
		materials = [];
		formData = {};
		files = null;
		inputDisabled = false;
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Registrar salida</DialogTitle>
		</DialogHeader>
		<DialogBody>
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
				<div class="space-y-2">
					<span>Archivo</span>
					<!-- <Input type="file" bind:files /> -->
				</div>
			</div>

			<hr />

			<Table>
				<TableHead
					
				>
					<TableHead class="">Codigo</TableHead>
					<TableHead class="">Cantidad</TableHead>
					<TableHead class="">Medida</TableHead>
					<TableHead class="w-1">Surtido</TableHead>
					<TableHead class="w-1 p-0"></TableHead>
				</TableHead>

				<TableBody>
					{#each materials as material, i}
						<TableRow>
							<TableCell
								><MaterialInput
									bind:value={materials[i].code}
									bind:measurement={materials[i].measurement}
								/></TableCell
							>
							<TableCell><Input type="number" bind:value={materials[i].amount} /></TableCell>
							<TableCell class="w-6"
								><Input
									class="!opacity-100"
									disabled
									bind:value={materials[i].measurement}
								/></TableCell
							>
							<TableCell class="w-1 text-center"
								><Checkbox class="mx-auto size-5" bind:checked={materials[i].active} /></TableCell
							>
							<TableCell class="flex h-9 justify-center"
								><Button on:click={() => deleteMaterial(i)} color="red" class="aspect-square p-1"
									><Trash /></Button
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
