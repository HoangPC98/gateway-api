import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1730220996517 implements MigrationInterface {
    name = 'InitDb1730220996517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("created_at" TIMESTAMP NOT NULL DEFAULT '2024-10-29T16:56:37.735Z', "updated_at" TIMESTAMP NOT NULL DEFAULT '2024-10-29T16:56:37.735Z', "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "type" character varying NOT NULL, "fullnane" character varying NOT NULL, "gender" smallint NOT NULL, "avatar" character varying NOT NULL, "address" character varying NOT NULL, "dob" character varying NOT NULL, CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT '2024-10-29T16:56:37.735Z', "updated_at" TIMESTAMP NOT NULL DEFAULT '2024-10-29T16:56:37.735Z', "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "type" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "phone_number" character varying NOT NULL, "email" character varying NOT NULL, "login_type" smallint NOT NULL, "active" smallint NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("created_at" TIMESTAMP NOT NULL DEFAULT '2024-10-29T16:56:37.735Z', "updated_at" TIMESTAMP NOT NULL DEFAULT '2024-10-29T16:56:37.735Z', "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "uid" integer NOT NULL, "access_token" character varying NOT NULL, "fcm_token" character varying NOT NULL, "device_id" character varying NOT NULL, "device_info" character varying NOT NULL, "ip_address" character varying NOT NULL, "last_used_at" character varying NOT NULL, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
