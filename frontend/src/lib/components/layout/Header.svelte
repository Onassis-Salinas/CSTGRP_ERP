<script lang="ts">
	import { location, sidebarOpen } from './../../utils/store';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { Button } from '../ui/button';
	import { PanelRight } from 'lucide-svelte';

	afterNavigate(() => {
		if (browser) {
			location.set(window?.location?.pathname);
		}
		sidebarOpen.set(false);
	});

	const traductions: any = {
		hr: 'RRHH',
		dashboard: 'Dashboard',
		inventory: 'Inventario',
		materials: 'Materiales',
		devices: 'Dispositivos',
		emails: 'Correos',
		computers: 'Computadoras',
		resources: 'Recursos',
		structure: 'Estructura',
		users: 'Usuarios',
		admin: 'Administración',
		movements: 'Movimientos',
		login: 'Iniciar sesión',
		directory: 'Directorio',
		formats: 'Formatos',
		assistance: 'Asistencia',
		productivity: 'Productividad',
		employees: 'Empleados',
		warehouse: 'Inventario',
		it: 'Sistemas',
		positions: 'Posiciones',
		areas: 'Areas'
	};
</script>

<header class="flex h-[49px] w-full items-center border-b px-5 sticky">
	<Button class="xl:hidden block" variant="ghost" on:click={() => sidebarOpen.set(true)}>
		<PanelRight class="size-4" />
	</Button>
	<h3 class="text font-semibold">
		{traductions[$location.split('/')[2]] || traductions[$location.split('/')[1]] || 'Inicio'}
	</h3>
</header>
