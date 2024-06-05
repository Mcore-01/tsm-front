import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'user-profile',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [AuthService]
})
export class ProfileComponent implements OnInit{

    constructor(private route: Router, private authService: AuthService) {
    }
    userName: string | null;

    get firstSymbolNickname(){
        return this.userName?.charAt(0);
    }
    ngOnInit(): void {
      this.userName = localStorage.getItem("userName");
    }

    logout() {
        this.authService.logout();
        this.route.navigate(['/enter/auth']).then(()=>{
            console.log('переход на страницу авторизации');
        });
    }
}
