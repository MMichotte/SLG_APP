import {MigrationInterface, QueryRunner} from "typeorm";

export class addedWorksheetTable1638004843063 implements MigrationInterface {
    name = 'addedWorksheetTable1638004843063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "worksheet" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_car" integer, "id_person" integer, "id_company" integer, CONSTRAINT "CHK_572544751222c41b28a8c8fc2d" CHECK (
  ("id_car" IS NOT NULL AND "id_person" IS NULL AND "id_company" IS NULL)
  OR ("id_car" IS NULL AND "id_person" IS NOT NULL AND "id_company" IS NULL)
  OR ("id_car" IS NULL AND "id_person" IS NULL AND "id_company" IS NOT NULL)
), CONSTRAINT "PK_4288372d711457f58abb7dd90c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "worksheet" ADD CONSTRAINT "FK_c48ccca92ae6a5b7855ff2c6270" FOREIGN KEY ("id_car") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet" ADD CONSTRAINT "FK_a96813c2bdad5171154b7510a1d" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "worksheet" ADD CONSTRAINT "FK_d47b1201b5c42ab4c829db60ce8" FOREIGN KEY ("id_company") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worksheet" DROP CONSTRAINT "FK_d47b1201b5c42ab4c829db60ce8"`);
        await queryRunner.query(`ALTER TABLE "worksheet" DROP CONSTRAINT "FK_a96813c2bdad5171154b7510a1d"`);
        await queryRunner.query(`ALTER TABLE "worksheet" DROP CONSTRAINT "FK_c48ccca92ae6a5b7855ff2c6270"`);
        await queryRunner.query(`DROP TABLE "worksheet"`);
    }

}
