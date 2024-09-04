<script lang="ts">
    import ProductivityForm from "./../../components/complex/ProductivityForm.svelte";
    import { Badge, Input, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Button } from "flowbite-svelte";
    import { setLocation } from "../../utils/location";
    import api from "../../utils/server";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { getWeekDays, formatDate } from "../../utils/functions";
    import type { productivity } from "../../schemas/hr.models";
    import { BookOpenOutline, BookOutline, EditOutline } from "flowbite-svelte-icons";
    import ExportProductivity from "../../components/complex/ExportProductivity.svelte";
    setLocation();

    let productivity: productivity[] = [];
    let separatedProductivity: any = {};
    let show = false;
    let areas: any = {};
    let positions: any = {};
    let incidences: any = {};
    let incidencesList: any = [];
    let dateSelected: any = new Date().toISOString().split("T")[0];
    let viewComplete = false;
    let weekDays: string[] = [];

    async function getProductivity() {
        productivity = (await api.get("/productivity/" + dateSelected)).data;

        productivity = productivity.map((row) => {
            const codes = [row["0goal2"] ? 3 : row["0goal1"] ? 2 : row["0goal0"] ? 1 : 1, row["1goal2"] ? 3 : row["1goal1"] ? 2 : row["1goal0"] ? 1 : 1, row["2goal2"] ? 3 : row["2goal1"] ? 2 : row["2goal0"] ? 1 : 1, row["3goal2"] ? 3 : row["3goal1"] ? 2 : row["3goal0"] ? 1 : 1, row["4goal2"] ? 3 : row["4goal1"] ? 2 : row["4goal0"] ? 1 : 1];
            return {
                ...row,
                "0average": Math.round((((parseInt(row["0produced0"]) || 0) / (parseInt(row["0goal0"]) || 1) + (parseInt(row["0produced1"]) || 0) / (parseInt(row["0goal1"]) || 1) + (parseInt(row["0produced2"]) || 0) / (parseInt(row["0goal2"]) || 1)) / codes[0]) * 100),
                "1average": Math.round((((parseInt(row["1produced0"]) || 0) / (parseInt(row["1goal0"]) || 1) + (parseInt(row["1produced1"]) || 0) / (parseInt(row["1goal1"]) || 1) + (parseInt(row["1produced2"]) || 0) / (parseInt(row["1goal2"]) || 1)) / codes[1]) * 100),
                "2average": Math.round((((parseInt(row["2produced0"]) || 0) / (parseInt(row["2goal0"]) || 1) + (parseInt(row["2produced1"]) || 0) / (parseInt(row["2goal1"]) || 1) + (parseInt(row["2produced2"]) || 0) / (parseInt(row["2goal2"]) || 1)) / codes[2]) * 100),
                "3average": Math.round((((parseInt(row["3produced0"]) || 0) / (parseInt(row["3goal0"]) || 1) + (parseInt(row["3produced1"]) || 0) / (parseInt(row["3goal1"]) || 1) + (parseInt(row["3produced2"]) || 0) / (parseInt(row["3goal2"]) || 1)) / codes[3]) * 100),
                "4average": Math.round((((parseInt(row["4produced0"]) || 0) / (parseInt(row["4goal0"]) || 1) + (parseInt(row["4produced1"]) || 0) / (parseInt(row["4goal1"]) || 1) + (parseInt(row["4produced2"]) || 0) / (parseInt(row["4goal2"]) || 1)) / codes[4]) * 100),
            };
        });

        separatedProductivity = {};
        productivity.map((row) => {
            if (!separatedProductivity[row.areaId]) separatedProductivity[row.areaId] = [];
            separatedProductivity[row.areaId].push(row);
        });

        const mondayDate = new Date(getWeekDays(dateSelected)[0]);

        weekDays = [];
        for (let i = 0; i < 5; i++) {
            mondayDate.setDate(mondayDate.getDate() + (i > 0 ? 1 : 0));
            weekDays.push(formatDate(mondayDate.toISOString().split("T")[0]));
        }
    }
    getProductivity();

    async function fetchOptions() {
        const areasArray = (await api.get("/hrvarious/areas")).data;
        areasArray.forEach((area: any) => {
            areas[area.value] = area.name;
        });
        const positionsArray = (await api.get("/hrvarious/positions")).data;
        positionsArray.forEach((position: any) => {
            positions[position.value] = position.name;
        });
        const incidencesArray = (await api.get("/hrvarious/incidences")).data;
        incidencesArray.forEach((incidence: any) => {
            incidences[incidence.value] = incidence.name;
        });
        incidencesList = incidencesArray;
    }
    fetchOptions();

    function getColors(number: number) {
        if (number < 51) return "red";
        if (number < 100) return "yellow";
        if (number < 150) return "green";
        return "blue";
    }
</script>

