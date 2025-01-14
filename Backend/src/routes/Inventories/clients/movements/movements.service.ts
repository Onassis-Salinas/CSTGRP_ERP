import jwt from 'jsonwebtoken';
import { HttpException, Injectable } from '@nestjs/common';
import { z } from 'zod';
import sql from 'src/utils/db';
import { clientSchema, idSchema } from './movements.schema';

@Injectable()
export class MovementsService {
  async getMaterialComparison(
    body: z.infer<typeof idSchema>,
    token: string,
    query: z.infer<typeof clientSchema>,
  ) {
    const clientId = await getUserName(token, query);

    const movements = await sql`SELECT 
    materialie.Due,
    materialie.import,
    materialie.programation,
    materialie.jobpo,
    (
        SELECT SUM(amount) 
        FROM materialmovements AS m
        WHERE m."materialId" = materialmovements."materialId" AND m."movementId" = materialmovements."movementId" AND m.extra = false
    ) AS "amount",
    (
        SELECT SUM(amount) 
        FROM materialmovements AS m
        WHERE m."materialId" = materialmovements."materialId" AND m."movementId" = materialmovements."movementId"
    ) AS "realAmount",
    SUM((
        SELECT SUM(amount) 
        FROM materialmovements AS m
        WHERE m."materialId" = materialmovements."materialId" AND m."movementId" = materialmovements."movementId"
    )) OVER (ORDER BY materialie.due ASC, materialmovements.id ASC) AS balance
FROM
    materialmovements
JOIN
    materials ON materials.id = materialmovements."materialId"
JOIN
    materialie ON materialie.id = materialmovements."movementId"
WHERE
    materials.id = ${body.id}
    AND materialmovements.id IN (
        SELECT MAX(id)
        FROM materialmovements
        WHERE
            "materialId" = ${body.id}
            AND "clientId" = ${clientId}
            AND active = true
            AND extra = false
        GROUP BY "movementId"
    )
    AND "clientId" = ${clientId}
ORDER BY
    materialie.due DESC,
    materialmovements.id DESC
LIMIT 300;
`;
    return movements;
  }

  async getInventory(token: string, query: z.infer<typeof clientSchema>) {
    const clientId = await getUserName(token, query);

    const inventory =
      await sql`Select id, code, description,  measurement, (amount + "leftoverAmount") as amount from materials where "clientId" = ${clientId} order by code`;

    return inventory;
  }

  async getClients() {
    const rows = await sql`select name as value, name, color from clients`;
    return rows;
  }
}

async function getUserName(token: string, query: z.infer<typeof clientSchema>) {
  const user: any = await jwt.verify(token, process.env.JWT_SECRET);

  let [area] = await sql`select id from clients where name = ${user.username}`;
  if (!area && user.perm_inventory)
    [area] =
      await sql`select id from clients where name = ${query.clientId || ''}`;
  if (!area) throw new HttpException('Cliente no encontrado', 403);

  return area.id;
}
