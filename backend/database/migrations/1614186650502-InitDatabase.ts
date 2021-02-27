import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1614186650502 implements MigrationInterface {
    name = 'InitDatabase1614186650502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "reference" character varying(255) NOT NULL, "label" character varying(255) NOT NULL, "purchase_price_HT" numeric NOT NULL, "sale_price_HT" numeric NOT NULL, "sale_price_TTC" numeric NOT NULL, "quantity" integer NOT NULL, "quantity_reserved" integer NOT NULL, "note" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0d99c5ecda0104bc04f6780ccf" ON "product" ("reference") `);
        await queryRunner.query(`CREATE INDEX "IDX_90bc7a8e481cfa0d826e997813" ON "product" ("label") `);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('accounting', 'user', 'admin', 'dev')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_90bc7a8e481cfa0d826e997813"`);
        await queryRunner.query(`DROP INDEX "IDX_0d99c5ecda0104bc04f6780ccf"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }
    
}
