import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleTracing } from './entities';
import { PeopleTracingController } from './people-tracing.controller';
import { PeopleTracingService } from './people-tracing.service';
import { PeopleTracingRepository } from './repositories/people-tracing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleTracing])],
  controllers: [PeopleTracingController],
  providers: [PeopleTracingService, PeopleTracingRepository],
  exports: [PeopleTracingService],
})
export class PeopleTracingModule {}
