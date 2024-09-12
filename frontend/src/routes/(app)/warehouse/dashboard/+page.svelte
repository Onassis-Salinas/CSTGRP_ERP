<script lang="ts">
	import api from '$lib/utils/server';
	import { getDayNumber } from '$lib/utils/functions';
	import { Input } from '$lib/components/ui/input';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { onMount } from 'svelte';

	let warnings: any[] = [];
	let outOfStock: any[] = [];
	let selectedDate = new Date().toISOString().split('T')[0];

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
		warnings = (await api.get('/inventorystats/stockwarnings')).data;
		outOfStock = (await api.get('/inventorystats/outofstock')).data;
	}

	onMount(() => {
		fetchConstData();
	});
</script>

<div class="flex justify-between">
	<div class="mb-4 flex w-fit items-center gap-4">
		<h5 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Fecha:</h5>
		<Input class="w-fit shadow-sm" type="date" bind:value={selectedDate}></Input>
	</div>
	<Input class="h-fit w-fit font-semibold" value={textDate}></Input>
</div>

<div class="grid grid-cols-3 place-items-stretch gap-4">
	<Card class="col-span-2 h-[30rem] w-full max-w-full flex flex-col">
		<CardHeader>
			<CardTitle>En minimos</CardTitle>
		</CardHeader>
		<CardContent class="overflow-auto">
			<Table>
				<TableHeader class="sticky top-0 bg-gray-100">
					<TableHead>Codigo</TableHead>
					<TableHead>Cantidad</TableHead>
					<TableHead>Minimo</TableHead>
					<TableHead>Medida</TableHead>
				</TableHeader>
				<TableBody>
					{#each warnings as row}
						<TableRow>
							<TableCell class="whitespace-pre-wrap px-4 py-4">{row.code}</TableCell>
							<TableCell class="px-4 py-4"
								><Badge color={row.amount <= 0 ? 'red' : 'yellow'}>{row.amount}</Badge></TableCell
							>
							<TableCell class="px-4 py-4">{row.minAmount}</TableCell>
							<TableCell class="px-4 py-4">{row.measurement}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
	<Card class="col-span-2 h-[30rem] w-full max-w-full flex flex-col">
		<CardHeader>
			<CardTitle>Stocks negativos despues de completar ordenes</CardTitle>
		</CardHeader>
		<CardContent class="overflow-auto">
			<Table>
				<TableHeader class="sticky top-0 bg-gray-100">
					<TableHead>Codigo</TableHead>
					<TableHead>Cantidad</TableHead>
					<TableHead>Medida</TableHead>
				</TableHeader>
				<TableBody>
					{#each outOfStock as row}
						<TableRow>
							<TableCell class="whitespace-pre-wrap px-4 py-4">{row.code}</TableCell>
							<TableCell class="px-4 py-4"><Badge color="red">{row.amount}</Badge></TableCell>
							<TableCell class="px-4 py-4">{row.measurement}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
</div>
