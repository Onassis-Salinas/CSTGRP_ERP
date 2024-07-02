<script>
    import { Table } from "flowbite-svelte";
</script>

<Table hoverable={true} shadow={true} class="overflow-auto block max-h-[85lvh]" divClass="border-gray-200 border max-w-full">
    <slot><!-- optional fallback --></slot>
</Table>
