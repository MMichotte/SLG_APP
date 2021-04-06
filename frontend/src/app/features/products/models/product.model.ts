export class Product {
  id: number;
  reference: string;
  label: string;
  purchasePriceHT: number;
  salePriceHT: number;
  salePriceTTC?: number;
  margin?: number; 
  marginPc?: number;
  quantity: number;
  reservedQuantity?: number;
  availableQuantity?: number;
  note: string;

  constructor (product: Product) {
    for (const [key, value] of Object.entries(product)) {
      this[key] = value;
    }
  }

  equals(other: Product): boolean {
    for (const [key, value] of Object.entries(this)) {
      if (other[key] !== value) return false;
    }
    return true;
  };
}
