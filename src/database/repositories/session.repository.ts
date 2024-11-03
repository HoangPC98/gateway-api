import { Repository } from 'typeorm';
import { Session } from '../../entities/user-entity/session.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class SessionRepository {
  private _repository: Repository<Session>;

  constructor(
    @InjectRepository(Session)
    repo: Repository<Session>,
  ) {
    this._repository = repo;
  }
}
