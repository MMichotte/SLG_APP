import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('navBurger') navBurger!: ElementRef;
  @ViewChild('navMenu') navMenu!: ElementRef;

  constructor (public auth: AuthService, private router: Router) {}

  toggleNavbar () {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }

  onLogout () {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
