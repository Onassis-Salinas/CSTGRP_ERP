<script>
	import Header from '$lib/components/layout/Header.svelte';
	import SideBar from '$lib/components/layout/sidebar/SideBar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import { showError } from '$lib/utils/showToast';
	import { onMount } from 'svelte';
	import '../../app.css';

	onMount(() => {
		window.addEventListener('unhandledrejection', (e) => {
			if (e.reason.name === 'AxiosError') showError(e.reason);
		});
	});
</script>

<div class="app flex">
	<SideBar></SideBar>
	<main class="flex min-h-lvh flex-col bg-[#f9f9fa] px-8">
		<Header></Header>
		<slot></slot>
	</main>
</div>

<Toaster />

<style>
	main {
		width: calc(100% - 256px);
		margin-left: 256px;
	}
</style>
