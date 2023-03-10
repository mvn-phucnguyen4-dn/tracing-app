import { Injectable } from '@nestjs/common';
import { LocationRepository } from './repositories/location.repository';
import { LocationDTO } from './dto/location.dto';
import { plainToClass } from 'class-transformer';
import { Between } from 'typeorm';
@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async getAll(): Promise<LocationDTO[]> {
    const locations = await this.locationRepository.find({});
    return plainToClass(LocationDTO, locations, {
      excludeExtraneousValues: true,
    });
  }

  async getLatestCreated(): Promise<LocationDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const locations = await this.locationRepository.find({
      where: { createdAt: Between(yesterday, now) },
    });
    return plainToClass(LocationDTO, locations, { excludeExtraneousValues: true });
  }

  async getLatestUpdated(): Promise<LocationDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const locations = await this.locationRepository
    .createQueryBuilder('locations')
    .where('locations.updatedAt <= :now', { now })
    .andWhere('locations.updatedAt >= :yesterday', { yesterday })
    .andWhere('locations.createdAt <> locations.updatedAt')
    .getMany();

    return plainToClass(LocationDTO, locations, { excludeExtraneousValues: true });
  }
}
