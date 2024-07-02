<script lang="ts">
    import { Input, type FormSizeType } from "flowbite-svelte";
    import api from "../../utils/server";

    export let value: string | undefined;
    export let measurement = "";
    export let size: FormSizeType;

    $: if (value) getMeasurement();

    async function getMeasurement() {
        measurement = (await api.get("/inventoryvarious/measurement?code=" + value)).data;
    }
</script>

<Input bind:value {size} color={measurement ? "base" : "red"} />
