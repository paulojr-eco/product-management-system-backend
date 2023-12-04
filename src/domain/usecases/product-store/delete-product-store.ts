export interface IDeleteProductStore {
  delete: (id: number) => Promise<void>;
}
