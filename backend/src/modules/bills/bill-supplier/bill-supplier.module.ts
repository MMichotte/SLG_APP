import { Module } from '@nestjs/common';
import { BillSupplierService } from './services/bill-supplier.service';
import { BillSupplierController } from './controllers/bill-supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillSupplier } from './entities/bill-supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillSupplier])
  ],
  controllers: [BillSupplierController],
  providers: [BillSupplierService]
})
export class BillSupplierModule {}
