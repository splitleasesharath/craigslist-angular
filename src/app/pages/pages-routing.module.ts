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
      { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule) },
      { path: 'repost', loadChildren: () => import('./re-post/re-post.module').then(m => m.RePostModule) },
      { path: 'renew', loadChildren: () => import('./re-new/re-new.module').then(m => m.ReNewModule) },
      { path: 'item', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
      { path: 'report', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'listing', loadChildren: () => import('./listing/listing.module').then(m => m.ListingModule) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
