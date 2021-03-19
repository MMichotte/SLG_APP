import { ProductOrderDTO } from './../dto/product-order.dto';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ProductOrderService } from '../services/product-order.service';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { EUserRoles } from '../../../users/enums/user-roles.enum';
import { ProductOrder } from '../entities/product-order.entity';
import { plainToClass } from 'class-transformer';
import { Roles } from '../../../../core/decorators/roles.decorator';

@Controller('product-order')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('product-order')
@ApiBearerAuth()
export class ProductOrderController {

  constructor(
    private readonly productOrderService: ProductOrderService
  ) {}

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductOrderDTO
  })
  async findOne(@Param('id') id: number): Promise<ProductOrderDTO> {
    const productOrder: ProductOrder = await this.productOrderService.findOneById(id);
    return plainToClass(ProductOrderDTO,productOrder);
  }

}
