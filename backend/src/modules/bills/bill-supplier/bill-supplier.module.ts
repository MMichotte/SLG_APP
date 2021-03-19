import { Module } from '@nestjs/common';
import { BillSupplierService } from './services/bill-supplier.service';
import { BillSupplierController } from './controllers/bill-supplier.controller';

@Module({
  controllers: [BillSupplierController],
  providers: [BillSupplierService]
})
export class BillSupplierModule {}
