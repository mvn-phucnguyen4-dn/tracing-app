import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from 'src/models/people/person.module';
import { PostgresProviderModule } from 'src/providers/postgres/provider.module';
import { LocationModule } from 'src/models/locations/location.module';
import { LocationsTracingModule } from 'src/models/locaitons-tracing/locations-tracing.module';
import { PeopleTracingModule } from 'src/models/people-tracing/people-tracing.module';

@Module({
  imports: [
    PostgresProviderModule,
    PersonModule,
    LocationModule,
    LocationsTracingModule,
    PeopleTracingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
