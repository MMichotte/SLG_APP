import { rootPath } from '@core/constants/root.path';
import { BillSupplierPdfDTO } from './../dto/bill-supplier-pdf.dto';
import { BillPdfGeneratorService } from './../services/bill-pdf-generator.service';
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
  BadRequestException, Body, Controller, Get, Header, NotFoundException, Param, Post, Query, Res, UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { EUserRoles } from '../../../users/enums/user-roles.enum';
import { BillSupplierDTO } from '../dto/bill-supplier.dto';
import { CreateBillSupplierDTO } from '../dto/create-bill-supplier.dto';
import { SimpleBillSupplierDTO } from '../dto/simple-bill-supplier.dto';
import { BillSupplier } from '../entities/bill-supplier.entity';
import { BillSupplierUpdateService } from '../services/bill-supplier-update.service';
import { BillSupplierService } from '../services/bill-supplier.service';
import { getConnection, QueryRunner } from 'typeorm';
import { Product } from '@modules/products/entities/product.entity';
import { createReadStream, readdir } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('bill-supplier')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('bills (supplier)')
@ApiBearerAuth()
export class BillSupplierController {
  constructor(
    private readonly billSupplierService: BillSupplierService,
    private readonly billSupplierUpdateService: BillSupplierUpdateService,
    private readonly billPdfGeneratorService: BillPdfGeneratorService,
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
    await Promise.all(
      bills.map(async (bill: any) => {
        const orderProduct = await this.productOrderService.findOneByBillId(bill.id);
        if (orderProduct) {
          bill.orderId = orderProduct.order.id;
          bill.companyName = orderProduct.order.supplier.name;
        }
        return bill;
      })
    );

    return plainToClass(BillSupplierDTO, bills);
  }

