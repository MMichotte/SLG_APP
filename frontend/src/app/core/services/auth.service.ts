import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor (private httpClient: HttpClient) { }

    loginUser (userCredentials): Observable<HttpResponse<any>> {
        return this.httpClient.post<any>('/api/login', userCredentials, { observe: 'response' })
    }
}
