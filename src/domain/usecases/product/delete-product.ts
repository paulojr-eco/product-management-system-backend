export interface IDeleteProduct {
  delete: (id: number) => Promise<void>;
}
