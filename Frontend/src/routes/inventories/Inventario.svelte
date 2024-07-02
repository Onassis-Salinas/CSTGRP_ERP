<script lang="ts">
    import { Button, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, Input } from "flowbite-svelte";
    import api from "../../utils/server";
    import { ExpandOutline, FileExportOutline } from "flowbite-svelte-icons";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { setLocation } from "../../utils/location";
    import type { material } from "../../schemas/inventory.models";
    import MaterialCard from "../../components/complex/MaterialCard.svelte";

    setLocation();

    let show = false;
    let selectedMaterial: material = { code: "", measurement: "", description: "", minAmount: "", clientId: "", id: "", leftoverAmount: "" };
    let inventory: material[] = [];
    let clients: any = {};

    let filters = {
        code: "",
        clients: [""],
    };

    $: filteredInventory = inventory.filter((material) => {
        if (filters.code) {
            if (filters.code) return material.code?.toUpperCase()?.includes(filters.code.toUpperCase());
        }
        return true;
    });

    async function getInventory() {
        const result = await api.get("/inventory");
        inventory = result.data;
        const clientList = (await api.get("/inventoryvarious/clients")).data;
        clientList.forEach((client: any) => {
            clients[client.value] = client.name;
        });
    }

    getInventory();

    function viewMaterial(i: number) {
        console.log("s");
        selectedMaterial = filteredInventory[i];
        show = true;
    }

    async function exportInventory() {
        const response = await api.get("/inventory/export", {
            responseType: "arraybuffer",
        });

        const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Inventario.xlsx";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }
</script>

<div class="flex justify-between mb-4">
    <div class="flex justify-between w-full">
        <div>
            <Input size="sm" bind:value={filters.code} placeholder="Codigo" />
        </div>
        <div>
            <Button size="sm" on:click={exportInventory}><FileExportOutline class="mr-2" /> Exportar</Button>
        </div>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20 w-full" theadClass="relative">
        <TableHeadCell class="p-1 fixed left-3 z-30 bg-inherit"></TableHeadCell>
        <TableHeadCell class="">Codigo</TableHeadCell>
        <TableHeadCell class="w-full">Descripcion</TableHeadCell>
        <TableHeadCell class="">Cantidad sobrante</TableHeadCell>
        <TableHeadCell class="">Cantidad</TableHeadCell>
        <TableHeadCell class="">Minimo</TableHeadCell>
        <TableHeadCell class="">Medida</TableHeadCell>
        <TableHeadCell class="">Cliente</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each filteredInventory as material, i}
            <TableBodyRow>
                <TableBodyCell tdClass="px-0 sticky left-0 bg-inherit">
                    <Button on:click={() => viewMaterial(i)} size="xs" color="none" class="p-0 h-full w-10">
                        <ExpandOutline />
                    </Button>
                </TableBodyCell>

                <TableBodyCell>{material.code}</TableBodyCell>
                <TableBodyCell>{material.description}</TableBodyCell>
                <TableBodyCell>{material.leftoverAmount}</TableBodyCell>
                <TableBodyCell>{material.amount}</TableBodyCell>
                <TableBodyCell>{material.minAmount}</TableBodyCell>
                <TableBodyCell>{material.measurement}</TableBodyCell>
                <TableBodyCell><Badge color="indigo">{clients[material.clientId]}</Badge></TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<MaterialCard bind:show bind:selectedMaterial />
