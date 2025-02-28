<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Dialog, DialogBody, DialogContent } from '$lib/components/ui/dialog';
	import { MessageCircleQuestion } from 'lucide-svelte';

	export let show = false;
	export let action;
	export let text;
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogBody>
			<div class="text-center">
				<MessageCircleQuestion class="mx-auto mb-2 h-16 w-16 text-gray-400 dark:text-gray-200" />
				<h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
			</div>
			<div class="text-center">
				<Button on:click={action} class="me-2">Confirmar</Button>
				<Button on:click={() => (show = false)} color="alternative">Cancelar</Button>
			</div>
		</DialogBody>
	</DialogContent>
</Dialog>
