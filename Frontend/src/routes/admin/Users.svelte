<script lang="ts">
    import DeletePopUp from "./../../components/complex/DeletePopUp.svelte";
    import type { user } from "../../schemas/users.models";
    import { Button, Dropdown, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Badge, DropdownItem } from "flowbite-svelte";
    import api from "../../utils/server";
    import { ChevronDownOutline, DotsVerticalOutline, PlusOutline, UserEditOutline, UserRemoveOutline } from "flowbite-svelte-icons";
    import UserForm from "../../components/complex/UsersForm.svelte";
    import CusTable from "../../components/basic/CusTable.svelte";
    import { showSuccess } from "../../utils/showToast";
    import { setLocation } from "../../utils/location";
    setLocation();
    let show: boolean;
    let show1: boolean;
    let selectedUser: user = { id: "", username: "", password: "", perm_assistance_areas: undefined, perm_users: 0, perm_materials: 0, perm_assistance: 0, perm_productivity: 0, perm_employees: 0, perm_inventory: 0, perm_structure: 0, perm_it: 0 };
    let users: user[] = [];
    let areas: any = {};

    async function getUsers() {
        const result = await api.get("/users");
        users = result.data;
        const areasList = (await api.get("/hrvarious/areas")).data;
        areasList.forEach((area: any) => {
            areas[area.value] = area.name;
        });
    }

    function editUser(i: number) {
        selectedUser = users[i];
        show = true;
    }
    function createUser() {
        selectedUser = { id: "", username: "", password: "", perm_assistance_areas: undefined, perm_users: 0, perm_materials: 0, perm_assistance: 0, perm_productivity: 0, perm_employees: 0, perm_inventory: 0, perm_structure: 0, perm_it: 0 };
        show = true;
    }

    function deleteUser(i: number) {
        selectedUser = users[i];
        show1 = true;
    }

    async function handleDelete() {
        await api.delete("/users", { data: { id: parseInt(selectedUser.id) } });
        selectedUser = { id: "", username: "", password: "", perm_assistance_areas: undefined, perm_users: 0, perm_materials: 0, perm_assistance: 0, perm_productivity: 0, perm_employees: 0, perm_inventory: 0, perm_structure: 0, perm_it: 0 };
        showSuccess("Usuario eliminado");
        await getUsers();
        show1 = false;
    }

    function getBadgeColor(num: number): "red" | "green" | "indigo" {
        if (num === 0) return "red";
        if (num === 1) return "green";
        if (num === 2) return "indigo";
        return "red";
    }

    const badgeTexts = ["Ninguno", "Leer", "Modificar"];

    getUsers();
</script>

<div class="flex justify-between mb-6">
    <div>
        <Button size="sm" on:click={createUser}><PlusOutline class="mr-2" />Añadir Usuario</Button>
    </div>
</div>

<CusTable>
    <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-20 w-full" theadClass="relative">
        <TableHeadCell class="p-1 fixed left-3 z-30 bg-inherit"></TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Usuario</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Asistencia</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Empleados</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Inventario</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Productividad</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Usuarios</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Estructura</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Sistemas</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Perm. Materiales</TableHeadCell>
        <TableHeadCell class="w-[12.5%]">Areas</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
        {#each users as user, i}
            <TableBodyRow>
                <TableBodyCell tdClass="px-0 sticky left-0 bg-inherit">
                    <Button size="xs" color="none" class="p-0 h-full w-10">
                        <DotsVerticalOutline />
                    </Button>
                    <Dropdown containerClass="z-[999] flex gap-2" placement="right" class="p-2 flex gap-2">
                        <Button size="xs" on:click={() => editUser(i)}><UserEditOutline />Editar</Button>
                        <Button size="xs" on:click={() => deleteUser(i)} color="red"><UserRemoveOutline />Eliminar</Button>
                    </Dropdown>
                </TableBodyCell>

                <TableBodyCell tdClass="font-semibold">{user.username}</TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_assistance)}>{badgeTexts[user.perm_assistance]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_employees)}>{badgeTexts[user.perm_employees]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_inventory)}>{badgeTexts[user.perm_inventory]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_productivity)}>{badgeTexts[user.perm_productivity]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_users)}>{badgeTexts[user.perm_users]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_structure)}>{badgeTexts[user.perm_structure]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_it)}>{badgeTexts[user.perm_it]}</Badge></TableBodyCell>
                <TableBodyCell><Badge color={getBadgeColor(user.perm_materials)}>{badgeTexts[user.perm_materials]}</Badge></TableBodyCell>
                <TableBodyCell tdClass="py-0 px-2">
                    <Button class="py-1" color="alternative" size="sm">Areas<ChevronDownOutline class="w-6 h-6 ms-2 text-black dark:text-white" /></Button>
                    <Dropdown>
                        {#each user.perm_assistance_areas?.split(",") || [] as area}
                            <DropdownItem class="py-1 px-3">{area === "Todas" ? area : areas[area]}</DropdownItem>
                        {/each}
                    </Dropdown>
                </TableBodyCell>
            </TableBodyRow>
        {/each}
    </TableBody>
</CusTable>

<UserForm bind:show bind:selectedUser reload={getUsers} />
<DeletePopUp bind:show={show1} text="Eliminar usuario" deleteFunc={handleDelete} />
