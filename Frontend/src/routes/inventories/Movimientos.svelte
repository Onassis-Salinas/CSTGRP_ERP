<script lang="ts">
    import { Button, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, Input, Checkbox } from "flowbite-svelte";
    import { EditOutline, SearchOutline } from "flowbite-svelte-icons";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { setLocation } from "../../utils/location";
    import ImportMovementsForm from "../../components/complex/ImportMovementsForm.svelte";
    import ExportMovementsForm from "../../components/complex/ExportMovementsForm.svelte";
    import api from "../../utils/server";
    import type { movement } from "../../schemas/inventory.models";
    import { showSuccess } from "../../utils/showToast";
    import WarningPopUp from "../../components/complex/WarningPopUp.svelte";

    setLocation();

    let show = false;
    let show1 = false;
    let show2 = false;
    let movementI = 0;

    let clients: any = {};

    let filters = {
        programation: "",
        import: "",
        jobpo: "",
        code: "",
    };

    let movements: movement[] = [];

    async function getMovements() {
        const result = (await api.get(`/materialmovements`, { params: filters })).data;

        movements = result.map((e: any) => {
            return { ...e, realAmount: e.realAmount?.toString() };
        });
    }
    getMovements();
    async function fetchClients() {
        const clientList = (await api.get("/inventoryvarious/clients")).data;
        clientList.forEach((client: any) => {
            clients[client.value] = client.name;
        });
        clients = clients;
    }

    function viewCheckModal(i: number) {
        show2 = true;
        movementI = i;
    }

    async function checkMovement() {
        try {
            await api.put("/materialmovements/activate", { id: movements[movementI].id });
            showSuccess("Material surtido");
            show2 = false;
            await getMovements();
        } catch (err: any) {
            if (err.response.status !== 400) throw err;
        }
    }

    async function changeAmount(id: string, amount: string) {
        console.log(amount);
        await api.put("/materialmovements/realamount", { id: id, newAmount: amount });
        showSuccess("Cantidad actualizada");
        await getMovements();
    }
    fetchClients();
</script>

<div class="flex justify-between mb-4">
    <div class="flex justify-between w-full">
        <form class="flex gap-2" on:submit|preventDefault={getMovements} action={""}>
            <Input size="sm" bind:value={filters.import} placeholder="Importacion" />
            <Input size="sm" bind:value={filters.programation} placeholder="Programacion" />
            <Input size="sm" bind:value={filters.jobpo} placeholder="Job" />
            <Input size="sm" bind:value={filters.code} placeholder="Material" />
            <Button type="submit" size="sm"><SearchOutline class="mr-2" />Buscar</Button>
        </form>
        <div class="flex gap-2">
            <Button size="sm" on:click={() => (show = true)}><EditOutline class="mr-2" />Entrada</Button>
            <Button size="sm" on:click={() => (show1 = true)}><EditOutline class="mr-2" />Salida</Button>
        </div>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20 w-full" theadClass="relative">
        <TableHeadCell class="">Importacion</TableHeadCell>
        <TableHeadCell class="">Programacion</TableHeadCell>
        <TableHeadCell class="">Job-PO</TableHeadCell>
        <TableHeadCell class="">Codigo</TableHeadCell>
        <TableHeadCell class="">Descripcion</TableHeadCell>
        <TableHeadCell class="">Cantidad sobrante</TableHeadCell>
        <TableHeadCell class="">Cantidad</TableHeadCell>
        <TableHeadCell class="">Cantidad Real</TableHeadCell>
        <TableHeadCell class="">Medida</TableHeadCell>
        <TableHeadCell class="">Cliente</TableHeadCell>
        <TableHeadCell class="">Surtido</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each movements as movement, i}
            <TableBodyRow>
                <TableBodyCell>{movement.import || ""}</TableBodyCell>
                <TableBodyCell>{movement.programation || ""}</TableBodyCell>
                <TableBodyCell>{movement.jobpo || ""}</TableBodyCell>
                <TableBodyCell>{movement.code}</TableBodyCell>
                <TableBodyCell tdClass="w-full">{movement.description}</TableBodyCell>
                <TableBodyCell><Badge color={parseFloat(movement.leftoverAmount) >= 0 ? "primary" : "red"}>{movement.leftoverAmount}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={parseFloat(movement.amount) >= 0 ? "green" : "red"}>{movement.amount}</Badge></TableBodyCell>

                <TableBodyCell tdClass=""><Input class="w-24" type="number" size="sm" bind:value={movement.realAmount} on:blur={() => changeAmount(movement.id, movement.realAmount)} /></TableBodyCell>
                <TableBodyCell>{movement.measurement}</TableBodyCell>
                <TableBodyCell><Badge color="indigo">{clients[movement.clientId]}</Badge></TableBodyCell>
                <TableBodyCell
                    ><Checkbox
                        checked={movement.active}
                        on:change={() => {
                            movement.active = movement.active;
                            if (!movement.active) viewCheckModal(i);
                        }}
                    /></TableBodyCell
                >
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<ImportMovementsForm bind:show reload={getMovements} />
<ExportMovementsForm bind:show={show1} reload={getMovements} />
<WarningPopUp bind:show={show2} action={checkMovement} text={`Seguro que quieres surtir ${movements[movementI]?.realAmount} ${movements[movementI]?.measurement} del material ${movements[movementI]?.code} ?`} />
