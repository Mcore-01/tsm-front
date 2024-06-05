import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {ITodo} from "../../models/todo";

@Component({
  selector: 'test-page',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDropListGroup,
    CdkDrag
  ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {
  items:ITodo[] = [{id:1, columnID:12, description:'Carrots', creator:'asdsa'},
    {id:2, columnID:12, description:'Tomate', creator:'asdsa'},
    {id:3, columnID:12, description:'aefe', creator:'asdsa'}];

  basket:ITodo[] = [{id:1, columnID:12, description:'Oranges', creator:'asdsa'},
    {id:2, columnID:12, description:'Bananas', creator:'asdsa'},
    {id:3, columnID:12, description:'Cucumbers', creator:'asdsa'}];
  basket2:ITodo[] = [{id:1, columnID:12, description:'Oranges2', creator:'asdsa'},
    {id:2, columnID:12, description:'Bananas2', creator:'asdsa'},
    {id:3, columnID:12, description:'Cucumbers2', creator:'asdsa'}];

  columns = [this.items, this.basket, this.basket2]

  drop(event: CdkDragDrop<ITodo[]>, id: number) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log(event.previousContainer.data);
      console.log(event.container.data);
      console.log(event.previousContainer.data[event.previousIndex])
      console.log(id)
      transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
      );
    }
  }
}
