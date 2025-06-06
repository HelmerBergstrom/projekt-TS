import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Courses } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  // BehaviorSubject som lagrar uppdaterade listan av sparade kurser.
  private savedCoursesSubject = new BehaviorSubject<Courses[]>(this.loadSavedCourses());

  // Gör ovan till Observable för att kunna använda subscribe().
  savedCourses = this.savedCoursesSubject.asObservable();

  constructor() { }

  // Hämtar sparad lista från localStorage. Returnerar tom lista om inget finns sparat.
  private loadSavedCourses(): Courses[] {
    const saved = localStorage.getItem("savedCourses");
    return saved ? JSON.parse(saved) : [];
  };

  // Uppdaterar listan i BehaviorSubject och loaclStorage.
  updateSavedCourses(course: Courses[]): void {
    this.savedCoursesSubject.next(course);
    localStorage.setItem("savedCourses", JSON.stringify(course));
  };

  // Lägger till en ny kurs i listan om den inte redan finns. Kontrolleras via kurskod. Sparar via uppdaterade listan.
  addCourse(course: Courses): void {
    const current = this.savedCoursesSubject.value;
    if(!current.some(c => c.courseCode === course.courseCode)) {
      const updated = [...current, course]; 
      this.updateSavedCourses(updated);
    };
  };
}
