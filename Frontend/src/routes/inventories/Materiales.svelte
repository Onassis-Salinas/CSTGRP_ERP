<script lang="ts">
    import DeletePopUp from "./../../components/complex/DeletePopUp.svelte";
    import type { material } from "../../schemas/inventory.models";
    import { Button, Dropdown, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, Input } from "flowbite-svelte";
    import api from "../../utils/server";
    import { DotsVerticalOutline, EditOutline, PlusOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { showSuccess } from "../../utils/showToast";
    import { setLocation } from "../../utils/location";
    import MaterialsForm from "../../components/complex/MaterialsForm.svelte";
    setLocation();

    let show: boolean;
    let show1: boolean;
    let selectedMaterial: material = { code: "", measurement: "", description: "", minAmount: "", clientId: "", id: "" };
    let materials: material[] = [];
    let clients: any = {};

    let filters = {
        code: "",
        clients: [""],
    };

    $: filteredMaterials = materials.filter((material) => {
        if (filters.code) {
            if (filters.code) return material.code?.toUpperCase()?.includes(filters.code.toUpperCase());
        }
        return true;
    });

    async function getMaterials() {
        const result = await api.get("/materials");
        materials = result.data;
        const clientList = (await api.get("/inventoryvarious/clients")).data;
        clientList.forEach((client: any) => {
            clients[client.value] = client.name;
        });
    }

    function editMaterial(i: number) {
        selectedMaterial = filteredMaterials[i];
        show = true;
    }
    function createMaterial() {
        selectedMaterial = { code: "", measurement: "", description: "", minAmount: "", clientId: "", id: "" };
        show = true;
    }

    function deleteMaterial(i: number) {
        selectedMaterial = filteredMaterials[i];
        show1 = true;
    }

    async function handleDelete() {
        await api.delete("/materials", { data: { id: parseInt(selectedMaterial.id) } });
        selectedMaterial = { code: "", measurement: "", description: "", minAmount: "", clientId: "", id: "" };
        showSuccess("Usuario eliminado");
        await getMaterials();
        show1 = false;
    }

    getMaterials();
</script>

<div class="flex justify-between mb-4">
    <div class="flex justify-between w-full">
        <div>
            <Input size="sm" bind:value={filters.code} placeholder="Codigo" />
        </div>
        <div>
            <Button size="sm" on:click={createMaterial}><PlusOutline class="mr-2" />Añadir Material</Button>
        </div>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20 w-full" theadClass="relative">
        <TableHeadCell class="p-1 fixed left-3 z-30 bg-inherit"></TableHeadCell>
        <TableHeadCell class="">Codigo</TableHeadCell>
        <TableHeadCell class="w-full">Descripcion</TableHeadCell>
        <TableHeadCell class="">Medida</TableHeadCell>
        <TableHeadCell class="">Cliente</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each filteredMaterials as material, i}
            <TableBodyRow>
                <TableBodyCell tdClass="px-0 sticky left-0 bg-inherit">
                    <Button size="xs" color="none" class="p-0 h-full w-10">
                        <DotsVerticalOutline />
                    </Button>
                    <Dropdown containerClass="z-[999] flex gap-2" placement="right" class="p-2 flex gap-2">
                        <Button size="xs" on:click={() => editMaterial(i)}><EditOutline />Editar</Button>
                        <Button size="xs" on:click={() => deleteMaterial(i)} color="red"><TrashBinOutline />Eliminar</Button>
                    </Dropdown>
                </TableBodyCell>

                <TableBodyCell>{material.code}</TableBodyCell>
                <TableBodyCell>{material.description}</TableBodyCell>
                <TableBodyCell>{material.measurement}</TableBodyCell>
                <TableBodyCell><Badge color="indigo">{clients[material.clientId]}</Badge></TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<MaterialsForm bind:show bind:selectedMaterial reload={getMaterials} />
<DeletePopUp bind:show={show1} text="Eliminar material" deleteFunc={handleDelete} />
