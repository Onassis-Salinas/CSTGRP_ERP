<script>
	import { Toaster } from '$lib/components/ui/sonner';
	import { showError } from '$lib/utils/showToast';
	import { onMount } from 'svelte';
	import '../../../app.css';

	onMount(() => {
		window.addEventListener('unhandledrejection', (e) => {
			if (e.reason.name === 'AxiosError') showError(e.reason);
		});
	});
</script>

<div class="app">
	<main class="">
		<slot></slot>
	</main>
</div>

<Toaster />
