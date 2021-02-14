import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    NavbarComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatSidenavModule
  ],
  exports: [
    SpinnerComponent,
    NavbarComponent,
    SidenavComponent
  ]
})
export class SharedModule { }
