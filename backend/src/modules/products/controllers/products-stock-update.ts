import { validate } from 'class-validator';
import { SimpleStockUpdateDTO } from './../../stock-update/dto/simple-stock-update.dto';
import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from '@core/decorators/roles.decorator';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { StockUpdateDTO } from '@modules/stock-update/dto/stock-update.dto';
import { StockUpdate } from '@modules/stock-update/entities/stock-update.entity';
import { StockUpdateService } from '@modules/stock-update/services/stock-update.service';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { CreateStockUpdateDTO } from '@modules/stock-update/dto/create-stock-update.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { getConnection, QueryRunner } from 'typeorm';

@Controller('products')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@ApiBearerAuth()
export class ProductsStockUpdateController {

  constructor(
    private readonly productsService: ProductsService,
    private readonly stockUpdateService: StockUpdateService
  ) { }

  @Get(':id/stock-updates')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: StockUpdateDTO,
    isArray: true
  })
  async findAll(@Param('id') id: number): Promise<StockUpdateDTO[]> {
    const stUp: StockUpdate[] = await this.stockUpdateService.findAllByProdId(id);
    return plainToClass(StockUpdateDTO, stUp);
  }

  @Post(':id/stock-updates')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleStockUpdateDTO,
  })
  async create(@Param('id') id: number, @Body() createStUp: CreateStockUpdateDTO): Promise<SimpleStockUpdateDTO> {
    createStUp = new CreateStockUpdateDTO(createStUp);
    const errors = await validate(createStUp);
    if (errors.length) throw new BadRequestException;

    const queryRunner: QueryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Create Stock-update
      const product: Product = await this.productsService.findOneById(id);
      if (!product) throw new NotFoundException;
      createStUp.product = product;
      const createdStUp: StockUpdate = await this.stockUpdateService.create_transactional(createStUp, queryRunner);

      // Update product quantity:
      const updProd: UpdateProductDTO = plainToClass(UpdateProductDTO, product);
      updProd.quantity += createStUp.quantity;
      const updatedProduct = await this.productsService.update_transactional(id, updProd, queryRunner);
      if (!updatedProduct) throw new InternalServerErrorException; //TODO -> better exception!

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return plainToClass(SimpleStockUpdateDTO, createdStUp);

    }
    catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }

  }

}
