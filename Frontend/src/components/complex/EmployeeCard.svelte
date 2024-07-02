<script lang="ts">
    import type { employee } from "../../schemas/hr.models";
    import { ButtonGroup, Hr, Input, InputAddon } from "flowbite-svelte";
    import { Modal } from "flowbite-svelte";
    import { formatDate } from "../../utils/functions";
    export let show = false;
    export let selectedEmployee: employee;
    export let areas;
    export let positions;
</script>

<Modal title={selectedEmployee.noEmpleado + " - " + selectedEmployee.name} bind:open={show} outsideclose size="md">
    <img class="aspect-square w-52 mx-auto rounded-full border-4 object-cover object-top border-primary-500" src={`http://192.168.0.38/Servidor_Recursos_Humanos/RECURSOS%20HUMANOS%202024/CREDENCIALES/FOTOS%20PARA%20CREDENCIALES/Foto%20Sin%20fondo/${selectedEmployee.noEmpleado}.png`} alt="" />

    {#if !selectedEmployee.active}
        <Hr hrClass="my-2 w-full border-b border-primary-500">Informacion de baja</Hr>
        <div class="grid grid-cols-2 w-full gap-2">
            <ButtonGroup>
                <InputAddon class=" min-w-36">Razón de Salida</InputAddon>
                <Input size="sm" readonly value={selectedEmployee.quitReason}></Input>
            </ButtonGroup>
            <ButtonGroup>
                <InputAddon class=" min-w-36">Estatus de Salida</InputAddon>
                <Input size="sm" readonly value={selectedEmployee.quitStatus}></Input>
            </ButtonGroup>
            <ButtonGroup>
                <InputAddon class=" min-w-36">Notas de Salida</InputAddon>
                <Input size="sm" readonly value={selectedEmployee.quitNotes}></Input>
            </ButtonGroup>
            <ButtonGroup>
                <InputAddon class=" min-w-36">Fecha de Salida</InputAddon>
                <Input size="sm" readonly value={formatDate(selectedEmployee.quitDate)}></Input>
            </ButtonGroup>
        </div>
    {/if}

    <Hr hrClass="my-2 w-full border-b border-primary-500">Informacion personal</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Nacionalidad</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.nationality}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Estado Civil</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.civilStatus}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Fecha de Nacimiento</InputAddon>
            <Input size="sm" readonly value={formatDate(selectedEmployee.bornDate)}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Estudios</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.studies}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Género</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.genre}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Hijos</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.sons}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Tipo de Sangre</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.blood}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Lugar de Nacimiento</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.bornLocation}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Informacion Legal</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">NSS</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.nss}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">CURP</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.curp}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">RFC</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.rfc}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Cuenta Bancaria</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.account}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Banco</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.bank}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Infonavit</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.infonavitNo}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Descuento de Infonavit</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.infonavitDiscount}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Salario de Nómina</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.nominaSalary}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Clínica</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.clinicNo}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Salario de IMSS</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.immsSalary}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Empresa</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Posición</InputAddon>
            <Input size="sm" readonly value={positions[selectedEmployee.positionId || ""] || ""}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Fecha de Admisión</InputAddon>
            <Input size="sm" readonly value={formatDate(selectedEmployee.admissionDate)}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Área</InputAddon>
            <Input size="sm" readonly value={areas[selectedEmployee.areaId || ""] || ""}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Fecha de CIM</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.cim}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Tipo de Posición</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.positionType}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Turno</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.shift}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Contacto</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Correo Electrónico</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.email}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Teléfono</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.number}></Input>
        </ButtonGroup>
        <ButtonGroup class="w-full col-span-2">
            <InputAddon class=" min-w-36">Dirección</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.direction}></Input>
        </ButtonGroup>
    </div>

    <Hr hrClass="my-2 w-full border-b border-primary-500">Contacto de Emergencia</Hr>
    <div class="grid grid-cols-2 w-full gap-2">
        <ButtonGroup>
            <InputAddon class=" min-w-36">Contacto de Emergencia</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.emmergencyContact}></Input>
        </ButtonGroup>
        <ButtonGroup>
            <InputAddon class=" min-w-36">Número de Emergencia</InputAddon>
            <Input size="sm" readonly value={selectedEmployee.emmergencyNumber}></Input>
        </ButtonGroup>
    </div>
</Modal>
