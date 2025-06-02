import { Routes } from '@angular/router';
import { CoursesComponent } from './pages/courses/courses.component';
import { SchemeComponent } from './pages/scheme/scheme.component';
import { StartComponent } from './pages/start/start.component';

export const routes: Routes = [
    { path: 'start', component: StartComponent},
    { path: 'courses', component: CoursesComponent},
    { path: 'scheme', component: SchemeComponent},
    { path: "", redirectTo: "courses", pathMatch: "full"}
];
