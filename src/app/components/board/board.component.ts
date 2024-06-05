import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IBoard} from "../../models/board";
import {AddColumnComponent} from "../add-column/add-column.component";
import {ColumnComponent} from "../column/column.component";
import {NgForOf, NgIf} from "@angular/common";
import {UpdateBoardComponent} from "../update-board/update-board.component";
import {IColumn} from "../../models/column";
import {KanbanService} from "../../services/kanban.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription, switchMap} from "rxjs";
import {BoardService} from "../../services/board.service";
import {IconComponent} from "../icon/icon.component";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {UpdateTodoComponent} from "../update-todo/update-todo.component";

@Component({
  selector: 'board',
  standalone: true,
    imports: [
        AddColumnComponent,
        ColumnComponent,
        NgForOf,
        NgIf,
        UpdateBoardComponent,
        IconComponent,
        CdkDrag,
        UpdateTodoComponent
    ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers:[KanbanService]
})
export class BoardComponent implements OnInit, OnDestroy{

  iconUrlTrash: string = "/assets/icons/trash.svg";
  private subs: Subscription[] = [];
  board: IBoard = {} as IBoard;
  constructor(private kanbanService: KanbanService, private boardService: BoardService, private cdRef: ChangeDetectorRef, private activateRoute: ActivatedRoute) {

  }

  ngOnDestroy(): void {
    for (let sub of this.subs){
      sub.unsubscribe();
    }
  }

  ngOnInit(): void {

    this.activateRoute.paramMap.pipe(
        switchMap(params => {
          const id = +params.getAll("id");
          if (id){
            this.kanbanService.getBoard(id).subscribe(
                (res: IBoard) => {
                  this.board = res;
                  this.loadColumns(res);
                  this.cdRef.detectChanges();
                }
            );
          }
          return new Observable();
        }))
        .subscribe();
  }
  columns:IColumn[];
  currentBoard: IBoard = {userID: -1, title:""};
  isBoardEdited: boolean = false;

  isColumnsVisible: boolean = false;


  loadColumns(board: IBoard){
    if (board.id){
      this.isBoardEdited = false;
      this.isColumnsVisible = true;
      this.currentBoard = board;
      this.kanbanService.getAllColumns(board.id).subscribe(
          (res: IColumn[]) => {
            this.columns = res;
            this.cdRef.detectChanges();
          }
      );
    }
  }


  hideEditField(){
    this.isBoardEdited = false;
  }
  showEditField(){
    this.isBoardEdited = true;
  }


  addColumn(columnID: number){
    this.kanbanService.getColumn(columnID).subscribe(
        (res: IColumn) => {
          this.columns.push(res);
          this.cdRef.detectChanges();
        }
    );
  }
  deleteColumn(columnID?: number){
    this.columns = this.columns.filter(col => col.id !== columnID);
  }

  deleteBoard(id?: number){
    if (id){
        this.kanbanService.deleteBoard(id).subscribe(
            () => {
                this.boardService.deleteBoard();
            }
        );
    }
  }
}