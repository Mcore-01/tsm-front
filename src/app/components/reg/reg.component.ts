import { Component } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {IRegisterRequest} from "../../requestmodels/RegisterRequest";
import {HttpClientModule} from "@angular/common/http";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-reg',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterLink,
        RouterLinkActive,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton
    ],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.scss',
  providers: [AuthService]
})
export class RegComponent {
  errorMessage:string = "";
  invalidLogin:boolean = false;
  subscription: Subscription;

  nameValue: string = '';
  loginValue: string = '';
  passwordValue: string = '';

  constructor(private http: AuthService) {
  }

  register(){
    this.errorMessage = "";
    this.invalidLogin = false;


    let registerRequest: IRegisterRequest = {
      nickname: this.nameValue,
      login: this.loginValue,
      password: this.passwordValue
    }

    this.subscription = this.http.register(registerRequest).subscribe({
      next:(data:any) => console.log(data),
      error: error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.invalidLogin = true;
      }
    });
  }
}
