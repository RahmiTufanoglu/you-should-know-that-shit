import {MigrationInterface, QueryRunner} from "typeorm";

export class init1620569623826 implements MigrationInterface {
    name = 'init1620569623826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "facts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fact" character varying NOT NULL, "isTrue" boolean NOT NULL, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid NOT NULL, CONSTRAINT "UQ_90e7090ffb303d799ed55b2f1fa" UNIQUE ("fact"), CONSTRAINT "PK_b35218a44dc3d5dd2f0f54d7e3f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "category" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bcd0361927be4baf8a1f401590e" UNIQUE ("category"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "claims" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "claim" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4fd670779d0c41ba6aeb7b34ec1" UNIQUE ("claim"), CONSTRAINT "PK_96c91970c0dcb2f69fdccd0a698" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(300) NOT NULL, "password" character varying NOT NULL, "username" character varying, "firstname" character varying, "lastname" character varying, "highscore" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "facts" ADD CONSTRAINT "FK_d2fcbbee2cc201b8a4d4d22eebd" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "facts" DROP CONSTRAINT "FK_d2fcbbee2cc201b8a4d4d22eebd"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "claims"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "facts"`);
    }

}
