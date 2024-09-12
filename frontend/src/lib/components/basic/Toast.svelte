<script lang="ts">
    import { Toast } from "flowbite-svelte";
    import { CheckCircleSolid, CloseCircleSolid } from "flowbite-svelte-icons";
    import { scale, slide } from "svelte/transition";

    export let text: string;
    export let type: Boolean;

    let show = false;
    setTimeout(() => {
        show = true;
    }, 100);
    setTimeout(() => {
        show = false;
    }, 4500);
</script>

{#if show}
    <div in:scale={{ duration: 150 }} out:slide={{ duration: 200 }} class="xx">
        <Toast color={type ? "green" : "red"} dismissable={false} class="min-w-72 max-w-full" open>
            <svelte:fragment slot="icon">
                {#if type}
                    <CheckCircleSolid class="w-5 h-5" />
                {:else}
                    <CloseCircleSolid class="w-5 h-5" />
                {/if}
                <span class="sr-only">{text}</span>
            </svelte:fragment>
            {text}
        </Toast>
    </div>
{/if}

<style>
    .xx {
        transition: all ease;
    }
</style>
