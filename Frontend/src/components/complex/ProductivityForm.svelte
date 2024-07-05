<script lang="ts">
    import { Button, Modal, Label, Input, Select, Hr, Badge } from "flowbite-svelte";
    import type { productivity } from "../../schemas/hr.models";
    import { getDayNumber } from "../../utils/functions";
    import api from "../../utils/server";
    import { showSuccess } from "../../utils/showToast";
    export let show: boolean;
    export let productivity: any[];
    export let areas: any[];
    export let reload: any;
    let selectedRowId: string;
    let selectedAreaId: string;
    let selectedRow: productivity;
    let selectedDate = new Date().toISOString().split("T")[0];
    let areasList: any[] = [];
    let employees: any[];
    let dayNumber: number = getDayNumber(selectedDate);

    let formData = {
        code0: "",
        code1: "",
        code2: "",
        goal0: "",
        goal1: "",
        goal2: "",
        produced0: "",
        produced1: "",
        produced2: "",
        comment: "",
    };

    async function handleSubmit() {
        await api.put("/productivity", {
            id: parseInt(selectedRow.id),
            [`${dayNumber}code0`]: formData["code0"],
            [`${dayNumber}code1`]: formData["code1"],
            [`${dayNumber}code2`]: formData["code2"],

            [`${dayNumber}goal0`]: formData["goal0"],
            [`${dayNumber}goal1`]: formData["goal1"],
            [`${dayNumber}goal2`]: formData["goal2"],

            [`${dayNumber}produced0`]: formData["produced0"],
            [`${dayNumber}produced1`]: formData["produced1"],
            [`${dayNumber}produced2`]: formData["produced2"],
            [`${dayNumber}comment`]: (formData["comment"] || "").toUpperCase() === "Anulado".toUpperCase() ? "" : formData["comment"],
        });
        showSuccess("Datos cambiados");
        document.querySelector<HTMLInputElement>(".xxx")?.focus();

        await reload();
    }

    async function handleNegate(event: any) {
        if (!(event.ctrlKey && event.key === "Enter")) return;

        await api.put("/productivity", {
            id: parseInt(selectedRow.id),
            [`${dayNumber}code0`]: "",
            [`${dayNumber}code1`]: "",
            [`${dayNumber}code2`]: "",

            [`${dayNumber}goal0`]: "",
            [`${dayNumber}goal1`]: "",
            [`${dayNumber}goal2`]: "",

            [`${dayNumber}produced0`]: "",
            [`${dayNumber}produced1`]: "",
            [`${dayNumber}produced2`]: "",

            [`${dayNumber}comment`]: "Anulado",
        });
        showSuccess("Anulada");

        document.querySelector<HTMLInputElement>(".xxx")?.focus();
        await reload();
    }

    $: if (productivity) {
        areasList = [];
        Object.keys(productivity).forEach((areaId) => {
            areasList.push({
                value: areaId,
                name: areas[parseInt(areaId)],
            });
        });
    }

    $: if (selectedAreaId) selectArea();
    function selectArea() {
        employees = [];
        productivity[parseInt(selectedAreaId)].map((row: any) => {
            employees.push({
                value: row.id,
                name: row.name,
            });
        });
    }

    $: if (selectedRowId && selectedDate) handleDateSelect();
    function handleDateSelect() {
        dayNumber = getDayNumber(selectedDate);
        selectedRow = productivity[parseInt(selectedAreaId)].filter((row: productivity) => row.id === selectedRowId)[0];

        formData = {
            code0: selectedRow[dayNumber + "code0"],
            code1: selectedRow[dayNumber + "code1"],
            code2: selectedRow[dayNumber + "code2"],

            goal0: selectedRow[dayNumber + "goal0"],
            goal1: selectedRow[dayNumber + "goal1"],
            goal2: selectedRow[dayNumber + "goal2"],

            produced0: selectedRow[dayNumber + "produced0"],
            produced1: selectedRow[dayNumber + "produced1"],
            produced2: selectedRow[dayNumber + "produced2"],

            comment: selectedRow[dayNumber + "comment"],
        };
    }

    function handleNoEmpleado(e: any) {
        Object.keys(productivity).forEach((areaId) => {
            productivity[parseInt(areaId)].forEach((row: any) => {
                if (row.noEmpleado === e.target.value) {
                    selectedRowId = row.id;
                    selectedAreaId = row.areaId;
                }
            });
        });
    }

    function getColors(number?: number) {
        if (isNaN(number || NaN) || !number) return "dark";
        if (number < 0.51) return "red";
        if (number < 1) return "yellow";
        if (number < 1.5) return "green";
        return "blue";
    }
