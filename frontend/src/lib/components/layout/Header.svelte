<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { location } from './../../utils/location';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

	afterNavigate(() => {
		if (browser) {
			location.set(window?.location?.pathname);
		}
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
		it: 'Sistemas'
	};
</script>

<header class="flex h-[49px] w-full items-center border-b px-4 sticky">
	<h3 class="text font-semibold">
		{traductions[$location.split('/')[2]] || traductions[$location.split('/')[1]] || 'Inicio'}
	</h3>
</header>
