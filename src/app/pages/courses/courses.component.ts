import { Component } from '@angular/core';
import { Courses } from '../../models/courses';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseDataService } from '../../services/course-data.service';
import { __addDisposableResource } from 'tslib';

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

  uniqueSubject: string[] = [];
  selectedSubject: string = "allSubjects";

  sortColumn: string = "";
  sortAscending: boolean = true;

  savedCourses: Courses[] = [];

  renderCourses: number = 50;

  constructor(private courseDataService: CourseDataService ) {}

  ngOnInit() {
      this.courseDataService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;

      const subjects = courses.map(course => course.subject);
      this.uniqueSubject = [...new Set(subjects)]; // Skapar ett nytt "Set" av ämnen utan dubletter.
    });
  };

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

    this.renderCourses = 50;
  };

  sortBy(column: keyof Courses): void {

    if(this.sortColumn === column) {
      this.sortAscending = !this.sortAscending
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    };


    this.filteredCourses.sort((a, b) => {
      const aCourse = a[column]?.toString().toLowerCase?.() ?? a[column];
      const bCourse = b[column]?.toString().toLowerCase?.() ?? b[column];

      if(aCourse < bCourse)
        return this.sortAscending ? -1 : 1;
      if(aCourse > bCourse)
        return this.sortAscending ? 1 : -1;
        
      return 0;
    })
  };

  addCourse(course: Courses): void {
    this.savedCourses.push(course);
    localStorage.setItem("savedCourses", JSON.stringify(this.savedCourses));

    console.log(this.savedCourses)
  };

  isCourseAdded(course: Courses): Boolean {
    return this.savedCourses.some(c => 
      c.courseCode === course.courseCode)
  };

  get visibleCourses(): Courses[] {
    return this.filteredCourses.slice(0, this.renderCourses)
  }

  showMoreCourses(): void {
    if (this.renderCourses < this.filteredCourses.length) {
      this.renderCourses += 50;
  }};
}