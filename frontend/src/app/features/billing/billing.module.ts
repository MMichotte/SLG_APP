import { BillSupplierService } from './services/bill-supplier.service';
import { BillingComponent } from './pages/billing.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';

@NgModule({
  declarations: [
    BillingComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule
  ],
  providers: [BillSupplierService]
})
export class BillingModule { }
