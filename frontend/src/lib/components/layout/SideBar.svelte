<script lang="ts">
	import Cookies from 'js-cookie';
	import { location } from '../../utils/location';
	import AccordionItem from '../ui/accordion/accordion-item.svelte';
	import { Accordion } from '../ui/accordion';
	import AccordionTrigger from '../ui/accordion/accordion-trigger.svelte';
	import AccordionContent from '../ui/accordion/accordion-content.svelte';
	import { Card } from '../ui/card';
	import Package from 'lucide-svelte/icons/package';
	import {
		Dot,
		File,
		GitMerge,
		LogOut,
		CircleAlert,
		Monitor,
		SquareUser,
		UserCircle,
		Users
	} from 'lucide-svelte';
	import { Dialog, DialogBody, DialogContent } from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	let activeUrl = '';
	let showModal = false;

	$: {
		activeUrl = $location;
	}

	const username = Cookies.get('username');

	const hasAccess = (name: string) => {
		return parseInt(Cookies.get('perm_' + name) || '0') > 0;
	};
</script>

<span class="absolute max-w-16"></span>
<Card class="fixed bottom-0 top-0 flex w-64 flex-col rounded-none p-4">
	<a href="/" class="mb-3 block w-full border-b p-2 pt-0 text-xl font-semibold">CST</a>

	<Accordion class="space-y-1">
		{#if hasAccess('inventory') || hasAccess('materials')}
			<AccordionItem value="1" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 hover:no-underline">
					<span class="flex items-center gap-3">
						<Package class="size-5" />
						Almacen
					</span>
				</AccordionTrigger>
				<AccordionContent>
					<a
						href="/warehouse/dashboard"
						class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
						><Dot />Resumenes</a
					>
					{#if hasAccess('materials')}
						<a
							href="/warehouse/materials"
							class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
							><Dot />Materiales</a
						>
					{/if}
					{#if hasAccess('inventory')}
						<a
							href="/warehouse/inventory"
							class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
							><Dot />Inventario</a
						>
						<a
							href="/warehouse/movements"
							class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
							><Dot />Movimientos</a
						>
					{/if}
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if hasAccess('employees') || hasAccess('assistance') || hasAccess('productivity')}
			<AccordionItem value="2" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 hover:no-underline">
					<span class="flex items-center gap-3">
						<Users class="size-5" />
						RRHH
					</span>
				</AccordionTrigger>
				<AccordionContent>
					{#if hasAccess('employees')}
						<a
							href="/hr/dashboard"
							class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
							><Dot />Dashboard</a
						>
					{/if}
					{#if hasAccess('employees')}
						<a
							href="/hr/employees"
							class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
							><Dot />Empleados</a
						>
					{/if}
					{#if hasAccess('productivity')}
						<a
							href="/hr/productivity"
							class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
							><Dot />Productividad</a
						>
					{/if}
					{#if hasAccess('assistance')}
						<a
							href="/hr/assistance"
							class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
							><Dot />Asistencia</a
						>
					{/if}
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if hasAccess('it')}
			<AccordionItem value="3" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 hover:no-underline">
					<span class="flex items-center gap-3">
						<Monitor class="size-5" />
						Sistemas
					</span>
				</AccordionTrigger>

				<AccordionContent>
					<a
						href="/it/devices"
						class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
						><Dot />Dispositivos</a
					>
					<a
						href="/it/emails"
						class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
						><Dot />Correos</a
					>
					<a
						href="/it/computers"
						class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
						><Dot />Computadoras</a
					>
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if hasAccess('structure')}
			<div>
				<a class="hover:bg-muted block rounded-md p-2" href="/structure">
					<span class="flex items-center gap-3">
						<GitMerge class="size-5" />
						Estructura
					</span>
				</a>
			</div>
		{/if}
		{#if hasAccess('users')}
			<div>
				<a class="hover:bg-muted block rounded-md p-2" href="/admin/users">
					<span class="flex items-center gap-3">
						<SquareUser class="size-5" />
						Usuarios
					</span>
				</a>
			</div>
		{/if}

		<AccordionItem value="4" class="border-none">
			<AccordionTrigger class="hover:bg-muted rounded-md p-2 hover:no-underline">
				<span class="flex items-center gap-3">
					<File class="size-5" />
					Recursos
				</span>
			</AccordionTrigger>

			<AccordionContent>
				<a
					href="/resources/directory"
					class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
					><Dot />Directorio</a
				>
				<a
					href="/resources/formats"
					class="hover:bg-muted flex items-center gap-2 rounded-md p-2 text-[16px]"
					><Dot />Formatos</a
				>
			</AccordionContent>
		</AccordionItem>
	</Accordion>

	<div class="mt-auto space-y-2">
		<p class="hover:bg-muted block rounded-md p-2">
			<span class="flex items-center gap-3">
				<UserCircle class="size-5" />
				{username}
			</span>
		</p>
		<button class="hover:bg-muted block w-full rounded-md p-2" on:click={() => (showModal = true)}>
			<span class="flex items-center gap-3">
				<LogOut class="size-5" />
				Salir
			</span>
		</button>
	</div>
</Card>

<Dialog bind:open={showModal}>
	<DialogContent>
		<DialogBody class="space-y-4">
			<div class="text-center">
				<CircleAlert class="mx-auto mb-2 mb-4 h-16 w-16 text-gray-400 dark:text-gray-200" />
				<h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">Deseas cerrar sesion?</h3>
			</div>
			<div class="text-center">
				<Button
					variant="destructive"
					class="me-2"
					on:click={() => {
						showModal = false;
						goto('/login');
					}}>Salir</Button
				>

				<Button on:click={() => (showModal = false)} variant="outline">Cancelar</Button>
			</div>
		</DialogBody>
	</DialogContent>
</Dialog>
