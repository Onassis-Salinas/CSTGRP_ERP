<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogHeader,
		DialogTitle,
		DialogContent,
		DialogBody
	} from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import Select from '$lib/components/basic/Select.svelte';
	import api from '$lib/utils/server';
	import { showSuccess } from '$lib/utils/showToast';
	import { onMount } from 'svelte';

	export let show = false;
	export let selectedEmployee: employee;
	export let reload: any;
	let formData: employee;

	$: if (show || true) setFormData();

	let banks = [
		{ value: 'SCOTIABANK', name: 'SCOTIABANK' },
		{ value: 'HSBC', name: 'HSBC' },
		{ value: 'BBVA', name: 'BBVA' }
	];
	let status = [
		{ value: 'RECONTRATABLE', name: 'Recontratable' },
		{ value: 'NO RECONTRATABLE', name: 'No recontratable' },
		{ value: 'A CONSIDERAR', name: 'A considerar' }
	];

	let genres = [
		{ value: 'F', name: 'Femenino' },
		{ value: 'M', name: 'Masculino' },
		{ value: 'O', name: 'Otro' }
	];

	let civilStatus = [
		{ value: 'Casado(a)', name: 'Casado(a)' },
		{ value: 'Soltero(a)', name: 'Soltero(a)' },
		{ value: 'Divorciado(a)', name: 'Divorciado(a)' },
		{ value: 'Viudo(a)', name: 'Viudo(a)' },
		{ value: 'Separado(a)', name: 'Separado(a)' },
		{ value: 'Concubinato', name: 'Concubinato' },
		{ value: 'Unión Libre', name: 'Unión Libre' },
		{ value: 'Sociedad de Convivencia', name: 'Sociedad de Convivencia' }
	];

	let areas: any;
	let positions: any;

	async function fetchOptions() {
		areas = (await api.get('/hrvarious/areas')).data;
		positions = (await api.get('/hrvarious/positions')).data;
	}

	function setFormData() {
		formData =
			{
				...selectedEmployee,
				admissionDate: selectedEmployee.admissionDate?.split('T')[0],
				bornDate: selectedEmployee.bornDate?.split('T')[0],
				quitDate: selectedEmployee.quitDate?.split('T')[0],
				cim: selectedEmployee.cim?.split('T')[0],
				infonavitFee: selectedEmployee.infonavitFee?.toString(),
				infonavitDiscount: selectedEmployee.infonavitDiscount?.toString()
			} || {};
	}

	async function handleSubmit() {
		if (selectedEmployee.id) {
			await api.put('employees', {
				...formData,
				id: parseInt(formData.id || ''),
				noEmpleado: parseInt(formData.noEmpleado || ''),
				areaId: parseInt(formData.areaId || ''),
				positionId: parseInt(formData.positionId || ''),
				sons: parseInt(formData.sons || ''),
				vacations: parseInt(formData.vacations || '')
			});
			showSuccess('Informacion actualizada');
			reload();
			show = false;
		} else {
			await api.post('employees', {
				...formData,
				id: parseInt(formData.id || ''),
				noEmpleado: parseInt(formData.noEmpleado || ''),
				areaId: parseInt(formData.areaId || ''),
				positionId: parseInt(formData.positionId || ''),
				sons: parseInt(formData.sons || ''),
				vacations: parseInt(formData.vacations || '')
			});
			showSuccess('Empleado registrado');
			reload();
			show = false;
		}
	}

	onMount(() => {
		fetchOptions();
	});
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle
				>{selectedEmployee.id
					? `Editar Informacion de ${selectedEmployee.name}`
					: 'Registrar Empleado'}</DialogTitle
			>
		</DialogHeader>

		<DialogBody>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="w-full space-y-4">
					{#if !selectedEmployee.active}
						<div class="border-primary-500 my-2 w-full border-b">Informacion de baja</div>
						<div class="grid w-full grid-cols-2 gap-2">
							<div class="space-y-2">
								<p class="text-xs font-semibold">Razón de Salida</p>
								<Input name="text" bind:value={formData.quitReason} />
							</div>
							<div class="space-y-2">
								<p class="text-xs font-semibold">Estatus</p>
								<Select class="mt-2" items={status} bind:value={formData.quitStatus} />
							</div>
							<div class="space-y-2">
								<p class="text-xs font-semibold">Notas de Salida</p>
								<Input name="text" bind:value={formData.quitNotes} />
							</div>
							<div class="space-y-2">
								<p class="text-xs font-semibold">Fecha de Salida</p>
								<Input type="date" name="text" bind:value={formData.quitDate} />
							</div>
						</div>
					{/if}

					<div class="border-primary-500 my-2 w-full border-b">Informacion personal</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<div class="space-y-2">
							<p class="text-xs font-semibold">No. Empleado</p>
							<Input name="text" bind:value={formData.noEmpleado} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Nombre *</p>
							<Input name="text" bind:value={formData.name} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Apellido Paterno</p>
							<Input name="text" bind:value={formData.paternalLastName} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Apellido Materno</p>
							<Input name="text" bind:value={formData.maternalLastName} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Nacionalidad</p>
							<Input name="text" bind:value={formData.nationality} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Estado Civil</p>
							<Select items={civilStatus} bind:value={formData.civilStatus} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Fecha de Nacimiento</p>
							<Input type="date" name="text" bind:value={formData.bornDate} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Estudios</p>
							<Input name="text" bind:value={formData.studies} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Género</p>
							<Select items={genres} bind:value={formData.genre} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Número de Hijos</p>
							<Input type="number" name="text" bind:value={formData.sons} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Tipo de Sangre</p>
							<Input name="text" bind:value={formData.blood} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Lugar de Nacimiento</p>
							<Input name="text" bind:value={formData.bornLocation} />
						</div>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Informacion Legal</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<div class="space-y-2">
							<p class="text-xs font-semibold">NSS</p>
							<Input name="text" bind:value={formData.nss} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">CURP</p>
							<Input name="text" bind:value={formData.curp} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">RFC</p>
							<Input name="text" bind:value={formData.rfc} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Cuenta Bancaria</p>
							<Input type="number" name="text" bind:value={formData.account} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Banco</p>
							<Select items={banks} bind:value={formData.bank} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Número de Infonavit</p>
							<Input name="text" bind:value={formData.infonavitNo} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Descuento de Infonavit</p>
							<Input name="text" bind:value={formData.infonavitDiscount} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Salario de Nómina</p>
							<Input name="text" bind:value={formData.nominaSalary} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Número de Clínica</p>
							<Input name="text" bind:value={formData.clinicNo} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Salario de IMSS</p>
							<Input name="text" bind:value={formData.immsSalary} />
						</div>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Empresa</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<div class="space-y-2">
							<p class="text-xs font-semibold">Posición</p>
							<Select items={positions} bind:value={formData.positionId} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Fecha de Admisión</p>
							<Input type="date" name="text" bind:value={formData.admissionDate} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Área</p>
							<Select items={areas} bind:value={formData.areaId} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Fecha de CIM</p>
							<Input type="date" name="text" bind:value={formData.cim} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Tipo de Posición</p>
							<Input name="text" bind:value={formData.positionType} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Turno</p>
							<Input name="text" bind:value={formData.shift} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Vacaciones</p>
							<Input name="text" bind:value={formData.vacations} />
						</div>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Contacto</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<div class="space-y-2">
							<p class="text-xs font-semibold">Correo Electrónico</p>
							<Input name="text" bind:value={formData.email} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Número de Teléfono</p>
							<Input name="text" bind:value={formData.number} />
						</div>
						<div class="col-span-2 w-full space-y-2">
							<p class="text-xs font-semibold">Dirección</p>
							<Input name="text" bind:value={formData.direction} />
						</div>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Contacto de Emergencia</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<div class="space-y-2">
							<p class="text-xs font-semibold">Contacto de Emergencia</p>
							<Input name="text" bind:value={formData.emmergencyContact} />
						</div>
						<div class="space-y-2">
							<p class="text-xs font-semibold">Número de Emergencia</p>
							<Input name="text" bind:value={formData.emmergencyNumber} />
						</div>
					</div>
				</div>
				<Button class="mt-8 w-full" on:click={handleSubmit}>Guardar</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
