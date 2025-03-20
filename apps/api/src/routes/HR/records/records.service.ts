import { Injectable } from '@nestjs/common';
import { createRecordSchema, getEmployeeHistorySchema } from './records.schema';
import { z } from 'zod';
import sql from 'src/utils/db';

@Injectable()
export class RecordsService {
  async getEmployeeHistory(body: z.infer<typeof getEmployeeHistorySchema>) {
    return await sql`
      SELECT 
        er.id,
        er.date,
        er.type,
        er.text,
        e.name,
        e."paternalLastName",
        e."maternalLastName"
      FROM employeeRecords er
      JOIN employees e ON e.id = er."employeeId"
      WHERE er."employeeId" = ${body.employeeId}
      ORDER BY er.date DESC
    `;
  }

  async uploadRecord(body: z.infer<typeof createRecordSchema>) {
    await sql`
      INSERT INTO employeeRecords ("employeeId", date, type, text) 
      VALUES (${body.employeeId}, ${body.date}, ${body.type}, ${body.text})
    `;
    return;
  }
}
