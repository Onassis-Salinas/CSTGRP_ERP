<script lang="ts">
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
	import { showSuccess } from '$lib/utils/showToast';
	import { Check } from 'lucide-svelte';
	import { format } from 'date-fns';
	import { es } from 'date-fns/locale';
	export let employee: any;
	let docs: any[] = [];

	let newDoc = {
		text: '',
		date: new Date(),
		type: ''
	};

	async function fetchData() {
		const serverDocs: any[] = (await api.get('/employees/history/' + employee.id)).data || [];
		docs = serverDocs;
	}

	async function uploadNewDocument() {
		await api.post('/employees/history', { ...newDoc, employeeId: employee.id });

		newDoc = {
			text: '',
			date: new Date(),
			type: ''
		};

		showSuccess('Documento subido');
		fetchData();
	}

	async function uploadRecord() {
		await api.post('/employees/history', newDoc);

		newDoc = {
			text: '',
			date: new Date(),
			type: ''
		};

		showSuccess('Registro subido');
		fetchData();
	}

	$: if (employee.id) fetchData();
</script>

<Table>
	<TableHeader class="sticky top-0 border-t">
		<TableHead class="border-l">Fecha</TableHead>
		<TableHead>Tipo</TableHead>
		<TableHead class="w-full border-r">Texto</TableHead>
	</TableHeader>
	<TableBody>
		{#each docs as row}
			<TableRow class="border-l">
				<TableCell>{format(new Date(row.date), 'dd/MM/yyyy', { locale: es })}</TableCell>
				<TableCell>{row.type}</TableCell>
				<TableCell class="w-full whitespace-normal">{row.text}</TableCell>
			</TableRow>
		{/each}
		<TableRow>
			<TableCell class="border-l px-[1px]"
				><Input type="date" class="rounded-none border-none" bind:value={newDoc.date} /></TableCell
			>
			<TableCell class="border-l px-[1px]"
				><Input class="rounded-none border-none" bind:value={newDoc.type} /></TableCell
			>
			<TableCell class="border-l px-[1px]"
				><Input class="rounded-none border-none" bind:value={newDoc.text} /></TableCell
			>

			<TableCell colspan={2} class="p-0"
				><Button on:click={uploadNewDocument} class="h-full w-full rounded-none" variant="ghost"
					><Check class="size-4" /></Button
				></TableCell
			>
		</TableRow>
	</TableBody>
</Table>
