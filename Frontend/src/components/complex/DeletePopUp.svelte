<script lang="ts">
    import { ExclamationCircleOutline } from "flowbite-svelte-icons";
    import { Button, Modal } from "flowbite-svelte";
    export let show = false;
    export let deleteFunc;
    export let text;
</script>

<Modal bind:open={show} size="sm" class="w-full ">
    <div class="text-center">
        <ExclamationCircleOutline class="mx-auto mb-2 text-gray-400 w-16 h-16 dark:text-gray-200" />
        <h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
    </div>
    <div class="text-center">
        <Button on:click={deleteFunc} color="red" class="me-2">Eliminar</Button>
        <Button on:click={() => (show = false)} color="alternative">Cancelar</Button>
    </div>
</Modal>
