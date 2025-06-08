import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { LinksComponent } from './page/links/links.component';
import { WipComponent } from './page/wip/wip.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'links', component: LinksComponent },
    { path: '', component: WipComponent },
    { path: '**', redirectTo: '/' },
];
