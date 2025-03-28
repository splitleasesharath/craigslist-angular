// src/app/listing/listing-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListingComponent } from './listing.component';

const routes: Routes = [
  { path: '', component: ListingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingRoutingModule {}
