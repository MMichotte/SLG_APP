import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  expandSideNav = false;
  keepExpanded = false;
  
  constructor (public auth: AuthService, private router: Router) {}

  ngOnInit (): void {
  }

  onLogout () {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
