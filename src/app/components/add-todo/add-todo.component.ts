import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {KanbanService} from "../../services/kanban.service";
import {ITodo} from "../../models/todo";
import {IconComponent} from "../icon/icon.component";

@Component({
  selector: 'add-todo',
  standalone: true,
    imports: [
        FormsModule,
        IconComponent
    ],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
  providers: [KanbanService]
})
export class AddTodoComponent {

  @Input() columnID?: number;
  @Output() buttonAddClick = new EventEmitter<Boolean>();
  @Output() buttonCloseClick = new EventEmitter<Boolean>();
  description: string = "";
  iconUrlCheckBox: string = "/assets/icons/checkbox-icon.png";
  iconUrlClose: string = "/assets/icons/x-icon.png";
  constructor(private kanbanService: KanbanService) {
  }
  addTodo(){
    const userName = localStorage.getItem("userName");
    if (userName && this.columnID){
      const todo:ITodo = {creator: userName, columnID: this.columnID, description: this.description};
      this.kanbanService.addTodo(todo).subscribe({
        next:(data:any) => this.buttonAddClick.emit(true),
        error: error => {
          console.log(error);
        }
      });
    }
  }

  close(){
    this.buttonCloseClick.emit(true);
  }
}
