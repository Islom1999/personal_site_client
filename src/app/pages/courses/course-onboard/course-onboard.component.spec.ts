import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOnboardComponent } from './course-onboard.component';

describe('CourseOnboardComponent', () => {
  let component: CourseOnboardComponent;
  let fixture: ComponentFixture<CourseOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseOnboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
