import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { LocationsTracing } from '../../models/locaitons-tracing/entities';

define(LocationsTracing, () => {
  const locationsTracing = new LocationsTracing();
  locationsTracing.visitDate = faker.date.between(
    '2022-10-01T00:00:00.000Z',
    Date.now(),
  );
  return locationsTracing;
});
