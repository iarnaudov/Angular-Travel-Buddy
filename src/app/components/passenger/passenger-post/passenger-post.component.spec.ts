import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerPostComponent } from './passenger-post.component';

describe('PassengerPostComponent', () => {
  let component: PassengerPostComponent;
  let fixture: ComponentFixture<PassengerPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
