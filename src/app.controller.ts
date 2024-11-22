import { Controller, Get, Query } from '@nestjs/common';

// import { StarWarsService } from './infrastructure/adapters/star-wars.service';
import { IPeople } from './domain/models/people.interface';
import { MercadoLibreService } from './infrastructure/adapters/mercadolibre.service';
import { IProduct } from './domain/models/product.interface';
import { DataFusionService } from './application/services/data-fusion.service';
import { ICombinedData } from './domain/models';

@Controller()
export class AppController {
  constructor(private readonly appService: DataFusionService) {}

  @Get()
  getHello(): Promise<ICombinedData[]> {
    return this.appService.getCombinedData();
  }
}
