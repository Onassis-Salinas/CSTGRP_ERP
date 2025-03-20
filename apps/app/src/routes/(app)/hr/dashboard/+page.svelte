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
	import { onMount } from 'svelte';
	import Select from '$lib/components/basic/Select.svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import DashboardHeader from '$lib/components/basic/DashboardHeader.svelte';
	import DashboardBody from '$lib/components/basic/DashboardBody.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Image } from 'lucide-svelte';

	let employeeTemplate: any = $state();
	let activeEmployees: any = $state();
	let dailyIncidences: any[] = $state([]);
	let areaIncidences: any[] = $state([]);
	let assistance: any[] = $state([]);
	let selectedDate = $state(new Date().toISOString().split('T')[0]);
	let areaSelected = $state('1');
	let areas: any[] = $state([]);
	let dailyIncidencesList: any[] = $state([]);
	let birthDays: any[] = $state([]);
	let rotation: number = $state(0);

	let textDate = $derived(
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
			][parseInt(selectedDate.split('-')[1])]
	);

	async function fetchConstData() {
		areas = (await api.get('/hrvarious/areas')).data;
		employeeTemplate = (await api.get('/hrstats/employeetemplate')).data[0].value;
		activeEmployees = (await api.get('/hrstats/activeemployees')).data[0].count;
		await getDailyData();
	}

	async function getDailyData() {
		assistance = (await api.get('/hrstats/assistance/' + selectedDate)).data;
		rotation = (await api.get('/hrstats/employeerotation/' + selectedDate)).data;
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

	$effect(() => {
		if (areaSelected) refetchAreaIncidences();
	});

	onMount(() => {
		fetchConstData();
	});
</script>

<MenuBar>
	<Input menu class="w-fit" type="date" bind:value={selectedDate} onchange={getDailyData} />
</MenuBar>

<DashboardBody title="Recursos Humanos" class="grid grid-cols-3 place-items-stretch gap-4 ">
	<Card class="col-span-2 min-h-96 w-full max-w-full">
		<CardHeader>
			<CardTitle>Asistencia semanal</CardTitle>
		</CardHeader>
		<CardContent>
			{#if assistance}
				<LineChart label="Asistencia" data={assistance} color="green" minValue={0} maxValue={99}
				></LineChart>
			{/if}
		</CardContent>
	</Card>

	<Card class="col-span-1 flex h-[30rem] w-full max-w-full flex-col">
		<CardHeader>
			<CardTitle>Lista de incidencias</CardTitle>
		</CardHeader>
		<CardContent class="overflow-auto">
			<Table>
				<TableHeader class="sticky top-0">
					<TableHead>Nombre</TableHead>
					<TableHead>Incidencia</TableHead>
					<!-- <TableHead>Area</TableHead> -->
				</TableHeader>
				<TableBody>
					{#each dailyIncidencesList as row}
						<TableRow>
							<TableCell>{row.name}</TableCell>
							<TableCell><Badge color="green">{row.incidence}</Badge></TableCell>
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
						onblur={updateTemplate}
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

			<Select items={areas} bind:value={areaSelected} />
		</CardContent>
	</Card>

	<Card class="min-h-48 w-full max-w-full">
		<CardHeader>
			<CardTitle>Rotacion</CardTitle>
		</CardHeader>
		<CardContent>
			<p>
				{rotation.toFixed(2)}%
			</p>
		</CardContent>
	</Card>

	<Card class="col-span-2 w-full max-w-full">
		<CardHeader>
			<CardTitle>Cumpleaños del mes</CardTitle>
		</CardHeader>
		<CardContent class="px-0 pb-0" card>
			<Table>
				<TableHeader class="sticky top-0 border-t">
					<TableHead class="w-0 p-0"></TableHead>
					<TableHead>No. Empleado</TableHead>
					<TableHead>Nombre</TableHead>
					<TableHead class="border-r-0">Cumpleaños</TableHead>
				</TableHeader>
				<TableBody>
					{#each birthDays as row}
						<TableRow>
							<TableCell class="p-0">
								<Button
									size="icon"
									variant="ghost"
									onclick={() => getBirthdayPhoto(row.noEmpleado)}
								>
									<Image class="size-3.5" />
								</Button>
							</TableCell>

							<TableCell>{row.noEmpleado}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell class="border-r-0">{formatDate(row.bornDate)}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
</DashboardBody>
