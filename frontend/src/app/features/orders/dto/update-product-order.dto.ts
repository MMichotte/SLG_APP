import { EProductOrderStatus } from '../enums/product-order-status.enum';
import { CreateProductOrderDTO } from './create-product-order.dto';

export class UpdateProductOrderDTO extends CreateProductOrderDTO {
  quantityReceived?: number;
  purchasePriceHTAtDate?: number;
  pcInvoicePrice?: number;
  pcPurchasePriceHTAtDate?: number;
  status: EProductOrderStatus;
  billSupplierId?: number;
}
