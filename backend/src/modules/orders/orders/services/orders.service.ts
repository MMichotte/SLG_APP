import { UpdateOrderDTO } from './../dto/update-order.dto';
import { CreateOrderDTO } from './../dto/create-order.dto';
import { OrderRepository } from './../repositories/order.repository';
import { Injectable } from '@nestjs/common';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor( 
    private readonly orderRepository: OrderRepository
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({relations: ['supplier']});
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
