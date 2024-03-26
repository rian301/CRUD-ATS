import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { CandidatesFormComponent } from './candidates-form/candidates-form.component';
import { SharedModule } from '../../shared/shared.module';
import { CandidatesListComponent } from './candidates-list/candidates-list.component';


@NgModule({
  declarations: [CandidatesListComponent],
  imports: [
    CommonModule,
    CandidatesRoutingModule,
    SharedModule
  ]
})
export class CandidatesModule { }
