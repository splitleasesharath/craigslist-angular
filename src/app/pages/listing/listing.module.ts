import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing.component';
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
  ],
  schemas: []
})
export class ListingModule { }
