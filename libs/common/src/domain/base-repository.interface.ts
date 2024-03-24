export interface IBaseRepository<TEntity> {
  save(data: TEntity): Promise<void>;
  findAll(options?: object): Promise<TEntity[]>;
  findOneById(id: any): Promise<TEntity>;
  findOneByOptions(options: object): Promise<TEntity>;
  delete(id: any): Promise<void>;
}