  @Get(':id')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: BillSupplierDTO
  })
  async findOne(@Param('id') id: number): Promise<BillSupplierDTO> {
    const bill: any = await this.billSupplierService.findOneById(id);
    const orderProduct = await this.productOrderService.findOneByBillId(bill.id);
    bill.orderId = orderProduct.order.id;
    bill.companyName = orderProduct.order.supplier.name;
    return plainToClass(BillSupplierDTO, bill);
  }

  @Get(':id/pdf')
  @Header('content-type', 'application/pdf')
  @Roles(EUserRoles.ADMIN, EUserRoles.USER, EUserRoles.ACCOUNTING)
  @ApiResponse({
    status: 200,
    type: ArrayBuffer
  })
  @ApiProduces('application/pdf')
  async genPdf(@Param('id') id: number, @Res() response: Response): Promise<any> {

    let successFlag = false;

    readdir(join(rootPath, 'bills/suppliers'), function (err, files) {
      //handling error
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      for (const file of files) {
        if (file.startsWith(id.toString())) {
          response.contentType('application/pdf');
          response.setHeader('Content-Disposition', `attachment; filename="${file}"`);
          const pdfFile = createReadStream(join(rootPath, `bills/suppliers/${file}`));
          successFlag = true;
          pdfFile.pipe(response);
        }
      }
      if (!successFlag) {
        response.statusMessage = 'Bad Request';
        response.status(400).end();
      }
    });

  }

  @Post()
  @Roles(EUserRoles.ADMIN, EUserRoles.USER)
  @ApiQuery({ name: 'orderId', type: String, required: true })
  @ApiResponse({
    status: 201,
    type: SimpleBillSupplierDTO,
  })
  async create(@Query('orderId') orderId: string, @Body() dto: CreateBillSupplierDTO): Promise<SimpleBillSupplierDTO> {

    const billSupplierPdf: BillSupplierPdfDTO = new BillSupplierPdfDTO();
    billSupplierPdf.products = [];

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

    billSupplierPdf.orderId = baseOrder.id;
    billSupplierPdf.orderDate = baseOrder.createdAt;
    billSupplierPdf.supplierName = baseOrder.supplier.name;
    billSupplierPdf.vat = baseOrder.supplier.VAT;

    const queryRunner: QueryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      for (const receivedPO of dto.productOrders) {

        const initialQuantityReceived: number = receivedPO.quantityReceived;

        let existingPO: any = {};

        if (receivedPO.id) {
          existingPO = await this.productOrderService.findOneById(receivedPO.id);
          if (!existingPO) {
            throw new NotFoundException;
          }
        } else {
          // the user added a product that was not in the original order!
          existingPO.product = {};
          existingPO.product.id = receivedPO.prodId;
          existingPO.quantityOrdered = 0;
          delete receivedPO.id;
        }
        delete receivedPO.prodId;

        order = (existingPO.order) ? existingPO.order : baseOrder;
        const quantDiff = receivedPO.quantityReceived - existingPO.quantityOrdered;

        if (quantDiff === 0) {
          // product received in the desired quantity

          existingPO = this.billSupplierUpdateService.receiveProductOrderFromDto(existingPO, receivedPO, newBill);
          existingPO.updatedAt = new Date();
          await queryRunner.manager.update(ProductOrder, existingPO.id, existingPO);

        } else if (quantDiff < 0) {
          // product partially received, some are in BO

          // create and add new productOrder w/ the remaining quant
          await this.billSupplierUpdateService.createBOProdOrder(existingPO, quantDiff);

          // update the received productOrder
          existingPO = this.billSupplierUpdateService.receiveProductOrderFromDto(existingPO, receivedPO, newBill);
          await queryRunner.manager.update(ProductOrder, existingPO.id, existingPO);

        } else if (quantDiff > 0) {
          // product received in excess, probably from a BO existingPO of a previous order.

          // find all productOrders of the same product and from the same supplier with as status : BO
          let existingProdBOs: ProductOrder[] = await this.productOrderService.findAllBOByProdId_transactional(existingPO.product.id, queryRunner);
          existingProdBOs = existingProdBOs.filter(eP => eP.order.supplier.id === order.supplier.id);

          let remainingQuant: number = quantDiff;

          for (let bo of existingProdBOs) {
            if (bo.quantityOrdered === remainingQuant) {

              bo = await this.billSupplierUpdateService.updateBOProductOrder(bo, receivedPO, newBill, queryRunner, remainingQuant);

              remainingQuant = 0;
              break;

            } else if (bo.quantityOrdered > remainingQuant) {
              // still not enough -> create a new BO

              // create and add new productOrder w/ the remaining quant
              await this.billSupplierUpdateService.createBOProdOrder(bo, remainingQuant - bo.quantityOrdered);

              // update the current BO existingPO
              bo = await this.billSupplierUpdateService.updateBOProductOrder(bo, receivedPO, newBill, queryRunner, remainingQuant);

              remainingQuant = 0;
              break;

            } else if (bo.quantityOrdered < remainingQuant) {

              bo = await this.billSupplierUpdateService.updateBOProductOrder(bo, receivedPO, newBill, queryRunner);

              remainingQuant = remainingQuant - bo.quantityOrdered;

            }
          }

          if (!existingPO.id) {
            // the user added a product that was not in the original order.
            // check if the remaining quant is > 0 -> if yes we need to create and add the product to the current order!
            if (remainingQuant > 0) {
              const newProdOrder = new ProductOrder();
              newProdOrder.product = await this.productsService.findOneById_transactional(existingPO.product.id, queryRunner);
              newProdOrder.order = order;
              newProdOrder.quantityOrdered = 0;
              newProdOrder.status = EProductOrderStatus.RECEIVED;

              existingPO = await this.productOrderService.create(newProdOrder);

            } else {
              continue; //TODO check all casses -> testing ? 
            }
          }

          // update the received productOrder
          existingPO = this.billSupplierUpdateService.receiveProductOrderFromDto(existingPO, receivedPO, newBill);
          existingPO.quantityReceived = existingPO.quantityReceived - quantDiff + remainingQuant;
          existingPO.updatedAt = new Date();

          await queryRunner.manager.update(ProductOrder, existingPO.id, existingPO);

        }

        // update product quantity and price
        const product = await queryRunner.manager.findOne(Product, existingPO.product.id);
        product.purchasePriceHT = existingPO.pcPurchasePriceHTAtDate;
        if (product.purchasePriceHT >= product.salePriceHT) {
          product.salePriceHT = product.purchasePriceHT * 1.02; // set a min margin of 2%!
        }
        product.quantity = product.quantity + initialQuantityReceived;
        product.updatedAt = new Date();

        billSupplierPdf.products.push({
          reference: product.reference,
          label: product.label,
          quantity: initialQuantityReceived,
          price: product.purchasePriceHT
        });

        await queryRunner.manager.update(Product, product.id, product);

      }

      // update status of all products that weren't received:
      const notReceivedProds: ProductOrder[] = (await this.productOrderService.findAllByOrderId_transactional(order.id, queryRunner))
        .filter(prodOrder => prodOrder.status === EProductOrderStatus.ORDERED);
      await Promise.all(notReceivedProds.map(async prodOrder => {
        prodOrder.status = EProductOrderStatus.BO;
        prodOrder.updatedAt = new Date();

        await queryRunner.manager.update(ProductOrder, prodOrder.id, prodOrder);
      }));

      await this.billSupplierUpdateService.updateOrderStatus(order, queryRunner);

      billSupplierPdf.billId = newBill.id;
      billSupplierPdf.date = (new Date()).toISOString().split('T')[0];
      billSupplierPdf.invoiceNumber = dto.invoiceNumber;
      billSupplierPdf.debitedAmount = dto.debitedAmount;
      billSupplierPdf.shippingFees = dto.shippingFees;
      billSupplierPdf.note = dto.note;

      if (!await this.billPdfGeneratorService.generatePDF(billSupplierPdf)) {
        throw Error;
      }

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
