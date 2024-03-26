import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { SharedModule } from '../../shared/shared.module';
import { JobsFormComponent } from './jobs-form/jobs-form.component';
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';


@NgModule({
  declarations: [
    JobsListComponent,
    JobsFormComponent,
    JobsDetailComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedModule
  ]
})
export class JobsModule { }
