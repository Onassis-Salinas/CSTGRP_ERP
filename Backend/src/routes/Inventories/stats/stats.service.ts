import { Injectable } from '@nestjs/common';
import sql from 'src/utils/db';

@Injectable()
export class StatsService {
  async getOutOfStock() {
    const movements = await sql`WITH MaterialSum AS (
    SELECT 
        materials.id,
        SUM(materialmovements.amount) as total_amount
    FROM materialmovements
    JOIN materials ON materials.id = materialmovements."materialId"
    WHERE materialmovements.active = false
    GROUP BY materials.id
    )   

    SELECT 
        DISTINCT(materials.code), 
        materials.measurement, 
        (materials.amount + materials."leftoverAmount") as balance,
        (
          SELECT string_agg("jobpo", ', ') 
          FROM materialmovements 
          JOIN materialie ON materialie.id = materialmovements."movementId" 
          WHERE "materialId" = materials.id 
          AND materialmovements.active = false
        ) as jobpo,
        ABS(ms.total_amount) as amount,
        ABS(materials.amount + materials."leftoverAmount" + ms.total_amount) as missing
    FROM materials
    JOIN MaterialSum ms ON ms.id = materials.id
    WHERE materials.amount + materials."leftoverAmount" + ms.total_amount < 0`;

    const secondMovements = await sql`SELECT 
    code, 
    jobpo, 
    measurement, 
    (materials.amount + materials."leftoverAmount") AS missing
    FROM materialmovements
    JOIN materials ON materials.id = materialmovements."materialId"
    JOIN materialie ON materialie.id = materialmovements."movementId"
    WHERE 
      (materials.amount + materials."leftoverAmount") < 0
      AND materialmovements.id = (
          SELECT MAX(materialmovements_inner.id)
          FROM materialmovements materialmovements_inner
          WHERE materialmovements_inner."materialId" = materialmovements."materialId"
      )`;

    return [...movements, {}, ...secondMovements];
  }

  async getMaterialWarnings() {
    const materials =
      await sql`select code, amount, "minAmount",measurement from materials where amount <= "minAmount" and "minAmount" > 0 order by code desc`;
    return materials;
  }
}
