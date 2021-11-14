
export class billedProduct {
  reference: string;
  label: string;
  quantity: number;
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
  debitedAmount: number;
  shippingFees: number;
  note?: string; 

}