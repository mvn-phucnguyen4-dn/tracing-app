import { Expose } from 'class-transformer';
import { typeStatusArray } from '../entities';

export class LocationDTO {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  pincode: string;

  @Expose()
  redScore: number;

  @Expose()
  statusUpdateDate: Date;

  @Expose()
  status: typeStatusArray;
}
