import { Repository } from 'typeorm';
import { UserProfile } from '../../entities/user-entity/user_profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class UserProfileRepository {
  private _repository: Repository<UserProfile>;

  constructor(
    @InjectRepository(UserProfile)
    repo: Repository<UserProfile>,
  ) {
    this._repository = repo;
  }
}
