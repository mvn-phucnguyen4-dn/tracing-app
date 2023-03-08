import { Expose } from 'class-transformer';

export class LocationsTracingDTO {
  @Expose()
  id: string;

  @Expose()
  locationId: string;

  @Expose()
  visitDate: Date;

  @Expose()
  personId: string;
}
