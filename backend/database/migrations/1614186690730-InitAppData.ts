import { UserSeed } from './../seeds/user.seed';
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";

export class InitAppData1614186690730 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository('User').save(UserSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
