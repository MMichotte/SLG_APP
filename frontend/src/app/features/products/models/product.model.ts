export class Product {
  id: number;
  reference: string;
  label: string;
  purchasePriceHT: number;
  salePriceHT: number;
  salePriceTTC: number;
  margin?: number 
  quantity: number;
  reservedQuantity?: number;
  availableQuantity?: number;
  note: string;
}
