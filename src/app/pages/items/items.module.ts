import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsListComponent } from './items-list/items-list.component';
import { NgxDatatableModule } from '@tusharghoshbd/ngx-datatable';
import { AppService } from './items-list/app.service';
import { DetailScreenComponent } from './detail-screen/detail-screen.component';
import { MaterialModule } from 'src/shared/material/material.module';



@NgModule({
  declarations: [
    ItemsComponent,
    ItemsListComponent,
    DetailScreenComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    NgxDatatableModule,
    MaterialModule
  ],
  providers: [AppService]
})
export class ItemsModule { }
