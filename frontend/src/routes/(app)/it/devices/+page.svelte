<script lang="ts">
    import { Button, Dropdown, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
    import api from "../../utils/server";
    import { DotsVerticalOutline, EditOutline, PlusCircleOutline, TrashBinOutline } from "flowbite-svelte-icons";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { setLocation } from "../../utils/location";
    import DeletePopUp from "../../components/complex/DeletePopUp.svelte";
    import { showSuccess } from "../../utils/showToast";
    import type { device } from "../../schemas/it.models";
    import DevicesForm from "../../components/complex/DevicesForm.svelte";

    setLocation();
    let show: boolean;
    let show1: boolean;
    let selectedDevice: device = {};

    let devices: device[] = [];

    async function getDevices() {
        const result = await api.get("/devices");
        devices = result.data;
    }
    getDevices();

    function editDevice(i: number) {
        selectedDevice = devices[i];
        show = true;
    }
    function createDevice() {
        selectedDevice = {};
        show = true;
    }
    function deleteDevice(i: number) {
        selectedDevice = devices[i];
        show1 = true;
    }
</script>

<div class="flex justify-between mb-6">
    <div>
        <Button  on:click={createDevice}><PlusCircleOutline class="mr-2 size-4" />Añadir dispositivo</Button>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20" >
        <TableHeadCell class="p-1 fixed left-0 z-30 bg-inherit"></TableHeadCell>
        <TableHeadCell class="w-[20%]">Nombre</TableHeadCell>
        <TableHeadCell class="w-[20%]">Ip</TableHeadCell>
        <TableHeadCell class="w-[20%]">Usuario</TableHeadCell>
        <TableHeadCell class="w-[20%]">Contrasena</TableHeadCell>
        <TableHeadCell class="w-[20%]">Wifi</TableHeadCell>
    </TableHead>
    <TableBody >
        {#each devices as device, i}
            <TableBodyRow>
                <TableBodyCell class="px-0 sticky left-0 bg-inherit">
                    <Button  color="none" class="p-0 h-full w-10">
                        <DotsVerticalOutline />
                    </Button>
                    <Dropdown containerClass="z-[999] flex gap-2" placement="right" class="p-2 flex gap-2">
                        <Button  on:click={() => editDevice(i)}><EditOutline />Editar</Button>
                        <Button  on:click={() => deleteDevice(i)} color="red"><TrashBinOutline />Eliminar</Button>
                    </Dropdown>
                </TableBodyCell>
                <TableBodyCell>{device.name || ""}</TableBodyCell>
                <TableBodyCell>{device.ip || ""}</TableBodyCell>
                <TableBodyCell>{device.user || ""}</TableBodyCell>
                <TableBodyCell>{device.password || ""}</TableBodyCell>
                <TableBodyCell>{device.wifipw || ""}</TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<DevicesForm bind:show bind:selectedDevice reload={getDevices} />
<DeletePopUp
    bind:show={show1}
    text="Borrar posicion"
    deleteFunc={async () => {
        await api.delete("devices", { data: { id: parseInt(selectedDevice.id || "") } });
        showSuccess("Posicion eliminada");
        show1 = false;
    }}
/>
