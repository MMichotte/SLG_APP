import { ProductsService } from './../../products/services/products.service';
import { StockUpdate } from './../entities/stock-update.entity';
import { StockUpdateDTO } from './../dto/stock-update.dto';
import { Controller, Get, Param, UseGuards, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { StockUpdateService } from '../services/stock-update.service';
import { plainToClass } from 'class-transformer';
import { Roles } from '../../../core/decorators/roles.decorator';
import { EUserRoles } from '../../../modules/users/enums/user-roles.enum';

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

}
