<script lang="ts">
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import PieChart from '$lib/components/charts/PieChart.svelte';
	// import RadialChart from '$lib/components/charts/RadialChart.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { formatDate, getDayNumber } from '$lib/utils/functions';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { Button } from '$lib/components/ui/button';
	import { Image } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import Select from '$lib/components/basic/Select.svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';

	let employeeTemplate: any;
	let activeEmployees: any;
	let dailyIncidences: any[] = [];
	let areaIncidences: any[] = [];
	let assistance: any[] = [];
	let selectedDate = new Date().toISOString().split('T')[0];
	let areaSelected = '1';
	let areas: any[] = [];
	let dailyIncidencesList: any[] = [];
	let birthDays: any[] = [];

	$: textDate =
		['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'][getDayNumber(selectedDate)] +
		' ' +
		selectedDate.split('-')[2] +
		' de ' +
		[
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		][parseInt(selectedDate.split('-')[1])];

	async function fetchConstData() {
		areas = (await api.get('/hrvarious/areas')).data;
		employeeTemplate = (await api.get('/hrstats/employeetemplate')).data[0].value;
		activeEmployees = (await api.get('/hrstats/activeemployees')).data[0].count;
		await getDailyData();
	}

	async function getDailyData() {
		assistance = (await api.get('/hrstats/assistance/' + selectedDate)).data;
		dailyIncidences = (await api.get('/hrstats/assistanceinfo/' + selectedDate)).data;
		areaIncidences = (
			await api.get(`/hrstats/areaassistanceinfo?areaId=${areaSelected}&date=${selectedDate}`)
		).data;
		dailyIncidencesList = (await api.get(`/hrstats/dailyincidenceslist/${selectedDate}`)).data;
		birthDays = (await api.get(`/hrstats/birthdays/${selectedDate}`)).data;
	}

	async function refetchAreaIncidences() {
		areaIncidences = (
			await api.get(`/hrstats/areaassistanceinfo?areaId=${areaSelected}&date=${selectedDate}`)
		).data;
	}

	async function updateTemplate() {
		await api.put('employees/template', { template: parseInt(employeeTemplate) });
		showSuccess('Plantilla actualizada');
	}

	async function getBirthdayPhoto(id: any) {
		const response = await api.get('/hrvarious/birthdayphoto', {
			responseType: 'arraybuffer',
			params: {
				noEmpleado: id
			}
		});

		const blob = new Blob([response.data], { type: 'image/jpeg' });

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.target = '_blank';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	onMount(() => {
		fetchConstData();
	});
</script>

<MenuBar>
	<Input class="w-fit shadow-sm" type="date" bind:value={selectedDate} on:change={getDailyData} />
</MenuBar>

<div class="grid grid-cols-3 place-items-stretch gap-4 p-4">
	<Card class="col-span-2 min-h-96 w-full max-w-full">
		<CardHeader>
			<CardTitle>Asistencia</CardTitle>
		</CardHeader>
		<CardContent>
			{#if assistance}
				<LineChart label="Asistencia" data={assistance} color="purple"></LineChart>
			{/if}
		</CardContent>
	</Card>

	<Card class="col-span-1 flex h-[30rem] w-full max-w-full flex-col">
		<CardHeader>
			<CardTitle>Lista de incidencias</CardTitle>
		</CardHeader>
		<CardContent class="overflow-auto">
			<Table>
				<TableHeader class="sticky top-0 bg-gray-100">
					<TableHead>Nombre</TableHead>
					<TableHead>Incidencia</TableHead>
					<!-- <TableHead>Area</TableHead> -->
				</TableHeader>
				<TableBody>
					{#each dailyIncidencesList as row}
						<TableRow>
							<TableCell>{row.name}</TableCell>
							<TableCell><Badge color="outline">{row.incidence}</Badge></TableCell>
							<!-- <TableCell class="px-4 py-4">{row.areaId}</TableCell> -->
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>

	<Card class="w-full max-w-full">
		<div class="flex flex-col justify-between">
			<CardHeader>
				<CardTitle>Empleados</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="flex h-10 items-center text-base font-normal text-gray-500 dark:text-gray-400">
					{activeEmployees} / <Input
						on:blur={updateTemplate}
						bind:value={employeeTemplate}
						class="ml-1 w-10 p-0 text-center !text-base font-normal text-gray-500 dark:text-gray-400"
					/>
				</p>
			</CardContent>
		</div>

		<div class="mt-0 h-80">
			{#if employeeTemplate && activeEmployees}
				<PieChart
					label="empleados"
					data={[
						{ value: activeEmployees, name: 'Cumplido' },
						{ value: parseInt(employeeTemplate) - activeEmployees, name: 'Faltante' }
					]}
				></PieChart>
			{/if}
		</div>
	</Card>

	<Card class="w-full max-w-full">
		<CardHeader>
			<CardTitle>Incidencias diarias</CardTitle>
		</CardHeader>
		<CardContent>
			{#if dailyIncidences[0]}
				<PieChart label="Incidencias" data={dailyIncidences}></PieChart>
			{/if}
		</CardContent>
	</Card>

	<Card class="w-full max-w-full">
		<CardHeader>
			<CardTitle>Incidencias diarias por area</CardTitle>
		</CardHeader>

		<CardContent>
			<PieChart label="Incidencias" data={areaIncidences}></PieChart>

			<Select items={areas} bind:value={areaSelected} onSelectedChange={refetchAreaIncidences} />
		</CardContent>
	</Card>

	<Card class="min-h-96 w-full max-w-full"></Card>

	<Card class="col-span-2 min-h-96 w-full max-w-full">
		<CardHeader>
			<CardTitle>Cumpleaños del mes</CardTitle>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHead class="sticky top-0 bg-gray-100">
					<TableCell></TableCell>
					<TableCell>No. Empleado</TableCell>
					<TableCell>Nombre</TableCell>
					<TableCell>Cumpleaños</TableCell>
				</TableHead>
				<TableBody>
					{#each birthDays as row}
						<TableRow>
							<TableCell>
								<Button class="sm px-3 py-1.5" on:click={() => getBirthdayPhoto(row.noEmpleado)}>
									<Image />
								</Button>
							</TableCell>

							<TableCell>{row.noEmpleado}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{formatDate(row.bornDate)}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
</div>
