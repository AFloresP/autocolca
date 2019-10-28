import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FestivitiesComponent } from './festivities.component';

const routes: Routes = [
  {
    path: '',
    component: FestivitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FestivitiesRoutingModule { }
