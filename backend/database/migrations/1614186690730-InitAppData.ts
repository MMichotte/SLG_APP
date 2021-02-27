import { UserSeed } from './../seeds/user.seed';
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { ProductSeed } from './../seeds/product.seed.1000';

export class InitAppData1614186690730 implements MigrationInterface {
    name = 'InitAppData1614186690730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository('user').save(UserSeed);
        await queryRunner.manager.getRepository('product').save(ProductSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
