export class CreateProductDTO {
  reference: string;
  label: string;
  purchasePriceHT: number;
  salePriceHT: number;
  note?: string;
}
