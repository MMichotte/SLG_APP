import { LightProductDTO } from './../dto/light-product.dto';
import { SimpleProductDTO } from './../dto/simple-product.dto';
import { ProductDTO } from './../dto/product';
import { Roles } from '@core/decorators/roles.decorator';
import { EUserRoles } from '@modules/users/enums/user-roles.enum';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch, NotFoundException, ConflictException, BadRequestException, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../dto/create-product.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { Product } from '../entities/product.entity';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

//TODO -> create service for REDIS 
import env from '@config/env'; 
import { createClient as redisCreateClient } from 'redis';
const DEFAULT_REDIS_TTL = 3600;

const redisClient = redisCreateClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`
});
redisClient.connect();


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

    const redisProducts = await redisClient.get('products');
    let products: Product[] = [];
    if (redisProducts) {
      products = JSON.parse(redisProducts);
      return plainToClass(ProductDTO,products);
    }
    
    products = await this.productsService.findAll();
    products = products.map( (p: any) => {
      p.reservedQuantity = 0; //TODO calc reserved quant based on active worksheets
      return p;
    });
    redisClient.setEx('products', DEFAULT_REDIS_TTL, JSON.stringify(products));
    return plainToClass(ProductDTO,products);
  }
  
  @Get('light')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiQuery({
    name: 'searchProduct',
    type: String,
    required: false
  })
  @ApiResponse({
    status: 200,
    type: LightProductDTO,
    isArray: true
  })
  async findAllLights(@Query() searchProduct?: any): Promise<LightProductDTO[]> {
    let products: Product[];
    if (searchProduct.searchProduct) {
      products = await this.productsService.findAll(searchProduct.searchProduct);
    }  else {
      products = await this.productsService.findAll();
    }
    
    products = products.map( (p: any) => {
      p.reservedQuantity = 0; //TODO calc reserved quant based on active worksheets
      return p;
    });
    return plainToClass(LightProductDTO,products);
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
    const errors = await validate(createProductDto);
    if(errors.length) throw new BadRequestException;

    createProductDto = new CreateProductDTO(createProductDto);
    const existingProd: Product = await this.productsService.findOneByRef(createProductDto.reference);
    if (existingProd) throw new ConflictException;
    
    const createdProduct: Product = await this.productsService.create(createProductDto);
    redisClient.del('products');
    return plainToClass(SimpleProductDTO,createdProduct);
  }

  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 200,
    type: SimpleProductDTO,
  })
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDTO): Promise<SimpleProductDTO> {
    updateProductDto = new UpdateProductDTO(updateProductDto);
    const errors = await validate(updateProductDto);
    if(errors.length) throw new BadRequestException;

    const product: Product | undefined = await this.productsService.findOneById(id);
    if (product == undefined) throw new NotFoundException;
    const existingProd: Product = await this.productsService.findOneByRef(updateProductDto.reference);
    if (existingProd) if (existingProd.id !== product.id) throw new ConflictException;
    updateProductDto.quantity = product.quantity;

    updateProductDto.updatedAt = new Date();
    const updatedProduct: Product = await this.productsService.update(id, updateProductDto);
    updatedProduct.id = id;
    redisClient.del('products');
    return plainToClass(SimpleProductDTO,updatedProduct);
  }
  
  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number) {
    const product: Product | undefined = await this.productsService.findOneById(+id);
    if (product == undefined) throw new NotFoundException;
    redisClient.del('products');
    return await this.productsService.remove(id);
  }
}
