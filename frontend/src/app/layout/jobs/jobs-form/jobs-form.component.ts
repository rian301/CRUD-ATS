import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from '../../../core/models/job.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../../../core/services/jobs/jobs.service';
import { take } from 'rxjs';
import { UltilsService } from '../../../core/services/ultis/ultils.service';

@Component({
  selector: 'app-jobs-form',
  templateUrl: './jobs-form.component.html',
  styleUrl: './jobs-form.component.scss'
})
export class JobsFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private jobsService: JobsService,
    private ultilsService: UltilsService
    ) {
      this.form = this.fb.group({
        id: [null],
        nome: [null, [Validators.required]],
        descricao: [null, [Validators.required]],
        requisitos: [null, [Validators.required]],
        empresa: [null, [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.route.data
    .subscribe((res: any) => {
      console.log(res)
      if (res?.job) this.form.patchValue(res?.job);
    });
  }


  save() {
    if (this.form.valid) {
      const form = this.form.getRawValue();

      if (!form.id) delete form.id;

      const observableSave = form.id
      ? this.jobsService.update(form)
      : this.jobsService.create(form);

      observableSave.pipe(take(1)).subscribe({
        next: (res) => {
          this.form.patchValue(res);
          this.ultilsService.successMessage('Dados salvos com sucesso!');
          this.goToList();
        },
        error: () => {
          this.ultilsService.errorMessage('Erro ao salvar dados.');
        }
      });

    } else {
      this.form.markAllAsTouched();
    }
  }

  goToList() {
    this.router.navigate(['/vagas']);
  }

}
