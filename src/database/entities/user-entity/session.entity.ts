import { Column, Entity } from "typeorm";
import { DeviceInfo } from "src/common/types/device.type";
import { IBaseWithIdEntity } from "../base/ibase-with-id.entity";

@Entity()
export class Session extends IBaseWithIdEntity {
    @Column()
    uid: number;

    @Column()
    access_token: string;

    @Column()
    fcm_token: string;

    @Column()
    device_id: string;

    @Column({ type: 'varchar' })
    device_info: DeviceInfo;

    @Column({ type: 'varchar' })
    ip_address: DeviceInfo;

    @Column({ type: 'varchar' })
    last_used_at: Date;
}