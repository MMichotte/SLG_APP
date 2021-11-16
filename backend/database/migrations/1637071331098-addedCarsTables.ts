import {MigrationInterface, QueryRunner} from "typeorm";

export class addedCarsTables1637071331098 implements MigrationInterface {
    name = 'addedCarsTables1637071331098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_make" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d4f8c6f5c60354b3ec83e505a9b" UNIQUE ("label"), CONSTRAINT "PK_cbde9642093e4051e40d9d352a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_model" ("id" SERIAL NOT NULL, "label" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_car_make" integer NOT NULL, CONSTRAINT "UQ_01f13cf5b1f4421476fde53b927" UNIQUE ("label"), CONSTRAINT "PK_525071eea12c671d67e35a5cbc8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."car_fuel_type_enum" AS ENUM('Diesel', 'Petrol', 'Other')`);
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "version" character varying(255), "color" character varying(255), "fuel_type" "public"."car_fuel_type_enum", "bodywork" character varying(255), "registration_number" character varying(255), "chassis_number" character varying(255) NOT NULL, "chassis_number_location" text, "engine_displacement" numeric, "engine_number" character varying(255), "gearbox_type" character varying(255), "first_registration" date, "note" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id_person" integer, "id_company" integer, "id_car_model" integer NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_model" ADD CONSTRAINT "FK_f25ebe2adcd4552885d4cd0ea5c" FOREIGN KEY ("id_car_make") REFERENCES "car_make"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_01e677b5b832fa9cd6dbf50ba59" FOREIGN KEY ("id_person") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_3c753d42180a9831200fb41d484" FOREIGN KEY ("id_company") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_381fcffaa48043fde34b0cda9ce" FOREIGN KEY ("id_car_model") REFERENCES "car_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_381fcffaa48043fde34b0cda9ce"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_3c753d42180a9831200fb41d484"`);
        await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_01e677b5b832fa9cd6dbf50ba59"`);
        await queryRunner.query(`ALTER TABLE "car_model" DROP CONSTRAINT "FK_f25ebe2adcd4552885d4cd0ea5c"`);
        await queryRunner.query(`DROP TABLE "car"`);
        await queryRunner.query(`DROP TYPE "public"."car_fuel_type_enum"`);
        await queryRunner.query(`DROP TABLE "car_model"`);
        await queryRunner.query(`DROP TABLE "car_make"`);
    }

}
