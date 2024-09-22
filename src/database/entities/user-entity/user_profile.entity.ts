import { Column, Entity } from "typeorm";
import { IBaseWithIdEntity } from "../base/ibase-with-id.entity";

@Entity()
export class UserProfile extends IBaseWithIdEntity {
    @Column()
    type: string;

    @Column()
    fullnane: string;

    @Column({type: 'smallint', enum: { MALE: 0, FEMALE: 1, OTHER: 2 }})
    gender: string;

    @Column()
    avatar: string;

    @Column()
    address: string;

    @Column()
    dob: string;

}
