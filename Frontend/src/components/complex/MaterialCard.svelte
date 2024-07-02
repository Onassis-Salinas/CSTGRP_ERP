<script lang="ts">
    import { Badge, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import api from "../../utils/server";
    import { formatDate } from "../../utils/functions";
    import type { material } from "../../schemas/inventory.models";
    export let show: boolean;
    export let selectedMaterial: material;

    let movements: any[] = [];

    async function fetchData() {
        movements = (await api.get("materialmovements/material/" + selectedMaterial.id)).data;
        console.log(movements);
    }
    $: if (selectedMaterial.id) {
        fetchData();
    }
</script>

<Modal title={selectedMaterial.code} bind:open={show} outsideclose size="lg">
    <div class="grid grid-cols-2 w-full gap-2"></div>

    <Table>
        <TableHead class="bg-gray-100 sticky top-0">
            <TableHeadCell>job</TableHeadCell>
            <TableHeadCell>Exportacion</TableHeadCell>
            <TableHeadCell>Importacion</TableHeadCell>
            <TableHeadCell>Cantidad Job</TableHeadCell>
            <TableHeadCell>Cantidad real</TableHeadCell>
            <TableHeadCell>Fecha</TableHeadCell>
            <TableHeadCell>Balance</TableHeadCell>
        </TableHead>
        <TableBody tableBodyClass="divide-y">
            {#each movements as row}
                <TableBodyRow>
                    <TableBodyCell tdClass="px-4 py-4">{row.job || ""}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-4">{row.export || ""}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-4">{row.import || ""}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-4"><Badge color={parseInt(row.amount) > 0 ? "green" : "red"}>{row.amount}</Badge></TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-4"><Badge color={parseInt(row.realAmount) > 0 ? "green" : "red"}>{row.realAmount}</Badge></TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-4">{formatDate(row.due)}</TableBodyCell>
                    <TableBodyCell tdClass="px-4 py-4"><Badge color={parseInt(row.balance) > 0 ? "green" : "red"}>{row.balance}</Badge></TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</Modal>
