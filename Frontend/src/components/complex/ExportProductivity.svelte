<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { FileExportOutline } from "flowbite-svelte-icons";
    import ExcelJS from "exceljs";
    import { saveAs } from "file-saver";

    import type { productivity } from "../../schemas/hr.models";
    export let productivity: {
        [key: string]: productivity[];
    };
    export let positions: any;
    export let areas: any;
    export let weekDays: any;

    async function exportFile() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");

        worksheet.columns = [{ width: 14 }, { width: 40 }, { width: 25 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 12 }];

        Object.keys(productivity).forEach((key) => {
            worksheet.addRow([]);
            worksheet.addRow([]);
            worksheet.addRow([areas[key]]);
            worksheet.addRow(["No. Empleado", "Nombre", "Posicion", weekDays[0], weekDays[1], weekDays[2], weekDays[3], weekDays[4]]);

            productivity[key].forEach((row) => {
                worksheet.addRow([row.noEmpleado, row.name, positions[row.positionId], row["0average"], row["1average"], row["2average"], row["3average"], row["4average"]]);
            });
        });

        worksheet.eachRow((row) => {
            if (row.cellCount === 1) {
                const cell = row.getCell(1);
                worksheet.mergeCells(parseInt(cell.row), parseInt(cell.col), parseInt(cell.row), parseInt(cell.col) + 7);
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF222222" } };
                cell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 16, name:"Calibri" };
                cell.alignment = { horizontal: "center", vertical: "middle" };
                return;
            }
            if (row.getCell(1).text === "No. Empleado") {
                row.eachCell((cell) => {
                    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFBBBBBB" } };
                });
                return;
            }
            row.eachCell((cell) => {
                if (parseInt(cell.col) >= 4) {
                    cell.alignment = { horizontal: "center" };
                    if (parseInt(cell.text) >= 0) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFF0000" } };
                    if (parseInt(cell.text) >= 50) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF00" } };
                    if (parseInt(cell.text) >= 100) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF00FF00" } };
                }
            });
        });

        // Write to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Save the file
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "export.xlsx");
    }
</script>

<Button on:click={exportFile}><FileExportOutline class="mr-2" /> Exportar</Button>
