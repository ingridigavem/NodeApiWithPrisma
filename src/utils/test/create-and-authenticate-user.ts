import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
  // create user
  await request(app.server).post('/users').send({
    name: 'Name For Test',
    email: 'test@example.com',
    password: 'password',
  });

  // create session with same user created before
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'test@example.com',
    password: 'password',
  });

  const { token } = authResponse.body;
  return { token };
}
