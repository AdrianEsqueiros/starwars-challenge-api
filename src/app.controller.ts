import { Controller, Get, Query } from '@nestjs/common';

// import { StarWarsService } from './infrastructure/adapters/star-wars.service';
import { IPeople } from './domain/models/people.interface';
import { MercadoLibreService } from './infrastructure/adapters/mercadolibre.service';

@Controller()
export class AppController {
  constructor(private readonly appService: MercadoLibreService) {}

  @Get()
  getHello(@Query('search') searchTerm: string): Promise<IPeople[]> {
    return this.appService.searchProducts(searchTerm);
  }
}
