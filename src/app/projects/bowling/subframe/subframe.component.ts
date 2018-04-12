import { Component, Input, OnInit } from '@angular/core';
import { Frame } from '../frame.model';

@Component({
  selector: 'app-subframe',
  templateUrl: './subframe.component.html',
  styleUrls: ['./subframe.component.css']
})
export class SubframeComponent implements OnInit {

  @Input() frame: Frame;

  constructor() { }

  ngOnInit() {
  }

}