<div class="flex justify-between mb-4">
    <div class="flex gap-2">
        <Input size="sm" type="date" bind:value={dateSelected} on:change={getProductivity} />
        {#if viewComplete}
            <Button class="flex-none" size="sm" on:click={() => (viewComplete = !viewComplete)}><BookOutline class="mr-2" />Ver resumen</Button>
        {:else}
            <Button class="flex-none" size="sm" on:click={() => (viewComplete = !viewComplete)}><BookOpenOutline class="mr-2" />Ver todo</Button>
        {/if}
    </div>
    <div class="flex gap-2">
        <Button size="sm" on:click={() => (show = true)}><EditOutline class="mr-2" />Capturar</Button>
        <ExportProductivity productivity={separatedProductivity} {areas} {positions} {weekDays} />
    </div>
</div>

<div class="flex flex-col gap-8">
    <CusTable>
        {#each Object.keys(separatedProductivity) as areaId, i}
            {#if i > 0}
                <TableHead class="border-t h-10 w-full "></TableHead>
            {/if}
            <TableHead class=" text-md text-left text-gray-100 uppercase bg-primary-700 sticky top-0 z-30" theadClass="relative">
                <TableHeadCell colspan={100} class="rounded-t-lg">{areas[areaId]}</TableHeadCell>
            </TableHead>
            <TableHead class="text-center text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 z-20" theadClass="relative">
                <TableHeadCell colspan={4}>Semana</TableHeadCell>

                {#each weekDays as day}
                    <TableHeadCell colspan={viewComplete ? 12 : 1}>{day}</TableHeadCell>
                {/each}
            </TableHead>

            <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 z-20" theadClass="relative">
                <TableHeadCell>Promedio</TableHeadCell>
                <TableHeadCell>No. Empleado</TableHeadCell>
                <TableHeadCell class="w-full">Nombre</TableHeadCell>
                <TableHeadCell>Posicion</TableHeadCell>

                {#each weekDays as day}
                    {#if viewComplete}
                        <TableHeadCell></TableHeadCell>
                        <TableHeadCell colspan="3">Operacion 1</TableHeadCell>
                        <TableHeadCell colspan="3">Operacion 2</TableHeadCell>
                        <TableHeadCell colspan="3">Operacion 3</TableHeadCell>
                    {/if}
                    <TableHeadCell colspan={viewComplete ? 2 : 1}></TableHeadCell>
                {/each}
            </TableHead>
            <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 z-20" theadClass="relative">
                <TableHeadCell colspan="4"></TableHeadCell>

                {#each weekDays as day}
                    {#if viewComplete}
                        <TableHeadCell>Incidencia</TableHeadCell>
                        <TableHeadCell>Codigo</TableHeadCell>
                        <TableHeadCell>Meta</TableHeadCell>
                        <TableHeadCell>Producido</TableHeadCell>
                        <TableHeadCell>Codigo</TableHeadCell>
                        <TableHeadCell>Meta</TableHeadCell>
                        <TableHeadCell>Producido</TableHeadCell>
                        <TableHeadCell>Codigo</TableHeadCell>
                        <TableHeadCell>Meta</TableHeadCell>
                        <TableHeadCell>Producido</TableHeadCell>
                        <TableHeadCell>Comentario</TableHeadCell>
                    {/if}
                    <TableHeadCell>Promedio</TableHeadCell>
                {/each}
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each separatedProductivity[areaId] as row}
                    <TableBodyRow>
                        <TableBodyCell><Badge color={getColors((row["0average"] + row["1average"] + row["2average"] + row["3average"] + row["4average"]) / 5)}>{(row["0average"] + row["1average"] + row["2average"] + row["3average"] + row["4average"]) / 5}%</Badge></TableBodyCell>
                        <TableBodyCell>{row.noEmpleado}</TableBodyCell>
                        <TableBodyCell>{row.name}</TableBodyCell>
                        <TableBodyCell><Badge color="purple">{positions[row.positionId || ""] || ""}</Badge></TableBodyCell>

                        {#each weekDays as day, j}
                            {#if viewComplete}
                                <TableBodyCell>{incidences[row["incidenceId" + j] || ""]}</TableBodyCell>
                                <TableBodyCell>{row[j + "code0"] || ""}</TableBodyCell>
                                <TableBodyCell>{row[j + "goal0"] || ""}</TableBodyCell>
                                <TableBodyCell>{row[j + "produced0"] || ""}</TableBodyCell>

                                <TableBodyCell>{row[j + "code1"] || ""}</TableBodyCell>
                                <TableBodyCell>{row[j + "goal1"] || ""}</TableBodyCell>
                                <TableBodyCell>{row[j + "produced1"] || ""}</TableBodyCell>

                                <TableBodyCell>{row[j + "code2"] || ""}</TableBodyCell>
                                <TableBodyCell>{row[j + "goal2"] || ""}</TableBodyCell>
                                <TableBodyCell>{row[j + "produced2"] || ""}</TableBodyCell>

                                <TableBodyCell>{row[j + "comment"] || ""}</TableBodyCell>
                            {/if}
                            <TableBodyCell><Badge color={getColors(row[j + "average"])}>{row[j + "average"]}%</Badge></TableBodyCell>
                        {/each}
                    </TableBodyRow>
                {/each}
            </TableBody>
        {/each}
    </CusTable>
</div>

<ProductivityForm bind:show productivity={separatedProductivity} {areas} reload={getProductivity} />
