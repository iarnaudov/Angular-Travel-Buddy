import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSvgComponent } from './page-svg.component';

describe('PageSvgComponent', () => {
  let component: PageSvgComponent;
  let fixture: ComponentFixture<PageSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
