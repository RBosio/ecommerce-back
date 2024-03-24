import { AggregateRoot } from '@nestjs/cqrs';
import { BaseEntity } from '../infrastructure/typeorm/entities/base.entity';

export interface IEntitySchema<
  TSchema extends BaseEntity,
  TEntity extends AggregateRoot,
> {
  create(entity: TEntity): TSchema;
  createFromSchema(entity: TSchema): TEntity;
}
