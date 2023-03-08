import { Injectable } from '@nestjs/common';
import { PeopleTracingRepository } from './repositories/people-tracing.repository';
import { PeopleTracingDTO } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PeopleTracingService {
  constructor(private peopleTracingRepository: PeopleTracingRepository) {}

  async getAll(): Promise<PeopleTracingDTO[]> {
    const peopleTraces = await this.peopleTracingRepository.find({});
    return plainToClass(PeopleTracingDTO, peopleTraces, {
      excludeExtraneousValues: true,
    });
  }
}
