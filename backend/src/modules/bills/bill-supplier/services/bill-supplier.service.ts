import { CreateBillSupplierDTO } from './../dto/create-bill-supplier.dto';
import { BillSupplier } from './../entities/bill-supplier.entity';
import { BillSupplierRepository } from './../repositories/bill-supplier.repository';
import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { ProductOrderService } from '@modules/orders/product-order/services/product-order.service';
import { BillSupplierDTO } from '../dto/bill-supplier.dto';

@Injectable()
export class BillSupplierService {

  entityManager = getManager();

  constructor(
    private readonly billRepository: BillSupplierRepository,
    private readonly productOrderService: ProductOrderService
  ) { }

  findAll(): Promise<BillSupplierDTO[]> {

    return this.entityManager.query(`
      SELECT b.*, b.invoice_number as "invoiceNumber", b.shipping_fees as "shippingFees", b.debited_amount as "debitedAmount",
      c.name as "companyName", o.id as "orderId"
      FROM product_order AS po
          JOIN bill_supplier AS b ON po.id_bill_supplier = b.id
          JOIN "order" AS o ON po.id_order = o.id
          JOIN company AS c ON o.id_company = c.id
    `);

  }

  findAllByCompany(id: number): Promise<BillSupplierDTO[]> {

    return this.entityManager.query(`
      SELECT b.*, b.invoice_number as "invoiceNumber", b.shipping_fees as "shippingFees", b.debited_amount as "debitedAmount",
      c.name as "companyName", o.id as "orderId"
      FROM product_order AS po
          JOIN bill_supplier AS b ON po.id_bill_supplier = b.id
          JOIN "order" AS o ON po.id_order = o.id
          JOIN company AS c ON o.id_company = c.id
      WHERE c.id = $1;
    `, [id]);

  }


  findOneById(id: number): Promise<BillSupplierDTO> {

    return this.entityManager.query(`
      SELECT b.*, b.invoice_number as "invoiceNumber", b.shipping_fees as "shippingFees", b.debited_amount as "debitedAmount",
      c.name as "companyName", o.id as "orderId"
      FROM product_order AS po
          JOIN bill_supplier AS b ON po.id_bill_supplier = b.id
          JOIN "order" AS o ON po.id_order = o.id
          JOIN company AS c ON o.id_company = c.id
      WHERE b.id = $1;
    `, [id]);

  }

  create(bill: CreateBillSupplierDTO): Promise<BillSupplier> {
    return this.billRepository.save(bill);
  }
}
