import { Component } from '@angular/core';
import { WebsiteService } from '../../service/website.service';
import { CommonModule } from '@angular/common';
import { SectionComponent } from '../../component/section/section.component';
import { GradientComponent } from '../../component/section/gradient/gradient.component';

@Component({
  selector: 'app-links',
  imports: [CommonModule, SectionComponent, GradientComponent],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent {

  constructor(public website: WebsiteService) {

  }

}
