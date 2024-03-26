import { Component, OnInit } from '@angular/core';
import { Candidate } from '../../../core/models/candidate.model';
import { PoTableColumn } from '@po-ui/ng-components';
import { CandidatesService } from '../../../core/services/candidates/candidates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { UltilsService } from '../../../core/services/ultis/ultils.service';

@Component({
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {

  items: Candidate[] = [];
  columns: PoTableColumn[] = [];

  constructor(
    private candidateService: CandidatesService,
    private router: ActivatedRoute,
    private utilsService: UltilsService
  ) { }

  ngOnInit() {
    this.getColumns();
    this.getData();
  }

  private getColumns() {
    this.columns = [
      {
        label: 'Nome',
        property: 'nome'
      },
      {
        label: 'E-mail',
        property: 'email'
      },
      {
        label: 'Ações',
        property: 'id',
        type: 'columnTemplate'
      },
    ];
  }

  deleteCandidate(id: string) {
    this.candidateService.delete(id)
    .pipe(take(1))
    .subscribe(() => {
      this.utilsService.successMessage('Deletado com sucesso!');
      this.getData();
    });
  }

  private getData() {
    const id = this.router.snapshot.paramMap.get('id');
    this.candidateService.getByJob(id!)
    .pipe(take(1))
    .subscribe(res => this.items = res);
  }

}
