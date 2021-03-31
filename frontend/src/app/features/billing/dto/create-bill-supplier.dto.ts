import { UpdateProductOrderDTO } from '../../orders/dto/update-product-order.dto';

export class CreateBillSupplierDTO {
  invoiceNumber?: string;
  shippingFees?: number;
  debitedAmount: number;
  note?: string;
  productOrders: UpdateProductOrderDTO[];
}
