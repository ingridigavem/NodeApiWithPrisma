import request from 'supertest';
import { app } from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Name For Test',
      email: 'test@example.com',
      password: 'password',
    });

    expect(response.statusCode).toEqual(201);
  });
});
