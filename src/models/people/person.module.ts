import { Module } from '@nestjs/common';
import { Person } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService, PersonRepository],
  exports: [PersonRepository],
})
export class PersonModule {}
