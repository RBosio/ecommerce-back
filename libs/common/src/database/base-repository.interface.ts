export interface IBaseRepository<T> {
  create(data: object): T;
  save(data: object): Promise<T>;
  findAll(options?: object): Promise<T[]>;
  findOneById(id: any): Promise<T>;
  findOneByOptions(options: object): Promise<T>;
  delete(id: any): Promise<void>;
}
