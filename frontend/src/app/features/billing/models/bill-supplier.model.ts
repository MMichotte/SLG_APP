export class BillSupplier {
  id: number;
  invoiceNumber?: string;
  shippingFees?: number;
  debitedAmount: number;
  note?: string;
  createdAt: Date | string;
}
