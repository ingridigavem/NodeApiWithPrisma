import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { SearchGymsUseCase } from './search-gym';

let gymRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymRepository.create({
      title: 'Test gym',
      description: null,
      phone: null,
      latitude: -20.2721352,
      longitude: -40.2986506,
    });

    await gymRepository.create({
      title: 'gym-02',
      description: null,
      phone: null,
      latitude: -20.2721352,
      longitude: -40.2986506,
    });

    const { gyms } = await sut.execute({
      query: 'Test',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Test gym' })]);
  });

  it('should be able to search paginated for gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymRepository.create({
        title: `Test gym-${i}`,
        description: null,
        phone: null,
        latitude: -20.2721352,
        longitude: -40.2986506,
      });
    }

    const { gyms } = await sut.execute({
      query: 'Test',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Test gym-21' }),
      expect.objectContaining({ title: 'Test gym-22' }),
    ]);
  });
});
