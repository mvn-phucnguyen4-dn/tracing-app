import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleTracing } from './entities';
import { PeopleTracingController } from './people-tracing.controller';
import { PeopleTracingService } from './people-tracing.service';
import { PeopleTracingRepository } from './repositories/people-tracing.repository';
import { PersonModule } from '../people/person.module';
import { PersonRepository } from '../people/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleTracing]), PersonModule],
  controllers: [PeopleTracingController],
  providers: [PeopleTracingService, PeopleTracingRepository, PersonRepository],
  exports: [PeopleTracingService],
})
export class PeopleTracingModule {}
