import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  // create user
  await prisma.user.create({
    data: {
      name: 'Name For Test',
      email: 'test@example.com',
      password_hash: await hash('password', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  });

  // create session with same user created before
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'test@example.com',
    password: 'password',
  });

  const { token } = authResponse.body;
  return { token };
}
