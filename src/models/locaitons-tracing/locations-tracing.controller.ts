import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { LocationsTracingService } from './locations-tracing.service';

@Controller('locations-traces')
export class LocationsTracingController {
  constructor(private locationsTracingService: LocationsTracingService) {}

  @Get('')
  getAll() {
    return this.locationsTracingService.getAll();
  }

  @Get('/yesterday-created')
  getYesterdayCreated() {
    try {
      return this.locationsTracingService.getLatestCreated();
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
      return this.locationsTracingService.getLatestUpdated();
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
      return this.locationsTracingService.generateLocationTracesByDaily();
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
