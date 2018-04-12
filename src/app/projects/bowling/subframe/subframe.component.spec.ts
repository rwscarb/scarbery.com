import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubframeComponent } from './subframe.component';

describe('SubframeComponent', () => {
  let component: SubframeComponent;
  let fixture: ComponentFixture<SubframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
