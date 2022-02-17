import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPreferencesComponent } from './job-preferences.component';

describe('JobPreferencesComponent', () => {
  let component: JobPreferencesComponent;
  let fixture: ComponentFixture<JobPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
