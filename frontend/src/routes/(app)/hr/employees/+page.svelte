<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import api from '$lib/utils/server';
	import { onMount } from 'svelte';
	import EmployeeCard from './EmployeeCard.svelte';
	import EmployeeForm from './EmployeeForm.svelte';
	import QuitEmployeeForm from './QuitEmployeeForm.svelte';
	import ReactivateForm from './ReactivateForm.svelte';
	import { Button } from '$lib/components/ui/button';
	import CusTable from '$lib/components/basic/CusTable.svelte';
	import { RotateCcw, FileDown, PlusCircle } from 'lucide-svelte';
	import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { formatDate } from '$lib/utils/functions';
	import { browser } from '$app/environment';
	import DropdownMenuItem from '$lib/components/ui/dropdown-menu/dropdown-menu-item.svelte';
	import MenuBar from '$lib/components/basic/MenuBar.svelte';
	import OptionsCell from '$lib/components/basic/OptionsCell.svelte';

	let show: boolean;
	let show1: boolean;
	let show2: boolean;
	let show3: boolean;
	let selectedEmployee: any = {};
	let employees: any[] = [];
	let filteredEmployees: any[];
	1;
	let searchParams = {
		noEmpleado: '',
		name: ''
	};

	let areas: any = {};
	let positions: any = {};
	let searchActive: boolean = true;

	$: if (searchActive || true) if (browser) getEmployees();
	$: {
		filteredEmployees = employees.filter((e) => {
			if (searchParams.noEmpleado) return e.noEmpleado === searchParams.noEmpleado;
			if (searchParams.name)
				return (
					e.name?.toUpperCase()?.includes(searchParams.name.toUpperCase()) ||
					e.paternalLastName?.toUpperCase()?.includes(searchParams.name.toUpperCase()) ||
					e.maternalLastName?.toUpperCase()?.includes(searchParams.name.toUpperCase())
				);
			return true;
		});
	}

	async function fetchOptions() {
		const areasArray = (await api.get('/hrvarious/areas')).data;
		areasArray.forEach((area: any) => {
			areas[area.value] = { name: area.name, color: area.color };
		});
		const positionsArray = (await api.get('/hrvarious/positions')).data;
		positionsArray.forEach((position: any) => {
			positions[position.value] = { name: position.name, color: position.color };
		});
	}

	async function getEmployees() {
		if (searchActive) {
			const result = await api.get('/employees');
			employees = result.data;
		} else {
			const result = await api.get('/employees/inactive');
			employees = result.data;
		}
	}

	function editEmployee(i: number) {
		selectedEmployee = filteredEmployees[i];
		show = true;
	}
	function createEmployee() {
		selectedEmployee = {};
		show = true;
	}
	function previewEmployee(i: number) {
		selectedEmployee = filteredEmployees[i];
		show1 = true;
	}
	function deleteEmployee(i: number) {
		selectedEmployee = filteredEmployees[i];
		show2 = true;
	}
	function reactivateEmployee(i: number) {
		selectedEmployee = filteredEmployees[i];
		show3 = true;
	}

	const statusColors: { [key: string]: 'red' | 'green' | 'yellow' } = {
		'NO RECONTRATABLE': 'red',
		RECONTRATABLE: 'green',
		'A CONSIDERAR': 'yellow'
	};
	const banksColors: { [key: string]: 'blue' | 'red' } = {
		HSBC: 'red',
		BBVA: 'blue',
		SCOTIABANK: 'red',
		SANTANDER: 'red'
	};
	const genreColors: { [key: string]: 'pink' | 'blue' | 'gray' } = {
		F: 'pink',
		M: 'blue',
		O: 'gray'
	};

	async function exportList() {
		const response = await api.get('/employees/export', {
			responseType: 'arraybuffer'
		});

		const blob = new Blob([response.data], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		});

		const link = document.createElement('a');
		link.href = URL.createObjectURL(blob);
		link.download = 'Empleados.xlsx';

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	}

	onMount(async () => {
		await fetchOptions();
		getEmployees();
	});
</script>

<MenuBar>
	<svelte:fragment slot="left">
		<Input bind:value={searchParams.noEmpleado} placeholder="No. Empleado" />
		<Input bind:value={searchParams.name} placeholder="Nombre" />

		<Button on:click={() => (searchActive = true)} value={'active'}>Activos</Button>
		<Button on:click={() => (searchActive = false)} value={'inactive'}>Inactivos</Button>
	</svelte:fragment>
	<svelte:fragment slot="right">
		<Button on:click={exportList}><FileDown class="size-3.5" /></Button>
		<Button on:click={createEmployee}><PlusCircle class="mr-1.5 size-3.5" />Añadir empleado</Button>
	</svelte:fragment>
</MenuBar>

