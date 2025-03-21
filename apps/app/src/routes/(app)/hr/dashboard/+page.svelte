<script lang="ts">
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import PieChart from '$lib/components/charts/PieChart.svelte';
	// import RadialChart from '$lib/components/charts/RadialChart.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { formatDate, getDayNumber, getImage } from '$lib/utils/functions';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { onMount } from 'svelte';
	import Select from '$lib/components/basic/Select.svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import DashboardBody from '$lib/components/basic/DashboardBody.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Download, Image } from 'lucide-svelte';

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

<DashboardBody title="Recursos Humanos" class="grid grid-cols-12 place-items-stretch gap-4 ">
	<Card class="col-span-2 max-h-96  w-full max-w-full">
		<CardHeader>
			<CardTitle>Rotacion semanal</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-2xl font-medium">{rotation.toFixed(2)}%</p>
		</CardContent>
	</Card>
	<Card class="col-span-2 max-h-96  w-full max-w-full">
		<CardHeader>
			<CardTitle>Rotacion semanal</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-2xl font-medium">{rotation.toFixed(2)}%</p>
		</CardContent>
	</Card>

	<Card class="col-span-2 max-h-96  w-full max-w-full">
		<CardHeader>
			<CardTitle>Plantilla</CardTitle>
		</CardHeader>
		<CardContent>
			<div class="mb-2 flex items-center gap-2">
				<p class="text-2xl font-medium">{activeEmployees}</p>
				<p class="text-muted-foreground">/</p>
				<Input
					onblur={updateTemplate}
					bind:value={employeeTemplate}
					class="text-muted-foreground font- border-none p-0"
				/>
			</div>
			<Progress value={(activeEmployees / employeeTemplate) * 100} />
		</CardContent>
	</Card>
	<Card class="col-span-2 max-h-96  w-full max-w-full">
		<CardHeader>
			<CardTitle>Asistencia</CardTitle>
		</CardHeader>
		<CardContent>
			<p class="text-2xl font-medium">{employeeTemplate}</p>
		</CardContent>
	</Card>

	<Card class="col-span-4 row-span-2 w-full max-w-full">
		<CardHeader>
			<CardTitle>Lista de incidencias</CardTitle>
		</CardHeader>
		<CardContent class="grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-auto">
			{#each dailyIncidencesList as row}
				<img src={getImage(row.photo)} alt="" class="size-10 rounded-full border object-cover" />
				<p class="text-sm font-medium">{row.name}</p>
				<Badge color="green" class="h-min w-min justify-self-end whitespace-nowrap text-sm"
					>{row.incidence}</Badge
				>
			{/each}
		</CardContent>
	</Card>

	<Card class="col-span-8 max-h-96  w-full max-w-full">
		<CardHeader>
			<CardTitle>Asistencia semanal</CardTitle>
		</CardHeader>
		<CardContent chart>
			{#if assistance}
				<LineChart label="Asistencia" data={assistance} color="green" minValue={0} maxValue={99}
				></LineChart>
			{/if}
		</CardContent>
	</Card>

	<Card class="col-span-3 w-full max-w-full">
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

	<Card class="col-span-3 w-full max-w-full">
		<CardHeader>
			<CardTitle>Incidencias diarias</CardTitle>
		</CardHeader>
		<CardContent>
			<div>
				{#if dailyIncidences[0]}
					<PieChart label="Incidencias" data={dailyIncidences}></PieChart>
				{/if}
			</div>
		</CardContent>
	</Card>

	<Card class="col-span-3 max-h-48 w-full max-w-full">
		<CardHeader>
			<CardTitle>Incidencias diarias por area</CardTitle>
		</CardHeader>

		<CardContent>
			<PieChart label="Incidencias" data={areaIncidences}></PieChart>
			<Select items={areas} bind:value={areaSelected} />
		</CardContent>
	</Card>

	<Card class="col-span-3 max-h-48 w-full max-w-full">
		<CardHeader>
			<CardTitle>Rotacion</CardTitle>
		</CardHeader>
		<CardContent>
			<p>
				{rotation.toFixed(2)}%
			</p>
		</CardContent>
	</Card>

	<Card class="col-span-3 w-full max-w-full">
		<CardHeader>
			<CardTitle>Cumpleaños del mes</CardTitle>
		</CardHeader>
		<CardContent class="grid grid-cols-[auto_1fr_auto] gap-4 overflow-auto">
			{#each birthDays as row}
				<img src={getImage(row.photo)} alt="" class="size-10 rounded-full border object-cover" />
				<div>
					<p class="text-sm font-medium">{row.name}</p>
					<p class="text-muted-foreground text-xs">{formatDate(row.bornDate)}</p>
				</div>
				<div class="p-0">
					<Button size="icon" variant="ghost" onclick={() => getBirthdayPhoto(row.noEmpleado)}>
						<Download class="size-3.5" />
					</Button>
				</div>
			{/each}
		</CardContent>
	</Card>
</DashboardBody>
