<script lang="ts">
    import api from "../../utils/server.js";
    import { showSuccess } from "../../utils/showToast.js";
    import type { employee } from "../../schemas/hr.models";
    import { Button, Modal, Label, Input, Select } from "flowbite-svelte";
    export let show = false;
    export let selectedEmployee: employee;
    export let reload: any;
    let formData: employee;

    $: if (show || true) setFormData();

    let banks = [
        { value: "SCOTIABANK", name: "SCOTIABANK" },
        { value: "HSBC", name: "HSBC" },
        { value: "BBVA", name: "BBVA" },
    ];
    let status = [
        { value: "RECONTRATABLE", name: "Recontratable" },
        { value: "NO RECONTRATABLE", name: "No recontratable" },
        { value: "A CONSIDERAR", name: "A considerar" },
    ];

    let genres = [
        { value: "F", name: "Femenino" },
        { value: "M", name: "Masculino" },
        { value: "O", name: "Otro" },
    ];

    let civilStatus = [
        { value: "Casado(a)", name: "Casado(a)" },
        { value: "Soltero(a)", name: "Soltero(a)" },
        { value: "Divorciado(a)", name: "Divorciado(a)" },
        { value: "Viudo(a)", name: "Viudo(a)" },
        { value: "Separado(a)", name: "Separado(a)" },
        { value: "Concubinato", name: "Concubinato" },
        { value: "Unión Libre", name: "Unión Libre" },
        { value: "Sociedad de Convivencia", name: "Sociedad de Convivencia" },
    ];

    let areas: any;
    let positions: any;

    async function fetchOptions() {
        areas = (await api.get("/hrvarious/areas")).data;
        positions = (await api.get("/hrvarious/positions")).data;
    }
    fetchOptions();

    function setFormData() {
        formData =
            {
                ...selectedEmployee,
                admissionDate: selectedEmployee.admissionDate?.split("T")[0],
                bornDate: selectedEmployee.bornDate?.split("T")[0],
                quitDate: selectedEmployee.quitDate?.split("T")[0],
                cim: selectedEmployee.cim?.split("T")[0],
                infonavitFee: selectedEmployee.infonavitFee?.toString(),
                infonavitDiscount: selectedEmployee.infonavitDiscount?.toString(),
            } || {};
    }

    async function handleSubmit() {
        if (selectedEmployee.id) {
            await api.put("employees", {
                ...formData,
                id: parseInt(formData.id || ""),
                noEmpleado: parseInt(formData.noEmpleado || ""),
                areaId: parseInt(formData.areaId || ""),
                positionId: parseInt(formData.positionId || ""),
                sons: parseInt(formData.sons || ""),
            });
            showSuccess("Informacion actualizada");
        } else {
            await api.post("employees", {
                ...formData,
                id: parseInt(formData.id || ""),
                noEmpleado: parseInt(formData.noEmpleado || ""),
                areaId: parseInt(formData.areaId || ""),
                positionId: parseInt(formData.positionId || ""),
                sons: parseInt(formData.sons || ""),
            });
            showSuccess("Empleado registrado");
        }

        await reload();
        show = false;
    }
</script>

