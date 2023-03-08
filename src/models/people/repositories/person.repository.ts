import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Person } from '../entities';
@Injectable()
export class PersonRepository extends Repository<Person> {
  constructor(private datasource: DataSource) {
    super(Person, datasource.createEntityManager());
  }
}
