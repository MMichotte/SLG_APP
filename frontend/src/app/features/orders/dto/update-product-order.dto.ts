
export class UpdateProductOrderDTO {
  id: number;
  note?: string;
  quantityReceived: number;
  pcInvoicePrice: number;
  pcPurchasePriceHTAtDate: number;
  billSupplierId?: number;
}
