import { Injectable } from '@nestjs/common';
import { LocationsTracingDTO } from './dto';
import { LocationsTracingRepository } from './repositories';
import { plainToClass } from 'class-transformer';
import { Between } from 'typeorm';
import { PersonRepository } from '../people/repositories';
import { LocationsTracing } from './entities';
import { faker } from '@faker-js/faker';
import { LocationRepository } from '../locations/repositories/location.repository';

@Injectable()
export class LocationsTracingService {
  constructor(
    private locationsTracingRepository: LocationsTracingRepository,
    private locationRepository: LocationRepository,
    private personRepository: PersonRepository,
  ) {}

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
    return plainToClass(LocationsTracingDTO, locationsTraces, {
      excludeExtraneousValues: true,
    });
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

    return plainToClass(LocationsTracingDTO, locationsTraces, {
      excludeExtraneousValues: true,
    });
  }

  async generateLocationTracesByDaily(): Promise<LocationsTracingDTO[]> {
    const people = await this.personRepository.find({});
    const locations = await this.locationRepository.find({});
    const locationTraces: LocationsTracing[] = [];
    const now: Date = new Date(Date.now());
    for (let i = 0; i < 50; i++) {
      const locationTracing = this.locationsTracingRepository.create({
        personId: faker.helpers.arrayElement(people.map((person) => person.id)),
        locationId: faker.helpers.arrayElement(
          locations.map((location) => location.id),
        ),
        visitDate: now,
      });
      locationTraces.push(locationTracing);
    }
    const response: LocationsTracing[] =
      await this.locationsTracingRepository.save(locationTraces);
    return plainToClass(LocationsTracingDTO, response, {
      excludeExtraneousValues: true,
    });
  }
}
