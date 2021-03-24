import { UpdateOrderDTO } from './../dto/update-order.dto';
import { CreateOrderDTO } from './../dto/create-order.dto';
import { OrderRepository } from './../repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { EOrderStatus } from '../enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor( 
    private readonly orderRepository: OrderRepository
  ) {}

  findAll(status?: EOrderStatus): Promise<Order[]> {
    if (status) return this.orderRepository.find({where: {status}, relations: ['supplier']});
    return this.orderRepository.find({relations: ['supplier']});
  }
  
  findAllBySupplierId(supplierId: number): Promise<Order[]> {
    return this.orderRepository.find({where: {supplier: supplierId}, relations: ['supplier']});
  }
  
  findOneById(id: number): Promise<Order> {
    return this.orderRepository.findOne(id, {relations: ['supplier']});
  }

  create(order: CreateOrderDTO): Promise<Order> {
    return this.orderRepository.save(order);
  }
  
  update(id: number, order: UpdateOrderDTO): Promise<any> {
    return this.orderRepository.update(id, order);
  }

  remove(id: number) {
    return this.orderRepository.delete(id);
  }

}
