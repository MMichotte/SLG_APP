import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BillSupplierDTO } from '@features/billing/dto/bill-supplier-dto';
import { BillSupplierService } from '@features/billing/services/bill-supplier.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-bill-supplier',
  templateUrl: './bill-supplier.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './bill-supplier.component.scss']
})
export class BillSupplierComponent implements OnInit {

  cols: any[];
  bills: any[] = [];
  selectedBill: any;
  loadingData: boolean;

  @ViewChild('dt') dt: Table;
  @ViewChild('pdfGenerator') pdfGenerator: any;

  constructor(
    public readonly billSupplierService: BillSupplierService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.refreshBills();
    this.cols = [
      { field: 'id', header: '#', width: '6rem' },
      { field: 'companyName', header: 'Order' },
      { field: 'invoiceNumber', header: 'Invoice n°' },
      { field: 'createdAt', header: 'Date', width: '10rem' },
      { field: 'debitedAmount', header: 'Amount', width: '10rem' },
      { field: 'shippingFees', header: 'Shipping', width: '10rem' },
      { field: 'note', header: 'Note' }
    ];
  }

  refreshBills(): void {
    this.loadingData = true;
    this.billSupplierService.getAll().subscribe(
      (bills: BillSupplierDTO[]) => {
        bills.map((bill: BillSupplierDTO) => {
          bill.createdAt = bill.createdAt.split('T')[0];
          bill.debitedAmount = +(+bill.debitedAmount).toFixed(2);
          bill.shippingFees = +(+bill.shippingFees).toFixed(2);
          return bill;
        });
        this.bills = bills;
        this.selectedBill = null;
        this.cd.detectChanges();
        this.loadingData = false;
      }
    );
  }

  showOrder(bill: BillSupplierDTO): void {
    this.router.navigate([`/orders/${bill.orderId}/detail`]);
  }

  showPDF(rowData): void {
    this.pdfGenerator.generateBillSupplierPDF(rowData.id);
  }

}
