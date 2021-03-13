import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1614186650502 implements MigrationInterface {
    name = 'InitDatabase1614186650502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "country" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "zip_code" character varying(50) NOT NULL, "street_address" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "client_civility_enum" AS ENUM('Mr.', 'Mme.', 'Mlle.')`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "civility" "client_civility_enum" NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(255), "mobile" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_address" integer, CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "REL_636f7d7df571a8731f1b6bc577" UNIQUE ("id_address"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_735edd1397f4001ea57d8f73b6" ON "client" ("last_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_6436cc6b79593760b9ef921ef1" ON "client" ("email") `);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "is_supplier" boolean NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "vat_num" character varying(255) NOT NULL, "phone_1" character varying(50), "phone_2" character varying(50), "mobile" character varying(50), "website" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_client" integer, "id_address" integer, CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "REL_f91edb8e73faf3ead32d4b90b7" UNIQUE ("id_address"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0fc567cf51b1cf717a9e8046a" ON "company" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_41eed8812eb95bc4624172c802" ON "company" ("vat_num") `);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "reference" character varying(255) NOT NULL, "label" character varying(255) NOT NULL, "purchase_price_HT" numeric NOT NULL, "sale_price_HT" numeric NOT NULL, "sale_price_TTC" numeric NOT NULL, "quantity" integer NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0d99c5ecda0104bc04f6780ccff" UNIQUE ("reference"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0d99c5ecda0104bc04f6780ccf" ON "product" ("reference") `);
        await queryRunner.query(`CREATE INDEX "IDX_90bc7a8e481cfa0d826e997813" ON "product" ("label") `);
        await queryRunner.query(`CREATE TYPE "stock_update_type_enum" AS ENUM('inventory', 'loss', 'broken', 'quality')`);
        await queryRunner.query(`CREATE TABLE "stock_update" ("id" SERIAL NOT NULL, "type" "stock_update_type_enum" NOT NULL, "quantity" integer NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_product" integer NOT NULL, CONSTRAINT "PK_ea5ee48672c7158139d89ce08c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('accounting', 'user', 'admin', 'dev')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workforce" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "price_HT" numeric NOT NULL, "price_TTC" numeric NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0284a6d21d24b590cb1ab29d684" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6abc4ccb7388a55e23d28284bb" ON "workforce" ("label") `);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_636f7d7df571a8731f1b6bc5778" FOREIGN KEY ("id_address") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_b43ddae06306ffdcadfbe964925" FOREIGN KEY ("id_client") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_f91edb8e73faf3ead32d4b90b74" FOREIGN KEY ("id_address") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_update" ADD CONSTRAINT "FK_16927d5c7f51cb9dcd522701f9f" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_update" DROP CONSTRAINT "FK_16927d5c7f51cb9dcd522701f9f"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_f91edb8e73faf3ead32d4b90b74"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_b43ddae06306ffdcadfbe964925"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_636f7d7df571a8731f1b6bc5778"`);
        await queryRunner.query(`DROP INDEX "IDX_6abc4ccb7388a55e23d28284bb"`);
        await queryRunner.query(`DROP TABLE "workforce"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "stock_update"`);
        await queryRunner.query(`DROP TYPE "stock_update_type_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_90bc7a8e481cfa0d826e997813"`);
        await queryRunner.query(`DROP INDEX "IDX_0d99c5ecda0104bc04f6780ccf"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP INDEX "IDX_41eed8812eb95bc4624172c802"`);
        await queryRunner.query(`DROP INDEX "IDX_b0fc567cf51b1cf717a9e8046a"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP INDEX "IDX_6436cc6b79593760b9ef921ef1"`);
        await queryRunner.query(`DROP INDEX "IDX_735edd1397f4001ea57d8f73b6"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TYPE "client_civility_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
