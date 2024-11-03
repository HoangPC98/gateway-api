import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppConfigService } from 'src/configs/app.config.service';

@Injectable()
export class CacheProvider {
  constructor(
    @Inject(CACHE_MANAGER) readonly cacheManager: Cache,
  ) {}

  private readonly TTL_DEFAULT = 60 * 60;
  private readonly TTL_1H = 3600;
  private readonly TTL_REQC = 10 * 60;

  async get(key: string): Promise<unknown> {
    const value = await this.cacheManager.get(key);
    // console.log('thisValue...', value)
    const all = await this.cacheManager.store.keys();
    // console.log('allKey...', all)
    return value;
  }

  async set(key: string, value: unknown, ttl?: number): Promise<void> {
    const check = await this.cacheManager.get(key);
    if (check) {
      await this.del(key);
    }
    try {
      await this.cacheManager.set(key, value, 3600000);
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

  // async setLoginSession(pl: SessionCachePL){

  // }

  private throwException(error: string): HttpException {
    throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
