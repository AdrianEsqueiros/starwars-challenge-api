import { Injectable } from '@nestjs/common';
import {
  StarWarsService,
  MercadoLibreService,
} from '@/infrastructure/adapters';
import { ICombinedData, Status } from '@/domain/models';

@Injectable()
export class DataFusionService {
  constructor(
    private readonly starWarsService: StarWarsService,
    private readonly mercadoLibreService: MercadoLibreService,
  ) {}

  async getCombinedData(): Promise<ICombinedData[]> {
    const characters = await this.starWarsService.getPeople();

    const combinedData = await Promise.all(
      characters.map(async (character) => {
        try {
          const products = await this.mercadoLibreService.searchProducts(
            character.name,
          );

          return {
            character: {
              name: character.name,
              height: character.height,
              gender: character.gender,
              url: character.url,
            },
            products,
            status:
              products.length > 0 ? 'success' : ('no_products_found' as Status),
            popularityScore: products.length,
            isTrending: products.some(
              (product) => product.available_quantity > 50,
            ),
          };
        } catch (error) {
          return {
            character: {
              name: character.name,
              height: character.height,
              gender: character.gender,
              url: character.url,
            },
            products: [],
            status: 'error' as Status,
            popularityScore: 0,
            isTrending: false,
            errorMessage: error.message,
          };
        }
      }),
    );

    return combinedData;
  }
}
