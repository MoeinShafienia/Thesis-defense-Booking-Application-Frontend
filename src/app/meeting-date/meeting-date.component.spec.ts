import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDateComponent } from './meeting-date.component';

describe('MeetingDateComponent', () => {
  let component: MeetingDateComponent;
  let fixture: ComponentFixture<MeetingDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetingDateComponent]
    });
    fixture = TestBed.createComponent(MeetingDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
