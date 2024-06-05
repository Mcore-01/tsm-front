import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ModalComponent} from "../../components/modal/modal.component";
import {Dialog} from "@angular/cdk/dialog";

@Component({
  selector: 'personal-account-page',
  standalone: true,
    imports: [
        FormsModule,
        RouterLink,
        RouterLinkActive,
        HttpClientModule,
        MatIcon,
        MatIconButton,
        ModalComponent
    ],
  templateUrl: './personal-account-page.component.html',
  styleUrl: './personal-account-page.component.scss',
  providers:[AuthService]
})
export class PersonalAccountPageComponent implements OnInit{
  constructor(private authService: AuthService, public dialog: Dialog) {
  }
  userName: string | null;
  get firstSymbolNickname(){
    return this.userName?.charAt(0);
  }
  ngOnInit(): void {
    this.userName = localStorage.getItem("userName");
  }
  edit(){
      const dialogRef = this.dialog.open<string>(ModalComponent, {
          data: localStorage.getItem("userName")
      });

      const sub = dialogRef.closed.subscribe(result => {
          console.log(result);
          if (result){
              this.authService.updateUserName(result).subscribe({
                  next:() => {
                      localStorage.setItem('userName', result);
                      this.userName = result;
                  },
                  error: error => {
                      console.log(error);
                  }
              });
          }
      });
  }

}
