import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsTracing } from './entities';
import { LocationsTracingController } from './locations-tracing.controller';
import { LocationsTracingService } from './locations-tracing.service';
import { LocationsTracingRepository } from './repositories';
import { PersonModule } from '../people/person.module';
import { LocationModule } from '../locations/location.module';
import { PersonRepository } from '../people/repositories';
import { LocationRepository } from '../locations/repositories/location.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([LocationsTracing]),
    PersonModule,
    LocationModule,
  ],
  controllers: [LocationsTracingController],
  providers: [
    LocationsTracingService,
    LocationsTracingRepository,
    PersonRepository,
    LocationRepository,
  ],
  exports: [LocationsTracingService],
})
export class LocationsTracingModule {}
