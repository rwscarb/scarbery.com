import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcbalanceComponent } from './btcbalance.component';

describe('BtcbalanceComponent', () => {
  let component: BtcbalanceComponent;
  let fixture: ComponentFixture<BtcbalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtcbalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtcbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
