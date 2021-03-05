export class CreateProductDTO {
  reference: string;
  label: string;
  purchasePriceHT: number;
  salePriceHT: number;
  salePriceTTC: number;
  quantity: number;
  note?: string;
}
