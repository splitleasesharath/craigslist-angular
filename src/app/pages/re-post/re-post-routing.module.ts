import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RePostComponent } from './re-post.component';

const routes: Routes = [
  { path: '', component: RePostComponent,
    children: [
      // { path: '', component: DetailScreenComponent }, 
    ],
   }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RePostRoutingModule { }
