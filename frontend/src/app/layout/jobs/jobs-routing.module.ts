import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { JobsFormComponent } from './jobs-form/jobs-form.component';
import { JobsService } from '../../core/services/jobs/jobs.service';
import { Observable } from 'rxjs';
import { Job } from '../../core/models/job.model';
import { JobsDetailComponent } from './jobs-detail/jobs-detail.component';

const jobResolver: ResolveFn<Observable<Job>> =
    (route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      jobsService: JobsService = inject(JobsService)) => {
      return jobsService.get(route.paramMap.get('id')) as Observable<Job>;
    };

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent
  },
  {
    path: 'form',
    component: JobsFormComponent,
  },
  {
    path: 'form/:id',
    component: JobsFormComponent,
    resolve: {job: jobResolver}
  },
  {
    path: 'detail/:id',
    component: JobsDetailComponent,
    resolve: {job: jobResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
