<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuTrigger,
		DropdownMenuItem
	} from '$lib/components/ui/dropdown-menu';
	import { Ellipsis, Pen, Trash, Eye } from 'lucide-svelte';
	import { TableCell } from '$lib/components/ui/table';

	export let viewFunc: (() => void) | undefined = undefined;
	export let deleteFunc: (() => void) | undefined = undefined;
	export let editFunc: (() => void) | undefined = undefined;
	export let extraButtons: { fn: () => void; name: string; icon: any }[] = [];
</script>

<TableCell class="sticky left-0 border-r-0 bg-background p-0">
	<DropdownMenu>
		<DropdownMenuTrigger
			class="flex aspect-square h-full w-full items-center justify-center hover:bg-muted/50"
		>
			<Ellipsis class="size-3.5" />
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			{#each extraButtons as button}
				<DropdownMenuItem on:click={button.fn}>
					<svelte:component this={button.icon} class="size-3.5" />
					{button.name}
				</DropdownMenuItem>
			{/each}

			{#if viewFunc}
				<DropdownMenuItem on:click={viewFunc}>
					<Eye class="size-3.5" /> Ver
				</DropdownMenuItem>
			{/if}
			{#if editFunc}
				<DropdownMenuItem on:click={editFunc}>
					<Pen class="size-3.5" /> Editar
				</DropdownMenuItem>
			{/if}
			{#if deleteFunc}
				<DropdownMenuItem on:click={deleteFunc}>
					<Trash class="size-3.5" /> Eliminar
				</DropdownMenuItem>
			{/if}
			<slot />
		</DropdownMenuContent>
	</DropdownMenu>
</TableCell>
