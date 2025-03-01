<script lang="ts">
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import Table from '$lib/components/ui/table/table.svelte';
	import api from '$lib/utils/server';

	let folders: any[] = [];
	let files: any[] = [];
	let folderSelected = '';
	const fetchAreas = async () => {
		folders = (await api.get('/resources/formatsfolders')).data;
	};
	fetchAreas();

	const fetchFiles = async (name: string) => {
		folderSelected = name;
		files = (await api.get('/resources/formatslist/' + name)).data;
		files = files.filter((e: any) => e.name.includes('.pdf'));
		files = files.map((e: any) => {
			return {
				...e,
				originalName: e.name,
				name: e.name.slice(0, -4).split('.')[1].slice(2),
				code: e.name.split(' ')[0]
			};
		});
	};
</script>

<div class="grid grid-cols-2 gap-4" style="grid-template-columns: 1fr 3fr;">
	<Table>
		<TableHeader class="sticky top-0 z-20 w-full bg-gray-100 text-xs uppercase text-gray-700">
			<TableHead>Area</TableHead>
		</TableHeader>
		<TableBody>
			{#each folders as folder}
				<TableRow class="cursor-pointer" on:click={() => fetchFiles(folder.name)}>
					<TableCell class="px-4 py-1">{folder.name}</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>

	<Table>
		<TableHead class="sticky top-0 z-20 w-full bg-gray-100 text-xs uppercase text-gray-700">
			<TableHead></TableHead>
			<TableHead>Codigo</TableHead>
			<TableHead>Nombre</TableHead>
		</TableHead>
		<TableBody>
			{#each files as file, i}
				<TableRow>
					<TableCell class="px-4 py-1">{i + 1}</TableCell>
					<TableCell class="whitespace-nowrap break-all px-4 py-1">{file.code}</TableCell>

					<TableCell class="w-full px-4 py-1"
						><a
							target="_blank"
							href={`http://192.168.0.38/Servidor_Ingenieria/INGENIERIA%20Y%20CALIDAD/SGC%20ISO%209001-2015/4.%20FORMATOS%20(F)/${folderSelected}/${file.originalName}`}
							>{file.name}</a
						></TableCell
					>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>
