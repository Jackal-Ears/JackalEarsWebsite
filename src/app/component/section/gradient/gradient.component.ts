import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gradient',
  imports: [],
  templateUrl: './gradient.component.html',
  styleUrl: './gradient.component.scss'
})
export class GradientComponent {

  @Input() top: string = "";
  @Input() bottom: string = "";
  @Input() height: string = "50px";

  getBackground(): string {
    return `linear-gradient(180deg, ${this.top} 0%, ${this.bottom} 100%)`
  }

}
