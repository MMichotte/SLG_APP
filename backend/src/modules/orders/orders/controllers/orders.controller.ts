import { EOrderStatus } from './../enums/order-status.enum';
import { CompaniesService } from './../../../companies/services/companies.service';
import { Company } from './../../../companies/entities/company.entity';
import { ProductOrder } from './../../product-order/entities/product-order.entity';
import { CreateOrderDTO } from './../dto/create-order.dto';
import { SimpleOrderDTO } from './../dto/simple.order.dto';
import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Patch, Post, UseGuards, ConflictException, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Order } from './../entities/order.entity';
import { OrderDTO } from './../dto/order.dto';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { OrdersService } from '../services/orders.service';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { EUserRoles } from '../../../users/enums/user-roles.enum';
import { ProductOrderService } from '../../product-order/services/product-order.service';
import { EProductOrderStatus } from '../../product-order/enums/product-order-status.enum';
import { validate } from 'class-validator';
import { ECompanyType } from 'src/modules/companies/enums/company-type.enum';
import { UpdateOrderDTO } from '../dto/update-order.dto';

@Controller('orders')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('orders')
@ApiBearerAuth()
export class OrdersController {
  
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productOrderService: ProductOrderService,
    private readonly companiesService: CompaniesService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiQuery({name: 'status', enum: EOrderStatus, required: false})
  @ApiResponse({
    status: 200,
    type: OrderDTO,
    isArray: true
  })
  async findAll(@Query('status') status?: EOrderStatus): Promise<OrderDTO[]> {
    const orders: Order[] = await this.ordersService.findAll(status);
    return plainToClass(OrderDTO,orders);
  }
  
  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: OrderDTO
  })
  async findOne(@Param('id') id: number): Promise<OrderDTO> {
    const order: Order = await this.ordersService.findOneById(id);
    return plainToClass(OrderDTO,order);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleOrderDTO,
  })
  async create(@Body() dto: CreateOrderDTO): Promise<SimpleOrderDTO> {
    dto = new CreateOrderDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const supplier: Company = await this.companiesService.findOneById(dto.supplierId);
    if (!supplier) throw new NotFoundException;
    if (supplier.type !== ECompanyType.SUPPLIER && supplier.type !== ECompanyType.SUPP_AND_CLI) throw new ForbiddenException;

    const existingOpenOrders: Order[] = await this.ordersService.findAllBySupplierId(dto.supplierId);
    if (existingOpenOrders.length) throw new ConflictException;

    dto.supplier = supplier;
    const newOrder: Order = await this.ordersService.create(dto);
    return plainToClass(SimpleOrderDTO,newOrder);
  }
  
  @Patch(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleOrderDTO,
  })
  async update(@Param('id') id: number, @Body() dto: UpdateOrderDTO): Promise<SimpleOrderDTO> {
    dto = new UpdateOrderDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const order: Order = await this.ordersService.findOneById(id);
    if (!order) throw new NotFoundException;

    if (dto.status === EOrderStatus.ORDERED) {
      // change status of every product of the order:
      const productOrders: ProductOrder[] = await this.productOrderService.findAllByOrderId(order.id);
      productOrders.forEach(async pO => {
        pO.status = EProductOrderStatus.ORDERED;
        await this.productOrderService.update(pO.id, pO);
      });
    }

    dto.supplier = order.supplier;
    const updatedOrder: Order = await this.ordersService.update(id, dto);
    updatedOrder.id = id;
    return plainToClass(SimpleOrderDTO,updatedOrder);
  }

  @Delete(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  async remove(@Param('id') id: number) {
    const order: Order | undefined = await this.ordersService.findOneById(id);
    if (!order) throw new NotFoundException;
    
    const orderProducts: ProductOrder[] = await this.productOrderService.findAllByOrderId(id);
    const receivedProducts: ProductOrder[] = orderProducts.filter(
      (pO: ProductOrder) => pO.status === EProductOrderStatus.RECEIVED
    );
    if (receivedProducts.length) throw new ConflictException;
    
    orderProducts.forEach(async (pO: ProductOrder) => {
      await this.productOrderService.remove(pO.id);
    });

    await this.ordersService.remove(id);
    return [];
  }

}
