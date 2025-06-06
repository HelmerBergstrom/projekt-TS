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
  // Sparar listan med valda/sparade kurser.
  savedCourses: Courses[] = [];
  
  // Sparar sparade scheman. Varje schema blir lista med kursnamn och poäng.
  savedSchemes: { courseName: string; points: number; } [][] = []; 

  // Hämtar schemats service.
  constructor(private schemeService: SchemeService) {}

  // Prenumererar via subscribe på sparade kurserna från servicen.
  ngOnInit() {
    this.schemeService.savedCourses.subscribe(courses => {
      this.savedCourses = courses;
    });

    // Hämtar sparade scheman om det finns.
    const saved = localStorage.getItem('savedSchemes');

    if(saved) {
      this.savedSchemes = JSON.parse(saved)
    }
  };

  // Tar bort kurs från ramschemat vid klick på "Ta bort"-knappen.
  // Uppdaterar localStorage och servicen.
  removeCourse(removeCourse: Courses) {
    const updatedCourses = this.savedCourses.filter(course => 
      course.courseCode !== removeCourse.courseCode);

    localStorage.removeItem("savedCourses");
      console.log(this.savedCourses);

    this.schemeService.updateSavedCourses(updatedCourses)
  };

  // Returnerar totala antalet poäng i ramschemat.
  get totalPoints(): number {
    return this.savedCourses.reduce((sum, course) => sum + course.points, 0)
  }

  // Returnerar totala antalet kurser i ramschemat.
  get totalCourses(): number {
    const courses = this.savedCourses.length;

    return courses;
  }

  // Rensar ramschemat.
  clearScheme() {
    this.savedCourses = [];

    localStorage.removeItem("savedCourses");

    this.schemeService.updateSavedCourses([]);
  }

  // Sparar ramschemat som ett nytt schema. Sparar till localStorage.
  saveScheme() {
    const theScheme = this.savedCourses.map(course => ({
      courseName: course.courseName,
      points: course.points
    }));
    this.savedSchemes.push(theScheme);
    localStorage.setItem('savedSchemes', JSON.stringify(this.savedSchemes))
  }

  // Tar bort sparat schema utifrån index.
  removeSaved(index: number) {
    this.savedSchemes.splice(index, 1);
    localStorage.setItem('savedSchemes', JSON.stringify(this.savedSchemes));
  }

  // Returnerar sparade schemats poäng
  schemePoints(scheme: { courseName: string; points: number }[]): number {
    return scheme.reduce((sum, course) => sum + course.points, 0);
  }

  // Returnerar antalet kurser i sparade schemat.
  schemeCourseCount(scheme: { courseName: string; points: number }[]): number {
    return scheme.length;
  }
}
