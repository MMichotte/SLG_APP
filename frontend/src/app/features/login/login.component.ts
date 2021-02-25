import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private auth: AuthService, private router: Router) { }

    loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })

    displayError: boolean = false

    ngOnInit (): void {
    }

    onSubmit (): void {
      this.auth.loginUser(this.loginForm.value).subscribe(
        (res: any) => {
          this.auth.setLogin(res.token);
          this.router.navigate(['/']);
        },
        error => {
          this.displayError = true;
          console.log(error);
        }
      );
    }

    hideError (): void {
      this.displayError = false;
    }
}
