import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  education: { year: number, title: string }[] = [
    {year: 2006, title: 'BA in Psychology, University of California Santa Barbara'}
  ];

  employmentHistory: { dateStart: Date, dateEnd: Date, employer: string, content: string[] }[] = [
    {
      dateStart: new Date(2011, 4),
      dateEnd: new Date(2015, 7),
      employer: 'Decipher Inc',
      content: [
        'Developed bidirectional stateful network messaging system interacting with telephone dialing hardware'
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
