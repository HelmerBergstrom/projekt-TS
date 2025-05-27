import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { SchemeComponent } from './pages/scheme/scheme.component';

export const routes: Routes = [
    { path: 'courses', component: CoursesComponent},
    { path: 'scheme', component: SchemeComponent},
    { path: "", redirectTo: "courses", pathMatch: "full"}
];
