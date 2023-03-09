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
  person.statusUpdateDate = faker.date.between('2022-10-01T00:00:00.000Z', Date.now());
  return person;
});
