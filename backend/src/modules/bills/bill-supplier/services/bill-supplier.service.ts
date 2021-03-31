import { CreateBillSupplierDTO } from './../dto/create-bill-supplier.dto';
import { BillSupplier } from './../entities/bill-supplier.entity';
import { BillSupplierRepository } from './../repositories/bill-supplier.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BillSupplierService {
  constructor( 
    private readonly billRepository: BillSupplierRepository
  ) {}

  findAll(): Promise<BillSupplier[]> {
    return this.billRepository.find();
  }
  
  findOneById(id: number): Promise<BillSupplier> {
    return this.billRepository.findOne(id);
  }

  create(bill: CreateBillSupplierDTO): Promise<BillSupplier> {
    return this.billRepository.save(bill);
  }
}
