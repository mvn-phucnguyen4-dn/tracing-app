import { Controller, Get } from '@nestjs/common';
import { LocationsTracingService } from './locations-tracing.service';

@Controller('locations-traces')
export class LocationsTracingController {
  constructor(private locationsTracingService: LocationsTracingService) {}

  @Get('')
  getAll() {
    return this.locationsTracingService.getAll();
  }
}
