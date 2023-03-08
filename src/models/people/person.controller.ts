import {
    Controller,
    Get,
    UseGuards,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { PersonService } from './person.service';
  
  @Controller('people')
  export class PersonController {
    constructor(private personService: PersonService) {}
  
    @Get('')
    getAll() {
      try {
        return this.personService.getAll();
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