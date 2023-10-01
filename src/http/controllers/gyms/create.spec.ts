import request from 'supertest';
import { app } from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Title',
        description: 'Gym description',
        phone: '9999999999',
        latitude: -20.1870891,
        longitude: -40.258307,
      });

    expect(response.statusCode).toEqual(201);
  });
});
