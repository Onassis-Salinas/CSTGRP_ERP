<script lang="ts">
	import Select from '$lib/components/basic/Select.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';

	import Cookies from 'js-cookie';
	import { PlusCircle } from 'lucide-svelte';
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { onMount } from 'svelte';

	let assistances: assistance[] = [];
	let areas: any = {};
	let positions: any = {};
	let incidences: any = {};
	let incidencesList: any = [];
	let areasList: any = [];
	let dateSelected: any = new Date().toISOString().split('T')[0];
	let areaSelected: string = '';

	async function getAssistance() {
		assistances = (await api.get('/assistance/week/' + dateSelected)).data;
	}

	async function fetchOptions() {
		const areasArray = (await api.get('/hrvarious/areas')).data;
		areasArray.forEach((area: any) => {
			areas[area.value] = area.name;
		});
		const positionsArray = (await api.get('/hrvarious/positions')).data;
		positionsArray.forEach((position: any) => {
			positions[position.value] = position.name;
		});
		const incidencesArray = (await api.get('/hrvarious/incidences')).data;
		incidencesArray.forEach((incidence: any) => {
			incidences[incidence.value] = incidence.name;
		});
		incidencesList = incidencesArray;
		if (Cookies.get('perm_assistance_areas') === 'Todas') return (areasList = areasArray);

		const accessibleAreas = Cookies.get('perm_assistance_areas')?.split(',');
		areasList = areasArray.filter((area: any) => {
			return accessibleAreas?.includes(area.value);
		});
	}

	$: filteredAssistances = assistances.filter((e) => {
		return e.areaId === areaSelected;
	});

	async function editAssistance(i: number) {
		await api.put('assistance', {
			...filteredAssistances[i],
			id: parseInt(filteredAssistances[i].id || ''),
			incidenceId0: parseInt(filteredAssistances[i].incidenceId0 || ''),
			incidenceId1: parseInt(filteredAssistances[i].incidenceId1 || ''),
			incidenceId2: parseInt(filteredAssistances[i].incidenceId2 || ''),
			incidenceId3: parseInt(filteredAssistances[i].incidenceId3 || ''),
			incidenceId4: parseInt(filteredAssistances[i].incidenceId4 || '')
		});
	}

	async function createWeek() {
		await api.post('/assistance', {
			date: dateSelected
		});
		showSuccess('Semana generada');
		getAssistance();
	}

	onMount(() => {
		getAssistance();
		fetchOptions();
	});
</script>

<div class="mb-4 flex justify-between">
	<div class=" flex gap-2">
		<Select class="w-72" placeholder="Eligir Area" items={areasList} bind:value={areaSelected} />
		<Input type="date" bind:value={dateSelected} on:change={getAssistance} />
	</div>
	<div class="flex gap-2">
		{#if Cookies.get('perm_assistance_areas') === 'Todas'}
			<!-- <ExportAssistance date={dateSelected} /> -->
			<Button on:click={createWeek}><PlusCircle class="mr-2 size-4" />Generar semana</Button>
		{/if}
	</div>
</div>

<CusTable>
	<TableHeader
		class="sticky top-0 z-20 bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
	>
		<TableHead class="w-[1%]">No. Empleado</TableHead>
		<TableHead class="w-[20%]">Nombre</TableHead>
		<TableHead class="w-[1%]">Area</TableHead>
		<TableHead class="w-[1%]">Posicion</TableHead>
		<TableHead class="w-[10%]">Lunes</TableHead>
		<TableHead class="w-[10%]">Martes</TableHead>
		<TableHead class="w-[10%]">Miercoles</TableHead>
		<TableHead class="w-[10%]">Jueves</TableHead>
		<TableHead class="w-[10%]">Viernes</TableHead>
	</TableHeader>
	<TableBody>
		{#each filteredAssistances as assistance, i}
			<TableRow>
				<TableCell>{assistance.noEmpleado}</TableCell>
				<TableCell>{assistance.name}</TableCell>
				<TableCell
					><Badge color={assistance.areaId === '1' ? 'dark' : 'blue'}
						>{areas[assistance.areaId || '']}</Badge
					></TableCell
				>
				<TableCell
					><Badge color="purple">{positions[assistance.positionId || ''] || ''}</Badge></TableCell
				>
				<TableCell class="px-1">
					<Select
						items={incidencesList}
						bind:value={filteredAssistances[i].incidenceId0}
						onSelectedChange={() => editAssistance(i)}
					/>
				</TableCell>
				<TableCell class="px-1">
					<Select
						items={incidencesList}
						bind:value={filteredAssistances[i].incidenceId1}
						onSelectedChange={() => editAssistance(i)}
					/>
				</TableCell>
				<TableCell class="px-1">
					<Select
						items={incidencesList}
						bind:value={filteredAssistances[i].incidenceId2}
						onSelectedChange={() => editAssistance(i)}
					/>
				</TableCell>
				<TableCell class="px-1">
					<Select
						items={incidencesList}
						bind:value={filteredAssistances[i].incidenceId3}
						onSelectedChange={() => editAssistance(i)}
					/>
				</TableCell>
				<TableCell class="px-1">
					<Select
						items={incidencesList}
						bind:value={filteredAssistances[i].incidenceId4}
						onSelectedChange={() => editAssistance(i)}
					/>
				</TableCell>
			</TableRow>
		{/each}
		{#if !filteredAssistances[0]}
			<TableRow>
				<TableCell class="col-span-9 h-10"></TableCell>
				<TableCell class="col-span-9 h-10"></TableCell>
				<TableCell class="col-span-9 h-10"></TableCell>
				<TableCell class="col-span-9 h-10"></TableCell>
				<TableCell class="col-span-9 h-10"></TableCell>
				<TableCell class="col-span-9 h-10"></TableCell>
			</TableRow>
		{/if}
	</TableBody>
</CusTable>
