import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { EUserRoles } from '../enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin: boolean = false;
  roleAs: string = '';

  constructor(private httpClient: HttpClient) { }

  loginUser(userCredentials: any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>('/api/login', userCredentials);
  }

  setLogin(token: string) {
    try {
      const curentUser: any = jwt_decode(token);
      this.isLogin = true;
      this.roleAs = curentUser.role;
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('STATE', 'true');
      localStorage.setItem('ROLE', this.roleAs);
    } catch (e: any) {
      console.log(e);
      this.logout();
    }
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
  }

  isLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('STATE');
    this.isLogin = (loggedIn === 'true');
    /* TODO -> bug 
    if (this._tokenExpired(localStorage.getItem('TOKEN'))) {
      this.logout();
    }
    */
    return this.isLogin;
  }

  getRole(): string {
    this.roleAs = localStorage.getItem('ROLE') || '';
    return this.roleAs;
  }

  hasMinAccess(role: string): boolean {
    switch (role) {
    case EUserRoles.DEV:
      return (this.roleAs === EUserRoles.DEV);

    case EUserRoles.ADMIN:
      return !!((
        this.roleAs === EUserRoles.ADMIN ||
        this.roleAs === EUserRoles.DEV
      ));

    case EUserRoles.USER:
      return !!((
        this.roleAs === EUserRoles.USER ||
        this.roleAs === EUserRoles.ADMIN ||
        this.roleAs === EUserRoles.DEV
      ));

    case EUserRoles.ACCOUNTING:
      return !!((
        this.roleAs === EUserRoles.ACCOUNTING ||
        this.roleAs === EUserRoles.USER ||
        this.roleAs === EUserRoles.ADMIN ||
        this.roleAs === EUserRoles.DEV
      ));

    default:
      return false;
    }
  }

  hasOnlyAccess(role: string, strict: boolean = false): boolean {
    switch (role) {
    case EUserRoles.DEV:
      return (this.roleAs === EUserRoles.DEV);

    case EUserRoles.ADMIN:
      return !!((
        this.roleAs === EUserRoles.ADMIN ||
        ((strict) ? false : this.roleAs === EUserRoles.DEV)
      ));

    case EUserRoles.USER:
      return !!((
        this.roleAs === EUserRoles.USER ||
        ((strict) ? false : this.roleAs === EUserRoles.DEV)
      ));

    case EUserRoles.ACCOUNTING:
      return !!((
        this.roleAs === EUserRoles.ACCOUNTING ||
        ((strict) ? false : this.roleAs === EUserRoles.DEV)
      ));

    default:
      return false;
    }
  }

  private _tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }

}
