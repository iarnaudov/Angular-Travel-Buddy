import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPostComponent } from './driver-post.component';

describe('DriverPostComponent', () => {
  let component: DriverPostComponent;
  let fixture: ComponentFixture<DriverPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
