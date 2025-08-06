import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {

  @Input() background: string = "";
  @Input() inner_bg: string = "";
  @Input() width: string = "50%";
  @Input() height: string = "100vh";
  @Input() gradient: number = 0;
  @Input() padding: string = "0px";

  getBackground(): string {
    if (this.gradient != 0) {
      return `linear-gradient(90deg, ${this.inner_bg} 0%, ${this.background} ${this.gradient}%, ${this.background} ${100-this.gradient}%, ${this.inner_bg} 100%)`;
    } else {
      return this.background
    }
  }

  getInnerBackground(): string {
    if (this.gradient != 0) {
      return "transparent"
    } else if (this.inner_bg == '') {
      return this.background
    } else {
      return this.inner_bg
    }
  }

}
