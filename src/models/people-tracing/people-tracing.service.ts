import { Injectable } from '@nestjs/common';
import { PeopleTracingRepository } from './repositories/people-tracing.repository';
import { PeopleTracingDTO } from './dto';
import { plainToClass } from 'class-transformer';
import { Between } from 'typeorm';
@Injectable()
export class PeopleTracingService {
  constructor(private peopleTracingRepository: PeopleTracingRepository) {}

  async getAll(): Promise<PeopleTracingDTO[]> {
    const peopleTraces = await this.peopleTracingRepository.find({});
    return plainToClass(PeopleTracingDTO, peopleTraces, {
      excludeExtraneousValues: true,
    });
  }

  async getLatestCreated(): Promise<PeopleTracingDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const peopleTraces = await this.peopleTracingRepository.find({
      where: { createdAt: Between(yesterday, now) },
    });
    return plainToClass(PeopleTracingDTO, peopleTraces, {
      excludeExtraneousValues: true,
    });
  }

  async getLatestUpdated(): Promise<PeopleTracingDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const peopleTraces = await this.peopleTracingRepository
      .createQueryBuilder('people-tracing')
      .where('people-tracing.updatedAt <= :now', { now })
      .andWhere('people-tracing.updatedAt >= :yesterday', { yesterday })
      .andWhere('people-tracing.createdAt <> people-tracing.updatedAt')
      .getMany();

    return plainToClass(PeopleTracingDTO, peopleTraces, {
      excludeExtraneousValues: true,
    });
  }
}
