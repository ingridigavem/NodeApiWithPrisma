import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -20.2721352,
      longitude: -40.2986506,
    });

    await gymRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -20.1870891,
      longitude: -40.258307,
    });

    const { gyms } = await sut.execute({
      userLatitude: -20.2721352,
      userLongitude: -40.2986506,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