<CusTable>
	<TableHeader>
		<TableRow>
			<TableHead class="fixed left-0 z-30 bg-inherit p-1"></TableHead>
			<TableHead>No. Empleado</TableHead>
			<TableHead>Nombre</TableHead>
			<TableHead>Apellido Paterno</TableHead>
			<TableHead>Apellido Materno</TableHead>
			<TableHead>Área</TableHead>
			<TableHead>Posición</TableHead>
			{#if !searchActive}
				<TableHead>Razón de Salida</TableHead>
				<TableHead>Estatus de Salida</TableHead>
				<TableHead>Fecha de Salida</TableHead>
				<TableHead>Notas de Salida</TableHead>
			{/if}
			<TableHead>NSS</TableHead>
			<TableHead>CURP</TableHead>
			<TableHead>RFC</TableHead>
			<TableHead>Vacaciones</TableHead>
			<TableHead>Tipo de Sangre</TableHead>
			<TableHead>Cuenta Bancaria</TableHead>
			<TableHead>Contacto de Emergencia</TableHead>
			<TableHead>Fecha de Admisión</TableHead>
			<TableHead>Número de Emergencia</TableHead>
			<TableHead>Lugar de Nacimiento</TableHead>
			<TableHead>Género</TableHead>
			<TableHead>Número de Hijos</TableHead>
			<TableHead>Número de Clínica</TableHead>
			<TableHead>Correo Electrónico</TableHead>
			<TableHead>Número de Teléfono</TableHead>
			<TableHead>Dirección</TableHead>
			<TableHead>Banco</TableHead>
			<TableHead>Número de Infonavit</TableHead>
			<TableHead>Descuento de Infonavit</TableHead>
			<TableHead>Tipo de Posición</TableHead>
			<TableHead>Fecha de CIM</TableHead>
			<TableHead>Turno</TableHead>
			<TableHead>Salario de Nómina</TableHead>
			<TableHead>Salario de IMSS</TableHead>
			<TableHead>Nacionalidad</TableHead>
			<TableHead>Estado Civil</TableHead>
			<TableHead>Fecha de Nacimiento</TableHead>
			<TableHead>Estudios</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each filteredEmployees as employee, i}
			<TableRow>
				<OptionsCell
					viewFunc={() => previewEmployee(i)}
					editFunc={() => editEmployee(i)}
					deleteFunc={employee.active ? () => deleteEmployee(i) : undefined}
				>
					{#if !employee.active}
						<DropdownMenuItem on:click={() => reactivateEmployee(i)}>
							<RotateCcw class="size-3.5" /> Recontratar
						</DropdownMenuItem>
					{/if}
				</OptionsCell>
				<TableCell>{employee.noEmpleado || ''}</TableCell>
				<TableCell class="whitespace-nowrap">{employee.name || ''}</TableCell>
				<TableCell>{employee.paternalLastName || ''}</TableCell>
				<TableCell>{employee.maternalLastName || ''}</TableCell>
				<TableCell
					><Badge color={areas[employee.areaId || '']?.color}
						>{areas[employee.areaId || '']?.name}</Badge
					></TableCell
				>
				<TableCell
					><Badge color={positions[employee.positionId || '']?.color}
						>{positions[employee.positionId || '']?.name || ''}</Badge
					>
				</TableCell>
				{#if !searchActive}
					<TableCell>{employee.quitReason || ''}</TableCell>
					<TableCell
						><Badge color={statusColors[employee.quitStatus?.toUpperCase() || '']}
							>{employee.quitStatus || ''}</Badge
						></TableCell
					>
					<TableCell>{formatDate(employee.quitDate)}</TableCell>
					<TableCell>{employee.quitNotes || ''}</TableCell>
				{/if}
				<TableCell>{employee.nss || ''}</TableCell>
				<TableCell>{employee.curp || ''}</TableCell>
				<TableCell>{employee.rfc || ''}</TableCell>
				<TableCell>{employee.vacations || ''}</TableCell>
				<TableCell>{employee.blood || ''}</TableCell>
				<TableCell>{employee.account || ''}</TableCell>
				<TableCell>{employee.emmergencyContact || ''}</TableCell>
				<TableCell>{formatDate(employee.admissionDate)}</TableCell>
				<TableCell>{employee.emmergencyNumber || ''}</TableCell>
				<TableCell>{employee.bornLocation || ''}</TableCell>
				<TableCell
					><Badge color={genreColors[employee.genre?.toUpperCase() || 'gray']}
						>{employee.genre || ''}</Badge
					></TableCell
				>
				<TableCell>{employee.sons || ''}</TableCell>
				<TableCell>{employee.clinicNo || ''}</TableCell>
				<TableCell>{employee.email || ''}</TableCell>
				<TableCell>{employee.number || ''}</TableCell>
				<TableCell>{employee.direction || ''}</TableCell>
				<TableCell
					><Badge color={banksColors[employee.bank?.toUpperCase() || 'gray']}
						>{employee.bank || ''}</Badge
					></TableCell
				>
				<TableCell>{employee.infonavitNo || ''}</TableCell>
				<TableCell>{employee.infonavitDiscount || ''}</TableCell>
				<TableCell>{employee.positionType || ''}</TableCell>
				<TableCell>{formatDate(employee.cim || '')}</TableCell>
				<TableCell>{employee.shift || ''}</TableCell>
				<TableCell>{employee.nominaSalary || ''}</TableCell>
				<TableCell>{employee.immsSalary || ''}</TableCell>
				<TableCell>{employee.nationality || ''}</TableCell>
				<TableCell>{employee.civilStatus || ''}</TableCell>
				<TableCell>{formatDate(employee.bornDate)}</TableCell>
				<TableCell>{employee.studies || ''}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</CusTable>

<EmployeeForm bind:show bind:selectedEmployee reload={getEmployees} />
<EmployeeCard bind:show={show1} bind:employee={selectedEmployee} reload={getEmployees} />
<QuitEmployeeForm bind:show={show2} bind:selectedEmployee reload={getEmployees} />
<ReactivateForm bind:show={show3} bind:selectedEmployee reload={getEmployees} />
