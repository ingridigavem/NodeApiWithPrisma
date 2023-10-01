import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';

import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { refresh } from './refresh';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh); // patch pq é a atualizacao de uma informacao unica

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
