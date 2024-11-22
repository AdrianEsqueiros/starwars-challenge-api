import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { StarWarsService } from './infrastructure/adapters/star-wars.service';
import { MercadoLibreService } from './infrastructure/adapters/mercadolibre.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, StarWarsService, MercadoLibreService],
})
export class AppModule {}
