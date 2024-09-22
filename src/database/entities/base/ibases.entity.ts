import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class IBaseEntity {

    @CreateDateColumn({ name: 'created_at', default: Date.now(), type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', default: Date.now(), type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', default: null, type: 'timestamp' })
    deletedAt: Date | null;

    isDeleted(): boolean {
        return this.deletedAt !== null;
    }
}
