import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { FirebaseService } from '../../core/services/firebase/firebase.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
    ) {}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Vagas', action: this.goTo.bind(this, '/vagas') },
    { label: 'Candidato', action: this.goTo.bind(this, '/candidato/form') },
    { label: 'Sair', action: this.logout.bind(this) },
  ];

  private goTo(route: string) {
    this.router.navigateByUrl(route);
  }

  private logout() {
    this.firebaseService.logout();
  }
}
