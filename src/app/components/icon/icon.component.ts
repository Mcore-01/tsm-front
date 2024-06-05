import {Component, Input} from '@angular/core';

@Component({
  selector: 'icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css'
})
export class IconComponent {
  @Input() iconUrl: string = "";
  @Input() width: number = 30;
  @Input() height: number = 30;

  get widthPX(){
    return `${this.width}px`
  }
  get heightPX(){
    return `${this.height}px`
  }
}
