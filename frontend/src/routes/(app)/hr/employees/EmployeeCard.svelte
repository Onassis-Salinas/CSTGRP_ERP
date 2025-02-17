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
						src={getImage(selectedEmployee.photo)}
						alt=""
					/>
					<div class="flex gap-2">
						<p class="text-lg font-semibold">
							{`${selectedEmployee.name} ${selectedEmployee.paternalLastName || ''} ${selectedEmployee.maternalLastName || ''}`}
						</p>
						<p class="text-lg font-semibold">{selectedEmployee.noEmpleado}</p>
					</div>
					<div class="mb-auto flex gap-2">
						<Badge color={areas[selectedEmployee.areaId || '']?.color}
							>{areas[selectedEmployee.areaId || '']?.name}</Badge
						>
						<Badge color={positions[selectedEmployee.positionId || '']?.color}
							>{positions[selectedEmployee.positionId || '']?.name}</Badge
						>
					</div>
				</div>
				<TabsContent value="info">
					{#if !selectedEmployee.active}
						<div class="border-primary-500 my-2 w-full border-b">Informacion de baja</div>
						<div class="grid w-full grid-cols-2 gap-2">
							<div>
								<p class=" min-w-36">Razón de Salida</p>
								<Input readonly value={selectedEmployee.quitReason}></Input>
							</div>
							<div>
								<p class=" min-w-36">Estatus de Salida</p>
								<Input readonly value={selectedEmployee.quitStatus}></Input>
							</div>
							<div>
								<p class=" min-w-36">Notas de Salida</p>
								<Input readonly value={selectedEmployee.quitNotes}></Input>
							</div>
							<div>
								<p class=" min-w-36">Fecha de Salida</p>
								<Input readonly value={formatDate(selectedEmployee.quitDate)}></Input>
							</div>
						</div>
					{/if}

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Contacto</div>
						<div>
							<p class="text-muted-foreground text-xs">Correo Electrónico:</p>
							<p class="text-sm">{selectedEmployee.email || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Teléfono:</p>
							<p class="text-sm">{selectedEmployee.number || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Dirección:</p>
							<p class="text-sm">{selectedEmployee.direction || '-'}</p>
						</div>
					</div>

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Personal</div>
						<div>
							<p class="text-muted-foreground text-xs">Nacionalidad:</p>
							<p class="text-sm">{selectedEmployee.nationality || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Estado Civil:</p>
							<p class="text-sm">{selectedEmployee.civilStatus || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Fecha de Nacimiento:</p>
							<p class="text-sm">{formatDate(selectedEmployee.bornDate) || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Estudios:</p>
							<p class="text-sm">{selectedEmployee.studies || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Género:</p>
							<p class="text-sm">{selectedEmployee.genre || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Hijos:</p>
							<p class="text-sm">{selectedEmployee.sons || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Lugar de Nacimiento:</p>
							<p class="text-sm">{selectedEmployee.bornLocation || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Tipo de Sangre:</p>
							<p class="text-sm">{selectedEmployee.blood || '-'}</p>
						</div>
					</div>

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Legal</div>
						<div>
							<p class="text-muted-foreground text-xs">NSS:</p>
							<p class="text-sm">{selectedEmployee.nss || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">CURP:</p>
							<p class="text-sm">{selectedEmployee.curp || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">RFC:</p>
							<p class="text-sm">{selectedEmployee.rfc || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Cuenta Bancaria:</p>
							<p class="text-sm">{selectedEmployee.account || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Banco:</p>
							<p class="text-sm">{selectedEmployee.bank || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Infonavit:</p>
							<p class="text-sm">{selectedEmployee.infonavitNo || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Descuento de Infonavit:</p>
							<p class="text-sm">{selectedEmployee.infonavitDiscount || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Salario de Nómina:</p>
							<p class="text-sm">{selectedEmployee.nominaSalary || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Clínica:</p>
							<p class="text-sm">{selectedEmployee.clinicNo || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Salario de IMSS:</p>
							<p class="text-sm">{selectedEmployee.immsSalary || '-'}</p>
						</div>
					</div>

					<div class="relative mb-6 grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">Empresa</div>
						<div>
							<p class="text-muted-foreground text-xs">Fecha de Admisión:</p>
							<p class="text-sm">{formatDate(selectedEmployee.admissionDate) || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Fecha de CIM:</p>
							<p class="text-sm">{formatDate(selectedEmployee.cim) || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Tipo de Posición:</p>
							<p class="text-sm">{selectedEmployee.positionType || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Turno:</p>
							<p class="text-sm">{selectedEmployee.shift || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Dias de vacaciones:</p>
							<p class="text-sm">{selectedEmployee.vacations || '-'}</p>
						</div>
					</div>

					<div class="relative grid w-full grid-cols-2 gap-2 rounded-md border p-4">
						<div class="bg-background absolute -top-5 left-8 my-2 px-2 font-semibold">
							Contacto de Emergencia
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Contacto de Emergencia:</p>
							<p class="text-sm">{selectedEmployee.emmergencyContact || '-'}</p>
						</div>
						<div>
							<p class="text-muted-foreground text-xs">Número de Emergencia:</p>
							<p class="text-sm">{selectedEmployee.emmergencyNumber || '-'}</p>
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
						<!-- <LineChart name="" data={productivity || []} /> -->
					</div>
				</TabsContent>
				<TabsContent value="docs"></TabsContent>
			</DialogBody>
		</Tabs>
	</DialogContent>
</Dialog>
