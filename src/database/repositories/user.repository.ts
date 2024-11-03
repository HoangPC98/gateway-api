import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user-entity/user.entity';
import { BaseAbstractRepository } from './base-abstract.repository';
import { Global, Injectable } from '@nestjs/common';
import { UserProfile } from 'src/entities/user-entity/user_profile.entity';

@Injectable()
export class UsersRepository extends BaseAbstractRepository<User> {
  public userRp: Repository<User>;
  public userProfileRp: Repository<UserProfile>;

  constructor(
    @InjectRepository(User) UsersRepository: Repository<User>,
    @InjectRepository(UserProfile) userProfileRepository: Repository<UserProfile>,

  ) {
    super(UsersRepository);
    this.userRp = UsersRepository;
    this.userProfileRp = userProfileRepository;
  }
}
