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

<header class="py-8">
	<div class="flex flex-col gap-2">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>Inicio</Breadcrumb.Item>
				{#if $location.split('/')[1]}
					<Breadcrumb.Separator></Breadcrumb.Separator>
					<Breadcrumb.Item>{traductions[$location.split('/')[1]]}</Breadcrumb.Item>
				{/if}
				{#if $location.split('/')[2]}
					<Breadcrumb.Separator></Breadcrumb.Separator>
					<Breadcrumb.Item>{traductions[$location.split('/')[2]]}</Breadcrumb.Item>
				{/if}
			</Breadcrumb.List>
		</Breadcrumb.Root>
		<h3 class="text-xl font-semibold">
			{traductions[$location.split('/')[2]] || traductions[$location.split('/')[1]] || 'Inicio'}
		</h3>
	</div>
</header>
