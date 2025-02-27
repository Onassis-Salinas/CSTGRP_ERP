<script lang="ts">
	import api from '$lib/utils/server';
	import { formatDate, getDayNumber } from '$lib/utils/functions';
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
	import MenuBar from '$lib/components/basic/MenuBar.svelte';

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
		][parseInt(selectedDate.split('-')[1]) - 1];

	async function fetchConstData() {
		warnings = (await api.get('/inventorystats/stockwarnings')).data;
		outOfStock = (await api.get('/inventorystats/outofstock')).data;
	}

	onMount(() => {
		fetchConstData();
	});
</script>

<MenuBar>
	<svelte:fragment slot="left">
		<Input menu class="w-fit shadow-sm" type="date" bind:value={selectedDate}></Input>
	</svelte:fragment>
	<svelte:fragment slot="right">
		<Input menu class="w-fit font-semibold" value={textDate}></Input>
	</svelte:fragment>
</MenuBar>

<div class="grid flex-1 grid-cols-3 place-items-stretch gap-4 overflow-auto p-4">
	<Card class="col-span-3 flex h-[85lvh] w-full max-w-full flex-col border-none shadow-none">
		<CardTitle class="pb-3 pl-1">Material faltante para completar ordenes</CardTitle>
		<CardContent class="overflow-y-auto border p-0">
			<Table class="w-full">
				<TableHeader class="sticky top-0 border-t">
					<TableHead class="border-l">Codigo</TableHead>
					<TableHead>Descripcion</TableHead>
					<TableHead class="w-min">Job</TableHead>
					<TableHead>Requerido</TableHead>
					<TableHead>Inventario</TableHead>
					<TableHead>Faltante</TableHead>
					<TableHead>Medida</TableHead>
				</TableHeader>
				<TableBody>
					{#each outOfStock as row}
						<TableRow>
							<TableCell class="border-l">{row.code || ''}</TableCell>
							<TableCell class="whitespace-hidden max-w-64 overflow-hidden text-ellipsis"
								>{row.description || ''}</TableCell
							>
							<TableCell class="w-full whitespace-normal">{row.jobpo || ''}</TableCell>
							<TableCell><Badge color="gray">{row.amount || ''}</Badge></TableCell>
							<TableCell><Badge color="gray">{row.balance || ''}</Badge></TableCell>
							<TableCell><Badge color="red">{row.missing || ''}</Badge></TableCell>
							<TableCell>{row.measurement || ''}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
	<Card class="col-span-3 flex h-[30rem] w-full max-w-full flex-col border-none shadow-none">
		<CardTitle class="pb-3 pl-1">En minimos</CardTitle>
		<CardContent class="overflow-auto border p-0">
			<Table>
				<TableHeader class="sticky top-0 border-t">
					<TableHead class="border-l">Codigo</TableHead>
					<TableHead>Cantidad</TableHead>
					<TableHead>Minimo</TableHead>
					<TableHead>Medida</TableHead>
				</TableHeader>
				<TableBody>
					{#each warnings as row}
						<TableRow>
							<TableCell class="border-l">{row.code}</TableCell>
							<TableCell
								><Badge color={row.amount <= 0 ? 'red' : 'yellow'}>{row.amount || ''}</Badge
								></TableCell
							>
							<TableCell>{row.minAmount || ''}</TableCell>
							<TableCell>{row.measurement || ''}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</CardContent>
	</Card>
</div>
