import { Injectable } from '@nestjs/common';
import { PeopleTracingRepository } from './repositories/people-tracing.repository';
import { PeopleTracingDTO } from './dto';
import { plainToClass } from 'class-transformer';
import { Between } from 'typeorm';
import { PersonRepository } from '../people/repositories';
import { PeopleTracing } from './entities';
import { faker } from '@faker-js/faker';

@Injectable()
export class PeopleTracingService {
  constructor(
    private peopleTracingRepository: PeopleTracingRepository,
    private personRepository: PersonRepository,
  ) {}

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

  async generatePeopleTracesByDaily(): Promise<PeopleTracingDTO[]> {
    const people = await this.personRepository.find({});

    const peopleTraces: PeopleTracing[] = [];
    const now: Date = new Date(Date.now());
    for (let i = 0; i < 50; i++) {
      const personIdFirst = faker.helpers.arrayElement(
        people.map((person) => person.id),
      );
      const personIdSecond = faker.helpers.arrayElement(
        people.map((person) => person.id).filter(id => id != personIdFirst),
      );
      const peopleTracing = this.peopleTracingRepository.create({
        personIdFirst: personIdFirst,
        personIdSecond: personIdSecond,
        contactType: 'Other',
        statusUpdateDate: now
      });
      peopleTraces.push(peopleTracing);
    }
    const response: PeopleTracing[] = await this.peopleTracingRepository.save(
      peopleTraces,
    );
    return plainToClass(PeopleTracingDTO, response, {
      excludeExtraneousValues: true,
    });
  }
}
