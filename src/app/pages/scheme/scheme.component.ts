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
    });
  };

  // Tar bort kurs från ramschemat vid klick på "Ta bort"-knappen.
  removeCourse(removeCourse: Courses) {
    const updatedCourses = this.savedCourses.filter(course => 
      course.courseCode !== removeCourse.courseCode);

    localStorage.removeItem("savedCourses");
      console.log(this.savedCourses);

    this.schemeService.updateSavedCourses(updatedCourses)
  };

  get totalPoints(): number {
    return this.savedCourses.reduce((sum, course) => sum + course.points, 0)
  }

  get totalCourses(): number {
    const courses = this.savedCourses.length;

    return courses;
  }

}
