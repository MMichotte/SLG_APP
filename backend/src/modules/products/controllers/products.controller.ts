import { SimpleProductDTO } from './../dto/simple-product.dto';
import { ProductDTO } from './../dto/product';
import { Roles } from '../../../core/decorators/roles.decorator';
import { EUserRoles } from '../../users/enums/user-roles.enum';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, NotFoundException, ConflictException } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { Product } from '../entities/product.entity';
import { plainToClass } from 'class-transformer';

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
    isArray: true
  })
  async findAll(): Promise<ProductDTO[]> {
    let products: Product[] = await this.productsService.findAll();
    products = products.map( (p: any) => {
      p.reservedQuantity = 0; //TODO calc reserved quant based on active worksheets
      return p;
    });
    return plainToClass(ProductDTO,products);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductDTO,
  })
  async findOne(@Param('id') id: string): Promise<ProductDTO>  {
    const product: Product = await this.productsService.findOneById(+id);
    return plainToClass(ProductDTO,product);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleProductDTO,
  })
  async create(@Body() createProductDto: CreateProductDTO): Promise<SimpleProductDTO>  {
    const existingProd: Product = await this.productsService.findOneByRef(createProductDto.reference);
    if (existingProd) throw new ConflictException;
    const createdProduct: Product = await this.productsService.create(createProductDto);
    return plainToClass(SimpleProductDTO,createdProduct);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 200,
    type: SimpleProductDTO,
  })
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO): Promise<SimpleProductDTO> {
    const product: Product | undefined = await this.productsService.findOneById(id);
    if (product == undefined) throw new NotFoundException;
    const existingProd: Product = await this.productsService.findOneByRef(updateProductDto.reference);
    if (existingProd) if (existingProd.id !== product.id) throw new ConflictException;
    updateProductDto.quantity = product.quantity;
    const updatedProduct: Product = await this.productsService.update(id, updateProductDto);
    updatedProduct.id = id;
    return plainToClass(SimpleProductDTO,updatedProduct);
  }
  
  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number) {
    const product: Product | undefined = await this.productsService.findOneById(+id);
    if (product == undefined) throw new NotFoundException;
    return this.productsService.remove(id);
  }
}
