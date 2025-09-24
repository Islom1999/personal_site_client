import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOnboardComponent } from './test-onboard.component';

describe('TestOnboardComponent', () => {
  let component: TestOnboardComponent;
  let fixture: ComponentFixture<TestOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestOnboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
