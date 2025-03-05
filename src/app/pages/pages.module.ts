import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MaterialModule } from 'src/shared/material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { SampleDialogComponent } from './sample-dialog/sample-dialog.component';
import { GeneralComponent } from './profile/general/general.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './profile/contact/contact.component';
import { NgxMaskModule } from 'ngx-mask';
import { BioComponent } from './profile/bio/bio.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    PagesComponent,
    MainLayoutComponent,
    ProfileComponent,
    SampleDialogComponent,
    GeneralComponent,
    ContactComponent,
    BioComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    NgxMaskModule.forRoot(),
  ]
})
export class PagesModule { }
