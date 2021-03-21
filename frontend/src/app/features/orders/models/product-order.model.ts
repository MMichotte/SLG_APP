import { EProductOrderStatus } from '../enums/product-order-status.enum';
import { Product } from '../../products/models/product.model';

export class ProductOrder {
  id: number;
  orderId: number;
  product: Product;
  productDisplayName?: string;
  note?: string;
  quantityOrdered: number;
  quantityReceived?: number;
  pcInvoicePrice?: number;
  pcPurchasePriceHTAtDate?: number;
  status: EProductOrderStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}
