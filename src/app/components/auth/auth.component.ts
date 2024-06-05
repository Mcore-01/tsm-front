import { Component } from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {IRegisterRequest} from "../../requestmodels/RegisterRequest";
import {ILoginRequest} from "../../requestmodels/LoginRequest";

@Component({
  selector: 'app-auth',
  standalone: true,
    imports: [
        FormsModule,
        HttpClientModule,
        CommonModule,
        RouterLink,
        RouterLinkActive,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton
    ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [AuthService]
})
export class AuthComponent {

  errorMessage:string = "";
  invalidLogin:boolean = false;
  loginSubscription: Subscription;

  loginValue: string = "";
  passwordValue: string = "";

  constructor(private http: AuthService) {
  }

  login(){
    this.errorMessage = "";
    this.invalidLogin = false;

      let loginRequest: ILoginRequest = {
          login: this.loginValue,
          password: this.passwordValue
      }
    this.loginSubscription = this.http.login(loginRequest).subscribe({
      next:(data:any) => console.log(data),
      error: error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.invalidLogin = true;
      }
    });
  }

}
