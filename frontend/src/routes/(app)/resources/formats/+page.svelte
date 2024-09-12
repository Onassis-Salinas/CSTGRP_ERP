<script lang="ts">
    import { setLocation } from "../../utils/location";
    import api from "../../utils/server";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";

    setLocation();

    let folders: any[] = [];
    let files: any[] = [];
    let folderSelected = "";
    const fetchAreas = async () => {
        folders = (await api.get("/resources/formatsfolders")).data;
    };
    fetchAreas();

    const fetchFiles = async (name: string) => {
        folderSelected = name;
        files = (await api.get("/resources/formatslist/" + name)).data;
        files = files.filter((e: any) => e.name.includes(".pdf"));
        files = files.map((e: any) => {
            return { ...e, originalName: e.name, name: e.name.slice(0, -4).split(".")[1].slice(2), code: e.name.split(" ")[0] };
        });
    };
</script>

<div class="grid grid-cols-2 gap-4" style="grid-template-columns: 1fr 3fr;">
    <Table hoverable shadow>
        <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0 z-20 w-full" >
            <TableHeadCell>Area</TableHeadCell>
        </TableHead>
        <TableBody >
            {#each folders as folder}
                <TableBodyRow class="cursor-pointer" on:click={() => fetchFiles(folder.name)}>
                    <TableBodyCell class="px-4 py-1">{folder.name}</TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>

    <Table hoverable shadow>
        <TableHead class="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0 z-20 w-full" >
            <TableHeadCell></TableHeadCell>
            <TableHeadCell>Codigo</TableHeadCell>
            <TableHeadCell>Nombre</TableHeadCell>
        </TableHead>
        <TableBody >
            {#each files as file, i}
                <TableBodyRow>
                    <TableBodyCell class="px-4 py-1">{i + 1}</TableBodyCell>
                    <TableBodyCell class="px-4 py-1 whitespace-nowrap break-all">{file.code}</TableBodyCell>

                    <TableBodyCell class="px-4 py-1 w-full"><a target="_blank" href={`http://192.168.0.38/Servidor_Ingenieria/INGENIERIA%20Y%20CALIDAD/SGC%20ISO%209001-2015/4.%20FORMATOS%20(F)/${folderSelected}/${file.originalName}`}>{file.name}</a></TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
