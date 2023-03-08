import { Injectable } from '@nestjs/common';
import { LocationsTracingDTO } from './dto';
import { LocationsTracingRepository } from './repositories';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocationsTracingService {
  constructor(private locationsTracingRepository: LocationsTracingRepository) {}

  async getAll(): Promise<LocationsTracingDTO[]> {
    const locationsTraces = await this.locationsTracingRepository.find({});
    return plainToClass(LocationsTracingDTO, locationsTraces, {
      excludeExtraneousValues: true,
    });
  }
}
