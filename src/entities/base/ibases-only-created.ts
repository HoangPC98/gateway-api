import { CreateDateColumn } from 'typeorm';

export abstract class IBaseOnlyCreateEntity {
  @CreateDateColumn({
    name: 'created_at',
    default: Date.now(),
    type: 'timestamp',
  })
  createdAt: Date;
}
