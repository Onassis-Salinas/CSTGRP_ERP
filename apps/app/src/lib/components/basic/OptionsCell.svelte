<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuTrigger,
		DropdownMenuItem
	} from '$lib/components/ui/dropdown-menu';
	import { Ellipsis, Pen, Trash, Eye } from 'lucide-svelte';
	import { TableCell } from '$lib/components/ui/table';

	interface Props {
		viewFunc?: (() => void) | undefined;
		deleteFunc?: (() => void) | undefined;
		editFunc?: (() => void) | undefined;
		extraButtons?: { fn: () => void; name: string; icon: any }[];
		children?: import('svelte').Snippet;
	}

	let {
		viewFunc = undefined,
		deleteFunc = undefined,
		editFunc = undefined,
		extraButtons = [],
		children
	}: Props = $props();
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
				<DropdownMenuItem onclick={button.fn}>
					<button.icon class="size-3.5" />
					{button.name}
				</DropdownMenuItem>
			{/each}

			{#if viewFunc}
				<DropdownMenuItem onclick={viewFunc}>
					<Eye class="size-3.5" /> Ver
				</DropdownMenuItem>
			{/if}
			{#if editFunc}
				<DropdownMenuItem onclick={editFunc}>
					<Pen class="size-3.5" /> Editar
				</DropdownMenuItem>
			{/if}
			{#if deleteFunc}
				<DropdownMenuItem onclick={deleteFunc}>
					<Trash class="size-3.5" /> Eliminar
				</DropdownMenuItem>
			{/if}
			{@render children?.()}
		</DropdownMenuContent>
	</DropdownMenu>
</TableCell>
