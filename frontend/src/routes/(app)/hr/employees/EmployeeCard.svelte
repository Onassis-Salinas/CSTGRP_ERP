<script lang="ts">
	import { browser } from '$app/environment';
	import { Dialog, DialogBody, DialogTitle } from '$lib/components/ui/dialog';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Table, TableCell, TableHead, TableRow } from '$lib/components/ui/table';
	import { formatDate, getImage } from '$lib/utils/functions';
	import api from '$lib/utils/server';

	export let show = false;
	export let selectedEmployee: any;
	export let areas;
	export let positions;

	$: if (selectedEmployee.id) if (browser) fetchData();

	let assistance: any[] = [];
	let productivity: any[] = [];

	const fetchData = async () => {
		assistance = (await api.get(`/employees/assistance/${selectedEmployee.id}`)).data;
		const productivityInfo = (await api.get(`/employees/productivity/${selectedEmployee.id}`)).data;

		productivity = [];
		productivityInfo.forEach((e: any) => {
			const codes = [
				e['0goal2'] ? 3 : e['0goal1'] ? 2 : e['0goal0'] ? 1 : 1,
				e['1goal2'] ? 3 : e['1goal1'] ? 2 : e['1goal0'] ? 1 : 1,
				e['2goal2'] ? 3 : e['2goal1'] ? 2 : e['2goal0'] ? 1 : 1,
				e['3goal2'] ? 3 : e['3goal1'] ? 2 : e['3goal0'] ? 1 : 1,
				e['4goal2'] ? 3 : e['4goal1'] ? 2 : e['4goal0'] ? 1 : 1
			];
			const averages = {
				0: Math.round(
					(((parseInt(e['0produced0']) || 0) / (parseInt(e['0goal0']) || 1) +
						(parseInt(e['0produced1']) || 0) / (parseInt(e['0goal1']) || 1) +
						(parseInt(e['0produced2']) || 0) / (parseInt(e['0goal2']) || 1)) /
						codes[0]) *
						100
				),
				1: Math.round(
					(((parseInt(e['1produced0']) || 0) / (parseInt(e['1goal0']) || 1) +
						(parseInt(e['1produced1']) || 0) / (parseInt(e['1goal1']) || 1) +
						(parseInt(e['1produced2']) || 0) / (parseInt(e['1goal2']) || 1)) /
						codes[1]) *
						100
				),
				2: Math.round(
					(((parseInt(e['2produced0']) || 0) / (parseInt(e['2goal0']) || 1) +
						(parseInt(e['2produced1']) || 0) / (parseInt(e['2goal1']) || 1) +
						(parseInt(e['2produced2']) || 0) / (parseInt(e['2goal2']) || 1)) /
						codes[2]) *
						100
				),
				3: Math.round(
					(((parseInt(e['3produced0']) || 0) / (parseInt(e['3goal0']) || 1) +
						(parseInt(e['3produced1']) || 0) / (parseInt(e['3goal1']) || 1) +
						(parseInt(e['3produced2']) || 0) / (parseInt(e['3goal2']) || 1)) /
						codes[3]) *
						100
				),
				4: Math.round(
					(((parseInt(e['4produced0']) || 0) / (parseInt(e['4goal0']) || 1) +
						(parseInt(e['4produced1']) || 0) / (parseInt(e['4goal1']) || 1) +
						(parseInt(e['4produced2']) || 0) / (parseInt(e['4goal2']) || 1)) /
						codes[4]) *
						100
				)
			};

			productivity.push({
				name: formatDate(e.mondayDate),
				value: (averages[0] + averages[1] + averages[2] + averages[3] + averages[4]) / 5
			});
		});
	};
</script>

