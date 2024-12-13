<script lang="ts">
	import { Image } from 'lucide-svelte';
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
	import { formatDate, getImage } from '$lib/utils/functions';
	import api from '$lib/utils/server';

	export let show: boolean;
	export let selectedMaterial: any;

	let movements: any[] = [];

	async function fetchData() {
		movements = (await api.get('/materialmovements/material/comparison/' + selectedMaterial.id))
			.data;
	}
	$: if (selectedMaterial.id) {
		fetchData();
	}
</script>

<Dialog bind:open={show}>
	<DialogContent class="grid h-[90%] max-w-6xl grid-rows-[auto_1fr] gap-4">
		<DialogHeader>
			<DialogTitle>
				{selectedMaterial.code}
			</DialogTitle>
		</DialogHeader>
		<DialogBody class="h-full max-w-full">
			<Table>
				<TableHeader class="sticky top-0 border-t">
					<TableHead class="border-l">job</TableHead>
					<TableHead>Programacion</TableHead>
					<TableHead>Cantidad Job</TableHead>
					<TableHead>Cantidad real</TableHead>
					<TableHead>Fecha</TableHead>
				</TableHeader>
				<TableBody>
					{#each movements as row}
						<TableRow>
							<TableCell class="border-l">{row.jobpo}</TableCell>
							<TableCell>{row.programation}</TableCell>
							<TableCell><Badge color={'gray'}>{row.amount}</Badge></TableCell>
							<TableCell
								><Badge
									color={row.realAmount === row.amount
										? 'gray'
										: parseFloat(row.realAmount) > parseFloat(row.amount)
											? 'green'
											: 'red'}>{row.realAmount}</Badge
								></TableCell
							>
							<TableCell>{formatDate(row.due)}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
		</DialogBody>
	</DialogContent>
</Dialog>
