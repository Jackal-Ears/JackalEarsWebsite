import { Component } from '@angular/core';
import { WebsiteService } from '../../service/website.service';
import { SectionComponent } from '../../component/section/section.component';
import { GradientComponent } from '../../component/section/gradient/gradient.component';
import { ScheduleComponent } from "../../component/schedule/schedule.component";

@Component({
  selector: 'app-home',
  imports: [SectionComponent, GradientComponent, ScheduleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public website: WebsiteService) {

  }

  selectedCast: number = 0;

  shiftCast(shift: number) {
    this.selectedCast += shift;
    if (this.selectedCast < 0) this.selectedCast = this.website.sourcedData.staff.length-1;
  }

  getCast() {
    if (!this.website.sourcedData.staff) return [];
    let lef: number = (this.selectedCast)%this.website.sourcedData.staff.length
    let mid: number = (this.selectedCast+1)%this.website.sourcedData.staff.length
    let rig: number = (this.selectedCast+2)%this.website.sourcedData.staff.length
    return [this.website.sourcedData.staff[lef], this.website.sourcedData.staff[mid], this.website.sourcedData.staff[rig]]
  }

}
