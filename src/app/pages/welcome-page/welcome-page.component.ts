import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'welcome-page',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    HttpClientModule
  ],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
  providers: [AuthService]
})
export class WelcomePageComponent implements OnInit{
  userAuthorized: boolean = false;
  constructor(private route: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.validateToken().subscribe({
      next: () => {
        this.userAuthorized = true;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  openRegPage(){
    this.route.navigate(['/enter/reg'])
  }
}
