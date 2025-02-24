<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { Check, FileDown, Upload } from 'lucide-svelte';

	export let employee: any;
</script>

<Table>
	<TableHeader class="sticky top-0 border-t">
		<TableHead class="w-full border-l">Nombre</TableHead>
		<TableHead>Fecha</TableHead>
		<TableHead class="w-1"></TableHead>
		<TableHead class="w-1"></TableHead>
	</TableHeader>
	<TableBody>
		{#each [{}, {}, {}, {}] as row}
			<TableRow>
				<TableCell class="border-l">{row.name}</TableCell>
				<TableCell>{row.created_at}</TableCell>

				<TableCell class="p-0"
					><Button class="aspect-square h-full rounded-none" variant="ghost"
						><Upload class="size-4" /></Button
					></TableCell
				>
				<TableCell class="p-0"
					><Button class="aspect-square h-full rounded-none" variant="ghost"
						><FileDown class="size-4" /></Button
					></TableCell
				>
			</TableRow>
		{/each}
		<TableRow>
			<TableCell class="border-l" colspan={2}></TableCell>

			<TableCell class="p-0"
				><Button class="aspect-square h-full rounded-none" variant="ghost"
					><Check class="size-4" /></Button
				></TableCell
			>
		</TableRow>
	</TableBody>
</Table>
