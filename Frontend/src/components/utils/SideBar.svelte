<script lang="ts">
    import { Button, Modal, Sidebar, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper } from "flowbite-svelte";
    import { ArrowRightToBracketOutline, AddressBookOutline, UsersGroupOutline, ArchiveOutline, UserCircleOutline, CodeBranchOutline, ExclamationCircleOutline, FileCheckOutline, ChevronUpOutline, ChevronDownOutline } from "flowbite-svelte-icons";
    import { links } from "svelte-routing";
    import Cookies from "js-cookie";
    import { location } from "../../utils/location";

    let activeUrl = "";
    let showModal = false;

    $: {
        activeUrl = $location;
    }

    const username = Cookies.get("username");

    const hasAccess = (name: string) => {
        return parseInt(Cookies.get("perm_" + name) || "0") > 0;
    };

    const dropdownItemClass = "flex items-center p-2 ps-11 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-neutral-700";
    const dropdownItemActiveClass = "flex items-center p-2 ps-11 text-base font-normal text-white bg-neutral-700 rounded-lg hover:bg-neutral-600 ";
    const dropdownWrapperClass = "flex items-center p-2 w-full text-base font-normal text-white rounded-lg transition duration-75 group hover:bg-neutral-700";
</script>

<span class="max-w-16 absolute"></span>
<Sidebar asideClass="border-r border-gray-200 w-48 max-w-48 fixed top-0 bottom-0 z-40 bg-neutral-800 transition-all duration-200 max-w-48" {activeUrl} activeClass="flex items-center p-2 text-base font-normal bg-neutral-700 rounded-lg hover:bg-neutral-600">
    <SidebarWrapper class="h-full pb-4 overflow-hidden bg-neutral-800 text-white">
        <div use:links class="h-full flex justify-between flex-col">
            <SidebarGroup>
                <div class="font-semibold text-xl flex w-full items-center justify-between mb-10 whitespace-nowrap h-7">
                    <span>BC PET</span>
                </div>
                {#if hasAccess("inventory") || hasAccess("materials")}
                    <SidebarDropdownWrapper label="Almacen" btnClass={dropdownWrapperClass}>
                        <svelte:fragment slot="icon">
                            <ArchiveOutline class="size-6 text-neutral-200" />
                        </svelte:fragment>
                        <svelte:fragment slot="arrowup">
                            <ChevronUpOutline class="size-6" />
                        </svelte:fragment>
                        <svelte:fragment slot="arrowdown">
                            <ChevronDownOutline class="size-6" />
                        </svelte:fragment>
                        <SidebarDropdownItem label="Resumenes" href="/almacen/resumenes" active={activeUrl === "/almacen/resumenes"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                        {#if hasAccess("materials")}
                            <SidebarDropdownItem label="Materiales" href="/almacen/materiales" active={activeUrl === "/almacen/materiales"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                        {/if}
                        {#if hasAccess("inventory")}
                            <SidebarDropdownItem label="Inventario" href="/almacen/inventario" active={activeUrl === "/almacen/inventario"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                            <SidebarDropdownItem label="Movimientos" href="/almacen/movimientos" active={activeUrl === "/almacen/movimientos"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                        {/if}
                    </SidebarDropdownWrapper>
                {/if}
                {#if hasAccess("employees") || hasAccess("assistance") || hasAccess("productivity")}
                    <SidebarDropdownWrapper label="RRHH" btnClass={dropdownWrapperClass}>
                        <svelte:fragment slot="icon">
                            <UsersGroupOutline class="size-6 text-neutral-200" />
                        </svelte:fragment>
                        <svelte:fragment slot="arrowup">
                            <ChevronUpOutline class="size-6" />
                        </svelte:fragment>
                        <svelte:fragment slot="arrowdown">
                            <ChevronDownOutline class="size-6" />
                        </svelte:fragment>
                        {#if hasAccess("employees")}
                            <SidebarDropdownItem label="Dashboard" href="/rh/dashboard" active={activeUrl === "/rh/dashboard"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                        {/if}
                        {#if hasAccess("employees")}
                            <SidebarDropdownItem label="Empleados" href="/rh/empleados" active={activeUrl === "/rh/empleados"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                        {/if}
                        {#if hasAccess("productivity")}
                            <SidebarDropdownItem label="Productividad" href="/rh/productividad" active={activeUrl === "/rh/productividad"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                        {/if}
                        {#if hasAccess("assistance")}
                            <SidebarDropdownItem label="Asistencia" href="/rh/asistencia" active={activeUrl === "/rh/asistencia"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                        {/if}
                    </SidebarDropdownWrapper>
                {/if}
                {#if hasAccess("structure")}
                    <SidebarItem label="Estructura" href="/estructura" btnClass={dropdownWrapperClass} class="hover:bg-neutral-700 text-white">
                        <svelte:fragment slot="icon">
                            <CodeBranchOutline class="size-6 text-neutral-200" />
                        </svelte:fragment>
                    </SidebarItem>
                {/if}
                {#if hasAccess("users")}
                    <SidebarItem label="Usuarios" href="/usuarios" btnClass={dropdownWrapperClass} class="hover:bg-neutral-700 text-white">
                        <svelte:fragment slot="icon">
                            <AddressBookOutline class="size-6 text-neutral-200" />
                        </svelte:fragment>
                    </SidebarItem>
                {/if}
                <SidebarDropdownWrapper label="Recursos" btnClass={dropdownWrapperClass}>
                    <svelte:fragment slot="icon">
                        <FileCheckOutline class="size-6 text-neutral-200" />
                    </svelte:fragment>
                    <svelte:fragment slot="arrowup">
                        <ChevronUpOutline class="size-6" />
                    </svelte:fragment>
                    <svelte:fragment slot="arrowdown">
                        <ChevronDownOutline class="size-6" />
                    </svelte:fragment>
                    <SidebarDropdownItem label="Directorio" href="/recursos/directorio" active={activeUrl === "/recursos/directorio"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                    <SidebarDropdownItem label="Formatos" href="/recursos/formatos" active={activeUrl === "/recursos/formatos"} aClass={dropdownItemClass} activeClass={dropdownItemActiveClass} />
                </SidebarDropdownWrapper>
            </SidebarGroup>
            <SidebarGroup border class="mt-0 pt-0">
                <SidebarItem label={username} btnClass={dropdownWrapperClass} class="hover:bg-neutral-700 text-white">
                    <svelte:fragment slot="icon">
                        <UserCircleOutline class="size-6 text-neutral-200" />
                    </svelte:fragment>
                </SidebarItem>

                <SidebarItem on:click={() => (showModal = true)} label="Salir" href="#" btnClass={dropdownWrapperClass} class="hover:bg-neutral-700 text-white">
                    <svelte:fragment slot="icon">
                        <ArrowRightToBracketOutline class="size-6 text-neutral-200" />
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
