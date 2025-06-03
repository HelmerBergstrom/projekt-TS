import { Component } from '@angular/core';
import { Courses } from '../../models/courses';
import { SchemeService  } from '../../services/scheme.service';
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

  // Filtrering av kurser.
  filteredCourses: Courses[] = [];
  filterInput: string = "";

  // Ämnen.
  uniqueSubject: string[] = [];
  selectedSubject: string = "allSubjects";

  // Kolumnsortering.
  sortColumn: string = "";
  sortAscending: boolean = true;

  // Sparade kurser
  savedCourses: Courses[] = [];

  // Renderade kurser, visar 50 kurser i taget.
  renderCourses: number = 50;

  // Använder courseData-service och Scheme-service.
  constructor(
    private courseDataService: CourseDataService,
    private schemeService: SchemeService
   ) {}

   // ngOnInit som körs direkt när komponenten laddats.
  ngOnInit() {
    // Hämtar kurser. 
      this.courseDataService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filteredCourses = courses;

      const subjects = courses.map(course => course.subject);
      this.uniqueSubject = [...new Set(subjects)]; // Skapar ett nytt "Set" av ämnen utan dubletter.
    });

    this.schemeService.savedCourses.subscribe(courses => {
      this.savedCourses = courses;
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
     let aCourse = a[column];
     let bCourse = b[column];

     if(column === 'points') {
      aCourse = Number(aCourse);
      bCourse = Number(bCourse);
     } else {
      aCourse = aCourse?.toString().toLowerCase?.() ?? '';
      bCourse = bCourse?.toString().toLowerCase?.() ?? '';
     }

      if(aCourse < bCourse)
        return this.sortAscending ? -1 : 1;
      if(aCourse > bCourse)
        return this.sortAscending ? 1 : -1;
        
      return 0;
    })
  };

  sortingArrow(column: string): string {
    if(this.sortColumn !== column)
      return '';

    return this.sortAscending ? '⬇️' : '⬆️';
  }

  sortingArrowPoints(column: string): string {
    if(this.sortColumn !== column)
      return '';

    return this.sortAscending ? '⬆️' : '⬇️';
  }

  addCourse(course: Courses): void {
    this.schemeService.addCourse(course);

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