import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { IProduct } from '@/domain/models';
import { mapToInterface } from '@/infrastructure/utils/mapper.util';

@Injectable()
export class MercadoLibreService {
  private readonly logger = new Logger(MercadoLibreService.name);
  private readonly BASE_URL = 'https://api.mercadolibre.com/sites/MPE/search';

  constructor(private readonly httpService: HttpService) {}

  async searchProducts(query: string): Promise<IProduct[]> {
    this.logger.log(`Fetching products in MercadoLibre for: ${query}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<{
            results: any[];
          }>(
            `${this.BASE_URL}?q=${encodeURIComponent(query)}+Star+Wars&limit=10`,
          )
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(
                `Error fetching data from MercadoLibre API: ${error.message}`,
                error.stack,
              );
              throw new Error(
                'An error happened while fetching MercadoLibre products!',
              );
            }),
          ),
      );

      const keys = [
        'id',
        'title',
        'price',
        'thumbnail',
        'permalink',
        'available_quantity',
        'currency_id',
      ] as (keyof IProduct)[];

      const simplifiedProduct = mapToInterface(data.results, keys);

      // Filtrar productos con relevancia basada en el título
      const filteredProducts = simplifiedProduct.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()),
      );

      this.logger.log(
        `Successfully fetched and simplified ${filteredProducts.length} relevant products from MercadoLibre API.`,
      );

      return filteredProducts;
    } catch (error) {
      this.logger.error('Unhandled error while fetching products', error.stack);
      throw error;
    }
  }
}
