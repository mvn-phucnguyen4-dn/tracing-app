import { Controller, Get } from '@nestjs/common';
import { PeopleTracingService } from './people-tracing.service';

@Controller('people-traces')
export class PeopleTracingController {
  constructor(private peopleTracingService: PeopleTracingService) {}

  @Get()
  getAll() {
    return this.peopleTracingService.getAll();
  }
}
