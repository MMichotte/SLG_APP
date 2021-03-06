import { ProductsService } from './../../products/services/products.service';
import { Product } from './../../products/entities/product.entity';
import { UpdateStockUpdateDTO } from './../dto/update-stock-update.dto';
import { CreateStockUpdateDTO } from './../dto/create-stock-update.dto';
import { StockUpdate } from './../entities/stock-update.entity';
import { StockUpdateDTO } from './../dto/stock-update.dto';
import { Body, Controller, Get, Param, UseGuards, Post, Patch, NotFoundException, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { StockUpdateService } from '../services/stock-update.service';
import { plainToClass } from 'class-transformer';
import { Roles } from 'src/core/decorators/roles.decorator';
import { EUserRoles } from 'src/modules/users/enums/user-roles.enum';
import { SimpleStockUpdateDTO } from '../dto/simple-stock-update.dto';

@Controller('stock-updates')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('stock-updates')
@ApiBearerAuth()
export class StockUpdateController {
  constructor(
    private readonly stockUpdateService: StockUpdateService,
    private readonly productService: ProductsService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: StockUpdateDTO,
    isArray: true
  })
  async findAll(): Promise<StockUpdateDTO[]> {
    const stUp: StockUpdate[] = await this.stockUpdateService.findAll();
    stUp.map((su: any) => {su.productId = su.product.id; return su;});
    return plainToClass(StockUpdateDTO,stUp);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: StockUpdateDTO,
  })
  async findOne(@Param('id') id: number ): Promise<StockUpdateDTO> {
    const stUp: StockUpdate = await this.stockUpdateService.findOneById(id);
    stUp.productId = stUp.product.id;
    return plainToClass(StockUpdateDTO,stUp);
  }
  
  @Delete(':id')
  @Roles(EUserRoles.ADMIN)
  async remove(@Param('id') id: number) {
    const stUp: StockUpdate | undefined = await this.stockUpdateService.findOneById(id);
    if (stUp == undefined) throw new NotFoundException;
    await this.stockUpdateService.remove(+id);
    return [];
  }

}