<Dialog bind:open={show}>
	<DialogContent>
		<DialogHeader>
			<DialogTitle>
				{selectedEmployee.noEmpleado + ' - ' + selectedEmployee.name}
			</DialogTitle>
		</DialogHeader>

		<DialogBody>
			<img
				class="border-primary-500 mx-auto aspect-square w-52 rounded-full border-4 object-cover object-top"
				src={getImage(selectedEmployee.photo)}
				alt=""
			/>

			{#if !selectedEmployee.active}
				<div class="border-primary-500 my-2 w-full border-b">Informacion de baja</div>
				<div class="grid w-full grid-cols-2 gap-2">
					<div class="l">
						<p class=" min-w-36">Razón de Salida</p>
						<Input readonly value={selectedEmployee.quitReason}></Input>
					</div>
					<div class="l">
						<p class=" min-w-36">Estatus de Salida</p>
						<Input readonly value={selectedEmployee.quitStatus}></Input>
					</div>
					<div class="l">
						<p class=" min-w-36">Notas de Salida</p>
						<Input readonly value={selectedEmployee.quitNotes}></Input>
					</div>
					<div class="l">
						<p class=" min-w-36">Fecha de Salida</p>
						<Input readonly value={formatDate(selectedEmployee.quitDate)}></Input>
					</div>
				</div>
			{/if}

			<div class="border-primary-500 my-2 w-full border-b">Informacion personal</div>
			<div class="grid w-full grid-cols-2 gap-2">
				<div class="l">
					<p class=" min-w-36">Nacionalidad</p>
					<Input readonly value={selectedEmployee.nationality}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Estado Civil</p>
					<Input readonly value={selectedEmployee.civilStatus}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Fecha de Nacimiento</p>
					<Input readonly value={formatDate(selectedEmployee.bornDate)}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Estudios</p>
					<Input readonly value={selectedEmployee.studies}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Género</p>
					<Input readonly value={selectedEmployee.genre}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Número de Hijos</p>
					<Input readonly value={selectedEmployee.sons}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Tipo de Sangre</p>
					<Input readonly value={selectedEmployee.blood}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Lugar de Nacimiento</p>
					<Input readonly value={selectedEmployee.bornLocation}></Input>
				</div>
			</div>

			<div class="border-primary-500 my-2 w-full border-b">Informacion Legal</div>
			<div class="grid w-full grid-cols-2 gap-2">
				<div class="l">
					<p class=" min-w-36">NSS</p>
					<Input readonly value={selectedEmployee.nss}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">CURP</p>
					<Input readonly value={selectedEmployee.curp}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">RFC</p>
					<Input readonly value={selectedEmployee.rfc}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Cuenta Bancaria</p>
					<Input readonly value={selectedEmployee.account}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Banco</p>
					<Input readonly value={selectedEmployee.bank}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Número de Infonavit</p>
					<Input readonly value={selectedEmployee.infonavitNo}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Descuento de Infonavit</p>
					<Input readonly value={selectedEmployee.infonavitDiscount}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Salario de Nómina</p>
					<Input readonly value={selectedEmployee.nominaSalary}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Número de Clínica</p>
					<Input readonly value={selectedEmployee.clinicNo}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Salario de IMSS</p>
					<Input readonly value={selectedEmployee.immsSalary}></Input>
				</div>
			</div>

			<div class="border-primary-500 my-2 w-full border-b">Empresa</div>
			<div class="grid w-full grid-cols-2 gap-2">
				<div class="l">
					<p class=" min-w-36">Posición</p>
					<Input readonly value={positions[selectedEmployee.positionId || ''] || ''}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Fecha de Admisión</p>
					<Input readonly value={formatDate(selectedEmployee.admissionDate)}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Área</p>
					<Input readonly value={areas[selectedEmployee.areaId || ''] || ''}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Fecha de CIM</p>
					<Input readonly value={formatDate(selectedEmployee.cim)}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Tipo de Posición</p>
					<Input readonly value={selectedEmployee.positionType}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Turno</p>
					<Input readonly value={selectedEmployee.shift}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Dias de vacaciones</p>
					<Input readonly value={selectedEmployee.vacations}></Input>
				</div>
			</div>

			<div class="border-primary-500 my-2 w-full border-b">Contacto</div>
			<div class="grid w-full grid-cols-2 gap-2">
				<div class="l">
					<p class=" min-w-36">Correo Electrónico</p>
					<Input readonly value={selectedEmployee.email}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Número de Teléfono</p>
					<Input readonly value={selectedEmployee.number}></Input>
				</div>
				<div class="col-span-2 w-full">
					<p class=" min-w-36">Dirección</p>
					<Input readonly value={selectedEmployee.direction}></Input>
				</div>
			</div>

			<div class="border-primary-500 my-2 w-full border-b">Contacto de Emergencia</div>
			<div class="grid w-full grid-cols-2 gap-2">
				<div class="l">
					<p class=" min-w-36">Contacto de Emergencia</p>
					<Input readonly value={selectedEmployee.emmergencyContact}></Input>
				</div>
				<div class="l">
					<p class=" min-w-36">Número de Emergencia</p>
					<Input readonly value={selectedEmployee.emmergencyNumber}></Input>
				</div>
			</div>

			<div class="border-primary-500 my-2 w-full border-b">Asistencia</div>
			<Table>
				<TableHead>
					<TableCell></TableCell>
					<TableCell>Lunes</TableCell>
					<TableCell>Martes</TableCell>
					<TableCell>Miercoles</TableCell>
					<TableCell>Jueves</TableCell>
					<TableCell>Viernes</TableCell>
				</TableHead>
				{#each assistance as day}
					<TableRow>
						<TableCell>{formatDate(day.mondayDate)}</TableCell>
						<TableCell>{day.incidence0}</TableCell>
						<TableCell>{day.incidence1}</TableCell>
						<TableCell>{day.incidence2}</TableCell>
						<TableCell>{day.incidence3}</TableCell>
						<TableCell>{day.incidence4}</TableCell>
					</TableRow>
				{/each}
			</Table>

			<div class="border-primary-500 my-2 w-full border-b">Productividad</div>
			<div class="h-36">
				<!-- <LineChart name="" data={productivity || []} /> -->
			</div>
		</DialogBody>
	</DialogContent>
</Dialog>
