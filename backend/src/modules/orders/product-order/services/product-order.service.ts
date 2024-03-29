import { QueryRunner } from 'typeorm';
import { CreateProductOrderDTO } from './../dto/create-product-order.dto';
import { ProductOrderRepository } from './../repositories/product-order.repository';
import { Injectable } from '@nestjs/common';
import { ProductOrder } from '../entities/product-order.entity';
import { UpdateProductOrderSimpleDTO } from '../dto/update-product-order-simple.dto';
import { EProductOrderStatus } from '../enums/product-order-status.enum';

@Injectable()
export class ProductOrderService {

  constructor(
    private readonly productOrderRepository: ProductOrderRepository
  ) { }

  findAll(): Promise<ProductOrder[]> {
    return this.productOrderRepository.find({ 
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  findAllByOrderId(orderId: number): Promise<ProductOrder[]> {
    if (orderId === 0) orderId = null;
    return this.productOrderRepository.find({ 
      where: { order: orderId },
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  async findAllBillsByCompany(supplierId: number): Promise<number[]> {
    
    const productOrders = await this.productOrderRepository.find({ 
      where: { order: {supplier: supplierId} },
      relations: ['order', 'billSupplier', 'order.supplier']
    });

    const billIds: number[] = [];

    productOrders.forEach((pO: ProductOrder) => {
      if (pO.billSupplier && !billIds.includes(pO.billSupplier?.id)) {
        billIds.push(pO.billSupplier.id);
      }
    });

    return billIds;
  }

  findAllByOrderId_transactional(orderId: number, QR: QueryRunner): Promise<ProductOrder[]> {
    if (orderId === 0) orderId = null;
    return QR.manager.find(ProductOrder, { 
      where: { order: orderId },
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  findAllReceivedByProdId(prodId: number): Promise<ProductOrder[]> {
    return this.productOrderRepository.find({
      where: { product: prodId, status: EProductOrderStatus.RECEIVED },
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  findAllBOByProdId(prodId: number): Promise<ProductOrder[]> {
    return this.productOrderRepository.find({
      where: { product: prodId, status: EProductOrderStatus.BO },
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }
  
  findAllBOByProdId_transactional(prodId: number, QR: QueryRunner): Promise<ProductOrder[]> {
    return QR.manager.find(ProductOrder, {
      where: { product: prodId, status: EProductOrderStatus.BO },
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  findOneById(id: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne(id, {
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  findOneByProdId(prodId: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne({
      where: { product: prodId },
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  findOneByOrderIdAndProdId(orderId: number, prodId: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne({
      where: { order: orderId, product: prodId },
      relations: ['product', 'order', 'billSupplier', 'order.supplier']
    });
  }

  findOneByBillId(billId: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne({
      where: {billSupplier: billId},
      relations: ['order', 'order.supplier']
    });
  }

  create(productOrder: CreateProductOrderDTO): Promise<ProductOrder> {
    return this.productOrderRepository.save(productOrder);
  }

  update(id: number, productOrder: UpdateProductOrderSimpleDTO | ProductOrder): Promise<any> {
    return this.productOrderRepository.update(id, productOrder);
  }

  remove(id: number) {
    return this.productOrderRepository.delete(id);
  }
}
