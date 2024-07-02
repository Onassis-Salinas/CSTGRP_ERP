<script lang="ts">
    import { Button, Modal, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from "flowbite-svelte";
    import { ArrowRightToBracketOutline, AddressBookOutline, UsersGroupOutline, ArchiveOutline, UserCircleOutline, CodeBranchOutline, BarsOutline, ExclamationCircleOutline, FileCheckOutline } from "flowbite-svelte-icons";
    import { links } from "svelte-routing";
    import Cookies from "js-cookie";
    import { location } from "../../utils/location";

    let activeUrl = "";
    let showModal = false;

    $: {
        const ubications = {
            almacen: "/almacen/resumenes",
            hr: "/hr/dashboard",
            recursos: "/recursos/directorio",
        };

        activeUrl = ubications[$location.split("/")[1]] || $location;
    }

    const username = Cookies.get("username");
    export let show: Boolean;
</script>

<span class="max-w-16 absolute"></span>
<Sidebar asideClass="border-r border-gray-200 w-48 max-w-48 fixed top-0 bottom-0 z-40 bg-primary-900 transition-all duration-200 " class={`max-w-${show ? "48" : "16"}`} {activeUrl} activeClass="flex p-2 rounded-lg hover:bg-primary-700 bg-primary-600" nonActiveClass="flex p-2 rounded-lg hover:bg-primary-700">
    <SidebarWrapper class="h-full pb-4 bg-primary-800 overflow-hidden">
        <div use:links class="h-full flex justify-between flex-col">
            <SidebarGroup>
                <div class="text-white font-semibold text-xl flex w-full items-center justify-between mb-10 whitespace-nowrap h-7">
                    <span class={show ? "block" : "hidden"}>BC PET</span>
                    <button class={show ? "" : "mx-auto"} on:click={() => (show = !show)}><BarsOutline class="size-6 mx-2 text-white" /></button>
                </div>
                <SidebarItem class="text-white" label={show ? "Inventarios" : ""} href="/almacen/resumenes">
                    <svelte:fragment slot="icon">
                        <ArchiveOutline class="size-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>

                <SidebarItem class="text-white" label={show ? "RRHH" : ""} href="/hr/dashboard">
                    <svelte:fragment slot="icon">
                        <UsersGroupOutline class="size-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem class="text-white" label={show ? "Estructura" : ""} href="/estructura">
                    <svelte:fragment slot="icon">
                        <CodeBranchOutline class="size-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem class="text-white" label={show ? "Usuarios" : ""} href="/usuarios">
                    <svelte:fragment slot="icon">
                        <AddressBookOutline class="size-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
                <SidebarItem class="text-white" label={show ? "Recursos" : ""} href="/recursos/directorio">
                    <svelte:fragment slot="icon">
                        <FileCheckOutline class="size-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
            <SidebarGroup border class="mt-0 pt-0">
                <SidebarItem class="text-white" label={show ? username : ""}>
                    <svelte:fragment slot="icon">
                        <UserCircleOutline class="size-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>

                <SidebarItem on:click={() => (showModal = true)} class="text-white" label={show ? "Salir" : ""} href="#">
                    <svelte:fragment slot="icon">
                        <ArrowRightToBracketOutline class="size-6 text-gray-200 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    </svelte:fragment>
                </SidebarItem>
            </SidebarGroup>
        </div>
    </SidebarWrapper>
</Sidebar>

<Modal bind:open={showModal} size="sm" class="w-full ">
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-2 text-gray-400 w-16 h-16 dark:text-gray-200" />
        <h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">Deseas cerrar sesion?</h3>
    </div>
    <div class="text-center">
        <a use:links href="/login">
            <Button size="sm" color="red" class="me-2">Salir</Button>
        </a>

        <Button size="sm" on:click={() => (showModal = false)} color="alternative">Cancelar</Button>
    </div>
</Modal>
