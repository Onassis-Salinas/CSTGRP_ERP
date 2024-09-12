<script lang="ts">
    import type { assistance } from "../../schemas/hr.models";
    import { Badge, Button, Input, Select, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { setLocation } from "../../utils/location";
    import api from "../../utils/server";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { PlusCircleOutline } from "flowbite-svelte-icons";
    import { showSuccess } from "../../utils/showToast";
    import ExportAssistance from "../../components/complex/ExportAssistance.svelte";
    import Cookies from "js-cookie";
    setLocation();

    let assistances: assistance[] = [];
    let areas: any = {};
    let positions: any = {};
    let incidences: any = {};
    let incidencesList: any = [];
    let areasList: any = [];
    let dateSelected: any = new Date().toISOString().split("T")[0];
    let areaSelected: string = "";

    async function getAssistance() {
        assistances = (await api.get("/assistance/week/" + dateSelected)).data;
    }
    getAssistance();

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
        if (Cookies.get("perm_assistance_areas") === "Todas") return (areasList = areasArray);

        const accessibleAreas = Cookies.get("perm_assistance_areas")?.split(",");
        areasList = areasArray.filter((area: any) => {
            return accessibleAreas?.includes(area.value);
        });
    }
    fetchOptions();

    $: filteredAssistances = assistances.filter((e) => {
        return e.areaId === areaSelected;
    });

    async function editAssistance(i: number) {
        await api.put("assistance", {
            ...filteredAssistances[i],
            id: parseInt(filteredAssistances[i].id || ""),
            incidenceId0: parseInt(filteredAssistances[i].incidenceId0 || ""),
            incidenceId1: parseInt(filteredAssistances[i].incidenceId1 || ""),
            incidenceId2: parseInt(filteredAssistances[i].incidenceId2 || ""),
            incidenceId3: parseInt(filteredAssistances[i].incidenceId3 || ""),
            incidenceId4: parseInt(filteredAssistances[i].incidenceId4 || ""),
        });
    }

    async function createWeek() {
        await api.post("/assistance", {
            date: dateSelected,
        });
        showSuccess("Semana generada");
        getAssistance();
    }
</script>

<div class="flex justify-between mb-4">
    <div class=" flex gap-2">
        <Select  class="text-xs" placeholder="Eligir Area" items={areasList} bind:value={areaSelected} />
        <Input  type="date" bind:value={dateSelected} on:change={getAssistance} />
    </div>
    <div class="flex gap-2">
        {#if Cookies.get("perm_assistance_areas") === "Todas"}
            <ExportAssistance date={dateSelected} />
            <Button  on:click={createWeek}><PlusCircleOutline class="mr-2 size-4" />Generar semana</Button>
        {/if}
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20" >
        <TableHeadCell class="w-[1%]">No. Empleado</TableHeadCell>
        <TableHeadCell class="w-[20%]">Nombre</TableHeadCell>
        <TableHeadCell class="w-[1%]">Area</TableHeadCell>
        <TableHeadCell class="w-[1%]">Posicion</TableHeadCell>
        <TableHeadCell class="w-[10%]">Lunes</TableHeadCell>
        <TableHeadCell class="w-[10%]">Martes</TableHeadCell>
        <TableHeadCell class="w-[10%]">Miercoles</TableHeadCell>
        <TableHeadCell class="w-[10%]">Jueves</TableHeadCell>
        <TableHeadCell class="w-[10%]">Viernes</TableHeadCell>
    </TableHead>
    <TableBody >
        {#each filteredAssistances as assistance, i}
            <TableBodyRow>
                <TableBodyCell>{assistance.noEmpleado}</TableBodyCell>
                <TableBodyCell>{assistance.name}</TableBodyCell>
                <TableBodyCell><Badge color={assistance.areaId === "1" ? "dark" : "blue"}>{areas[assistance.areaId || ""]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color="purple">{positions[assistance.positionId || ""] || ""}</Badge></TableBodyCell>
                <TableBodyCell class="px-1">
                    <Select  items={incidencesList} bind:value={filteredAssistances[i].incidenceId0} on:change={() => editAssistance(i)} />
                </TableBodyCell>
                <TableBodyCell class="px-1">
                    <Select  items={incidencesList} bind:value={filteredAssistances[i].incidenceId1} on:change={() => editAssistance(i)} />
                </TableBodyCell>
                <TableBodyCell class="px-1">
                    <Select  items={incidencesList} bind:value={filteredAssistances[i].incidenceId2} on:change={() => editAssistance(i)} />
                </TableBodyCell>
                <TableBodyCell class="px-1">
                    <Select  items={incidencesList} bind:value={filteredAssistances[i].incidenceId3} on:change={() => editAssistance(i)} />
                </TableBodyCell>
                <TableBodyCell class="px-1">
                    <Select  items={incidencesList} bind:value={filteredAssistances[i].incidenceId4} on:change={() => editAssistance(i)} />
                </TableBodyCell>
            </TableBodyRow>
        {/each}
        {#if !filteredAssistances[0]}
            <TableBodyRow>
                <TableBodyCell class="col-span-9 h-10" class="col-span-9 h-10"></TableBodyCell>
                <TableBodyCell class="col-span-9 h-10" class="col-span-9 h-10"></TableBodyCell>
                <TableBodyCell class="col-span-9 h-10" class="col-span-9 h-10"></TableBodyCell>
                <TableBodyCell class="col-span-9 h-10" class="col-span-9 h-10"></TableBodyCell>
                <TableBodyCell class="col-span-9 h-10" class="col-span-9 h-10"></TableBodyCell>
                <TableBodyCell class="col-span-9 h-10" class="col-span-9 h-10"></TableBodyCell>
            </TableBodyRow>
        {/if}
    </TableBody>
</CusTable>
