import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, // Lazy load DashboardModule
      { path: 'item', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
      { path: 'order', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
      { path: 'report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
