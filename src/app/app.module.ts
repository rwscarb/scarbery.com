import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ResumeComponent } from './resume/resume.component';
import { RouterModule, Routes } from '@angular/router';
import { EmploymentComponent } from './resume/employment/employment.component';
import { EducationComponent } from './resume/education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlockchainService } from './projects/btcbalance/blockchain.service';
import { HttpClientModule } from '@angular/common/http';
import { BtcbalanceComponent } from './projects/btcbalance/btcbalance.component';


const routes: Routes = [
  {path: 'resume', component: ResumeComponent, children: [
      {path: 'employment', component: EmploymentComponent},
      {path: 'education', component: EducationComponent},
      {path: 'projects', component: ProjectsComponent}
    ]},
  {path: '**', redirectTo: '/resume'}
];


@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    EmploymentComponent,
    EducationComponent,
    ProjectsComponent,
    BtcbalanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BlockchainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
