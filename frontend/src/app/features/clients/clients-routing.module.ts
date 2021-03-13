import { ClientDetailComponent } from './pages/client-detail/client-detail.component';
import { ClientsComponent } from './pages/clients-list/clients.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent
  },
  {
    path: ':id/detail',
    component: ClientDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
