import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BillSupplierDTO } from '@features/billing/dto/bill-supplier-dto';
import { BillSupplierService } from '@features/billing/services/bill-supplier.service';
import { ECompanyDisplayType } from '@features/companies/enums/company-type.enum';
import { Company } from '@features/companies/models/company.model';
import { CompaniesService } from '@features/companies/services/companies.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['../../../../shared/styles/style.scss', './supplier-detail.component.scss']
})
export class SupplierDetailComponent implements OnInit {

  public ECompanyDisplayType = ECompanyDisplayType;
  
  supplier: Company;
  cols: any[];
  bills: any[] = [];
  selectedBill: any;
  loadingData: boolean;
  
  @ViewChild('pdfGenerator') pdfGenerator: any;

  constructor(
    public readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private readonly companiesService: CompaniesService,
    public readonly billSupplierService: BillSupplierService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const supplId = this.route.snapshot.params.id;
      this.supplier = await this.companiesService.getOne(supplId).toPromise();
      this.refreshBills();
    } catch (e) {
      console.log(e);
      this.router.navigate(['clients']);
    }

    this.cols = [
      { field: 'id', header: '#', width: '6rem' },
      { field: 'orderId', header: 'Order' },
      { field: 'invoiceNumber', header: 'Invoice n°' },
      { field: 'createdAt', header: 'Date', width: '10rem' },
      { field: 'debitedAmount', header: 'Amount', width: '10rem' },
      { field: 'shippingFees', header: 'Shipping', width: '10rem' },
      { field: 'note', header: 'Note' }
    ];
  }

  refreshBills(): void {
    this.loadingData = true;
    this.billSupplierService.getAllBySupplierID(this.supplier.id).subscribe(
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
