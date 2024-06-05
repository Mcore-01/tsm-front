import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatIcon,
    MatIconButton,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit{

  text: string;

  constructor(public dialogRef: DialogRef<string>,
              @Inject(DIALOG_DATA) public data: string) {
  }

  ngOnInit(): void {
    this.text = this.data;
  }
  closeModal(){
    this.dialogRef.close();
  }
}
