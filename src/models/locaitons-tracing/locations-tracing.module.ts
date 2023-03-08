import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsTracing } from './entities';
import { LocationsTracingController } from './locations-tracing.controller';
import { LocationsTracingService } from './locations-tracing.service';
import { LocationsTracingRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([LocationsTracing])],
  controllers: [LocationsTracingController],
  providers: [LocationsTracingService, LocationsTracingRepository],
  exports: [LocationsTracingService],
})
export class LocationsTracingModule {}
