import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { PeopleTracing } from '../../models/people-tracing/entities';

define(PeopleTracing, () => {
  const peopleTracing = new PeopleTracing();
  peopleTracing.contactType = faker.helpers.arrayElement([
    'Cohabitant',
    'Neighbour',
    'Other',
  ]);
  peopleTracing.statusUpdateDate = faker.date.between(
    '2023-01-01T00:00:00.000Z',
    '2030-03-01T00:00:00.000Z',
  );
  return peopleTracing;
});
