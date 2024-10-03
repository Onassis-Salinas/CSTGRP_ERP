<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import { Filter } from 'lucide-svelte';
	import { Button } from '../ui/button';
</script>

<div class="h-[52px] items-center flex justify-between border-b px-5">
	<div class="flex lg:hidden">
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="outline" class="flex items-center gap-2">
					<Filter class="size-3.5" />
					Filtrar
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent class= "flex flex-col p-2 gap-2">
				<slot />
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
	<div class="hidden w-full justify-between lg:flex">
		<slot></slot>
	</div>
</div>
