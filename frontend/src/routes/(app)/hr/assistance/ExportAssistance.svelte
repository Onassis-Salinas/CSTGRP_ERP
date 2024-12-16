<script lang="ts">
    import jsPDF from "jspdf";
    import autoTable from "jspdf-autotable";

    import { Button } from "flowbite-svelte";
    import { formatDate, getWeekDays } from "../../utils/functions";
    import api from "../../utils/server";
    import { FileExportOutline } from "flowbite-svelte-icons";

    export let date: string;

    let weekDays = [];
    const mondayDate = new Date(getWeekDays(date)[0]);
    $: {
        for (let i = 0; i < 5; i++) {
            mondayDate.setDate(mondayDate.getDate() + (i > 0 ? 1 : 0));
            weekDays.push(formatDate(mondayDate.toISOString().split("T")[0]));
        }
    }

    type assistance = {
        position: string;
        area: string;
        name: string;
        lunes: string;
        martes: string;
        miercoles: string;
        jueves: string;
        viernes: string;
        noEmpleado: string;
    };

    let data: assistance[] = [];
    let areas: any = {};

    async function getData() {
        data = (
            await api.post("/assistance/export", {
                date,
            })
        ).data;
    }
    getData();

    $: {
        data.forEach((e: assistance) => {
            if (!areas[e.area]) areas[e.area] = [];
            areas[e.area].push(e);
        });
    }

    const exportAssistance = async () => {
        const pdf = new jsPDF({
            unit: "mm",
            format: [215.9, 279.4],
        });

        Object.keys(areas).forEach((area: string, index: number) => {
            if (index > 0) {
                pdf.addPage();
            }

            pdf.autoTable({
                theme: "plain",
                columnStyles: { 0: { fontStyle: "bold", fontSize: 16 }, 1: { fontStyle: "bold", fontSize: 12, halign: "right" } },
                body: [[area, `Del ${formatDate(getWeekDays(date)[0])} al ${formatDate(getWeekDays(date)[1])}`]],
            });

            pdf.autoTable({
                styles: {
                    lineColor: [45, 45, 45],
                    cellPadding: 2,
                },
                headStyles: { textColor: [255, 255, 255], fillColor: [45, 45, 45], lineColor: [45, 45, 45] },
                theme: "grid",
                head: [["No. Empleado", "Nombre", "Puesto", ...weekDays]],
                body: generateRows(areas[area]),
            });
        });
        pdf.save("Lista de asistencia.pdf");
    };

    const generateRows = (area: assistance[]) => {
        const objNormalized = area.map((row: assistance) => {
            return { ...row, position: (row.position?.includes("Costurero") ? "Costurero" : row.position) || "" };
        });
        const rowsArray = [];

        rowsArray.push([{ content: objNormalized[0].position, colSpan: 8, styles: { fillColor: [81, 120, 113], textColor: [255, 255, 255], fontStyle: "bold" } }]);

        for (const [i, row] of area.entries()) {
            rowsArray.push([row.noEmpleado, row.name, row.position, row.lunes, row.martes, row.miercoles, row.jueves, row.viernes]);

            if (i + 1 === objNormalized.length) continue;
            if (area[0].area !== "Staff" && area[0].area !== "Varios" && objNormalized[i].position !== objNormalized[i + 1].position) {
                rowsArray.push([{ content: objNormalized[i + 1].position, colSpan: 8, styles: { fillColor: [81, 120, 113], textColor: [255, 255, 255], fontStyle: "bold" } }]);
            }
        }
        return rowsArray;
    };

    const sum5days = (dateStr: any) => {
        const initialDate = new Date(dateStr);
        initialDate.setDate(initialDate.getDate() + 5);
        return initialDate.toISOString().split("T")[0];
    };
</script>

<Button  on:click={exportAssistance}><FileExportOutline class="size-3.5" /></Button>
