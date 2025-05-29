import { Component } from '@angular/core';
import { Courses } from '../../models/courses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseDataService } from '../../services/course-data.service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
    
  courses: Courses[] = [];
  filteredCourses: Courses[] = [];
  filterInput: string = "";

  uniqueSubject: String[] = [];
  selectedSubject: string = "allSubjects";

  constructor(private courseDataService: CourseDataService ) {}

  ngOnInit() {
      this.courseDataService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;

      const subjects = courses.map(course => course.subject);
      this.uniqueSubject = [...new Set(subjects)]; // Skapar ett nytt "Set" av ämnen utan dubletter.
    })
  }

  filter(): void {
    const filter = this.filterInput.toLowerCase();
    const selected = this.selectedSubject;

    this.filteredCourses = this.courses.filter(course => {
      const matchesText =
        course.courseCode.toLowerCase().includes(filter) ||
        course.courseName.toLowerCase().includes(filter);

      const matchesSubject = selected === 'allSubjects' || 
      course.subject === selected;

      return matchesText && matchesSubject;
    });
  }
}