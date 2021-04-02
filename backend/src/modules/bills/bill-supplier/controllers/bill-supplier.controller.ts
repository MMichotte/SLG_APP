import { ProductsService } from './../../../products/services/products.service';
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
    private readonly productsService: ProductsService,
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
      let prodO: any = {};
      if (pO.id) {
        prodO = await this.productOrderService.findOneById(pO.id);
        if (!prodO) throw new NotFoundException;
      } else {
        // the user added a product that was not in the original order!
        prodO.product = {};
        prodO.product.id = pO.prodId;
        prodO.quantityOrdered = 0;
        delete pO.id;
      }
      delete pO.prodId;
      order = prodO.order;
      const quantDiff = pO.quantityReceived - prodO.quantityOrdered;
      if (quantDiff === 0) {
        // product received in the desired quantity
        prodO = this._receiveProductOrderFromDto(prodO, pO, newBill);
        await this.productOrderService.update(prodO.id, prodO);
      } else if (quantDiff < 0) {
        // product partially received, some are in BO
        
        // create and add new productOrder w/ the remaining quant
        await this._createBOProdOrder(prodO,quantDiff);
      
        // update the received productOrder
        prodO = this._receiveProductOrderFromDto(prodO, pO, newBill);
        await this.productOrderService.update(prodO.id, prodO);

      } else if (quantDiff > 0) {
        // product received in excess, probably from a BO prodO of a previous order.

        // find all productOrders of the same product and from the same supplier with as status : BO
        let existingProdBOs: ProductOrder[] = await this.productOrderService.findAllBOByProdId(prodO.product.id);
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

            // update the current BO prodO
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

        if (!prodO.id) {
          // the user added a product that was not in the original order.
          // check if the remaining quant is > 0 -> if yes we need to create and add the product to the current order!
          if (remainingQuant > 0) {
            const newProdOrder = new ProductOrder();
            newProdOrder.product = await this.productsService.findOneById(prodO.product.id);
            newProdOrder.order = order;
            newProdOrder.quantityOrdered = 0;
            newProdOrder.status = EProductOrderStatus.RECEIVED;
            prodO = await this.productOrderService.create(newProdOrder);            
          } else {
            return;
          }
        }
        // update the received productOrder
        prodO = this._receiveProductOrderFromDto(prodO, pO, newBill);
        prodO.quantityReceived = prodO.quantityReceived - quantDiff + remainingQuant;
        await this.productOrderService.update(prodO.id, prodO);
      }
      
      // update product quantity and price
      const product = prodO.product;
      product.purchasePriceHT = prodO.pcPurchasePriceHTAtDate;
      if (product.purchasePriceHT >= product.salePriceHT) product.salePriceHT = product.purchasePriceHT * 1.02; // set a min margin of 2%!
      product.quantity = product.quantity + prodO.quantityReceived;
      await this.productsService.update(product.id, product);

    }));

    // update status of all products that weren't received:
    const notReceivedProds: ProductOrder[] = (await this.productOrderService.findAllByOrderId(order.id)).filter(pO =>  pO.status === EProductOrderStatus.ORDERED);
    await Promise.all(notReceivedProds.map(async pO => {
      pO.status = EProductOrderStatus.BO;
      await this.productOrderService.update(pO.id, pO);
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
