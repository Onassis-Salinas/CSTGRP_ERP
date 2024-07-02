<script lang="ts">
    import PieChart from "./../../components/charts/PieChart.svelte";
    import { Badge, Button, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import RadialChart from "./../../components/charts/RadialChart.svelte";
    import { Card, Input, Select } from "flowbite-svelte";
    import api from "../../utils/server";
    import { setLocation } from "../../utils/location";
    import LineChart from "../../components/charts/LineChart.svelte";
    import { showSuccess } from "../../utils/showToast";
    import { getDayNumber } from "../../utils/functions";
    import { formatDate } from "../../utils/functions";
    import { ImageOutline } from "flowbite-svelte-icons";

    setLocation();

    let employeeTemplate: any;
    let activeEmployees: any;
    let dailyIncidences: any[] = [];
    let areaIncidences: any[] = [];
    let assistance: any[] = [];
    let selectedDate = new Date().toISOString().split("T")[0];
    let areaSelected = "1";
    let areas: any[] = [];
    let dailyIncidencesList: any[] = [];
    let birthDays: any[] = [];

    $: textDate = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"][getDayNumber(selectedDate)] + " " + selectedDate.split("-")[2] + " de " + ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][parseInt(selectedDate.split("-")[1])];

    async function fetchConstData() {
        areas = (await api.get("/hrvarious/areas")).data;
        employeeTemplate = (await api.get("/hrstats/employeetemplate")).data[0].value;
        activeEmployees = (await api.get("/hrstats/activeemployees")).data[0].count;
        await getDailyData();
    }

    async function getDailyData() {
        assistance = (await api.get("/hrstats/assistance/" + selectedDate)).data;
        dailyIncidences = (await api.get("/hrstats/assistanceinfo/" + selectedDate)).data;
        areaIncidences = (await api.get(`/hrstats/areaassistanceinfo?areaId=${areaSelected}&date=${selectedDate}`)).data;
        dailyIncidencesList = (await api.get(`/hrstats/dailyincidenceslist/${selectedDate}`)).data;
        birthDays = (await api.get(`/hrstats/birthdays/${selectedDate}`)).data;
    }

    fetchConstData();

    async function updateTemplate() {
        await api.put("employees/template", { template: parseInt(employeeTemplate) });
        showSuccess("Plantilla actualizada");
    }

    async function getBirthdayPhoto(id) {
        const response = await api.get("/hrvarious/birthdayphoto", {
            responseType: "arraybuffer",
            params: {
                noEmpleado: id,
            },
        });

        const blob = new Blob([response.data], { type: "image/jpeg" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.target = "_blank";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
</script>

<div class="flex justify-between">
    <div class="flex gap-4 items-center w-fit mb-4">
        <h5 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Fecha:</h5>
        <Input class="w-fit shadow-sm" size="sm" type="date" bind:value={selectedDate} on:change={getDailyData}></Input>
    </div>
    <Input class="h-fit w-fit font-semibold" size="sm" value={textDate}></Input>
</div>

<div class="grid grid-cols-3 place-items-stretch gap-4">
    <Card class="col-span-2 max-w-full w-full min-h-96">
        <div class="flex justify-between flex-col">
            <h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">Asistencia</h5>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400"></p>
        </div>
        <div class="h-full">
            <LineChart name="Asistencia" data={assistance}></LineChart>
        </div>
    </Card>

    <Card class="w-full max-w-full col-span-1 h-[30rem]">
        <div class="flex justify-between items-start w-full mb-8">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Lista de incidencias</h5>
        </div>
        <Table>
            <TableHead class="bg-gray-100 sticky top-0">
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Incidencia</TableHeadCell>
                <!-- <TableHeadCell>Area</TableHeadCell> -->
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each dailyIncidencesList as row}
                    <TableBodyRow>
                        <TableBodyCell tdClass="whitespace-pre-wrap px-4 py-4">{row.name}</TableBodyCell>
                        <TableBodyCell tdClass="px-4 py-4"><Badge color="pink">{row.incidence}</Badge></TableBodyCell>
                        <!-- <TableBodyCell tdClass="px-4 py-4">{row.areaId}</TableBodyCell> -->
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </Card>

    <Card class="w-full max-w-full">
        <div class="flex justify-between flex-col">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Empleados</h5>

            <p class="text-base font-normal text-gray-500 dark:text-gray-400 flex h-10 items-center">{activeEmployees} / <Input on:blur={updateTemplate} bind:value={employeeTemplate} size="sm" class="ml-1 w-10 p-0 text-center !text-base font-normal text-gray-500 dark:text-gray-400" /></p>
        </div>

        <div class="h-80 mt-0">
            {#if employeeTemplate && activeEmployees}
                <RadialChart progress={parseInt(activeEmployees) / parseInt(employeeTemplate)} name="Plantilla"></RadialChart>
            {/if}
        </div>
    </Card>

    <Card class="w-full max-w-full">
        <div class="flex justify-between items-start w-full">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Incidencias diarias</h5>
        </div>

        <div class="h-80 mt-10">
            {#if dailyIncidences[0]}
                <PieChart data={dailyIncidences}></PieChart>
            {/if}
        </div>
    </Card>

    <Card class="w-full max-w-full">
        <div class="flex justify-between items-start w-full">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Incidencias diarias por area</h5>
        </div>

        <div class="min-h-80 mt-10">
            <PieChart data={areaIncidences}></PieChart>
        </div>

        <div class="flex gap-2 items-center">
            <Select size="sm" class="text-xs" items={areas} bind:value={areaSelected} on:change={getDailyData} />
        </div>
    </Card>

    <Card class="max-w-full w-full min-h-96"></Card>

    <Card class="col-span-2 max-w-full w-full min-h-96">
        <div class="flex justify-between items-start w-full mb-8">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Cumpleaños del mes</h5>
        </div>
        <Table>
            <TableHead class="bg-gray-100 sticky top-0">
                <TableHeadCell></TableHeadCell>
                <TableHeadCell>No. Empleado</TableHeadCell>
                <TableHeadCell>Nombre</TableHeadCell>
                <TableHeadCell>Cumpleaños</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each birthDays as row}
                    <TableBodyRow>
                        <TableBodyCell><Button class="sm px-3 py-1.5" on:click={() => getBirthdayPhoto(row.noEmpleado)}><ImageOutline /></Button></TableBodyCell>

                        <TableBodyCell tdClass="whitespace-pre-wrap px-4 py-4">{row.noEmpleado}</TableBodyCell>
                        <TableBodyCell>{row.name}</TableBodyCell>
                        <TableBodyCell>{formatDate(row.bornDate)}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </Card>
</div>
