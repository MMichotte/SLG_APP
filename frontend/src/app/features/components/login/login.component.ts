import { AuthService } from './../../../core/services/auth.service'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    constructor (private auth: AuthService, private router: Router) { }

    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    })

    displayError = false

    ngOnInit (): void {
    }

    onSubmit () {
        this.auth.loginUser(this.loginForm.value).subscribe(
            (res: any) => {
                localStorage.setItem('token', res.body.token)
                this.router.navigate(['/'])
            },
            error => {
                this.displayError = true
                console.log(error.message)
            }
        )
    }

    hideError () {
        this.displayError = false
    }
}
