import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { IPeople } from 'src/domain/models/people.interface';
import { mapToInterface } from 'src/utils/mapper.util';

@Injectable()
export class StarWarsService {
  private readonly logger = new Logger(StarWarsService.name);
  private readonly BASE_URL = 'https://swapi.dev/api';

  constructor(private readonly httpService: HttpService) {}

  async getPeople(): Promise<IPeople[]> {
    this.logger.log('Fetching people from Star Wars API...');

    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get<{ results: any[] }>(`${this.BASE_URL}/people/`)
          .pipe(
            catchError((error: AxiosError) => {
              this.logger.error(
                `Error fetching data from SWAPI: ${error.message}`,
                error.stack,
              );
              throw new Error(
                'An error happened while fetching Star Wars characters!',
              );
            }),
          ),
      );

      // Extraer las claves de la interfaz IPeople
      const keys = [
        'name',
        'height',
        'mass',
        'hair_color',
        'skin_color',
        'eye_color',
        'birth_year',
        'gender',
        'homeworld',
        'vehicles',
        'starships',
        'url',
      ] as (keyof IPeople)[];

      // Usar la función genérica para filtrar los datos
      const simplifiedPeople = mapToInterface<IPeople>(data.results, keys);

      this.logger.log(
        `Successfully fetched and simplified ${simplifiedPeople.length} characters from Star Wars API.`,
      );

      return simplifiedPeople;
    } catch (error) {
      this.logger.error('Unhandled error occurred', error.stack);
      throw error;
    }
  }
}
