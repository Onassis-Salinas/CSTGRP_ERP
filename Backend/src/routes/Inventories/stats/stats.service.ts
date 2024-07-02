import { Injectable } from '@nestjs/common';
import sql from 'src/utils/db';

@Injectable()
export class StatsService {
  async getPendingMovements() {
    const movements =
      await sql`Select materials.code, materials.measurement, materialmovements.amount, materialmovements."realAmount", materialie.due, materialie.jobpo
      FROM materialmovements
      JOIN materials on materials.id = materialmovements."materialId"
      JOIN materialie on materialie.id = materialmovements."movementId"
      WHERE materialmovements.active = false`;
    return movements;
  }

  async getOutOfStock() {
    const pendingMovements =
      await sql`Select materials.code, materials.amount, materials.measurement, materialmovements."realAmount"
      FROM materialmovements
      JOIN materials on materials.id = materialmovements."materialId"
      JOIN materialie on materialie.id = materialmovements."movementId"
      WHERE materialmovements.active = false`;

    let materials = [];

    pendingMovements.forEach((movement) => {
      const index = materials.findIndex((e) => e.code === movement.code);

      if (index !== -1) return (materials[index].amount += movement.realAmount);

      materials.push({
        code: movement.code,
        amount: movement.amount + movement.realAmount,
        measurement: movement.measurement,
      });
    });

    materials = materials.filter((material) => material.amount <= 0);

    console.log(materials);
    return materials;
  }

  async getMaterialWarnings() {
    const materials =
      await sql`select code, amount, "minAmount",measurement from materials where amount <= "minAmount" order by code desc`;
    return materials;
  }
}
