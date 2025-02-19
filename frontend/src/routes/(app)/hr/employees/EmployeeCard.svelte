<script lang="ts">
	import { browser } from '$app/environment';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import { Dialog, DialogBody } from '$lib/components/ui/dialog';
	import DialogContent from '$lib/components/ui/dialog/dialog-content.svelte';
	import DialogHeader from '$lib/components/ui/dialog/dialog-header.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Table, TableCell, TableHead, TableRow } from '$lib/components/ui/table';
	import { formatDate, getImage } from '$lib/utils/functions';
	import api from '$lib/utils/server';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import DisplayInput from '$lib/components/ui/input/display-input.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Check, Edit2Icon } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { showSuccess } from '$lib/utils/showToast';
	import Select from '$lib/components/basic/Select.svelte';

	export let show = false;
	export let employee: any;
	export let reload: any;
	let edit = false;
	let formData: any;
	let files: FileList | undefined;

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
	let areasDisplay: any = {};
	let positionsDisplay: any = {};

	async function fetchOptions() {
		areas = (await api.get('/hrvarious/areas')).data;
		positions = (await api.get('/hrvarious/positions')).data;
		areas.forEach((area: any) => {
			areasDisplay[area.value] = { name: area.name, color: area.color };
		});
		positions.forEach((position: any) => {
			positionsDisplay[position.value] = { name: position.name, color: position.color };
		});
	}

	$: if (employee.id) fetchData();

	let assistance: any[] = [];
	let productivity: any[] = [];

	const fetchData = async () => {
		assistance = (await api.get(`/employees/assistance/${formData.id}`)).data;
		const productivityInfo = (await api.get(`/employees/productivity/${formData.id}`)).data;

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

	function setFormData() {
		formData = {
			...employee,
			admissionDate: employee.admissionDate?.split('T')[0],
			bornDate: employee.bornDate?.split('T')[0],
			quitDate: employee.quitDate?.split('T')[0],
			cim: employee.cim?.split('T')[0],
			infonavitFee: employee.infonavitFee?.toString(),
			infonavitDiscount: employee.infonavitDiscount?.toString()
		};
	}

	async function handleSubmit() {
		const form = new FormData();
		form.append(
			'json',
			JSON.stringify({
				...formData,
				id: parseInt(formData.id || ''),
				noEmpleado: parseInt(formData.noEmpleado || ''),
				areaId: parseInt(formData.areaId || ''),
				positionId: parseInt(formData.positionId || ''),
				sons: parseInt(formData.sons || ''),
				vacations: parseInt(formData.vacations || '')
			})
		);

		if (files) form.append('file', files[0]);

		if (employee.id) {
			await api.put('employees', form);
			showSuccess('Informacion actualizada');
		} else {
			await api.post('employees', form);
			showSuccess('Empleado registrado');
		}

		reload();
		edit = false;
	}

	onMount(() => {
		fetchOptions();
	});
</script>

<Dialog bind:open={show}>
	<DialogContent class="max-w-4xl">
		<Tabs>
			<DialogHeader class="py-2">
				<TabsList class="bg-background w-min">
					<TabsTrigger class="data-[state=active]:bg-muted" value="info">Informacion</TabsTrigger>
					<TabsTrigger class="data-[state=active]:bg-muted" value="statics"
						>Estadisticas</TabsTrigger
					>
					<TabsTrigger class="data-[state=active]:bg-muted" value="docs">Documentos</TabsTrigger>
				</TabsList>
			</DialogHeader>

			<DialogBody class="h-[85lvh]">
				<div class="mb-8 grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-6">
					<img
						class="border-muted row-span-2 aspect-square w-24 rounded-xl border-2 object-cover object-top"
						src={getImage(employee.photo)}
						alt=""
					/>
					<div class="flex gap-2">
						<p class="text-lg font-semibold">
							{`${formData.name} ${formData.paternalLastName || ''} ${formData.maternalLastName || ''}`}
						</p>
						<p class="text-lg font-semibold">{formData.noEmpleado}</p>
						{#if edit}
							<Button size="icon" variant="ghost" class="size-7" on:click={handleSubmit}
								><Check class="size-3.5" /></Button
							>
						{:else}
							<Button size="icon" variant="ghost" class="size-7" on:click={() => (edit = true)}
								><Edit2Icon class="size-3.5" /></Button
							>
						{/if}
					</div>
					<div class="mb-auto flex gap-2">
						<Badge color={areasDisplay[employee.areaId || '']?.color}
							>{areasDisplay[employee.areaId || '']?.name}</Badge
						>
						<Badge color={positionsDisplay[employee.positionId || '']?.color}
							>{positionsDisplay[employee.positionId || '']?.name}</Badge
						>
					</div>
				</div>
				<TabsContent value="info">
					{#if !employee.active}
						<div class="border-primary-500 my-2 w-full border-b">Informacion de baja</div>
						<div class="grid w-full grid-cols-2 gap-2">
							<div>
								<p class=" min-w-36">Razón de Salida</p>
								<Input readonly value={formData.quitReason}></Input>
							</div>
							<div>
								<p class=" min-w-36">Estatus de Salida</p>
								<Input readonly value={formData.quitStatus}></Input>
							</div>
							<div>
								<p class=" min-w-36">Notas de Salida</p>
								<Input readonly value={formData.quitNotes}></Input>
							</div>
							<div>
								<p class=" min-w-36">Fecha de Salida</p>
								<Input readonly value={formatDate(employee.quitDate)}></Input>
							</div>
						</div>
					{/if}

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Contacto</div>
						<div>
							<p class="text-muted-foreground text-xs">Correo Electrónico:</p>
							<DisplayInput bind:value={formData.email} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Teléfono:</p>
							<DisplayInput bind:value={formData.number} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Dirección:</p>
							<DisplayInput bind:value={formData.direction} {edit} />
						</div>
					</div>

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Personal</div>
						<div>
							<p class="text-muted-foreground text-xs">Nacionalidad:</p>
							<DisplayInput bind:value={formData.nationality} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Estado Civil:</p>
							<DisplayInput value={formData.civilStatus} {edit}>
								<Select items={civilStatus} bind:value={formData.civilStatus} />
							</DisplayInput>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Fecha de Nacimiento:</p>
							<!-- <IDisplayInput bind:value={formatDate(employee.bornDate)} /> -->
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Estudios:</p>
							<DisplayInput bind:value={formData.studies} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Género:</p>
							<DisplayInput bind:value={formData.genre} {edit}>
								<Select items={genres} bind:value={formData.genre} />
							</DisplayInput>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Hijos:</p>
							<DisplayInput bind:value={formData.sons} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Lugar de Nacimiento:</p>
							<DisplayInput bind:value={formData.bornLocation} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Tipo de Sangre:</p>
							<DisplayInput bind:value={formData.blood} {edit} />
						</div>
					</div>

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Legal</div>
						<div>
							<p class="text-muted-foreground text-xs">NSS:</p>
							<DisplayInput bind:value={formData.nss} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">CURP:</p>
							<DisplayInput bind:value={formData.curp} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">RFC:</p>
							<DisplayInput bind:value={formData.rfc} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Cuenta Bancaria:</p>
							<DisplayInput bind:value={formData.account} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Banco:</p>
							<DisplayInput bind:value={formData.bank} {edit}>
								<Select items={banks} bind:value={formData.bank} />
							</DisplayInput>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Infonavit:</p>
							<DisplayInput bind:value={formData.infonavitNo} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Descuento de Infonavit:</p>
							<DisplayInput bind:value={formData.infonavitDiscount} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Salario de Nómina:</p>
							<DisplayInput bind:value={formData.nominaSalary} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Clínica:</p>
							<DisplayInput bind:value={formData.clinicNo} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Salario de IMSS:</p>
							<DisplayInput bind:value={formData.immsSalary} {edit} />
						</div>
					</div>

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Empresa</div>
						<div>
							<p class="text-muted-foreground text-xs">Fecha de Admisión:</p>
							<!-- <IDisplayInput bind:value={formatDate(employee.admissionDate)} /> -->
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Fecha de CIM:</p>
							<!-- <IDisplayInput bind:value={formatDate(employee.cim)} /> -->
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Tipo de Posición:</p>
							<DisplayInput bind:value={formData.positionType} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Turno:</p>
							<DisplayInput bind:value={formData.shift} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Dias de vacaciones:</p>
							<DisplayInput bind:value={formData.vacations} {edit} />
						</div>
					</div>

					<div class="relative grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">
							Contacto de Emergencia
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Contacto de Emergencia:</p>
							<DisplayInput bind:value={formData.emmergencyContact} {edit} />
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Emergencia:</p>
							<DisplayInput bind:value={formData.emmergencyNumber} {edit} />
						</div>
					</div>
				</TabsContent>
				<TabsContent value="statics">
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
						<!-- <ILineChart name="" data={productivity || []} /> -->
					</div>
				</TabsContent>
				<TabsContent value="docs"></TabsContent>
			</DialogBody>
		</Tabs>
	</DialogContent>
</Dialog>
