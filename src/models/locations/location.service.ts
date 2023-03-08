import { Injectable } from '@nestjs/common';
import { LocationRepository } from './repositories/location.repository';
import { LocationDTO } from './dto/location.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async getAll(): Promise<LocationDTO[]> {
    const locations = await this.locationRepository.find({});
    return plainToClass(LocationDTO, locations, {
      excludeExtraneousValues: true,
    });
  }
}
