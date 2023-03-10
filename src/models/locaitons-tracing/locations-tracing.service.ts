import { Injectable } from '@nestjs/common';
import { LocationsTracingDTO } from './dto';
import { LocationsTracingRepository } from './repositories';
import { plainToClass } from 'class-transformer';
import { Between } from 'typeorm';
@Injectable()
export class LocationsTracingService {
  constructor(private locationsTracingRepository: LocationsTracingRepository) {}

  async getAll(): Promise<LocationsTracingDTO[]> {
    const locationsTraces = await this.locationsTracingRepository.find({});
    return plainToClass(LocationsTracingDTO, locationsTraces, {
      excludeExtraneousValues: true,
    });
  }

  async getLatestCreated(): Promise<LocationsTracingDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const locationsTraces = await this.locationsTracingRepository.find({
      where: { createdAt: Between(yesterday, now) },
    });
    return plainToClass(LocationsTracingDTO, locationsTraces, { excludeExtraneousValues: true });
  }

  async getLatestUpdated(): Promise<LocationsTracingDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const locationsTraces = await this.locationsTracingRepository
    .createQueryBuilder('locations-tracing')
    .where('locations-tracing.updatedAt <= :now', { now })
    .andWhere('locations-tracing.updatedAt >= :yesterday', { yesterday })
    .andWhere('locations-tracing.createdAt <> locations-tracing.updatedAt')
    .getMany();
  
    return plainToClass(LocationsTracingDTO, locationsTraces, { excludeExtraneousValues: true });
  }
}
