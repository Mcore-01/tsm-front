import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITodo} from "../../models/todo";
import {KanbanService} from "../../services/kanban.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IBoard} from "../../models/board";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-update-board',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-board.component.html',
  styleUrl: './update-board.component.css',
  providers: [KanbanService]
})
export class UpdateBoardComponent {
  @Input() board: IBoard;
  @Output() buttonCloseClick = new EventEmitter<Boolean>();
  constructor(private kanbanService: KanbanService, private boardService: BoardService) {
  }

  saveTodo(){
    this.kanbanService.updateBoard(this.board).subscribe({
      next:(data:any) => {
        this.buttonCloseClick.emit(true);
        this.boardService.changeBoard();
      },
      error: error => {
        console.log(error);
      }
    });
  }
  close(){
    this.buttonCloseClick.emit(true);
  }

  onKeydown(event: any){
    event.preventDefault();
  }
  //protected readonly onkeydown = onkeydown;
}
