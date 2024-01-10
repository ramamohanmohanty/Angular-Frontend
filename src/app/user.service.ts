import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from './register.model';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8083/api/property';

  constructor(private http: HttpClient,private router: Router) {}


  createUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/signup", data, { responseType: 'text' });
  }
  


  // createUser(data:any){
  //   this.http.post(this.baseUrl+"/signup",data).subscribe((result:any)=>{
  //   })
  //  }

  // loginUser(data:any): Observable<any> {
  //   const url = this.baseUrl + '/login';
  //   return this.http.post(url, data);
  // }

  loginUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "/login", data);
  }



}
