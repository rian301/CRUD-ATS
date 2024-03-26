import { Component, OnInit } from '@angular/core';
import { Observable, of, take, tap } from 'rxjs';
import { Job } from '../../../core/models/job.model';
import { JobsService } from '../../../core/services/jobs/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.scss'
})
export class JobsListComponent implements OnInit {

  items$: Observable<Job[]> = of([]);
  isMobile: boolean = false;

  constructor(
    private jobsService: JobsService,
    private router: Router
    ) {
  }
  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    this.items$ = this.jobsService.getJobs()
    .pipe(
      take(1),
      tap(data => { this.getJobObject(data) })
      );
  }

  private getJobObject(data: Job[]) {
     data.forEach(job => {
      job.descricao = `${job.descricao.slice(0, 50)}...`;
    });
  }

  openJob(id: string) {
    this.router.navigateByUrl(`/vagas/detail/${id}`);
  }

  goToForm() {
    this.router.navigateByUrl(`/vagas/form`);
  }

  goToEdit(id: string) {
    this.router.navigateByUrl(`/vagas/form/${id}`);
  }

  deleteJob(id: string) {
    this.jobsService.delete(id)
    .pipe(take(1))
    .subscribe(res => {
      this.getJobs();
    });
  }

  goToListCandidates(id: string) {
    this.router.navigateByUrl(`/candidato/${id}`);
  }

}
