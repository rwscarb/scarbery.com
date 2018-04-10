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

  employmentHistory: { dateStart: Date, dateEnd: Date, employer: string, content: string[], accolades: string[] }[] = [
    {
      dateStart: new Date(2011, 4),
      dateEnd: new Date(2015, 7),
      employer: 'Decipher Inc',
      content: [
        'Developed bidirectional stateful network messaging system interacting with telephone dialing hardware',
        'Designed and implemented an IDE like Vim plugin for writing business DSL documents',
        'Responsible for a number of proprietary integrations for video, survey sampling and survey markup construction',
        'Analyzed systems for security vulnerabilities such as OWASP top threats',
        'Helped monitor and respond to CVE\'s affecting application stack',
        'Helped align security controls with ISO 27002:2013, PCI-DSS and HIPAA'
      ],
      accolades: [
        'Employee of the Month',
        'Innovator of the Month',
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
