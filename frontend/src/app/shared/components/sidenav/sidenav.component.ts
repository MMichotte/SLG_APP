import { Component, OnInit, Output, ViewEncapsulation, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit, OnDestroy {

  @Output() isExpanded = new EventEmitter<boolean>();

  expandSideNav = false;
  keepExpanded = false;
  
  constructor (public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  setKeepExpanded():void {
    this.keepExpanded = !this.keepExpanded;
    this.notifyParent();
  }
  
  setExpanded():void {
    this.expandSideNav = !this.expandSideNav;
    this.notifyParent();
  }

  notifyParent():void {
    this.isExpanded.emit((this.expandSideNav || this.keepExpanded));
  }

  ngOnDestroy(): void {
    this.isExpanded.emit(false);
  }
}
