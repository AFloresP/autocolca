import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FestivitiesRoutingModule } from './festivities-routing.module';
import { FestivitiesComponent } from './festivities.component';
import { PageHeaderModule } from './../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [FestivitiesComponent],
  imports: [
    CommonModule,
    FestivitiesRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FestivitiesModule { }
