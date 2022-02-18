import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsViewsComponent } from './jobs-views.component';

describe('JobsViewsComponent', () => {
  let component: JobsViewsComponent;
  let fixture: ComponentFixture<JobsViewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsViewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
