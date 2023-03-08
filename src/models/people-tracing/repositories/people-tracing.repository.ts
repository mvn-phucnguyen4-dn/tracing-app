import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { PeopleTracing } from '../entities';
@Injectable()
export class PeopleTracingRepository extends Repository<PeopleTracing> {
  constructor(private datasource: DataSource) {
    super(PeopleTracing, datasource.createEntityManager());
  }
}
