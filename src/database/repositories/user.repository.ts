import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user-entity/user.entity';
import { BaseAbstractRepository } from './base-abstract.repository';
import { Global, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  private _repository: Repository<User>;
  constructor(
    @InjectRepository(User)
    repo: Repository<User>,
  ) {
    super(repo);
    this._repository = repo;
  }
}
