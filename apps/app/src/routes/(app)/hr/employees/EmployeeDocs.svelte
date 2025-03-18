<script lang="ts">
	import { run } from 'svelte/legacy';

	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { showError, showSuccess } from '$lib/utils/showToast';
	import { Check, FileDown, Trash, Upload } from 'lucide-svelte';
	import { downloadFile, openFilePreview } from '$lib/utils/functions';
	import { cn } from '$lib/utils';

	interface Props {
		employee: any;
	}

	let { employee }: Props = $props();
	let docs: any[] = $state([]);
	let newDoc = $state({
		name: '',
		file: null
	});

	let predefinedDocs = [
		'Formato de alta',
		'Alta del IDSE',
		'Solicitud elaborada',
		'Formatos de contratacion',
		'Examen medico',
		'ACTA DE NACIMIENTO',
		'CURP',
		'INE VIGENTE',
		'COMPROBANTE DE DOMICILIO',
		'COMPROBANTE DE ESTUDIOS',
		'RFC',
		'NSS',
		'PROTESTO SECUNDARIA '
	];

	async function fetchData() {
		const serverDocs: any[] = (await api.get('/employees/documents/' + employee.id)).data || [];

		docs = [];
		predefinedDocs.forEach((name) => {
			const index = serverDocs.findIndex((v) => v.name === name);
			if (index !== -1) {
				docs.push(serverDocs[index]);
				serverDocs.splice(index, 1);
			} else {
				docs.push({ name });
			}
		});

		docs = [...docs, ...serverDocs];
	}

	async function openPreview(url: string, name: string) {
		await openFilePreview(
			url,
			name + '_' + employee.name + ' ' + employee.paternalLastName + ' ' + employee.maternalLastName
		);
	}

	async function downloadDoc(url: string, name: string) {
		await downloadFile(
			url,
			name + '_' + employee.name + ' ' + employee.paternalLastName + ' ' + employee.maternalLastName
		);
	}

	async function uploadNewDocument() {
		if (!newDoc.file || !newDoc.file?.[0]) return showError(null, 'Selecciona un documento');
		const form = new FormData();
		form.append('json', JSON.stringify({ name: newDoc.name, employeeId: employee.id }));
		form.append('file', newDoc.file[0]);
		await api.post('/employees/documents', form);

		newDoc = {
			name: '',
			file: null
		};

		showSuccess('Documento subido');
		fetchData();
	}

	async function uploadDocument(file: any, name: string, id?: string) {
		if (!file) return showError(null, 'Selecciona un documento');
		const form = new FormData();
		form.append('file', file);

		if (id) {
			form.append('json', JSON.stringify({ name: name, id: id.toString() }));
			await api.put('/employees/documents', form);
		} else {
			form.append('json', JSON.stringify({ name: name, employeeId: employee.id }));
			await api.post('/employees/documents', form);
		}

		newDoc = {
			name: '',
			file: null
		};

		showSuccess('Documento subido');
		fetchData();
	}

	async function deleteDocument(id: string) {
		await api.delete('/employees/documents/' + id);
		showSuccess('Documento eliminado');
		fetchData();
	}

	run(() => {
		if (employee.id) fetchData();
	});
</script>

<Table>
	<TableHeader class="sticky top-0 border-t">
		<TableHead class="w-full border-l">Nombre</TableHead>
		<TableHead colspan={3}></TableHead>
	</TableHeader>
	<TableBody>
		{#each docs as row}
			<TableRow>
				<TableCell
					class={cn('border-l', !row.url && 'text-muted-foreground')}
					on:click={() => openPreview(row.url, row.name)}>{row.name}</TableCell
				>

				<TableCell class="p-0">
					<label
						class="flex aspect-square h-full w-auto cursor-pointer items-center justify-center"
					>
						<Upload class="size-4" />
						<input
							type="file"
							onchange={(e) => uploadDocument(e?.target?.files?.[0], row.name, row.id)}
							class="hidden"
						/>
					</label>
				</TableCell>
				<TableCell class="p-0">
					{#if row.url}
						<Button
							on:click={() => downloadDoc(row.url, row.name)}
							class="aspect-square h-full rounded-none"
							variant="ghost"
						>
							<FileDown class="size-4" />
						</Button>
					{/if}
				</TableCell>
				<TableCell class="p-0">
					{#if row.url}
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button class="aspect-square h-full rounded-none" variant="ghost"
									><Trash class="size-4" /></Button
								>
								<DropdownMenuContent>
									<DropdownMenuItem on:click={() => deleteDocument(row.id)}
										>Eliminar</DropdownMenuItem
									>
								</DropdownMenuContent>
							</DropdownMenuTrigger>
						</DropdownMenu>
					{/if}</TableCell
				>
			</TableRow>
		{/each}
		<TableRow>
			<TableCell class="border-l px-[1px]"
				><Input class="rounded-none border-none" bind:value={newDoc.name} /></TableCell
			>

			<TableCell class="p-0">
				<label class="flex aspect-square h-full w-auto cursor-pointer items-center justify-center">
					<Upload class={cn('size-4', newDoc?.file?.[0] && 'text-green-foreground')} />
					<input bind:files={newDoc.file} type="file" class="hidden" />
				</label>
			</TableCell>
			<TableCell colspan={2} class="p-0"
				><Button on:click={uploadNewDocument} class="h-full w-full rounded-none" variant="ghost"
					><Check class="size-4" /></Button
				></TableCell
			>
		</TableRow>
	</TableBody>
</Table>
