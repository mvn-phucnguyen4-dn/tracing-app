import { Factory, Seeder } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Person } from '../../models/people/entities';
import { PeopleTracing } from '../../models/people-tracing/entities';
import { LocationsTracing } from '../../models/locaitons-tracing/entities';
import { Location } from '../../models/locations/entities';
export default class DailyDatabaseSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const people: Person[] = await factory(Person)().createMany(20);
    const locations: Location[] = await factory(Location)().createMany(50);
    console.log('seed daily location, people');

    const locationTracings: LocationsTracing[] = await factory(
      LocationsTracing,
    )()
      .map(async (locationTracing) => {
        locationTracing.personId = faker.helpers.arrayElement(
          people.map((person) => person.id),
        );
        locationTracing.locationId = faker.helpers.arrayElement(
          locations.map((location) => location.id),
        );
        return locationTracing;
      })
      .createMany(50);
    console.log('seed daily location tracing');
    const peopleTracings: PeopleTracing[] = await factory(PeopleTracing)()
      .map(async (peopleTracing) => {
        const personIdFirst = faker.helpers.arrayElement(
          people.map((person) => person.id),
        );
        const personIdSecond = faker.helpers.arrayElement(
          people
            .filter((person) => person.id != personIdFirst)
            .map((person) => person.id),
        );

        peopleTracing.personIdFirst = personIdFirst;
        peopleTracing.personIdSecond = personIdSecond;
        return peopleTracing;
      })
      .createMany(50);
    console.log('seed daily people tracing');
  }
}
