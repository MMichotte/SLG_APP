import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Roles } from '@core/decorators/roles.decorator';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { RolesGuard } from '@core/guards/roles.guard';
import { Order } from '@modules/orders/orders/entities/order.entity';
import { OrdersService } from '@modules/orders/orders/services/orders.service';
import {
  UpdateProductOrderProcessDTO
} from '@modules/orders/product-order/dto/update-product-order-process.dto';
import { ProductOrder } from '@modules/orders/product-order/entities/product-order.entity';
import { EProductOrderStatus } from '@modules/orders/product-order/enums/product-order-status.enum';
import { ProductOrderService } from '@modules/orders/product-order/services/product-order.service';
import { ProductsService } from '@modules/products/services/products.service';
import {
  BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EUserRoles } from '../../../users/enums/user-roles.enum';
import { BillSupplierDTO } from '../dto/bill-supplier.dto';
import { CreateBillSupplierDTO } from '../dto/create-bill-supplier.dto';
import { SimpleBillSupplierDTO } from '../dto/simple-bill-supplier.dto';
import { BillSupplier } from '../entities/bill-supplier.entity';
import { BillSupplierUpdateService } from '../services/bill-supplier-update.service';
import { BillSupplierService } from '../services/bill-supplier.service';
import { getConnection, QueryRunner } from 'typeorm';
import { Product } from '@modules/products/entities/product.entity';

@Controller('bill-supplier')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('bills (supplier)')
@ApiBearerAuth()
export class BillSupplierController {
  constructor(
    private readonly billSupplierService: BillSupplierService,
    private readonly billSupplierUpdateService: BillSupplierUpdateService,
    private readonly productOrderService: ProductOrderService,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService
  ) { }

