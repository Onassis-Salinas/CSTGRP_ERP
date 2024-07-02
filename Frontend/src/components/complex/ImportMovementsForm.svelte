<script lang="ts">
    import { Button, Modal, Label, Input, Hr, TableHead, TableHeadCell, TableBody, TableBodyCell, TableBodyRow, Table, Fileupload } from "flowbite-svelte";
    import { TrashBinOutline } from "flowbite-svelte-icons";
    import api from "../../utils/server";
    import type { importMovement } from "../../schemas/inventory.models";
    import MaterialInput from "../basic/MaterialInput.svelte";
    import { showSuccess } from "../../utils/showToast";
    export let show: boolean;
    export let reload: any;

    interface material {
        code: string;
        amount: string;
        measurement: string;
    }

    let materials: material[] = [];
    let formData: importMovement = {};
    let files: any;
    $: inputDisabled = !!files;
    $: if (files) processPDF();
    $: if (!show) cleanData();

    async function handleSubmit() {
        await api.post("/materialmovements/import", {
            ...formData,
            materials,
        });
        reload();
        show = false;
        showSuccess(`Importacion ${formData.import} Registrada`);
    }

    async function processPDF() {
        const form = new FormData();
        form.append("file", files[0]);

        const result = (await api.post("/inventoryvarious/importpdf", form)).data;
        formData.import = result.importNum;
        formData.due = result.dueDate;
        materials = result.materials;
    }

    function addMaterial() {
        materials.push({ code: "", measurement: "", amount: "" });
        materials = materials;
    }
    function deleteMaterial(i: number) {
        materials.splice(i, 1);
        materials = materials;
    }

    function cleanData() {
        materials = [];
        formData = {};
        files = null;
        inputDisabled = false;
    }
</script>

<Modal title={"Registrar Entrada"} bind:open={show} size="lg" class="w-full ">
    <div class="grid grid-cols-3 w-full gap-4">
        <Label class="space-y-2">
            <span>Importacion</span>
            <Input disabled={inputDisabled} name="text" bind:value={formData.import} />
        </Label>
        <Label class="space-y-2">
            <span>Fecha</span>
            <Input type="date" bind:value={formData.due} />
        </Label>
        <Label class="space-y-2">
            <span>Archivo</span>
            <Fileupload bind:files />
        </Label>
    </div>

    <Hr />

    <Table>
        <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20 w-full" theadClass="relative">
            <TableHeadCell class="">Codigo</TableHeadCell>
            <TableHeadCell class="">Cantidad</TableHeadCell>
            <TableHeadCell class="">Medida</TableHeadCell>
            <TableHeadCell class="p-0 w-1"></TableHeadCell>
        </TableHead>

        <TableBody tableBodyClass="divide-y">
            {#each materials as material, i}
                <TableBodyRow>
                    <TableBodyCell tdClass=""><MaterialInput size="sm" bind:value={materials[i].code} bind:measurement={materials[i].measurement} /></TableBodyCell>
                    <TableBodyCell tdClass=""><Input size="sm" type="number" bind:value={materials[i].amount} /></TableBodyCell>
                    <TableBodyCell tdClass="w-6"><Input class="!opacity-100" size="sm" disabled bind:value={materials[i].measurement} /></TableBodyCell>
                    <TableBodyCell tdClass="flex justify-center h-9"><Button on:click={() => deleteMaterial(i)} color="red" class="p-1 aspect-square"><TrashBinOutline /></Button></TableBodyCell>
                </TableBodyRow>
            {/each}
            <TableBodyRow>
                <TableBodyCell colspan="4" tdClass=""><Button on:click={addMaterial} class="w-full" color="light" size="sm">Anadir material</Button></TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>

    <Button on:click={handleSubmit} type="submit" class="w-full mt-4">Guardar cambios</Button>
</Modal>
