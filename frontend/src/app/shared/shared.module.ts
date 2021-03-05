import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';

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
    RouterModule,
    ProgressSpinnerModule
  ],
  exports: [
    SpinnerComponent,
    NavbarComponent,
    SidenavComponent
  ]
})
export class SharedModule { }
