<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardHeader, CardContent, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { onMount } from 'svelte';

	let credentials = {
		username: '',
		password: ''
	};

	async function logout() {
		await api.get('/users/logout');
	}

	async function login() {
		await api.post('/users/login', credentials);
		goto('/');
		showSuccess('Sesión iniciada');
	}
	onMount(() => {
		logout();
	});
</script>

<section class="flex min-h-screen w-full flex-col items-center justify-center">
	<Card class="mx-auto w-[95%] max-w-md">
		<CardHeader>
			<CardTitle>Ingresar</CardTitle>
		</CardHeader>
		<CardContent>
			<form on:submit|preventDefault={login}>
				<div class="mb-6 grid gap-6">
					<div class="mb-6">
						<p class="mb-2">Nombre de usuario</p>
						<Input
							bind:value={credentials.username}
							type="text"
							id="username"
							placeholder="usuario"
						/>
					</div>
					<div class="mb-6">
						<p class="mb-2">Contraseña</p>
						<Input
							bind:value={credentials.password}
							type="password"
							id="password"
							placeholder="•••••••••"
						/>
					</div>

					<Button type="submit">Acceder</Button>
				</div>
			</form>
		</CardContent>
	</Card>
</section>
