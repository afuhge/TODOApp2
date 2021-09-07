import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AbstractAPiService} from './AbstractAPiService';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends AbstractAPiService{

  private loginUrl = 'http://localhost:3000/login';  // URL to web api

  constructor(
    private http: HttpClient,
    protected localStorageService: LocalStorageService,
  ) {
    super(localStorageService);
  }

  public loginUser(userObject: any): Observable<string> {
    console.log(userObject);
    return this.http.post(this.loginUrl, userObject, this.httpOptions)
      .pipe(map((body: any ) => {
        console.log(body);
        return body.accessToken as string;
      }));
  }
}
