import request from 'supertest';
import { app } from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh token', async () => {
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

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken'),
    ]);
  });
});
