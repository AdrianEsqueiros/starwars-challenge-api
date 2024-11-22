import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class MercadoLibreService {
  private readonly logger = new Logger(MercadoLibreService.name);
  private readonly BASE_URL = 'https://api.mercadolibre.com/sites/MPE/search';

  constructor(private readonly httpService: HttpService) {}

  async searchProducts(query: string): Promise<any[]> {
    this.logger.log(`Buscando productos en MercadoLibre para: ${query}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get(`${this.BASE_URL}?q=${encodeURIComponent(query)}&`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(
                `Error al buscar productos en MercadoLibre: ${error.message}`,
                error.stack,
              );
              throw new Error(
                'Ocurrió un error al buscar productos en MercadoLibre.',
              );
            }),
          ),
      );

      return data.results.map((product) => ({
        title: product.title,
        price: product.price,
        permalink: product.permalink,
        thumbnail: product.thumbnail,
        condition: product.condition,
      }));
    } catch (error) {
      this.logger.error('Error no manejado al buscar productos', error.stack);
      throw error;
    }
  }
}
