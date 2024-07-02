<script lang="ts">
    import { QuestionCircleOutline } from "flowbite-svelte-icons";
    import { Button, Modal } from "flowbite-svelte";
    export let show = false;
    export let action;
    export let text;
</script>

<Modal bind:open={show} size="sm" class="w-full ">
    <div class="text-center">
        <QuestionCircleOutline class="mx-auto mb-2 text-gray-400 w-16 h-16 dark:text-gray-200" />
        <h3 class=" text-lg font-normal text-gray-500 dark:text-gray-400">{text}</h3>
    </div>
    <div class="text-center">
        <Button on:click={action} class="me-2">Confirmar</Button>
        <Button on:click={() => (show = false)} color="alternative">Cancelar</Button>
    </div>
</Modal>
