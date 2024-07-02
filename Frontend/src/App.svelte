<script lang="ts">
    import SideBar from "./components/utils/SideBar.svelte";
    import Employees from "./routes/hr/Employees.svelte";
    import Assistance from "./routes/hr/Assistance.svelte";
    import Dashboard from "./routes/hr/Dashboard.svelte";
    import { Router, Route } from "svelte-routing";
    import Index from "./routes/Index.svelte";
    import Login from "./routes/Login.svelte";
    import Users from "./routes/admin/Users.svelte";
    import Inventario from "./routes/inventories/Inventario.svelte";
    import Movimientos from "./routes/inventories/Movimientos.svelte";
    import Materiales from "./routes/inventories/Materiales.svelte";
    import Resumenes from "./routes/inventories/Resumenes.svelte";
    import Toaster from "./components/utils/Toaster.svelte";
    import Header from "./components/utils/Header.svelte";
    import { location } from "./utils/location";
    import Structure from "./routes/structure/Structure.svelte";
    import Productivity from "./routes/hr/Productivity.svelte";
    import Directory from "./routes/resources/Directory.svelte";

    $: inLogin = $location.includes("login");
    let show = true;
</script>

{#if !inLogin}
    <Header></Header>
{/if}
<main class={inLogin ? "w-full flex" : "pr-2 sm:pr-5 w-full flex gap-5 mt-4"}>
    {#if !inLogin}
        <SideBar bind:show></SideBar>
    {/if}
    <span class="absolute ml-52"></span>
    <span class="absolute ml-20"></span>
    <div class={inLogin ? "block flex-1" : "block flex-1  w-32 transition-all duration-200 " + (show ? "ml-52" : "ml-20")}>
        <Router>
            <Route path="/"><Index /></Route>

            <Route path="/login"><Login /></Route>

            <Route path="/usuarios"><Users /></Route>

            <Route path="/almacen/materiales" component={Materiales} />
            <Route path="/almacen/inventario" component={Inventario} />
            <Route path="/almacen/movimientos" component={Movimientos} />
            <Route path="/almacen/resumenes" component={Resumenes} />

            <Route path="/hr/empleados"><Employees /></Route>
            <Route path="/hr/asistencia"><Assistance /></Route>
            <Route path="/hr/dashboard"><Dashboard /></Route>
            <Route path="/hr/productivity"><Productivity /></Route>

            <Route path="/estructura"><Structure /></Route>

            <Route path="/recursos/directorio"><Directory /></Route>
        </Router>
    </div>
    <Toaster />
</main>

<footer class="mt-4"></footer>
