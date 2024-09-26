import { IBaseRepository } from "./base.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigSetting } from "src/database/entities/user-entity/config_setting.entity";
import { User } from "src/database/entities/user-entity/user.entity";

export class UserRepository extends IBaseRepository<ConfigSetting> {
    @InjectRepository(ConfigSetting)
    private _repo: Repository<ConfigSetting>;

    async setDefaultSetting(uid: number): Promise<void> {
        const configSetting: ConfigSetting = this.create({ uid: uid });
        await this._repo.save(configSetting);
    }
}