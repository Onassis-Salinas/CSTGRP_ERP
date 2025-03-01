import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import postgres from 'postgres';
import {
  createRecord,
  type module as Module,
  type action,
} from 'src/utils/records';
import { FastifyRequest } from 'fastify';

@Injectable({ scope: Scope.REQUEST })
export class ContextProvider {
  constructor(
    @Inject(REQUEST) private readonly req: FastifyRequest & { userId: string },
    @Inject('MODULE') private readonly module: Module,
  ) {}

  get userId() {
    return this.req.userId;
  }

  async record(text: string, sql?: postgres.Sql, action?: action) {
    if (!action) {
      if (this.req.method === 'POST') action = 'create';
      if (this.req.method === 'DELETE') action = 'delete';
      if (this.req.method === 'PUT') action = 'update';
    }

    return await createRecord(text, action, this.userId, this.module, sql);
  }
}
