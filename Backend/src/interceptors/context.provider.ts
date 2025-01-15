import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class ContextProvider {
  constructor(@Inject(REQUEST) private readonly req) {}

  getUserId() {
    return this.req.userId;
  }
}
