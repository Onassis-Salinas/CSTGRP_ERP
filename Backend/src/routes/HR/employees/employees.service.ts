import { Injectable } from '@nestjs/common';
import { File } from '@nest-lab/fastify-multer';
import {
  createSchema,
  editSchema,
  idSchema,
  quitSchema,
  reactivateSchema,
  templateSchema,
} from './employees.schema';
import { z } from 'zod';
import sql from 'src/utils/db';
import { getWeekDays } from 'src/utils/functions';
import exceljs from 'exceljs';
import { saveFile } from 'src/utils/storage';

@Injectable()
export class EmployeesService {
  async getAssistance(body) {
    const [firstDate] = getWeekDays(new Date());
    const rows = await sql`SELECT "mondayDate",
    (SELECT name FROM incidences WHERE id = assistance."incidenceId0") AS "incidence0",
    (SELECT name FROM incidences WHERE id = assistance."incidenceId1") AS "incidence1",
    (SELECT name FROM incidences WHERE id = assistance."incidenceId2") AS "incidence2",
    (SELECT name FROM incidences WHERE id = assistance."incidenceId3") AS "incidence3",
    (SELECT name FROM incidences WHERE id = assistance."incidenceId4") AS "incidence4"
    FROM assistance
    WHERE "mondayDate" > ${new Date(new Date(firstDate).setDate(new Date(firstDate).getDate() - 28))} AND "employeeId" = ${parseInt(body.id)}
    ORDER BY "mondayDate" desc`;

    return rows;
  }

  async getProductivity(body) {
    const [firstDate] = getWeekDays(new Date());
    const rows = await sql`select *
    from employeeproductivity
    JOIN assistance
    On assistance.id = employeeproductivity."assistanceId"
    where assistance."mondayDate" > ${new Date(new Date(firstDate).setDate(new Date(firstDate).getDate() - 60))}
    And assistance."employeeId" = ${parseInt(body.id)}
    order by "mondayDate" asc`;

    return rows;
  }

  async getActiveEmployees() {
    const employees =
      await sql`select id, name, "paternalLastName" "maternalLastName", "noEmpleado", "areaId", "positionId" from employees where active order by "noEmpleado" DESC`;
    return employees;
  }

  async getEmployee(body: z.infer<typeof idSchema>) {
    return await sql`select * from employees where id = ${body.id}`;
  }

  async getInactiveEmployees() {
    const employees =
      await sql`select * from employees where active = false order by "noEmpleado" DESC`;
    return employees;
  }

  async registerEmployee(body: z.infer<typeof createSchema>, file: File) {
    const image = await saveFile(file, 'employees');

    const employee: any = (
      await sql`insert into employees ${sql({ ...body, photo: image })} returning id, "areaId", "positionId", "admissionDate"`
    )[0];

    //Generate assistance for the week
    const [firstDate] = getWeekDays(employee.admissionDate);
    const [{ count }] =
      await sql`select count(*) from assistance where "mondayDate" = ${firstDate}`;

    if (count === '0') return;
    const [assistanceRow] =
      await sql`insert into assistance ("mondayDate", "positionId", "areaId", "employeeId") values
    (${firstDate}, ${employee.positionId}, ${employee.areaId}, ${employee.id}) returning id`;

    //Generate productivity for the week
    const [{ captured }] =
      await sql`select captured from areas where "id" = ${employee.areaId}`;
    if (!captured) return;

    await sql`insert into employeeproductivity ("assistanceId") values
    (${assistanceRow.id})`;
    return;
  }

  async editEmployee(body: z.infer<typeof editSchema>, file: File) {
    const [previousObj] =
      await sql`select photo from employees where id = ${body.id}`;
    const image = await saveFile(file, 'employees', previousObj.photo);
    await sql`update "employees" SET ${sql({ ...body, photo: image })} where id = ${body.id}`;
    return;
  }

  async reactivateEmployee(body: z.infer<typeof reactivateSchema>) {
    const data = {
      ...body,
      active: true,
      quitDate: null,
      quitStatus: null,
      quitNotes: null,
      quitReason: null,
    };

    const employee = (
      await sql`update "employees" SET ${sql(data)} where id = ${data.id} returning id, "areaId", "positionId", "admissionDate"`
    )[0];

    //Generate assistance for the week
    const [firstDate] = getWeekDays(employee.admissionDate);
    const [{ count }] =
      await sql`select count(*) from assistance where "mondayDate" = ${firstDate}`;

    if (count === '0') return;
    const [assistanceRow] =
      await sql`insert into assistance ("mondayDate", "positionId", "areaId", "employeeId") values
    (${firstDate}, ${employee.positionId}, ${employee.areaId}, ${employee.id}) returning id`;

    //Generate productivity for the week
    const [{ captured }] =
      await sql`select captured from areas where "id" = ${employee.areaId}`;
    if (!captured) return;

    await sql`insert into employeeproductivity ("assistanceId") values
    (${assistanceRow.id})`;
    return;
  }

