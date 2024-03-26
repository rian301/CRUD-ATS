import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard.service';

export const routes: Routes = [
    {path: '',
    canActivate: [authGuard], 
     loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
    {path: 'login', 
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)}
];
