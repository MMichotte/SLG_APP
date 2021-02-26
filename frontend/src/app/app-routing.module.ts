
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
/*
import { BillingComponent } from './features/billing/billing.component';
import { CarsComponent } from './features/cars/cars.component';
import { ClientsComponent } from './features/clients/clients.component';
import { LoginComponent } from './features/login/login.component';
import { OrdersComponent } from './features/orders/orders.component';
import { ProductsComponent } from './features/products/products.component';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { WorkforcesComponent } from './features/workforces/workforces.component';
import { WorksheetsComponent } from './features/worksheets/worksheets.component';
*/

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/products'
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
      },
      { 
        path: 'products',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
      },
      { 
        path: 'workforce',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/workforces/workforces.module').then(m => m.WorkforcesModule)
      },
      { 
        path: 'clients',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/clients/clients.module').then(m => m.ClientsModule)
      },
      { 
        path: 'cars',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/cars/cars.module').then(m => m.CarsModule)
      },
      { 
        path: 'worksheets',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/worksheets/worksheets.module').then(m => m.WorksheetsModule)
      },
      { 
        path: 'billing',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/billing/billing.module').then(m => m.BillingModule)
      },
      { 
        path: 'suppliers',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/suppliers/suppliers.module').then(m => m.SuppliersModule)
      },
      { 
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule)
      },
      { 
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
