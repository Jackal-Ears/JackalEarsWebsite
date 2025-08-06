import { Component } from '@angular/core';
import { WebsiteService } from '../../service/website.service';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../../component/schedule/schedule.component';
import { SectionComponent } from '../../component/section/section.component';
import { GradientComponent } from '../../component/section/gradient/gradient.component';

@Component({
  selector: 'app-events',
  imports: [CommonModule, ScheduleComponent, SectionComponent, GradientComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

  scheduleStatus: boolean = false;

  scheduleLoaded(state: any) {
    this.scheduleStatus = state;
  }

}
