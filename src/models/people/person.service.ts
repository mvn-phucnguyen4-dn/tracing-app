import { Injectable } from '@nestjs/common';
import { PersonRepository } from './repositories';
import { PersonDTO } from './dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PersonService {
  constructor(private personRepository: PersonRepository) {}

  async getAll(): Promise<PersonDTO[]> {
    const people = await this.personRepository.find({});
    return plainToClass(PersonDTO, people, { excludeExtraneousValues: true });
  }
}
