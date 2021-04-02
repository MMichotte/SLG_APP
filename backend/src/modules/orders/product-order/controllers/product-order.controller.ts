import { OrdersService } from './../../orders/services/orders.service';
import { ProductOrderDTO } from './../dto/product-order.dto';
import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, NotAcceptableException, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductOrderService } from '../services/product-order.service';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { EUserRoles } from '../../../users/enums/user-roles.enum';
import { ProductsService } from './../../../products/services/products.service';
import { Product } from './../../../products/entities/product.entity';
import { ProductOrder } from '../entities/product-order.entity';
import { plainToClass } from 'class-transformer';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { SimpleProductOrderDTO } from '../dto/simple-product-order.dto';
import { CreateProductOrderDTO } from '../dto/create-product-order.dto';
import { validate } from 'class-validator';
import { UpdateProductOrderProcessDTO } from '../dto/update-product-order-process.dto';
import { Order } from '../../orders/entities/order.entity';
import { EProductOrderStatus } from '../enums/product-order-status.enum';
import { UpdateProductOrderSimpleDTO } from '../dto/update-product-order-simple.dto';
import { EOrderStatus } from '../../orders/enums/order-status.enum';

@Controller('product-order')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('order products')
@ApiBearerAuth()
export class ProductOrderController {

  constructor(
    private readonly productOrderService: ProductOrderService,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiQuery({name: 'orderId', type: Number, required: false})
  @ApiResponse({
    status: 200,
    type: ProductOrderDTO,
    isArray: true
  })
  async findAll(@Query('orderId') orderId?: number): Promise<ProductOrderDTO[]> {
    let productOrders: ProductOrder[];
    if (orderId !== null) {
      productOrders = await this.productOrderService.findAllByOrderId(+orderId);
    } else {
      productOrders = await this.productOrderService.findAll();
    }
    return plainToClass(ProductOrderDTO,productOrders);
  }

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

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleProductOrderDTO,
  })
  async create(@Body() dto: CreateProductOrderDTO): Promise<SimpleProductOrderDTO> {
    
    dto = new CreateProductOrderDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const product: Product = await this.productsService.findOneById(dto.productId);
    if (!product) throw new NotFoundException;

    if (dto.orderId) {
      const order: Order = await this.ordersService.findOneById(dto.orderId);
      if (!order) throw new NotFoundException;
      if (order.status === EOrderStatus.CLOSED) throw new BadRequestException;
      dto.order = order;
    }

    const existingProduct: ProductOrder = await this.productOrderService.findOneByOrderIdAndProdId(dto.orderId, dto.productId);
    if (existingProduct) throw new HttpException('The product is already in this order!', HttpStatus.NOT_ACCEPTABLE);

    dto.product = product;
    
    delete dto.productId;
    delete dto.orderId;

    const newProductOrder: ProductOrder = await this.productOrderService.create(dto);
    return plainToClass(SimpleProductOrderDTO, newProductOrder);
  }
  
  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleProductOrderDTO,
  })
  async update(@Param('id') id: number, @Body() dto: UpdateProductOrderSimpleDTO): Promise<SimpleProductOrderDTO> {
    
    dto = new UpdateProductOrderSimpleDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    let existingProduct: ProductOrder = await this.productOrderService.findOneById(id);
    if (!existingProduct) throw new NotFoundException;

    if (existingProduct.status === EProductOrderStatus.RECEIVED) throw new NotAcceptableException;

    if (dto.orderId) {
      const order: Order = await this.ordersService.findOneById(dto.orderId);
      if (!order) throw new NotFoundException;
      if (order.status !== EOrderStatus.OPEN) throw new BadRequestException;
      dto.order = order;
      
      /**
      * Find if a productOrder that already has the same product
      * (only used when updating prods from the common cart to an existing cart) 
      */
      if (existingProduct.order?.id !== dto.orderId) {
        const existingSimilarProd: ProductOrder = await this.productOrderService.findOneByOrderIdAndProdId(dto.orderId, existingProduct.product.id);
        if (existingSimilarProd) {
          await this.productOrderService.remove(existingProduct.id); // delete the current product
          id = existingSimilarProd.id; // change to the existing product ID
          existingProduct = existingSimilarProd; // change to the existing product 
          dto.quantityOrdered += existingProduct.quantityOrdered; // update quantity (-> will effectively be updated below)
        }
      }
      
    }

    if (dto.status !== EProductOrderStatus.PENDING && dto.status !== EProductOrderStatus.ORDERED) {
      // The user cannot change the status to BO or RECEIVED manually!
      throw new BadRequestException;
    }

    delete dto.orderId;

    for (const [key, value] of Object.entries(dto)) {
      existingProduct[key] = value;
    }
    
    const updatedProductOrder: ProductOrder = await this.productOrderService.update(id, existingProduct);
    updatedProductOrder.id = id;

    return plainToClass(SimpleProductOrderDTO, updatedProductOrder);
  }
  /*
  @Patch(':id/processing')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleProductOrderDTO,
  })
  async updateProcessing(@Param('id') id: number, @Body() dto: UpdateProductOrderProcessDTO): Promise<SimpleProductOrderDTO> {
    
    dto = new UpdateProductOrderProcessDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    if (dto.quantityReceived > 0 && !dto.BillSupplier) throw new  BadRequestException;

    const existingProduct: ProductOrder = await this.productOrderService.findOneById(id);
    if (!existingProduct) throw new NotFoundException;

    if (existingProduct.status === EProductOrderStatus.RECEIVED) throw new NotAcceptableException;

    if (dto.orderId) {
      const order: Order = await this.ordersService.findOneById(dto.orderId);
      if (!order) throw new NotFoundException;
      dto.order = order;
    }

    delete dto.orderId;
    
    for (const [key, value] of Object.entries(dto)) {
      existingProduct[key] = value;
    }

    if (existingProduct.quantityReceived === 0) {
      existingProduct.status = EProductOrderStatus.BO;
    } else {
      existingProduct.status = EProductOrderStatus.RECEIVED;
    }

    const updatedProductOrder: ProductOrder = await this.productOrderService.update(id, dto);
    updatedProductOrder.id = id;

    return plainToClass(SimpleProductOrderDTO, updatedProductOrder);
  }
  */

  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number) {
    
    const productOrder: ProductOrder | undefined = await this.productOrderService.findOneById(id);
    if (!productOrder) throw new NotFoundException;

    const productOrderIsReceived: boolean = (productOrder.status === EProductOrderStatus.RECEIVED);
    if (productOrderIsReceived) throw new NotAcceptableException;

    await this.productOrderService.remove(id);

    // update order-status
    const prodsLeft: ProductOrder[] = (await this.productOrderService.findAllByOrderId(productOrder.order.id)).filter(pO => pO.status !== EProductOrderStatus.RECEIVED);
    if (prodsLeft.length) productOrder.order.status = EOrderStatus.PD;
    else productOrder.order.status = EOrderStatus.CLOSED;
    await this.ordersService.update(productOrder.order.id,productOrder.order);
    
    return [];
  }

}
