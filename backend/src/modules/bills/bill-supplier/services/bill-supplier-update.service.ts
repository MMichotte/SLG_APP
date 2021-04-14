import { QueryRunner } from 'typeorm';
import { Order } from '@modules/orders/orders/entities/order.entity';
import { EOrderStatus } from '@modules/orders/orders/enums/order-status.enum';
import { OrdersService } from '@modules/orders/orders/services/orders.service';
import { CreateProductOrderDTO } from '@modules/orders/product-order/dto/create-product-order.dto';
import { UpdateProductOrderProcessDTO } from '@modules/orders/product-order/dto/update-product-order-process.dto';
import { ProductOrder } from '@modules/orders/product-order/entities/product-order.entity';
import { EProductOrderStatus } from '@modules/orders/product-order/enums/product-order-status.enum';
import { ProductOrderService } from '@modules/orders/product-order/services/product-order.service';
import { Injectable } from '@nestjs/common';
import { BillSupplier } from '../entities/bill-supplier.entity';

@Injectable()
export class BillSupplierUpdateService {

  constructor(
    private readonly productOrderService: ProductOrderService,
    private readonly ordersService: OrdersService
  ) { }

  async createBOProdOrder(originalProd: ProductOrder, qtty: number): Promise<void> {
    const prodBO: CreateProductOrderDTO = new CreateProductOrderDTO();
    delete prodBO.productId; delete prodBO.orderId;
    prodBO.product = originalProd.product;
    prodBO.order = originalProd.order;
    prodBO.note = originalProd.note;
    prodBO.quantityOrdered = Math.abs(qtty);
    prodBO.status = EProductOrderStatus.BO;

    await this.productOrderService.create(prodBO);
  }

  async updateBOProductOrder(
    boProduct: ProductOrder,
    productOrder: UpdateProductOrderProcessDTO,
    newBill: BillSupplier, QR: QueryRunner,
    quantityReceived?: number
  ): Promise<ProductOrder> {

    const boId = boProduct.id;
    boProduct = this.receiveProductOrderFromDto(boProduct, productOrder, newBill);
    boProduct.quantityReceived = (quantityReceived) ? quantityReceived : boProduct.quantityOrdered;
    boProduct.id = boId;
    boProduct.updatedAt = new Date();

    await QR.manager.update(ProductOrder, boProduct.id, boProduct);
    await this.updateOrderStatus(boProduct.order, QR);

    return boProduct;

  }

  async updateOrderStatus(order: Order, QR: QueryRunner): Promise<void> {
    // Update the order status accordingly (either PD or CLOSED)
    const prodsLeft: ProductOrder[] = (await this.productOrderService.findAllByOrderId_transactional(order.id, QR))
      .filter(pO => pO.status !== EProductOrderStatus.RECEIVED);

    if (prodsLeft.length) order.status = EOrderStatus.PD;
    else order.status = EOrderStatus.CLOSED;

    order.updatedAt = new Date();

    await this.ordersService.update(order.id, order);
  }

  receiveProductOrderFromDto(existingProd: ProductOrder, dto: UpdateProductOrderProcessDTO, bill: BillSupplier): ProductOrder {
    for (const [key, value] of Object.entries(dto)) {
      existingProd[key] = value;
    }
    existingProd.billSupplier = bill;
    existingProd.status = EProductOrderStatus.RECEIVED;

    return existingProd;
  }

}
