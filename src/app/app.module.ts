import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ResumeComponent } from './resume/resume.component';
import { RouterModule, Routes } from '@angular/router';
import { EmploymentComponent } from './resume/employment/employment.component';
import { EducationComponent } from './resume/education/education.component';


const routes: Routes = [
  {path: 'resume', component: ResumeComponent, children: [
      {path: 'employment', component: EmploymentComponent},
      {path: 'education', component: EducationComponent},
    ]},
  {path: '**', redirectTo: '/resume'}
];


@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    EmploymentComponent,
    EducationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
