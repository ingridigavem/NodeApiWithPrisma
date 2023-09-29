/* eslint-disable @typescript-eslint/no-floating-promises */
import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch (error) {
    reply.status(401).send({ message: 'Unauthorized.' });
  }
}