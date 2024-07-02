<script lang="ts">
    import { Badge, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import { Card, Input } from "flowbite-svelte";
    import api from "../../utils/server";
    import { setLocation } from "../../utils/location";
    import { getDayNumber } from "../../utils/functions";

    setLocation();

    let warnings: any[] = [];
    let outOfStock: any[] = [];
    let selectedDate = new Date().toISOString().split("T")[0];

    $: textDate = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"][getDayNumber(selectedDate)] + " " + selectedDate.split("-")[2] + " de " + ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"][parseInt(selectedDate.split("-")[1])];

    async function fetchConstData() {
        warnings = (await api.get("/inventorystats/stockwarnings")).data;
        outOfStock = (await api.get("/inventorystats/outofstock")).data;
    }

    fetchConstData();
</script>

<div class="flex justify-between">
    <div class="flex gap-4 items-center w-fit mb-4">
        <h5 class="text-lg font-semibold leading-none text-gray-900 dark:text-white">Fecha:</h5>
        <Input class="w-fit shadow-sm" size="sm" type="date" bind:value={selectedDate}></Input>
    </div>
    <Input class="h-fit w-fit font-semibold" size="sm" value={textDate}></Input>
</div>

<div class="grid grid-cols-3 place-items-stretch gap-4">
    <Card class="w-full max-w-full col-span-2 h-[30rem]">
        <div class="flex justify-between items-start w-full mb-8">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">En minimos</h5>
        </div>
        <Table>
            <TableHead class="bg-gray-100 sticky top-0">
                <TableHeadCell>Codigo</TableHeadCell>
                <TableHeadCell>Cantidad</TableHeadCell>
                <TableHeadCell>Minimo</TableHeadCell>
                <TableHeadCell>Medida</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each warnings as row}
                    <TableBodyRow>
                        <TableBodyCell tdClass="whitespace-pre-wrap px-4 py-4">{row.code}</TableBodyCell>
                        <TableBodyCell tdClass="px-4 py-4"><Badge color={row.amount <= 0 ? "red" : "yellow"}>{row.amount}</Badge></TableBodyCell>
                        <TableBodyCell tdClass="px-4 py-4">{row.minAmount}</TableBodyCell>
                        <TableBodyCell tdClass="px-4 py-4">{row.measurement}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </Card>
    <Card class="w-full max-w-full col-span-2 h-[30rem]">
        <div class="flex justify-between items-start w-full mb-8">
            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Stocks negativos despues de completar ordenes</h5>
        </div>
        <Table>
            <TableHead class="bg-gray-100 sticky top-0">
                <TableHeadCell>Codigo</TableHeadCell>
                <TableHeadCell>Cantidad</TableHeadCell>
                <TableHeadCell>Medida</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each outOfStock as row}
                    <TableBodyRow>
                        <TableBodyCell tdClass="whitespace-pre-wrap px-4 py-4">{row.code}</TableBodyCell>
                        <TableBodyCell tdClass="px-4 py-4"><Badge color="pink">{row.amount}</Badge></TableBodyCell>
                        <TableBodyCell tdClass="px-4 py-4">{row.measurement}</TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </Card>
</div>
