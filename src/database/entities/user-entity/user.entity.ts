import { Column, Entity } from "typeorm";
import { IBaseWithIdEntity } from "../base/ibase-with-id.entity";

@Entity()
export class User extends IBaseWithIdEntity {
    @Column()
    type: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    phone_number: string;

    @Column()
    email: string;

    @Column({ type: 'smallint', enum: { USRPSWD: 0, GOOGLE: 1, FACEBOOK: 2 }})
    login_type: number;

    @Column({ type: 'smallint', enum: { ACTIVE: 0, UNACTIVE: 1, LOCKED: 2 }})
    active: number;
}
