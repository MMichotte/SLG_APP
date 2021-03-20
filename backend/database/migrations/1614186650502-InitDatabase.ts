import {MigrationInterface, QueryRunner} from "typeorm";

export class InitDatabase1614186650502 implements MigrationInterface {
    name = 'InitDatabase1614186650502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "country" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "zip_code" character varying(50) NOT NULL, "street_address" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "person_civility_enum" AS ENUM('Mr.', 'Mme.', 'Mlle.')`);
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "civility" "person_civility_enum" NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "phone" character varying(255), "mobile" character varying(255), "vat_num" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_address" integer, CONSTRAINT "UQ_d2d717efd90709ebd3cb26b936c" UNIQUE ("email"), CONSTRAINT "REL_b9c17cf5f6008b696fc821e11c" UNIQUE ("id_address"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2ca81951428219072c6fa72eff" ON "person" ("last_name") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2d717efd90709ebd3cb26b936" ON "person" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_32ff4ff1eb26658f16da28e392" ON "person" ("vat_num") `);
        await queryRunner.query(`CREATE TYPE "company_type_enum" AS ENUM('S', 'C', 'SC')`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "type" "company_type_enum" NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "vat_num" character varying(255), "phone_1" character varying(50), "phone_2" character varying(50), "mobile" character varying(50), "website" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_person" integer, "id_address" integer, CONSTRAINT "UQ_b0fc567cf51b1cf717a9e8046a1" UNIQUE ("email"), CONSTRAINT "REL_f91edb8e73faf3ead32d4b90b7" UNIQUE ("id_address"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b0fc567cf51b1cf717a9e8046a" ON "company" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_41eed8812eb95bc4624172c802" ON "company" ("vat_num") `);
        await queryRunner.query(`CREATE TYPE "order_status_enum" AS ENUM('Open', 'Ordered', 'Partially Delivered', 'Closed')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" "order_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_company" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "reference" character varying(255) NOT NULL, "label" character varying(255) NOT NULL, "purchase_price_HT" numeric NOT NULL, "sale_price_HT" numeric NOT NULL, "sale_price_TTC" numeric NOT NULL, "quantity" integer NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0d99c5ecda0104bc04f6780ccff" UNIQUE ("reference"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0d99c5ecda0104bc04f6780ccf" ON "product" ("reference") `);
        await queryRunner.query(`CREATE INDEX "IDX_90bc7a8e481cfa0d826e997813" ON "product" ("label") `);
        await queryRunner.query(`CREATE TYPE "product_order_status_enum" AS ENUM('Pending', 'Ordered', 'Received', 'Back-order')`);
        await queryRunner.query(`CREATE TABLE "product_order" ("id" SERIAL NOT NULL, "note" text, "quantity_ordered" integer NOT NULL, "quantity_received" integer, "purchase_price_HT_at_date" numeric, "status" "product_order_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_product" integer NOT NULL, "id_order" integer NOT NULL, CONSTRAINT "PK_9849f0d8ce095e50e752616f691" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "stock_update_type_enum" AS ENUM('inventory', 'loss', 'broken', 'quality')`);
        await queryRunner.query(`CREATE TABLE "stock_update" ("id" SERIAL NOT NULL, "type" "stock_update_type_enum" NOT NULL, "quantity" integer NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_product" integer NOT NULL, CONSTRAINT "PK_ea5ee48672c7158139d89ce08c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('accounting', 'user', 'admin', 'dev')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "role" "user_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workforce" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "price_HT" numeric NOT NULL, "price_TTC" numeric NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0284a6d21d24b590cb1ab29d684" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6abc4ccb7388a55e23d28284bb" ON "workforce" ("label") `);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_b9c17cf5f6008b696fc821e11ca" FOREIGN KEY ("id_address") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_b77a76eac4981bdf34da250bab3" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_f91edb8e73faf3ead32d4b90b74" FOREIGN KEY ("id_address") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_c547690f25a975eaaea9c033743" FOREIGN KEY ("id_company") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_6e63555b63b7c1f35ecade5b164" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order" ADD CONSTRAINT "FK_0f4c478ef80839f3a42e6a83c72" FOREIGN KEY ("id_order") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock_update" ADD CONSTRAINT "FK_16927d5c7f51cb9dcd522701f9f" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_update" DROP CONSTRAINT "FK_16927d5c7f51cb9dcd522701f9f"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_0f4c478ef80839f3a42e6a83c72"`);
        await queryRunner.query(`ALTER TABLE "product_order" DROP CONSTRAINT "FK_6e63555b63b7c1f35ecade5b164"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_c547690f25a975eaaea9c033743"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_f91edb8e73faf3ead32d4b90b74"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_b77a76eac4981bdf34da250bab3"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_b9c17cf5f6008b696fc821e11ca"`);
        await queryRunner.query(`DROP INDEX "IDX_6abc4ccb7388a55e23d28284bb"`);
        await queryRunner.query(`DROP TABLE "workforce"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
        await queryRunner.query(`DROP TABLE "stock_update"`);
        await queryRunner.query(`DROP TYPE "stock_update_type_enum"`);
        await queryRunner.query(`DROP TABLE "product_order"`);
        await queryRunner.query(`DROP TYPE "product_order_status_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_90bc7a8e481cfa0d826e997813"`);
        await queryRunner.query(`DROP INDEX "IDX_0d99c5ecda0104bc04f6780ccf"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "order_status_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_41eed8812eb95bc4624172c802"`);
        await queryRunner.query(`DROP INDEX "IDX_b0fc567cf51b1cf717a9e8046a"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TYPE "company_type_enum"`);
        await queryRunner.query(`DROP INDEX "IDX_32ff4ff1eb26658f16da28e392"`);
        await queryRunner.query(`DROP INDEX "IDX_d2d717efd90709ebd3cb26b936"`);
        await queryRunner.query(`DROP INDEX "IDX_2ca81951428219072c6fa72eff"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TYPE "person_civility_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
