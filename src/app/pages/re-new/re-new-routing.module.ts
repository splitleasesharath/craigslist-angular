import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReNewComponent } from './re-new.component';

const routes: Routes = [
  { path: '', component: ReNewComponent,
    children: [
      // { path: '', component: DetailScreenComponent }, 
    ],
   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReNewRoutingModule { }
