<script lang="ts">
    import { ChevronDownOutline } from "flowbite-svelte-icons";
    import type { user } from "../../schemas/users.models";
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast.js";
    import { Button, Modal, Label, Input, Select, Dropdown, Checkbox } from "flowbite-svelte";
    export let show = false;
    export let reload: any;
    export let selectedUser: user;
    let formData: user;

    $: if (show || true) setFormData();
    function setFormData() {
        selectedAreas = selectedUser?.perm_assistance_areas?.split(",") || [];
        formData = { ...selectedUser };
    }

    const permissions = [
        { value: 0, name: "Ninguno" },
        { value: 1, name: "Leer" },
        { value: 2, name: "Modificar" },
    ];
    let selectedAreas: any[] = [];

    let areas: any[];

    async function getAreas() {
        areas = (await api.get("/hrvarious/areas")).data;
    }
    getAreas();

    async function handleSubmit() {
        if (selectedUser.id) {
            if (formData.password === "") delete formData.password;
            await api.put("users", {
                ...formData,
                id: parseInt(formData.id || ""),
                perm_assistance_areas: selectedAreas[0] === "Todas" ? "Todas" : selectedAreas.join(","),
            });
            showSuccess("Usuario actualizado");
        } else {
            await api.post("users", {
                ...formData,
                id: parseInt(formData.id || ""),
                perm_assistance_areas: selectedAreas[0] === "Todas" ? "Todas" : selectedAreas.join(","),
            });
            showSuccess("Usuario registrado");
        }
        await reload();
        show = false;
    }

    function handleCheck(e: any, i: number) {
        if (e.target.checked) {
            selectedAreas.push(areas[i].value);
        } else {
            selectedAreas = selectedAreas.filter((area) => {
                return area !== areas[i].value;
            });
        }
    }
    function checkAll(e: any) {
        if (e.target.checked) {
            selectedAreas = ["Todas"];
        } else {
            selectedAreas = [];
        }
    }
</script>

<Modal title={selectedUser.id ? `Editar Informacion de ${selectedUser.username}` : "Registrar Usuario"} bind:open={show} size="md" class="w-full ">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="grid grid-cols-2 w-full gap-4">
            <Label class="space-y-2">
                <span>Nombre</span>
                <Input name="text" bind:value={formData.username} />
            </Label>
            <Label class="space-y-2">
                <span>Contraseña</span>
                <Input name="text" bind:value={formData.password} />
            </Label>
            <Label class="space-y-2">
                <span>Perm. Usuarios</span>
                <Select items={permissions} bind:value={formData.perm_users} />
            </Label>
            <Label class="space-y-2">
                <span>Perm. Asistencia</span>
                <Select items={permissions} bind:value={formData.perm_assistance} />
            </Label>
            <Label class="space-y-2">
                <span>Perm. Empleados</span>
                <Select items={permissions} bind:value={formData.perm_employees} />
            </Label>
            <Label class="space-y-2">
                <span>Perm. Productividad</span>
                <Select items={permissions} bind:value={formData.perm_productivity} />
            </Label>
            <Label class="space-y-2">
                <span>Perm. Inventario</span>
                <Select items={permissions} bind:value={formData.perm_inventory} />
            </Label>
            <Label class="space-y-2">
                <span>Perm. Estructura</span>
                <Select items={permissions} bind:value={formData.perm_structure} />
            </Label>
            <Label class="space-y-2">
                <span>Perm. Materiales</span>
                <Select items={permissions} bind:value={formData.perm_materials} />
            </Label>
            <Label class="space-y-2">
                <span>Areas</span>
                <Button size="sm" color="alternative" class="w-full">Seleccionar<ChevronDownOutline class="w-6 h-6 ms-2 text-primary dark:text-white hover:!bg-none" /></Button>
                <Dropdown class="p-3 space-y-1 text-sm">
                    {#each areas as area, i}
                        <li>
                            <Checkbox
                                checked={selectedAreas.includes(area.value) || selectedAreas[0] === "Todas"}
                                on:change={(e) => {
                                    handleCheck(e, i);
                                }}>{area.name}</Checkbox
                            >
                        </li>
                    {/each}
                    <li>
                        <Checkbox
                            checked={selectedAreas[0] === "Todas"}
                            on:change={(e) => {
                                checkAll(e);
                            }}>Todas</Checkbox
                        >
                    </li>
                </Dropdown>
            </Label>
        </div>

        <Button type="submit" class="w-full mt-4">Guardar cambios</Button>
    </form>
</Modal>
