import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Location } from '../../models/locations/entities';

define(Location, () => {
  const location = new Location();
  location.name = faker.address.cityName();
  location.address = faker.address.streetAddress();
  location.status = faker.helpers.arrayElement([
    'Green',
    'Yellow',
    'Orange',
    'Red',
  ]);
  location.pincode = faker.address.countryCode();
  location.statusUpdateDate = faker.date.between(
    '2022-10-01T00:00:00.000Z',
    Date.now(),
  );
  return location;
});
