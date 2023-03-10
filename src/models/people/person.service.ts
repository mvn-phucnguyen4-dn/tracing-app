import { Injectable } from '@nestjs/common';
import { PersonRepository } from './repositories';
import { PersonDTO } from './dto';
import { plainToClass } from 'class-transformer';
import { Between } from 'typeorm';
@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  async getAll(): Promise<PersonDTO[]> {
    const people = await this.personRepository.find({});
    return plainToClass(PersonDTO, people, { excludeExtraneousValues: true });
  }

  async getLatestCreated(): Promise<PersonDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const people = await this.personRepository.find({
      where: { createdAt: Between(yesterday, now) },
    });
    return plainToClass(PersonDTO, people, { excludeExtraneousValues: true });
  }

  async getLatestUpdated(): Promise<PersonDTO[]> {
    const now = new Date(Date.now());
    const yesterday = new Date(now.getTime());
    yesterday.setDate(now.getDate() - 1);

    const people = await this.personRepository
    .createQueryBuilder('people')
    .where('people.updatedAt <= :now', { now })
    .andWhere('people.updatedAt >= :yesterday', { yesterday })
    .andWhere('people.createdAt <> people.updatedAt')
    .getMany();

    return plainToClass(PersonDTO, people, { excludeExtraneousValues: true });
  }
}
