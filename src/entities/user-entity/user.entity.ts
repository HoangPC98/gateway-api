import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import { IBaseWithIdEntity } from '../base/ibase-with-id.entity';
import { EUserActive, EUserType } from 'src/common/enums/user.enum';
import { ELoginType, UsrType } from 'src/common/enums/auth.enum';
import { UserState } from 'src/common/types/auth.type';
import { UserProfile } from './user_profile.entity';

@Entity()
export class User extends IBaseWithIdEntity {
  @Column({ type: 'varchar', nullable: true, default: EUserType.PERSONAL })
  type: EUserType;

  @Column({ type: 'varchar', nullable: false })
  usr: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ name: 'PIN', type: 'varchar', nullable: true })
  pin: string;

  @Column({ type: 'varchar', enum: UsrType, nullable: true })
  usr_type: UsrType;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'smallint', enum: ELoginType, default: ELoginType.USRPWD })
  login_type: ELoginType;

  @Column({ type: 'smallint', enum: EUserActive, default: EUserActive.ACTIVE })
  active: EUserActive;

  @Column({ type: 'json', nullable: true })
  state: UserState;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: UserProfile;

  @BeforeInsert()
  setInitialUserState() {
    this.state = {
      isLock: false,
      isTempLock: false,
      isNewCustomer: true,
    };
  }
}
