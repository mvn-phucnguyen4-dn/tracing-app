import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Location } from '../entities';
@Injectable()
export class LocationRepository extends Repository<Location> {
  constructor(private datasource: DataSource) {
    super(Location, datasource.createEntityManager());
  }
}
