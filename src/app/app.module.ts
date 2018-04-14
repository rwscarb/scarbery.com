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
import { BowlingComponent } from './projects/bowling/bowling.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubframeComponent } from './projects/bowling/subframe/subframe.component';
import { BowlingService } from "./projects/bowling/bowling.service";


const routes: Routes = [
  {path: 'resume', component: ResumeComponent, children: [
      {path: 'employment', component: EmploymentComponent},
      {path: 'education', component: EducationComponent},
    ],
  },
  {path: 'projects', component: ProjectsComponent, children: [
      {path: 'bowling', component: BowlingComponent}
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
    BtcbalanceComponent,
    BowlingComponent,
    SubframeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BowlingService,
    BlockchainService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
