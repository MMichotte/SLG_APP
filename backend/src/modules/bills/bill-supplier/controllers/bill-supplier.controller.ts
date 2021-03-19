import { Controller } from '@nestjs/common';
import { BillSupplierService } from '../services/bill-supplier.service';

@Controller('bill-supplier')
export class BillSupplierController {
  constructor(private readonly billSupplierService: BillSupplierService) {}
}
