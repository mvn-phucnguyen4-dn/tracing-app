import { Expose } from 'class-transformer';
import { typeStatusArray } from '../entities';

export class PersonDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  mobile: string;

  @Expose()
  statusUpdateDate: Date;

  @Expose()
  healthStatus: typeStatusArray;

  @Expose()
  locationId: string;
}
