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
	import Label from '$lib/components/basic/Label.svelte';

	export let show = false;
	export let selectedEmployee: any;
	export let reload: any;
	let formData: any;

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
		formData = {
			...selectedEmployee,
			admissionDate: selectedEmployee.admissionDate?.split('T')[0],
			bornDate: selectedEmployee.bornDate?.split('T')[0],
			quitDate: selectedEmployee.quitDate?.split('T')[0],
			cim: selectedEmployee.cim?.split('T')[0],
			infonavitFee: selectedEmployee.infonavitFee?.toString(),
			infonavitDiscount: selectedEmployee.infonavitDiscount?.toString()
		};
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
							<Label name="Razón de Salida">
								<Input bind:value={formData.quitReason} />
							</Label>
							<Label name="Estatus">
								<Select class="mt-2" items={status} bind:value={formData.quitStatus} />
							</Label>
							<Label name="Notas de Salida">
								<Input bind:value={formData.quitNotes} />
							</Label>
							<Label name="Fecha de Salida">
								<Input type="date" bind:value={formData.quitDate} />
							</Label>
						</div>
					{/if}

					<div class="border-primary-500 my-2 w-full border-b">Informacion personal</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<Label name="No. Empleado">
							<Input bind:value={formData.noEmpleado} />
						</Label>
						<Label name="Nombre *">
							<Input bind:value={formData.name} />
						</Label>
						<Label name="Apellido Paterno">
							<Input bind:value={formData.paternalLastName} />
						</Label>
						<Label name="Apellido Materno">
							<Input bind:value={formData.maternalLastName} />
						</Label>
						<Label name="Nacionalidad">
							<Input bind:value={formData.nationality} />
						</Label>
						<Label name="Estado Civil">
							<Select items={civilStatus} bind:value={formData.civilStatus} />
						</Label>
						<Label name="Fecha de Nacimiento">
							<Input type="date" bind:value={formData.bornDate} />
						</Label>
						<Label name="Estudios">
							<Input bind:value={formData.studies} />
						</Label>
						<Label name="Género">
							<Select items={genres} bind:value={formData.genre} />
						</Label>
						<Label name="Número de Hijos">
							<Input type="number" bind:value={formData.sons} />
						</Label>
						<Label name="Tipo de Sangre">
							<Input bind:value={formData.blood} />
						</Label>
						<Label name="Lugar de Nacimiento">
							<Input bind:value={formData.bornLocation} />
						</Label>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Informacion Legal</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<Label name="NSS">
							<Input bind:value={formData.nss} />
						</Label>
						<Label name="CURP">
							<Input bind:value={formData.curp} />
						</Label>
						<Label name="RFC">
							<Input bind:value={formData.rfc} />
						</Label>
						<Label name="Cuenta Bancaria">
							<Input type="number" bind:value={formData.account} />
						</Label>
						<Label name="Banco">
							<Select items={banks} bind:value={formData.bank} />
						</Label>
						<Label name="Número de Infonavit">
							<Input bind:value={formData.infonavitNo} />
						</Label>
						<Label name="Descuento de Infonavit">
							<Input bind:value={formData.infonavitDiscount} />
						</Label>
						<Label name="Salario de Nómina">
							<Input bind:value={formData.nominaSalary} />
						</Label>
						<Label name="Número de Clínica">
							<Input bind:value={formData.clinicNo} />
						</Label>
						<Label name="Salario de IMSS">
							<Input bind:value={formData.immsSalary} />
						</Label>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Empresa</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<Label name="Posición">
							<Select items={positions} bind:value={formData.positionId} />
						</Label>
						<Label name="Fecha de Admisión">
							<Input type="date" bind:value={formData.admissionDate} />
						</Label>
						<Label name="Área">
							<Select items={areas} bind:value={formData.areaId} />
						</Label>
						<Label name="Fecha de CIM">
							<Input type="date" bind:value={formData.cim} />
						</Label>
						<Label name="Tipo de Posición">
							<Input bind:value={formData.positionType} />
						</Label>
						<Label name="Turno">
							<Input bind:value={formData.shift} />
						</Label>
						<Label name="Vacaciones">
							<Input bind:value={formData.vacations} />
						</Label>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Contacto</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<Label name="Correo Electrónico">
							<Input bind:value={formData.email} />
						</Label>
						<Label name="Número de Teléfono">
							<Input bind:value={formData.number} />
						</Label>
						<div class="col-span-2 w-full space-y-2">
							<p class="text-xs font-semibold">Dirección</p>
							<Input bind:value={formData.direction} />
						</div>
					</div>

					<div class="border-primary-500 my-2 w-full border-b">Contacto de Emergencia</div>
					<div class="grid w-full grid-cols-2 gap-2">
						<Label name="Contacto de Emergencia">
							<Input bind:value={formData.emmergencyContact} />
						</Label>
						<Label name="Número de Emergencia">
							<Input bind:value={formData.emmergencyNumber} />
						</Label>
					</div>
				</div>
				<Button class="mt-8 w-full" on:click={handleSubmit}>Guardar</Button>
			</form>
		</DialogBody>
	</DialogContent>
</Dialog>
