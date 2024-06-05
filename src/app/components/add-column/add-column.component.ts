import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {KanbanService} from "../../services/kanban.service";
import {IColumn} from "../../models/column";
import {IconComponent} from "../icon/icon.component";
import {NgClass, NgIf} from "@angular/common";
import {IBoard} from "../../models/board";

@Component({
  selector: 'add-column',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        IconComponent,
        NgIf,
        NgClass
    ],
  templateUrl: './add-column.component.html',
  styleUrl: './add-column.component.css',
  providers:[KanbanService]
})
export class AddColumnComponent implements AfterViewInit{
    @Input() board?: number;
    @ViewChild('textareaTitle') textareaTitle: ElementRef;
    @Output() buttonAddClick = new EventEmitter<number>();
    title: string = "";
    isFormVisible:boolean = false;
    iconUrlClose: string = "/assets/icons/x-icon.png";

    constructor(private kanbanService: KanbanService) {
    }
    ngAfterViewInit(): void {
        /*this.textareaTitle.nativeElement.focus();*/
    }

    saveColumn() {
        if (!this.board){
            return;
        }
        const column: IColumn = {
            boardID: this.board,
            title: this.title
        }
        this.kanbanService.addColumn(column).subscribe({
            next:(data:any) => {
                this.buttonAddClick.emit(data.columnID);
                this.isFormVisible=!this.isFormVisible;
                this.title = "";
            },
            error: error => {
                console.log(error);
            }
        });
    }

    showAddForm(){
        this.isFormVisible=!this.isFormVisible;
        this.title = "";
    }
}
