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

dotenv.config();

const cookieConfig = {
  sameSite: false,
  path: '/',
  domain: process.env.COOKIES_DOMAIN,
  secure: false,
  maxAge: 315360000,
};

@Injectable()
export class UsersService {
  async loginUser(body: z.infer<typeof loginSchema>, res) {
    const [user] =
      await sql`select * from users where username = ${body.username}`;
    if (!user) return sendError('Usuario invalido', 400);

    const match = await bcrypt.compare(body.password, user.password);
    if (!match) return sendError('Contraseña incorrecta', 400);

    const secret: Secret = process.env.JWT_SECRET || 'sin secreto';
    const token = jwt.sign(user, secret, { expiresIn: '200h' });

    console.log(user);
    res.setCookie('token', token, { ...cookieConfig, httpOnly: true });

    delete user.password;
    Object.keys(user).forEach((key) => {
      res.setCookie(key, user[key], cookieConfig);
    });

    res.send();
  }

  async logoutUser(res) {
    res
      .setCookie('token', '', { ...cookieConfig, httpOnly: true })
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

    await sql`insert into users ${sql({ ...body, password: hash })}`;
    return;
  }

  async editUser(body: z.infer<typeof editSchema>) {
    if (body.password) body.password = await bcrypt.hash(body.password, 10);

    console.log(body);
    await sql`update users set ${sql(body)} where id = ${body.id}`;
    return;
  }

  async deleteUser(body: z.infer<typeof deleteSchema>) {
    await sql`delete from users where id = ${body.id}`;

    return;
  }
}
