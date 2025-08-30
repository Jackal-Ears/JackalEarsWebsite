import { Component, HostListener } from '@angular/core';
import { WebsiteService } from '../../service/website.service';
import { SectionComponent } from '../../component/section/section.component';
import { GradientComponent } from '../../component/section/gradient/gradient.component';
import { ProfileComponent } from '../../component/profile/profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SectionComponent, GradientComponent, ProfileComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public website: WebsiteService) {}

  async ngOnInit() {
    await this.website.updateStaffList();
    this.updateCast();
  }

  selectedCast: number = 0;
  castList: any = [];

  shiftCast(shift: number) {
    this.selectedCast += shift;
    if (this.selectedCast < 0) this.selectedCast = this.website.staffList.length-1;
    this.updateCast();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.updateCast();
  }

  updateCast() {
    if (!this.website.staffList) return;
    let p1: number = (this.selectedCast)%this.website.staffList.length;
    let p2: number = (this.selectedCast+1)%this.website.staffList.length;
    let p3: number = (this.selectedCast+2)%this.website.staffList.length;
    let p4: number = (this.selectedCast+3)%this.website.staffList.length;
    let p5: number = (this.selectedCast+4)%this.website.staffList.length;
    if (window.innerWidth < 800) {
      this.castList = [this.website.staffList[p3]]
    } else if (window.innerWidth < 1200) {
      this.castList = [this.website.staffList[p2], this.website.staffList[p3], this.website.staffList[p4]]
    } else {
      this.castList = [this.website.staffList[p1], this.website.staffList[p2], this.website.staffList[p3], this.website.staffList[p4], this.website.staffList[p5]];
    };
    return;
  }

}
