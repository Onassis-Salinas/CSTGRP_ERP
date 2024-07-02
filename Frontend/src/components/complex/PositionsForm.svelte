<script lang="ts">
    import type { position } from "../../schemas/structure.models";
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast.js";
    import { Button, Modal, Label, Input } from "flowbite-svelte";
    export let show = false;
    export let reload: any;
    export let selectedPosition: position;
    let formData: position;

    $: if (show || true) setFormData();

    function setFormData() {
        formData = { ...selectedPosition };
    }

    async function handleSubmit() {
        if (selectedPosition.id) {
            await api.put("/positions", {
                ...formData,
                id: parseInt(formData.id || ""),
            });
            showSuccess("Posicion editada");
        } else {
            await api.post("/positions", formData);
            showSuccess("Posicion registrada");
        }
        await reload();
        show = false;
    }
</script>

<Modal title={selectedPosition.id ? `Editar ${selectedPosition.name}` : "Registrar posicion"} bind:open={show} size="md" class="w-full ">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="grid grid-cols-2 w-full gap-4">
            <Label class="space-y-2">
                <span>Nombre</span>
                <Input name="text" bind:value={formData.name} />
            </Label>
        </div>

        <Button type="submit" class="w-full mt-4">Guardar cambios</Button>
    </form>
</Modal>
