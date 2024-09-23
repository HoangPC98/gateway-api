import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { SessionCachePL } from 'src/common/types/auth.type';

@Injectable()
export class MyCacheService {
    private loginSessionKey = 'session_uid:'
    private transferMBPrefix = 'valid_Transfer_MB_cache_key';
    private readonly ekycPartnerListDtKey = 'ekyc_partner_list_dtk';
    private readonly balanceCustomerSuffixKey = '__cust_balance_avail';
    private readonly requestToAServicesPrefix = 'ReqC';

    private readonly TTL_DEFAULT = 60 * 60;
    private readonly TTL_1H = 3600;
    private readonly TTL_RENEW_EKYC_PARTNER_DT = 24 * 3600;
    private readonly TTL_REQC = 10 * 60;

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) { }

    async getAllKeys() {
        return this.cacheManager.store.keys();
    }

    async get(key: string): Promise<string> {
        return this.cacheManager.get(key);
    }

    async set(key: string, val: string | object, ttl?: number): Promise<void> {
        let value = typeof val == 'object' ? JSON.stringify(val) : val;
        await this.cacheManager.set(key, value, ttl || this.TTL_DEFAULT );
    }

    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }
    
    async update(key:string, newValue: string|object, ttl?: number) {
        await this.set(key, newValue, ttl);
    }

    async getTransferMB(transactionId: string): Promise<any> {
        const cacheKey = this.getTransferMBKey(transactionId);
        return (await this.cacheManager.get(cacheKey));
    }

    private getTransferMBKey(transactionId: string): string {
        return `${transactionId}_${this.transferMBPrefix}`;
    }

    async setLoginSession(pl: SessionCachePL){

    }

}
