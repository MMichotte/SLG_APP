import { EStockUpdateType } from './../enums/stock-update-type.enum';

export class CreateStockUpdateDTO {
  type: EStockUpdateType;
  quantity: number;
  note?: string;
}