</script>

<Modal title="Captura de productividad" bind:open={show} size="sm" class="w-full">
    <div class="grid w-full gap-0.5" on:keydown={handleNegate} role="button" tabindex="0">
        <Label class="flex justify-end  items-center gap-2">
            <span class="w-[20%] text-right">Fecha</span>
            <Input size="sm" class="w-[80%]" type="date" bind:value={selectedDate}></Input>
        </Label>
        <Label class="flex justify-end  items-center gap-2">
            <span class="w-[20%] text-right">Area</span>
            <Select size="sm" class="w-[80%]" items={areasList} bind:value={selectedAreaId} />
        </Label>
        <Label class="flex justify-end  items-center gap-2">
            <span class="w-[20%] text-right">No.Empleado</span>
            <Input size="sm" class="w-[80%] xxx" type="number" on:change={handleNoEmpleado}></Input>
        </Label>
        <Label class="flex justify-end  items-center gap-2">
            <span class="w-[20%] text-right">Nombre</span>
            <Select size="sm" class="w-[80%]" items={employees} bind:value={selectedRowId} />
        </Label>

        <Hr hrClass="my-2"></Hr>

        <form on:submit|preventDefault class="grid w-full gap-0.5">
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Codigo1</span>
                <Input bind:value={formData.code0} size="sm" class="w-[80%]"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Meta</span>
                <Input bind:value={formData.goal0} size="sm" class="w-[80%]" type="number"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Producido</span>
                <Input bind:value={formData.produced0} size="sm" class="w-[80%]" type="number"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Codigo2</span>
                <Input bind:value={formData.code1} size="sm" class="w-[80%]"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Meta</span>
                <Input bind:value={formData.goal1} size="sm" class="w-[80%]" type="number"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Producido</span>
                <Input bind:value={formData.produced1} size="sm" class="w-[80%]" type="number"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Codigo3</span>
                <Input bind:value={formData.code2} size="sm" class="w-[80%]"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Meta</span>
                <Input bind:value={formData.goal2} size="sm" class="w-[80%]" type="number"></Input>
            </Label>
            <Label class="flex justify-end  items-center gap-2">
                <span class="w-[20%] text-right">Producido</span>
                <Input bind:value={formData.produced2} size="sm" class="w-[80%]" type="number"></Input>
            </Label>
            <Label class="flex justify-end my-1 items-center gap-2">
                <span class="w-[20%] text-right">Comentario</span>
                <Input bind:value={formData.comment} size="sm" class="w-[80%]"></Input>
            </Label>

            <div class="grid grid-cols-3 gap-1">
                <Badge class="" color={getColors(parseInt(formData.produced0) / parseInt(formData.goal0))}>{(parseInt(formData.produced0) / parseInt(formData.goal0)) * 100 || ""}%</Badge>
                <Badge class="" color={getColors(parseInt(formData.produced1) / parseInt(formData.goal1))}>{(parseInt(formData.produced1) / parseInt(formData.goal1)) * 100 || ""}%</Badge>
                <Badge class="" color={getColors(parseInt(formData.produced2) / parseInt(formData.goal2))}>{(parseInt(formData.produced2) / parseInt(formData.goal2)) * 100 || ""}%</Badge>
            </div>
            <Badge class="" color={getColors(((parseInt(formData.produced0) / parseInt(formData.goal0) || 0) + (parseInt(formData.produced1) / parseInt(formData.goal1) || 0) + (parseInt(formData.produced2) / parseInt(formData.goal2) || 0)) / (formData.goal2 ? 3 : formData.goal1 ? 2 : formData.goal0 ? 1 : 1))}
                >{Math.round((((parseInt(formData.produced0) / parseInt(formData.goal0) || 0) + (parseInt(formData.produced1) / parseInt(formData.goal1) || 0) + (parseInt(formData.produced2) / parseInt(formData.goal2) || 0)) * 100) / (formData.goal2 ? 3 : formData.goal1 ? 2 : formData.goal0 ? 1 : 1))}%</Badge
            >

            <Button on:click={handleSubmit} type="submit" size="sm" class="w-full mt-4">Guardar</Button>
        </form>
    </div>
</Modal>
