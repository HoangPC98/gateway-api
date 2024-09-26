import { User } from "src/database/entities/user-entity/user.entity";
import { IBaseRepository } from "./base.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BOOL_VALUE } from "src/common/enums/index.enum";

export class UserRepository extends IBaseRepository<User> {
    @InjectRepository(User)
    private repo: Repository<User>;
    // constructor(
    //     @InjectRepository(User)
    //     repository: Repository<User>,
    // ) {
    //     super(repository);
    //     this._repository = repository;
    // }

    async findActiveByPhoneNumber(phoneNumber: string): Promise<User> {
        return this.repo.findOne({
            where: {
                phoneNumber,
                active: BOOL_VALUE.TRUE,
            },
        });
    }
}