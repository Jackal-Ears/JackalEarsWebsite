import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { EventsComponent } from './page/events/events.component';
import { LinksComponent } from './page/links/links.component';
import { WipComponent } from './page/wip/wip.component';
import { ScheduleComponent } from './component/schedule/schedule.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'events', component: EventsComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'links', component: LinksComponent },
    // { path: 'wip', component: WipComponent },
    { path: '**', redirectTo: '/' },
];
