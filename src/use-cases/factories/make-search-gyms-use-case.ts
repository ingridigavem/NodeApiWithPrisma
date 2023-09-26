import { PrismaGymsRepository } from '@/repositories/prisma/prima-gyms-repository';
import { SearchGymsUseCase } from '../search-gym';

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
