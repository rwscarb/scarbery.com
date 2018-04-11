import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employment',
  templateUrl: './employment.component.html',
  styleUrls: ['./employment.component.css']
})
export class EmploymentComponent implements OnInit {
  employmentHistory: { dateStart: Date, dateEnd: Date, employer: string, content: string[], accolades: string[] }[] = [
    {
      dateStart: new Date(2017, 7),
      dateEnd: new Date(),
      employer: 'Socialism Incorporated',
      content: ['Running my own Bitcoin mining company'],
      accolades: []
    },
    {
      employer: 'FocusVision',
      dateStart: new Date(2016, 5),
      dateEnd: new Date(2017, 7),
      content: [
        'Creating Ansible playbooks for acquired businesses / platforms as SRE member',
        'Working on migrating legacy monolithic applications to distributed/redundant systems using IaaS/SaaS solutions',
        'Developing web applications for mobile environments; Javascript, Cordova, Python, Angular.'
      ],
      accolades: []
    },
    {
      dateStart: new Date(2015, 7),
      dateEnd: new Date(2016, 5),
      employer: 'Bright.md',
      content: [
        `Rewrote infrastructure provisioning, configuration management and deployments from convoluted shell scripts
          to Ansible roles and playbooks`,
        `Quickly digested codebase in order to troubleshoot architectural issues, comment on scalability and security
          concerns as well as fix and document bugs`,
        'Managed AWS infrastructure (IAM, VPC, EC2, S3, Route53, SQS, SES, SNS)',
        'Audited and recorded CSRF and XSS vulnerabilities and implemented CSRF protections',
        'Mentored coworkers on technology stack, development tools, and best practices',
        'Worked with integrating remote EMR (electronic medical record) systems',
        'Worked closely with client services team to respond to client issues and requests',
        'Deployed monitoring and alerting solutions using third party tools such as DataDog, Sentry, Pingdom and ThreatStack'
      ],
      accolades: []
    },
    {
      dateStart: new Date(2011, 4),
      dateEnd: new Date(2015, 7),
      employer: 'Decipher Inc',
      content: [
        'Developed bidirectional stateful network messaging system interacting with telephone dialing hardware',
        'Designed and implemented an IDE like Vim plugin for writing business DSL documents',
        'Responsible for a number of proprietary integrations for video, survey sampling and survey markup construction',
        'Analyzed systems for security vulnerabilities such as OWASP top threats',
        `Helped monitor and respond to CVE's affecting application stack`,
        'Helped align security controls with ISO 27002:2013, PCI-DSS and HIPAA'
      ],
      accolades: [
        'Employee of the Month',
        'Innovator of the Month',
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
