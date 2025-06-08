import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WebsiteService } from '../../service/website.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public website: WebsiteService, private router: Router) {

  }

  pages: Page[] = [
    {
      path: "home",
      name: "Home",
      icon: "home",
    },
    {
      path: "links",
      name: "Links",
      icon: "link",
    },
    {
      path: "schedule",
      name: "Schedule",
      icon: "calendar_month",
    }
  ]

  navigate(path: string) {
    this.router.navigate([path])
  }

}

interface Page {
  path: string
  name: string
  icon: string
}
