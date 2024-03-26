import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
  PoContainerModule,
  PoFieldModule,
  PoButtonModule,
  PoDividerModule,
  PoWidgetModule,
  PoModalModule,
  PoTableModule,} from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidatesFormComponent } from '../layout/candidates/candidates-form/candidates-form.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PoFieldModule,
    PoButtonModule,
    CommonModule
  ],
  declarations: [CandidatesFormComponent],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoContainerModule,
    PoFieldModule,
    PoButtonModule,
    PoDividerModule,
    PoModalModule,
    PoWidgetModule,
    CandidatesFormComponent,
    PoTableModule
  ]
})
export class SharedModule { }
