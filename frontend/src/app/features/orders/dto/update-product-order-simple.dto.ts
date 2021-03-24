import { EProductOrderStatus } from '../enums/product-order-status.enum';

export class UpdateProductOrderSimpleDTO {
  orderId?: number;
  note?: string;
  quantityOrdered: number;
  status: EProductOrderStatus;
}
