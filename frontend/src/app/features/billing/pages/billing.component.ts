import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { BillSupplierComponent } from '../components/bill-supplier/bill-supplier.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['../../../shared/styles/style.scss', './billing.component.scss']
})
export class BillingComponent implements OnInit {

  @ViewChild('table') table: BillSupplierComponent;

  billTypes = [
    { name: 'Customer', code: true },
    { name: 'Supplier', code: false }
  ];

  isCustomer: boolean = true;

  constructor(
    public readonly auth: AuthService,
    public readonly dialogService: DialogService,
    public readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) { }

  ngOnInit(): void {

  }

}
