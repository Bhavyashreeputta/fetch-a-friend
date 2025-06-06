import type { Dog } from './dog';

export interface DogsPage {
  dogs: Dog[];
  next?: number | null;
}
