import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Courses } from '../models/courses';

@Injectable({
  providedIn: 'root'
})

// Hämtar kursdata från JSON-filen.
export class CourseDataService {

  private url: string = "/miun_courses.json";

  constructor(private http: HttpClient) { }
    
  getCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.url);
  }
}
