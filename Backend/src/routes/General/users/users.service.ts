import { Injectable } from '@nestjs/common';
import {
  deleteSchema,
  editSchema,
  loginSchema,
  registerSchema,
} from './users.schema';
import { z } from 'zod';
import sql from 'src/utils/db';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import { sendError } from 'src/utils/errors';
import dotenv from 'dotenv';
import { cookieConfig, httpCookieConfig } from 'src/utils/cookies';
import { ContextProvider } from 'src/interceptors/context.provider';
import { createRecord } from 'src/utils/records';

dotenv.config();

@Injectable()
export class UsersService {
  constructor(private readonly req: ContextProvider) {}

  async loginUser(body: z.infer<typeof loginSchema>, res) {
    const [user] =
      await sql`select * from users where username = ${body.username}`;
    if (!user) {
      await createRecord(
        `Login fallido, no existe el usuario: ${body.username}`,
        {
          action: 'update',
          module: 'users',
        },
      );
      return sendError('Usuario invalido', 400);
    }

    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      await createRecord(
        `Login fallido de: ${body.username}, contraseña incorrecta`,
        {
          action: 'update',
          module: 'users',
        },
      );
      return sendError('Contraseña incorrecta', 400);
    }
    const secret: Secret = process.env.JWT_SECRET || 'sin secreto';
    const token = jwt.sign(user, secret, { expiresIn: '200h' });

    res.setCookie('token', token, httpCookieConfig);

    delete user.password;
    Object.keys(user).forEach((key) => {
      res.setCookie(key, user[key], cookieConfig);
    });

    await createRecord(
      `${body.username} inicio sesion`,
      {
        action: 'update',
        module: 'users',
      },
    );

    res.send();
  }

  async logoutUser(res) {
    res
      .setCookie('token', '', httpCookieConfig)
      .setCookie('username', '', cookieConfig)
      .send();
  }
  async findAllUsers() {
    const users = await sql`SELECT * FROM users ORDER BY username ASC`;
    const filteredUsers = users.map((obj) => ({ ...obj, password: '' }));
    return filteredUsers;
  }

  async registerUser(body: z.infer<typeof registerSchema>) {
    const hash = await bcrypt.hash(body.password, 10);

    await sql.begin(async (sql) => {
      await sql`insert into users ${sql({ ...body, password: hash })}`;
      await createRecord(
        `Creo el usuario ${body.username}`,
        {
          action: 'create',
          module: 'users',
          user: this.req.getUserId(),
        },
        sql,
      );
    });
    return;
  }

  async editUser(body: z.infer<typeof editSchema>) {
    if (body.password) body.password = await bcrypt.hash(body.password, 10);

    const [previousObj] =
      await sql`select username from users where id = ${body.id}`;

    await sql.begin(async (sql) => {
      await sql`update users set ${sql(body)} where id = ${body.id}`;
      await createRecord(
        `Actualizo el usuario ${previousObj.username}`,
        {
          action: 'update',
          module: 'users',
          user: this.req.getUserId(),
        },
        sql,
      );
    });
    return;
  }

  async deleteUser(body: z.infer<typeof deleteSchema>) {
    await sql.begin(async (sql) => {
      const [deletedUser] =
        await sql`delete from users where id = ${body.id} returning username`;

      await createRecord(
        `Elimino el usuario ${deletedUser.username}`,
        {
          action: 'delete',
          module: 'users',
          user: this.req.getUserId(),
        },
        sql,
      );
    });

    return;
  }
}
