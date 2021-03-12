import { EStockUpdateType } from '../enums/stock-update-type.enum';

export class ProductTransaction {
  id: number;
  productId: number;
  billId?: number; 
  type?: EStockUpdateType;
  quantity: number;
  price?: number;
  note?: string;
  updatedAt: Date;
}
