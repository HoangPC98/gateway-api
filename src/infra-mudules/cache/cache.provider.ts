import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppConfigService } from 'src/configs/app.config.service';


@Injectable()
export class CacheProvider {
    constructor(
        private cacheManager: Cache,
        private readonly appConfigService: AppConfigService,
    ) {}



    async get(key: string): Promise<unknown> {
        const value = await this.cacheManager.get(key);
        return value;
    }

    async set(key: string, value: unknown, ttl?: number): Promise<void> {
        const check = await this.cacheManager.get(key);
        if (check) {
            await this.del(key);
        }
        try {
            await this.cacheManager.set(key, value, ttl);
        } catch (error) {
            this.throwException(`Cache ${this.set.name} error: ${key} ${value}`);
        }

    }

    async del(key: string): Promise<void> {
        const check = await this.cacheManager.get(key);
        if (check) {
            try {
                await this.cacheManager.del(key);
            } catch (error) {
                this.throwException(`An error occur when Delete Cache key: ${error}`);
            }
        } else {
            this.throwException(`Cache key: ${key} not found`);
        }
    }

    private throwException(error: string): HttpException {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
