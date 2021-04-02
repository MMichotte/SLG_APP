
export class UpdateProductOrderDTO {
  id?: number;
  prodId?: number;
  note?: string;
  quantityReceived: number;
  pcInvoicePrice: number;
  pcPurchasePriceHTAtDate: number;
  billSupplierId?: number;
}
