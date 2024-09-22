import { Column, Entity } from "typeorm";
import { DeviceInfo } from "src/common/types/device.type";
import { IBaseOnlyCreateEntity } from "../base/ibases-only-created";

@Entity()
export class Session extends IBaseOnlyCreateEntity {
    @Column()
    uid: number;

    @Column()
    access_token: string;

    @Column()
    fcm_token: string;

    @Column()
    device_id: string;

    @Column({ type: 'string' })
    device_info: DeviceInfo;

    @Column({ type: 'string' })
    ip_address: DeviceInfo;

    @Column({ type: 'string' })
    last_used_at: Date;
}