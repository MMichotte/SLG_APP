import { ProductsService } from './../../../products/services/products.service';
import { Product } from './../../../products/entities/product.entity';
import { OrdersService } from './../services/orders.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseGuards, Patch, BadRequestException, HttpException, HttpStatus, NotAcceptableException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { EUserRoles } from '../../../users/enums/user-roles.enum';
import { plainToClass } from 'class-transformer';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { validate } from 'class-validator';
import { ProductOrderService } from '../../product-order/services/product-order.service';
import { ProductOrderDTO } from '../../product-order/dto/product-order.dto';
import { ProductOrder } from '../../product-order/entities/product-order.entity';
import { SimpleProductOrderDTO } from '../../product-order/dto/simple-product-order.dto';
import { CreateProductOrderDTO } from '../../product-order/dto/create-product-order.dto';
import { UpdateProductOrderDTO } from '../../product-order/dto/update-product-order.dto';
import { EProductOrderStatus } from '../../product-order/enums/product-order-status.enum';
import { Order } from '../entities/order.entity';

@Controller('orders')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('orders')
@ApiBearerAuth()
export class OrderProductOrderController {

  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly productOrderService: ProductOrderService
  ) { }

  @Get(':id/products')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductOrderDTO,
    isArray: true
  })
  async findAll(@Param('id') id: number): Promise<ProductOrderDTO[]> {
    const order: Order = await this.ordersService.findOneById(id);
    if (!order) throw new NotFoundException;

    const products: ProductOrder[] = await this.productOrderService.findAllByOrderId(id);
    return plainToClass(ProductOrderDTO, products);
  }

  @Get(':id/products/:prodId')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ProductOrderDTO
  })
  async findOne(@Param('id') id: number, @Param('prodId') prodId: number): Promise<ProductOrderDTO> {
    const order: Order = await this.ordersService.findOneById(id);
    if (!order) throw new NotFoundException;

    const product: ProductOrder = await this.productOrderService.findOneById(prodId);
    return plainToClass(ProductOrderDTO, product);
  }

  @Post(':id/products')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleProductOrderDTO,
  })
  async create(@Param('id') id: number, @Body() dto: CreateProductOrderDTO): Promise<SimpleProductOrderDTO> {
    const order: Order = await this.ordersService.findOneById(id);
    if (!order) throw new NotFoundException;

    dto = new CreateProductOrderDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const product: Product = await this.productsService.findOneById(dto.productId);
    if (!product) throw new NotFoundException;

    const existingProduct: ProductOrder = await this.productOrderService.findOneByProdId(dto.productId);
    if (existingProduct) throw new HttpException('The product is already in this order!', HttpStatus.NOT_ACCEPTABLE);

    dto.order = order;
    dto.product = product;

    const newProductOrder: ProductOrder = await this.productOrderService.create(dto);
    return plainToClass(SimpleProductOrderDTO, newProductOrder);
  }

  @Patch(':id/products/:prodId')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleProductOrderDTO,
  })
  async update(@Param('id') id: number, @Param('prodId') prodId: number, @Body() dto: UpdateProductOrderDTO): Promise<SimpleProductOrderDTO> {
    const order: Order = await this.ordersService.findOneById(id);
    if (!order) throw new NotFoundException;

    dto = new UpdateProductOrderDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const product: Product = await this.productsService.findOneById(dto.productId);
    if (!product) throw new NotFoundException;

    const existingProduct: ProductOrder = await this.productOrderService.findOneByProdId(dto.productId);
    if (!existingProduct) throw new NotFoundException;

    dto.order = order;
    dto.product = product;
    delete dto.productId;

    const updatedProductOrder: ProductOrder = await this.productOrderService.update(prodId, dto);
    updatedProductOrder.id = id;

    return plainToClass(SimpleProductOrderDTO, updatedProductOrder);
  }

  @Delete(':id/products/:prodId')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number, @Param('prodId') prodId: number) {
    const order: Order = await this.ordersService.findOneById(id);
    if (!order) throw new NotFoundException;

    const productOrder: ProductOrder | undefined = await this.productOrderService.findOneById(prodId);
    if (!productOrder) throw new NotFoundException;

    const productOrderIsReceived: boolean = (await this.productOrderService.findOneById(prodId)).status === EProductOrderStatus.RECEIVED;
    if (productOrderIsReceived) throw new NotAcceptableException;

    await this.productOrderService.remove(prodId);
    return [];
  }

}
