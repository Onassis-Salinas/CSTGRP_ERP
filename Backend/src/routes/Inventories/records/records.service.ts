import { Injectable } from '@nestjs/common';
import sql from 'src/utils/db';

@Injectable()
export class RecordsService {
  async getRecords() {
    const records =
      await sql`Select created_at, text, "user", action from records where module = 'inventory' order by id DESC limit 1000`;
    return records;
  }
}
