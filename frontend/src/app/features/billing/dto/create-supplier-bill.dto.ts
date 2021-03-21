export class CreateSupplierBillDTO {
  invoiceNumber?: string;
  shippingFees: number;
  debitedAmount: number;
  note?: string;
}
