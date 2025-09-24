import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWorkComponent } from './test-work.component';

describe('TestWorkComponent', () => {
  let component: TestWorkComponent;
  let fixture: ComponentFixture<TestWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
