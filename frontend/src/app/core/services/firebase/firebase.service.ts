import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseUser } from '../../models/firebase-user.model';
import { localStorageKeys } from '../../enums/localstorage.enum';
import { GoogleAuthProvider } from "firebase/auth";
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UltilsService } from '../ultis/ultils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

constructor(
  private afAuth: AngularFireAuth,
  private router: Router,
  private ultilsService: UltilsService
  ) { }

  createUserWithEmailAndPassword(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      this.getCredentialsAndSetToken(userCredential);
    })
    .catch((error) => {
      this.ultilsService.errorMessage('Não foi possível criar o usuário');
    });
  }

  private setToken(user: FirebaseUser) {
    localStorage.setItem(localStorageKeys['user'], JSON.stringify(user));
    this.goToHome();
  }

  loginWithCredentials(email: string, password: string) {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          this.getCredentialsAndSetToken(userCredential);
        })
        .catch((error) => {
          this.ultilsService.errorMessage('Não foi possível realizar o login do usuário.');
        });
  }

  loginWithGoogle() {
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
      .then((userCredential) => {
        this.getCredentialsAndSetToken(userCredential);
      })
      .catch((error) => {
        this.ultilsService.errorMessage('Não foi possível realizar o login do usuário.');
      });
  }

  private getCredentialsAndSetToken(userCredential: any) {
    const firebaseUser = userCredential.user?.multiFactor?.user;
      const user = {
        accessToken: firebaseUser?.accessToken,
        email: firebaseUser?.email
      }
      this.setToken(user);
  }

  private goToHome() {
    this.router.navigate(['']);
  }

  async validateToken(): Promise<boolean> {
    const token = await firstValueFrom(this.afAuth.idToken)
    if (token) return true;
    
    this.router.navigate(['/login']);
    return false;
  }

  removeToken() {
    localStorage.removeItem(localStorageKeys['user']);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.removeToken();
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.ultilsService.errorMessage('Erro ao tentar realizar logout');
    });
  }

}
