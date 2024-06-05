import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {IRegisterRequest} from "../requestmodels/RegisterRequest";
import {ILoginRequest} from "../requestmodels/LoginRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private route: Router) { }

    login(data: ILoginRequest){
        return this.http.post<any>("/TSM/Users/login", data).pipe(
            tap( response =>{
                if (response) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('userID', response.userID);
                    localStorage.setItem('userName', response.userName);
                    this.route.navigate(['main']).then();
                }
            })
        );
    }

    register(data: IRegisterRequest){

        return this.http.post<any>("/TSM/Users/reg", data).pipe(
            tap( response =>{
                if (response) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('userID', response.userID);
                    localStorage.setItem('userName', response.userName);
                    this.route.navigate(['main']).then();
                }
            })
        );
    }

  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('userID');
      localStorage.removeItem('userName');
  }

  updateUserName(name: string){
      const data = {nickName: name};
      return this.http.patch(`/TSM/Users/nickname`, data);
  }

  validateToken(){
      return this.http.get('/TSM/Users/validate-token');
  }
}
