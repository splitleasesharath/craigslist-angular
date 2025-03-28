import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing.component';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import { MaterialModule } from 'src/shared/material/material.module';


@NgModule({
  declarations: [
    ListingComponent
  ],
  imports: [
    CommonModule,
    ListingRoutingModule,
    NgxDatatableModule,
    MaterialModule
  ]
})
export class ListingModule { }
