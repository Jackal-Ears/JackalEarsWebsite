import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WebsiteService } from '../../service/website.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {

  async ngOnInit() {
    await this.fetchSchedule();
  }

  @Input() dayLimit: number = 0;
  scheduleStatus: boolean = false;
  @Output() scheduleLoaded = new EventEmitter<boolean>();

  constructor(public website: WebsiteService, private router: Router) {

  }

  events: any[] = []
  dayEvents: any = {}
  typeCount: any = {}
  eventMetadata: any = {}
  daysHidden: number = 0;
  eventTypeFormatting: any = {
    workshop: {
      icon: "hardware",
      color: "var(--event-workshop)"
    },
    jam: {
      icon: "emoji_people",
      color: "var(--event-jam)"
    },
    class: {
      icon: "school",
      color: "var(--event-class)"
    },
    show: {
      icon: "comedy_mask",
      color: "var(--event-show)"
    },
    unknown: {
      icon: "calendar_today",
      color: "var(--event-unknown)"
    }
  }
  
  async fetchSchedule() {

    // set variables
    const apiKey = 'AIzaSyBr6Taa1AqkVYPddUuhMLCAng1MEnXdmOw';
    const calendarId = 'bee1be4da5571fc4b5cdb781ff57ac8fafc5e9e572f1735ad9b3ef4468f99e8f@group.calendar.google.com';

    // get time range
    const today = new Date();
    const timeMin = today.toISOString();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 30);
    const timeMax = nextWeek.toISOString();

    // get events
    let calendarAll: any;
    let calendarCombined: any;
    try {
      calendarAll = await this.website.http.get(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`).toPromise();
      calendarCombined = await this.website.http.get(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}`).toPromise();
    } catch {
      this.scheduleLoadedTrigger(false);
    }

    // process events
    for (let event of calendarCombined.items) {

      // check type
      let type: string = "unknown";
      if (String(event.summary + event.description).toLowerCase().includes("workshop")) type = 'workshop';
      else if (String(event.summary + event.description).toLowerCase().includes("jam")) type = 'jam';
      else if (String(event.summary + event.description).toLowerCase().includes("class")) type = 'class';
      else if (String(event.summary + event.description).toLowerCase().includes("show")) type = 'show';

      // recurrence
      let recurrence: string = event.recurrence ? (event.recurrence[0].includes("DAILY") ? "daily" : event.recurrence[0].includes("WEEKLY") ? "weekly" : "unique") : "single"
      
      // per event metadata
      if (!this.typeCount[type]) this.typeCount[type] = 0
      if (!this.eventMetadata[event.etag]) {
        this.typeCount[type] += 1
        this.eventMetadata[event.etag] = {
          color: `var(--event-${type}-${this.typeCount[type]})`,
          type,
          typeCount: this.typeCount[type],
          recurrence
        }

      }
      
    }

    // create event lists
    for (let event of calendarAll.items) {
      this.events.push(
        this.createEventEntry(event)
      )
    }
    // group by day
    for (let event of this.events) {
      if (!this.dayEvents[event.day]) {
        this.dayEvents[event.day] = []
      }
      this.dayEvents[event.day].push(event)
    }
    this.dayEvents = Object.entries(this.dayEvents)

    // limit
    if (this.dayLimit != 0) {
      this.daysHidden = this.dayEvents.length - this.dayLimit;
      this.dayEvents = this.dayEvents.slice(0,this.dayLimit);
    }

    // return
    this.scheduleLoadedTrigger(this.dayEvents.length > 0);
  }

  scheduleLoadedTrigger(state: boolean) {
    this.scheduleStatus = state;
    this.scheduleLoaded.emit(state); 
  }

  createEventEntry(event: any) {
    const start = new Date(event.start.dateTime || event.start.date);
    const end = new Date(event.end.dateTime || event.end.date);
    const today = new Date();
    const timeLeft = this.getTimeLeft(start)
    const type = this.eventMetadata[event.etag].type
    return {
      id: event.etag,
      name: event.summary,
      description: event.description,
      day: String(start).slice(4, String(start).indexOf("(")-19),
      startDisplay: String(start).slice(0, String(start).indexOf("(")),
      start: start,
      end: end,
      duration: (end.getTime() - start.getTime()) / 1000 / 60 / 60,
      recurrence: event.recurrence,
      until: timeLeft,
      // color: this.eventMetadata[event.etag].color,
      color: this.eventTypeFormatting[type].color,
      type: type,
      typeCount: this.eventMetadata[event.etag].typeCount,
      icon: this.eventTypeFormatting[type].icon
    }
  }

  getTimeLeft(targetDate: Date) {
    const now = new Date();
    let diffMillis = targetDate.getTime() - now.getTime();
    if (diffMillis < 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }
    const minutes = Math.floor((diffMillis / (1000 * 60)) % 60);
    const hours = Math.floor((diffMillis / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffMillis / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, display: days > 0 ?  `Starts in ${days} days` : hours > 0 ?  `Starts in ${hours} hours` : `Starts in ${minutes} minutes`};
  }

  openSchdule() {
    this.router.navigate(["/schedule"])
  }

}
