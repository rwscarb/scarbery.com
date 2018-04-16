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
import { GameComponent } from './projects/bowling/game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubframeComponent } from './projects/bowling/subframe/subframe.component';
import { BowlingService } from "./projects/bowling/bowling.service";
import { ScoreboardComponent } from './projects/bowling/scoreboard/scoreboard.component';
import { BowlingResolveService } from "./projects/bowling/bowling-resolve.service";
import { NewgameComponent } from './projects/bowling/newgame/newgame.component';


const routes: Routes = [
  {path: 'resume', component: ResumeComponent, children: [
      {path: 'employment', component: EmploymentComponent},
      {path: 'education', component: EducationComponent},
    ],
  },
  {path: 'projects', component: ProjectsComponent, children: [
      {path: 'bowling/new', component: NewgameComponent},
      {path: 'bowling/:gameID', component: GameComponent, resolve: {game: BowlingResolveService}}
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
    GameComponent,
    SubframeComponent,
    ScoreboardComponent,
    NewgameComponent
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
    BlockchainService,
    BowlingResolveService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
