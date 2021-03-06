import { SimpleStockUpdateDTO } from './../../stock-update/dto/simple-stock-update.dto';
import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Roles } from 'src/core/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { StockUpdateDTO } from 'src/modules/stock-update/dto/stock-update.dto';
import { StockUpdate } from 'src/modules/stock-update/entities/stock-update.entity';
import { StockUpdateService } from 'src/modules/stock-update/services/stock-update.service';
import { EUserRoles } from 'src/modules/users/enums/user-roles.enum';
import { CreateStockUpdateDTO } from 'src/modules/stock-update/dto/create-stock-update.dto';
import { UpdateStockUpdateDTO } from 'src/modules/stock-update/dto/update-stock-update.dto';
import { Product } from '../entities/product.entity';
import { ProductsService } from '../services/products.service';

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
    const product: Product = await this.productsService.findOneById(id);
    if (!product) throw new NotFoundException;
    createStUp.product = product;
    const createdStUp: StockUpdate = await this.stockUpdateService.create(createStUp);
    return plainToClass(SimpleStockUpdateDTO,createdStUp);
  }

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
}
