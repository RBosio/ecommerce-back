import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IBaseRepository } from '../../../domain/base-repository.interface';
import { BaseEntity } from '../entities/base.entity';
import { AggregateRoot } from '@nestjs/cqrs';
import { IEntitySchema } from '@app/common/domain';

export abstract class BaseRepository<
  TSchema extends BaseEntity,
  TEntity extends AggregateRoot,
> implements IBaseRepository<TEntity>
{
  repository: Repository<TSchema>;

  constructor(
    repository: Repository<TSchema>,
    private entitySchemaFactory: IEntitySchema<TSchema, TEntity>,
  ) {
    this.repository = repository;
  }

  async save(data: TEntity): Promise<void> {
    const entity = this.entitySchemaFactory.create(data);
    await this.repository.save(entity);
  }

  async findAll(options?: FindManyOptions<TSchema>): Promise<TEntity[]> {
    return (await this.repository.find(options)).map((entity) =>
      this.entitySchemaFactory.createFromSchema(entity),
    );
  }

  async findOneById(id: any): Promise<TEntity> {
    const options: FindOneOptions<TSchema> = {
      where: {
        id,
      },
    };

    const entity = await this.repository.findOne(options);
    if (!entity) return null;

    return this.entitySchemaFactory.createFromSchema(entity);
  }

  async findOneByOptions(options: FindOneOptions<TSchema>): Promise<TEntity> {
    const entity = await this.repository.findOne(options);
    if (!entity) return null;

    return this.entitySchemaFactory.createFromSchema(entity);
  }

  async delete(id: any): Promise<void> {
    await this.repository.softDelete(id);
  }
}
