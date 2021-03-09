import { SimpleStockUpdateDTO } from './../../stock-update/dto/simple-stock-update.dto';
import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from '../../../core/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { StockUpdateDTO } from '../../../modules/stock-update/dto/stock-update.dto';
import { StockUpdate } from '../../../modules/stock-update/entities/stock-update.entity';
import { StockUpdateService } from '../../../modules/stock-update/services/stock-update.service';
import { EUserRoles } from '../../../modules/users/enums/user-roles.enum';
import { CreateStockUpdateDTO } from '../../../modules/stock-update/dto/create-stock-update.dto';
import { UpdateStockUpdateDTO } from '../../../modules/stock-update/dto/update-stock-update.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';
import { UpdateProductDTO } from '../dto/update-product.dto';

@Controller('products')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@ApiBearerAuth()
export class ProductsStockUpdateController {
  
  constructor (
    private readonly productsService: ProductsService,
    private readonly stockUpdateService: StockUpdateService
  ) {}
  
  @Get(':id/stock-updates')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: StockUpdateDTO,
    isArray: true
  })
  async findAll(@Param('id') id: number): Promise<StockUpdateDTO[]> {
    const stUp: StockUpdate[] = await this.stockUpdateService.findAllByProdId(id);
    return plainToClass(StockUpdateDTO,stUp);
  }
  
  @Post(':id/stock-updates')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleStockUpdateDTO,
  })
  async create(@Param('id') id: number, @Body() createStUp: CreateStockUpdateDTO): Promise<SimpleStockUpdateDTO>  {
    // Create Stock-update
    const product: Product = await this.productsService.findOneById(id);
    if (!product) throw new NotFoundException;
    createStUp.product = product;
    const createdStUp: StockUpdate = await this.stockUpdateService.create(createStUp);
    // Update product quantity:
    const updProd: UpdateProductDTO = plainToClass(UpdateProductDTO,product);
    updProd.quantity += createStUp.quantity;
    const updatedProduct = await this.productsService.update(id, updProd);
    if (!updatedProduct) throw new InternalServerErrorException; //TODO -> better exception!

    return plainToClass(SimpleStockUpdateDTO,createdStUp);
  }

  /*
  @Patch(':prodId/stock-updates/:id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 200,
    type: SimpleStockUpdateDTO,
  })
  async update(@Param('prodId') prodId: number, @Param('id') id: number, @Body() updateStUp: UpdateStockUpdateDTO): Promise<SimpleStockUpdateDTO> {
    const product: Product = await this.productsService.findOneById(prodId);
    if (!product) throw new NotFoundException;
    const stUp: StockUpdate | undefined = await this.stockUpdateService.findOneById(id);
    if (!stUp) throw new NotFoundException;
    const updatedStUp: StockUpdate = await this.stockUpdateService.update(id, updateStUp);
    updatedStUp.id = id;
    return plainToClass(SimpleStockUpdateDTO,updatedStUp);
  }
  */
}
