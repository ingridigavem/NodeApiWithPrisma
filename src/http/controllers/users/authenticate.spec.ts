import request from 'supertest';
import { app } from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to authenticate', async () => {
    // create user
    await request(app.server).post('/users').send({
      name: 'Name For Test',
      email: 'test@example.com',
      password: 'password',
    });

    // create session with same user created before
    const response = await request(app.server).post('/sessions').send({
      email: 'test@example.com',
      password: 'password',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
