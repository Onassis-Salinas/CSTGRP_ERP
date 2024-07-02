<script lang="ts">
    import { Button, Dropdown, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import api from "../../utils/server";
    import { DotsVerticalOutline, EditOutline, PlusOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { setLocation } from "../../utils/location";
    import type { position } from "../../schemas/structure.models";
    import DeletePopUp from "../../components/complex/DeletePopUp.svelte";
    import { showSuccess } from "../../utils/showToast";
    import PositionsForm from "../../components/complex/PositionsForm.svelte";

    setLocation();
    let show: boolean;
    let show1: boolean;
    let selectedPosition: position = {};

    let positions: position[] = [];

    async function getPositions() {
        const result = await api.get("/positions");
        positions = result.data;
    }
    getPositions();

    function editPosition(i: number) {
        selectedPosition = positions[i];
        show = true;
    }
    function createPosition() {
        selectedPosition = {};
        show = true;
    }
    function deletePosition(i: number) {
        selectedPosition = positions[i];
        show1 = true;
    }
</script>

<div class="flex justify-between mb-6">
    <div>
        <Button size="sm" on:click={createPosition}><PlusOutline class="mr-2" />Añadir posicion</Button>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20" theadClass="relative">
        <TableHeadCell class="p-1 fixed left-0 z-30 bg-inherit"></TableHeadCell>
        <TableHeadCell class="w-full">Nombre</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each positions as position, i}
            <TableBodyRow>
                <TableBodyCell tdClass="px-0 sticky left-0 bg-inherit">
                    <Button size="xs" color="none" class="p-0 h-full w-10">
                        <DotsVerticalOutline />
                    </Button>
                    <Dropdown containerClass="z-[999] flex gap-2" placement="right" class="p-2 flex gap-2">
                        <Button size="xs" on:click={() => editPosition(i)}><EditOutline />Editar</Button>
                        <Button size="xs" on:click={() => deletePosition(i)} color="red"><TrashBinOutline />Eliminar</Button>
                    </Dropdown>
                </TableBodyCell>
                <TableBodyCell>{position.name}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<PositionsForm bind:show bind:selectedPosition reload={getPositions} />
<DeletePopUp
    bind:show={show1}
    text="Borrar posicion"
    deleteFunc={async () => {
        await api.delete("positions", { data: { id: parseInt(selectedPosition.id || "") } });
        showSuccess("Posicion eliminada");
        show1 = false;
    }}
/>
