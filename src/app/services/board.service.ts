import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IBoard} from "../models/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public boardUpdated = new Subject();
  public boardDeleted = new Subject();

  public changeBoard(){
    this.boardUpdated.next(()=> {});
  }

  public deleteBoard(){
    this.boardDeleted.next(()=> {});
  }
}
