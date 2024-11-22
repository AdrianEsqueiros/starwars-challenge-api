import { IPeople } from './people.interface';
import { IProduct } from './product.interface';

/**
 * Representa los datos combinados entre los personajes de Star Wars
 * y los productos de MercadoLibre.
 */
export type Character = 'name' | 'height' | 'gender' | 'url';
export type Status = 'success' | 'no_products_found' | 'error';
export interface ICombinedData {
  character: Pick<IPeople, Character>; // Datos esenciales del personaje
  products: IProduct[]; // Lista de productos relacionados con el personaje
  status: Status; // Estado de la búsqueda
  popularityScore: number; // Número de productos encontrados
  isTrending: boolean; // Indicador de popularidad basado en la cantidad disponible
  errorMessage?: string; // Mensaje de error si la búsqueda falla
}
