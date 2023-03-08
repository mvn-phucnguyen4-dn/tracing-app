import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { LocationsTracing } from '../entities';
@Injectable()
export class LocationsTracingRepository extends Repository<LocationsTracing> {
  constructor(private datasource: DataSource) {
    super(LocationsTracing, datasource.createEntityManager());
  }
}
