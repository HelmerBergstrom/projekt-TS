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

    // Prenumererar på BehaviorSubject från service-schemat.
    this.schemeService.savedCourses.subscribe(courses => {
      this.savedCourses = courses;
    });
  };

  // Metod för att filtrera kurslistan.
  filter(): void {
    const filter = this.filterInput.toLowerCase(); // Sökrutan.
    const selected = this.selectedSubject; // Ämnesval.

    // Själva filtermetoden. Kollar om text och ämne matchar.
    this.filteredCourses = this.courses.filter(course => {
      const matchesText =
        course.courseCode.toLowerCase().includes(filter) ||
        course.courseName.toLowerCase().includes(filter);

      const matchesSubject = selected === 'allSubjects' || 
      course.subject === selected;

      return matchesText && matchesSubject; // returnerar matchande kurser.
    });

    // Renderar 50 kurser i taget.
    this.renderCourses = 50;
  };

  // Sorteringsmetod.
  sortBy(column: keyof Courses): void {

    // Växlar mellan stigande och fallande ordning.
    if(this.sortColumn === column) {
      this.sortAscending = !this.sortAscending
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    };

    // Sorterar filtrerade kurserna.
    this.filteredCourses.sort((a, b) => {
     let aCourse = a[column];
     let bCourse = b[column];

     // Är kolumnen poäng konverteras det till nummer. Annars bokstäver.
     if(column === 'points') {
      aCourse = Number(aCourse);
      bCourse = Number(bCourse);
     } else {
      aCourse = aCourse?.toString().toLowerCase?.() ?? '';
      bCourse = bCourse?.toString().toLowerCase?.() ?? '';
     }

     // Returnerar sorteringen beroende på ordningen.
      if(aCourse < bCourse)
        return this.sortAscending ? -1 : 1;
      if(aCourse > bCourse)
        return this.sortAscending ? 1 : -1;
        
      return 0;
    })
  };

  // Returnerar en pil för att visa fallande och stigande ordning.
  sortingArrow(column: string): string {
    if(this.sortColumn !== column)
      return '';

    return this.sortAscending ? '⬇️' : '⬆️';
  }

  // Returnerar en pil för att visa stigande eller fallande ordning för poäng.
  sortingArrowPoints(column: string): string {
    if(this.sortColumn !== column)
      return '';

    return this.sortAscending ? '⬆️' : '⬇️';
  }

  // Lägger till en kurs i listan för sparade kurser. Vi SchemeService.
  addCourse(course: Courses): void {
    this.schemeService.addCourse(course);

    console.log(this.savedCourses)
  };

  // Kontrollerar om kursen finns i listan.
  isCourseAdded(course: Courses): Boolean {
    return this.savedCourses.some(c => 
      c.courseCode === course.courseCode)
  };

  // Returnerar de kurser som ska visas för tillfället. 50st.
  get visibleCourses(): Courses[] {
    return this.filteredCourses.slice(0, this.renderCourses)
  }

  // Ökar med 50st kurser vid klick på knapp.
  showMoreCourses(): void {
    if (this.renderCourses < this.filteredCourses.length) {
      this.renderCourses += 50;
  }};
}