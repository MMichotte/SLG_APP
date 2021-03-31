import { UpdateProductOrderProcessDTO } from './../../../orders/product-order/dto/update-product-order-process.dto';
import { CreateProductOrderDTO } from './../../../orders/product-order/dto/create-product-order.dto';
import { OrdersService } from './../../../orders/orders/services/orders.service';
import { EOrderStatus } from './../../../orders/orders/enums/order-status.enum';
import { ProductOrder } from './../../../orders/product-order/entities/product-order.entity';
import { Order } from './../../../orders/orders/entities/order.entity';
import { EProductOrderStatus } from './../../../orders/product-order/enums/product-order-status.enum';
import { ProductOrderService } from './../../../orders/product-order/services/product-order.service';
import { CreateBillSupplierDTO } from './../dto/create-bill-supplier.dto';
import { BillSupplier } from './../entities/bill-supplier.entity';
import { BadRequestException, Body, Controller, Get, Param, Post, UseGuards, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/decorators/roles.decorator';
import { EUserRoles } from '../../../users/enums/user-roles.enum';
import { JwtAuthGuard } from '../../../../core/guards/jwt-auth.guard';
import { RolesGuard } from '../../../../core/guards/roles.guard';
import { BillSupplierService } from '../services/bill-supplier.service';
import { plainToClass } from 'class-transformer';
import { SimpleBillSupplierDTO } from '../dto/simple-bill-supplier.dto';
import { validate } from 'class-validator';

@Controller('bill-supplier')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('bills (supplier)')
@ApiBearerAuth()
export class BillSupplierController {
  constructor(
    private readonly billSupplierService: BillSupplierService,
    private readonly productOrderService: ProductOrderService,
    private readonly ordersService: OrdersService
  ) {}

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: BillSupplier,
    isArray: true
  })
  async findAll(): Promise<BillSupplier[]> {
    const bills: BillSupplier[] = await this.billSupplierService.findAll();
    return plainToClass(BillSupplier,bills);
  }
  
  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: BillSupplier
  })
  async findOne(@Param('id') id: number): Promise<BillSupplier> {
    const bill: BillSupplier = await this.billSupplierService.findOneById(id);
    return plainToClass(BillSupplier,bill);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiResponse({
    status: 201,
    type: SimpleBillSupplierDTO,
  })
  async create(@Body() dto: CreateBillSupplierDTO): Promise<SimpleBillSupplierDTO> {
    dto = new CreateBillSupplierDTO(dto);
    const errors = await validate(dto);
    if (errors.length) throw new BadRequestException;

    const newBill: BillSupplier = await this.billSupplierService.create(dto);
    let order: Order = null;

    await Promise.all(dto.productOrders.map( async pO => {
      let prod = await this.productOrderService.findOneById(pO.id);
      if (!prod) throw new NotFoundException;
      order = prod.order;
      const quantDiff = pO.quantityReceived - prod.quantityOrdered;
      if (quantDiff === 0) {
        // product received in the desired quantity
        prod = this._receiveProductOrderFromDto(prod, pO, newBill);
        await this.productOrderService.update(prod.id, prod);
      } else if (quantDiff < 0) {
        // product partially received, some are in BO
        
        // create and add new productOrder w/ the remaining quant
        await this._createBOProdOrder(prod,quantDiff);
      
        // update the received productOrder
        prod = this._receiveProductOrderFromDto(prod, pO, newBill);
        await this.productOrderService.update(prod.id, prod);

      } else if (quantDiff > 0) {
        // product received in excess, probably from a BO prod of a previous order.
        
        // find all productOrders of the same product and from the same supplier with as status : BO
        let existingProdBOs: ProductOrder[] = await this.productOrderService.findAllBOByProdId(prod.product.id);
        existingProdBOs = existingProdBOs.filter(eP => eP.order.supplier.id === order.supplier.id);
        let remainingQuant: number = quantDiff;
        for (let bo of existingProdBOs) {
          if (bo.quantityOrdered === remainingQuant) {
            const boId = bo.id;
            bo = this._receiveProductOrderFromDto(bo,pO,newBill);
            bo.quantityReceived = remainingQuant;
            bo.id = boId;
            await this.productOrderService.update(bo.id, bo);
            await this._updateOrderStatus(bo.order);
            remainingQuant = 0;
            break;
          } else if (bo.quantityOrdered > remainingQuant) {
            // still not enough -> create a new BO
            
            // create and add new productOrder w/ the remaining quant
            await this._createBOProdOrder(bo,remainingQuant - bo.quantityOrdered);

            // update the current BO prod
            const boId = bo.id;
            bo = this._receiveProductOrderFromDto(bo,pO,newBill);
            bo.quantityReceived = remainingQuant;
            bo.id = boId;
            await this.productOrderService.update(bo.id, bo);

            await this._updateOrderStatus(bo.order);
            remainingQuant = 0;
            break;
          } else if (bo.quantityOrdered < remainingQuant) {
            const boId = bo.id;
            bo = this._receiveProductOrderFromDto(bo,pO,newBill);
            bo.quantityReceived = bo.quantityOrdered;
            bo.id = boId;
            await this.productOrderService.update(bo.id, bo);
            await this._updateOrderStatus(bo.order);
            remainingQuant = remainingQuant - bo.quantityOrdered;
          }
        }

        // update the received productOrder
        prod = this._receiveProductOrderFromDto(prod, pO, newBill);
        prod.quantityReceived = prod.quantityReceived - quantDiff + remainingQuant;
        await this.productOrderService.update(prod.id, prod);
      }
      
      // TODO update product quantity! 

    }));

    await this._updateOrderStatus(order);

    return plainToClass(SimpleBillSupplierDTO,newBill);
  }

  private async _createBOProdOrder(originalProd: ProductOrder, qtty: number): Promise<void> {
    const prodBO: CreateProductOrderDTO = new CreateProductOrderDTO();
    delete prodBO.productId; delete prodBO.orderId;
    prodBO.product = originalProd.product;
    prodBO.order = originalProd.order;
    prodBO.note = originalProd.note;
    prodBO.quantityOrdered = Math.abs(qtty);
    prodBO.status = EProductOrderStatus.BO;
    await this.productOrderService.create(prodBO);
  }

  private async _updateOrderStatus(order: Order): Promise<void> {
    // Update the order status accordingly (either PD or CLOSED)
    const prodsLeft: ProductOrder[] = (await this.productOrderService.findAllByOrderId(order.id)).filter(pO => pO.status !== EProductOrderStatus.RECEIVED);
    if (prodsLeft.length) order.status = EOrderStatus.PD;
    else order.status = EOrderStatus.CLOSED;
    await this.ordersService.update(order.id, order);
  }

  private _receiveProductOrderFromDto(existingProd: ProductOrder, dto: UpdateProductOrderProcessDTO, bill: BillSupplier): ProductOrder {
    for (const [key, value] of Object.entries(dto)) {
      existingProd[key] = value;
    }
    existingProd.billSupplier = bill;
    existingProd.status = EProductOrderStatus.RECEIVED;
    return existingProd;
  }
}
