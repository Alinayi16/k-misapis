import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMiapiComponent } from './list-miapi/list-miapi.component';

const routes: Routes = [
  {path:'' , redirectTo: 'list',pathMatch:'full'},
  {path:'list' , component: ListMiapiComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiapiRoutingModule { }
