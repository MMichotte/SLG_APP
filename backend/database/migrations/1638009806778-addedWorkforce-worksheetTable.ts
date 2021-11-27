import {MigrationInterface, QueryRunner} from "typeorm";

export class addedWorkforceWorksheetTable1638009806778 implements MigrationInterface {
    name = 'addedWorkforceWorksheetTable1638009806778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workforce-worksheet" ("id" SERIAL NOT NULL, "hours" numeric NOT NULL, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_workforce" integer NOT NULL, "id_worksheet" integer NOT NULL, CONSTRAINT "PK_a75e42744c381c1e3a6e718d1f7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workforce-worksheet" ADD CONSTRAINT "FK_33c199227045c328d3190b15e29" FOREIGN KEY ("id_workforce") REFERENCES "workforce"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workforce-worksheet" ADD CONSTRAINT "FK_453438d4f322e3c7b1d1ae9a32d" FOREIGN KEY ("id_worksheet") REFERENCES "worksheet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workforce-worksheet" DROP CONSTRAINT "FK_453438d4f322e3c7b1d1ae9a32d"`);
        await queryRunner.query(`ALTER TABLE "workforce-worksheet" DROP CONSTRAINT "FK_33c199227045c328d3190b15e29"`);
        await queryRunner.query(`DROP TABLE "workforce-worksheet"`);
    }

}
