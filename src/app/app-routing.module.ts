import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmoozeshComponent } from './amoozesh/amoozesh.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth-gaued.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MeetingDetailComponent } from './meeting-detail/meeting-detail.component';
import { MeetingComponent } from './meeting/meeting.component';
import { ProfessorComponent } from './professor/professor.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'professors', component: ProfessorComponent, canActivate: [AuthGuard] },
  { path: 'meetings', component: MeetingComponent, canActivate: [AuthGuard] },
  { path: 'amoozesh', component: AmoozeshComponent, canActivate: [AuthGuard] },
  { path: 'meeting-detail/:id', component: MeetingDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
