import {MigrationInterface, QueryRunner} from "typeorm";

export class addedProductWorksheetTable1638012223603 implements MigrationInterface {
    name = 'addedProductWorksheetTable1638012223603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product-worksheet" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "sale_price_at_date" numeric NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_product" integer NOT NULL, "id_worksheet" integer NOT NULL, CONSTRAINT "PK_eed9852520d3008dc8a167dfa29" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product-worksheet" ADD CONSTRAINT "FK_6ad16f2cbca575ae464a086386d" FOREIGN KEY ("id_product") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product-worksheet" ADD CONSTRAINT "FK_d470055f245443f19f49b0a7b84" FOREIGN KEY ("id_worksheet") REFERENCES "worksheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product-worksheet" DROP CONSTRAINT "FK_d470055f245443f19f49b0a7b84"`);
        await queryRunner.query(`ALTER TABLE "product-worksheet" DROP CONSTRAINT "FK_6ad16f2cbca575ae464a086386d"`);
        await queryRunner.query(`DROP TABLE "product-worksheet"`);
    }

}
