import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {KanbanService} from "../../services/kanban.service";
import {IBoard} from "../../models/board";
import {BoardComponent} from "../../components/board/board.component";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ColumnComponent} from "../../components/column/column.component";
import {ModalComponent} from "../../components/modal/modal.component";
import {UpdateTodoComponent} from "../../components/update-todo/update-todo.component";
import {UpdateBoardComponent} from "../../components/update-board/update-board.component";
import {AddColumnComponent} from "../../components/add-column/add-column.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ProfileComponent} from "../../components/profile/profile.component";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-main-page',
  standalone: true,
    imports: [
        FormsModule,
        HttpClientModule,
        CommonModule,
        RouterLink,
        BoardComponent,
        AsyncPipe,
        NgForOf,
        ColumnComponent,
        ModalComponent,
        UpdateTodoComponent,
        UpdateBoardComponent,
        AddColumnComponent,
        MatIcon,
        MatIconButton,
        ProfileComponent,
        RouterOutlet,
        RouterLinkActive
    ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  providers:[KanbanService, BoardService]
})
export class MainPageComponent implements OnInit{
  constructor(private kanbanService: KanbanService, private boardService: BoardService, private cdRef: ChangeDetectorRef, private route: Router) {
  }
  boards: IBoard[] = [];

  ngOnInit() {
      this.openFirstBoard();
      this.boardService.boardUpdated.subscribe(()=>{
          this.getBoards();
      });
      this.boardService.boardDeleted.subscribe(()=>{
          this.openFirstBoard();
      });
  }
  addBoard(){
      const userID = localStorage.getItem("userID");
      if (userID){
          const board:IBoard = {userID: Number(userID), title: "Без названия"};
          this.kanbanService.addBoard(board).subscribe({
              next:(data:any) => {
                  this.getBoards();
                  this.route.navigate([`/main/board/${data.id}`]).then();
              },
              error: error => {
                  console.log(error);
              }
          });
      }
  }

    getBoards(){
        this.kanbanService.getAllBoards().subscribe(
            (res: IBoard[]) => {
                this.boards = res;
                this.cdRef.detectChanges();
            }
        );
    }

    openFirstBoard(){
        this.kanbanService.getAllBoards().subscribe(
            (res: IBoard[]) => {
                this.boards = res;
                if(res.length > 0){
                    this.route.navigate([`/main/board/${res[0].id}`]).then();
                }
                else{
                    this.route.navigate(['main']).then();
                }
                this.cdRef.detectChanges();
            }
        );
    }
}
