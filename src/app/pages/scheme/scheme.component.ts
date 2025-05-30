import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SchemeService } from '../../services/scheme.service';
import { Courses } from '../../models/courses';

@Component({
  selector: 'app-scheme',
  imports: [CommonModule],
  templateUrl: './scheme.component.html',
  styleUrl: './scheme.component.css'
})
export class SchemeComponent {
  savedCourses: Courses[] = [];

  constructor(private schemeService: SchemeService) {}

  ngOnInit() {
    this.schemeService.savedCourses.subscribe(courses => {
      this.savedCourses = courses;
    })
  }

}
