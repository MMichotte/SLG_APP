import { UpdateProductOrderDTO } from './../dto/update-product-order.dto';
import { CreateProductOrderDTO } from './../dto/create-product-order.dto';
import { ProductOrderRepository } from './../repositories/product-order.repository';
import { Injectable } from '@nestjs/common';
import { ProductOrder } from '../entities/product-order.entity';

@Injectable()
export class ProductOrderService {

  constructor( 
    private readonly productOrderRepository: ProductOrderRepository
  ) {}

  findAllByOrderId(orderId: number): Promise<ProductOrder[]> {
    return this.productOrderRepository.find({where: {order: orderId}, relations: ['product', 'order']});
  }

  findOneById(id: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne(id,{relations: ['product', 'order']});
  }
  
  findOneByProdId(prodId: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne({where: {product: prodId}, relations: ['product', 'order']});
  }
  
  findOneByOrderIdAndProdId(orderId:number, prodId: number): Promise<ProductOrder> {
    return this.productOrderRepository.findOne({where: {order: orderId, product: prodId}, relations: ['product', 'order']});
  }

  create(productOrder: CreateProductOrderDTO): Promise<ProductOrder> {
    return this.productOrderRepository.save(productOrder);
  }
  
  update(id: number, productOrder: UpdateProductOrderDTO): Promise<any> {
    return this.productOrderRepository.update(id, productOrder);
  }
  
  remove(id: number) {
    return this.productOrderRepository.delete(id);
  }
}
