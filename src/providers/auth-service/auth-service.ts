import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

let apiUrl = "https://reqres.in/api/"

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {  }

  login(credentials){ 
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders();

      this.http.post(apiUrl+'login', JSON.stringify(credentials),{headers:headers.append('Content-Type', 'application/json')})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
  });
  }

}
