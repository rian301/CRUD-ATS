import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from '../../../core/services/jobs/jobs.service';
import { take } from 'rxjs';
import { PoSelectOption } from '@po-ui/ng-components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidatesService } from '../../../core/services/candidates/candidates.service';
import { localStorageKeys } from '../../../core/enums/localstorage.enum';
import { Job } from '../../../core/models/job.model';
import { UltilsService } from '../../../core/services/ultis/ultils.service';

@Component({
  selector: 'app-candidates-form',
  templateUrl: './candidates-form.component.html',
  styleUrl: './candidates-form.component.scss',

})
export class CandidatesFormComponent implements OnInit {
  options: PoSelectOption[] = [];
  @Input() isModal: boolean = false;
  @Input() job!: Job;
  @Output() saveEmit = new EventEmitter();
  form: FormGroup;

  constructor(
    private router: Router,
    private jobsService: JobsService,
    private fb: FormBuilder,
    private candidatesService: CandidatesService,
    private ultilsService: UltilsService
    ) {
      this.form = this.fb.group({
        id: [null],
        nome: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        cargo: [null, [Validators.required]]
      });
    }

  ngOnInit(): void {
    if (!this.isModal) this.getJobs();
    else this.setJob();
    this.getUserData();
  }

  private setJob() {
    this.form.get('cargo')?.patchValue({
      label: this.job.nome,
      value: this.job.id
    });
  }

  save() {
    if (this.form.valid) {
      const form = this.form.getRawValue();
      if (!form.id) delete form.id;
      if (form.cargo?.label) form.cargo = form.cargo.value;
      const observableSave = form?.id
        ? this.candidatesService.create(form)
        : this.candidatesService.create(form);

        observableSave.pipe(take(1)).subscribe({
          next: (res) => {
            this.form.patchValue(res);
            this.ultilsService.successMessage('Dados salvos com sucesso!');
            this.saveEmit.emit();
          },
          error: () => {
            this.ultilsService.errorMessage('Erro ao salvar dados.');
          }
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.router.navigateByUrl("");
  }

  private getJobs() {
    this.jobsService.getJobs()
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        const opt: PoSelectOption[] = [];
        res.forEach(job => {
          opt.push({
            value: job.id,
            label: job.nome
          });
        });
        this.options = opt;
      }
    });
  }

  private getUserData() {
    const email = JSON.parse(localStorage.getItem(localStorageKeys['user'])!);
    this.candidatesService.getCandidateByEmail(email?.email!)
    .pipe(take(1))
    .subscribe(res => {
      if (res) {
        this.form.patchValue(res);
      } else {
        this.form.get("email")?.patchValue(email?.email);
      }
      this.form.get("email")?.disable()
    });
  }
}
