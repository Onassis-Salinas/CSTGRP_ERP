<script lang="ts">
    import { ExclamationCircleOutline } from "flowbite-svelte-icons";
    import type { employee } from "../../schemas/hr.models";
    import { Button, Modal, Label, Input, Select } from "flowbite-svelte";
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast";
    export let show = false;
    export let selectedEmployee: employee;
    export let reload: any;

    let formData: employee = {
        id: selectedEmployee.id,
        quitReason: null,
        quitDate: "",
        quitNotes: "",
        quitStatus: "",
    };

    let status = [
        { value: "RECONTRATABLE", name: "Recontratable" },
        { value: "NO RECONTRATABLE", name: "No recontratable" },
        { value: "A CONSIDERAR", name: "A considerar" },
    ];

    async function handleSubmmit() {
        await api.delete("/employees", {
            data: { ...formData, id: parseInt(selectedEmployee.id || "0") },
        });

        showSuccess("Empleado dado de baja");
        formData = {
            id: "",
            quitReason: null,
            quitDate: "",
            quitNotes: "",
            quitStatus: "",
        };

        show = false;
        await reload();
    }
</script>

<Modal bind:open={show} size="sm" class="w-full ">
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-2 text-gray-400 w-16 h-16 dark:text-gray-200" />
        <h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">Dar de baja a:</h3>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{selectedEmployee.name} - {selectedEmployee.noEmpleado}</h3>
    </div>
    <form class="flex flex-col space-y-6" action="#">
        <Label class="space-y-2">
            <span>Razon</span>
            <Input type="text" bind:value={formData.quitReason} />
        </Label>
        <Label class="space-y-2">
            <span>Fecha de baja</span>
            <Input type="date" bind:value={formData.quitDate} />
        </Label>
        <Label class="space-y-2">
            <span>Status</span>
            <Select class="mt-2" items={status} bind:value={formData.quitStatus} />
        </Label>
        <Label class="space-y-2">
            <span>Notas</span>
            <Input type="text" bind:value={formData.quitNotes} />
        </Label>
        <div class="text-center">
            <Button on:click={handleSubmmit} color="red" class="me-2">Dar de baja</Button>
            <Button on:click={() => (show = false)} color="alternative">Cancelar</Button>
        </div>
    </form>
</Modal>
