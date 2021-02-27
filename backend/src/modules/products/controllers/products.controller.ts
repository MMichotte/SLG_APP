import { SimpleProductDTO } from './../dto/simple-product.dto';
import { ProductDTO } from './../dto/product';
import { Roles } from '../../../core/decorators/roles.decorator';
import { EUserRoles } from '../../users/enums/user-roles.enum';
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';

@Controller('products')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('products')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductDTO,
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductDTO,
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOneById(+id);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleProductDTO,
  })
  create(@Body() createProductDto: CreateProductDTO) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 200,
    type: SimpleProductDTO,
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDTO) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
