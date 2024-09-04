<script lang="ts">
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast.js";
    import { Button, Modal, Label, Input, Select, Textarea } from "flowbite-svelte";
    import type { material } from "../../schemas/inventory.models";
    export let show = false;
    export let reload: any;
    export let selectedMaterial: material;
    let formData: material;

    $: if (show || true) setFormData();
    function setFormData() {
        formData = { ...selectedMaterial };
    }
    let clients: any[];

    const measurements = [
        { name: "YARDAS", value: "YD" },
        { name: "METROS", value: "MT" },
        { name: "PIEZAS", value: "PC" },
        { name: "PIES", value: "FT" },
    ];

    async function getClients() {
        clients = (await api.get("/inventoryvarious/clients")).data;
    }
    getClients();

    async function handleSubmit() {
        if (selectedMaterial.id) {
            await api.put("materials", {
                ...formData,
                id: parseInt(formData.id),
                clientId: parseInt(formData.clientId),
                minAmount: formData.minAmount?.toString(),
            });
            showSuccess("Material actualizado");
        } else {
            await api.post("materials", {
                ...formData,
                id: parseInt(formData.id),
                clientId: parseInt(formData.clientId),
                minAmount: formData.minAmount?.toString(),
            });
            showSuccess("Material registrado");
        }
        await reload();
        show = false;
    }
</script>

<Modal title={selectedMaterial.id ? `Editar ${selectedMaterial.code}` : "Registrar Material"} bind:open={show} size="md" class="w-full ">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="grid grid-cols-2 w-full gap-4">
            <Label class="space-y-2">
                <span>Codigo</span>
                <Input name="text" bind:value={formData.code} />
            </Label>
            <Label class="space-y-2">
                <span>Cliente</span>
                <Select items={clients} bind:value={formData.clientId} />
            </Label>
            <Label class="space-y-2 col-span-2">
                <span>Descripcion</span>
                <Textarea name="text" bind:value={formData.description} />
            </Label>
            <Label class="space-y-2">
                <span>Medida</span>
                <Select items={measurements} bind:value={formData.measurement} />
            </Label>
            <Label class="space-y-2">
                <span>Cantidad minima</span>
                <Input name="" type="number" bind:value={formData.minAmount} />
            </Label>
        </div>

        <Button type="submit" class="w-full mt-4">Guardar cambios</Button>
    </form>
</Modal>