<Modal title={selectedEmployee.id ? `Editar Informacion de ${selectedEmployee.name}` : "Registrar Empleado"} bind:open={show} size="md" class="w-full ">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="grid grid-cols-2 w-full gap-4">
            <Label class="space-y-2">
                <span>No. Empleado</span>
                <Input name="text" bind:value={formData.noEmpleado} />
            </Label>
            <Label class="space-y-2">
                <span>Nombre *</span>
                <Input name="text" bind:value={formData.name} />
            </Label>
            <Label class="space-y-2">
                <span>Apellido Paterno</span>
                <Input name="text" bind:value={formData.paternalLastName} />
            </Label>
            <Label class="space-y-2">
                <span>Apellido Materno</span>
                <Input name="text" bind:value={formData.maternalLastName} />
            </Label>
            {#if selectedEmployee.active === false}
                <Label class="space-y-2">
                    <span>Razón de Salida</span>
                    <Input name="text" bind:value={formData.quitReason} />
                </Label>
                <Label class="space-y-2">
                    <span>Estatus</span>
                    <Select class="mt-2" items={status} bind:value={formData.quitStatus} />
                </Label>
                <Label class="space-y-2">
                    <span>Notas de Salida</span>
                    <Input name="text" bind:value={formData.quitNotes} />
                </Label>
                <Label class="space-y-2">
                    <span>Fecha de Salida</span>
                    <Input type="date" name="text" bind:value={formData.quitDate} />
                </Label>
            {/if}

            <Label class="space-y-2">
                <span>NSS</span>
                <Input name="text" bind:value={formData.nss} />
            </Label>
            <Label class="space-y-2">
                <span>CURP</span>
                <Input name="text" bind:value={formData.curp} />
            </Label>
            <Label class="space-y-2">
                <span>RFC</span>
                <Input name="text" bind:value={formData.rfc} />
            </Label>
            <Label class="space-y-2">
                <span>Tipo de Sangre</span>
                <Input name="text" bind:value={formData.blood} />
            </Label>
            <Label class="space-y-2">
                <span>Cuenta Bancaria</span>
                <Input type="number" name="text" bind:value={formData.account} />
            </Label>
            <Label class="space-y-2">
                <span>Contacto de Emergencia</span>
                <Input name="text" bind:value={formData.emmergencyContact} />
            </Label>
            <Label class="space-y-2">
                <span>Posición</span>
                <Select items={positions} bind:value={formData.positionId} />
            </Label>
            <Label class="space-y-2">
                <span>Fecha de Admisión</span>
                <Input type="date" name="text" bind:value={formData.admissionDate} />
            </Label>
            <Label class="space-y-2">
                <span>Número de Emergencia</span>
                <Input name="text" bind:value={formData.emmergencyNumber} />
            </Label>
            <Label class="space-y-2">
                <span>Área</span>
                <Select items={areas} bind:value={formData.areaId} />
            </Label>
            <Label class="space-y-2">
                <span>Lugar de Nacimiento</span>
                <Input name="text" bind:value={formData.bornLocation} />
            </Label>
            <Label class="space-y-2">
                <span>Género</span>
                <Select items={genres} bind:value={formData.genre} />
            </Label>
            <Label class="space-y-2">
                <span>Número de Hijos</span>
                <Input type="number" name="text" bind:value={formData.sons} />
            </Label>
            <Label class="space-y-2">
                <span>Número de Clínica</span>
                <Input name="text" bind:value={formData.clinicNo} />
            </Label>
            <Label class="space-y-2">
                <span>Correo Electrónico</span>
                <Input name="text" bind:value={formData.email} />
            </Label>
            <Label class="space-y-2">
                <span>Número de Teléfono</span>
                <Input name="text" bind:value={formData.number} />
            </Label>
            <Label class="space-y-2">
                <span>Dirección</span>
                <Input name="text" bind:value={formData.direction} />
            </Label>
            <Label class="space-y-2">
                <span>Banco</span>
                <Select items={banks} bind:value={formData.bank} />
            </Label>
            <Label class="space-y-2">
                <span>Número de Infonavit</span>
                <Input name="text" bind:value={formData.infonavitNo} />
            </Label>
            <Label class="space-y-2">
                <span>Descuento de Infonavit</span>
                <Input name="text" bind:value={formData.infonavitDiscount} />
            </Label>
            <Label class="space-y-2">
                <span>Cuota de infonavit</span>
                <Input name="text" bind:value={formData.infonavitFee} />
            </Label>
            <Label class="space-y-2">
                <span>Tipo de Posición</span>
                <Input name="text" bind:value={formData.positionType} />
            </Label>
            <Label class="space-y-2">
                <span>Fecha de CIM</span>
                <Input type="date" name="text" bind:value={formData.cim} />
            </Label>
            <Label class="space-y-2">
                <span>Turno</span>
                <Input name="text" bind:value={formData.shift} />
            </Label>
            <Label class="space-y-2">
                <span>Salario de Nómina</span>
                <Input name="text" bind:value={formData.nominaSalary} />
            </Label>
            <Label class="space-y-2">
                <span>Salario de IMSS</span>
                <Input name="text" bind:value={formData.immsSalary} />
            </Label>

            <Label class="space-y-2">
                <span>Nacionalidad</span>
                <Input name="text" bind:value={formData.nationality} />
            </Label>
            <Label class="space-y-2">
                <span>Estado Civil</span>
                <Select items={civilStatus} bind:value={formData.civilStatus} />
            </Label>
            <Label class="space-y-2">
                <span>Fecha de Nacimiento</span>
                <Input type="date" name="text" bind:value={formData.bornDate} />
            </Label>
            <Label class="space-y-2">
                <span>Estudios</span>
                <Input name="text" bind:value={formData.studies} />
            </Label>
        </div>

        <Button type="submit" class="w-full mt-4">Guardar cambios</Button>
    </form>
</Modal>
