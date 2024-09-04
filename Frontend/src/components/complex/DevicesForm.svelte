<script lang="ts">
    import type { device } from "../../schemas/it.models";
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast.js";
    import { Button, Modal, Label, Input } from "flowbite-svelte";
    export let show = false;
    export let reload: any;
    export let selectedDevice: device;
    let formData: device;

    $: if (show || true) setFormData();

    function setFormData() {
        formData = { ...selectedDevice };
    }

    async function handleSubmit() {
        if (selectedDevice.id) {
            await api.put("/devices", {
                ...formData,
                id: parseInt(formData.id || ""),
            });
            showSuccess("Posicion editada");
        } else {
            await api.post("/devices", formData);
            showSuccess("Posicion registrada");
        }
        await reload();
        show = false;
    }
</script>

<Modal title={selectedDevice.id ? `Editar ${selectedDevice.name}` : "Registrar posicion"} bind:open={show} size="md" class="w-full ">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="grid grid-cols-2 w-full gap-4">
            <Label class="space-y-2">
                <span>Nombre</span>
                <Input name="text" bind:value={formData.name} />
            </Label>
            <Label class="space-y-2">
                <span>IP</span>
                <Input name="text" bind:value={formData.ip} />
            </Label>
            <Label class="space-y-2">
                <span>Usuario</span>
                <Input name="text" bind:value={formData.user} />
            </Label>
            <Label class="space-y-2">
                <span>Contrasena</span>
                <Input name="text" bind:value={formData.password} />
            </Label>
            <Label class="space-y-2">
                <span>Wifi</span>
                <Input name="text" bind:value={formData.wifipw} />
            </Label>
        </div>

        <Button type="submit" class="w-full mt-4">Guardar cambios</Button>
    </form>
</Modal>
