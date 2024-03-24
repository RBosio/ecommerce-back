import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('user')
export class UserSchema extends BaseEntity {
  @Column()
  readonly name: string;

  @Column()
  readonly email: string;

  @Column()
  readonly password: string;

  @Column()
  readonly card_number: string;
}
