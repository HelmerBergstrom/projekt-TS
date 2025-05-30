import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Courses } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  private savedCoursesSubject = new BehaviorSubject<Courses[]>(this.loadSavedCourses());

  savedCourses = this.savedCoursesSubject.asObservable();

  constructor() { }

  private loadSavedCourses(): Courses[] {
    const saved = localStorage.getItem("savedCourses");
    return saved ? JSON.parse(saved) : [];
  };

  updateSavedCourses(course: Courses[]): void {
    this.savedCoursesSubject.next(course);
    localStorage.setItem("savedCourses", JSON.stringify(course));
  };

  addCourse(course: Courses): void {
    const current = this.savedCoursesSubject.value;
    if(!current.some(c => c.courseCode === course.courseCode)) {
      const updated = [...current, course]; 
      this.updateSavedCourses(updated);
    };
  };
}
