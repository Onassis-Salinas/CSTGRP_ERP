<script lang="ts">
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Dialog,
		DialogBody,
		DialogContent,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { formatDate } from '$lib/utils/functions';
	import api from '$lib/utils/server';

	export let show: boolean;
	export let selectedMaterial: material;

	let movements: any[] = [];

	async function fetchData() {
		movements = (await api.get('/materialmovements/material/' + selectedMaterial.id)).data;
	}
	$: if (selectedMaterial.id) {
		fetchData();
	}
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedMaterial.code}
			</DialogTitle>
		</DialogHeader>
		<DialogBody>
			<div class="grid w-full grid-cols-2 gap-2"></div>

			<Table>
				<TableHeader class="sticky top-0 bg-gray-100">
					<TableHead>job</TableHead>
					<TableHead>Programacion</TableHead>
					<TableHead>Importacion</TableHead>
					<TableHead>Cantidad Job</TableHead>
					<TableHead>Cantidad real</TableHead>
					<TableHead>Fecha</TableHead>
					<TableHead>Balance</TableHead>
				</TableHeader>
				<TableBody>
					{#each movements as row}
						<TableRow>
							<TableCell class="px-4 py-4">{row.jobpo || ''}</TableCell>
							<TableCell class="px-4 py-4">{row.programation || ''}</TableCell>
							<TableCell class="px-4 py-4">{row.import || ''}</TableCell>
							<TableCell class="px-4 py-4"
								><Badge color={parseInt(row.amount) > 0 ? 'green' : 'red'}>{row.amount}</Badge
								></TableCell
							>
							<TableCell class="px-4 py-4"
								><Badge color={parseInt(row.realAmount) > 0 ? 'green' : 'red'}
									>{row.realAmount}</Badge
								></TableCell
							>
							<TableCell class="px-4 py-4">{formatDate(row.due)}</TableCell>
							<TableCell class="px-4 py-4"
								><Badge color={parseInt(row.balance) > 0 ? 'green' : 'red'}>{row.balance}</Badge
								></TableCell
							>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DialogBody>
	</DialogContent>
</Dialog>
