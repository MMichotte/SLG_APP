import { CreateBillSupplierDTO } from './../dto/create-bill-supplier.dto';
import { BillSupplier } from './../entities/bill-supplier.entity';
import { BillSupplierRepository } from './../repositories/bill-supplier.repository';
import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { ProductOrderService } from '@modules/orders/product-order/services/product-order.service';

@Injectable()
export class BillSupplierService {
  constructor( 
    private readonly billRepository: BillSupplierRepository,
    private readonly productOrderService: ProductOrderService
  ) {}

  findAll(): Promise<BillSupplier[]> {
    return this.billRepository.find();
  }

  async findAllByCompany(id: number): Promise<BillSupplier[]> {

    const ids = await this.productOrderService.findAllBillsByCompany(id);

    return this.billRepository.find({
      where: {
        id: In(ids)
      }
    });
  }
  
  findOneById(id: number): Promise<BillSupplier> {
    return this.billRepository.findOne(id);
  }

  create(bill: CreateBillSupplierDTO): Promise<BillSupplier> {
    return this.billRepository.save(bill);
  }
}
