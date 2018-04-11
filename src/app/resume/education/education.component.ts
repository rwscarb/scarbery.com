import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  education: { dateStart: Date, dateEnd: Date, title: string }[] = [
    {
      dateStart: new Date(2004),
      dateEnd: new Date(2006),
      title: 'BA in Psychology, University of California Santa Barbara'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
