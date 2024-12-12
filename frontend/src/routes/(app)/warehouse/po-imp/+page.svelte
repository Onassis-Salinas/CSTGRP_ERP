<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import Select from '$lib/components/basic/Select.svelte';
	import { Input } from '$lib/components/ui/input';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import api from '$lib/utils/server';
	import { onMount } from 'svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import OptionsCell from '$lib/components/basic/OptionsCell.svelte';
	import { formatDate } from '$lib/utils/functions';
	import JobPoForm from './JobPOForm.svelte';
	import ImportForm from './ImportForm.svelte';
	import JobComparisonCard from './JobComparisonCard.svelte';
	import { Ruler } from 'lucide-svelte';

	let show = false;
	let show1 = false;
	let show2 = false;

	let filters = {
		type: 'both',
		code: ''
	};

	let selectedMovement: any = {};

	let options = [
		{ value: 'both', name: 'Ambos' },
		{ value: 'imports', name: 'Importaciones' },
		{ value: 'exports', name: 'Exportaciones' }
	];

	let movements: movement[] = [];

	async function getMovements() {
		const result = (await api.get(`/materialmovements/ie`, { params: filters })).data;

		movements = result.map((e: any) => {
			return { ...e, realAmount: e.realAmount?.toString() };
		});
	}

	function editImport(i: number) {
		selectedMovement = movements[i];
		show1 = true;
	}

	function editJobPO(i: number) {
		selectedMovement = movements[i];
		show = true;
	}
	function compareJob(i: number) {
		selectedMovement = movements[i];
		show2 = true;
	}

	onMount(() => {
		getMovements();
	});
</script>

<MenuBar>
	<form class="flex gap-2" on:submit|preventDefault={getMovements} action={''}>
		<Select
			class="min-w-36"
			menu
			items={options}
			bind:value={filters.type}
			onSelectedChange={getMovements}
		/>
		<Input menu bind:value={filters.code} placeholder="Identificador" />
	</form>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableHead class="border-r-0"></TableHead>
		<TableHead class="w-[10%]">Importacion</TableHead>
		<TableHead class="w-[10%]">Job-PO</TableHead>
		<TableHead class="w-[10%]">Ubicacion</TableHead>
		<TableHead class="w-[10%]">Programacion</TableHead>
		<TableHead class="w-full">Fecha</TableHead>
	</TableHeader>
	<TableBody>
		{#each movements as movement, i}
			<TableRow>
				<OptionsCell
					editFunc={movement.import ? () => editImport(i) : () => editJobPO(i)}
					extraButtons={movement.jobpo
						? [{ fn: () => compareJob(i), name: 'Comparar', icon: Ruler }]
						: []}
				/>
				<TableCell>{movement.import || ''}</TableCell>
				<TableCell>{movement.jobpo || ''}</TableCell>
				<TableCell>{movement.location || ''}</TableCell>
				<TableCell>{movement.programation || ''}</TableCell>
				<TableCell>{formatDate(movement.due) || ''}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<JobPoForm bind:show reload={getMovements} {selectedMovement} />
<ImportForm bind:show={show1} reload={getMovements} {selectedMovement} />
<JobComparisonCard bind:show={show2} bind:selectedJob={selectedMovement} />
