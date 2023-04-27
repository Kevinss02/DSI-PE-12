import { IFunkoData } from "./Funko.js";

/**
 * Default ResponseType Express server will emit
 */
export type ResponseType<T> = {
  type: 'add' | 'remove' | 'update' | 'read' | 'list';
  success: boolean;
  output: IFunkoData[] | string | undefined;
  error?: T;
}
