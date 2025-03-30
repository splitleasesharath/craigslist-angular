import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListingRoutingModule } from './listing-routing.module';
import { ListingComponent } from './listing.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListingViewComponent } from './listing-view/listing-view.component';


@NgModule({
  declarations: [
    ListingComponent,
    ListingViewComponent
  ],
  imports: [
    CommonModule,
    ListingRoutingModule,
    NgxDatatableModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: []
})
export class ListingModule { }
