<script lang="ts">
    import { Badge, Button, ButtonGroup, Dropdown, Input, RadioButton, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import api from "../../utils/server";
    import type { employee } from "../../schemas/hr.models";

    import { DotsVerticalOutline, FileExportOutline, PlusOutline, UserAddOutline, UserEditOutline, UserOutline, UserRemoveOutline } from "flowbite-svelte-icons";
    import EmployeeForm from "../../components/complex/EmployeeForm.svelte";
    import EmployeeCard from "../../components/complex/EmployeeCard.svelte";
    import QuitEmployeeForm from "../../components/complex/QuitEmployeeForm.svelte";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { formatDate } from "../../utils/functions";
    import { setLocation } from "../../utils/location";
    import ReactivateForm from "../../components/complex/ReactivateForm.svelte";

    setLocation();
    let show: boolean;
    let show1: boolean;
    let show2: boolean;
    let show3: boolean;
    let selectedEmployee: employee = {};
    let employees: employee[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    let filteredEmployees: employee[];
    let searchParams = {
        noEmpleado: "",
        name: "",
    };

    let areas: any = {};
    let positions: any = {};
    let searchActive: boolean = true;

    $: if (searchActive || true) getEmployees();
    $: {
        filteredEmployees = employees.filter((e) => {
            if (searchParams.noEmpleado) return e.noEmpleado === searchParams.noEmpleado;
            if (searchParams.name) return e.name?.toUpperCase()?.includes(searchParams.name.toUpperCase()) || e.paternalLastName?.toUpperCase()?.includes(searchParams.name.toUpperCase()) || e.maternalLastName?.toUpperCase()?.includes(searchParams.name.toUpperCase());
            return true;
        });
    }

    async function fetchOptions() {
        const areasArray = (await api.get("/hrvarious/areas")).data;
        areasArray.forEach((area: any) => {
            areas[area.value] = area.name;
        });
        const positionsArray = (await api.get("/hrvarious/positions")).data;
        positionsArray.forEach((position: any) => {
            positions[position.value] = position.name;
        });
    }
    fetchOptions();

    async function getEmployees() {
        if (searchActive) {
            const result = await api.get("/employees");
            employees = result.data;
        } else {
            const result = await api.get("/employees/inactive");
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

    const statusColors: { [key: string]: "red" | "green" | "yellow" } = {
        "NO RECONTRATABLE": "red",
        RECONTRATABLE: "green",
        "A CONSIDERAR": "yellow",
    };
    const banksColors: { [key: string]: "pink" | "blue" | "red" } = {
        HSBC: "pink",
        BBVA: "blue",
        SCOTIABANK: "red",
    };
    const genreColors: { [key: string]: "pink" | "blue" | "dark" } = {
        F: "pink",
        M: "blue",
        O: "dark",
    };
    let group = "active";

    async function exportList() {
        const response = await api.get("/employees/export", {
            responseType: "arraybuffer",
        });

        const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Empleados.xlsx";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
</script>

<div class="flex justify-between mb-4">
    <div class="flex gap-2">
        <Input size="sm" bind:value={searchParams.noEmpleado} placeholder="No. Empleado" />
        <Input size="sm" bind:value={searchParams.name} placeholder="Nombre" />

        <ButtonGroup>
            <RadioButton on:click={() => (searchActive = true)} value={"active"} bind:group>Activos</RadioButton>
            <RadioButton on:click={() => (searchActive = false)} value={"inactive"} bind:group>Inactivos</RadioButton>
        </ButtonGroup>
    </div>
    <div>
        <Button size="sm" on:click={exportList}><FileExportOutline class="mr-2" />Exportar</Button>
        <Button size="sm" on:click={createEmployee}><PlusOutline class="mr-2" />Añadir empleado</Button>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20" theadClass="relative">
        <TableHeadCell class="p-1 fixed left-0 z-30 bg-inherit"></TableHeadCell>
        <TableHeadCell>No. Empleado</TableHeadCell>
        <TableHeadCell>Nombre</TableHeadCell>
        <TableHeadCell>Apellido Paterno</TableHeadCell>
        <TableHeadCell>Apellido Materno</TableHeadCell>
        <TableHeadCell>Área</TableHeadCell>
        <TableHeadCell>Posición</TableHeadCell>
        {#if !searchActive}
            <TableHeadCell>Razón de Salida</TableHeadCell>
            <TableHeadCell>Estatus de Salida</TableHeadCell>
            <TableHeadCell>Fecha de Salida</TableHeadCell>
            <TableHeadCell>Notas de Salida</TableHeadCell>
        {/if}
        <TableHeadCell>NSS</TableHeadCell>
        <TableHeadCell>CURP</TableHeadCell>
        <TableHeadCell>RFC</TableHeadCell>
        <TableHeadCell>Vacaciones</TableHeadCell>
        <TableHeadCell>Tipo de Sangre</TableHeadCell>
        <TableHeadCell>Cuenta Bancaria</TableHeadCell>
        <TableHeadCell>Contacto de Emergencia</TableHeadCell>
        <TableHeadCell>Fecha de Admisión</TableHeadCell>
        <TableHeadCell>Número de Emergencia</TableHeadCell>
        <TableHeadCell>Lugar de Nacimiento</TableHeadCell>
        <TableHeadCell>Género</TableHeadCell>
        <TableHeadCell>Número de Hijos</TableHeadCell>
        <TableHeadCell>Número de Clínica</TableHeadCell>
        <TableHeadCell>Correo Electrónico</TableHeadCell>
        <TableHeadCell>Número de Teléfono</TableHeadCell>
        <TableHeadCell>Dirección</TableHeadCell>
        <TableHeadCell>Banco</TableHeadCell>
        <TableHeadCell>Número de Infonavit</TableHeadCell>
        <TableHeadCell>Descuento de Infonavit</TableHeadCell>
        <TableHeadCell>Tipo de Posición</TableHeadCell>
        <TableHeadCell>Fecha de CIM</TableHeadCell>
        <TableHeadCell>Turno</TableHeadCell>
        <TableHeadCell>Salario de Nómina</TableHeadCell>
        <TableHeadCell>Salario de IMSS</TableHeadCell>
        <TableHeadCell>Nacionalidad</TableHeadCell>
        <TableHeadCell>Estado Civil</TableHeadCell>
        <TableHeadCell>Fecha de Nacimiento</TableHeadCell>
        <TableHeadCell>Estudios</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each filteredEmployees as employee, i}
            <TableBodyRow>
                <TableBodyCell tdClass="px-0 sticky left-0 bg-inherit">
                    <Button size="xs" color="none" class="p-0 h-full w-10">
                        <DotsVerticalOutline />
                    </Button>
                    <Dropdown containerClass="z-[999] flex gap-2" placement="right" class="p-2 flex gap-2">
                        <Button size="xs" on:click={() => previewEmployee(i)} color="primary"><UserOutline />Ver</Button>
                        <Button size="xs" on:click={() => editEmployee(i)} color="green"><UserEditOutline />Editar</Button>
                        {#if employee.active}
                            <Button size="xs" on:click={() => deleteEmployee(i)} color="red"><UserRemoveOutline />Baja</Button>
                        {:else}
                            <Button size="xs" on:click={() => reactivateEmployee(i)} color="purple"><UserAddOutline />Recontratar</Button>
                        {/if}
                    </Dropdown>
                </TableBodyCell>
                <TableBodyCell>{employee.noEmpleado || ""}</TableBodyCell>
                <TableBodyCell>{employee.name || ""}</TableBodyCell>
                <TableBodyCell>{employee.paternalLastName || ""}</TableBodyCell>
                <TableBodyCell>{employee.maternalLastName || ""}</TableBodyCell>
                <TableBodyCell><Badge color={employee.areaId === "1" ? "dark" : "indigo"}>{areas[employee.areaId || ""]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color="purple">{positions[employee.positionId || ""] || ""}</Badge></TableBodyCell>
                {#if !searchActive}
                    <TableBodyCell>{employee.quitReason || ""}</TableBodyCell>
                    <TableBodyCell><Badge color={statusColors[employee.quitStatus?.toUpperCase() || ""]}>{employee.quitStatus || ""}</Badge></TableBodyCell>
                    <TableBodyCell>{formatDate(employee.quitDate)}</TableBodyCell>
                    <TableBodyCell>{employee.quitNotes || ""}</TableBodyCell>
                {/if}
                <TableBodyCell>{employee.nss || ""}</TableBodyCell>
                <TableBodyCell>{employee.curp || ""}</TableBodyCell>
                <TableBodyCell>{employee.rfc || ""}</TableBodyCell>
                <TableBodyCell>{employee.vacations || ""}</TableBodyCell>
                <TableBodyCell>{employee.blood || ""}</TableBodyCell>
                <TableBodyCell>{employee.account || ""}</TableBodyCell>
                <TableBodyCell>{employee.emmergencyContact || ""}</TableBodyCell>
                <TableBodyCell>{formatDate(employee.admissionDate)}</TableBodyCell>
                <TableBodyCell>{employee.emmergencyNumber || ""}</TableBodyCell>
                <TableBodyCell>{employee.bornLocation || ""}</TableBodyCell>
                <TableBodyCell><Badge color={genreColors[employee.genre?.toUpperCase() || ""]}>{employee.genre || ""}</Badge></TableBodyCell>
                <TableBodyCell>{employee.sons || ""}</TableBodyCell>
                <TableBodyCell>{employee.clinicNo || ""}</TableBodyCell>
                <TableBodyCell>{employee.email || ""}</TableBodyCell>
                <TableBodyCell>{employee.number || ""}</TableBodyCell>
                <TableBodyCell>{employee.direction || ""}</TableBodyCell>
                <TableBodyCell><Badge color={banksColors[employee.bank?.toUpperCase() || ""]}>{employee.bank || ""}</Badge></TableBodyCell>
                <TableBodyCell>{employee.infonavitNo || ""}</TableBodyCell>
                <TableBodyCell>{employee.infonavitDiscount || ""}</TableBodyCell>
                <TableBodyCell>{employee.positionType || ""}</TableBodyCell>
                <TableBodyCell>{formatDate(employee.cim || "")}</TableBodyCell>
                <TableBodyCell>{employee.shift || ""}</TableBodyCell>
                <TableBodyCell>{employee.nominaSalary || ""}</TableBodyCell>
                <TableBodyCell>{employee.immsSalary || ""}</TableBodyCell>
                <TableBodyCell>{employee.nationality || ""}</TableBodyCell>
                <TableBodyCell>{employee.civilStatus || ""}</TableBodyCell>
                <TableBodyCell>{formatDate(employee.bornDate)}</TableBodyCell>
                <TableBodyCell>{employee.studies || ""}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<EmployeeForm bind:show bind:selectedEmployee reload={getEmployees} />
<EmployeeCard bind:show={show1} bind:selectedEmployee {positions} {areas} />
<QuitEmployeeForm bind:show={show2} bind:selectedEmployee reload={getEmployees} />
<ReactivateForm bind:show={show3} bind:selectedEmployee reload={getEmployees} />
