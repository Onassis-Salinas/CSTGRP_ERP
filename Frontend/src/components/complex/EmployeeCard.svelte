<script lang="ts">
    import type { employee } from "../../schemas/hr.models";
    import { ButtonGroup, Hr, Input, InputAddon, Table, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { Modal } from "flowbite-svelte";
    import { formatDate } from "../../utils/functions";
    import LineChart from "../charts/LineChart.svelte";
    import api from "../../utils/server";
    export let show = false;
    export let selectedEmployee: employee;
    export let areas;
    export let positions;

    $: if (selectedEmployee.id) fetchData();

    let assistance: any[] = [];
    let productivity: any[] = [];

    const fetchData = async () => {
        assistance = (await api.get(`/employees/assistance/${selectedEmployee.id}`)).data;
        const productivityInfo = (await api.get(`/employees/productivity/${selectedEmployee.id}`)).data;

        productivity = [];
        productivityInfo.forEach((e: any) => {
            const codes = [e["0goal2"] ? 3 : e["0goal1"] ? 2 : e["0goal0"] ? 1 : 1, e["1goal2"] ? 3 : e["1goal1"] ? 2 : e["1goal0"] ? 1 : 1, e["2goal2"] ? 3 : e["2goal1"] ? 2 : e["2goal0"] ? 1 : 1, e["3goal2"] ? 3 : e["3goal1"] ? 2 : e["3goal0"] ? 1 : 1, e["4goal2"] ? 3 : e["4goal1"] ? 2 : e["4goal0"] ? 1 : 1];
            const averages = {
                0: Math.round((((parseInt(e["0produced0"]) || 0) / (parseInt(e["0goal0"]) || 1) + (parseInt(e["0produced1"]) || 0) / (parseInt(e["0goal1"]) || 1) + (parseInt(e["0produced2"]) || 0) / (parseInt(e["0goal2"]) || 1)) / codes[0]) * 100),
                1: Math.round((((parseInt(e["1produced0"]) || 0) / (parseInt(e["1goal0"]) || 1) + (parseInt(e["1produced1"]) || 0) / (parseInt(e["1goal1"]) || 1) + (parseInt(e["1produced2"]) || 0) / (parseInt(e["1goal2"]) || 1)) / codes[1]) * 100),
                2: Math.round((((parseInt(e["2produced0"]) || 0) / (parseInt(e["2goal0"]) || 1) + (parseInt(e["2produced1"]) || 0) / (parseInt(e["2goal1"]) || 1) + (parseInt(e["2produced2"]) || 0) / (parseInt(e["2goal2"]) || 1)) / codes[2]) * 100),
                3: Math.round((((parseInt(e["3produced0"]) || 0) / (parseInt(e["3goal0"]) || 1) + (parseInt(e["3produced1"]) || 0) / (parseInt(e["3goal1"]) || 1) + (parseInt(e["3produced2"]) || 0) / (parseInt(e["3goal2"]) || 1)) / codes[3]) * 100),
                4: Math.round((((parseInt(e["4produced0"]) || 0) / (parseInt(e["4goal0"]) || 1) + (parseInt(e["4produced1"]) || 0) / (parseInt(e["4goal1"]) || 1) + (parseInt(e["4produced2"]) || 0) / (parseInt(e["4goal2"]) || 1)) / codes[4]) * 100),
            };

            productivity.push({ name: formatDate(e.mondayDate), value: (averages[0] + averages[1] + averages[2] + averages[3] + averages[4]) / 5 });
        });
    };
</script>

<Modal title={selectedEmployee.noEmpleado + " - " + selectedEmployee.name} bind:open={show} outsideclose size="md" class="overflow-y-auto ">
    <img class="aspect-square w-52 mx-auto rounded-full border-4 object-cover object-top border-primary-500" src={`http://192.168.0.38/Servidor_Recursos_Humanos/RECURSOS%20HUMANOS%202024/CREDENCIALES/FOTOS%20PARA%20CREDENCIALES/Foto%20Sin%20fondo/${selectedEmployee.noEmpleado}.png`} alt="" />

    {#if !selectedEmployee.active}
        <Hr hrClass="my-2 w-full border-b border-primary-500">Informacion de baja</Hr>
        <div class="grid grid-cols-2 w-full gap-2">
            <ButtonGroup>
                <InputAddon class=" min-w-36">Razón de Salida</InputAddon>
                <Input size="sm" readonly value={selectedEmployee.quitReason}></Input>
            </ButtonGroup>
            <ButtonGroup>
                <InputAddon class=" min-w-36">Estatus de Salida</InputAddon>
                <Input size="sm" readonly value={selectedEmployee.quitStatus}></Input>
            </ButtonGroup>
            <ButtonGroup>
                <InputAddon class=" min-w-36">Notas de Salida</InputAddon>
                <Input size="sm" readonly value={selectedEmployee.quitNotes}></Input>
            </ButtonGroup>
            <ButtonGroup>
                <InputAddon class=" min-w-36">Fecha de Salida</InputAddon>
                <Input size="sm" readonly value={formatDate(selectedEmployee.quitDate)}></Input>
            </ButtonGroup>
        </div>
    {/if}

    <Hr hrClass="my-2 w-full border-b border-primary-500">Informacion personal</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Nacionalidad</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.nationality}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Estado Civil</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.civilStatus}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Fecha de Nacimiento</InputAddon>
            <Input size="sm" readonly value={formatDate(selectedEmployee.bornDate)}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Estudios</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.studies}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Género</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.genre}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Hijos</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.sons}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Tipo de Sangre</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.blood}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Lugar de Nacimiento</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.bornLocation}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Informacion Legal</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">NSS</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.nss}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">CURP</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.curp}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">RFC</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.rfc}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Cuenta Bancaria</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.account}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Banco</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.bank}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Infonavit</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.infonavitNo}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Descuento de Infonavit</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.infonavitDiscount}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Salario de Nómina</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.nominaSalary}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Clínica</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.clinicNo}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Salario de IMSS</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.immsSalary}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Empresa</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Posición</InputAddon>
            <Input size="sm" readonly value={positions[selectedEmployee.positionId || ""] || ""}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Fecha de Admisión</InputAddon>
            <Input size="sm" readonly value={formatDate(selectedEmployee.admissionDate)}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Área</InputAddon>
            <Input size="sm" readonly value={areas[selectedEmployee.areaId || ""] || ""}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Fecha de CIM</InputAddon>
            <Input size="sm" readonly value={formatDate(selectedEmployee.cim)}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Tipo de Posición</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.positionType}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Turno</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.shift}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Dias de vacaciones</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.vacations}></Input>
        </ButtonGroup>
        
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Contacto</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Correo Electrónico</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.email}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Teléfono</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.number}></Input>
        </ButtonGroup>
        <ButtonGroup class="w-full col-span-2">
            <InputAddon class=" min-w-36">Dirección</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.direction}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Contacto de Emergencia</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Contacto de Emergencia</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.emmergencyContact}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Emergencia</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.emmergencyNumber}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Asistencia</Hr>
    <Table>
        <TableHead>
            <TableHeadCell tdClass="py-1 px-0.5 w-1/6 text-center"></TableHeadCell>
            <TableHeadCell tdClass="py-1 px-0.5 w-1/6 text-center">Lunes</TableHeadCell>
            <TableHeadCell tdClass="py-1 px-0.5 w-1/6 text-center">Martes</TableHeadCell>
            <TableHeadCell tdClass="py-1 px-0.5 w-1/6 text-center">Miercoles</TableHeadCell>
            <TableHeadCell tdClass="py-1 px-0.5 w-1/6 text-center">Jueves</TableHeadCell>
            <TableHeadCell tdClass="py-1 px-0.5 w-1/6 text-center">Viernes</TableHeadCell>
        </TableHead>
        {#each assistance as day}
            <TableBodyRow>
                <TableBodyCell tdClass="py-1 px-0.5 w-1/6 text-center">{formatDate(day.mondayDate)}</TableBodyCell>
                <TableBodyCell tdClass="py-1 px-0.5 w-1/6 text-center">{day.incidence0}</TableBodyCell>
                <TableBodyCell tdClass="py-1 px-0.5 w-1/6 text-center">{day.incidence1}</TableBodyCell>
                <TableBodyCell tdClass="py-1 px-0.5 w-1/6 text-center">{day.incidence2}</TableBodyCell>
                <TableBodyCell tdClass="py-1 px-0.5 w-1/6 text-center">{day.incidence3}</TableBodyCell>
                <TableBodyCell tdClass="py-1 px-0.5 w-1/6 text-center">{day.incidence4}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </Table>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Productividad</Hr>
    <div class="h-36">
        <LineChart name="" data={productivity || []} />
    </div>
</Modal>
