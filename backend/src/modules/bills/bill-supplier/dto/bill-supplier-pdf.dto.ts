
export class billedProduct {
  reference: string;
  label: string;
  quantity: number;
  invoicedPrice: number;
  price: number; 
}

export class BillSupplierPdfDTO {

  date: Date | string;
  billId: number;
  orderId: number;
  orderDate: Date | string;
  supplierName: string;
  vat?: string;
  invoiceNumber?: string;
  
  products: billedProduct[];
  invoicedAmount?: number;
  debitedAmount: number;
  shippingFees: number;
  note?: string; 

}