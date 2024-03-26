import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../core/services/firebase/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  onCreateAccount: boolean = false;

  constructor(
      private fb: FormBuilder,
      private firebaseService: FirebaseService
    ) {
      this.form = this.fb.group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]]
      });
    }

    enableCreateAccount() {
      this.onCreateAccount = !this.onCreateAccount;
      this.form.reset();
      console.log(this.onCreateAccount)
    }

  login() {
    const form = this.form.getRawValue();
    if (this.onCreateAccount) {
      this.createAccount(form);
      return;
    }
    this.firebaseService.loginWithCredentials(form.email, form.password);
  }
  
  createAccount(form: {email: string, password: string}) {
    this.firebaseService.createUserWithEmailAndPassword(form.email, form.password);
  }

  loginWithGoogle() {
    this.firebaseService.loginWithGoogle()
  }
}
