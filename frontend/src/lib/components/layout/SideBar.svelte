<script lang="ts">
	import Cookies from 'js-cookie';
	import { sidebarOpen } from '../../utils/store';
	import AccordionItem from '../ui/accordion/accordion-item.svelte';
	import { Accordion, AccordionOption } from '../ui/accordion';
	import AccordionTrigger from '../ui/accordion/accordion-trigger.svelte';
	import AccordionContent from '../ui/accordion/accordion-content.svelte';
	import { Card } from '../ui/card';
	import Package from 'lucide-svelte/icons/package';
	import {
		File,
		GitMerge,
		LogOut,
		CircleAlert,
		Monitor,
		Shield,
		UserCircle,
		Users,
		ShoppingBag
	} from 'lucide-svelte';
	import { Dialog, DialogBody, DialogContent } from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';
	import { browser } from '$app/environment';
	import { hasAccess } from '$lib/utils/functions';

	let showModal = false;

	const username = Cookies.get('username');

	function closeSidebar() {
		sidebarOpen.set(false);
	}

	$: if ($sidebarOpen) {
		requestAnimationFrame(() => {
			document.querySelector('main')?.addEventListener('click', closeSidebar);
		});
	} else {
		if (browser) document.querySelector('main')?.removeEventListener('click', closeSidebar);
	}
</script>

<Card
	class={cn(
		'md: fixed -left-64 bottom-0 top-0 z-40 flex w-64 flex-col rounded-[9px] bg-[#fbfbfb] shadow-none transition-all duration-300 xl:left-0',
		$sidebarOpen ? 'left-0' : ''
	)}
>
	<a href="/" class="flex h-12 w-full items-center gap-2 border-b px-4 pt-0 font-semibold">
		<img src="/logo.png" alt="logo" class="h-6 w-6" />
		CST Group
	</a>

	<Accordion class="space-y-1 px-2 pt-2">
		{#if hasAccess('inventory') || hasAccess('materials')}
			<AccordionItem value="1" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 text-sm hover:no-underline">
					<span class="flex items-center gap-2">
						<Package class="size-4 text-[#5c5e63]" />
						Almacen
					</span>
				</AccordionTrigger>
				<AccordionContent>
					<AccordionOption href="/warehouse/dashboard">Resumenes</AccordionOption>

					<AccordionOption href="/warehouse/inventory">Inventario</AccordionOption>
					{#if hasAccess('inventory')}
						<AccordionOption href="/warehouse/po-imp">Po-Imp</AccordionOption>
						<AccordionOption href="/warehouse/movements">Movimientos</AccordionOption>
					{/if}
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if hasAccess('employees') || hasAccess('assistance') || hasAccess('productivity')}
			<AccordionItem value="2" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 text-sm hover:no-underline">
					<span class="flex items-center gap-2">
						<Users class="size-4 text-[#5c5e63]" />
						RRHH
					</span>
				</AccordionTrigger>
				<AccordionContent>
					{#if hasAccess('employees')}
						<AccordionOption href="/hr/dashboard">Dashboard</AccordionOption>
					{/if}
					{#if hasAccess('employees')}
						<AccordionOption href="/hr/employees">Empleados</AccordionOption>
					{/if}
					{#if hasAccess('productivity')}
						<AccordionOption href="/hr/productivity">Productividad</AccordionOption>
					{/if}
					{#if hasAccess('assistance')}
						<AccordionOption href="/hr/assistance">Asistencia</AccordionOption>
					{/if}
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if hasAccess('it')}
			<AccordionItem value="3" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 text-sm hover:no-underline">
					<span class="flex items-center gap-2">
						<Monitor class="size-4 text-[#5c5e63]" />
						Sistemas
					</span>
				</AccordionTrigger>

				<AccordionContent>
					<AccordionOption href="/it/devices">Dispositivos</AccordionOption>
					<AccordionOption href="/it/emails">Correos</AccordionOption>
					<AccordionOption href="/it/computers">Computadoras</AccordionOption>
					<AccordionOption href="/it/docs">Documentación</AccordionOption>
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if hasAccess('structure')}
			<AccordionItem value="7" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 text-sm hover:no-underline">
					<span class="flex items-center gap-2">
						<GitMerge class="size-4 text-[#5c5e63]" />
						Estructura
					</span>
				</AccordionTrigger>

				<AccordionContent>
					<AccordionOption href="/structure/areas">Areas</AccordionOption>
					<AccordionOption href="/structure/positions">Posiciones</AccordionOption>
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if (!hasAccess('inventory') && !hasAccess('users') && !hasAccess('structure') && !hasAccess('it') && !hasAccess('assistance') && !hasAccess('productivity') && !hasAccess('employees') && !hasAccess('materials'))}
			<AccordionItem value="9" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 text-sm hover:no-underline">
					<span class="flex items-center gap-2">
						<ShoppingBag class="size-4 text-[#5c5e63]" />
						Clientes
					</span>
				</AccordionTrigger>

				<AccordionContent>
					<AccordionOption href="/clients/inventory">Inventario</AccordionOption>
				</AccordionContent>
			</AccordionItem>
		{/if}
		{#if hasAccess('users')}
			<AccordionItem value="6" class="border-none">
				<AccordionTrigger class="hover:bg-muted rounded-md p-2 text-sm hover:no-underline">
					<span class="flex items-center gap-2">
						<Shield class="size-4 text-[#5c5e63]" />
						Admin
					</span>
				</AccordionTrigger>

				<AccordionContent>
					<AccordionOption href="/admin/users">Usuarios</AccordionOption>
				</AccordionContent>
			</AccordionItem>
		{/if}
<!-- 
		<AccordionItem value="4" class="border-none">
			<AccordionTrigger class="hover:bg-muted rounded-md p-2 text-sm hover:no-underline">
				<span class="flex items-center gap-2">
					<File class="size-4 text-[#5c5e63]" />
					Recursos
				</span>
			</AccordionTrigger>

			<AccordionContent>
				<AccordionOption href="/resources/directory">Directorio</AccordionOption>
				<AccordionOption
					href="/resources/formats"
					
					><Dot  class="text=[#5c5e63]"/>Formatos</
				>
			</AccordionContent>
		</AccordionItem> -->
	</Accordion>

	<div class="mt-auto space-y-1 px-2 pb-2">
		<p class="hover:bg-muted block rounded-md p-2">
			<span class="flex items-center gap-2 text-sm">
				<UserCircle class="size-4 text-[#5c5e63]" />
				{username}
			</span>
		</p>
		<button class="hover:bg-muted block w-full rounded-md p-2" on:click={() => (showModal = true)}>
			<span class="flex items-center gap-2 text-sm">
				<LogOut class="size-4 text-[#5c5e63]" />
				Salir
			</span>
		</button>
	</div>
</Card>

<Dialog bind:open={showModal}>
	<DialogContent>
		<DialogBody class="space-y-4">
			<div class="text-center">
				<CircleAlert class="mx-auto mb-4 h-16 w-16 text-gray-400 dark:text-gray-200" />
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
