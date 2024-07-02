<script lang="ts">
    import { Button, Dropdown, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import api from "../../utils/server";
    import { CheckOutline, DotsVerticalOutline, EditOutline, PlusOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { setLocation } from "../../utils/location";
    import type { area } from "../../schemas/structure.models";
    import AreaForm from "../../components/complex/AreaForms.svelte";
    import DeletePopUp from "../../components/complex/DeletePopUp.svelte";
    import { showSuccess } from "../../utils/showToast";

    setLocation();
    let show: boolean;
    let show1: boolean;
    let selectedArea: area = {};

    let areas: area[] = [];

    async function getAreas() {
        const result = await api.get("/areas");
        areas = result.data;
    }
    getAreas();

    function editArea(i: number) {
        selectedArea = areas[i];
        show = true;
    }
    function createArea() {
        selectedArea = {};
        show = true;
    }
    function deleteArea(i: number) {
        selectedArea = areas[i];
        show1 = true;
    }
</script>

<div class="flex justify-between mb-6">
    <div>
        <Button size="sm" on:click={createArea}><PlusOutline class="mr-2" />Añadir area</Button>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20" theadClass="relative">
        <TableHeadCell class="p-1 fixed left-0 z-30 bg-inherit"></TableHeadCell>
        <TableHeadCell class="w-full">Nombre</TableHeadCell>
        <TableHeadCell>Captura</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each areas as area, i}
            <TableBodyRow>
                <TableBodyCell tdClass="px-0 sticky left-0 bg-inherit">
                    <Button size="xs" color="none" class="p-0 h-full w-10">
                        <DotsVerticalOutline />
                    </Button>
                    <Dropdown containerClass="z-[999] flex gap-2" placement="right" class="p-2 flex gap-2">
                        <Button size="xs" on:click={() => editArea(i)}><EditOutline />Editar</Button>
                        <Button size="xs" on:click={() => deleteArea(i)} color="red"><TrashBinOutline />Eliminar</Button>
                    </Dropdown>
                </TableBodyCell>
                <TableBodyCell>{area.name}</TableBodyCell>
                <TableBodyCell>
                    {#if area.captured}
                        <CheckOutline />
                    {/if}
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<AreaForm bind:show bind:selectedArea reload={getAreas} />
<DeletePopUp
    bind:show={show1}
    text="Borrar area"
    deleteFunc={async () => {
        await api.delete("areas", { data: { id: parseInt(selectedArea.id || "") } });
        showSuccess("Area eliminada");
        show1 = false;
    }}
/>
