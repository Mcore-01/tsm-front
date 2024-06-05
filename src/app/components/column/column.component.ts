import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IColumn} from "../../models/column";
import {Observable} from "rxjs";
import {ITodo} from "../../models/todo";
import {KanbanService} from "../../services/kanban.service";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {AddTodoComponent} from "../add-todo/add-todo.component";
import {FormsModule} from "@angular/forms";
import {UpdateTodoComponent} from "../update-todo/update-todo.component";
import {IconComponent} from "../icon/icon.component";
import {AddColumnComponent} from "../add-column/add-column.component";
import {IBoard} from "../../models/board";
@Component({
  selector: 'column',
  standalone: true,
  imports: [
    AsyncPipe,
    CdkDrag,
    CdkDropList,
    AddTodoComponent,
    FormsModule,
    NgIf,
    UpdateTodoComponent,
    NgClass,
    IconComponent,
    AddColumnComponent,
    NgForOf
  ],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  providers:[KanbanService]
})
export class ColumnComponent implements OnInit{
  @Input() column: IColumn;
  @Output() buttonDeleteClick = new EventEmitter();

  todos: ITodo[];
  editedTodo: number = -1;

  isAddFieldVisible:boolean = false;

  iconUrlTrash: string = "/assets/icons/trash.svg";

  constructor(private kanbanService: KanbanService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getTodos(this.column.id)
  }

  getTodos(columnID?: number){
    this.kanbanService.getAllTodos(columnID).subscribe({
      next:(data) =>{
        this.todos = data;
      }
    });
  }
  addTodo(isAdd:Boolean){
    if (isAdd){
      this.getTodos(this.column.id);
      this.isAddFieldVisible = false;
    }
  }

  showAddField(){
    this.isAddFieldVisible = true;
  }
  delete(id?: number){
    if (id){
      this.kanbanService.deleteTodo(id).subscribe({
        next:(data:any) => this.getTodos(this.column.id),
        error: error => {
          console.log(error);
        }
      });
    }
  }
  showEditField(id?: number){
    if (id){
      this.editedTodo = id;
    }
  }
  hideEditField(id?: number){
    if (id){
      this.editedTodo = -1;
      this.getTodos(this.column.id);
    }
  }
  drop(event: CdkDragDrop<ITodo[]>) {
    console.log(event.previousContainer===event.container);
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  deleteColumn(columnID?: number){
    if (columnID){
      this.kanbanService.deleteColumn(columnID).subscribe({
        next:(data:any) => {
          this.buttonDeleteClick.emit();
        },
        error: error => {
          console.log(error);
        }
      });
    }
  }
}