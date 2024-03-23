import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { IBaseRepository } from './base-repository.interface';

interface HasId {
  id: string;
  deleted_at: Date;
}

export abstract class BaseRepository<T extends HasId>
  implements IBaseRepository<T>
{
  repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }

  async save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  async findAll(options?: FindManyOptions): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOneById(id: any): Promise<T> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findOneByOptions(options: FindOneOptions): Promise<T> {
    return this.repository.findOne(options);
  }

  async delete(id: any): Promise<void> {
    await this.repository.softDelete(id);
  }
}
