import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DeviceInfo } from 'src/common/types/device.type';
import { IBaseWithIdEntity } from '../base/ibase-with-id.entity';
import { User } from './user.entity';

@Entity()
export class Session extends IBaseWithIdEntity {
  @Column({ type: 'varchar', nullable: true })
  uid: number;

  @Column({ type: 'varchar', nullable: true })
  access_token: string;

  @Column({ type: 'varchar', nullable: true })
  fcm_token: string;

  @Column({ type: 'varchar', nullable: true })
  device_id: string;

  @Column({ type: 'varchar', nullable: true })
  device_info: DeviceInfo;

  @Column({ type: 'varchar', nullable: true })
  ip_address: DeviceInfo;

  @Column({ type: 'varchar', nullable: true, default: new Date() })
  last_used_at: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'uid' })
  user: User;
}
