/**
 * Filtra los datos para que coincidan exactamente con las claves de la interfaz IPeople.
 * @param data Arreglo de objetos de entrada (puede contener más campos de los necesarios).
 * @returns Arreglo de objetos filtrados que cumplen con la interfaz IPeople.
 */
export function mapToInterface<T>(data: any[], keys: (keyof T)[]): T[] {
  return data.map((item) =>
    keys.reduce((acc, key) => {
      if (key in item) {
        acc[key] = item[key];
      }
      return acc;
    }, {} as T),
  );
}
