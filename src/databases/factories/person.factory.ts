import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Person } from '../../models/people/entities';

define(Person, () => {
  const person = new Person();
  person.name = faker.name.fullName();
  person.healthStatus = faker.helpers.arrayElement([
    'Green',
    'Yellow',
    'Orange',
    'Red',
  ]);
  person.mobile = faker.phone.number('###-###-###');
  person.statusUpdateDate = faker.date.between('2023-01-01T00:00:00.000Z', '2030-03-01T00:00:00.000Z');
  return person;
});
