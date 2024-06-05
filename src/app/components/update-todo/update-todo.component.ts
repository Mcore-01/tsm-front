import {AfterViewInit, Component, ElementRef, EventEmitter, Input, input, Output, ViewChild} from '@angular/core';
import {KanbanService} from "../../services/kanban.service";
import {FormsModule, NgForm} from "@angular/forms";
import {ITodo} from "../../models/todo";
import {IconComponent} from "../icon/icon.component";

@Component({
  selector: 'update-todo',
  standalone: true,
    imports: [
        FormsModule,
        IconComponent
    ],
  templateUrl: './update-todo.component.html',
  styleUrl: './update-todo.component.css',
  providers: [KanbanService]
})
export class UpdateTodoComponent implements AfterViewInit{
  @Input() todo: ITodo;
  @Output() buttonCloseClick = new EventEmitter<Boolean>();
  @ViewChild('textareaTodo') textareaTodo: ElementRef;

  iconUrlCheckBox: string = "/assets/icons/checkbox-icon.png";
  iconUrlClose: string = "/assets/icons/x-icon.png";
  constructor(private kanbanService: KanbanService){
  }
  ngAfterViewInit() {
    this.textareaTodo.nativeElement.focus();
  }
  saveTodo(){
    this.kanbanService.updateTodo(this.todo).subscribe({
      next:(data:any) => this.buttonCloseClick.emit(true),
      error: error => {
        console.log(error);
      }
    });
  }
  close(){
    this.buttonCloseClick.emit(true);
  }
}
