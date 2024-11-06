import { HttpException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import sql from 'src/utils/db';
import { getWeekDays } from 'src/utils/functions';
import { getSingleSchema, weekSchema } from './assistance.schema';

@Injectable()
export class AssistanceService {
  async getWeek(body: z.infer<typeof weekSchema>) {
    const [firstDate] = getWeekDays(body.date);

    const assistance =
      await sql`SELECT id, "incidenceId0", "incidenceId1", "incidenceId2", "incidenceId3", "incidenceId4", "areaId", "positionId", 
      (select name from employees where id = "employeeId"),
      (select "noEmpleado" from employees where id = "employeeId")

      from assistance WHERE "mondayDate" = ${firstDate}
    ORDER BY "areaId", "positionId", "name";`;

    return assistance;
  }

  async getSingle(body: z.infer<typeof getSingleSchema>) {
    return body;
  }

  async createWeek(body: z.infer<typeof weekSchema>) {
    const [firstDate] = getWeekDays(body.date);
    const [actualDate] = getWeekDays(new Date());

    if (new Date(firstDate) > new Date(actualDate))
      throw new HttpException('No se puede generar una semana futura', 400);

    const [alreadyExists] =
      await sql`select 1 from assistance where "mondayDate" = ${firstDate}`;
    if (alreadyExists) throw new HttpException('Ya se genero esa semana', 400);

    await sql`INSERT INTO assistance ("employeeId", "areaId", "positionId", "mondayDate", "incidenceId0", "incidenceId1", "incidenceId2", "incidenceId3", "incidenceId4")
    SELECT id, "areaId", "positionId", ${firstDate}, 1,1,1,1,1 FROM employees where active`;

    await sql`INSERT INTO employeeproductivity ("assistanceId")
    select id from assistance where "mondayDate" = ${firstDate} and (select captured from areas where id = assistance."areaId") = true`;

    return;
  }

  async editSingle(body) {
    await sql`update assistance set ${sql(body)} where id = ${body.id}`;
    return;
  }

  async export(body: z.infer<typeof weekSchema>) {
    const [firstDate] = getWeekDays(body.date);

    const assistance = await sql`SELECT id, 
      (SELECT code FROM incidences WHERE id = "incidenceId0") AS lunes,
      (SELECT code FROM incidences WHERE id = "incidenceId1") AS martes,
      (SELECT code FROM incidences WHERE id = "incidenceId2") AS miercoles,
      (SELECT code FROM incidences WHERE id = "incidenceId3") AS jueves,
      (SELECT code FROM incidences WHERE id = "incidenceId4") AS viernes,
      (SELECT name FROM areas WHERE id = "areaId") AS area,
      (SELECT name FROM positions WHERE id = "positionId") AS position,
      (SELECT name FROM employees WHERE id = "employeeId") AS name,
      (SELECT "noEmpleado" FROM employees WHERE id = "employeeId") AS "noEmpleado"
FROM assistance 
WHERE "mondayDate" = ${firstDate}
ORDER BY "areaId", "positionId", "name";
`;

    return assistance;
  }
}
