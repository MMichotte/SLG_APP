import { Component, OnInit, ViewChild } from '@angular/core';
import { BillSupplierService } from '@features/billing/services/bill-supplier.service';

@Component({
  selector: 'app-bill-pdf',
  templateUrl: './bill-pdf.component.html',
  styleUrls: ['./bill-pdf.component.scss']
})
export class BillPdfComponent implements OnInit {

  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand: any;

  constructor(
    private readonly billSupplierService: BillSupplierService
  ) { }

  ngOnInit(): void {
  }

  generateBillSupplierPDF(billId: number): void {
    
    this.billSupplierService.downloadPdf(billId).subscribe(
      (res: any) => {
        const pdfTitle = res.headers.get('content-disposition').split('filename=').pop().replaceAll('"', '');
        const pdfContent = new Blob([res.body], { type: 'application/pdf' });

        this.pdfViewerOnDemand.downloadFileName = pdfTitle;
        this.pdfViewerOnDemand.pdfSrc = pdfContent;
        this.pdfViewerOnDemand.refresh();
    
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
