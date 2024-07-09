<script lang="ts">
    import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import { location } from "./../../utils/location";

    function capitalize(string: string) {
        if (!string) return;
        if (string.length < 4) return string.toUpperCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
</script>

<header class="ml-48 p-5">
    <div class="flex flex-col gap-2">
        <Breadcrumb>
            <BreadcrumbItem home>Inicio</BreadcrumbItem>
            <BreadcrumbItem>{capitalize($location.split("/")[1])}</BreadcrumbItem>
            {#if $location.split("/")[2]}
                <BreadcrumbItem>{capitalize($location.split("/")[2])}</BreadcrumbItem>
            {/if}
        </Breadcrumb>
        <h3 class="font-semibold text-xl">{capitalize($location.split("/")[2]) || capitalize($location.split("/")[1]) || "Inicio"}</h3>
    </div>
</header>
