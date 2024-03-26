import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from '../services/firebase/firebase.service';


@Injectable({
  providedIn: 'root'
})
class CanActivateAuth {
  constructor (private firebaseService: FirebaseService) {}

  async canActivate(): Promise<boolean> {
    return await this.firebaseService.validateToken();
  }

}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(CanActivateAuth).canActivate();
};
