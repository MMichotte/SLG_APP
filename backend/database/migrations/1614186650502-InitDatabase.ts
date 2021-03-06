import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1614186650502 implements MigrationInterface {
    name = 'InitDatabase1614186650502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "reference" character varying(255) NOT NULL, "label" character varying(255) NOT NULL, "purchase_price_HT" numeric NOT NULL, "sale_price_HT" numeric NOT NULL, "sale_price_TTC" numeric NOT NULL, "quantity" integer NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0d99c5ecda0104bc04f6780ccff" UNIQUE ("reference"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0d99c5ecda0104bc04f6780ccf" ON "product" ("reference") `);
        await queryRunner.query(`CREATE INDEX "IDX_90bc7a8e481cfa0d826e997813" ON "product" ("label") `);
        await queryRunner.query(`CREATE TYPE "stock_update_type_enum" AS ENUM('inventory', 'loss', 'broken', 'quality')`);
        await queryRunner.query(`CREATE TABLE "stock_update" ("id" SERIAL NOT NULL, "type" "stock_update_type_enum" NOT NULL, "quantity" integer NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_product" integer NOT NULL, CONSTRAINT "PK_ea5ee48672c7158139d89ce08c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('accounting', 'user', 'admin', 'dev')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workforce" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "price_HT" numeric NOT NULL, "price_TTC" numeric NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0284a6d21d24b590cb1ab29d684" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6abc4ccb7388a55e23d28284bb" ON "workforce" ("label") `);
        await queryRunner.query(`ALTER TABLE "stock_update" ADD CONSTRAINT "FK_16927d5c7f51cb9dcd522701f9f" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_update" DROP CONSTRAINT "FK_16927d5c7f51cb9dcd522701f9f"`);
        await queryRunner.query(`DROP INDEX "IDX_6abc4ccb7388a55e23d28284bb"`);
        await queryRunner.query(`DROP TABLE "workforce"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "stock_update"`);
        await queryRunner.query(`DROP TYPE "stock_update_type_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_90bc7a8e481cfa0d826e997813"`);
        await queryRunner.query(`DROP INDEX "IDX_0d99c5ecda0104bc04f6780ccf"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
