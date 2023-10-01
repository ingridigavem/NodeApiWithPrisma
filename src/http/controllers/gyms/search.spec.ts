import request from 'supertest';
import { app } from '@/app';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Title 1',
        description: 'Gym description 1',
        phone: '9999999999',
        latitude: -20.1870891,
        longitude: -40.258307,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Title search',
        description: 'Gym description search',
        phone: '9999999999',
        latitude: -20.1870891,
        longitude: -40.258307,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'search' })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Title search',
      }),
    ]);
  });
});
