import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogin: boolean = false;
  private roleAs: string = '';

  constructor (private httpClient: HttpClient) { }

  loginUser (userCredentials:any): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>('/api/login', userCredentials);
  }

  setLogin (token: string) {
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

  logout () {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
  }

  isLoggedIn (): boolean {
    const loggedIn = localStorage.getItem('STATE');
    this.isLogin = (loggedIn === 'true');
    return this.isLogin;
  }

  getRole (): string {
    this.roleAs = localStorage.getItem('ROLE') || '';
    return this.roleAs;
  }

  hasMinAccess (role: string): boolean {
    switch (role) {
    case 'dev':
      return (this.roleAs === 'dev'); 
      
    case 'admin':
      return !!((this.roleAs === 'dev' || this.roleAs === 'admin'));   
      
    case 'user':
      return !!((this.roleAs === 'user' || this.roleAs === 'dev' || this.roleAs === 'admin'));  
    
    case 'accounting':
      return !!((this.roleAs === 'accounting' || this.roleAs === 'user' || this.roleAs === 'dev' || this.roleAs === 'admin'));  

    default:
      return false;
    }
  }

}
