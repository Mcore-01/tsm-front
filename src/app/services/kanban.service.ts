import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {IBoard} from "../models/board";
import {catchError, tap, throwError} from "rxjs";
import {IColumn} from "../models/column";
import {ITodo} from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

    constructor(private kanbanService:HttpClient, private route: Router) { }


    getAllBoards(){
        return this.kanbanService.get<IBoard[]>("/TSM/Boards/boards");
    }

    getBoard(id: number){
        return this.kanbanService.get<IBoard>(`/TSM/Boards/board/${id}`).pipe(
            catchError((error: HttpErrorResponse)=>{
                this.route.navigate(['/not-found']).then();
                return throwError(() => new Error('Нет найдено'));
            })
        )
    }

    getAllColumns(boardID?: number){
        return this.kanbanService.get<IColumn[]>(`/TSM/Columns/columns/${boardID}`);
    }

    getAllTodos(todoID?: number){
        return this.kanbanService.get<ITodo[]>(`/TSM/Todos/todos/${todoID}`);
    }

    addTodo(todo: ITodo)
    {
        return this.kanbanService.post("/TSM/Todos/create", todo);
    }
    updateTodo(todo: ITodo)
    {
        return this.kanbanService.put("/TSM/Todos/update", todo);
    }
    deleteTodo(id: number)
    {
        return this.kanbanService.delete(`/TSM/Todos/delete/${id}`);
    }


    getColumn(columnID: number)
    {
        return this.kanbanService.get<IColumn>(`/TSM/Columns/column/${columnID}`);
    }
    addColumn(column: IColumn)
    {
        return this.kanbanService.post("/TSM/Columns/create", column);
    }

    deleteColumn(columnID: number)
    {
        return this.kanbanService.delete(`/TSM/Columns/delete/${columnID}`);
    }
    addBoard(board: IBoard)
    {
        return this.kanbanService.post("/TSM/Boards/create", board);
    }

    updateBoard(board: IBoard)
    {
        return this.kanbanService.put("/TSM/Boards/update", board);
    }

    deleteBoard(columnID: number)
    {
        return this.kanbanService.delete(`/TSM/Boards/delete/${columnID}`);
    }
}