<script lang="ts">
    import type { area } from "../../schemas/structure.models";
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast.js";
    import { Button, Modal, Label, Input, Checkbox } from "flowbite-svelte";
    export let show = false;
    export let reload: any;
    export let selectedArea: area;
    let formData: area;

    $: if (show || true) setFormData();

    function setFormData() {
        formData = { ...selectedArea };
    }

    async function handleSubmit() {
        if (selectedArea.id) {
            await api.put("/areas", {
                ...formData,
                id: parseInt(formData.id || ""),
            });
            showSuccess("Area editada");
        } else {
            await api.post("/areas", formData);
            showSuccess("Area registrada");
        }
        await reload();
        show = false;
    }
</script>

<Modal title={selectedArea.id ? `Editar ${selectedArea.name}` : "Registrar Area"} bind:open={show} size="md" class="w-full ">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="grid grid-cols-2 w-full gap-4">
            <Label class="space-y-2">
                <span>Nombre</span>
                <Input name="text" bind:value={formData.name} />
            </Label>
            <Label class="space-y-2">
                <span>Es capturada</span>
                <Checkbox name="text" bind:checked={formData.captured} />
            </Label>
        </div>

        <Button type="submit" class="w-full mt-4">Guardar cambios</Button>
    </form>
</Modal>