  async quitEmployee(body: z.infer<typeof quitSchema>) {
    await sql`update employees set active = false, "quitDate" = ${body.quitDate}, "quitStatus" = ${body.quitStatus}, "quitReason" = ${body.quitReason}, "quitNotes" = ${body.quitNotes}  where id = ${body.id}`;
    return;
  }

  async updateTemplate(body: z.infer<typeof templateSchema>) {
    await sql`update general set value = ${body.template} where name = 'Plantilla'`;
    return;
  }

  async export() {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Inventario');

    const rows =
      await sql`select *, positions.name as position, areas.name as area from employees
    join areas on areas.id = employees."areaId"
    join positions on positions.id = employees."positionId"
    where active`;

    worksheet.columns = [
      { header: 'No. Empleado', key: 'noEmpleado', width: 25 },
      { header: 'Nombre', key: 'name', width: 25 },
      { header: 'Apellido paterno', key: 'paternalLastName', width: 25 },
      { header: 'Apellido materno', key: 'maternalLastName', width: 25 },
      { header: 'Área', key: 'area', width: 25 },
      { header: 'Puesto', key: 'position', width: 25 },
      { header: 'CIM', key: 'cim', width: 25 },
      { header: 'Salario de Nómina', key: 'nominaSalary', width: 25 },
      { header: 'Salario IMMS', key: 'immsSalary', width: 25 },
      { header: 'Fecha de Baja', key: 'quitDate', width: 25 },
      { header: 'Fecha de Admisión', key: 'admissionDate', width: 25 },
      { header: 'Fecha de Nacimiento', key: 'bornDate', width: 25 },
      { header: 'Cuota Infonavit', key: 'infonavitFee', width: 25 },
      { header: 'Descuento Infonavit', key: 'infonavitDiscount', width: 25 },
      { header: 'Hijos', key: 'sons', width: 25 },
      { header: 'Banco', key: 'bank', width: 25 },
      { header: 'No. Infonavit', key: 'infonavitNo', width: 25 },
      { header: 'Tipo de Puesto', key: 'positionType', width: 25 },
      { header: 'Turno', key: 'shift', width: 25 },
      { header: 'Apellido Paterno', key: 'paternalLastName', width: 25 },
      { header: 'Apellido Materno', key: 'maternalLastName', width: 25 },
      { header: 'Nacionalidad', key: 'nationality', width: 25 },
      { header: 'Estudios', key: 'studies', width: 25 },
      { header: 'NSS', key: 'nss', width: 25 },
      { header: 'CURP', key: 'curp', width: 25 },
      { header: 'RFC', key: 'rfc', width: 25 },
      { header: 'Tipo de Sangre', key: 'blood', width: 25 },
      { header: 'Cuenta Bancaria', key: 'account', width: 25 },
      { header: 'Contacto de Emergencia', key: 'emergencyContact', width: 25 },
      { header: 'Número de Emergencia', key: 'emergencyNumber', width: 25 },
      { header: 'Lugar de Nacimiento', key: 'bornLocation', width: 25 },
      { header: 'Género', key: 'genre', width: 25 },
      { header: 'No. de Clínica', key: 'clinicNo', width: 25 },
      { header: 'Correo Electrónico', key: 'email', width: 25 },
      { header: 'Número de Teléfono', key: 'number', width: 25 },
      { header: 'Dirección', key: 'direction', width: 25 },
    ];

    worksheet.addRows(rows);

    worksheet.getRow(1).eachCell((cell) => {
      cell.style = { font: { bold: true } };
    });

    return await workbook.xlsx.writeBuffer();
  }

  async exportBasic() {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Inventario');

    const rows =
      await sql`select CONCAT(employees.name, ' ', "paternalLastName", ' ', "maternalLastName") as "name", "noEmpleado", positions.name as position, areas.name as area from employees
    join areas on areas.id = employees."areaId"
    join positions on positions.id = employees."positionId"
    where active`;

    worksheet.columns = [
      { header: 'No. Empleado', key: 'noEmpleado', width: 25 },
      { header: 'Nombre', key: 'name', width: 25 },
      { header: 'Área', key: 'area', width: 25 },
      { header: 'Puesto', key: 'position', width: 25 },
    ];

    worksheet.addRows(rows);

    worksheet.getRow(1).eachCell((cell) => {
      cell.style = { font: { bold: true } };
    });

    return workbook.xlsx.writeBuffer();
  }
}
