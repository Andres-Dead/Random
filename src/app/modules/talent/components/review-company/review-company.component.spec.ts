import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCompanyComponent } from './review-company.component';

describe('ReviewCompanyComponent', () => {
  let component: ReviewCompanyComponent;
  let fixture: ComponentFixture<ReviewCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
