import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { PeopleTracingService } from './people-tracing.service';

@Controller('people-traces')
export class PeopleTracingController {
  constructor(private peopleTracingService: PeopleTracingService) {}

  @Get()
  getAll() {
    return this.peopleTracingService.getAll();
  }

  @Get('/yesterday-created')
  getYesterdayCreated() {
    try {
      return this.peopleTracingService.getLatestCreated();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/yesterday-updated')
  getYesterdayUpdated() {
    try {
      return this.peopleTracingService.getLatestUpdated();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/generate')
  generateLocationTracesByDaily() {
    try {
      return this.peopleTracingService.generatePeopleTracesByDaily();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
