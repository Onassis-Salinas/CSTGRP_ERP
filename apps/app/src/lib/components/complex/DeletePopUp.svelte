<script lang="ts">
	import { CircleAlert } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import { Dialog, DialogBody, DialogContent } from '../ui/dialog';

	export let show = false;
	export let deleteFunc;
	export let text;
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogBody class="space-y-4">
			<div class="text-center">
				<CircleAlert class="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-200" />
				<h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
			</div>
			<div class="text-center">
				<Button on:click={deleteFunc} variant="destructive" class="me-2">Eliminar</Button>
				<Button on:click={() => (show = false)} variant="outline">Cancelar</Button>
			</div>
		</DialogBody>
	</DialogContent>
</Dialog>
