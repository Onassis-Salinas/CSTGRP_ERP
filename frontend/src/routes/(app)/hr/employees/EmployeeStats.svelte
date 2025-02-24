<script lang="ts">
	import { Table, TableCell, TableHead, TableRow } from '$lib/components/ui/table';
	import { formatDate } from '$lib/utils/functions';
	import api from '$lib/utils/server';

	export let employee: any;

	let assistance: any[] = [];
	let productivity: any[] = [];

	const fetchData = async () => {
		assistance = (await api.get(`/employees/assistance/${employee.id}`)).data;
		const productivityInfo = (await api.get(`/employees/productivity/${employee.id}`)).data;

		productivity = [];
		productivityInfo.forEach((e: any) => {
			const codes = [
				e['0goal2'] ? 3 : e['0goal1'] ? 2 : e['0goal0'] ? 1 : 1,
				e['1goal2'] ? 3 : e['1goal1'] ? 2 : e['1goal0'] ? 1 : 1,
				e['2goal2'] ? 3 : e['2goal1'] ? 2 : e['2goal0'] ? 1 : 1,
				e['3goal2'] ? 3 : e['3goal1'] ? 2 : e['3goal0'] ? 1 : 1,
				e['4goal2'] ? 3 : e['4goal1'] ? 2 : e['4goal0'] ? 1 : 1
			];
			const averages = {
				0: Math.round(
					(((parseInt(e['0produced0']) || 0) / (parseInt(e['0goal0']) || 1) +
						(parseInt(e['0produced1']) || 0) / (parseInt(e['0goal1']) || 1) +
						(parseInt(e['0produced2']) || 0) / (parseInt(e['0goal2']) || 1)) /
						codes[0]) *
						100
				),
				1: Math.round(
					(((parseInt(e['1produced0']) || 0) / (parseInt(e['1goal0']) || 1) +
						(parseInt(e['1produced1']) || 0) / (parseInt(e['1goal1']) || 1) +
						(parseInt(e['1produced2']) || 0) / (parseInt(e['1goal2']) || 1)) /
						codes[1]) *
						100
				),
				2: Math.round(
					(((parseInt(e['2produced0']) || 0) / (parseInt(e['2goal0']) || 1) +
						(parseInt(e['2produced1']) || 0) / (parseInt(e['2goal1']) || 1) +
						(parseInt(e['2produced2']) || 0) / (parseInt(e['2goal2']) || 1)) /
						codes[2]) *
						100
				),
				3: Math.round(
					(((parseInt(e['3produced0']) || 0) / (parseInt(e['3goal0']) || 1) +
						(parseInt(e['3produced1']) || 0) / (parseInt(e['3goal1']) || 1) +
						(parseInt(e['3produced2']) || 0) / (parseInt(e['3goal2']) || 1)) /
						codes[3]) *
						100
				),
				4: Math.round(
					(((parseInt(e['4produced0']) || 0) / (parseInt(e['4goal0']) || 1) +
						(parseInt(e['4produced1']) || 0) / (parseInt(e['4goal1']) || 1) +
						(parseInt(e['4produced2']) || 0) / (parseInt(e['4goal2']) || 1)) /
						codes[4]) *
						100
				)
			};

			productivity.push({
				name: formatDate(e.mondayDate),
				value: (averages[0] + averages[1] + averages[2] + averages[3] + averages[4]) / 5
			});
		});
	};

	fetchData();
</script>

<div class="border-primary-500 my-2 w-full border-b">Asistencia</div>
<Table>
	<TableHead>
		<TableCell></TableCell>
		<TableCell>Lunes</TableCell>
		<TableCell>Martes</TableCell>
		<TableCell>Miercoles</TableCell>
		<TableCell>Jueves</TableCell>
		<TableCell>Viernes</TableCell>
	</TableHead>
	{#each assistance as day}
		<TableRow>
			<TableCell>{formatDate(day.mondayDate)}</TableCell>
			<TableCell>{day.incidence0}</TableCell>
			<TableCell>{day.incidence1}</TableCell>
			<TableCell>{day.incidence2}</TableCell>
			<TableCell>{day.incidence3}</TableCell>
			<TableCell>{day.incidence4}</TableCell>
		</TableRow>
	{/each}
</Table>

<div class="border-primary-500 my-2 w-full border-b">Productividad</div>
<div class="h-36">
	<!-- <ILineChart name="" data={productivity || []} /> -->
</div>
