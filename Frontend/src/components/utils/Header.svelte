<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
    import { links } from "svelte-routing";
    import { location } from "../../utils/location";
</script>

<Navbar class="border-b border-gray-200 z-40 h-12 flex justify-between sticky top-0 shadow-sm">
    <NavBrand>
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white fixed"></span>
    </NavBrand>

    <NavHamburger />

    <div use:links>
        <NavUl class ulClass="flex flex-col px-4 py-0 mt-4 md:flex-row rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium" activeUrl={$location} activeClass="bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 !px-4 !py-1" nonActiveClass="!px-4 !py-1">
            <!-- <DarkMode class="p-0 mx-4" /> -->

            {#if $location.includes("hr")}
                <NavLi href="/hr/dashboard">Dashboard</NavLi>
                <NavLi href="/hr/empleados">Empleados</NavLi>
                <NavLi href="/hr/asistencia">Asistencia</NavLi>
                <NavLi href="/hr/productivity">Productividad</NavLi>
            {/if}
            {#if $location.includes("almacen")}
                <NavLi href="/almacen/resumenes">Resumenes</NavLi>
                <NavLi href="/almacen/materiales">Materiales</NavLi>
                <NavLi href="/almacen/inventario">Inventario</NavLi>
                <NavLi href="/almacen/movimientos">Movimientos</NavLi>
            {/if}
            {#if $location.includes("estructura")}
                <NavLi href="/estructura">Areas y Posiciones</NavLi>
            {/if}
            {#if $location.includes("usuarios")}
                <NavLi href="/usuarios">Usuarios</NavLi>
            {/if}

            {#if $location.includes("recursos")}
            <NavLi href="/recursos/directorio">Directorio</NavLi>
        {/if}
        </NavUl>
    </div>
</Navbar>
