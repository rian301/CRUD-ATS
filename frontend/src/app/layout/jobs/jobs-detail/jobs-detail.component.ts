import { Component, OnInit } from '@angular/core';
import { Job } from '../../../core/models/job.model';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-jobs-detail',
  templateUrl: './jobs-detail.component.html',
  styleUrls: ['./jobs-detail.component.scss']
})
export class JobsDetailComponent implements OnInit {

  job!: Job;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.pipe(take(1))
    .subscribe((res: any) => {
      this.getArrayRequirements(res?.job)
      this.job = res?.job;
    });
  }

  private getArrayRequirements(job: Job) {
    job.requisitosArray = job.requisitos.split(',');
  }
}
