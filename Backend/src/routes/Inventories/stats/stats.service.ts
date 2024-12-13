import { Injectable } from '@nestjs/common';
import sql from 'src/utils/db';

@Injectable()
export class StatsService {
  async getOutOfStock() {
    const movements =
      await sql`Select (materials.amount + materials."leftoverAmount") as balance,
      ABS(materials.amount + materials."leftoverAmount" + materialmovements.amount) as missing,
      materials.code, materials.measurement, ABS(materialmovements."amount") as amount, materialie.due, materialie.jobpo
      FROM materialmovements
      JOIN materials on materials.id = materialmovements."materialId"
      JOIN materialie on materialie.id = materialmovements."movementId"
      WHERE materialmovements.active = false
      AND materials.amount + materials."leftoverAmount" + materialmovements.amount < 0`;

    return movements;
  }

  async getMaterialWarnings() {
    const materials =
      await sql`select code, amount, "minAmount",measurement from materials where amount <= "minAmount" and "minAmount" > 0 order by code desc`;
    return materials;
  }
}
