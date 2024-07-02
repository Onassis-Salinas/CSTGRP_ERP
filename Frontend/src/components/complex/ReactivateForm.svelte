<script lang="ts">
    import { UserAddOutline } from "flowbite-svelte-icons";
    import type { employee } from "../../schemas/hr.models";
    import { Button, Modal, Label, Input, Select } from "flowbite-svelte";
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast";
    export let show = false;
    export let selectedEmployee: employee;
    export let reload: any;

    let areas: any;
    let positions: any;

    async function fetchOptions() {
        areas = (await api.get("/hrvarious/areas")).data;
        positions = (await api.get("/hrvarious/positions")).data;
    }
    fetchOptions();

    let formData: employee = {
        id: selectedEmployee.id,
        admissionDate: new Date().toISOString().split("T")[0],
    };

    async function handleSubmmit() {
        await api.put("/employees/reactivate", {
            ...formData,
            id: parseInt(selectedEmployee.id || "0"),
            positionId: parseInt(formData.positionId || "0"),
            areaId: parseInt(formData.areaId || "0"),
        });

        showSuccess("Empleado dado de baja");
        formData = {
            id: "",
            admissionDate: "",
            positionId: "",
            areaId: "",
        };

        show = false;
        await reload();
    }
</script>

<Modal bind:open={show} size="sm" class="w-full ">
    <div class="text-center">
        <UserAddOutline class="mx-auto mb-2 text-gray-400 w-16 h-16 dark:text-gray-200" />
        <h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">Recontratar a:</h3>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{selectedEmployee.name} - {selectedEmployee.noEmpleado}</h3>
    </div>
    <form class="flex flex-col space-y-6" action="#">
        <Label class="space-y-2">
            <span>Fecha de Alta</span>
            <Input type="date" bind:value={formData.admissionDate} />
        </Label>
        <Label class="space-y-2">
            <span>Area</span>
            <Select items={areas} bind:value={formData.areaId} placeholder="Elige una opcion" />
        </Label>
        <Label class="space-y-2">
            <span>Posicion</span>
            <Select items={positions} bind:value={formData.positionId} placeholder="Elige una opcion" />
        </Label>
        <div class="text-center">
            <Button on:click={handleSubmmit} class="me-2">Recontratar</Button>
            <Button on:click={() => (show = false)} color="alternative">Cancelar</Button>
        </div>
    </form>
</Modal>