  @Get()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: BillSupplierDTO,
    isArray: true
  })
  async findAll(): Promise<BillSupplierDTO[]> {
    const bills: BillSupplier[] = await this.billSupplierService.findAll();
    return plainToClass(BillSupplier, bills);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: BillSupplierDTO
  })
  async findOne(@Param('id') id: number): Promise<BillSupplierDTO> {
    const bill: BillSupplier = await this.billSupplierService.findOneById(id);
    return plainToClass(BillSupplier, bill);
  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiQuery({ name: 'orderId', type: String, required: true })
  @ApiResponse({
    status: 201,
    type: SimpleBillSupplierDTO,
  })
  async create(@Query('orderId') orderId: string, @Body() dto: CreateBillSupplierDTO): Promise<SimpleBillSupplierDTO> {

    dto = new CreateBillSupplierDTO(dto);
    const errors = await validate(dto);
    if (errors.length) {
      throw new BadRequestException;
    }

    for (const productOrder of dto.productOrders) {
      const productOrderDto = new UpdateProductOrderProcessDTO(productOrder);
      let errors = await validate(productOrderDto);
      errors = errors.filter((err: any) => err.target.id !== null);
      if (errors.length) {
        throw new BadRequestException;
      }
    }

    const newBill: BillSupplier = await this.billSupplierService.create(dto);
    const baseOrder: Order = await this.ordersService.findOneById(+orderId);
    let order: Order = null;

    const queryRunner: QueryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      for (const pO of dto.productOrders) {
      
        let prodO: any = {};

        if (pO.id) {
          prodO = await this.productOrderService.findOneById(pO.id);
          if (!prodO) {
            throw new NotFoundException;
          }
        } else {
          // the user added a product that was not in the original order!
          prodO.product = {};
          prodO.product.id = pO.prodId;
          prodO.quantityOrdered = 0;
          delete pO.id;
        }
        delete pO.prodId;

        order = (prodO.order) ? prodO.order : baseOrder;
        const quantDiff = pO.quantityReceived - prodO.quantityOrdered;

        if (quantDiff === 0) {
          // product received in the desired quantity

          prodO = this.billSupplierUpdateService.receiveProductOrderFromDto(prodO, pO, newBill);
          prodO.updatedAt = new Date();
          await queryRunner.manager.update(ProductOrder, prodO.id, prodO);

        } else if (quantDiff < 0) {
          // product partially received, some are in BO

          // create and add new productOrder w/ the remaining quant
          await this.billSupplierUpdateService.createBOProdOrder(prodO, quantDiff);

          // update the received productOrder
          prodO = this.billSupplierUpdateService.receiveProductOrderFromDto(prodO, pO, newBill);
          await queryRunner.manager.update(ProductOrder, prodO.id, prodO);

        } else if (quantDiff > 0) {
          // product received in excess, probably from a BO prodO of a previous order.

          // find all productOrders of the same product and from the same supplier with as status : BO
          let existingProdBOs: ProductOrder[] = await this.productOrderService.findAllBOByProdId_transactional(prodO.product.id, queryRunner);
          existingProdBOs = existingProdBOs.filter(eP => eP.order.supplier.id === order.supplier.id);

          let remainingQuant: number = quantDiff;

          for (let bo of existingProdBOs) {
            if (bo.quantityOrdered === remainingQuant) {

              bo = await this.billSupplierUpdateService.updateBOProductOrder(bo, pO, newBill, queryRunner, remainingQuant);

              remainingQuant = 0;
              break;

            } else if (bo.quantityOrdered > remainingQuant) {
              // still not enough -> create a new BO

              // create and add new productOrder w/ the remaining quant
              await this.billSupplierUpdateService.createBOProdOrder(bo, remainingQuant - bo.quantityOrdered);

              // update the current BO prodO
              bo = await this.billSupplierUpdateService.updateBOProductOrder(bo, pO, newBill, queryRunner, remainingQuant);

              remainingQuant = 0;
              break;

            } else if (bo.quantityOrdered < remainingQuant) {

              bo = await this.billSupplierUpdateService.updateBOProductOrder(bo, pO, newBill, queryRunner);

              remainingQuant = remainingQuant - bo.quantityOrdered;

            }
          }

          if (!prodO.id) {
            // the user added a product that was not in the original order.
            // check if the remaining quant is > 0 -> if yes we need to create and add the product to the current order!
            if (remainingQuant > 0) {
              const newProdOrder = new ProductOrder();
              newProdOrder.product = await this.productsService.findOneById_transactional(prodO.product.id, queryRunner);
              newProdOrder.order = order;
              newProdOrder.quantityOrdered = 0;
              newProdOrder.status = EProductOrderStatus.RECEIVED;

              prodO = await this.productOrderService.create(newProdOrder);

            } else {
              return;
            }
          }

          // update the received productOrder
          prodO = this.billSupplierUpdateService.receiveProductOrderFromDto(prodO, pO, newBill);
          prodO.quantityReceived = prodO.quantityReceived - quantDiff + remainingQuant;
          prodO.updatedAt = new Date();

          await queryRunner.manager.update(ProductOrder, prodO.id, prodO);

        }

        // update product quantity and price
        const product = prodO.product;
        product.purchasePriceHT = prodO.pcPurchasePriceHTAtDate;
        if (product.purchasePriceHT >= product.salePriceHT) {
          product.salePriceHT = product.purchasePriceHT * 1.02; // set a min margin of 2%!
        }
        product.quantity = product.quantity + prodO.quantityReceived;
        product.updatedAt = new Date();

        await queryRunner.manager.update(Product, product.id, product);

      }

      // update status of all products that weren't received:
      const notReceivedProds: ProductOrder[] = (await this.productOrderService.findAllByOrderId_transactional(order.id, queryRunner))
        .filter(pO => pO.status === EProductOrderStatus.ORDERED);
      await Promise.all(notReceivedProds.map(async pO => {
        pO.status = EProductOrderStatus.BO;
        pO.updatedAt = new Date();

        await queryRunner.manager.update(ProductOrder, pO.id, pO);
      }));

      await this.billSupplierUpdateService.updateOrderStatus(order, queryRunner);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return plainToClass(SimpleBillSupplierDTO, newBill);

    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

}
