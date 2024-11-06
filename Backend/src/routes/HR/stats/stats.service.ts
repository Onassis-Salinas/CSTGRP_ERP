import { Injectable } from '@nestjs/common';
import sql from 'src/utils/db';
import { getDayNumber, getWeekDays } from 'src/utils/functions';
import { areaAssistanceInfoSchema, dateSchema } from './stats.schema';
import { z } from 'zod';

@Injectable()
export class StatsService {
  async birthDays(body: z.infer<typeof dateSchema>) {
    const rows =
      await sql`SELECT "noEmpleado", name, "bornDate" from employees where extract(month from "bornDate") = extract(month from ${body.date}::DATE)`;

    return rows;
  }

  async weeklyFires(body: z.infer<typeof dateSchema>) {
    const [firstDate] = getWeekDays(body.date);
    const rows =
      await sql`SELECT COUNT(*) as count FROM assistance where Date = ${firstDate} and 6 IN (incidenceId0, incidenceId1, incidenceId2, incidenceId3, incidenceId4)`;

    return rows;
  }

  async weeklyHires(body: z.infer<typeof dateSchema>) {
    const [firstDate, secondDate] = getWeekDays(body.date);
    const rows =
      await sql`SELECT COUNT(*) as count FROM employees where admissionDate >= ${firstDate} and admissionDate <= ${secondDate}`;

    return rows;
  }

  async assistance(body: z.infer<typeof dateSchema>) {
    const [firstDate] = getWeekDays(body.date);
    const rows = [];
    for (let i = 0; i < 5; i++) {
      const evaluatedWeek = new Date(
        new Date(firstDate).setDate(new Date(firstDate).getDate() - i * 7),
      )
        .toISOString()
        .split('T')[0];

      const activeEmployees = (
        await sql`select count(*) from assistance where "mondayDate"  = ${evaluatedWeek}`
      )[0].count;
      const week = await sql`SELECT 
      (
        SUM(CASE WHEN "incidenceId0" = 1 THEN 1 ELSE 0 END) +
        SUM(CASE WHEN "incidenceId1" = 1 THEN 1 ELSE 0 END) +
        SUM(CASE WHEN "incidenceId2" = 1 THEN 1 ELSE 0 END) +
        SUM(CASE WHEN "incidenceId3" = 1 THEN 1 ELSE 0 END) +
        SUM(CASE WHEN "incidenceId4" = 1 THEN 1 ELSE 0 END)
        ) / (COUNT(*) * 5.0) AS value, 
        ${evaluatedWeek + ' / ' + activeEmployees + ' Empleados'} AS name
        FROM 
        "assistance"
        WHERE 
        "mondayDate" = ${evaluatedWeek}`;
      rows.push(week[0]);
    }

    return rows
      .reverse()
      .map((e) => ({ ...e, value: Math.floor(e.value * 100) }));
  }

  async assistanceInfo(body: z.infer<typeof dateSchema>) {
    const [firstDate] = getWeekDays(body.date);
    const dayNumber = getDayNumber(body.date);

    const rows =
      await sql`SELECT (select name from incidences where id = ${sql('incidenceId' + dayNumber)}) as name, COUNT(*) as value FROM assistance WHERE "mondayDate" = ${firstDate} GROUP BY ${sql('incidenceId' + dayNumber)}`;

    return rows;
  }

  async dailyIncidencesList(body: z.infer<typeof dateSchema>) {
    const [firstDate] = getWeekDays(body.date);
    const dayNumber = getDayNumber(body.date);

    const rows =
      await sql`SELECT (select name from incidences where id = ${sql('incidenceId' + dayNumber)}) as incidence, 
        (select name from employees where id = "employeeId"),
        (select "areaId" from employees where id = "employeeId")
      FROM assistance WHERE "mondayDate" = ${firstDate}
       AND ${sql('incidenceId' + dayNumber)} <> 1
      GROUP BY ${sql('incidenceId' + dayNumber)}, "employeeId"`;

    return rows;
  }

  async areaAssistanceInfo(query: z.infer<typeof areaAssistanceInfoSchema>) {
    const [firstDate] = getWeekDays(query.date);
    const dayNumber = getDayNumber(query.date);

    const rows =
      await sql`SELECT (select name from incidences where id = ${sql('incidenceId' + dayNumber)}) as name, COUNT(*) as value FROM assistance WHERE "mondayDate" = ${firstDate} and "employeeId" in (select id from employees where "areaId" = ${query.areaId}) GROUP BY ${sql('incidenceId' + dayNumber)}`;

    return rows;
  }

  async activeEmployees() {
    const rows = await sql`SELECT count(*) from employees where active`;
    return rows;
  }

  async employeeTemplate() {
    const rows = await sql`SELECT value from general where Name = 'Plantilla'`;
    return rows;
  }

  async employeeRotation(body: z.infer<typeof dateSchema>) {
    const [firstDate, secondDate] = getWeekDays(body.date);
    const dayMiliSeconds = 24 * 60 * 60 * 1000;

    const initialDate = new Date(
      new Date(firstDate).getTime() - 28 * dayMiliSeconds,
    )
      .toISOString()
      .split('T')[0];
    const finalDate = new Date(
      new Date(secondDate).getTime() - 7 * dayMiliSeconds,
    )
      .toISOString()
      .split('T')[0];

    const [{ fires }] = await sql`
      'Select COUNT(*) as fires from employees where quitDate >= ${initialDate} and quitDate <= ${finalDate}`;

    const [{ hires }] = await sql`
      'Select COUNT(*) as hires from employees where admissionDate >= ${initialDate} and quitDate <= ${finalDate}`;

    const [{ finalEmployees }] = await sql`
      SELECT COUNT(*) as finalEmployees FROM employees where Active = 1`;

    const initalEmployees = finalEmployees + fires - hires;

    const result =
      ((fires + hires) / 2 / ((initalEmployees + finalEmployees) / 2)) * 100;
    return result;
  }
}
