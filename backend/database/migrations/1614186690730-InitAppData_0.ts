import { UserSeed } from '../seeds/users/user.seed';
import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ProductSeed_0 } from '../seeds/products/product.seed.all_0';
import { ProductSeed_1 } from '../seeds/products/product.seed.all_1';
import { ProductSeed_2 } from '../seeds/products/product.seed.all_2';
import { ProductSeed_3 } from '../seeds/products/product.seed.all_3';
import { ProductSeed_4 } from '../seeds/products/product.seed.all_4';
import { ProductSeed_5 } from '../seeds/products/product.seed.all_5';
import { ProductSeed_6 } from '../seeds/products/product.seed.all_6';


export class InitAppData1614186690730 implements MigrationInterface {
    name = 'InitAppData1614186690730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository('user').save(UserSeed);
        await queryRunner.manager.getRepository('product').save(ProductSeed_0);
        await queryRunner.manager.getRepository('product').save(ProductSeed_1);
        await queryRunner.manager.getRepository('product').save(ProductSeed_2);
        await queryRunner.manager.getRepository('product').save(ProductSeed_3);
        await queryRunner.manager.getRepository('product').save(ProductSeed_4);
        await queryRunner.manager.getRepository('product').save(ProductSeed_5);
        await queryRunner.manager.getRepository('product').save(ProductSeed_6);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
