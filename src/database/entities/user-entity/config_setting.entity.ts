import { Column, Entity } from "typeorm";
import { DeviceInfo } from "src/common/types/device.type";
import { IBaseOnlyCreateEntity } from "../base/ibases-only-created";
import { IBaseEntity } from "../base/ibases.entity";

@Entity()
export class ConfigSetting extends IBaseEntity {
    @Column()
    uid: number;

    @Column({ name: 'allow_notif', default: true })
    allowNotif: boolean;

    @Column({ name: 'allow_otp', default: true })
    allowOtp: boolean;

    @Column({ default: '' })
    other: JSON;
}