<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import { showError } from '$lib/utils/showToast';
	import { onDestroy, onMount } from 'svelte';
	import '../../../app.css';
	import { browser } from '$app/environment';

	function handleUnhandledRejection(e: PromiseRejectionEvent) {
		console.log(e);
		if (e.reason.name === 'AxiosError') showError(e.reason);
	}

	onMount(() => {
		window.addEventListener('unhandledrejection', handleUnhandledRejection);
	});

	onDestroy(() => {
		if (browser) window.removeEventListener('unhandledrejection', handleUnhandledRejection);
	});
</script>

<div class="app">
	<main class="">
		<slot>  </slot>
	</main>
</div>

<Toaster />
